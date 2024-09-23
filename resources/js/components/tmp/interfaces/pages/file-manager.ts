import { FILE_MANAGER_ACTIVITY_TAG, FILE_MANAGER_CATEGORY } from "../../enums/file-manager"
import FileManagerWorker from "../../file_manager/FileManagerWorker"
import { UserModel } from "../user"
import { MyCredentials } from "./invoice"
import { EventEmitter } from 'events'


export interface FileManagerPage {
        name: string
        code: string
        icon: string
        count: number
        active: boolean
}

export interface FileManagerPageCollection {
        [page_group: string]: Array<FileManagerPage>
}

export interface FileManagerState {
        pages: FileManagerPageCollection,
        app: FileManagerWorker
        files: Array<FileManagerInfo>
        file_sizes: Array<FileManagerSize>
        selectedFile: FileManagerInfo | null
        recents: Array<FileManagerInfo>
}

export interface FileManagerSize {
        size: string
        extension: string
}

export interface FileManagerProps {
        tk: string
}

export interface FileManagerRightSideProps {
        pages: FileManagerPageCollection
        files: Array<FileManagerInfo>
}

export interface FileManagerRightSideState {
        files: Array<FileManagerInfo>
        search_text: string
}

export interface FileManagerRightSidePanelProps {
        file: FileManagerInfo | null
}

export interface FileManagerRightSidePanelState {
        submitting_shares: boolean
}

export interface FileManagerContextInterface {
        panel: {
                panel_opened: boolean
        }
        current_page: FileManagerPage
        submitting: boolean
        user: MyCredentials
        event: EventEmitter
}

export interface FileManagerInfo {
        id: number
        user_id: number
        original_name: string
        name: string
        extension: string
        location: string
        path: string
        size: string
        category: FILE_MANAGER_CATEGORY
        author: UserModel
        shares: Array<FileManagerShare>
        activities: Array<FileManagerActivity>
        created_at: string
        updated_at: string
        opened_at: string | null
}

export interface FileManagerActivity {
        id: number
        file_manager_info_id: number
        user_id: number
        title: string
        description: string
        tag: FILE_MANAGER_ACTIVITY_TAG
        file_manager: FileManagerInfo | null
        user: UserModel
        created_at: string
        updated_at: string
}

export interface FileManagerShare {
        id: number
        file_manager_info_id: number
        user_id: number
        file_manager: FileManagerInfo
        user: UserModel
        created_at: string
        updated_at: string
}

export interface FolderManagerInfo {
        name: string
        file_number: number
        total_size: {
                size: string
                unit: string
        }
}

export interface FileCardProps {
        file: FileManagerInfo
}

export interface FolderCardProps {
        folder: FolderManagerInfo
}

export interface FileManagerUploadResponse {
        code: number
        response: {
                message: string
                response: string
                errors?: Array<string>
        }
}

export interface FileManagerOpenResponse extends FileManagerUploadResponse {}

export interface ShareFileResponse extends FileManagerUploadResponse {}

export interface GetFileManagerResponse {
        code: number
        response: {
                response: string
                files: Array<FileManagerInfo>
                size: Array<FileManagerSize>
                recents: Array<FileManagerInfo>
                errors?: Array<string>
        }
}