import { ERROR_STATUS } from "../../enums/invoice"
import { TODO_PANEL_MODE, TODO_PANEL_STATE, TODO_TASK_CATEGORY } from "../../enums/todo"
import { UserModel } from "../user"
import { AlertError, Config } from "./invoice"

export interface TodoProps {
        tk: string
}

export interface TodoState {
        loaded: boolean
        config: Config
        tags: Array<TodoTag>
        tasks: Array<TaskUser>
        task_filter: TODO_TASK_CATEGORY
        tasks_filter: Array<TaskUser>
        task_user: TaskUser | null
        panel_mode: TODO_PANEL_MODE
        company_member: Array<TodoUser>
        panel_is_visible: boolean
        search_text: string
        error: AlertError
}

export interface TodoLeftProps {
        origin: string
        tk: string
        tags: Array<TodoTag>
        task_user: TaskUser | null
        task_category: TODO_TASK_CATEGORY
        panel_mode: TODO_PANEL_MODE
        panel_is_visible: boolean
        company_member: Array<TodoUser>
        buildError: (status: ERROR_STATUS, errors?: Array<string>) => void
        updateTodo: () => Promise<void>
        setTaskUser: (task_user: TaskUser | null, panel_mode: TODO_PANEL_MODE) => void
        setTaskCategory: (category: TODO_TASK_CATEGORY) => void
        setPanelState: (state: TODO_PANEL_STATE) => void
        searchText: (search_text: string) => void
}

export interface CreateTaskData {
        task_name: string;
        task_members: number[];
        task_due_date: string;
        task_description: string;
        task_description_attachments: File[];
        task_description_tmp_attachments: string[];
        task_tags: number[];
        task_comment: string;
        task_comment_attachments: File[];
        task_comment_tmp_attachments: string[];
}

export interface UpdateTaskData extends CreateTaskData {
        task: number
}

export interface TodoRightProps extends TodoLeftProps {
        tasks: Array<TaskUser>
        search_text: string
}

export interface TodoLeftState {
        selectedTag: TodoTag
}

export interface TodoTag {
        id?: number
        name: string
        label: string
}

export interface TodoUser {
        id: number;
        type_user_id: number;
        companie_id: number;
        user_name: string;
        first_name: string;
        last_name: string;
        email: string;
        email_verified_at: string;
        avatar: string;
        twitter: string | null;
        instagram: string | null;
        facebook: string | null;
        linkedin: string | null;
        quora: string | null;
        google: string | null;
        bio: string | null;
        country: string | null;
        website: string | null;
        phone: string | null;
        birthday: string | null;
        status: string;
        last_active_at: string;
        deleted_at: string | null;
        created_at: string;
        updated_at: string;
}

export interface TodoLabel {
        id: number;
        user_id: number;
        name: string;
        label: string;
        deleted_at: string | null;
        created_at: string;
        updated_at: string;
        user: TodoUser;
}

export interface TodoTaskLabel {
        id: number;
        user_id: number;
        label_id: number;
        task_id: number;
        deleted_at: string | null;
        created_at: string;
        updated_at: string;
        label: TodoLabel;
}

export interface TodoTask {
        id: number;
        name: string;
        description: string;
        comment: string;
        date_task: string;
        is_copy: 1 | 0;
        status: number;
        favorite: number;
        description_attachments: any;
        comment_attachments: any;
        deleted_definitely: 0 | 1;
        deleted_at: string | null;
        created_at: string;
        updated_at: string;
        labels: Array<TodoTaskLabel>;
}

export interface TaskUser {
        id: number;
        task_id: number;
        user_id: number;
        access: string;
        deleted_at: string | null;
        updated_at: string;
        created_at: string;
        task: TodoTask;
        user: TodoUser
        users: Array<TaskUser>
}

export interface TaskItemProps {
        task_user: TaskUser
        task_category: TODO_TASK_CATEGORY
        tk: string
        origin: string,
        buildError: (status: ERROR_STATUS, errors?: Array<string>) => void
        onClick?: (event?: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
        updateTodo: () => Promise<void>
        setPanelState: (state: TODO_PANEL_STATE) => void
}

export interface PanelSideProps {
        tk: string
        origin: string
        tags: Array<TodoTag>
        panel_is_visible: boolean
        task_user: TaskUser
        mode: TODO_PANEL_MODE
        company_member: Array<TodoUser>
        buildError: (status: ERROR_STATUS, errors?: Array<string>) => void
        updateTodo: () => Promise<void>
        setTaskUser: (task_user: TaskUser | null, panel_mode: TODO_PANEL_MODE) => void
        setPanelState: (state: TODO_PANEL_STATE) => void
}

export interface PanelSideState {
        task_name: string
        task_due_date: Date
        task_description: string
        task_description_attachs: Array<string>
        task_comment_attachs: Array<string>
        task_comment_attachs_chat: Array<string>
        task_comment: string
        task_comment_chat: string
        task_comment_chat_list: Array<TaskComment>
        task_owners: Array<number>
        task_tags: Array<number>
        mode: TODO_PANEL_MODE
        submitting: boolean
}

export interface TaskCommentAttachment {
        id: number
        task_comment_id: number
        original_name: string
        name: string
        path: string
        created_at: string
        updated_at: string
}

export interface TaskComment {
        id: number
        task_id: number
        user_id: number
        comment: string
        posted: UserModel
        attachments: Array<TaskCommentAttachment>
        created_at: string
        updated_at: string
}

export interface GetTodoRequest {
        code: number
        response: {
                code: number
                response: string
                tags: Array<TodoTag>
                tasks: Array<TaskUser>
                company_member: Array<TodoUser>
                errors?: Array<string>
        }
}

export interface RequestResponse {
        code: number
        response: {
                code: number
                response: string
                errors?: Array<string>
        }
}

export interface SetTodoTagRequest extends RequestResponse { }

export interface CreateTodoTagRequest extends RequestResponse { }

export interface DeleteTodoTagRequest extends RequestResponse { }

export interface StarTaskRequest extends RequestResponse { }

export interface DeleteTaskRequest extends RequestResponse { }

export interface RestoreTaskRequest extends RequestResponse { }

export interface CompleteTaskRequest extends RequestResponse { }

export interface CreateTaskRequest extends RequestResponse { }

export interface UpdateTaskRequest extends RequestResponse { }

export interface DuplicateTaskRequest extends RequestResponse { }

export interface GetTaskComments {
        code: number
        response: string
        comments: Array<TaskComment>
        errors?: Array<string>
}