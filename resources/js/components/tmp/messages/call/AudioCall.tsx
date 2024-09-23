import { isNull, isUndefined } from "lodash";
import React from "react";
import SimplePeer from "simple-peer";
import { AppContext } from "../../data/chat";
import { constraints, peerConfig } from "../../data/socket.io";
import { getURI } from "../../functions/tools";
import { AppContextInterface, Discussion } from "../../interfaces/chat";
import SafeRaiseError from "../../SafeRaiseError";


export default class AudioCall extends React.Component {
    // Props definition
    props!: {
        chat: Discussion,
        is_visible: 'none' | '',
        discard_call: Function,
        reset_call: Function,
        profile_display: 'you' | 'me',
        initiator: boolean,
        call_id: string,
        discussion_id: number,
        signal: string,
    }

    // State definition
    state: {
        audio_state: 'muted' | 'unmuted',
        call_timer: {
            hours: string,
            minutes: string,
            seconds: string,
        },
        call_is_running: boolean,
        call_accepted: boolean,
    };

    // Call attributes
    call_state: 'stopped' | 'pending'
    myPeer: SimplePeer.Instance | null
    streams: {
        my: MediaStream | null,
        theirs: Array<MediaStream> | []
    } = {
            my: null,
            theirs: []
        }
    audio: React.RefObject<HTMLVideoElement> = React.createRef()
    incoming_call_audio: React.RefObject<HTMLSpanElement> = React.createRef()
    incoming_call_state!: NodeJS.Timer
    tmpCall!: NodeJS.Timer
    decline_is_pending = false

    // App Context
    context!: AppContextInterface;
    static contextType?: React.Context<any> | undefined = AppContext;

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            audio_state: 'unmuted',
            call_timer: {
                hours: '00',
                minutes: '00',
                seconds: '00'
            },
            call_is_running: false,
            call_accepted: false
        }
        this.call_state = 'stopped',
            this.myPeer = null
    }

    componentDidMount() {
        this.context.socket?.on('call answer received - audio', _signal => {
            this.myPeer!.signal(JSON.parse(_signal))
        })
        this.context.socket?.on('decline call request received - audio', () => {
            try {
                this.decline(false)
                this.audio.current?.pause()
                this.audio.current!.currentTime = 0
            } catch (error) {
                console.warn("Warn: An error occured when received dicline call request");
            }
        })
    }

    callDecline = () => {
        this.myPeer?.destroy()
        this.streams.my?.getTracks().forEach(track => track.stop())

        this.props.discard_call()
        this.props.reset_call()
    }

    peerController = (peerConnexion: SimplePeer.Instance, initiator: boolean, call_id: string, discussion_id: number) => {
        let call_accepted = false;
        peerConnexion.on('signal', signal => {
            if (initiator) {
                this.context.socket?.emit('call request - audio', {
                    call_id,
                    audio_mode: true,
                    video_mode: false,
                    discussion_id,
                    signal: JSON.stringify(signal)
                })
                setTimeout(() => {  // Discard call request if not answer received after 1 minute
                    if (!call_accepted) {
                        this.decline(true)
                        peerConnexion.destroy();
                    }
                }, (1000 * 60));
            } else {
                this.context.socket?.emit('call answer - audio', JSON.stringify(signal))
            }
        })

        peerConnexion.on('stream', stream => {
            this.audio.current!.srcObject = stream
            this.audio.current?.play()
        })

        peerConnexion.on('connect', () => {
            call_accepted = true
            this.setState({ ...this.state, ...{ call_is_running: true } })
            setTimeout(() => {
                clearInterval(this.incoming_call_state);
            }, 2000);
            this.callRecorder()
        })
    }

    callRecorder = () => {
        let hours = 0,
            minutes = 0,
            seconds = 0;

        this.tmpCall = setInterval(() => {
            seconds++;
            if (seconds > 59) {
                seconds = 0;
                minutes++;
            }
            if (minutes > 59) {
                minutes = 0;
                hours++;
            }
            let tmpHours = hours < 10 ? '0' + hours.toString() : hours.toString(),
                tmpMinutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString(),
                tmpSeconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString(),
                call = {
                    seconds: tmpSeconds,
                    hours: tmpHours,
                    minutes: tmpMinutes,
                };

            this.setState({
                ...this.state,
                ...{
                    // call_timer: { ...this.state.call_timer, ...{ hours: parseInt(tmpHours), minutes: parseInt(tmpMinutes), seconds: parseInt(tmpSeconds) } }
                    call_timer: { ...this.state.call_timer, ...call }
                }
            })
        }, 1000);
    }

    async waitCallAnswer(): Promise<boolean> {
        return new Promise(resolved => {
            let timer = setInterval(() => {
                if (this.state.call_accepted) {
                    clearInterval(timer)
                    resolved(true)
                }
            }, 1000);
            setTimeout(() => {
                clearInterval(timer)
                resolved(false)
            }, 1000 * 60);
        })
    }

    startCallStation = async () => {
        if (this.call_state == 'pending') return null
        const initiator = this.props.initiator;

        this.call_state = 'pending'
        
        // Run user media
        let stream = await navigator.mediaDevices.getUserMedia(constraints(true, false, this.props.call_id))
            .then(stream => stream)
            .catch(error => {
                console.error(error)
                this.decline(true)
                return undefined
            });
        if (isUndefined(stream)) {
            this.decline(true)
            return null
        }
        this.streams.my = stream

        if (!initiator) {
            let response = await this.waitCallAnswer()
            if (!response) {
                this.decline(true)
                return null
            }
        }

        // PeerConnection
        if (SimplePeer.WEBRTC_SUPPORT) {
            if (initiator) {
                this.myPeer = new SimplePeer({
                    initiator: initiator,
                    stream: stream,
                    config: peerConfig,
                    trickle: false,
                });
                this.peerController(this.myPeer!, initiator, this.props.call_id, this.props.chat.discussion_id)
            } else {
                if (this.myPeer == null) {
                    this.myPeer = new SimplePeer({
                        initiator: initiator,
                        stream: stream,
                        config: peerConfig,
                        trickle: false,
                    });
                    this.peerController(this.myPeer!, initiator, this.props.call_id, this.props.chat.discussion_id)
                }
                this.myPeer?.signal(JSON.parse(this.props.signal))
            }

            this.myPeer?.on('close', () => { // Decline call
                this.setState({ ...this.state, ...{ myPeer: null } })
                this.decline(true)
            })
            this.myPeer?.on('error', error => {
                this.decline(true)
                this.setState({ ...this.state, ...{ myPeer: null } })
                console.error(error);
            })
        } else {
            console.error('Your navigator does\'nt support WRTC technology. Pleace update your browser and try again !!');
            this.decline(true)
        }

        return null
    }

    toggleMuteState = () => {
        if (this.call_state !== 'pending') return
        const muted = this.state.audio_state == 'muted' ? 'unmuted' : 'muted'
        this.streams.my?.getAudioTracks().forEach(track => {
            track.enabled = muted == 'unmuted'
        })
        this.setState({ ...this.state, ...{ audio_state: muted } })
    }

    decline = (initiator: boolean) => {
        if (initiator) this.context.socket?.emit('call declined - audio')
        this.myPeer?.destroy()
        this.callDecline();

        // Reset state
        this.setState({
            ...this.state,
            ...{
                audio_state: 'unmuted',
                call_timer: {
                    hours: '00',
                    minutes: '00',
                    seconds: '00'
                },
                call_is_running: false,
                call_accepted: false
            }
        })

        // Reset object attributes
        clearInterval(this.tmpCall)
        this.call_state = 'stopped'
        this.myPeer = null
        this.streams = {
            my: null,
            theirs: []
        }
        this.audio = React.createRef()
        this.incoming_call_audio = React.createRef()
        // console.log('call is ready delined');
    }

    accept = () => {
        this.setState({ ...this.state, ...{ call_accepted: true } })
    }

    render(): React.ReactNode {
        return <SafeRaiseError>
            <div className="call-box" style={{ display: this.props.is_visible }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 d-block mx-auto call-container">
                            {/* Logo user */}
                            <div className="call-user-logo d-flex flex-column align-items-center mt-3">
                                {
                                    <img
                                        src={`${getURI()}/${isNull(this.props.chat.participant[this.props.profile_display].avatar) ? 'avatar/user.png' : this.props.chat.participant[this.props.profile_display].avatar}`}
                                        alt={this.props.chat.participant[this.props.profile_display].user_name}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50px'
                                        }}
                                    />
                                }
                                <strong className="text-capitalize font-bold font-large-1 text-muted">{this.props.chat.participant[this.props.profile_display].last_name + ' ' + this.props.chat.participant[this.props.profile_display].first_name}</strong>
                            </div>

                            {/* Timeline */}
                            <div className="container flex-column d-flex align-items-center mt-2">
                                <strong className={`text-muted`}>
                                    {this.state.call_is_running ? `${this.state.call_timer.hours} : ${this.state.call_timer.minutes} : ${this.state.call_timer.seconds}` : (this.props.initiator ? 'Outgoing Call' : 'Incoming Call')}
                                </strong>
                                {
                                    !this.state.call_is_running ?
                                        <img
                                            className="mt-2"
                                            src={window.location.origin + '/avatar/loading.gif'}
                                            style={{
                                                width: '60px',
                                            }} /> : null
                                }
                            </div>

                            {/* Control panel */}
                            <div className="container d-flex justify-content-center mt-3">
                                <button
                                    className="btn btn-sm btn-danger call-btn-form"
                                    onClick={() => this.decline(true)}>
                                    <i className="bx bx-stop"></i>
                                </button>
                                {
                                    !this.props.initiator && !this.state.call_accepted ?
                                        <button
                                            className="btn btn-sm btn-success call-btn-form ml-3"
                                            onClick={this.accept}>
                                            <i className="bx bx-phone-incoming"></i>
                                        </button> : null
                                }
                                <button
                                    className="btn btn-sm btn-secondary call-btn-form ml-3"
                                    onClick={this.toggleMuteState}>
                                    <i className={`bx bx-microphone${this.state.audio_state == 'muted' ? '-off' : ''}`}></i>
                                </button>
                            </div>
                            <div className="container d-none">
                                <video ref={this.audio}></video>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.is_visible == '' && this.call_state != 'pending' ? (this.startCallStation() instanceof Promise ? null : null) : null // Run call when we receive / emit call
                }
            </div>
        </SafeRaiseError>
    }
}