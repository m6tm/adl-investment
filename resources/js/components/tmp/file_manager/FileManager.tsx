import React, { Fragment } from "react";
import FileManagerRightSidePanel from "./FileManagerRightSidePanel";
import FileManagerRightSide from "./FileManagerRightSide";
import { v4 as uuidv4 } from "uuid";
import { createRoot } from "react-dom/client";
import { FileManagerPage, FileManagerPageCollection, FileManagerProps, FileManagerState } from "../interfaces/pages/file-manager";
import { FileManagerContext, pages } from "../data/file-manager";
import FileManagerWorker from "./FileManagerWorker";
import { sleep } from "../functions/tools";
import { FILE_MANAGER_PAGES } from "../enums/file-manager";



export default class FileManager extends React.Component {

        state: Readonly<FileManagerState>;
        props!: Readonly<FileManagerProps>;
        readonly manager: FileManagerWorker = new FileManagerWorker(this)

        constructor(props: Readonly<any>) {
                super(props)
                this.manager = new FileManagerWorker(this)
                this.state = {
                        pages,
                        app: this.manager,
                        files: [],
                        file_sizes: [],
                        selectedFile: null,
                        recents: []
                }
        }

        async componentDidMount(): Promise<void> {
                await this.manager.fetchPage(FILE_MANAGER_PAGES.ALL)
                await this.manager.myCredentioals()
        }

        navigateTo = async (newPage: string) => {
                let _pages_: FileManagerPageCollection = Object.assign(this.state.pages)

                Object.values(this.state.pages).forEach(_page => {
                        _page.forEach(__page => {
                                let page_keys = Object.keys(this.state.pages),
                                        group_name = page_keys[Object.values(this.state.pages).indexOf(_page)],
                                        index_page = _pages_[group_name].indexOf(__page)

                                if (__page.code !== newPage && __page.active) {
                                        _pages_[group_name][index_page].active = false
                                }
                                if (__page.code == newPage) {
                                        _pages_[group_name][index_page].active = true
                                }
                        })
                })

                this.setState({ ...this.state, ...{ pages: _pages_ } })
                await sleep(100)
                this.manager.submitting = true
                await this.manager.fetchPage(this.activePage.code)
                await sleep(100)
                this.state.app.current_page = this.activePage
        }

        get activePage() {
                let page!: FileManagerPage

                Object.values(this.state.pages).forEach(_page => {
                        _page.forEach(__page => {
                                if (__page.active) page = __page
                        })
                })

                return page
        }

        get app() {
                return this.state.app
        }

        render(): React.ReactNode {
                const storage = this.manager.getTotalSize()
                return (
                        <FileManagerContext.Provider value={this.state.app}>
                                <div className="content-area-wrapper">
                                        <div className="sidebar-left">
                                                <div className="sidebar">
                                                        <div className="app-file-sidebar sidebar-content d-flex">
                                                                {/* <!-- App File sidebar - Left section Starts --> */}
                                                                <div className="app-file-sidebar-left">
                                                                        {/* <!-- sidebar close icon starts --> */}
                                                                        <span className="app-file-sidebar-close"><i className="bx bx-x"></i></span>
                                                                        {/* <!-- sidebar close icon ends --> */}
                                                                        <div className="form-group add-new-file text-center">
                                                                                {/* <!-- Add File Button --> */}
                                                                                <label htmlFor="getFile" className="btn btn-primary btn-block glow my-2 add-file-btn text-capitalize">
                                                                                        <i className="bx bx-plus"></i>Add File
                                                                                </label>
                                                                                <input
                                                                                        type="file"
                                                                                        accept=".pdf,.jpg,.png,.doc,.docx,.jpeg,.mp4,.mp3,.zip,.rar"
                                                                                        className="d-none"
                                                                                        id="getFile"
                                                                                        multiple
                                                                                        onChange={e => this.state.app.onUpload(Array.from(e.target.files ?? []), e.target)} />
                                                                        </div>
                                                                        <div className="app-file-sidebar-content">
                                                                                {
                                                                                        Object.keys(this.state.pages).map(group => (
                                                                                                <Fragment key={uuidv4()}>
                                                                                                        <label className="app-file-label">{group}</label>
                                                                                                        <div className="list-group list-group-messages my-50">
                                                                                                                {
                                                                                                                        this.state.pages[group].map(page => (
                                                                                                                                <a key={uuidv4()} href="" onClick={e => { e.preventDefault(); this.navigateTo(page.code); }} className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center pt-0${page.active ? ' active' : ''}`}>
                                                                                                                                        <div className="fonticon-wrap d-inline mr-25 d-flex">
                                                                                                                                                <i className={`${page.icon} mr-1`}></i>
                                                                                                                                                {page.name}
                                                                                                                                        </div>
                                                                                                                                        {
                                                                                                                                                page.count > 0 ?
                                                                                                                                                        <span className="badge badge-light-danger badge-pill badge-round float-right mt-50">{page.count}</span> : <span></span>
                                                                                                                                        }
                                                                                                                                </a>
                                                                                                                        ))
                                                                                                                }
                                                                                                        </div>
                                                                                                </Fragment>
                                                                                        ))
                                                                                }

                                                                                {/* <!-- App File Left Sidebar - Storage Content Starts --> */}
                                                                                <label className="app-file-label mb-75">Storage Status</label>
                                                                                <div className="d-flex mb-1">
                                                                                        <div className="fonticon-wrap mr-1">
                                                                                                <i className="livicon-evo cursor-pointer"
                                                                                                        data-options="name: save.svg; size: 30px; style: lines; strokeColor:#475f7b; eventOn:grandparent; duration:0.85;">
                                                                                                </i>
                                                                                        </div>
                                                                                        <div className="file-manager-progress">
                                                                                                <span className="text-muted font-size-small">{storage.size.size}{storage.size.unit.toUpperCase()} used of 15GB</span>
                                                                                                <div className={`progress ${storage.size.unit.toLowerCase() == "mb" && parseFloat(storage.size.size) > 10 ? 'progress-bar-danger' : 'progress-bar-primary'} progress-sm mb-0`}>
                                                                                                        <div className="progress-bar" role="progressbar" aria-valuemin={0} aria-valuenow={storage.percent} aria-valuemax={100}
                                                                                                                style={{ width: `${storage.percent}%` }}></div>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                                <a href="" onClick={e => e.preventDefault()} className="font-weight-bold">Upgrade Storage</a>
                                                                                {/* <!-- App File Left Sidebar - Storage Content Ends --> */}
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        {/* <!-- App File sidebar - Right section Starts --> */}
                                                        <FileManagerRightSidePanel {...{ file: this.state.selectedFile }} />
                                                        {/* <!-- App File sidebar - Right section Ends --> */}
                                                </div>
                                        </div>
                                        {
                                                this.app.submitting ? (
                                                        <div className="app-file-overlay overlay-visible d-flex justify-content-center align-items-center">
                                                                <div className="spinner-grow text-primary spinner-grow-lg"></div>
                                                        </div>
                                                ) : <span></span>
                                        }
                                        <div className={`app-file-overlay${this.state.app.panel_opened ? ' show' : ''}`} onClick={() => this.state.app.panel_opened = false}></div>
                                        <FileManagerRightSide {...{
                                                pages: this.state.pages,
                                                files: this.state.files
                                        }} />
                                </div>
                        </FileManagerContext.Provider>
                )
        }
}

const file_manager = document.getElementById('file-manager')
if (file_manager && file_manager.getAttribute('data-tk')) createRoot(file_manager).render(<FileManager {...{ tk: file_manager.getAttribute('data-tk') ?? '' }} />)