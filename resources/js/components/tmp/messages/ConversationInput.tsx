import React, { lazy } from "react";
import SafeRaiseError from "../SafeRaiseError";
import { EmojiClickData, EmojiStyle, Theme } from 'emoji-picker-react';
import { AppContext, extractExtension, extractExtensions, fileInputExtensionsAccepts, getFileCategoryByExtension, getFileSizeInfo } from "../data/chat";
import Preview from "./preview/Preview";
import { isEmpty, isNull, isUndefined } from "lodash";
import { debugge, in_array } from "../functions/tools";
import AudioRecorder from "./preview/AudioRecorder";
import VideoRecorder from "./preview/VideoRecorder";
import { AppContextInterface, ConversationProps, Queue } from "../interfaces/chat";
import { saveMessage } from "../API/chat";
import { v4 as uuid } from 'uuid'
import { DISCUSSTION_PERMISSION, DISCUSSTION_TYPE, MESSAGE_ATTACHMENT_TYPE, QUEUE_STATE } from "../enums/chat";
import MessageAttachment from "./Objects/MessageAttachment";

const EmojiPicker = lazy(() => import('emoji-picker-react')),
    emojiPickerSize = {
        witdh: 350,
        heigth: 350
    }


export default class ConversationInput extends React.Component {
    props!: Readonly<ConversationProps>;
    state: Readonly<{
        emojiIsOpen: boolean,
        filesSelected: Array<File>,
        recordingIsPending: boolean,
        recordingType: 'audio' | 'video',
    }>;
    textInput: React.RefObject<HTMLTextAreaElement> = React.createRef()
    fileInput: React.RefObject<HTMLInputElement> = React.createRef()
    progressUploadElement: React.RefObject<HTMLDivElement> = React.createRef()
    context!: AppContextInterface;
    static contextType?: React.Context<any> | undefined = AppContext;
    message: string = ''
    queue: Array<MessageAttachment> = []

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            emojiIsOpen: false,
            filesSelected: [],
            recordingIsPending: false,
            recordingType: 'audio',
        }
    }

    componentDidMount(): void {
        this.context.socket?.on('message sent - aknowledge', () => {
            this.context.more_info.updateMessages()
            this.context.event.emit(`scroll-acknowledge-message-${this.props.conversation.token}`)
        })
    }

    onEmojiClick = ({ emoji }: EmojiClickData) => {
        const currentTextSelection = {
            start: this.textInput.current?.selectionStart,
            end: this.textInput.current?.selectionEnd,
        }
        this.textInput.current?.setRangeText(emoji, currentTextSelection.start!, currentTextSelection.end!)
        this.textInput.current?.setSelectionRange(currentTextSelection.start! + emoji.length, currentTextSelection.end! + emoji.length)
        this.textInput.current?.focus()
        this.onTypingMessage({ target: this.textInput.current, key: '' })
    }

    onFileInputClick = () => this.fileInput.current?.click()

    onFileInputChange = ({ target: input }: React.ChangeEvent<HTMLInputElement>) => {
        let files: FileList | null = input.files
        this.checkFileInput(files)
    }

    checkFileInput(files: Array<File> | FileList | null) {
        let allowedFiles: Array<File> = []

        if (isNull(files)) return
        for (const file of files) {
            const { value, symbol } = getFileSizeInfo(file)
            if (!in_array(extractExtension(file.name), extractExtensions().map(extension => `.${extension}`))) continue

            switch (getFileCategoryByExtension(extractExtension(file.name)!)) {
                case MESSAGE_ATTACHMENT_TYPE.IMAGE:
                    if (value > 2 && symbol.toLowerCase() == 'mb') continue
                    break;
                case MESSAGE_ATTACHMENT_TYPE.AUDIO:
                    if (value > 10 && symbol.toLowerCase() == 'mb') continue
                    break;
                case MESSAGE_ATTACHMENT_TYPE.VIDEO:
                    if (value > 35 && symbol.toLowerCase() == 'mb') continue
                    break;
                case MESSAGE_ATTACHMENT_TYPE.DOCUMENT:
                    if (value > 100 && symbol.toLowerCase() == 'mb') continue
                    break;

                default:
                    continue
            }
            allowedFiles.push(file)
        }
        if (allowedFiles.length > 0) {
            this.setState({ ...this.state, ...{ filesSelected: [...this.state.filesSelected, ...allowedFiles], recordingIsPending: false } })
        }
    }

    removeFile = (attachment: File) => {
        this.setState({ ...this.state, ...{ filesSelected: this.state.filesSelected.filter(file => file !== attachment) } })
    }

    wipeAllFiles = () => {
        this.setState({ ...this.state, ...{ filesSelected: [] } })
    }

    toggleEmojiVisibility = () => {
        this.setState({ ...this.state, ...{ emojiIsOpen: !this.state.emojiIsOpen } })
        this.textInput.current?.focus()
    }

    runAudioRecorder = () => {
        if (this.state.recordingIsPending) return
        this.setState({ ...this.state, ...{ recordingIsPending: true, recordingType: 'audio' } })
    }

    runVideoRecorder = () => {
        if (this.state.recordingIsPending) return
        this.setState({ ...this.state, ...{ recordingIsPending: true, recordingType: 'video' } })
    }

    closeRecordingPanel = (file: File | null) => {
        if (isNull(file)) {
            this.setState({ ...this.state, ...{ recordingIsPending: false } })
            return
        }
        this.checkFileInput(Array.from([file]))
    }

    onTypingMessage = (event: any) => {
        // Emit on writting event
        if (isUndefined(event.target.value)) return
        this.context.socket?.emit('writting is pending')
        this.message = event.target.value
        if (event.key.toLowerCase() == 'enter') this.onSendMessage()
    }

    onSendMessage = (event?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event?.preventDefault()
        event?.stopPropagation()

        if (isEmpty(this.message.trim()) && this.state.filesSelected.length == 0) return
        if (isEmpty(this.message.trim())) this.message = ''

        const queue: Queue = {
            id: uuid(),
            token: this.context.more_info.tk,
            files: this.state.filesSelected,
            state: QUEUE_STATE.PENDING,
            messageElement: React.createRef(),
            datas: {
                discussion_id: this.props.conversation.discussion_id,
                user_id: this.context.id,
                correspondant_id: this.props.conversation.category == DISCUSSTION_TYPE.CHATS ? this.props.conversation.participant.you.id : 0,
                correspondant_list: this.props.conversation.category == DISCUSSTION_TYPE.GROUPS ? this.props.conversation.group_participant.map(user => user.id) : [],
                message: this.message,
                category: this.props.conversation.category
            },
        }
        console.log(queue);
        let message_attachment = new MessageAttachment(queue)
        console.log(message_attachment);
        this.queue.push(message_attachment)
        this.wipeAllFiles()
        this.textInput.current!.value = ''
        this.message = ""
        this.textInput.current?.focus()

        this.queue.forEach(async queue => {
            if (isNull(queue.getQueue())) return
            if (queue.getQueue()!.state == QUEUE_STATE.IN_PROGRESS) return
            queue.getQueue()!.state = QUEUE_STATE.IN_PROGRESS

            const { code } = await saveMessage(queue.getQueue()!, this.context.more_info.addPendingMessage)
            if (code == 200) {
                this.context.more_info.removePendingMessage(queue.getQueue()!.messageElement, queue.getQueue()!.id, queue.getQueue()!.datas.category, queue.getQueue()!.datas.discussion_id, () => {
                    this.queue = this.queue.filter(queue_item => queue_item.getQueue()!.id !== queue.getQueue()!.id)
                    this.context.more_info.updateMessages()
                    this.context.socket?.emit('message sent')
                    this.context.event.emit(`scroll-${this.props.conversation.token}`)
                })
            } else {
                this.context.more_info.removePendingMessage(queue.getQueue()!.messageElement, queue.getQueue()!.id, queue.getQueue()!.datas.category, queue.getQueue()!.datas.discussion_id, () => {
                    this.queue = this.queue.filter(queue_item => queue_item.getQueue()!.id !== queue.getQueue()!.id)
                })
            }
        })
    }

    myDiscussionIsLocked = () => {
        if (this.props.conversation.permission !== DISCUSSTION_PERMISSION.AUTHOR && this.props.conversation.i_was_blocked) return true
        if (!in_array(this.props.conversation.permission, [DISCUSSTION_PERMISSION.ADMIN, DISCUSSTION_PERMISSION.AUTHOR]) && this.props.conversation.locked_for_all) return true
        return false
    }

    render(): React.ReactNode {
        return <SafeRaiseError>
            {
                this.myDiscussionIsLocked() ?
                    <div></div> :
                    <div
                        className="card-footer chat-footer position-absolute w-100 border-top px-2 pt-1 pb-0"
                        style={{
                            marginBottom: '.2em',
                            bottom: 0,
                            left: 0
                        }}>
                        <form
                            className="d-flex align-items-center"
                            action="#">
                            <div
                                className="position-absolute"
                                style={{ top: -(emojiPickerSize.heigth + 5), left: 10, display: this.state.emojiIsOpen ? 'initial' : 'none', zIndex: 1 }}>
                                <EmojiPicker
                                    onEmojiClick={this.onEmojiClick}
                                    emojiStyle={EmojiStyle.GOOGLE}
                                    autoFocusSearch
                                    theme={Theme.LIGHT}
                                    searchPlaceHolder="Type emoji name here ..."
                                    previewConfig={{
                                        showPreview: false
                                    }}
                                    width={emojiPickerSize.witdh}
                                    height={emojiPickerSize.heigth} />
                            </div>
                            <Preview {...{
                                style: {
                                    bottom: 'calc(100% - 5px)',
                                    left: 0,
                                    display: !isEmpty(this.state.filesSelected) ? 'initial' : 'none',
                                },
                                attachments: this.state.filesSelected,
                                removeFile: this.removeFile,
                                wipeAllFiles: this.wipeAllFiles,
                            }} />
                            {
                                this.state.recordingIsPending ?
                                    (this.state.recordingType == 'audio' ?
                                        <AudioRecorder
                                            {...{
                                                style: {
                                                    bottom: 'calc(100% - 5px)',
                                                    left: 0,
                                                },
                                                closeRecordinPanel: this.closeRecordingPanel,
                                            }} /> :
                                        <VideoRecorder
                                            {...{
                                                style: {
                                                    bottom: 'calc(100% - 5px)',
                                                    left: 0,
                                                },
                                                closeRecordinPanel: this.closeRecordingPanel,
                                            }} />) :
                                    null
                            }
                            <div className="chat-panel-tolls">
                                <i
                                    className="bx bx-face cursor-pointer"
                                    onClick={this.toggleEmojiVisibility}></i>
                                <i
                                    className="bx bx-paperclip ml-1 cursor-pointer"
                                    onClick={this.onFileInputClick}></i>
                                <i
                                    className="bx bx-microphone cursor-pointer"
                                    style={{ paddingTop: '3px' }}
                                    onClick={this.runAudioRecorder}></i>
                                <i
                                    className="bx bx-camera ml-1 cursor-pointer"
                                    style={{ paddingTop: '3px' }}
                                    onClick={this.runVideoRecorder}></i>
                            </div>
                            <input
                                type="file"
                                ref={this.fileInput}
                                name="file_attachment"
                                className="d-none"
                                accept={fileInputExtensionsAccepts.map(extension => `.${extension}`).join(',')}
                                multiple
                                onChange={this.onFileInputChange} />
                            <textarea
                                name="message"
                                className="form-control chat-message-send mx-1"
                                placeholder="Type your message here..."
                                rows={2}
                                onKeyUp={this.onTypingMessage}
                                ref={this.textInput} />
                            <button
                                type="submit"
                                onClick={this.onSendMessage}
                                className="btn btn-primary glow send d-lg-flex">
                                <i className="bx bx-paper-plane"></i>
                                <span
                                    className="d-none d-lg-block ml-1">Send</span></button>
                        </form>
                    </div>
            }
        </SafeRaiseError>
    }
}