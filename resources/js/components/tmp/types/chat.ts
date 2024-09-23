export type MessageProgressType = {
    id: number
    discussion_id: number
    message: string
    status: string
    created_at: string
    updated_at: string
    user_id: number
    percent: number
    token: string
    messageElement: React.RefObject<HTMLDivElement>
    callback: Function
}