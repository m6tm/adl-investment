import React from "react";
import { FileManagerInfo, FileManagerPage, FileManagerRightSideProps, FileManagerRightSideState } from "../interfaces/pages/file-manager";
import { v4 as uuidv4 } from "uuid";
import FileCard from "./FileCard";
import FolderCard from "./FolderCard";
import { FILE_MANAGER_PAGES } from "../enums/file-manager";
import { FileManagerContext } from "../data/file-manager";
import FileManagerWorker from "./FileManagerWorker";



export default class FileManagerRightSide extends React.Component {

        props!: Readonly<FileManagerRightSideProps>;
        state: Readonly<FileManagerRightSideState>;
        context!: FileManagerWorker;
        static contextType: React.Context<FileManagerWorker> = FileManagerContext;

        constructor(props: Readonly<any>) {
                super(props)
                this.state = {
                        files: [],
                        search_text: ''
                }
        }

        get files() {
                return this.state.files
        }

        set files(files: Array<FileManagerInfo>) {
                this.setState({ ...this.state, ...{ files } })
        }

        get search_text() {
                return this.state.search_text
        }

        set search_text(search_text: string) {
                this.setState({ ...this.state, ...{ search_text } })
        }

        onSearch = (text: string) => {
                this.setState({
                        ...this.state, ...{
                                search_text: text,
                                files: this.context.files.filter(file => file.original_name.toLowerCase().indexOf(text.toLowerCase()) !== -1)
                        }
                })
        }

        render(): React.ReactNode {
                return (
                        <div className="content-right">
                                <div className="content-wrapper">
                                        <div className="content-header row">
                                        </div>
                                        <div className="content-body">
                                                {/* <!-- File Manager app overlay --> */}
                                                <div className="app-file-area">
                                                        {/* <!-- File App Content Area --> */}
                                                        {/* <!-- App File Header Starts --> */}
                                                        <div className="app-file-header">
                                                                {/* <!-- Header search bar starts --> */}
                                                                <div className="app-file-header-search flex-grow-1">
                                                                        <div className="sidebar-toggle d-block d-lg-none">
                                                                                <i className="bx bx-menu"></i>
                                                                        </div>
                                                                        <fieldset className="form-group position-relative has-icon-left m-0">
                                                                                <input
                                                                                        type="text"
                                                                                        value={this.search_text}
                                                                                        onChange={e => this.onSearch(e.target.value)}
                                                                                        className="form-control border-0 shadow-none" id="email-search"
                                                                                        placeholder="Search" />
                                                                                <div className="form-control-position">
                                                                                        <i className="bx bx-search"></i>
                                                                                </div>
                                                                        </fieldset>
                                                                </div>
                                                                {/* <!-- Header search bar Ends --> */}
                                                        </div>
                                                        {/* <!-- App File Header Ends --> */}

                                                        {/* <!-- App File Content Starts --> */}
                                                        {
                                                                Object.values(this.props.pages).map(page => ((pages: Array<FileManagerPage>) => {
                                                                        const _pages: Array<React.ReactNode> = []
                                                                        pages.forEach(page => _pages.push(
                                                                                <div className={`app-file-content p-2${page.active ? '' : ' d-none'}`} style={{ overflowY: 'auto' }} key={uuidv4()}>
                                                                                        <h5 className="text-capitalize">{page.name}</h5>

                                                                                        {
                                                                                                page.code == FILE_MANAGER_PAGES.ALL ? (
                                                                                                        <>
                                                                                                                {/* <!-- App File - Recent Accessed Files Section Starts --> */}
                                                                                                                <label className="app-file-label">Recently Accessed Files</label>
                                                                                                                <div className="row app-file-recent-access">
                                                                                                                        {
                                                                                                                                this.context.recent_files.length > 0 ? this.context.recent_files.map(file => (
                                                                                                                                        <div key={uuidv4()} className="col-md-3 col-6">
                                                                                                                                                <FileCard {...{ file }} />
                                                                                                                                        </div>
                                                                                                                                )
                                                                                                                                ) : <span></span>
                                                                                                                        }
                                                                                                                </div>
                                                                                                                {/* <!-- App File - Recent Accessed Files Section Ends --> */}

                                                                                                                {
                                                                                                                        this.search_text.length == 0 ? this.context.getFolderDatas().length > 0 ? (
                                                                                                                                <>
                                                                                                                                        {/* <!-- App File - Folder Section Starts --> */}
                                                                                                                                        <label className="app-file-label">Folders</label>
                                                                                                                                        <div className="row app-file-folder">
                                                                                                                                                {
                                                                                                                                                        this.context.getFolderDatas().map(folder => (
                                                                                                                                                                <div key={uuidv4()} className="col-lg-3 col-md-4 col-6">
                                                                                                                                                                        <FolderCard {...{ folder }} />
                                                                                                                                                                </div>
                                                                                                                                                        ))
                                                                                                                                                }
                                                                                                                                        </div>
                                                                                                                                        {/* <!-- App File - Folder Section Ends --> */}
                                                                                                                                </>
                                                                                                                        ) : <span></span> : <span></span>
                                                                                                                }
                                                                                                        </>
                                                                                                ) : <span></span>
                                                                                        }

                                                                                        {/* <!-- App File - Files Section Starts --> */}
                                                                                        {
                                                                                                this.search_text.length == 0 ? (
                                                                                                        <>
                                                                                                                <label className="app-file-label">Files</label>
                                                                                                                <div className="row app-file-files">
                                                                                                                        {
                                                                                                                                this.context.files.length > 0 ? this.context.files.map(file => (
                                                                                                                                        <div key={uuidv4()} className="col-md-3 col-6">
                                                                                                                                                <FileCard {...{ file }} />
                                                                                                                                        </div>
                                                                                                                                )
                                                                                                                                ) : <span></span>
                                                                                                                        }
                                                                                                                </div>
                                                                                                        </>
                                                                                                ) : (
                                                                                                        <>
                                                                                                                <label className="app-file-label">Search Results</label>
                                                                                                                <div className="row app-file-files">
                                                                                                                        {
                                                                                                                                this.context.files.length > 0 ? this.files.map(file => (
                                                                                                                                        <div key={uuidv4()} className="col-md-3 col-6">
                                                                                                                                                <FileCard {...{ file }} />
                                                                                                                                        </div>
                                                                                                                                )
                                                                                                                                ) : <span></span>
                                                                                                                        }
                                                                                                                </div>
                                                                                                        </>
                                                                                                )
                                                                                        }
                                                                                        {/* <!-- App File - Files Section Ends --> */}
                                                                                </div>
                                                                        )
                                                                        )
                                                                        return _pages
                                                                })(page))
                                                        }
                                                </div>

                                        </div>
                                </div>
                        </div>
                )
        }
}