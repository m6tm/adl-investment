import React from "react";
import { FileManagerRightSidePanelProps, FileManagerRightSidePanelState } from "../interfaces/pages/file-manager";
import { FileManagerContext } from "../data/file-manager";
import FileManagerWorker from "./FileManagerWorker";
import { formatFileSize } from "../data/chat";
import moment from "moment";
import { isNull, isUndefined } from "lodash";
import { getURI } from "../functions/tools";
import { v4 as uuidv4 } from 'uuid'
import { FILE_MANAGER_CATEGORY } from "../enums/file-manager";



export default class FileManagerRightSidePanel extends React.Component {

        props!: Readonly<FileManagerRightSidePanelProps>;
        state: Readonly<FileManagerRightSidePanelState>;
        context!: FileManagerWorker;
        static contextType: React.Context<FileManagerWorker> = FileManagerContext;

        constructor(props: Readonly<any>) {
                super(props)
                this.state = {
                        submitting_shares: false
                }
        }

        get submitting_shares(): boolean {
                return this.state.submitting_shares
        }

        set submitting_shares(submitting_shares: boolean) {
                this.setState({ ...this.state, ...{ submitting_shares } })
        }

        componentDidMount(): void {
                this.context.event.on('submitting_shares_started', () => {
                        this.submitting_shares = true
                })
                this.context.event.on('submitting_shares_ended', () => {
                        this.submitting_shares = false
                })
        }

        onChange = (ids: Array<string>) => {
                const ids_number = ids.filter(id => !isNaN(parseInt(id)) && parseInt(id) > 0).map(id => parseInt(id)),
                        { file } = this.props
                if (!file) return
                this.context.shareFile(file.id, ids_number)
        }

        onDelete = () => {
                this.context.panel_opened = false
                if (this.props.file) this.context.deleteFile(this.props.file.id)
        }

        render(): React.ReactNode {
                const { file } = this.props,
                        { user, companie_members } = this.context.user
                return (
                        <div className={`app-file-sidebar-info${this.context.panel_opened ? ' ps show' : ''}`}>
                                <div className="card shadow-none mb-0 p-0 pb-1">
                                        <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                                                <h6 className="mb-0 text-truncate">{file ? file.original_name : 'Document.pdf'}</h6>
                                                <div className="app-file-action-icons d-flex align-items-center">
                                                        <a
                                                                href={file ? getURI(`${file.path}/${file.name}`) : ''}
                                                                download={file ? file.original_name : ''}
                                                                className="mr-50"
                                                                onClick={() => !isNull(file)}>
                                                                <i className="bx bx-cloud-download cursor-pointer"></i>
                                                        </a>
                                                        <i className="bx bx-trash cursor-pointer mr-50" onClick={this.onDelete}></i>
                                                        <i className="bx bx-x close-icon cursor-pointer" onClick={() => this.context.panel_opened = false}></i>
                                                </div>
                                        </div>
                                        <div className="card-content">
                                                <ul className="nav nav-tabs justify-content-center" role="tablist">
                                                        <li className="nav-item mr-1 pt-50 pr-1 border-right">
                                                                <a className=" nav-link active d-flex align-items-center" id="details-tab" data-toggle="tab" href="#details"
                                                                        aria-controls="details" role="tab" aria-selected="true">
                                                                        <i className="bx bx-file mr-50"></i>Details</a>
                                                        </li>
                                                        <li className="nav-item pt-50 ">
                                                                <a className=" nav-link d-flex align-items-center" id="activity-tab" data-toggle="tab" href="#activity"
                                                                        aria-controls="activity" role="tab" aria-selected="false">
                                                                        <i className="bx bx-pulse mr-50"></i>Activity</a>
                                                        </li>
                                                </ul>
                                                <div className="tab-content pl-0">
                                                        <div className="tab-pane active" id="details" aria-labelledby="details-tab" role="tabpanel">
                                                                <div className="border-bottom d-flex align-items-center flex-column pb-1">
                                                                        {
                                                                                file && file.category == FILE_MANAGER_CATEGORY.IMAGE ?
                                                                                        <img src={getURI(`${file.path}/${file.name}`)} alt="file Image" className="my-1 mw-100" style={{ maxHeight: '220px' }} /> :
                                                                                        <img src={getURI('app-assets/images/icon/docs.png')} alt="PDF" height="42" width="35"
                                                                                                className="my-1" />
                                                                        }
                                                                        <p className="mt-2">{file ? `${formatFileSize(parseFloat(file.size)).size}${formatFileSize(parseFloat(file.size)).unit}` : "0mb"}</p>
                                                                </div>
                                                                <div className="card-body pt-2">
                                                                        <label className="app-file-label">Setting</label>
                                                                        <div className="d-flex justify-content-between flex-column mt-75">
                                                                                <p>File Sharing</p>
                                                                                <div className="">
                                                                                        <label htmlFor="company_members_to_shares"></label>
                                                                                        <select
                                                                                                onChange={e => this.onChange(Array.from(e.target.selectedOptions).map(option => option.value))}
                                                                                                id="company_members_to_shares"
                                                                                                value={file ? (file.shares.length > 0 ? file.shares.map(share => share.user.id.toString()) : ["0"]) : ["0"]}
                                                                                                multiple
                                                                                                disabled={this.submitting_shares}
                                                                                                size={3}
                                                                                                className="custom-select custom-select-sm w-100 mb-2">
                                                                                                <option value="0">Select the member</option>
                                                                                                {
                                                                                                        Object.values(companie_members ? companie_members : []).filter(member => member.id !== user.id).map(member => (
                                                                                                                <option key={uuidv4()} value={member.id}>{`${member.last_name} ${member.first_name}`}</option>
                                                                                                        ))
                                                                                                }
                                                                                        </select>
                                                                                </div>
                                                                                <div className="custom-control custom-switch custom-switch-primary custom-switch-glow custom-control-inline">
                                                                                        <input
                                                                                                type="checkbox"
                                                                                                checked={file ? file.shares.length > 0 : false}
                                                                                                onChange={() => false}
                                                                                                className="custom-control-input"
                                                                                                id="customSwitchGlow1" />
                                                                                        <label className="custom-control-label" htmlFor="customSwitchGlow1"></label>
                                                                                </div>
                                                                        </div>

                                                                        <label className="app-file-label">Info</label>
                                                                        <div className="d-flex justify-content-between align-items-center mt-75">
                                                                                <p>Type</p>
                                                                                <p className="font-weight-bold text-truncate">{file ? file.extension.toUpperCase() : 'Not Type'}</p>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                                <p>Size</p>
                                                                                <p className="font-weight-bold text-truncate">{file ? `${formatFileSize(parseFloat(file.size)).size}${formatFileSize(parseFloat(file.size)).unit}` : "0mb"}</p>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                                <p>Location</p>
                                                                                <p className="font-weight-bold text-truncate">{file ? file.location : 'Not Location'}</p>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                                <p>Owner</p>
                                                                                <p className="font-weight-bold text-truncate">
                                                                                        {file ? `${file.author.last_name} ${file.author.first_name}` : 'Not Owner'}
                                                                                </p>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                                <p>Modified</p>
                                                                                <p className="font-weight-bold text-truncate">{file ? (isNull(file.updated_at) ? 'Never' : moment(file.updated_at).format('MMM DD, YYYY')) : 'Never'}</p>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                                <p>Opened</p>
                                                                                <p className="font-weight-bold text-truncate">{file ? (isNull(file.opened_at) ? moment(moment.now()).format('MMM DD, YYYY') : moment(file.opened_at).format('MMM DD, YYYY')) : 'Never'}</p>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                                <p>Created</p>
                                                                                <p className="font-weight-bold text-truncate">{file ? (isNull(file.created_at) ? 'Never' : moment(file.created_at).format('MMM DD, YYYY')) : 'Never'}</p>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div className="tab-pane pl-0" id="activity" aria-labelledby="activity-tab" role="tabpanel">
                                                                <div className="card-body">
                                                                        <ul className="widget-timeline mb-0">
                                                                                {
                                                                                        file ? file.activities.reverse().slice(0, 5).map(activity => (
                                                                                                <li key={uuidv4()} className={`timeline-items ${activity.tag} active`}>
                                                                                                        <div className="timeline-time">{moment(activity.created_at).format('MM/DD/YYYY - HH:mm:ss')}</div>
                                                                                                        <h6 className="timeline-title">{activity.user.id == this.context.user.user.id ? 'You' : activity.user.email} {activity.title}</h6>
                                                                                                        <p className="timeline-text">{activity.description}</p>
                                                                                                        <div className="timeline-content">
                                                                                                                <img src={getURI('app-assets/images/icon/docs.png')} alt={file.original_name} height="30" width="25"
                                                                                                                        className="mr-50" />{file.original_name}
                                                                                                        </div>
                                                                                                </li>
                                                                                        )) : <span></span>
                                                                                }
                                                                        </ul>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                )
        }
}