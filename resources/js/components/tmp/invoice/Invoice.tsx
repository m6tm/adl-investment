import { isEmpty, isNull } from "lodash"
import React, { Suspense } from "react"
import { createRoot } from "react-dom/client"
import $ from 'jquery'
import { getMyCredentials } from "../API/chat"
import { deleteInvoice, getCompanie, getConfig, getCredentialsAndMe, getInvoiceList, invoiceSendMail } from "../API/pages/invoice"
import { ERROR_STATUS, INVOICE_STATUS } from "../enums/invoice"
import { extractDateFormat, getHook, sleep } from "../functions/tools"
import { User } from "../interfaces/chat"
import { Companie, Config, CustomInvoiceItem, InvoiceState, MainInvoiceCollection, MyCredentials, Preview } from "../interfaces/pages/invoice"
import Loading from "../Loading"
import SafeRaiseError from "../SafeRaiseError"
import AlertError from "./AlertError"
import { generateInvoice } from "../pdf-builders/invoice/invoice"
import { Invoice as InvoiceInterface } from '../interfaces/pages/invoice';


declare global {
        interface Window {
                dataListView: any
                $: any
        }
}

class Invoice extends React.Component {
        props!: { tk: string }
        state: InvoiceState
        close_emeil_modal: React.RefObject<HTMLButtonElement> = React.createRef()
        cancel_btn: React.RefObject<HTMLButtonElement> = React.createRef()
        email_subject: React.RefObject<HTMLInputElement> = React.createRef()
        delete_invoice_password: React.RefObject<HTMLInputElement> = React.createRef()

        constructor(props: Readonly<{}>) {
                super(props)
                this.state = {
                        invoices: [],
                        user: {} as User,
                        config: {
                                origin: location.origin
                        } as Config,
                        loading: true,
                        status: [],
                        credentials: {} as MyCredentials,
                        invoice_email: {
                                invoice_id: 0,
                                from: '',
                                to: '',
                                subject: `Invoice #INV-XXXXXXXX`,
                                attachment: null
                        },
                        companie: {
                                name: ''
                        } as Companie,
                        invoice_displaid: false,
                        error: {
                                error_type: 'danger',
                                errors: []
                        },
                        send_email_pending: false,
                }
        }

        async componentDidMount() {
                let invoice_list = await getInvoiceList(this.props.tk),
                        user_cred = await getMyCredentials(this.props.tk),
                        config = await getConfig(this.props.tk),
                        credentials = await getCredentialsAndMe(this.props.tk),
                        company = await getCompanie(this.props.tk)

                if (invoice_list.code !== 200 || user_cred.code !== 200 || config.code !== 200, company.code !== 200) return

                this.setState({
                        ...this.state, ...{
                                invoices: invoice_list.response.invoices,
                                user: user_cred.response.user,
                                config: config.response.config,
                                companie: company.response.companie,
                                loading: false,
                                status: this.get_status(invoice_list.response.invoices),
                                credentials: credentials.response,
                                invoice_email: {
                                        from: credentials.response.user.email,
                                        to: '',
                                        subject: `Invoice #INV-XXXXXXXX`,
                                        attachment: null
                                }
                        }
                })
                this.filter_table()
        }

        get_status = (invoices: Array<MainInvoiceCollection>) => {
                let status = new Set()
                invoices.forEach(invoice => status.add(invoice.invoice.status.toLowerCase()))
                return Array.from(status)
        }

        componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
                if (!this.state.invoice_displaid) this.initializeDataTable()
        }

        getPreview = (invoices: Array<CustomInvoiceItem>) => {
                let preview: Preview = {
                        subtotal: 0,
                        discount: 0,
                        tax: 0,
                        invoice_total: 0,
                        paid_to_date: 0,
                        current_balance: 0,
                        balance: 0,
                }

                preview.subtotal = invoices.reduce((accum, item) => accum + (item.cost * item.qty), 0)
                preview.discount = invoices.reduce((accum, item) => accum + ((item.discount / 100) * item.price), 0)
                preview.tax = invoices.reduce((accum, item) => accum + ((item.price - ((item.discount / 100) * item.price)) * ((item.tax1 / 100) + (item.tax2 / 100))), 0)
                preview.invoice_total = preview.subtotal - preview.discount + preview.tax
                preview.current_balance = parseFloat((preview.invoice_total - preview.paid_to_date).toFixed(2))
                preview.balance = parseFloat((preview.invoice_total).toFixed(2))

                return preview
        }

        initializeDataTable = async () => {
                this.state.invoices.forEach((item, key) => {
                        window.dataListView.row.add([
                                key,
                                item.invoice.id,
                                `<a href="${this.state.config.origin}/user/invoice/${item.invoice.id}">${item.invoice.code_invoice}</a>`,
                                `<span class="invoice-amount">$${(this.getPreview(item.items).current_balance - item.invoice.total_pay_to_date).toFixed(2)}</span>`,
                                `<small class="text-muted">${extractDateFormat(item.invoice.created_at)}</small>`,
                                item.invoice.customer ? `${item.invoice.customer.last_name} ${item.invoice.customer.last_name}` : 'Not customer',
                                `
                                <ul class="list-unstyled m-0 p-0">
                                ${item.tags.map(tag =>
                                        `
                                                <li>
                                                        <span class="bullet bullet-sm" style="background-color: ${tag.label};"></span>
                                                        <small class="text-muted text-capitalize">${tag.name}</small>
                                                </li>`
                                ).join('')
                                }
                                </ul>
                                `
                                ,
                                `<span class="badge badge-light-${this.display_status_flag(item.invoice.status)} badge-pill">${item.invoice.status.replace('_', ' ')}</span>`,
                                `
                                        <div class="invoice-action">
                                                <a href="${this.state.config.origin}/user/invoice/${item.invoice.id}" class="invoice-action-view mr-1">
                                                        <i class="bx bx-show-alt"></i>
                                                </a>
                                                <a href="${this.state.config.origin}/user/invoice/${item.invoice.id}/edit" class="invoice-action-edit cursor-pointer">
                                                        <i class="bx bx-edit"></i>
                                                </a>
                                        </div>
                                `
                        ]).draw()
                })

                this.setState({ ...this.state, ...{ invoice_displaid: true } })
                this.on_table_options_event()
        }

        filter_table = () => {
                window.$.fn.dataTable.ext.search.push(
                        function (settings: any, data: any, dataIndex: any) {
                                var status: string = data[7]; // use the column 7 for status

                                if (status.toLowerCase().match(/^(paid|credit|pending payment|partial paid)$/)) {
                                        return true;
                                }

                                return false;
                        }
                );

                $('#status-filter').on('click', 'button', (e) => {
                        let status: string = $(e.target).data('status');

                        $('#status-filter button').removeClass('active')
                        $(e.target).addClass('active')

                        if (status in INVOICE_STATUS) {
                                window.dataListView.columns(7).search(status.toUpperCase().replace('_', ' ')).draw()
                        } else {
                                window.dataListView.columns(7).search('').draw()
                        }
                })
        }

        on_table_options_event = () => {
                $(`button[data-action="option-edit"]`).on('click', () => {
                        let inputs = $('#invoice-data-table input').map((key, input: any) => ({ checked: input.checked, index: key })).filter((key, input) => key > 0 && input.checked).map((key, input) => input.index - 1)

                        if (inputs.length > 0) location.href = `${this.state.config.origin}/user/invoice/${window.dataListView.row(inputs.get().at(0)).data().at(1)}/edit`
                })

                $(`button[data-action="option-view"]`).on('click', () => {
                        let inputs = $('#invoice-data-table input').map((key, input: any) => ({ checked: input.checked, index: key })).filter((key, input) => key > 0 && input.checked).map((key, input) => input.index - 1)

                        if (inputs.length > 0) location.href = `${this.state.config.origin}/user/invoice/${window.dataListView.row(inputs.get().at(0)).data().at(1)}`
                })
        }

        deleteInvoice = () => {
                let inputs = $('#invoice-data-table input').map((key, input: any) => ({ checked: input.checked, index: key })).filter((key, input) => key > 0 && input.checked).map((key, input) => input.index - 1)

                inputs.get().reverse().forEach(async key => {
                        if (!this.delete_invoice_password.current) return
                        let password = this.delete_invoice_password.current.value

                        let response = await deleteInvoice(this.props.tk, window.dataListView.row(key).data().at(1), password)
                        this.delete_invoice_password.current.value = ""
                        if (response.code == 200) {
                                window.dataListView.row(key).remove().draw()
                        } else {
                                this.buildError(ERROR_STATUS.DANGER, response.response.errors ?? ['An error occurred to the server side.'])
                        }
                })
        }

        deleteInvoiceById = async (invoice_id: number) => {
                if (!this.delete_invoice_password.current) return
                let password = this.delete_invoice_password.current.value,
                        response = await deleteInvoice(this.props.tk, invoice_id, password)

                this.delete_invoice_password.current.value = ""
                if (response.code == 200 && response.response.code == 200) {
                        this.buildError(ERROR_STATUS.SUCCESS, ['Successfully deleted'])
                        await sleep(1500)
                        location.href = `${this.state.config.origin}/user/invoice`
                        return
                }
                this.buildError(ERROR_STATUS.DANGER, response.response.errors || ['Server Error, please report this error if persisting'])
        }

        display_status_flag = (status: INVOICE_STATUS) => {
                switch (status) {
                        case INVOICE_STATUS.PAID:
                                return 'success'

                        case INVOICE_STATUS.CREDIT:
                                return 'info'

                        case INVOICE_STATUS.PENDING_PAYMENT:
                                return 'danger'

                        case INVOICE_STATUS.PARTIAL_PAID:
                                return 'warning'

                        default:
                                return 'danger'
                }
        }

        setEmailTo = (email: string) => {
                if (email.length == 0) return
                this.setState({
                        ...this.state,
                        ...{
                                invoice_email: {
                                        ...this.state.invoice_email, ...{
                                                to: email
                                        }
                                }
                        }
                })
        }

        sendInvoice = async (e: any) => {
                let inputs = $('#invoice-data-table input').map((key, input: any) => ({ checked: input.checked, index: key })).filter((key, input) => key > 0 && input.checked).map((key, input) => input.index - 1),
                        code_invoices = this.state.invoices.filter(invoice => invoice.invoice.id == window.dataListView.row(inputs.get().at(0)).data().at(1)).map(invoice => ({ code_invoice: invoice.invoice.code_invoice, invoice_id: invoice.invoice.id }))
                if (inputs.length == 0) {
                        await sleep(1000)
                        this.close_emeil_modal.current!.click()
                        this.cancelMail()
                        this.buildError(ERROR_STATUS.DANGER, ['Not invoice selected'])
                        return
                }

                code_invoices.forEach(code => {
                        const customInvoice = this.state.invoices.find(invoice => invoice.invoice.id === code.invoice_id)!,
                                invoice: InvoiceInterface = {
                                        ...customInvoice.invoice as any,
                                        items: customInvoice.items,
                                        invoice_code: code.code_invoice,
                                        adress: {
                                                house_number: customInvoice.invoice.bill_to_name,
                                                street: customInvoice.invoice.bill_to_descrip,
                                                city: customInvoice.invoice.bill_to_city
                                        },
                                        tags: customInvoice.tags
                                },
                                file = generateInvoice(invoice, this.getPreview(customInvoice.items), this.state.companie, 'export')

                        this.setState({
                                ...this.state,
                                ...{
                                        invoice_email: {
                                                ...this.state.invoice_email,
                                                ...{
                                                        attachment: file,
                                                        subject: `Invoice #${code.code_invoice}`,
                                                }
                                        }
                                }
                        })
                })
                return

                let file_input = document.createElement('input')
                file_input.setAttribute('type', 'file')
                file_input.setAttribute('accept', '.pdf')

                file_input.addEventListener('change', e => {
                        if (isEmpty(file_input.files)) return

                        let file = file_input.files![0]

                        if (file.type !== 'application/pdf' || code_invoices.length == 0) return
                        this.setState({
                                ...this.state,
                                ...{
                                        invoice_email: {
                                                ...this.state.invoice_email,
                                                ...{
                                                        attachment: file,
                                                        subject: `Invoice #${code_invoices.at(0)!.code_invoice}`,
                                                }
                                        }
                                }
                        })
                }, false)
                file_input.click()
        }

        sendMail = async () => {
                let inputs = $('#invoice-data-table input').map((key, input: any) => ({ checked: input.checked, index: key })).filter((key, input) => key > 0 && input.checked).map((key, input) => input.index - 1)
                if (inputs.length == 0) {
                        await sleep(1000)
                        this.close_emeil_modal.current!.click()
                        this.cancelMail()
                        this.buildError(ERROR_STATUS.DANGER, ['Not invoice selected'])
                        return
                }

                let invoice_id: number | null = inputs.length > 0 ? window.dataListView.row(inputs.get().at(0)).data().at(1) : null
                if (isNull(invoice_id)) {
                        await sleep(1000)
                        this.close_emeil_modal.current!.click()
                        this.cancelMail()
                        this.buildError(ERROR_STATUS.DANGER, ['Not invoice selected'])
                        return
                }

                if (
                        isNull(this.state.invoice_email.attachment) ||
                        this.state.invoice_email.to.length == 0
                ) {
                        this.buildError(ERROR_STATUS.DANGER, ['The "to" field is required'])
                        return
                }
                this.buildError(ERROR_STATUS.SUCCESS, [])
                await sleep(1000)
                this.setState({ ...this.state, ...{ send_email_pending: true } })

                let response = await invoiceSendMail(this.props.tk, {
                        to: this.state.invoice_email.to,
                        subject: this.state.invoice_email.subject,
                        attachment: this.state.invoice_email.attachment,
                        invoice_id
                })

                if (response.code == 421) {
                        this.buildError(ERROR_STATUS.DANGER, response.response.errors)
                        await sleep(1000)
                        this.setState({ ...this.state, ...{ send_email_pending: false } })
                        return
                }

                if (response.code == 200) {
                        this.buildError(ERROR_STATUS.SUCCESS, ['Successfuly saved !!!'])
                        await sleep(1000)
                        this.setState({ ...this.state, ...{ send_email_pending: false } })
                        await sleep(1000 * 2)
                        this.cancelMail()
                        this.cancel_btn.current!.click()
                }
        }

        cancelMail = () => {
                this.setState({
                        ...this.state,
                        ...{
                                invoice_email: {
                                        ...this.state.invoice_email,
                                        ...{
                                                invoice_id: 0,
                                                from: '',
                                                to: '',
                                                subject: `Invoice #INV-XXXXXXXX`,
                                                attachment: null
                                        }
                                }
                        }
                })
        }

        closeAlert = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                e.preventDefault()
                this.buildError(ERROR_STATUS.SUCCESS, [])
        }

        buildError = (status: 'success' | 'danger', errors: Array<string> = []) => this.setState({ ...this.state, ...{ error: { ...this.state.error, ...{ errors, error_type: status } } } })

        render(): React.ReactNode {

                return <SafeRaiseError>
                        <Suspense fallback={<Loading />}>
                                <div className="invoice-create-btn mb-1 position-relative">
                                        <AlertError {...{
                                                error: this.state.error,
                                                closeAlert: this.closeAlert
                                        }} />
                                        <a href={`${this.state.config.origin}/user/invoice/create`} className="btn btn-primary glow invoice-create" role="button" aria-pressed="true">Create
                                                Invoice</a>
                                </div>
                                <div className="action-dropdown-btn d-none">
                                        <div className="dropdown invoice-filter-action">
                                                <button className="btn border dropdown-toggle mr-1" type="button" id="invoice-filter-btn" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false">
                                                        Filter Invoice
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-right" id="status-filter" aria-labelledby="invoice-filter-btn">
                                                        <button className="dropdown-item active" data-status="all">All</button>
                                                        {
                                                                this.state.status.map((status, key) => (
                                                                        <button key={key} className="dropdown-item border-0 text-upper" data-status={status}>{status.replace('_', ' ')}</button>
                                                                ))
                                                        }
                                                </div>
                                        </div>
                                        <div className="dropdown invoice-options">
                                                <button className="btn border dropdown-toggle mr-2" type="button" id="invoice-options-btn" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false">
                                                        Options
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="invoice-options-btn">
                                                        <button
                                                                className="dropdown-item border-0"
                                                                data-action="option-delete"
                                                                data-toggle="modal"
                                                                data-target={"#tagSelectorModalDelete"}>Delete</button>
                                                        <button className="dropdown-item border-0" data-action="option-edit">Edit</button>
                                                        <button className="dropdown-item border-0" data-action="option-view">View</button>
                                                        <button className="dropdown-item border-0" data-action="option-send" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.sendInvoice}>Send</button>
                                                </div>

                                                {/* Send Email Modal - Start */}
                                                <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                                                <div className="modal-content">
                                                                        <div className="modal-header">
                                                                                <h5 className="modal-title" id="exampleModalLongTitle">Invoice Mail</h5>
                                                                                <button type="button" className="close text-danger" data-dismiss="modal" aria-label="Close" ref={this.close_emeil_modal}>
                                                                                        <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                                <form action="" className="container" onSubmit={e => e.preventDefault()}>
                                                                                        <div className=" form-row mb-2">
                                                                                                <label htmlFor="m-from" className="text-muted">Subjet:</label>
                                                                                                <input type="email" id="m-from" disabled className="form-control form-control-sm shadow-none disabled" value={this.state.credentials.user ? this.state.credentials.user.email : ''} onChange={() => { }} />
                                                                                        </div>

                                                                                        <div className=" form-row mb-2">
                                                                                                <label htmlFor="m-to" className="text-muted">To:</label>
                                                                                                <input type="email" id="m-to" list="member-list" value={this.state.invoice_email.to} onChange={e => this.setEmailTo(e.target.value)} className="form-control form-control-sm shadow-none" />
                                                                                                <datalist id="member-list">
                                                                                                        {
                                                                                                                this.state.credentials.companie_members ? Object.values(this.state.credentials.companie_members).map((user, key) => (
                                                                                                                        <option key={key} value={user.email}>{`${user.last_name} ${user.first_name}`}</option>
                                                                                                                )) : null
                                                                                                        }
                                                                                                </datalist>
                                                                                        </div>

                                                                                        <div className=" form-row mb-2">
                                                                                                <label htmlFor="m-subject" className="text-muted">Subjet:</label>
                                                                                                <input type="email" id="m-subject" className="form-control form-control-sm shadow-none" value={this.state.invoice_email.subject} ref={this.email_subject} onChange={() => { }} />
                                                                                        </div>

                                                                                        {
                                                                                                this.state.invoice_email.attachment ?
                                                                                                        <div className="mb-2">
                                                                                                                <label htmlFor="m-subject" className="text-muted d-block">Attachment:</label>
                                                                                                                <a
                                                                                                                        href={URL.createObjectURL(this.state.invoice_email.attachment)}
                                                                                                                        className="text-primary"
                                                                                                                        download={this.state.invoice_email.attachment.name}>
                                                                                                                        <i className="bx bx-link"></i>&nbsp;
                                                                                                                        {this.state.invoice_email.attachment.name}
                                                                                                                </a>
                                                                                                        </div> : null
                                                                                        }
                                                                                </form>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                                <button type="button" className="btn btn-light-danger" data-dismiss="modal" ref={this.cancel_btn}>Cancel</button>
                                                                                <button type="button" className="btn btn-light-success" onClick={this.sendMail}>
                                                                                        {
                                                                                                this.state.send_email_pending ? (
                                                                                                        <div className="spinner-border text-secondary" style={{ width: '20px', height: '20px' }} role="status">
                                                                                                                <span className="sr-only">Loading...</span>
                                                                                                        </div>
                                                                                                ) :
                                                                                                        <>
                                                                                                                Send <i className="bx bx-send"></i>
                                                                                                        </>
                                                                                        }
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                                {/* Send Email Modal - End */}
                                                {/* Delete invoice BEGIN */}
                                                <div className="modal fade" id="tagSelectorModalDelete" tabIndex={-1} role="dialog" aria-labelledby="tagSelectorModalDeleteTitle" aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                                                <div className="modal-content">
                                                                        <div className="modal-header">
                                                                                <h5 className="modal-title" id="exampleModalLongTitle">Delete invoice</h5>
                                                                                <button type="button" className="close text-danger" data-dismiss="modal" aria-label="Close">
                                                                                        <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                                <form action="" className="container" onSubmit={e => e.preventDefault()}>
                                                                                        <p className="text-danger">
                                                                                                Warning ! This action is irreversible.
                                                                                        </p>
                                                                                        <div className=" form-row mb-2">
                                                                                                <input type="password" placeholder="Type your password to confirm" className="form-control form-control-sm shadow-none" ref={this.delete_invoice_password} />
                                                                                        </div>
                                                                                </form>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                                <button
                                                                                        type="button"
                                                                                        className={`btn btn-light-danger`}
                                                                                        onClick={() => this.deleteInvoice()}
                                                                                        data-dismiss="modal">
                                                                                        Delete
                                                                                </button>
                                                                                <button
                                                                                        type="button"
                                                                                        className={`btn btn-light-primary`}
                                                                                        data-dismiss="modal">
                                                                                        Cancel
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                                {/* Delete invoice END */}
                                        </div>
                                </div>
                                <div className="table-responsive">
                                        <table className="table invoice-data-table dt-responsive nowrap w-100" id="invoice-data-table">
                                                <thead>
                                                        <tr>
                                                                <th></th>
                                                                <th></th>
                                                                <th>
                                                                        <span className="align-middle">Invoice#</span>
                                                                </th>
                                                                <th>Amount</th>
                                                                <th>Date</th>
                                                                <th>Customer</th>
                                                                <th>Tags</th>
                                                                <th>Status</th>
                                                                <th>Action</th>
                                                        </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                        </table>
                                </div>
                        </Suspense>
                </SafeRaiseError>
        }
}

let tk = getHook()

if (!isNull(tk) && document.getElementById('invoice-list-page')!) createRoot(document.getElementById('invoice-list-page')!).render(<Invoice {...{ tk }} />)