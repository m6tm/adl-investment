import { isEmpty, isNull } from 'lodash'
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { getMyCredentials } from '../API/chat'
import { deleteInvoice, getCompanie, getConfig, getCredentialsAndMe, getInvoiceItem, getTags, invoiceSendMail } from '../API/pages/invoice'
import { ERROR_STATUS, TAG_VIEW_MODE } from '../enums/invoice'
import { getHook, sleep } from '../functions/tools'
import { User } from '../interfaces/chat'
import { CompanieCustom, Config, DisplayInvoiceState, MainInvoiceCollectionCustom, MyCredentials, Preview } from '../interfaces/pages/invoice'
import Loading from '../Loading'
import SafeRaiseError from '../SafeRaiseError'
import AlertError from './AlertError'
import InvoiceHistory from './InvoiceHistory'
import InvoiceStatus from './InvoiceStatus'
import { TagComponent } from './TagComponent'



class DisplayInvoice extends React.Component {

        props!: Readonly<{ tk: string, id: number }>
        state: Readonly<DisplayInvoiceState>;
        close_emeil_modal: React.RefObject<HTMLButtonElement> = React.createRef()
        invoice: React.RefObject<HTMLDivElement> = React.createRef()
        delete_invoice_password: React.RefObject<HTMLInputElement> = React.createRef()

        constructor(props: Readonly<{}>) {
                super(props)
                this.state = {
                        invoice: {} as MainInvoiceCollectionCustom,
                        config: {} as Config,
                        company: {} as CompanieCustom,
                        user: {} as User,
                        preview: {
                                subtotal: 0,
                                discount: 0,
                                tax: 0,
                                invoice_total: 0,
                                paid_to_date: 0,
                                current_balance: 0,
                                balance: 0,
                        },
                        invoice_email: {
                                invoice_id: 0,
                                from: '',
                                to: '',
                                subject: `Invoice #`,
                                attachment: null
                        },
                        error: {
                                error_type: 'danger',
                                errors: []
                        },
                        credentials: {} as MyCredentials,
                        loading: true,
                        tags: [],
                        send_email_pending: false
                }
        }

        async componentDidMount() {
                let invoice = await getInvoiceItem(this.props.tk, this.props.id),
                        config = await getConfig(this.props.tk),
                        company = await getCompanie(this.props.tk),
                        user = await getMyCredentials(this.props.tk),
                        my_credentials = await getCredentialsAndMe(this.props.tk),
                        tags = await getTags(this.props.tk)

                if (invoice.code !== 200 || config.code !== 200 || user.code !== 200 || company.code !== 200 || tags.code !== 200) return

                this.setState({
                        ...this.state,
                        ...{
                                invoice: invoice.response.invoice,
                                config: config.response.config,
                                user: user.response.user,
                                company: company.response.companie,
                                invoice_email: {
                                        ...this.state.invoice_email, ...{
                                                from: user.response.user!.email,
                                                subject: `Invoice #${invoice.response.invoice.invoice.code_invoice}`,
                                                invoice_id: this.props.id
                                        }
                                },
                                credentials: my_credentials.response,
                                loading: false,
                                tags: invoice.response.invoice.tags
                        }
                })
                await sleep(1000 * 2)
                this.preview()
        }

        preview = () => {
                if (this.state.loading) return
                let preview: Preview = this.state.preview

                preview.subtotal = this.state.invoice.items.reduce((accum, item) => accum + (item.cost * item.qty), 0)
                preview.discount = this.state.invoice.items.reduce((accum, item) => accum + ((item.discount / 100) * item.price), 0)
                preview.tax = this.state.invoice.items.reduce((accum, item) => accum + ((item.price - ((item.discount / 100) * item.price)) * ((item.tax1 / 100) + (item.tax2 / 100))), 0)
                preview.invoice_total = preview.subtotal - preview.discount + preview.tax
                preview.current_balance = preview.invoice_total - preview.paid_to_date
                preview.balance = preview.invoice_total
                preview.paid_to_date = this.state.invoice.invoice.total_pay_to_date

                this.setState({ ...this.state, ...{ preview } })
                return null
        }

        sendInvoice = async () => {
                let file_input = document.createElement('input')
                file_input.setAttribute('type', 'file')
                file_input.setAttribute('accept', '.pdf')

                file_input.addEventListener('change', e => {
                        if (isEmpty(file_input.files)) return

                        let file = file_input.files![0]
                        if (file.type !== 'application/pdf') return
                        this.setState({
                                ...this.state,
                                ...{
                                        invoice_email: {
                                                ...this.state.invoice_email,
                                                ...{
                                                        attachment: file
                                                }
                                        }
                                }
                        })
                }, false)
                file_input.click()
        }

        sendMail = async () => {
                if (
                        isNull(this.state.invoice_email.attachment) ||
                        this.state.invoice_email.to.length == 0
                ) {
                        this.buildError(ERROR_STATUS.DANGER, ['The "to" field is required'])
                        return
                }
                this.buildError(ERROR_STATUS.SUCCESS, [])
                this.setState({ ...this.state, ...{ send_email_pending: true } })

                let response = await invoiceSendMail(this.props.tk, {
                        to: this.state.invoice_email.to,
                        subject: this.state.invoice_email.subject,
                        attachment: this.state.invoice_email.attachment,
                        invoice_id: this.state.invoice_email.invoice_id
                })

                if (response.code == 421) {
                        this.buildError(ERROR_STATUS.DANGER, response.response.errors)
                }

                if (response.code == 200) {
                        this.buildError(ERROR_STATUS.SUCCESS, ['Successfuly saved !!!'])
                        await sleep(1000 * 2)
                        this.cancelMail()
                        this.close_emeil_modal.current!.click()
                }
                await sleep(1000)
                this.setState({ ...this.state, ...{ send_email_pending: false } })
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
                                                subject: `Invoice #${this.state.invoice.invoice.code_invoice}`,
                                                attachment: null
                                        }
                                }
                        }
                })
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

        closeAlert = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                e.preventDefault()
                this.buildError(ERROR_STATUS.SUCCESS, [])
        }

        print = async () => {
                let print_window = window.open('', '', 'width=700,height=800'),
                        invoice_copy = this.invoice.current!.cloneNode(true) as HTMLDivElement
                invoice_copy.firstElementChild!.classList.add('vh-100')

                print_window!.document.write(`
                        <html>
                                <head>
                                        ${document.head.innerHTML}
                                </head>
                                <body>
                                        ${invoice_copy.innerHTML}
                                </body>
                        </html>
                `)

                await sleep(1000 * 5)
                print_window!.focus()
                print_window!.print()
                'close' in print_window!.document ? print_window!.document.close() : print_window!.close()
        }

        updateTags = async () => {
                let tags = await getTags(this.props.tk)

                if (tags.code !== 200) return
                this.setState({
                        ...this.state, ...{
                                tags: tags.response.tags
                        }
                })
        }

        deleteInvoice = async (invoice_id: number) => {
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

        buildError = (status: ERROR_STATUS, errors: Array<string> = []) => this.setState({ ...this.state, ...{ error: { ...this.state.error, ...{ errors, error_type: status } } } })

        render(): React.ReactNode {
                return <SafeRaiseError>
                        <Suspense fallback={<Loading />}>
                                {
                                        this.state.loading ? <Loading /> :
                                                <div className="row">
                                                        <AlertError {...{
                                                                error: this.state.error,
                                                                closeAlert: this.closeAlert
                                                        }} />
                                                        <div className="col-xl-9 col-md-8 col-12" ref={this.invoice}>
                                                                <div className="card invoice-print-area">
                                                                        <div className="card-content">
                                                                                <div className="card-body pb-0 mx-25">
                                                                                        <div className="row">
                                                                                                <div className="col-xl-4 col-md-12">
                                                                                                        <span className="invoice-number mr-50">Invoice#</span>
                                                                                                        <span> {this.state.invoice.invoice.code_invoice} </span>
                                                                                                </div>
                                                                                                <div className="col-xl-8 col-md-12">
                                                                                                        <div className="d-flex align-items-center justify-content-xl-end flex-wrap">
                                                                                                                <div className="mr-3">
                                                                                                                        <small className="text-muted">Date Issue:</small>
                                                                                                                        <span> {this.state.invoice.invoice.date_issue} </span>
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                        <small className="text-muted">Date Due:</small>
                                                                                                                        <span> {this.state.invoice.invoice.date_due} </span>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="row my-3">
                                                                                                <div className="col-6">
                                                                                                        <h4 className="text-primary">Invoice</h4>
                                                                                                        <span className='text-capitalize'> {this.state.invoice.invoice.invoice_name} </span>
                                                                                                </div>
                                                                                                <div className="col-6 d-flex justify-content-end">
                                                                                                        <h3 className="brand-text mb-0 text-uppercase">
                                                                                                                {this.state.company.name}
                                                                                                        </h3>
                                                                                                </div>
                                                                                        </div>
                                                                                        <hr />
                                                                                        <div className="row invoice-info">
                                                                                                <div className="col-6 mt-1">
                                                                                                        <h6 className="invoice-to">Bill To</h6>
                                                                                                        <div className="mb-1">
                                                                                                                <span> {this.state.invoice.invoice.bill_to_name} </span>
                                                                                                        </div>
                                                                                                        <div className="mb-1">
                                                                                                                <span> {this.state.invoice.invoice.bill_to_descrip} </span>
                                                                                                        </div>
                                                                                                        <div className="mb-1">
                                                                                                                <span> {this.state.invoice.invoice.bill_to_city} </span>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                        <hr />
                                                                                </div>
                                                                                <div className="invoice-product-details table-responsive mx-md-25">
                                                                                        <table className="table table-borderless mb-0">
                                                                                                <thead>
                                                                                                        <tr className="border-0">
                                                                                                                <th scope="col">Item</th>
                                                                                                                <th scope="col">Description</th>
                                                                                                                <th scope="col">Cost</th>
                                                                                                                <th scope="col">Qty</th>
                                                                                                                <th scope="col" className="text-right">Price</th>
                                                                                                        </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                        {
                                                                                                                this.state.invoice.items.map((item, key) => (
                                                                                                                        <tr key={key}>
                                                                                                                                <td>{item.item_name}</td>
                                                                                                                                <td>{item.description}</td>
                                                                                                                                <td>{item.cost}</td>
                                                                                                                                <td>{item.qty}</td>
                                                                                                                                <td className="text-primary text-right font-weight-bold">${item.price}</td>
                                                                                                                        </tr>
                                                                                                                ))
                                                                                                        }
                                                                                                </tbody>
                                                                                        </table>
                                                                                </div>

                                                                                <div className="card-body pt-0 mx-25">
                                                                                        <hr />
                                                                                        <div className="row">
                                                                                                <div className="col-4 col-sm-6 mt-75">
                                                                                                        <p>Thanks for your business.</p>
                                                                                                </div>
                                                                                                <div className="col-8 col-sm-6 d-flex justify-content-end mt-75">
                                                                                                        <div className="invoice-subtotal">
                                                                                                                <div className="invoice-calc d-flex justify-content-between">
                                                                                                                        <span className="invoice-title">Subtotal</span>
                                                                                                                        <span className="invoice-value">${this.state.preview.subtotal.toFixed(2)}</span>
                                                                                                                </div>
                                                                                                                <div className="invoice-calc d-flex justify-content-between">
                                                                                                                        <span className="invoice-title">Discount</span>
                                                                                                                        <span className="invoice-value">- ${this.state.preview.discount.toFixed(2)}</span>
                                                                                                                </div>
                                                                                                                <div className="invoice-calc d-flex justify-content-between">
                                                                                                                        <span className="invoice-title">Tax</span>
                                                                                                                        <span className="invoice-value">{this.state.preview.tax.toFixed(2)}%</span>
                                                                                                                </div>
                                                                                                                <hr />
                                                                                                                <div className="invoice-calc d-flex justify-content-between">
                                                                                                                        <span className="invoice-title">Invoice Total</span>
                                                                                                                        <span className="invoice-value">${this.state.preview.invoice_total.toFixed(2)}</span>
                                                                                                                </div>
                                                                                                                <div className="invoice-calc d-flex justify-content-between">
                                                                                                                        <span className="invoice-title">Paid to date</span>
                                                                                                                        <span className="invoice-value">- ${this.state.preview.paid_to_date.toFixed(2)}</span>
                                                                                                                </div>
                                                                                                                <div className="invoice-calc d-flex justify-content-between">
                                                                                                                        <span className="invoice-title">Balance (USD)</span>
                                                                                                                        <span className="invoice-value">${this.state.preview.current_balance.toFixed(2)}</span>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div className="col-xl-3 col-md-4 col-12">
                                                                <div className="card invoice-action-wrapper shadow-none border">
                                                                        <div className="card-body" style={{
                                                                                padding: '1rem'
                                                                        }}>
                                                                                <div className="invoice-action-btn mb-1">
                                                                                        <button type="button" className="btn btn-primary btn-block invoice-send-btn" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.sendInvoice}>
                                                                                                <i className="bx bx-send"></i>
                                                                                                <span>Send Invoice</span>
                                                                                        </button>

                                                                                        {/* Modal - Start */}
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
                                                                                                                                        <input type="email" id="m-from" disabled className="form-control form-control-sm shadow-none disabled" value={this.state.user ? this.state.user.email : ''} onChange={() => { }} />
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
                                                                                                                                        <input type="email" id="m-subject" className="form-control form-control-sm shadow-none" value={`Invoice #${this.state.invoice.invoice.code_invoice}`} onChange={() => { }} />
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
                                                                                                                        <button type="button" className="btn btn-light-danger" data-dismiss="modal">Cancel</button>
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
                                                                                        {/* Modal - End */}
                                                                                </div>
                                                                                <div className="invoice-action-btn">
                                                                                        <button className="btn btn-light-primary btn-block invoice-print" onClick={this.print}>
                                                                                                <span>Print</span>
                                                                                        </button>
                                                                                </div>
                                                                                <div className="invoice-action-btn">
                                                                                        <a href={`${this.state.config.origin}/user/invoice/${this.state.invoice.invoice.id}/edit`} className="btn btn-light-primary btn-block">
                                                                                                <span>Edit Invoice</span>
                                                                                        </a>
                                                                                </div>
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
                                                                                                                        onClick={() => this.deleteInvoice(this.props.id)}
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
                                                                                <div className="invoice-action-btn">
                                                                                        <a
                                                                                                href=""
                                                                                                onClick={e => { e.preventDefault() }}
                                                                                                data-toggle="modal"
                                                                                                data-target={"#tagSelectorModalDelete"}
                                                                                                className="btn btn-light-danger btn-block">
                                                                                                <span>Delete Invoice</span>
                                                                                        </a>
                                                                                </div>
                                                                                {/* Delete invoice END */}
                                                                                <InvoiceStatus {...{
                                                                                        invoice_id: this.props.id,
                                                                                        tk: this.props.tk,
                                                                                        mode: TAG_VIEW_MODE.READ,
                                                                                        buildError: this.buildError
                                                                                }} />
                                                                                <TagComponent {...{
                                                                                        tags: this.state.tags,
                                                                                        tk: this.props.tk,
                                                                                        update_tag: this.updateTags,
                                                                                        buildError: this.buildError,
                                                                                        display_mode: TAG_VIEW_MODE.READ
                                                                                }} />
                                                                                <InvoiceHistory {...{
                                                                                        invoice_id: this.props.id,
                                                                                        tk: this.props.tk,
                                                                                }} />
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                }
                        </Suspense>
                </SafeRaiseError>
        }
}


let tk = getHook(),
        invoice_id = location.href.match(/[\d]{1,}$/),
        dom = document.getElementById('display-invoice-component')

if (!isNull(tk) && !isNull(dom) && !isNull(invoice_id)) {
        let id = parseInt(invoice_id.at(0)!)
        createRoot(dom).render(<DisplayInvoice {...{ tk, id: parseInt(invoice_id.at(0)!) }} />)
}