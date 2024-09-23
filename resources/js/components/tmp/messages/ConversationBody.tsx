import React from "react";
import { AppContext } from "../data/chat";
import { sleep } from "../functions/tools";
import { AppContextInterface, ConversationBodyProps } from "../interfaces/chat";
import SafeRaiseError from "../SafeRaiseError";
import Conversation from "./Conversation";

// Swipper
import { Navigation, Pagination, Zoom } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/zoom'
import MessageReader from "../MessageReader";
import { Message } from "postcss";
import { DISCUSSTION_TYPE } from "../enums/chat";
import { isNull } from "lodash";


export class ConversationBody extends React.Component {
    static contextType?: React.Context<any> | undefined = AppContext;
    context!: AppContextInterface;
    props!: ConversationBodyProps
    state!: {
        page_loaded: boolean
        slide_visible: boolean
    }
    pending_queue: Set<number> = new Set()
    treaty_queue: Set<number> = new Set()
    chat_container: React.RefObject<HTMLDivElement> = React.createRef()
    goToBottomBtn: React.RefObject<HTMLButtonElement> = React.createRef()
    swiper!: SwiperType
    messageReader!: MessageReader

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            page_loaded: false,
            slide_visible: false,
        }
    }

    async componentDidMount() {
        this.setState({ ...this.state, ...{ page_loaded: true } })
        this.messageReader = new MessageReader(this.chat_container.current!, this.goToBottomBtn, this.context.socket, this.props.conversation.token, this.context)
        this.context.event.on(`scroll-${this.props.conversation.token}`, async () => {
            await sleep(500)
            this.scrollToBottom()
        })
        this.context.socket?.on('message aknowledge - received', this.context.more_info.updateMessages)
        this.context.event.on('message list are updated', () => {
            this.messageReader.update(this.chat_container.current!)
            this.displaySlider()
        })
    }

    scrollToBottom = () => {
        this.messageReader.scrollToBottom()
    }

    displaySlider() {
        if (this.chat_container.current == null) return
        let media: Array<HTMLImageElement | HTMLVideoElement> = Array.from(this.chat_container.current.querySelectorAll('img[data-is-media], video[data-is-media]'))
        return media.map((media_item, key) => {
            this.context.event.on(media_item.src, () => {
                this.swiper.slideTo(key)
                this.setState({ ...this.state, ...{ slide_visible: true } })
            })
            return <SwiperSlide key={key} className="d-flex align-items-center justify-content-center">
                {
                    media_item.nodeName.toLowerCase() == 'video' ?
                        <video src={media_item.src} controls /> :
                        <img src={media_item.src} alt={media_item.getAttribute('alt')!} />
                }
            </SwiperSlide>
        })
    }

    onSwiperInit = (swiper: SwiperType) => {
        this.swiper = swiper
    }

    onSwiperClose = () => {
        this.setState({ ...this.state, ...{ slide_visible: false } })
    }

    render(): React.ReactNode {
        return <SafeRaiseError>
            <div className="card-content h-100">
                <div className="card-body chat-container pl-1 pr-0">
                    <button
                        className="position-absolute go-to-bottom"
                        onClick={this.scrollToBottom}
                        ref={this.goToBottomBtn}>
                        <i className="bx bx-down-arrow"></i>
                    </button>
                    <div className="chat-content h-100 overflow-auto scroll-mode pr-1 position-relative" ref={this.chat_container} id={`scroll-messages-${this.props.conversation.discussion_id}`}>
                        <div className={`chat-preview${this.state.slide_visible ? '' : ' d-none'}`}>
                            <button
                                type="button"
                                className="btn btn-sm btn-danger shadow-none"
                                onClick={this.onSwiperClose}>
                                <span>&times;</span>
                            </button>
                            <Swiper
                                modules={[Navigation, Pagination, Zoom]}
                                spaceBetween={50}
                                slidesPerView={1}
                                navigation={{
                                    hideOnClick: true
                                }}
                                pagination={{
                                    clickable: true,
                                    hideOnClick: true
                                }}
                                zoom={{
                                    maxRatio: 5,
                                    toggle: true
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                                onInit={this.onSwiperInit}>
                                {
                                    this.state.page_loaded ? this.displaySlider() : null
                                }
                            </Swiper>
                        </div>
                        {
                            this.props.messages.map((message, index) => <div key={index} className={`chat${message.user_id == this.context.id || 'token' in message ? 'chat-rigth' : ' chat-left'}`}>
                                <div className="chat-avatar">
                                    <a className="avatar m-0">
                                        {
                                            Conversation.getUserImage(
                                                ((message: Message) => {
                                                    let logo_user = 'avatar/user.png'
                                                    if (isNull(message.user_id) || message.user_id == 0) return logo_user
                                                    if (this.props.conversation.category == DISCUSSTION_TYPE.CHATS) {
                                                        logo_user = message.user_id == this.context.id ? this.props.conversation.participant.me.avatar : this.props.conversation.participant.you.avatar
                                                    } else {
                                                        logo_user = message.user_id == this.context.id ? this.context.avatar : this.props.conversation.group_participant.filter(user => user.id == message.user_id).at(0)!.avatar
                                                    }
                                                    return logo_user
                                                })(message as any),
                                                this.props.conversation
                                            )
                                        }
                                    </a>
                                </div>
                                {this.props.body[index]}
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </SafeRaiseError>
    }
}