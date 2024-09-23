import React from "react";
import $ from 'jquery'
import { in_array, sleep } from "./functions/tools";
import { isArray, isEmpty } from "lodash";
import { markMessageAsReaded } from "./API/chat";
import { Socket } from "socket.io-client";
import { scrollTo } from "./functions/chat";
import { AppContextInterface } from "./interfaces/chat";
import { IUserOptions } from "animated-scroll-to";


export default class MessageReader {

    protected chat_message!: Array<HTMLDivElement>
    protected pending_queue: Set<number> = new Set()
    protected treaty_queue: Set<number> = new Set()

    constructor(
        protected discussion: HTMLDivElement,
        protected goToBottomBtn: React.RefObject<HTMLButtonElement>,
        protected socket: Socket | undefined,
        protected discussion_token: string,
        protected context: AppContextInterface,
    ) {
        this.dispatchChatMessahe()
        this.handler()
    }

    update(new_discussion: HTMLDivElement) {
        this.discussion = new_discussion
        this.dispatchChatMessahe()
    }

    scrollToBottom = (options?: IUserOptions, callback?: Function) => {
        if (isEmpty(this.chat_message)) return
        scrollTo(this.discussion, this.chat_message.at(-1)!.offsetTop + this.chat_message.at(-1)!.offsetHeight, options, callback)
    }

    protected dispatchChatMessahe = () => {
        this.chat_message = (Array.from(this.discussion.children) as Array<HTMLDivElement>).filter(element => !element.classList.contains('chat-preview'))
    }

    protected handler() {
        setInterval(this.scroll, 500)
        // $(this.discussion).on('scroll', this.scroll)

        this.context.event.on(`scroll-acknowledge-message-${this.discussion_token}`, () => {
            setTimeout(() => {
                let { bottom, total_heigth } = this.getDiscussionsScreenPositions()

                if (bottom >= (total_heigth - (this.discussion.clientHeight / 4))) {
                    this.scrollToBottom({ maxDuration: 2000 }, async () => {
                        await sleep(500)
                        this.scroll()
                    })
                }
            }, 1000);
        })
    }

    protected getDiscussionsScreenPositions = () => ({
        top: $(this.discussion).scrollTop()!,
        bottom: this.discussion.clientHeight! + $(this.discussion).scrollTop()!,
        total_heigth: this.chat_message.at(-1)!.offsetTop + this.chat_message.at(-1)!.offsetHeight,
    })

    protected scroll = () => {
        if (this.goToBottomBtn.current == null) return
        if (isEmpty(this.chat_message)) {
            this.goToBottomBtn.current!.style.display = 'none'
            return
        }
        let { top, bottom, total_heigth } = this.getDiscussionsScreenPositions()

        if (total_heigth > (this.discussion.clientHeight + (this.discussion.clientHeight / 4)) && bottom >= (total_heigth - (this.discussion.clientHeight / 4))) {
            this.goToBottomBtn.current!.style.display = 'none'
        } else if (this.discussion.clientHeight > total_heigth) {
            this.goToBottomBtn.current!.style.display = 'none'
        } else {
            this.goToBottomBtn.current!.style.display = ''
        }


        this.chat_message.forEach((message) => {
            if (message.classList.contains('chatchat-rigth')) return

            let position_top = message.offsetTop,
                position_bottom = position_top + message.clientHeight,
                chat_body = message.querySelector('.chat-body')!;

            if ((position_top > top && position_top < bottom) || (position_bottom > top && position_bottom < bottom)) {
                if (!chat_body.hasAttribute('data-has-unreaded-message') || !in_array(chat_body.getAttribute('data-has-unreaded-message'), ['true', 'false'])) return
                if (chat_body.getAttribute('data-has-unreaded-message') == 'false') return
                if (!chat_body.hasAttribute('data-messages') || !isArray(JSON.parse(chat_body.getAttribute('data-messages')!))) return

                let message_list: Array<number> = JSON.parse(chat_body.getAttribute('data-messages')!)
                message_list.forEach(id => {
                    this.pending_queue.add(id)
                })

                this.pending_queue.forEach(async id => {
                    if (this.treaty_queue.has(id)) return

                    chat_body.setAttribute('data-has-unreaded-message', 'false')
                    this.treaty_queue.add(id)
                    const { code } = await markMessageAsReaded(this.context.more_info.tk, id)

                    if (code == 418) return
                    this.socket?.emit('message - aknowledge')
                })
            }
        })
    }
}