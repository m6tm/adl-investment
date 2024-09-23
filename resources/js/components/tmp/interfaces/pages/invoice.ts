import { INVOICE_STATUS } from "../../enums/invoice"
import { User } from "../chat"
import { Customer } from "./customer"
import { TodoUser } from "./todo"



export interface InvoiceState {
        invoices: Array<MainInvoiceCollection>
        user: User
        config: Config
        loading: boolean
        status: Array<string>
        credentials: MyCredentials
        invoice_email: InvoiceEmail
        invoice_displaid: boolean
        companie: Companie
        error: AlertError
        send_email_pending: boolean
}

export interface DisplayInvoiceState {
        invoice: MainInvoiceCollectionCustom
        user: User
        preview: Preview
        config: Config
        company: CompanieCustom
        invoice_email: InvoiceEmail
        error: AlertError
        credentials: MyCredentials
        loading: boolean
        tags: Array<Tag>
        send_email_pending: boolean
}

export interface AddInvoiceStateInterface {
        invoice_code: string
        invoice_name: string
        adress: BillTo
        companie: Companie
        items: Array<InvoiceItem>
        datas: Array<InvoiceItemDate>
        error: AlertError
        config: Config
        preview: Preview
        tags: Array<Tag>
        selected_tags: Array<number>
}

export interface EditInvoiceStateInterface {
        invoice_code: string
        invoice_name: string
        adress: BillTo
        companie: Companie
        items: Array<CustomInvoiceItem>
        error: AlertError
        config: Config
        preview: Preview
        credentials: MyCredentials
        invoice_email: InvoiceEmail
        loading: boolean
        selected_tags: Array<number>
        invoice_tags: Array<Tag>
        invoice: Invoice
        send_email_pending: boolean
}

export interface InvoiceHistoryStateInterface {
        history: Array<InvoiceHistorie>
}

export interface CustomerInvoiceProps {
        tk: string
        invoice_id: number
        customer: Customer | null
}

export interface CustomerInvoiceState {
        customers: Array<Customer>
        selected_customer: number
}

export interface InvoiceEmail {
        invoice_id: number
        from: string
        to: string
        subject: string
        attachment: File | null
}

export interface Invoice {
        id: number
        invoice_code: string
        invoice_name: string
        date_issue: string
        date_due: string
        total_pay_to_date: number
        customer: Customer
        status: INVOICE_STATUS
        adress: BillTo
        items: Array<CustomInvoiceItem>
        tags: Array<Tag>
}

export interface MainInvoice {
        id: number
        code_invoice: string
        companie_id: number
        company: CompanieCustom
        customer_id: number | null
        customer: Customer | null
        created_at: string
        bill_to_name: string
        invoice_name: string
        bill_to_city: string
        bill_to_descrip: string
        total_pay_to_date: number
        status: INVOICE_STATUS
}

export interface MainInvoiceCustom {
        id: number
        companie_id: number
        code_invoice: string
        date_due: string
        date_issue: string
        invoice_name: string
        total_pay_to_date: number
        bill_to_name: string
        bill_to_descrip: string
        bill_to_city: string
        status: INVOICE_STATUS
        items: Array<MainInvoiceItemCustom>
        customer: Customer | null
        deleted_at: string
        created_at: string
        updated_at: string
}

export interface MainInvoiceItem {
        id: number
        item_name: string
        cost: number
        price: number
        qty: number
}

export interface MainInvoiceItemCustom {
        id: number
        invoice_id: number
        item_name: string
        description: string
        cost: number
        qty: number
        price: number
        discount: number
        tax_label1: string
        tax_label2: string
        tax1: number
        tax2: number
        deleted_at: string
        created_at: string
        updated_at: string
}

export interface InvoiceHistorie {
        id: number
        invoice_id: number
        user_id: number
        user: TodoUser
        action: string
        action_description: string
        created_at: string
        updated_at: string
}

export interface MainInvoiceCollection {
        invoice: MainInvoice
        items: Array<CustomInvoiceItem>
        tags: Array<Tag>
}

export interface MainInvoiceCollectionCustom {
        invoice: MainInvoiceCustom
        items: Array<MainInvoiceItemCustom>
        tags: Array<Tag>
}

export interface Config {
        app_name: string
        origin: string
}

export interface Companie {
        name: string
        address: string
        country: string
        city: string
        phone: string
}

export interface CompanieCustom {
        id: number
        package_id: number
        name: string
        address: string
        country: string
        city: string
        phone: string
        mobile: string
        pincode: string
        token: string
        deleted_at: string
        created_at: string
        updated_at: string
}

export interface Preview {
        subtotal: number
        discount: number
        tax: number
        invoice_total: number
        paid_to_date: number
        current_balance: number
        balance: number
}

export interface SendInvoiceMail {
        invoice_id: number
        to: string
        subject: string
        attachment: File | null
}

export interface AlertError {
        error_type: 'success' | 'danger'
        errors: Array<string>
}

export interface BillTo {
        house_number: string
        street: string
        city: string
}

export interface Tag {
        id: number
        companie_id: number
        name: string
        label: string
}

export interface InvoiceItem {
        item_name: string
        item_description: string
        cost: number
        qty: number
        price: number
        discount: Discount
}

export interface CustomInvoiceItem {
        id: number
        invoice_id: number
        item_name: string
        description: string
        cost: number
        qty: number
        price: number
        discount: number
        tax_label1: string
        tax_label2: string
        tax1: number
        tax2: number
}

export interface InvoiceItemDate {
        companie_id: number
        name: string
}

export interface Discount {
        discount: number
        tax_label1: string
        tax_label2: string
        tax1: number
        tax2: number
}

export interface SaveInvoiceResponse {
        code: number
        response: {
                code: number
                response: string
                data: {
                        invoice_id: number
                },
                errors: Array<string>
        }
}

export interface GetConfigResponse {
        code: number
        response: {
                code: number
                config: Config
        }
}

export interface GetInvoiceListResponse {
        code: number
        response: {
                code: number
                invoices: Array<MainInvoiceCollection>
        }
}

export interface GetInvoiceItemResponse {
        code: number
        response: {
                code: number
                response: string
                invoice: MainInvoiceCollectionCustom
        }
}

export interface GetCompanyResponse {
        code: number
        response: {
                code: number
                response: string
                company: CompanieCustom
        }
}

export interface DeleteInvoiceResponse {
        code: number
        response: {
                code: number
                response: string
                errors?: Array<string>
        }
}

export interface GetInvoiceStatusResponse {
        code: number
        response: {
                code: number
                response: string
                status:INVOICE_STATUS
                status_list: Array<INVOICE_STATUS>
        }
}

export interface SetInvoiceStatusResponse {
        code: number
        response: {
                code: number
                response: string
                errors?: Array<string>
        }
}

export interface SetInvoiceCustomerResponse {
        code: number
        response: {
                response: string
                errors?: Array<string>
        }
}

export interface GetInvoiceHistoryResponse {
        code: number
        response: {
                code: number
                response: string
                history: Array<InvoiceHistorie>
        }
}

export interface MyCredentials {
        user: User
        companie_members: Array<User>
}

export interface GetCredentialsAndMe {
        code: number
        response: MyCredentials
}

export interface GetTagsResponse {
        code: number
        response: {
                code: 200 | 421 | 500
                response: string
                tags: Array<Tag>
        }
}

export interface SetTagResponse {
        code: number
        response: {
                code: 200 | 421 | 500
                response: string
                errors?: Array<string>
        }
}

export interface SetInvoiceEmail {
        code: number
        response: {
                code: 200 | 421 | 500
                response: string
                errors: Array<string>
        }
}

export interface GetInvoiceResponse {
        code: number
        response: {
                code: number
                invoice: Invoice
        }
}

export interface AddInvoiceTagResponse {
        code: number
        response: {
                code: number
                response: string
                errors: Array<string>
        }
}

export interface GetCompanieResponse {
        code: 200 | number,
        response: {
                code: 200 | 421 | number,
                response: string,
                companie: Companie
        }
}