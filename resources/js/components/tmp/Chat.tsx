import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";

import { AppContext, editEnv, fakeUser, fake_more_info } from "./data/chat";
import { CallObject, Discussion, ChatProps, ChatState, Messages, MessageProgress, ChatObject } from "./interfaces/chat";
import SafeRaiseError from "./SafeRaiseError";
import { getSocketConnection, socketPlace } from "./functions/socket.io";
import { Socket } from "socket.io-client";
import { isEmpty, isNull, isString, isUndefined } from "lodash";
import { getURI, in_array, sleep } from "./functions/tools";
import { getMyConversations } from "./API/chat";
import { formatUser, formatUsers, renew_login } from "./functions/chat";
import Loading from "./Loading";
import { EventEmitter } from 'events'
import { MessageProgressType } from "./types/chat";
import { DISCUSSTION_TYPE } from "./enums/chat";
import GroupCall from "./messages/call/GroupCall";

const ConversationLeftSide = lazy(() => import('./messages/ConversationLeftSide'))
const ConversationRigthSide = lazy(() => import('./messages/ConversationRigthSide'))
const Conversation = lazy(() => import('./messages/Conversation'))
const AudioCall = React.lazy(() => import('./messages/call/AudioCall'))
const VideoCall = React.lazy(() => import('./messages/call/VideoCall'))

const chat = document.getElementById('chat-message'),
    token = chat?.hasAttribute('data-tk') ? chat.getAttribute('data-tk') : null,
    cp = chat?.hasAttribute('data-cp') ? chat.getAttribute('data-cp') : null;
// console.log(chat, token);


declare global {
    interface Window {
        search_is_ready: boolean
    }
}


class Chat extends React.Component {
    props!: ChatProps;
    state!: ChatState;
    socket!: Socket
    event!: EventEmitter
    lastSearchDiscussionInput: string = ""

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            messages: {} as ChatObject,
            current_conversation: '',
            user: {
                ...fakeUser,
                more_info: {
                    ...fake_more_info, ...{
                        setupDiscussion: async () => { },
                        setCallState: this.setCallState,
                        updateMessages: async () => { },
                        addPendingMessage: (message: React.RefObject<HTMLDivElement>, id: string, discussion_type: DISCUSSTION_TYPE, discussion_id: number, callback: Function) => { },
                        removePendingMessage: (message: React.RefObject<HTMLDivElement>, id: string, discussion_type: DISCUSSTION_TYPE, discussion_id: number, callback: Function) => { },
                    }
                },
                event: new EventEmitter()
            },
            searchDiscussionResults: {} as Messages,
            search_is_ready: false,
        }
    }

    async componentDidMount() {
        const { token } = this.props
        let { data, user } = (await getMyConversations(`${getURI()}/api`, token))

        // let user = me!.length > 0 ? me![0] : null
        if ((isUndefined(data) || isUndefined(user)) || (isNull(user) || isEmpty(user))) return renew_login();
        user = formatUser(user)
        data = formatUsers(data)
        this.socket = await getSocketConnection();
        this.event = new EventEmitter()

        this.setState({
            ...this.state, ...{
                user: {
                    ...user,
                    ...{
                        more_info: {
                            ...{
                                tk: this.props.token,
                                company: parseInt(this.props.company),
                                setupDiscussion: this.setupDiscussion,
                                updateMessages: this.updateMessages,
                                addPendingMessage: this.addPendingMessage,
                                removePendingMessage: this.removePendingMessage,
                                setCallState: this.setCallState,
                                control_center: React.createRef(),
                            }
                        },
                        socket: this.socket,
                        call_object: {
                            chat: isEmpty(data) ? data : data[Object.keys(data)[0]][0],
                            is_visible: "none",
                            discard_call: () => { },
                            reset_call: () => { },
                            profile_display: 'you',
                            initiator: true,
                            call_id: "",
                            discussion_id: 0,
                            signal: "",
                        }
                    },
                    event: this.event
                },
                messages: data,
                searchDiscussionResults: data,
            }
        })

        let timer = setInterval(() => {
            if (!isNull(this.state.user.more_info.control_center.current)) {
                this.subscribeToProfileImageAction();
                clearInterval(timer)
            }
        }, 1000)
        this.subscribeToKeyboard()

        this.socket.emit('connected', {
            user_id: user!.id,
            discussions: this.extractDiscussionToken(data),
            client_socket_id: this.socket.id
        })
        this.bindChatToWebSocket();

        let search_listener = setInterval(() => {
            let keys = new Set(Object.keys(window))
            if (keys.has('search_is_ready') && window.search_is_ready) {
                clearInterval(search_listener)
                this.setState({ ...this.state, ...{ search_is_ready: true } })
            }
        }, 500)
    }

    buildMessageProgress = (token: string, messageElement: React.RefObject<HTMLDivElement>, callback: Function): MessageProgressType => {
        return {
            id: 0,
            discussion_id: 0,
            message: '',
            status: '',
            created_at: '',
            updated_at: '',
            user_id: 0,
            percent: 0,
            token: '',
            messageElement,
            callback,
        }
    }

    addPendingMessage = (message: React.RefObject<HTMLDivElement>, id: string, discussion_type: DISCUSSTION_TYPE, discussion_id: number, callback: Function) => {
        let discussion = Object.assign({}, this.state.messages[discussion_type].filter(item => item.discussion_id == discussion_id)[0]),
            message_item: MessageProgressType = Object.assign({}, discussion.messages.length > 0 ? discussion.messages.at(-1) as any : this.buildMessageProgress(id, message, callback)),
            last_id = discussion.messages.length > 0 ? discussion.messages.at(-1)!.id : 0;

        message_item.token = id
        message_item.percent = 0
        message_item.id = last_id + 1
        message_item.messageElement = message
        message_item.callback = callback
        discussion.messages.push(message_item as MessageProgress)
        this.setState({
            ...this.state,
            ...{
                messages: {
                    ...this.state.messages,
                    ...{
                        [discussion_type]: this.state.messages[discussion_type].map(item => item.discussion_id == discussion_id ? discussion : item)
                    }
                },
                searchDiscussionResults: {
                    ...this.state.searchDiscussionResults,
                    ...{
                        [discussion_type]: this.state.messages[discussion_type].map(item => item.discussion_id == discussion_id ? discussion : item)
                    }
                },
            }
        })
    }

    removePendingMessage = (message: React.RefObject<HTMLDivElement>, id: string, discussion_type: DISCUSSTION_TYPE, discussion_id: number, callback: Function) => {
        let discussion = Object.assign({}, this.state.messages[discussion_type].filter(item => item.discussion_id == discussion_id)[0]);
        discussion.messages = discussion.messages.filter(message_item => {
            if (!('token' in message_item)) return message_item
            if ('token' in message_item && message_item.token !== id) return message_item
        })

        this.setState({
            ...this.state,
            ...{
                messages: {
                    ...this.state.messages,
                    ...{
                        [discussion_type]: this.state.messages[discussion_type].map(item => item.discussion_id == discussion_id ? discussion : item)
                    }
                },
                searchDiscussionResults: {
                    ...this.state.searchDiscussionResults,
                    ...{
                        [discussion_type]: this.state.messages[discussion_type].map(item => item.discussion_id == discussion_id ? discussion : item)
                    }
                },
            }
        })
        callback()
    }

    setCallState = (call_object: CallObject) => {
        this.setState({
            ...this.state,
            ...{
                user: {
                    ...this.state.user,
                    ...{
                        call_object: {
                            ...this.state.user.call_object,
                            ...call_object
                        }
                    }
                },
            }
        })
    }

    bindChatToWebSocket = (socket?: Socket) => {
        isUndefined(socket) ? socketPlace(this.socket) : socketPlace(socket!)

        this.socket!.on('thread has been pinned to top - transmission', this.setupDiscussion)
        this.socket!.on('discussion has been deleted - transmission', this.updateMessages)
        this.socket!.on('block/unblock chat - transmission', this.updateMessages)
    }

    extractDiscussionToken = (messages: Messages) => {
        let tokens: string[] = []

        Object.values(messages).forEach(chatList => chatList.forEach(chat => tokens.indexOf(chat.token) == -1 ? tokens.push(chat.token) : null))
        return tokens
    }

    componentDidUpdate() {
        this.subscribeToProfileImageAction();
    }

    setupDiscussion = async () => {
        const { token } = this.props
        let { data } = await getMyConversations(`${window.location.origin}/api`, token)

        if (isEmpty(data)) return []
        data = formatUsers(data)
        this.setState({ ...this.state, ...{ messages: data, searchDiscussionResults: data } })
        return data
    }

    updateMessages = async () => {
        const { token } = this.props
        let { data } = (await getMyConversations(`${getURI()}/api`, token))

        // let user = me!.length > 0 ? me![0] : null
        if (isUndefined(data)) return renew_login();
        data = formatUsers(data)

        this.setState({ ...this.state, ...{ messages: data, searchDiscussionResults: data } })
        setTimeout(() => {
            this.event.emit('message list are updated')
        }, 1000);
    }

    hasCategoryMessage = (category: string) => {
        return in_array(category, Object.values(this.state.messages).map(cat => Object.keys(cat)[0]))
    }

    getChatListByCategory = (category: DISCUSSTION_TYPE) => {
        return this.state.messages[category]
    }

    subscribeToProfileImageAction = () => {
        let images = this.state.user.more_info.control_center.current?.querySelectorAll('#header-logo-user'),
            boxs = this.state.user.more_info.control_center.current?.querySelectorAll('#chat-profile');
        boxs?.forEach(box => {
            box?.querySelector('#chat-profile-close')?.addEventListener('click', () => {
                box.classList.contains('show') ? box?.classList.remove('show') : null;
            }, false)
        })
        images?.forEach((image, index) => {
            image.addEventListener('click', () => {
                boxs?.forEach(box => box.classList.contains('show') ? box.classList.remove('show') : null)
                if (isUndefined(boxs![index]) || isNull(boxs![index])) return
                boxs![index].classList.contains('show') ? null : boxs![index].classList.add('show')
            }, false)
        })
    }

    subscribeToKeyboard() {
        document.addEventListener('keyup', e => {
            e.preventDefault()
            if (e.key.toLowerCase() == 'escape' && this.state.current_conversation != '') this.setState({ ...this.state, ...{ current_conversation: '' } })
        }, false)

        this.event.on('exit to discussion', () => this.setState({ ...this.state, ...{ current_conversation: '' } }))
    }

    toggleConversation = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, chat: Discussion) => {
        this.setState({ ...this.state, ...{ current_conversation: chat.token } })
    }

    extractToChatList = (category: Array<Array<Discussion>>): Array<Discussion> => {
        let chatList: any = []
        for (const chat of category) {
            chatList = [...chatList, ...chat]
        }
        return chatList
    }

    displayConversation = (chatList: Array<Discussion>) => {
        return chatList.map(conversation => <Conversation {...{ key: conversation.token, conversation, is_visible: this.state.current_conversation == conversation.token }} />)
    }

    displayCallBulle = (call_object: CallObject | undefined) => {
        if (isEmpty(call_object?.chat)) return null
        return call_object?.call_type == 'audio' ?
            <AudioCall {...call_object} /> :
            <VideoCall {...call_object} />
    }

    searchDiscussion = async (text: string) => {

        if (isEmpty(text) || !isString(text)) {
            this.setState({
                ...this.state, ...{
                    searchDiscussionResults: this.state.messages
                }
            })
            return
        }

        if (this.lastSearchDiscussionInput.length > text.length) {
            this.setState({
                ...this.state, ...{
                    searchDiscussionResults: this.state.messages
                }
            })
            await sleep(500)
        }

        this.setState({
            ...this.state, ...{
                searchDiscussionResults: ((text) => {
                    let result_copy: Messages = {}
                    Object.keys(this.state.searchDiscussionResults).forEach(category => {
                        result_copy[category] = this.state.searchDiscussionResults[category].filter(discussion => (
                            `${discussion.participant.you.first_name} ${discussion.participant.you.last_name} ${discussion.participant.you.user_name} ${discussion["last message"].message}`.toLowerCase().match(text.toLowerCase())
                        ))
                    })
                    Object.keys(this.state.searchDiscussionResults).forEach(category => {
                        if (isEmpty(result_copy[category])) delete result_copy[category]
                    })
                    return result_copy
                })(text)
            }
        })
        
        this.lastSearchDiscussionInput = text
    }

    render(): React.ReactNode {
        return (
            <AppContext.Provider value={this.state.user}>
                <SafeRaiseError>
                    <Suspense fallback={<Loading />}>
                        {
                            isUndefined(this.state.user.socket) && isUndefined(this.state.user.call_object) || !this.state.search_is_ready ?
                                <Loading /> :
                                (
                                    <>
                                        {
                                            <ConversationLeftSide {...{
                                                messages: this.state.searchDiscussionResults,
                                                toggleConversation: this.toggleConversation,
                                                searchDiscussion: this.searchDiscussion
                                            }} />
                                        }
                                        <ConversationRigthSide {...{
                                            current_conversation: this.state.current_conversation,
                                            displayConversation: this.displayConversation,
                                            extractToChatList: this.extractToChatList,
                                            messages: this.state.searchDiscussionResults,
                                        }} />
                                        {this.displayCallBulle(this.state.user.call_object)}
                                        <GroupCall />
                                    </>
                                )
                        }
                    </Suspense>
                </SafeRaiseError>
            </AppContext.Provider>
        )
    }
}

(async () => {
    // await editEnv()
    if (chat && !isNull(cp) && !isNull(token)) createRoot(chat).render(<Chat {...{ token, company: cp }} />);
})()