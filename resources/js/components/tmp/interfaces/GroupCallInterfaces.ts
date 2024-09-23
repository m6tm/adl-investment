import React from "react"
import { ChatUserDiscussionParticipant, Discussion } from "./chat"



export interface CallStarterData {
        initiator: boolean
        call_id: string
        discussion_id: number
        initiator_id: number
        group: Discussion
        signal: string | null
}

export interface AudioCallRef {
        user_id: number
        audio: React.RefObject<HTMLAudioElement>
}

export interface VideoCallRef {
        user_id: number
        video: React.RefObject<HTMLVideoElement>
}

export interface CallTimeCouter {
        hour: number
        minute: number
        second: number
}

export interface CallMember {
        stream: MediaStream
        audio_muted: boolean
        video_muted: boolean
        user: ChatUserDiscussionParticipant
}

export interface CallRequestData {
        call_id: string
        initiator_id: number
        discussion_id: number
        signal: string
        group: string
}