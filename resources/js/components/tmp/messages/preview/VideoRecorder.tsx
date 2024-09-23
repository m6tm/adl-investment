import { isNull, isUndefined } from "lodash";
import React from "react";
import { AppContext } from "../../data/chat";
import { constraints } from "../../data/socket.io";
import { getURI, in_array } from "../../functions/tools";
import { AppContextInterface, RecorderProps, RecorderState } from "../../interfaces/chat";
import SafeRaiseError from "../../SafeRaiseError";


export default class VideoRecorder extends React.Component {
    props!: RecorderProps
    state: RecorderState
    context!: AppContextInterface;
    tmpRecorder!: NodeJS.Timer

    recorderPists: Array<Blob> = []
    recorder: MediaRecorder | null = null
    stream: MediaStream | null | undefined = null
    file: File | null = null
    video: React.RefObject<HTMLVideoElement> = React.createRef()
    recorder_state: 'play' | 'stroped' = 'play'
    
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            recorder_state: 'stope',
            recorder_timer: {
                seconds: '00',
                minutes: '00',
                hours: '00',
            }
        }
    }
    
    static contextType?: React.Context<any> | undefined = AppContext;

    componentDidMount(): void {
        this.startRecording()
    }

    startRecording = async () => {
        // Run user media
        this.stream = await navigator.mediaDevices.getUserMedia(constraints(true, true, 'kanban-audio-recording-' + Date.now().toString().slice(0, 5), 'environment'))
            .then(stream => stream)
            .catch(error => {
                console.error(error)
                return undefined
            });
        if (isUndefined(this.stream)) {
            return null
        }

        this.video.current!.srcObject = this.stream
        this.video.current!.play()

        this.recorder = new MediaRecorder(this.stream, {mimeType: 'video/webm'})

        this.recorder.addEventListener('dataavailable', (e) => {
            this.recorderPists.push(e.data)
        }, false)

        this.recorder.addEventListener('start', (e) => {
            this.startRecorder()
            this.setState({ ...this.state, ...{ recorder_state: 'play' } })
        }, false)

        this.recorder.addEventListener('pause', (e) => {
            this.video.current!.pause()
            this.setState({ ...this.state, ...{ recorder_state: 'pause' } })
        }, false)
        
        this.recorder.addEventListener('resume', (e) => {
            this.video.current!.play()
            this.setState({ ...this.state, ...{ recorder_state: 'play' } })
        }, false)
        
        this.recorder.addEventListener('stop', (e) => {
            this.saveRecordingData()
            this.setState({ ...this.state, ...{ recorder_state: 'stop' } })
        }, false)

        this.recorder.start(1000)
    }

    startRecorder = () => {
        let hours = 0,
            minutes = 0,
            seconds = 0;

        this.tmpRecorder = setInterval(() => {
            if (in_array(this.state.recorder_state, ['stoped', 'pause'])) return
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
                    recorder_timer: { ...this.state.recorder_timer, ...call }
                }
            })
        }, 1000);
    }

    saveRecordingData() {
        let file = new File(this.recorderPists, `kanban-video-recoder-${Date.now()}.mp4`, {
            lastModified: Date.now(),
            type: 'video/mp4'
        })
        this.file = file
        this.closePreview(null, false)
    }

    closePreview = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent> | null, isCloseBtn: boolean = false) => {
        event?.preventDefault()
        if (this.recorder_state == 'stroped') return
        this.props.closeRecordinPanel(isCloseBtn ? null : this.file)
        this.wipeDatas()
    }

    wipeDatas = () => {
        this.recorder_state = 'stroped'
        clearInterval(this.tmpRecorder)
        this.recorder = null
        this.stream?.getTracks().forEach(track => track.stop())
        this.stream = null
        this.file = null
        if (!isNull(this.video.current)) {
            this.video.current.pause()
            this.video.current.currentTime = 0
        }
        this.video = React.createRef()
        this.setState({ ...this.state, ...{
            recorder_state: 'stope',
            recorder_timer: {
                seconds: '00',
                minutes: '00',
                hours: '00',
            }
        } })
    }

    pause = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if (this.state.recorder_state == 'pause') {
            this.recorder?.resume()
        } else {
            this.recorder?.pause()
        }
    }

    stop = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        this.recorder?.stop()
    }

    render(): React.ReactNode {
        return <SafeRaiseError>
            <div
                className="recorder-container video"
                style={{ ...this.props.style }}>
                <img
                    className="logo-user"
                    src={isNull(this.context.avatar) ? getURI('avatar/user.png') : getURI(this.context.avatar)}
                    alt="User profile image" />
                <div className="container-fill">
                    <video
                        ref={this.video}
                        muted
                        className="position-absolute w-100 h-100" style={{ top: 0, left: 0 }} />
                    <a href="#close" onClick={e => this.closePreview(e, true)} className="attachement-closer"><i className="bx bx-plus"></i></a>
                    <div className="recorder-body">
                        <div className="recorder-timer">
                            <span className="text-light text-italic">{`${this.state.recorder_timer.hours}:${this.state.recorder_timer.minutes}:${this.state.recorder_timer.seconds}`}</span>
                        </div>
                        <div className="recorder-controller">
                            <button
                                className="btn btn-sm btn-info mr-2"
                                onClick={this.pause}>
                                    <i className={`bx bx-${in_array(this.state.recorder_state, ['play', 'pause']) ? (this.state.recorder_state == 'pause' ? 'play' : 'pause') : 'play'}`}></i>
                            </button>
                            <button
                                className={`btn btn-sm btn-danger ml-2}`}
                                onClick={this.stop}><i className="bx bx-stop"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </SafeRaiseError>
    }
}