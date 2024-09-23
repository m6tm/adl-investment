

export enum INVOICE_STATUS {
        PAID = 'PAID',
        CREDIT = 'CREDIT',
        PENDING_PAYMENT = 'PENDING_PAYMENT',
        PARTIAL_PAID = 'PARTIAL_PAID',
}

export enum ERROR_STATUS {
        DANGER = 'danger',
        SUCCESS = 'success',
}

export enum TAG_VIEW_MODE {
        READ = 'read',
        WRITE = 'write',
        UPDATE = 'update',
}

export enum TAG_GROUP {
        INVOICE = 'invoice',
        NONE = 'none'
}

export enum INVOICE_HISTORY_TYPE {
        VIEW_INVOICE = 'VIEW_INVOICE',
        CREATE_INVOICE = 'CREATE_INVOICE',
        ADD_INVOICE_PAIEMENT = 'ADD_INVOICE_PAIEMENT',
        UPDATE_INVOICE_PAIEMENT = 'UPDATE_INVOICE_PAIEMENT',
        UPDATE_INVOICE = 'UPDATE_INVOICE',
        UPDATE_INVOICE_TAG = 'UPDATE_INVOICE_TAG',
        UPDATE_INVOICE_STATUS = 'UPDATE_INVOICE_STATUS',
        INVOICE_PRINTED = 'INVOICE_PRINTED',
        SEND_INVOICE = 'SEND_INVOICE',
        DOWNLOAD = 'DOWNLOAD',
        DELETE = 'DELETE',
        ADD_TAG = 'ADD_TAG',
        REMOVE_TAG = 'REMOVE_TAG'
}