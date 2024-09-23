import { in_array } from "../../functions/tools";
import { CompleteTaskRequest, CreateTaskData, CreateTaskRequest, CreateTodoTagRequest, DeleteTaskRequest, DeleteTodoTagRequest, DuplicateTaskRequest, GetTaskComments, GetTodoRequest, RestoreTaskRequest, SetTodoTagRequest, StarTaskRequest, TodoTag, TodoTask, UpdateTaskRequest } from "../../interfaces/pages/todo";

export function getTodo(token: string, origin: string): Promise<GetTodoRequest> {
        return fetch(`${origin}/api/get-todo`, {
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                }
        }).then(async data => ({ code: data.status, response: await data.json() }))
}

export function setTodoTag(token: string, origin: string, tag: TodoTag): Promise<SetTodoTagRequest> {
        return fetch(`${origin}/api/set-todo-tag`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify(tag)
        }).then(async data => ({ code: data.status, response: await data.json() }))
}

export function createTodoTag(token: string, origin: string, tag: TodoTag): Promise<CreateTodoTagRequest> {
        return fetch(`${origin}/api/create-todo-tag`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify(tag)
        }).then(async data => ({ code: data.status, response: await data.json() }))
}

export function deleteTodoTag(token: string, origin: string, tag: TodoTag): Promise<DeleteTodoTagRequest> {
        return fetch(`${origin}/api/delete-todo-tag`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify(tag)
        }).then(async data => ({ code: data.status, response: await data.json() }))
}

export function taskStar(token: string, origin: string, task: TodoTask): Promise<StarTaskRequest> {
        return fetch(`${origin}/api/star-task`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify({
                        task_id: task.id
                })
        }).then(async data => ({ code: data.status, response: await data.json() }))
}

export function taskDelete(token: string, origin: string, task: TodoTask, definitely: boolean = false): Promise<DeleteTaskRequest> {
        return fetch(`${origin}/api/delete-task${definitely ? '-definitely' : ''}`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify({
                        task_id: task.id
                })
        }).then(async data => ({ code: data.status, response: await data.json() }))
}

export function taskRestore(token: string, origin: string, task: TodoTask): Promise<RestoreTaskRequest> {
        return fetch(`${origin}/api/restore-task`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify({
                        task_id: task.id
                })
        }).then(async data => ({ code: data.status, response: await data.json() }))
}

export function taskComplete(token: string, origin: string, task: TodoTask): Promise<CompleteTaskRequest> {
        return fetch(`${origin}/api/complete-task`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify({
                        task_id: task.id
                })
        }).then(async data => ({ code: data.status, response: await data.json() }))
}

export function createTask(token: string, origin: string, task: CreateTaskData): Promise<CreateTaskRequest> {
        let form = new FormData()

        Object.keys(task).forEach(task_key => {
                if (in_array(task_key, ['task_name', 'task_due_date', 'task_description', 'task_comment'])) form.append(task_key, (task as any)[task_key])
        })

        task.task_members.forEach(member => form.append(`collaborators[]`, member.toString()))
        task.task_tags.forEach(tag => form.append(`labels[]`, tag.toString()))
        task.task_description_attachments.forEach(description_attachment => form.append(`description_attachments[]`, description_attachment))
        task.task_comment_attachments.forEach(comment_attachment => form.append(`comment_attachments[]`, comment_attachment))

        return fetch(`${origin}/api/create-task`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                },
                body: form
        }).then(async data => ({ code: data.status, response: await data.json() }))
}

export function updateTask(token: string, origin: string, task: CreateTaskData): Promise<UpdateTaskRequest> {
        let form = new FormData()

        Object.keys(task).forEach(task_key => {
                if (in_array(task_key, ['task', 'task_name', 'task_due_date', 'task_description', 'task_comment'])) form.append(task_key, (task as any)[task_key])
        })

        task.task_members.forEach(member => form.append(`collaborators[]`, member.toString()))
        task.task_tags.forEach(tag => form.append(`labels[]`, tag.toString()))
        task.task_description_attachments.forEach(description_attachment => form.append(`description_attachments[]`, description_attachment))
        task.task_description_tmp_attachments.forEach(description_tmp_attachment => form.append(`description_tmp_attachments[]`, description_tmp_attachment))
        task.task_comment_attachments.forEach(comment_attachment => form.append(`comment_attachments[]`, comment_attachment))
        task.task_comment_tmp_attachments.forEach(comment_tmp_attachment => form.append(`comment_tmp_attachments[]`, comment_tmp_attachment))

        return fetch(`${origin}/api/update-task`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                },
                body: form
        }).then(async data => ({ code: data.status, response: await data.json() }))
}

export function duplicateTask(token: string, origin: string, task_id: number): Promise<DuplicateTaskRequest> {

        return fetch(`${origin}/api/duplicate-task`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify({ id: task_id })
        }).then(async data => ({ code: data.status, response: await data.json() }))
}

export function getTaskComments(token: string, task_id: number): Promise<GetTaskComments> {

        return fetch(`${origin}/api/comment${task_id}`, {
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                }
        }).then(async data => ({ ...(await data.json()), ...{ code: data.status } }))
}

export function PostComment(token: string, task_id: number, comment: string, attachments: Array<File>): Promise<GetTaskComments> {

        const form = new FormData()

        form.append('task_id', task_id.toString())
        form.append('comment', comment)
        attachments.forEach(file => {
                form.append('attachement[]', file)
        })

        return fetch(`${origin}/api/comment`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                },
                body: form
        }).then(async data => ({ ...(await data.json()), ...{ code: data.status } }))
}