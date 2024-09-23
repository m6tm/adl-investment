import React, { lazy } from "react";
import { extractExtension, getFileCategoryByExtension } from "../../data/chat";
import { PreviewProps } from "../../interfaces/chat";
import SafeRaiseError from "../../SafeRaiseError";
import AutioPreview from "./AudioPreview";
import FilePreview from "./FilePreview";
import ImagePreview from "./ImagePreview";
import VideoPreview from "./VideoPreview";


export default class Preview extends React.Component {
    props!: PreviewProps

    constructor(props: {} | Readonly<{}>) {
        super(props)
    }

    buildAttachment(attachment: File, id: number) {
        switch (this.checkAttachment(attachment)) {
            case 'audio':
                return <AutioPreview {...{
                    key: id,
                    data: attachment,
                    removeFile: this.props.removeFile
                }} />
            case 'video':
                return <VideoPreview {...{
                    key: id,
                    data: attachment,
                    removeFile: this.props.removeFile
                }} />
            case 'image':
                return <ImagePreview {...{
                    key: id,
                    data: attachment,
                    removeFile: this.props.removeFile
                }} />
            case 'document':
                return <FilePreview {...{
                    key: id,
                    data: attachment,
                    removeFile: this.props.removeFile
                }} />
            case null:
                return null
                
            default:
                return <FilePreview {...{
                    key: id,
                    data: attachment,
                    removeFile: this.props.removeFile
                }} />
                break;
        }
    }

    checkAttachment = (attachment: File) => getFileCategoryByExtension(extractExtension(attachment.name)!)

    closePreview = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        this.props.wipeAllFiles()
    }

    render(): React.ReactNode {
        return <SafeRaiseError>
            <div
                className="attachement-container"
                style={{ ...this.props.style }}>
                <div className="container-fill">
                    <a href="#close" onClick={e => this.closePreview(e)} className="attachement-closer"><i className="bx bx-plus"></i></a>
                    <div className="attachment-list-container scroll-mode">
                        <div className="row mx-auto">
                            {
                                this.props.attachments.map((attachment, id) => this.buildAttachment(attachment, id))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </SafeRaiseError>
    }
}