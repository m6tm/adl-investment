import { isUndefined } from "lodash";
import React, { createRef } from "react";
import SimplePeer from "simple-peer";
import { AppContext } from "../../data/chat";
import { constraints, peerConfig } from "../../data/socket.io";
import { CALL_MODE } from "../../enums/chat";
import { getURI, sleep } from "../../functions/tools";
import { AppContextInterface, Discussion, GroupCallState } from "../../interfaces/chat";
import { AudioCallRef, CallMember, CallRequestData, CallStarterData, CallTimeCouter, VideoCallRef } from "../../interfaces/GroupCallInterfaces";
import GroupAudioCall from "./GroupAudioCall";
import GroupVideoCall from "./GroupVideoCall";


export default class GroupCall extends React.Component {
        state: Readonly<GroupCallState>;
        context!: AppContextInterface;
        static contextType?: React.Context<any> | undefined = AppContext;

        stream!: MediaStream
        stream_queue: Array<MediaStream> = []
        myPeer: SimplePeer.Instance | null = null
        audio_call: React.RefObject<HTMLAudioElement> = createRef()
        call_in_progress = false
        call_accepted = false
        member_audio: Array<AudioCallRef> = []
        member_video: Array<VideoCallRef> = []
        recorder_timer!: NodeJS.Timer
        recorder_time: CallTimeCouter = {
                hour: 0,
                minute: 0,
                second: 0
        }
        recorder_time_ref: React.RefObject<HTMLElement> = createRef()
        has_retried_to_run_stream = false

        constructor(props: Readonly<{}>) {
                super(props)
                this.state = {
                        call_in_progress: false,
                        audio_call_in_progress: false,
                        video_call_in_progress: false,
                        call_picked_up: false,
                        call_data: {
                                initiator: false,
                                call_id: '',
                                discussion_id: 0,
                                initiator_id: 0,
                                group: {} as Discussion,
                                signal: ''
                        },
                        call_members: []
                }
        }

        async componentDidMount(): Promise<void> {
                [CALL_MODE.AUDIO, CALL_MODE.VIDEO].forEach(type => {
                        this.context.event.on(`start ${type} call process`, async (call_data: CallStarterData) => {
                                if (this.call_in_progress) return
                                this.call_in_progress = true
                                this.setState({
                                        ...this.state,
                                        ...{
                                                call_in_progress: true,
                                                audio_call_in_progress: type == CALL_MODE.AUDIO,
                                                video_call_in_progress: type == CALL_MODE.VIDEO,
                                                call_data,
                                                call_picked_up: call_data.initiator ?? true,
                                        }
                                })
                                await sleep(500)
                                try {
                                        if (call_data.initiator) {
                                                this.runSung('audio-02.mp3')
                                        } else {
                                                this.runSung('audio-01.mp3')
                                        }
                                } catch (error) { }
                                this.startCall(type)
                        })
                })

                this.context.socket!.on(`group call answer received - audio`, (signal: string) => {
                        this.connectSignal(signal)
                })
                this.context.socket!.on(`group call answer received - video`, (signal: string) => {
                        this.connectSignal(signal)
                })
                this.context.socket!.on('decline call request received', () => {
                        this.declineAudiaCall(false)
                        this.declineVideoCall(false)
                })
        }

        startCall = async (call_mode: CALL_MODE) => {
                let stream!: MediaStream | undefined
                switch (call_mode) {
                        case CALL_MODE.AUDIO:
                                stream = await this.getUserMediaStream()
                                if (isUndefined(stream)) {
                                        this.declineAudiaCall(true)
                                        return
                                }
                                this.stream = stream
                                this.setState({
                                        ...this.state, ...{
                                                call_members: [...this.state.call_members, ...[this.getMyCredentials()]]
                                        }
                                })
                                setTimeout(() => {
                                        this.context.event.emit('set members - audio')
                                }, 500);
                                if (!this.state.call_data.initiator) {
                                        let waitting_answer = await this.waitAnswer()
                                        if (!waitting_answer) {
                                                this.stopSung()
                                                this.declineAudiaCall(true)
                                                return
                                        }
                                        this.stopSung()
                                }
                                this.runPeerConnectionPrecess()
                                break;

                        case CALL_MODE.VIDEO:
                                stream = await this.getUserMediaStream()
                                if (isUndefined(stream)) {
                                        this.declineVideoCall(true)
                                        return
                                }
                                this.stream = stream
                                this.setState({
                                        ...this.state, ...{
                                                call_members: [...this.state.call_members, ...[this.getMyCredentials()]]
                                        }
                                })
                                setTimeout(() => {
                                        this.context.event.emit('set members - video')
                                }, 500);
                                if (!this.state.call_data.initiator) {
                                        let waitting_answer = await this.waitAnswer()
                                        if (!waitting_answer) {
                                                this.stopSung()
                                                this.declineVideoCall(true)
                                                return
                                        }
                                        this.stopSung()
                                }
                                this.runPeerConnectionPrecess()
                                break;

                        default:
                                break;
                }
        }

        runSung = (src: string) => {
                this.audio_call.current!.setAttribute('src', getURI('call-audio/' + src))
                this.audio_call.current!.play()
        }

        stopSung = () => {
                this.audio_call.current!.pause()
                this.audio_call.current!.currentTime = 0
        }

        waitAnswer = async (): Promise<boolean> => {
                return new Promise(resolve => {
                        let intervall = setInterval(() => {
                                if (this.state.call_picked_up) {
                                        clearInterval(intervall)
                                        resolve(true)
                                }
                        }, 1000)
                        setTimeout(() => {
                                if (!this.state.call_picked_up) {
                                        clearInterval(intervall)
                                        resolve(false)
                                }
                        }, 1000 * 60);
                })
        }

        acceptCall = () => {
                this.setState({
                        ...this.state, ...{
                                call_picked_up: true
                        }
                })
        }

        runPeerConnectionPrecess = () => {
                if (SimplePeer.WEBRTC_SUPPORT) {
                        if (this.state.call_data.initiator) {
                                this.myPeer = new SimplePeer({
                                        initiator: this.state.call_data.initiator,
                                        stream: this.stream,
                                        config: peerConfig,
                                        trickle: false,
                                });
                                this.peerController()
                        } else {
                                if (this.myPeer == null) {
                                        this.myPeer = new SimplePeer({
                                                initiator: this.state.call_data.initiator,
                                                stream: this.stream,
                                                config: peerConfig,
                                                trickle: false,
                                        });
                                        this.peerController()
                                }
                                this.myPeer?.signal(JSON.parse(this.state.call_data.signal!))
                        }

                        this.myPeer?.on('close', () => { // Decline call
                                if (this.state.audio_call_in_progress) this.declineAudiaCall(true)
                                if (this.state.video_call_in_progress) this.declineVideoCall(true)
                                console.warn('Peer Connection close');
                        })
                        this.myPeer?.on('error', error => {
                                if (this.state.audio_call_in_progress) this.declineAudiaCall(true)
                                if (this.state.video_call_in_progress) this.declineVideoCall(true)
                                console.warn('Peer Error Occured');
                        })
                } else {
                        if (this.state.audio_call_in_progress) this.declineAudiaCall(true)
                        if (this.state.video_call_in_progress) this.declineVideoCall(true)
                        console.warn('Your navigator does\'nt support WRTC technology. Pleace update your browser and try again !!');
                }
        }

        connectSignal = (signal: string) => {
                this.myPeer?.signal(JSON.parse(signal))
        }

        getCallType = () => this.state.video_call_in_progress ? CALL_MODE.VIDEO : CALL_MODE.AUDIO

        peerController = () => {
                // Waiting for signal availability
                this.myPeer?.on('signal', signal => {
                        if (this.state.call_data.initiator) {
                                // Send signal with call credentials
                                const request: CallRequestData = {
                                        call_id: this.state.call_data.call_id,
                                        discussion_id: this.state.call_data.discussion_id,
                                        signal: JSON.stringify(signal),
                                        initiator_id: this.state.call_data.initiator_id,
                                        group: JSON.stringify(this.state.call_data.group)
                                }
                                this.context.socket!.emit(`group call request - ${this.getCallType()}`, request)

                                setTimeout(() => {  // Discard call request if not answer received after 1 minute
                                        if (!this.call_accepted) {
                                                if (this.getCallType() == CALL_MODE.AUDIO) this.declineAudiaCall(true)
                                                if (this.getCallType() == CALL_MODE.VIDEO) this.declineVideoCall(true)
                                                this.myPeer?.destroy();
                                                this.stopSung()
                                        }
                                }, (1000 * 60));
                        } else {
                                this.context.socket?.emit(`group call answer - ${this.getCallType()}`, JSON.stringify(signal))
                        }
                })

                this.myPeer?.on('stream', stream => {
                        this.stream_queue.push(stream)
                })

                this.myPeer?.on('connect', () => {
                        this.call_accepted = true
                        if (this.state.call_data.initiator) this.stopSung()
                        this.callRecorder()
                        if (!this.state.call_data.initiator) this.context.socket?.emit(`send credentiels - ${this.getCallType()}`, JSON.stringify({
                                user_id: this.context.id,
                                stream_id: this.stream.id,
                                audio_muted: this.state.call_members.find(member => member.user.id == this.context.id)!.audio_muted,
                                video_muted: this.state.call_members.find(member => member.user.id == this.context.id)!.video_muted,
                        }))
                })

                this.context.socket?.on(`send credentiels received - ${this.getCallType()}`, (data_event, new_client_socket_id: string) => {
                        const { user_id, stream_id, audio_muted, video_muted }: { user_id: number, stream_id: string, audio_muted: boolean, video_muted: boolean } = JSON.parse(data_event)

                        let user_credentials = this.getParticipantCredentials(user_id, stream_id, audio_muted, video_muted)
                        if (isUndefined(user_credentials)) return

                        this.setState({
                                ...this.state, ...{
                                        call_members: [...this.state.call_members, ...[user_credentials]]
                                }
                        })
                        setTimeout(() => {
                                this.context.event.emit(`set members - ${this.getCallType()}`)
                        }, 500);

                        this.context.socket?.emit(`send credentiels acknowledge - ${this.getCallType()}`, JSON.stringify({
                                user_id: this.context.id,
                                stream_id: this.stream.id,
                                audio_muted: this.state.call_members.find(member => member.user.id == this.context.id)!.audio_muted,
                                video_muted: this.state.call_members.find(member => member.user.id == this.context.id)!.video_muted,
                        }), new_client_socket_id)
                })

                this.context.socket?.on(`send credentiels acknowledge received - ${this.getCallType()}`, (new_user_credentials: string) => {
                        const { user_id, stream_id, audio_muted, video_muted }: { user_id: number, stream_id: string, audio_muted: boolean, video_muted: boolean } = JSON.parse(new_user_credentials)

                        let user_credentials = this.getParticipantCredentials(user_id, stream_id, audio_muted, video_muted)
                        if (isUndefined(user_credentials)) return
                        const hasCallMemer = this.state.call_members.some(member => member.user.id == user_id)

                        if (hasCallMemer) return
                        this.setState({
                                ...this.state, ...{
                                        call_members: [...this.state.call_members, ...[user_credentials]]
                                }
                        })
                        setTimeout(() => {
                                this.context.event.emit(`set members - ${this.getCallType()}`)
                        }, 500);
                })

                this.context.socket?.on(`on microphone changed state received - audio`, data => {
                        const { user_id }: { user_id: number } = JSON.parse(data)
                        this.setState({
                                ...this.state, ...{
                                        call_members: this.state.call_members.map(member => member.user.id == user_id ? ({
                                                ...member,
                                                ...{
                                                        audio_muted: !member.audio_muted,
                                                }
                                        }) : member)
                                }
                        })
                })

                this.context.socket?.on(`on microphone changed state received - video`, data => {
                        const { user_id }: { user_id: number } = JSON.parse(data)
                        this.setState({
                                ...this.state, ...{
                                        call_members: this.state.call_members.map(member => member.user.id == user_id ? ({
                                                ...member,
                                                ...{
                                                        video_muted: !member.video_muted,
                                                }
                                        }) : member)
                                }
                        })
                })
        }

        customPeerEventlistener = (event: string, data: any) => {
                switch (event) {
                        case 'timer':
                                this.recorder_time = data as CallTimeCouter
                                this.displayRecorderTime(this.recorder_time)
                                break;

                        default:
                                break;
                }
        }

        callRecorder = () => {
                this.recorder_timer = setInterval(() => {
                        this.recorder_time.second++
                        if (this.recorder_time.second > 59) {
                                this.recorder_time.second = 0
                                this.recorder_time.minute++
                        }
                        if (this.recorder_time.minute > 59) {
                                this.recorder_time.minute = 0
                                this.recorder_time.hour++
                        }
                        this.displayRecorderTime(this.recorder_time)
                }, 1000)
        }

        displayRecorderTime = (recorder_time: CallTimeCouter) => {
                this.recorder_time_ref.current!.textContent = this.timerToString(recorder_time)
        }

        timerToString = (timer: CallTimeCouter) => {
                const time = {
                        hour: timer.hour < 10 ? `0${timer.hour}` : timer.hour.toString(),
                        minute: timer.minute < 10 ? `0${timer.minute}` : timer.minute.toString(),
                        second: timer.second < 10 ? `0${timer.second}` : timer.second.toString(),
                }
                return `${time.hour}:${time.minute}:${time.second}`
        }

        getMyCredentials = (): CallMember => {
                return {
                        stream: this.stream,
                        audio_muted: false,
                        video_muted: false,
                        user: this.state.call_data.group.group_participant.filter(user => user.id == this.context.id).at(0)!
                }
        }

        getParticipantCredentials = (user_id: number, stream_id: string, audio_muted: boolean = false, video_muted: boolean = true): CallMember | undefined => {
                if (!this.stream_queue.some(stream => stream.id == stream_id)) return undefined
                let member = {
                        stream: this.stream_queue.filter(stream => stream.id == stream_id).at(0)!,
                        audio_muted,
                        video_muted,
                        user: this.state.call_data.group.group_participant.filter(user => user.id == user_id).at(0)!
                }
                return member
        }

        declineAudiaCall = (decline_initiator: boolean, raisons?: Array<string>) => {
                this.stopSung()
                this.recorder_time = {
                        hour: 0,
                        minute: 0,
                        second: 0,
                }
                this.stream_queue = []
                clearInterval(this.recorder_timer)
                this.has_retried_to_run_stream = false
                if (this.stream) this.stream.getTracks().forEach((track) => {
                        track.stop()
                })
                this.call_in_progress = false
                if (!this.call_accepted) this.context.socket?.emit('decline call request')
                this.call_accepted = false
                const newState: GroupCallState = {
                        ...this.state, ...{
                                call_in_progress: false,
                                audio_call_in_progress: false,
                                call_members: [],
                                call_data: {
                                        initiator: false,
                                        call_id: '',
                                        discussion_id: 0,
                                        initiator_id: 0,
                                        group: {} as Discussion,
                                        signal: ''
                                }
                        }
                }
                this.setState(newState)
                this.myPeer = null

                this.context.event.emit('Reset audio call status')
        }

        declineVideoCall = (decline_initiator: boolean, raisons?: Array<string>) => {
                this.stopSung()
                this.recorder_time = {
                        hour: 0,
                        minute: 0,
                        second: 0,
                }
                this.stream_queue = []
                clearInterval(this.recorder_timer)
                this.has_retried_to_run_stream = false
                if (this.stream) this.stream.getTracks().forEach((track) => {
                        track.stop()
                })
                this.call_in_progress = false
                if (!this.call_accepted) this.context.socket?.emit('decline call request')
                this.call_accepted = false
                const newState: GroupCallState = {
                        ...this.state, ...{
                                call_in_progress: false,
                                video_call_in_progress: false,
                                call_members: [],
                                call_data: {
                                        initiator: false,
                                        call_id: '',
                                        discussion_id: 0,
                                        initiator_id: 0,
                                        group: {} as Discussion,
                                        signal: ''
                                }
                        }
                }
                this.setState(newState)
                this.myPeer = null

                this.context.event.emit('Reset video call status')
        }

        getUserMediaStream = async (): Promise<MediaStream | undefined> => {
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                        if (this.getCallType() == CALL_MODE.AUDIO) this.declineAudiaCall(true)
                        if (this.getCallType() == CALL_MODE.VIDEO) this.declineVideoCall(true)
                        console.log("getUserMedia is not supported by this browser");
                        return undefined;
                }

                let stream = await navigator.mediaDevices.getUserMedia(
                        constraints(true, this.has_retried_to_run_stream ? false : this.getCallType() == CALL_MODE.VIDEO, this.state.call_data.call_id))
                        .then(stream => stream)
                        .catch(async error => {
                                console.error(error)
                                if (this.has_retried_to_run_stream) {
                                        if (this.getCallType() == CALL_MODE.AUDIO) this.declineAudiaCall(true)
                                        if (this.getCallType() == CALL_MODE.VIDEO) this.declineVideoCall(true)
                                        return undefined
                                }
                                this.has_retried_to_run_stream = true
                                return await this.getUserMediaStream()
                        });

                return stream
        }

        muteUnmuteMicrophone = () => {
                this.toggleMyMicrophone()
                this.setState({
                        ...this.state, ...{
                                call_members: this.state.call_members.map(member => member.user.id == this.context.id ? ({ ...member, ...{ audio_muted: !member.audio_muted } }) : member)
                        }
                })
                this.context.socket?.emit('on microphone changed state - audio', JSON.stringify({ user_id: this.context.id, type: CALL_MODE.AUDIO }))
        }

        muteUnmuteCamera = () => {
                this.toggleMyCamero()
                this.setState({
                        ...this.state, ...{
                                call_members: this.state.call_members.map(member => member.user.id == this.context.id ? ({ ...member, ...{ video_muted: !member.video_muted } }) : member)
                        }
                })
                this.context.socket?.emit(`on microphone changed state - video`, JSON.stringify({ user_id: this.context.id, type: CALL_MODE.VIDEO }))
        }

        toggleMyMicrophone = () => {
                this.stream.getAudioTracks()
                        .forEach(track => {
                                const new_state = !track.enabled
                                track.enabled = new_state
                        })
        }

        toggleMyCamero = () => {
                this.stream.getAudioTracks()
                        .forEach(track => {
                                const new_state = !track.enabled
                                track.enabled = new_state
                        })
        }

        render(): React.ReactNode {
                return <>
                        <GroupAudioCall {...{
                                is_visible: this.state.audio_call_in_progress,
                                acceptCall: this.acceptCall,
                                discard: this.declineAudiaCall,
                                call_members: this.state.call_members,
                                call_picked_up: this.state.call_picked_up,
                                audio_members: this.member_audio,
                                recorder_time_ref: this.recorder_time_ref,
                                mute_unmute_microphone: this.muteUnmuteMicrophone
                        }} />
                        <GroupVideoCall {...{
                                is_visible: this.state.video_call_in_progress,
                                acceptCall: this.acceptCall,
                                discard: this.declineVideoCall,
                                call_members: this.state.call_members,
                                call_picked_up: this.state.call_picked_up,
                                video_members: this.member_video,
                                recorder_time_ref: this.recorder_time_ref,
                                mute_unmute_microphone: this.muteUnmuteMicrophone,
                                mute_unmute_camera: this.muteUnmuteCamera,
                        }} />
                        <audio src={getURI('call-audio/audio-01.mp3')} hidden loop ref={this.audio_call}></audio>
                </>
        }
}