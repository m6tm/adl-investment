import React from "react";
import FileManagerWorker from "./FileManagerWorker";
import { FileManagerContext } from "../data/file-manager";
import { FolderCardProps } from "../interfaces/pages/file-manager";


export default class FolderCard extends React.Component {

        props!: Readonly<FolderCardProps>;
        context!: FileManagerWorker;
        static contextType: React.Context<FileManagerWorker> = FileManagerContext;

        constructor(props: Readonly<any>) {
                super(props)
        }

        onClick = async () => {
                this.context.navigateTo(this.props.folder.name)
        }

        render(): React.ReactNode {
                return (
                        <div
                                className="card border shadow-none mb-1 app-file-info"
                                onClick={this.onClick}>
                                <div className="card-content">
                                        <div className="card-body px-75 py-50">
                                                <div className="app-file-folder-content d-flex align-items-center">
                                                        <div className="app-file-folder-logo mr-75">
                                                                <i className="bx bx-folder font-medium-4"></i>
                                                        </div>
                                                        <div className="app-file-folder-details">
                                                                <div className="app-file-folder-name font-size-small font-weight-bold text-capitalize">{this.props.folder.name}</div>
                                                                <div className="app-file-folder-size font-size-small text-muted">{this.props.folder.file_number} file{this.props.folder.file_number > 0 ? 's' : ''}, {this.props.folder.total_size.size}{this.props.folder.total_size.unit.toLowerCase()}</div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                )
        }
}