export enum DISCUSSTION_TYPE {
    CHATS = 'chats',
    GROUPS = 'groups',
}

export enum DISCUSSTION_PERMISSION {
    AUTHOR = 'author',
    ADMIN = 'admin',
    PARTICIPANT = 'participant',
}

export enum MESSAGE_ATTACHMENT_TYPE {
    AUDIO = 'audio',
    VIDEO = 'video',
    IMAGE = 'image',
    DOCUMENT = 'document',
}

export enum MESSAGE_STATUS {
    READED = 'readed',
    UNREADED = 'unreaded',
}

export enum QUEUE_KEYS {
    'id',
    'token',
    'files',
    'state',
    'messageElement',
    'datas',
}

export enum QUEUE_DATA_KEYS {
    'discussion_id',
    'user_id',
    'correspondant_id',
    'correspondant_list',
    'message',
    'category',
}

export enum QUEUE_STATE {
    PENDING = 'pending',
    IN_PROGRESS = 'in progress'
}

export enum CALL_MODE {
    AUDIO = 'audio',
    VIDEO = 'video',
}

export enum TYPE_USER {
    SUPER_ADMIN = 'Super Admin',
    USER = 'User',
    SIMPLE_USER = 'Simple User',
}