import { EventEmitter } from 'events'
import { User } from './chat'
import { AlertError, Config } from './pages/invoice'
export interface CalendarProps {
    token: string
}

export interface Tag {
    id: number
    user_id: number
    name: string
    color?: string
    bgColor?: string
    borderColor?: string
    dragBgColor?: string
    deleted_at: string | null
    created_at: string
    updated_at: string | null
}

export interface CalendarTag {
    id: string
    name: string
    checked: boolean,
    color: string
    bgColor: string
    borderColor: string
    dragBgColor: string
}

export interface ScheduleEventData extends Calendar {}

export interface ResponseRequestTag {
    code: number
    data: Array<Tag>
    response: string
}
export interface ResponseRequestNewTag {
    code: number
    data: Tag
    response: string
}
export interface ResponseRequestDeleteTag {
    code: number
    response: string
}
export interface ResponseRequestCreateSchedule {
    code: number
    response: string
    errors?: Array<string>
}
export interface ResponseRequestUpdateSchedule {
    code: number
    response: string
    errors?: Array<string>
}
export interface ResponseRequestGetSchedule {
    code: number
    data: Array<Calendar>
    response: string
}

export interface CreateScheduleForm {
    groupId: string | null
    color: number
    title: string
    description: string
    location: string
    timeline_start: string
    timeline_end: string
    members: Array<number>
}

export interface ScheduleState {
    config: Config
    tags: Array<Tag>
    members: Array<User>
    calendars: Array<Calendar>
    current_date: string
    create_schedule_popup_opened: boolean
    selectedTag: Tag
    form: CreateScheduleForm
    error: AlertError
}

export interface ScheduleProps {
    token: string
    event: EventEmitter
}

export interface CalendarSideBarProps {
    token: string
    event: EventEmitter
}

export interface CalendarSideBarState {
    tags: Array<CalendarTag> | null
    form: TagForm
    formAction: 'create' | 'update'
}

export interface ModalProps {
    setTagName: Function
    setTagColor: Function
    saveNewTag: Function
    deleteTag: Function
    saveButton: any
    preview: any
    form: TagForm
    action: 'create' | 'update'
}

export interface Calendar {
    id: number
    groupId: string
    color: number
    title: string
    description: string
    location: string
    start: string
    end: string
    members: Array<number>
}

export interface TagForm {
    id: number
    name: string
    color: string
    bgColor: string
    borderColor: string
    dragBgColor: string
}

export interface CustomTag {
    [x: string]: any
}