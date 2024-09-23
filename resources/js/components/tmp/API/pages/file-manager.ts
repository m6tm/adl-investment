import { getURI } from "../../functions/tools";
import { FileManagerOpenResponse, FileManagerUploadResponse, GetFileManagerResponse, ShareFileResponse } from "../../interfaces/pages/file-manager";



export function uploadFileManager(token: string, files: Array<File>): Promise<FileManagerUploadResponse> {
        const form = new FormData()

        files.forEach(file => {
                form.append('files[]', file)
        })

        return fetch(`${getURI()}/api/file-upload`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                },
                body: form
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function getFileManagerPage(token: string, page_name: string): Promise<GetFileManagerResponse> {

        return fetch(`${getURI()}/api/file-manager/files/${page_name}`, {
                headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                }
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function openFileManager(token: string, file: number): Promise<FileManagerOpenResponse> {
        const form = new FormData()

        form.append('file', file.toString())

        return fetch(`${getURI()}/api/open-file`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                },
                body: form
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function shareFile(token: string, file: number, members: Array<number>): Promise<ShareFileResponse> {
        const form = new FormData()

        form.append('file', file.toString())
        members.forEach(member => form.append('member[]', member.toString()))

        return fetch(`${getURI()}/api/share-file`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                },
                body: form
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function deleteFile(token: string, file: number): Promise<ShareFileResponse> {
        const form = new FormData()
        form.append('file', file.toString())

        return fetch(`${getURI()}/api/delete-file`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                },
                body: form
        }).then(async response => ({ code: response.status, response: await response.json() }))
}