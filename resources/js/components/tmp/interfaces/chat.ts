import { Socket } from "socket.io-client";
import { EventEmitter } from 'events'
import { DISCUSSTION_PERMISSION, DISCUSSTION_TYPE, MESSAGE_ATTACHMENT_TYPE, MESSAGE_STATUS, QUEUE_STATE, TYPE_USER } from "../enums/chat";
import React from "react";
import './GroupCallInterfaces'
import { AudioCallRef, VideoCallRef, CallMember, CallStarterData } from "./GroupCallInterfaces";
import { Permission } from "./user";


// #################### INTERFACE ####################

export interface ChatProps {
    token: string
    company: string
}

export interface ChatCardState {
    group_name_editting: boolean
    group_name: string
    group_description_editting: boolean
    group_description: string
}

export interface GroupProfileRef {
    avatar: React.RefObject<HTMLImageElement>
    'edit-avatar-btn': React.RefObject<HTMLElement>
    'avatar-input': React.RefObject<HTMLInputElement>
}

// New interfaces

interface ChatUser {
    id: number;
    user_name: string;
    first_name: string;
    last_name: string;
    avatar: string;
    bio: string | null;
    dial_code: string | null;
    phone: string | null;
    timezone: string;
    email: string;
    deleted_at: string | null;
    updated_at: string;
    created_at: string;
    color: string;
    status: string;
}

export interface ChatUserDiscussionParticipant extends ChatUser {
    permission: DISCUSSTION_PERMISSION
}

interface ChatMessage {
    id: number;
    discussion_id: number;
    message: string;
    token?: string
    status: MESSAGE_STATUS;
    created_at: string;
    updated_at: string;
    user_id: number;
    attachments: MessageAttachment[];
}

interface ChatParticipant {
    me: ChatUser
    you: ChatUser
}

interface LastMessage {
    id: number;
    discussion_id: number;
    message: string;
    status: MESSAGE_STATUS;
    created_at: string;
    updated_at: string;
}

export interface ChatDiscussion {
    discussion_id: number;
    avatar: string
    group_name: string
    group_description: string
    category: DISCUSSTION_TYPE;
    pin_to_top: boolean;
    locked_for_all: boolean;
    i_was_blocked: boolean;
    i_blocked: boolean;
    token: string;
    messages: ChatMessage[];
    permission: DISCUSSTION_PERMISSION
    participant: ChatParticipant;
    group_participant: Array<ChatUserDiscussionParticipant>
    "last message": LastMessage;
}

export interface ChatObject {
    chats: ChatDiscussion[];
    groups: ChatDiscussion[];
}

//   End

export interface Message extends ChatMessage { }

export interface LocationData {
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    org: string;
    as: string;
    query: string;
}


export interface GroupAudioCallProps {
    is_visible: boolean
    discard: (decline_initiator: boolean, raisons?: Array<string>) => void
    acceptCall: () => void
    call_members: Array<CallMember>
    call_picked_up: boolean
    audio_members: Array<AudioCallRef>
    recorder_time_ref: React.RefObject<HTMLElement>
    mute_unmute_microphone: () => void
}

export interface GroupVideoCallProps {
    is_visible: boolean
    discard: (decline_initiator: boolean, raisons?: Array<string>) => void
    acceptCall: () => void
    call_members: Array<CallMember>
    call_picked_up: boolean
    video_members: Array<VideoCallRef>
    recorder_time_ref: React.RefObject<HTMLElement>
    mute_unmute_microphone: () => void
    mute_unmute_camera: () => void
}

export interface MessageAttachment {
    id: number
    message_id: number
    name: string
    type: MESSAGE_ATTACHMENT_TYPE
    size: number
    created_at: number
    updated_at: number
}

export interface Messages {
    [category_name: string]: Array<Discussion>
}

export interface MessageProgress extends Message {
    percent: number
    token: string
    messageElement: React.RefObject<HTMLDivElement>
    callback: Function
}

export interface Queue {
    id: string
    token: string
    files: Array<File>
    state: QUEUE_STATE,
    datas: QueueData
    messageElement: React.RefObject<HTMLDivElement>
}

export interface QueueData {
    discussion_id: number
    user_id: number
    correspondant_id: number
    correspondant_list: Array<number>
    message: string
    category: DISCUSSTION_TYPE
}

export interface Discussion extends ChatDiscussion { }

export interface ChatState {
    messages: ChatObject
    current_conversation: string
    user: AppContextInterface
    searchDiscussionResults: Messages
    search_is_ready: boolean
}

export interface User extends ChatUser {
}

export interface CustomUser extends ChatUser {
    color: string
    status: string
}

export interface AppContextInterface extends CustomUser {
    more_info: MoreInformation
    socket?: Socket
    call_object?: CallObject,
    event: EventEmitter
}

export interface CallObject {
    chat: Discussion,
    is_visible: "none" | "",
    discard_call: Function,
    reset_call: Function,
    profile_display: 'you' | 'me',
    initiator: boolean,
    call_id: string,
    discussion_id: number,
    signal: string,
    call_type: 'audio' | 'video',
}

export interface MoreInformation {
    control_center: React.RefObject<HTMLDivElement>
    company: number
    tk: string
    setupDiscussion: () => Promise<void>
    updateMessages: () => Promise<void>,
    addPendingMessage: (message: React.RefObject<HTMLDivElement>, id: string, discussion_type: DISCUSSTION_TYPE, discussion_id: number, callback: Function) => void
    removePendingMessage: (message: React.RefObject<HTMLDivElement>, id: string, discussion_type: DISCUSSTION_TYPE, discussion_id: number, callback: Function) => void
    setCallState: (call_object: CallObject) => void
}


export interface ConversationProps {
    is_visible: boolean
    conversation: Discussion
    profile_card: React.RefObject<HTMLDivElement>
}

export interface ConversationHeaderState {
    call_audio_is_pending: 'none' | '',
    call_video_is_pending: 'none' | '',
    group_audio_call_is_pending: boolean,
    group_video_call_is_pending: boolean,
    profile_display: 'me' | 'you',
    initiator: boolean,
    call_id: string,
    discussion_id: number,
    signal: string,
    typing_is_pending: boolean
}

export interface GroupCallState {
    call_in_progress: boolean
    audio_call_in_progress: boolean
    video_call_in_progress: boolean
    call_picked_up: boolean
    call_data: CallStarterData
    call_members: Array<CallMember>
}

export interface ConversationBodyProps {
    body: Array<JSX.Element>,
    messages: Array<Message | MessageProgress>
    conversation: Discussion,
}

export interface ConversationLeftSideProps {
    messages: {
        [category_name: string]: Discussion[]
    }
    toggleConversation: Function
    searchDiscussion: (text: string) => void
}

export interface ConversationRigthSideProps {
    current_conversation: string
    messages: {
        [category_name: string]: Discussion[]
    }
    displayConversation: Function
    extractToChatList: Function
    profile_box: React.RefObject<HTMLDivElement>
    control_center: React.RefObject<HTMLDivElement>
}

export interface NewConversationState {
    search_is_pending: boolean
    has_error: boolean
    error: string
    results: Array<User>
    group_name: string
    group_member_results: Array<User>
    selected_group_member: Array<number>
    group_avatar: File | null
}

export interface NewConversationProps {
    is_visible: boolean,
    users: Array<CustomUser>,
    toggleSearchComponent: Function
}

export interface CompanyMemberUser extends User {
    type_user: TYPE_USER
}

export interface GetCompanyMemberResponse {
    code: number
    data: Array<CompanyMemberUser>
    response: string
}

export interface SetPinToTopResponse {
    code: number
    response: {
        code: number
        reponse: string
    }
}

export interface DeleteDiscussionResponse {
    code: number
    response: {
        code: number
        reponse: string
    }
}

export interface SetDiscussionStateResponse {
    code: number
    response: {
        code: number
        reponse: string
    }
}

export interface SetGroupAvatarStateResponse extends SetDiscussionStateResponse { }

export interface SetGroupNameStateResponse extends SetDiscussionStateResponse { }

export interface SetGroupDescriptionStateResponse extends SetDiscussionStateResponse { }

export interface VideoProps {
    chat: Discussion,
    is_visible: 'none' | '',
    discard_call: Function,
    reset_call: Function,
    profile_display: 'you' | 'me',
    initiator: boolean,
    call_id: string,
    discussion_id: number,
    signal: string,
}

export interface VideoState {
    audio_state: 'muted' | 'unmuted',
    video_state: 'muted' | 'unmuted',
    emitter_video_state: 'muted' | 'unmuted',
    call_timer: {
        hours: string,
        minutes: string,
        seconds: string,
    },
    call_is_running: boolean,
    call_accepted: boolean,
}

export interface fileInfoInterface {
    value: number,
    symbol: string,
    unit: string
}

export interface PreviewProps {
    style?: React.CSSProperties | undefined,
    attachments: Array<File>,
    removeFile: Function,
    wipeAllFiles: Function,
}

export interface RecorderProps {
    style?: React.CSSProperties | undefined
    closeRecordinPanel: Function
}

export interface RecorderState {
    recorder_state: 'stope' | 'play' | 'pause'
    recorder_timer: {
        seconds: string
        minutes: string
        hours: string
    }
}

export interface GetCustomUser extends User {
    type_user: TYPE_USER
    permission: Permission
}

export interface getUserResponse {
    code: number
    response: {
        code: number
        user: GetCustomUser | null,
        response: string | Array<any>
    }
}
