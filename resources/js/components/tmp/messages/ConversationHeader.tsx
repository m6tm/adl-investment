import { isNull } from "lodash";
import React from "react";
import { v4 } from "uuid";
import { deleteDiscussion, lockUnlockDiscussion, lockUnlockDiscussionForlAll, setDiscussionToTopMode } from "../API/chat";
import { AppContext } from "../data/chat";
import { DISCUSSTION_PERMISSION, DISCUSSTION_TYPE } from "../enums/chat";
import { in_array, sleep } from "../functions/tools";
import { AppContextInterface, ConversationHeaderState, ConversationProps } from "../interfaces/chat";
import Loading from "../Loading";
import SafeRaiseError from "../SafeRaiseError";
import Conversation from "./Conversation";
import { v4 as uuid } from 'uuid'
import { CallRequestData } from "../interfaces/GroupCallInterfaces";


export class ConversationHeader extends React.Component {
    props!: ConversationProps
    state!: ConversationHeaderState
    static contextType?: React.Context<any> | undefined = AppContext;
    context!: AppContextInterface
    typing_dote_text: Array<string> = []
    typing_dote: React.RefObject<HTMLSpanElement> = React.createRef()

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            call_audio_is_pending: 'none',
            call_video_is_pending: 'none',
            group_audio_call_is_pending: false,
            group_video_call_is_pending: false,
            profile_display: 'you',
            initiator: true,
            call_id: '',
            discussion_id: 0,
            signal: '',
            typing_is_pending: false,
        }
    }

    componentDidMount() {
        this.context.socket?.on('call-request', (data: { call_id: string, audio_mode: true, video_mode: false, discussion_id: number, signal: string }) => {
            if (data.discussion_id !== this.props.conversation.discussion_id) return;

            this.context.more_info.setCallState({
                ...{
                    chat: this.props.conversation,
                    is_visible: this.state.call_audio_is_pending == 'none' ? '' : 'none',
                    discard_call: this.discardAudioCall,
                    reset_call: this.resetProps,
                    profile_display: this.state.profile_display,
                    initiator: false,
                    call_id: data.call_id,
                    discussion_id: this.state.discussion_id,
                    signal: this.state.signal,
                },
                ...{
                    call_audio_is_pending: data.audio_mode ? '' : 'none',
                    call_video_is_pending: data.video_mode ? '' : 'none',
                    call_type: data.video_mode ? 'video' : 'audio',
                    call_id: data.call_id,
                    profile_display: 'you',
                    initiator: false,
                    discussion_id: data.discussion_id,
                    signal: data.signal,
                }
            })
            this.setState({
                ...this.state,
                ...{
                    call_audio_is_pending: data.audio_mode ? '' : 'none',
                    call_video_is_pending: data.video_mode ? '' : 'none',
                    call_id: data.call_id,
                    profile_display: 'you',
                    initiator: false,
                    discussion_id: data.discussion_id,
                    signal: data.signal,
                }
            })
        })

        setInterval(() => {
            if (this.typing_dote_text.length > 3) {
                this.typing_dote_text = []
            }
            if (!isNull(this.typing_dote.current)) this.typing_dote.current!.innerText = this.typing_dote_text.join('')
            this.typing_dote_text.push('.')
        }, 500)

        this.context.socket?.on('writting is event received', () => {
            this.setState({ ...this.state, ...{ typing_is_pending: true } })
            setTimeout(() => {
                this.setState({ ...this.state, ...{ typing_is_pending: false } })
            }, 3000);
        })

        this.groupCallManager()
    }

    groupCallManager = () => {
        this.context.socket!.on('group call request sent - audio', (call_data: CallRequestData) => {
            if (this.state.group_audio_call_is_pending || this.state.group_video_call_is_pending) return
            this.setState({ ...this.state, ...{ group_audio_call_is_pending: true } })
            this.context.event.emit('start audio call process', {
                initiator: false,
                call_id: call_data.call_id,
                discussion_id: call_data.discussion_id,
                initiator_id: call_data.initiator_id,
                group: JSON.parse(call_data.group),
                signal: call_data.signal,
            })
        })

        this.context.socket!.on('group call request sent - video', (call_data: CallRequestData) => {
            if (this.state.group_audio_call_is_pending || this.state.group_video_call_is_pending) return
            this.setState({ ...this.state, ...{ group_video_call_is_pending: true } })
            this.context.event.emit('start video call process', {
                initiator: false,
                call_id: call_data.call_id,
                discussion_id: call_data.discussion_id,
                initiator_id: call_data.initiator_id,
                group: JSON.parse(call_data.group),
                signal: call_data.signal,
            })
        })

        this.context.event.on('Reset audio call status', () => this.setState({ ...this.state, ...{ group_audio_call_is_pending: false } }))
        this.context.event.on('Reset video call status', () => this.setState({ ...this.state, ...{ group_video_call_is_pending: false } }))
    }

    toggleAudioState = () => {
        const call_id = v4(),
            initiator = this.state.call_audio_is_pending == 'none';
        this.context.more_info.setCallState({
            chat: this.props.conversation,
            is_visible: this.state.call_audio_is_pending == 'none' ? '' : 'none',
            discard_call: this.discardAudioCall,
            reset_call: this.resetProps,
            profile_display: this.state.profile_display,
            call_type: 'audio',
            initiator,
            call_id,
            discussion_id: this.state.discussion_id,
            signal: this.state.signal,
        })
        this.setState({
            ...this.state, ...{
                call_audio_is_pending: this.state.call_audio_is_pending == 'none' ? '' : 'none',
                call_id,
                initiator
            }
        })
    }

    toggleGroupAudioState = () => {
        if (this.state.group_audio_call_is_pending || this.state.group_video_call_is_pending) return
        this.setState({ ...this.state, ...{ group_audio_call_is_pending: true } })
        this.context.event.emit('start audio call process', {
            initiator: true,
            call_id: uuid(),
            discussion_id: this.props.conversation.discussion_id,
            initiator_id: this.context.id,
            group: this.props.conversation
        })
    }

    toggleGroupVideoState = () => {
        if (this.state.group_audio_call_is_pending || this.state.group_video_call_is_pending) return
        this.setState({ ...this.state, ...{ group_video_call_is_pending: true } })
        this.context.event.emit('start video call process', {
            initiator: true,
            call_id: uuid(),
            discussion_id: this.props.conversation.discussion_id,
            initiator_id: this.context.id,
            group: this.props.conversation
        })
    }

    toggleVideoState = () => {
        const call_id = v4(),
            initiator = this.state.call_video_is_pending == 'none';
        this.context.more_info.setCallState({
            chat: this.props.conversation,
            is_visible: this.state.call_video_is_pending == 'none' ? '' : 'none',
            discard_call: this.discardAudioCall,
            reset_call: this.resetProps,
            profile_display: this.state.profile_display,
            call_type: 'video',
            initiator,
            call_id,
            discussion_id: this.state.discussion_id,
            signal: this.state.signal,
        })
        this.setState({ ...this.state, ...{ call_video_is_pending: this.state.call_video_is_pending == 'none' ? '' : 'none', call_id, initiator } })
    }

    discardAudioCall = () => {
        if (this.state.call_audio_is_pending == '') this.toggleAudioState();
    }

    discardVideoCall = () => {
        if (this.state.call_video_is_pending == '') this.toggleVideoState();
    }

    resetProps = () => {
        this.context.more_info.setCallState({
            ...{
                chat: this.props.conversation,
                is_visible: 'none',
                discard_call: this.discardAudioCall,
                reset_call: this.resetProps,
                call_audio_is_pending: 'none',
                call_video_is_pending: 'none',
                call_type: 'audio',
                call_id: '',
                profile_display: 'you',
                initiator: true,
                discussion_id: 0,
                signal: '',
            }
        })
        this.setState({
            ...this.state,
            ...{
                call_audio_is_pending: 'none',
                call_video_is_pending: 'none',
                signal: '',
                call_id: '',
                discussion_id: 0,
            }
        })
    }

    onPinToTop = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        let response = await setDiscussionToTopMode(this.context.more_info.tk, this.props.conversation.discussion_id)
        if (response.code == 200) {
            await this.context.more_info.updateMessages()
            this.context.socket!.emit('thread has been pinned to top')
        }
    }

    deleteDiscussion = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        let response = await deleteDiscussion(this.context.more_info.tk, this.props.conversation.discussion_id)
        if (response.code == 200) {
            await this.context.more_info.updateMessages()
            await sleep(200)
            this.context.event.emit('exit to discussion')
            this.context.socket!.emit('discussion has been deleted')
        }
    }

    lockUnlockDiscussion = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        if (this.props.conversation.category == DISCUSSTION_TYPE.GROUPS) {
            let response = await lockUnlockDiscussionForlAll(this.context.more_info.tk, this.props.conversation.discussion_id)
            if (response.code == 200) {
                this.context.more_info.updateMessages()
                this.context.socket!.emit('block/unblock chat')
            }
        } else {
            let response = await lockUnlockDiscussion(this.context.more_info.tk, this.props.conversation.discussion_id)
            if (response.code == 200) {
                this.context.more_info.updateMessages()
                this.context.socket!.emit('block/unblock chat')
            }
        }
    }

    displayCallBtn = () => {
        if (!in_array(this.props.conversation.permission, [DISCUSSTION_PERMISSION.ADMIN, DISCUSSTION_PERMISSION.AUTHOR]) && this.props.conversation.locked_for_all) return null
        return <>
            <span className="chat-icon-favorite ml-1" onClick={() => this.toggleGroupAudioState()}>
                <i className="bx bx-phone font-medium-5 cursor-pointer"></i>
            </span>
            <span className="chat-icon-favorite ml-1" onClick={() => this.toggleGroupVideoState()}>
                <i className="bx bx-video font-medium-5 cursor-pointer"></i>
            </span>
        </>
    }

    render(): React.ReactNode {
        return (
            <SafeRaiseError>
                <React.Suspense fallback={<Loading />}>
                    <div className={`chat-header${this.props.is_visible ? '' : ' d-none'}`}>
                        <header className="d-flex justify-content-between align-items-center border-bottom px-1 py-75">
                            <div className="d-flex align-items-center">
                                <div className="chat-sidebar-toggle d-block d-lg-none mr-1"><i className="bx bx-menu font-large-1 cursor-pointer"></i>
                                </div>
                                <div className="avatar chat-profile-toggle m-0 mr-1" id="chat-profile-toggle">
                                    {
                                        this.props.conversation.category == DISCUSSTION_TYPE.GROUPS ?
                                            Conversation.getUserImage(`groups_avatar/${this.props.conversation.avatar}`, this.props.conversation, () => { }, 'header-logo-user') :
                                            Conversation.getUserImage(this.props.conversation.participant.you.avatar, this.props.conversation, () => { }, 'header-logo-user')
                                    }
                                    {
                                        this.props.conversation.category == DISCUSSTION_TYPE.GROUPS ? null :
                                            <span className={`avatar-status-${this.props.conversation.participant.you.status}`}></span>
                                    }
                                </div>
                                <h6 className="mb-0">
                                    {
                                        this.props.conversation.category == DISCUSSTION_TYPE.GROUPS ?
                                            this.props.conversation.group_name :
                                            `${this.props.conversation.participant.you.last_name} ${this.props.conversation.participant.you.first_name}`
                                    }
                                </h6>
                                {
                                    this.state.typing_is_pending ?
                                        <span className="ml-2">Typing <span ref={this.typing_dote}></span></span> : null
                                }
                            </div>
                            <div className="chat-header-icons">
                                {
                                    this.props.conversation.i_was_blocked ? null : (
                                        this.props.conversation.category == DISCUSSTION_TYPE.GROUPS ?
                                            this.displayCallBtn() :
                                            <>
                                                <span className="chat-icon-favorite ml-1" onClick={() => this.state.call_audio_is_pending == 'none' ? this.toggleAudioState() : null}>
                                                    <i className="bx bx-phone font-medium-5 cursor-pointer"></i>
                                                </span>
                                                <span className="chat-icon-favorite ml-1" onClick={() => this.state.call_video_is_pending == 'none' ? this.toggleVideoState() : null}>
                                                    <i className="bx bx-video font-medium-5 cursor-pointer"></i>
                                                </span>
                                            </>
                                    )
                                }
                                {/* <span className="chat-icon-favorite ml-1">
                                    <i className="bx bx-star font-medium-5 cursor-pointer"></i>
                                </span> */}
                                <span className="dropdown">
                                    <i className="bx bx-dots-vertical-rounded font-medium-4 ml-25 cursor-pointer dropdown-toggle nav-hide-arrow cursor-pointer" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu">
                                    </i>
                                    {
                                        this.props.conversation.category == DISCUSSTION_TYPE.GROUPS ?
                                            <span className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={this.onPinToTop}>
                                                    <i className="bx bx-pin mr-25"></i>
                                                    {this.props.conversation.pin_to_top ? 'Unpin' : 'Pin'} to top
                                                </a>
                                                {
                                                    this.props.conversation.permission == DISCUSSTION_PERMISSION.AUTHOR ?
                                                        <>
                                                            <a
                                                                className="dropdown-item"
                                                                href="#"
                                                                onClick={this.deleteDiscussion}>
                                                                <i className="bx bx-trash mr-25"></i>
                                                                Delete group
                                                            </a>
                                                            <a
                                                                className="dropdown-item"
                                                                href="#"
                                                                onClick={this.lockUnlockDiscussion}>
                                                                <i className={`bx bx-lock${this.props.conversation.locked_for_all ? '-open-' : '-'}alt mr-25`}></i>
                                                                {
                                                                    this.props.conversation.locked_for_all ? "Unlock" : "Block for all"
                                                                }
                                                            </a>
                                                        </> :
                                                        null
                                                }
                                            </span> :
                                            <span className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={this.onPinToTop}>
                                                    <i className="bx bx-pin mr-25"></i>
                                                    {this.props.conversation.pin_to_top ? 'Unpin' : 'Pin'} to top
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={this.deleteDiscussion}>
                                                    <i className="bx bx-trash mr-25"></i>
                                                    Delete chat
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={this.lockUnlockDiscussion}>
                                                    <i className="bx bx-block mr-25"></i>
                                                    {
                                                        this.props.conversation.i_blocked ? "Unlock" : "Block"
                                                    }
                                                </a>
                                            </span>
                                    }
                                </span>
                            </div>
                        </header>
                    </div>
                </React.Suspense>
            </SafeRaiseError>
        )
    }
}