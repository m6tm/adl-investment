import { isNull } from 'lodash';
import randomColor from 'randomcolor';
import { filesize } from "filesize";
import React from 'react';
import { v4 as uuidv4 } from 'uuid'
import { getURI, random } from "../functions/tools";
import { CallObject, CustomUser, Discussion, fileInfoInterface, Message, MessageProgress, MoreInformation, User } from '../interfaces/chat';
import { DISCUSSTION_TYPE, MESSAGE_ATTACHMENT_TYPE } from '../enums/chat';


export const discussion = Array.from('0123456789').map((data, index) => ({
    id: index++,
    token: uuidv4(),
}))

export const category = ['chats', 'contacts']

export const status = ['busy', 'online', 'offline']

export const messages: Array<Message | MessageProgress> = []

/**
 * @type {Array<Discussion>}
 */
export const chats: Array<any> = [
    {
        token: '',
        participant: {
            me: {
                id: 1,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-11.jpg",
                name: 'John Doe',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            you: {
                id: 2,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-26.jpg",
                name: 'Elizabeth Elliott',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            'last message': 'Cake pie',
        }
    },
    {
        token: '',
        participant: {
            me: {
                id: 1,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-11.jpg",
                name: 'John Doe',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            you: {
                id: 2,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-7.jpg",
                name: 'Kristopher Candy',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            'last message': 'jelly jelly',
        }
    },
    {
        token: '',
        participant: {
            me: {
                id: 1,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-11.jpg",
                name: 'John Doe',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            you: {
                id: 2,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-8.jpg",
                name: 'Sarah Woods',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            'last message': ' lemon drops',
        }
    },
    {
        token: '',
        participant: {
            me: {
                id: 1,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-11.jpg",
                name: 'John Doe',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            you: {
                id: 2,
                avatar: null,
                name: 'Jenny Perich',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            'last message': 'candy canes.',
        }
    },
    {
        token: '',
        participant: {
            me: {
                id: 1,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-11.jpg",
                name: 'John Doe',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            you: {
                id: 2,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-5.jpg",
                name: 'Rock Montgomery',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            'last message': 'powder gum',
        }
    },
    {
        token: '',
        participant: {
            me: {
                id: 1,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-11.jpg",
                name: 'John Doe',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            you: {
                id: 2,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-9.jpg",
                name: 'Heather Howell',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            'last message': 'cheesecake toffee',
        }
    },
    {
        token: '',
        participant: {
            me: {
                id: 1,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-11.jpg",
                name: 'John Doe',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            you: {
                id: 2,
                avatar: null,
                name: 'Kelly Reyes',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            'last message': 'gingerbread',
        }
    },
    {
        token: '',
        participant: {
            me: {
                id: 1,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-11.jpg",
                name: 'John Doe',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            you: {
                id: 2,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-14.jpg",
                name: 'Vince Nelson',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            'last message': 'Puddingdrops',
        }
    },
    {
        token: '',
        participant: {
            me: {
                id: 1,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-11.jpg",
                name: 'John Doe',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            you: {
                id: 2,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-3.jpg",
                name: 'Drake Elliott',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            'last message': 'jelly helloi',
        }
    },
    {
        token: '',
        participant: {
            me: {
                id: 1,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-11.jpg",
                name: 'John Doe',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            you: {
                id: 2,
                avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-7.jpg",
                name: 'Kristopher Candy',
                email: 'email@example.com',
                color: '',
                status: '',
                updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
                created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
            },
            'last message': 'jujubes',
        }
    },
].map((chat, index) => ({
    ...chat,
    ...{
        discussion_id: discussion[index].id,
        category: category[random(0, category.length)],
        token: uuidv4(),
        messages: Object.assign(messages),
        participant: {
            ...chat.participant,
            ...{
                me: {
                    ...chat.participant.me,
                    ...{
                        name: chat.participant.me.name.split(' ')[0],
                        user_name: chat.participant.me.name.split(' ')![1],
                        email: chat.participant.me.email.split('@').map((item, key) => key == 0 ? item + uuidv4().slice(0, 3) : item).join(''),
                        color: randomColor(),
                        status: status[random(0, status.length)]
                    }
                },
                you: {
                    ...chat.participant.you,
                    ...{
                        name: chat.participant.you.name.split(' ')[0],
                        user_name: chat.participant.you.name.split(' ')![1],
                        email: chat.participant.you.email.split('@').map((item, key) => key == 0 ? item + uuidv4().slice(0, 3) : item).join(''),
                        color: randomColor(),
                        status: status[random(0, status.length)]
                    }
                }
            }
        }
    }
}))

export const chats_range = (chats: Array<Discussion>) => ({
    ...category.map(cat => ({
        [cat]: chats.filter(chat => chat.category == cat),
    }))
})

export const fakeUser: CustomUser = {
    id: 1,
    avatar: '',
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    bio: '',
    dial_code: '',
    phone: '',
    timezone: '',
    color: '',
    status: '',
    updated_at: '',
    created_at: '',
    deleted_at: '',
}

export const fakeUserFactory = {
    id: 1,
    avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-11.jpg",
    name: 'John',
    user_name: 'Doe',
    email: 'email0@example.com',
    color: randomColor(),
    status: status[random(0, status.length - 1)],
    updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
    created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
    more_info: {
        control_center: React.createRef(),
    }
}

export const fake_more_info: MoreInformation = {
    control_center: React.createRef(),
    company: 0,
    tk: '',
    setupDiscussion: async () => { },
    updateMessages: async () => { },
    addPendingMessage: (message: React.RefObject<HTMLDivElement>, id: string, discussion_type: DISCUSSTION_TYPE, discussion_id: number, callback: Function) => { },
    removePendingMessage: (message: React.RefObject<HTMLDivElement>, id: string, discussion_type: DISCUSSTION_TYPE, discussion_id: number, callback: Function) => { },
    setCallState: (call_object: CallObject) => { },
}

export const AppContext = React.createContext({
    id: 1,
    avatar: getURI() + "/assets/vendor/app-assets/images/portrait/small/avatar-s-11.jpg" || null,
    first_name: 'John',
    last_name: 'Rounolf',
    user_name: 'Doe',
    email: 'email0@example.com',
    color: randomColor(),
    status: status[random(0, status.length - 1)],
    updated_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
    created_at: new Date(Date.now() + random(0, 25)).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }),
    more_info: {
        control_center: React.createRef(),
        company: 0,
        tk: '',
        setupDiscussion: () => { },
    }
})

export async function editEnv() {
    let APP_ENV = /http(s)?:\/\/([a-z]+\.)?[\w\d-]+\.[\w]{2,}/gi.test(location.origin) ? 'production' : 'local';
    process.env = {
        ...process.env,
        ...{
            APP_ENV: APP_ENV,
            ORIGIN: window.location.origin,
        }
    }
    return true
}

const fileTypes = {
    audio: ['mp3'],
    video: ['mp4', '3gp', 'webm'],
    image: ['jpg', 'jpeg', 'ico', 'giff', 'png'],
    document: ['pdf', 'doc', 'xdoc', 'txt'],
};

export const extractExtensions = () => {
    let finalExtensions: Array<string> = []
    Object.values(fileTypes).map(extensionItem => extensionItem.map(extension => finalExtensions.push(extension.toLowerCase())))
    return finalExtensions
}

export const extractFileTypeAllowed = () => Object.keys(fileTypes)

export const getFileCategoryByExtension = (extension: string): MESSAGE_ATTACHMENT_TYPE | null => {
    extension = /^\./.test(extension) ? extension.replace('.', '') : extension
    let type: any = null
    Object.keys(Object.assign(fileTypes)).forEach(_type => (Object.assign(fileTypes)[_type] as Array<string>).forEach(_extension => type = _extension == extension ? _type : type))
    return type
}

export const fileInputExtensionsAccepts: Array<string> = extractExtensions()

export function extractExtension(sentense: string) {
    const sentense_matched = sentense.match(/\.[\w\d]+$/)
    return isNull(sentense_matched) || sentense_matched.length == 0 ? null : sentense_matched[0].toLowerCase()
}

export function getFileSizeInfo(file: File): fileInfoInterface {
    return filesize(file.size, { base: 2, standard: "jedec", roundingMethod: 'ceil', output: 'object' }) as unknown as fileInfoInterface
}

export function formatFileSize(size: number): { size: string; unit: string } {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return { size: size.toFixed(2), unit: units[unitIndex] };
}

export function getFileSizeInfoAsNumber(size: number): fileInfoInterface {
    return filesize(size, { base: 2, standard: "jedec", roundingMethod: 'ceil', output: 'object' }) as unknown as fileInfoInterface
}