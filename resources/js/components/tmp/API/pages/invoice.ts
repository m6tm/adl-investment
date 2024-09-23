import { isNumber } from "lodash";
import { INVOICE_STATUS, INVOICE_HISTORY_TYPE, TAG_GROUP } from "../../enums/invoice";
import { getURI } from "../../functions/tools";
import { AddInvoiceTagResponse, DeleteInvoiceResponse, GetConfigResponse, GetCredentialsAndMe, GetCompanieResponse, GetInvoiceHistoryResponse, GetInvoiceItemResponse, GetInvoiceListResponse, GetInvoiceResponse, GetInvoiceStatusResponse, GetTagsResponse, SaveInvoiceResponse, SendInvoiceMail, SetInvoiceEmail, SetInvoiceStatusResponse, SetTagResponse, Tag, SetInvoiceCustomerResponse } from "../../interfaces/pages/invoice";


export function ping(token: string) {
        return fetch(`${getURI()}/api/ping`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`
                }
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function getConfig(token: string): Promise<GetConfigResponse> {
        return fetch(`${getURI()}/api/config`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`
                }
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function getCredentialsAndMe(token: string): Promise<GetCredentialsAndMe> {
        return fetch(`${getURI()}/api/my-credentials2`, {
                method: 'GET',
                headers: {
                        Authorization: `Bearer ${token}`
                }
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function getTags(token: string): Promise<GetTagsResponse> {
        return fetch(`${getURI()}/api/tags`, {
                method: 'GET',
                headers: {
                        Authorization: `Bearer ${token}`
                }
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function getInvoiceTag(token: string, invoice_id: number): Promise<GetTagsResponse> {
        return fetch(`${getURI()}/api/get-invoice-tags`, {
                method: 'GET',
                headers: {
                        Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                        invoice_id
                })
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function createTag(token: string, tag: Tag): Promise<SetTagResponse> {
        return fetch(`${getURI()}/api/create-new-tag`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify(tag)
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function setTag(token: string, tag: Tag): Promise<SetTagResponse> {
        return fetch(`${getURI()}/api/set-tag`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify(tag)
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function deleteTag(token: string, tag: Tag, tag_group: TAG_GROUP, invoice_id?: number): Promise<SetTagResponse> {
        return fetch(`${getURI()}/api/delete-tag`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify(invoice_id ? {
                        ...tag,
                        invoice_id
                } : tag)
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function invoiceSendMail(token: string, email_data: SendInvoiceMail): Promise<SetInvoiceEmail> {
        let form = new FormData(),
                data: any = {}

        Object.assign(data, email_data)
        Object.keys(data).forEach(key => {
                form.append(key, isNumber(data[key]) ? data[key].toString() : data[key])
        })

        return fetch(`${getURI()}/api/invoice-send-mail`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                },
                body: form
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function getCompanie(token: string): Promise<GetCompanieResponse> {
        return fetch(`${getURI()}/api/get-companie`, {
                headers: {
                        Authorization: `Bearer ${token}`
                }
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function getInvoice(token: string, invoice_id: number): Promise<GetInvoiceResponse> {
        return fetch(`${getURI()}/api/get-invoice`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify({
                        id: invoice_id
                })
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function addTagToInvoice(token: string, invoice_id: number, tag_id: number): Promise<AddInvoiceTagResponse> {
        return fetch(`${getURI()}/api/add-tag-to-invoice`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify({
                        invoice_id,
                        tag_id
                })
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function saveInvoice(token: string, form: FormData): Promise<SaveInvoiceResponse> {
        return fetch(`${getURI()}/api/create-invoice`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`
                },
                body: form
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function editInvoice(token: string, form: FormData): Promise<SaveInvoiceResponse> {
        return fetch(`${getURI()}/api/edit-invoice`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`
                },
                body: form
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function getInvoiceList(token: string): Promise<GetInvoiceListResponse> {
        return fetch(`${getURI()}/api/get-invoice-list`, {
                headers: {
                        Authorization: `Bearer ${token}`
                }
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function getInvoiceItem(token: string, invoice_id: number): Promise<GetInvoiceItemResponse> {
        return fetch(`${getURI()}/api/get-invoice${invoice_id}`, {
                headers: {
                        Authorization: `Bearer ${token}`
                }
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function deleteInvoice(token: string, invoice_id: number, passwd: string): Promise<DeleteInvoiceResponse> {
        return fetch(`${getURI()}/api/delete-invoice/${invoice_id}`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-type": "application/json",
                        accept: "application/json",
                },
                body: JSON.stringify({ passwd })
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function getInvoiceHistory(token: string, invoice_id: number): Promise<GetInvoiceHistoryResponse> {
        return fetch(`${getURI()}/api/invoice-history/${invoice_id}`, {
                headers: {
                        Authorization: `Bearer ${token}`
                }
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function getInvoiceStatus(token: string, invoice_id: number): Promise<GetInvoiceStatusResponse> {
        return fetch(`${getURI()}/api/invoice-status/${invoice_id}`, {
                headers: {
                        Authorization: `Bearer ${token}`
                }
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function setInvoiceStatus(token: string, invoice_id: number, new_status: INVOICE_STATUS): Promise<SetInvoiceStatusResponse> {
        return fetch(`${getURI()}/api/invoice-status`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify({
                        invoice_id,
                        new_status
                })
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function setInvoicePaiment(token: string, invoice_id: number, new_price: number, status: INVOICE_STATUS): Promise<SetInvoiceStatusResponse> {
        return fetch(`${getURI()}/api/invoice-balance`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify({
                        invoice_id,
                        new_price,
                        new_status: status
                })
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function setInvoiceHistory(token: string, invoice_id: number, invoice_history: INVOICE_HISTORY_TYPE): Promise<SetInvoiceStatusResponse> {
        return fetch(`${getURI()}/api/set-invoice-history`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify({
                        invoice_id,
                        invoice_history
                })
        }).then(async response => ({ code: response.status, response: await response.json() }))
}

export function setInvoiceCustomer(token: string, invoice_id: number, customer_id: number): Promise<SetInvoiceCustomerResponse> {
        return fetch(`${getURI()}/api/customer-to-invoice`, {
                method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                },
                body: JSON.stringify({
                        invoice_id,
                        customer_id
                })
        }).then(async response => ({ code: response.status, response: await response.json() }))
}