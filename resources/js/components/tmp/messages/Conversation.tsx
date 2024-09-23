import { isEmpty, isNull, isUndefined } from "lodash";
import React from "react";
import { v4 } from "uuid";
import { AppContext, getFileSizeInfoAsNumber } from "../data/chat";
import { DISCUSSTION_TYPE, MESSAGE_ATTACHMENT_TYPE, MESSAGE_STATUS } from "../enums/chat";
import { extractFormatMessage, getURI } from "../functions/tools";
import { Discussion, ConversationProps, Message, MessageProgress, AppContextInterface } from "../interfaces/chat";
import SafeRaiseError from "../SafeRaiseError";
import { ConversationBody } from "./ConversationBody";
import { ConversationHeader } from "./ConversationHeader";
import ConversationInput from "./ConversationInput";


export default class Conversation extends React.Component {
    props!: ConversationProps
    static contextType?: React.Context<any> | undefined = AppContext;
    context!: AppContextInterface;

    constructor(props: {} | Readonly<{}>) {
        super(props)
    }

    buildMessages() {
        let messages: Array<Array<Message | MessageProgress>> = [];
        this.props.conversation.messages.forEach(message => {
            (messages.length == 0) ?
                messages.push([message]) :
                (messages.at(-1)![messages.at(-1)!.length - 1].user_id == message.user_id) ? messages.at(-1)!.push(message) : messages.push([message]);
        })

        return { body: messages.map(message => this.buildBodyMessages(message)), messages: messages.map(message => message[0]) }
    }

    buildBodyMessages(messageGroup: Array<any>) {
        const has_unreaded_message = messageGroup.filter(message => message.status == MESSAGE_STATUS.UNREADED).length > 0

        return <React.Fragment key={v4()}>
            <div className="chat-body" data-has-unreaded-message={has_unreaded_message} data-messages={JSON.stringify(messageGroup.map(message => message.id))}>
                {
                    messageGroup.map(message => !('token' in message) ? (
                        <div key={message.id} className="chat-message" data-status={message.status} style={{ maxWidth: '90%' }}>
                            {message.message.length > 0 ? <p>{message.message}</p> : null}
                            {this.buildAttachmentView(message)}
                            <span className="chat-time d-flex align-items-center">
                                {message.status == MESSAGE_STATUS.READED && message.user_id == this.context.id ? <i className="bx bx-check-double mr-1 text-info"></i> : null}
                                <span>
                                    {
                                        ((message: Message) => {
                                            if (isNull(message.user_id)) return ''
                                            const datetime = message.created_at,
                                                senderTimezone = message.user_id == this.context.id
                                                    ? this.context.timezone // Si l'expéditeur est l'utilisateur actuel, utiliser son fuseau horaire
                                                    : (
                                                        this.props.conversation.category == DISCUSSTION_TYPE.CHATS
                                                            ? this.props.conversation.participant.you.timezone // Si la conversation est un chat, utiliser le fuseau horaire du destinataire
                                                            : this.props.conversation.group_participant.filter(user => user.id == message.user_id)[0].timezone
                                                    ), // Si la conversation est un groupe, utiliser le fuseau horaire de l'expéditeur
                                                receiverTimezone = this.context.timezone

                                            return extractFormatMessage(datetime, senderTimezone, receiverTimezone)
                                        })(message)
                                    }
                                </span>
                            </span>
                        </div>
                    ) : (
                        <div key={message.id} ref={message.messageElement} className="chat-message" style={{ maxWidth: '90%' }}>
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ width: '100px', height: '100px' }}>
                                <p style={{ fontSize: '20px' }}>0%</p>
                            </div>
                            {message.callback()}
                        </div>
                    ))
                }
            </div>
        </React.Fragment>
    }

    buildAttachmentView = (message: Message) => {
        if (isEmpty(message.attachments)) return null
        let dom: Array<JSX.Element> = [],
            className = ''
        if (message.attachments.length <= 4) {
            className = 'col-sm-12 col-md-6 col-lg-6 col-xl-4'
        }
        if (message.attachments.length <= 3) {
            className = 'col-sm-12 col-md-6 col-lg-6 col-xl-4'
        }
        if (message.attachments.length <= 2) {
            className = 'col-sm-12 col-md-6 col-lg-6 col-xl-6'
        }
        if (message.attachments.length <= 1) {
            className = 'col-12'
        }
        message.attachments.forEach((attachment, key) => {
            const URI = getURI(`messages_attachments/${attachment.name}`)
            switch (attachment.type.toLowerCase()) {
                case MESSAGE_ATTACHMENT_TYPE.AUDIO:
                    dom.push(
                        <div className={`d-flex align-items-center justify-content-end ${className}`} key={key} style={{ height: '129px' }}>
                            <div
                                className="w-100 text-left p-1 rounded-lg bg-light text-dark text-decoration-none">
                                <p className="number-of-line-1">{attachment.name}</p>
                                <audio src={URI} controls style={{ width: '100%', height: '30px' }} />
                            </div>
                        </div>
                    )
                    break;
                case MESSAGE_ATTACHMENT_TYPE.DOCUMENT:
                    dom.push(
                        <div className={`d-flex align-items-center justify-content-end ${className}`} key={key} style={{ height: '129px' }}>
                            <a
                                className="w-100 text-left p-1 rounded-lg bg-light text-dark cursor-pointer text-decoration-none"
                                href={URI}
                                download={attachment.name}>
                                <p className="number-of-line-1">{attachment.name}</p>
                                <strong>Size:</strong> {getFileSizeInfoAsNumber(attachment.size).value}{getFileSizeInfoAsNumber(attachment.size).symbol.toLowerCase()}<br />
                                <strong>Type:</strong> <span className="text-capitalize">{attachment.type}</span><br />
                            </a>
                        </div>
                    )
                    break;
                case MESSAGE_ATTACHMENT_TYPE.IMAGE:
                    dom.push(
                        <div className={`${className} d-flex justify-content-center`} key={key}>
                            <img
                                src={URI}
                                alt="attachment image"
                                className="rounded-sm cursor-pointer"
                                data-is-media
                                style={{ maxWidth: '230px' }}
                                onClick={() => this.context.event.emit(URI)} />
                        </div>
                    )
                    break;
                case MESSAGE_ATTACHMENT_TYPE.VIDEO:
                    dom.push(
                        <div className={`${className} d-flex justify-content-center position-relative`} key={key}>
                            <video
                                key={key}
                                className="rounded-sm cursor-pointer bg-light"
                                src={URI}
                                data-is-media
                                style={{ maxWidth: '230px' }}
                                onClick={() => this.context.event.emit(URI)} />
                            <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center" style={{ top: 0, left: 0, pointerEvents: 'none' }}>
                                <img src={getURI('app-assets/images/bouton-play.png')} alt="logo play" style={{ width: '25px' }} />
                            </div>
                        </div>
                    )
                    break;

                default:
                    return null
                    break;
            }
        })
        return <div className="row">
            {
                dom.map(item => item)
            }
        </div>
    }

    static getUserImage(image: string | null, conversation: Discussion, callback?: Function, customId: string = 'header-logo') {
        return (isNull(image) ?
            <span
                className="avatar-content"
                id={customId}
                style={{
                    backgroundColor: conversation.participant.you.color,
                    borderRadius: '36px',
                }}>{`${conversation.participant.you.last_name[0]}${conversation.participant.you.first_name[0]}`}</span> :
            <img
                src={`${getURI()}/${isNull(image) ? 'user.png' : image}`}
                height="36"
                width="36"
                id={customId}
                alt="sidebar user image"
                onClick={!isUndefined(callback) ? callback() : null} />)
    }

    render(): React.ReactNode {
        const { body, messages } = this.buildMessages()

        return <SafeRaiseError>
            <>
                <ConversationHeader {...{ is_visible: this.props.is_visible, conversation: this.props.conversation, profile_card: this.props.profile_card }} />
                <div className={`card chat-wrapper overflow-auto position-relative${this.props.is_visible ? '' : ' d-none'}`} style={{ height: 'calc(100% - 60px)' }}>
                    <ConversationBody {...{ body, messages, conversation: this.props.conversation }} />
                    <ConversationInput {
                        ...this.props
                    } />
                </div>
            </>
        </SafeRaiseError>
    }
}