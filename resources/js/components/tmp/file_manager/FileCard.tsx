import React from "react";
import { FileCardProps } from "../interfaces/pages/file-manager";
import FileManagerWorker from "./FileManagerWorker";
import { FileManagerContext } from "../data/file-manager";
import { formatFileSize } from "../data/chat";
import { isNull } from "lodash";
import moment from "moment";
import { getURI, sleep } from "../functions/tools";
import { FILE_MANAGER_CATEGORY } from "../enums/file-manager";


export default class FileCard extends React.Component {

        props!: Readonly<FileCardProps>;
        context!: FileManagerWorker;
        static contextType: React.Context<FileManagerWorker> = FileManagerContext;

        constructor(props: Readonly<any>) {
                super(props)
        }

        onClick = async () => {
                this.context.selected_file = this.props.file
                await sleep(100)
                if (!isNull(this.props.file.opened_at)) {
                        this.context.panel_opened = true
                        await this.context.openFile(this.context.selected_file!.id)
                        return
                }
                this.context.openFile(this.props.file.id)
                await sleep(100)
                this.context.panel_opened = true
        }

        render(): React.ReactNode {
                const file = this.props.file
                return (
                        <div
                                className="card border shadow-none mb-1 app-file-info"
                                onClick={this.onClick}>
                                <div className="card-content">
                                        <div className="app-file-content-logo card-img-top position-relative" style={{ height: '109px' }}>
                                                <i className="bx bx-dots-vertical-rounded app-file-edit-icon d-block float-right"></i>
                                                {
                                                        file.category == FILE_MANAGER_CATEGORY.IMAGE ?
                                                                <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center" style={{ top: 0, left: 0 }}>
                                                                        <img className="d-block mw-100 mh-100 m-auto" src={getURI(`${file.path}/${file.name}`)} alt="Card image cap" />
                                                                </div> :
                                                                <img className="d-block mx-auto" src={getURI('app-assets/images/icon/docs.png')} height="38" width="30" alt="Card image cap" />
                                                }
                                        </div>
                                        <div className="card-body p-50">
                                                <div className="app-file-recent-details">
                                                        <div className="app-file-name font-size-small font-weight-bold">{file.original_name}</div>
                                                        <div className="app-file-size font-size-small text-muted mb-25">{formatFileSize(parseFloat(file.size)).size}{formatFileSize(parseFloat(file.size)).unit}</div>
                                                        <div className="app-file-last-access font-size-small text-muted">Last accessed : {isNull(file.opened_at) ? 'never' : moment(file.opened_at).format('YYYY-MM-DD HH:mm')}</div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                )
        }
}