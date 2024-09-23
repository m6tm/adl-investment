import React from "react"
import { FileManagerContextInterface } from "../interfaces/pages/file-manager"
import FileManagerWorker from "../file_manager/FileManagerWorker"


export const FileManagerContext: React.Context<FileManagerWorker> = React.createContext({} as any)

export const pages = {
        "My Drive": [
                {
                        name: "All Files",
                        code: "all",
                        icon: "bx bx-folder-open",
                        count: 0,
                        active: true,
                },
                {
                        name: "Recents",
                        code: "recent",
                        icon: "bx bx-time-five",
                        count: 0,
                        active: false,
                },
                {
                        name: "Shared",
                        code: "shared",
                        icon: "bx bx-share",
                        count: 0,
                        active: false,
                },
                {
                        name: "Important",
                        code: "important",
                        icon: "bx bx-star",
                        count: 0,
                        active: false,
                },
                {
                        name: "Deleted Files",
                        code: "deleted",
                        icon: "bx bx-trash-alt",
                        count: 0,
                        active: false,
                },
        ],
        "Labels": [
                {
                        name: "Documents",
                        code: "document",
                        icon: "bx bx-file",
                        count: 0,
                        active: false,
                },
                {
                        name: "Images",
                        code: "image",
                        icon: "bx bx-images",
                        count: 0,
                        active: false,
                },
                {
                        name: "Videos",
                        code: "video",
                        icon: "bx bx-video",
                        count: 0,
                        active: false,
                },
                {
                        name: "Audio",
                        code: "audio",
                        icon: "bx bx-music",
                        count: 0,
                        active: false,
                },
                {
                        name: "Zip Files",
                        code: "zip",
                        icon: "bx bx-archive",
                        count: 0,
                        active: false,
                },
        ]
}