import { isNull, isUndefined } from "lodash";
import moment from "moment";
import { DISCUSSTION_TYPE } from "../enums/chat";
import { getURI } from "../functions/tools";
import {
    DeleteDiscussionResponse,
    Discussion,
    GetCompanyMemberResponse,
    getUserResponse,
    Queue,
    SetDiscussionStateResponse,
    SetGroupAvatarStateResponse,
    SetGroupDescriptionStateResponse,
    SetGroupNameStateResponse,
    SetPinToTopResponse,
    User
} from "../interfaces/chat";

export interface ConversationsData {
    [category_name: string]: Array<Discussion>
}

export async function getMyConversations(URI: string, token: string): Promise<{ code: number, response: string, data: ConversationsData, user: User | undefined }> {
    return await fetch(`${URI}/my-conversations`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
            Accept: 'application/json',
        }
    }).then(data => data.json())
    .catch(err => {
        console.error(err);
        return {
            code: 418,
            response: 'error',
            data: [],
            user: {}
        }
    })
}

export async function getMyCredentials(token: string): Promise<getUserResponse> {
    return await fetch(`${window.location.origin}/api/my-credentials`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
            Accept: 'application/json',
        }
    }).then(async data => ({code: data.status, response: await data.json()}))
}

export async function getCompanyMember(token: string): Promise<GetCompanyMemberResponse> {
    return await fetch(`${window.location.origin}/api/company-member`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
            Accept: 'application/json',
        }
    }).then(data => data.json())
    .catch(err => {
        console.error(err);
        return {
            code: 418,
            response: err.message
        }
    })
}

export async function createNewConversation(token: string, users: Array<number>, discussion_type: DISCUSSTION_TYPE, group_avatar?: File, group_name?: string): Promise<{ code: 200 | 400, response: string | [] }> {
    let form = new FormData();
    users.forEach(user => form.append('users[]', user.toString()) )
    form.append('discussion', discussion_type)
    if (!isUndefined(group_name) && discussion_type == DISCUSSTION_TYPE.GROUPS) form.append('group_name', group_name)
    if (!isUndefined(group_avatar) && discussion_type == DISCUSSTION_TYPE.GROUPS) form.append('avatar', group_avatar)
    return await fetch(`${window.location.origin}/api/create-new-conversation`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
        body: form
    }).then(data => data.json())
    .catch(err => {
        console.error(err);
        return {
            code: 400,
            response: err.message
        }
    })
}

export async function saveMessage(queue: Queue, addPendingMessage: Function): Promise<{ code: 200 | 400, response: string | [] }> {
    let form = new FormData(),
    xhr: XMLHttpRequest | null = new XMLHttpRequest();
    
    queue.datas.category == DISCUSSTION_TYPE.CHATS ? form.append('correspondant', queue.datas.correspondant_id.toString()) : null
    queue.datas.category == DISCUSSTION_TYPE.GROUPS ? queue.datas.correspondant_list.forEach(correspondant => {
        form.append('correspondant_list[]', correspondant.toString())
    }) : null
    form.append('discussion_id', queue.datas.discussion_id.toString())
    form.append('category', queue.datas.category)
    queue.datas.message.trim().length == 0 && queue.files.length > 0 ? null : form.append('message', queue.datas.message)
    queue.files.forEach(file => {
        form.append(`files[]`, file)
    })
    form.append('posting_date', moment(new Date()).utc().format())

    xhr.open('POST', `${window.location.origin}/api/save-message`, true)
    xhr.setRequestHeader('Authorization', `Bearer ${queue.token}`)
    xhr.responseType = 'json'
    xhr.withCredentials = true
    xhr.timeout = (1000 * 60) * 5 //    05 minutes

    return new Promise((resolve, reject) => {
        xhr?.upload.addEventListener('progress', ({total, loaded, lengthComputable}) => {
            if (lengthComputable) {
                const percent = Math.ceil((loaded / total) * 100);
                !isNull(queue.messageElement.current!) ? queue.messageElement.current!.querySelector('p')!.innerText = `${percent}%` : null
            }
        }, false)
    
        xhr?.addEventListener('load', e => {
            const response = xhr?.response
            xhr = null
            resolve(response)
        }, false)
        
        xhr?.addEventListener('error', e => {
            reject({
                code: 400,
                response: 'Some error occured'
            })
        }, false)
        
        xhr?.addEventListener('abort', e => {
            reject({
                code: 400,
                response: 'Request aborted by user'
            })
        }, false)
        
        xhr?.addEventListener('timeout', e => {
            reject({
                code: 400,
                response: 'A request timeout passed'
            })
        }, false)

        if (queue.files.length > 0) {
            addPendingMessage(queue.messageElement, queue.id, queue.datas.category, queue.datas.discussion_id, () => {
                let timer = setInterval(() => {
                    if (!isNull(queue.messageElement.current)) {
                        clearInterval(timer)
                        xhr?.send(form)
                    }
                }, 100)
            })
            return
        }
        xhr?.send(form)
    })
}

export async function markMessageAsReaded(token: string, message_id: number): Promise<{ code: 200 | 418, response: string | [] }> {
    return await fetch(`${window.location.origin}/api/mark-message-as-readed`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({message_id: message_id})
    }).then(data => data.json())
    .catch(err => {
        console.error(err);
        return {
            code: 400,
            response: err.message
        }
    })
}

export function setDiscussionToTopMode(token: string, discussion_id: number): Promise<SetPinToTopResponse> {
    return fetch(`${getURI()}/api/set-pin-to-top`, {
            method: 'POST',
            headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                    Accept: 'application/json',
            },
            body: JSON.stringify({
                    id: discussion_id
            })
    }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function deleteDiscussion(token: string, discussion_id: number): Promise<DeleteDiscussionResponse> {
    return fetch(`${getURI()}/api/delete-discussion`, {
            method: 'POST',
            headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                    Accept: 'application/json',
            },
            body: JSON.stringify({
                    id: discussion_id
            })
    }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function lockUnlockDiscussion(token: string, discussion_id: number): Promise<SetDiscussionStateResponse> {
    return fetch(`${getURI()}/api/lock-unlock-discussion`, {
            method: 'POST',
            headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                    Accept: 'application/json',
            },
            body: JSON.stringify({
                    id: discussion_id
            })
    }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function lockUnlockDiscussionForlAll(token: string, discussion_id: number): Promise<SetDiscussionStateResponse> {
    return fetch(`${getURI()}/api/lock-unlock-discussion-all`, {
            method: 'POST',
            headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                    Accept: 'application/json',
            },
            body: JSON.stringify({
                    id: discussion_id
            })
    }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function setGroupAvatar(token: string, discussion_id: number, group_avatar: File): Promise<SetGroupAvatarStateResponse> {
    let form = new FormData()

    form.append('id', discussion_id.toString())
    form.append('avatar', group_avatar)

    return fetch(`${getURI()}/api/set-group-avatar`, {
            method: 'POST',
            headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
            },
            body: form
    }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function setGroupName(token: string, discussion_id: number, group_name: string): Promise<SetGroupNameStateResponse> {
    let form = new FormData()

    form.append('id', discussion_id.toString())
    form.append('name', group_name)

    return fetch(`${getURI()}/api/set-group-name`, {
            method: 'POST',
            headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
            },
            body: form
    }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function setGroupDescription(token: string, discussion_id: number, group_description: string): Promise<SetGroupDescriptionStateResponse> {
    let form = new FormData()

    form.append('id', discussion_id.toString())
    form.append('description', group_description)

    return fetch(`${getURI()}/api/set-group-description`, {
            method: 'POST',
            headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
            },
            body: form
    }).then(async response => ({ code: response.status, response: await response.json() }))
}