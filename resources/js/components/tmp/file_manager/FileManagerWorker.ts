import { deleteFile, getFileManagerPage, openFileManager, shareFile, uploadFileManager } from "../API/pages/file-manager";
import { getCredentialsAndMe } from "../API/pages/invoice";
import { fakeUserFactory, formatFileSize, getFileSizeInfo } from "../data/chat";
import { pages } from "../data/file-manager";
import { FILE_MANAGER_PAGES } from "../enums/file-manager";
import { showToast } from "../functions/toast";
import { sleep } from "../functions/tools";
import { FileManagerContextInterface, FileManagerInfo, FileManagerPage, FolderManagerInfo } from "../interfaces/pages/file-manager";
import { MyCredentials } from "../interfaces/pages/invoice";
import FileManager from "./FileManager";
import { EventEmitter } from 'events'



export default class FileManagerWorker {

        private app: FileManagerContextInterface = {
                panel: {
                        panel_opened: false
                },
                current_page: pages['My Drive'].at(0)!,
                submitting: false,
                user: {
                        user: fakeUserFactory as any
                } as MyCredentials,
                event: new EventEmitter()
        }

        constructor(private manager: FileManager) {}

        get event() {
                return this.app.event
        }

        get user() {
                return this.app.user
        }

        get files() {
                return this.manager.state.files
        }

        get files_size() {
                return this.manager.state.file_sizes
        }

        get recent_files() {
                return this.manager.state.recents
        }

        get selected_file() {
                return this.manager.state.selectedFile
        }

        set selected_file(file: FileManagerInfo | null) {
                this.manager.setState({ ...this.manager.state, ...{ selectedFile: file } })
        }

        get panel_opened() {
                return this.app.panel.panel_opened
        }
        set panel_opened(open: boolean) {
                this.app.panel.panel_opened = open
                this.update()
        }

        get current_page() {
                return this.app.current_page
        }
        set current_page(page: FileManagerPage) {
                this.app.current_page = page
                this.update()
        }

        get submitting() {
                return this.app.submitting
        }
        set submitting(submitting: boolean) {
                this.app.submitting = submitting
                this.update()
        }

        private update() {
                this.manager.setState({ ...this.manager.state, ...{ app: this } })
        }

        navigateTo = (new_page: string) => this.manager.navigateTo(new_page)

        myCredentioals = async () => {
                const response = await getCredentialsAndMe(this.manager.props.tk)
                if (response.code !== 200) return
                this.app.user = response.response
                this.update()
        }

        onUpload = async (files: Array<File>, input: HTMLInputElement) => {
                const has_max_size = files.filter(file => (getFileSizeInfo(file).unit !== "KB" && getFileSizeInfo(file).unit !== "B") || (getFileSizeInfo(file).unit == "MB" && getFileSizeInfo(file).value > 2)).length > 0
                
                if (has_max_size) {
                        showToast("One of selected file have an invalid size, 2Mb max allowed.", "danger").showToast()
                        input.files = null
                        input.value = ''
                        return
                }
                
                this.submitting = true
                const response = await uploadFileManager(this.manager.props.tk, files)
                
                if (response.code !== 200) {
                        showToast(response.response.errors!.at(0)!, "danger").showToast()
                        input.files = null
                        input.value = ''
                        this.submitting = false
                        return
                }

                showToast("Successfully uploaded !!!", "success").showToast()
                await this.fetchPage(this.manager.activePage.code)
        }

        fetchPage = async (page_name: string) => {
                const response = await getFileManagerPage(this.manager.props.tk, page_name)
                
                this.submitting = false
                await sleep(100)
                if (response.code !== 200) {
                        showToast(response.response.errors!.at(0)!, "danger").showToast()
                        return
                }
                
                this.manager.setState({
                        ...this.manager.state, ...{
                                files: response.response.files,
                                file_sizes: response.response.size,
                                recents: page_name == FILE_MANAGER_PAGES.ALL ? response.response.recents : [],
                        }
                })
        }

        getFolderDatas = (): Array<FolderManagerInfo> => {
                const folders: any = {}
                this.manager.state.files.forEach(file => {
                        if (Object.keys(folders).indexOf(file.category) == -1) folders[file.category] = {
                                type: file.category,
                                size: 0,
                                files: []
                        }

                        folders[file.category].size += parseFloat(file.size)
                        folders[file.category].files.push(file)
                })
                return Object.keys(folders).map(name => ({
                        name,
                        file_number: folders[name].files.length,
                        total_size: formatFileSize(folders[name].size)
                }))
        }

        openFile = async (file: number) => {
                const response = await openFileManager(this.manager.props.tk, file)
                
                if (response.code !== 200) return
                this.fetchPage(this.current_page.code)
        }

        shareFile = async (file: number, members: Array<number>) => {
                this.event.emit('submitting_shares_started')
                const response = await shareFile(this.manager.props.tk, file, members)
                if (response.code !== 200) {
                        this.event.emit('submitting_shares_ended')
                        showToast(response.response.message, "danger").showToast()
                        return
                }
                await this.fetchPage(this.current_page.code)
                await sleep(100)
                this.selected_file = this.files.find(file => file.id == this.selected_file?.id)!
                this.event.emit('submitting_shares_ended')
                showToast("Operation completed successfully", "success").showToast()
        }
        
        deleteFile = async (file: number) => {
                const response = await deleteFile(this.manager.props.tk, file)
                
                if (response.code !== 200) {
                        showToast(response.response.message, "danger").showToast()
                        return
                }
                showToast("The file deleted successfully", "success").showToast()
                this.fetchPage(this.current_page.code)
        }

        getTotalSize = () => {
                const sizes = this.files_size.reduce((accumulator, current) => accumulator + parseFloat(current.size), 0),
                total = 15 * (1024 * 1024 * 1024) // 15Gb in Oct
                return {
                        percent: Math.ceil((sizes / total) * 100),
                        size: formatFileSize(sizes)
                }
        }
}