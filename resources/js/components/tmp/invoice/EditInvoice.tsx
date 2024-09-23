import { isEmpty, isNull, isNumber, isUndefined } from "lodash"
import React, { Suspense } from "react"
import { createRoot } from "react-dom/client"
import html2canvas from 'html2canvas'
import { deleteInvoice, editInvoice, getCompanie, getConfig, getCredentialsAndMe, getInvoice, getTags, invoiceSendMail, ping, setInvoiceHistory } from "../API/pages/invoice"
import { getHook, sleep } from "../functions/tools"
import { Companie, Config, EditInvoiceStateInterface, Invoice, MyCredentials, Preview } from "../interfaces/pages/invoice"
import Loading from "../Loading"
import SafeRaiseError from "../SafeRaiseError"
import AlertError from "./AlertError"
import InvoiceDatePicker from "./InvoiceDatePicker"
import { jsPDF } from 'jspdf'
import { TagComponent } from "./TagComponent"
import { ERROR_STATUS, INVOICE_HISTORY_TYPE, TAG_VIEW_MODE } from "../enums/invoice"
import InvoiceHistory from "./InvoiceHistory"
import InvoiceStatus from "./InvoiceStatus"
import { generateInvoice } from "../pdf-builders/invoice/invoice"
import moment from "moment"


class EditInvoice extends React.Component {

        state!: EditInvoiceStateInterface
        props!: Readonly<{ tk: string, id: number }>
        issue_date: React.RefObject<HTMLInputElement> = React.createRef()
        due_date: React.RefObject<HTMLInputElement> = React.createRef()
        preview_inner: React.RefObject<HTMLDivElement> = React.createRef()
        close_email_modal: React.RefObject<HTMLButtonElement> = React.createRef()
        delete_invoice_password: React.RefObject<HTMLInputElement> = React.createRef()


        constructor(props: Readonly<{}>) {
                super(props)
                this.state = {
                        invoice_code: '',
                        invoice_name: '',
                        adress: {
                                house_number: '',
                                street: '',
                                city: '',
                        },
                        items: [],
                        error: {
                                error_type: 'danger',
                                errors: []
                        },
                        config: {} as Config,
                        companie: {
                                name: ''
                        } as Companie,
                        preview: {
                                subtotal: 0,
                                discount: 0,
                                tax: 0,
                                invoice_total: 0,
                                paid_to_date: 0,
                                current_balance: 0,
                                balance: 0
                        },
                        selected_tags: [],
                        credentials: {} as MyCredentials,
                        invoice_email: {
                                invoice_id: 0,
                                from: '',
                                to: '',
                                subject: `Invoice #`,
                                attachment: null
                        },
                        loading: true,
                        invoice_tags: [],
                        invoice: {} as Invoice,
                        send_email_pending: false,
                }
        }

        componentDidMount() {
                this.setInvoiceState()
        }

        setInvoiceState = async () => {
                if (! await this.ping()) return
                let config_response = await getConfig(this.props.tk),
                        companie = await getCompanie(this.props.tk),
                        invoice = await getInvoice(this.props.tk, this.props.id),
                        credentials = await getCredentialsAndMe(this.props.tk),
                        tags = await getTags(this.props.tk)

                if (config_response.code !== 200 || invoice.code !== 200 || credentials.code !== 200 || tags.code !== 200 || companie.code !== 200) return

                let _invoice = invoice.response.invoice
                _invoice.total_pay_to_date = isNumber(_invoice.total_pay_to_date) ? _invoice.total_pay_to_date : parseFloat(_invoice.total_pay_to_date)

                const newState = {
                        ...this.state,
                        ...{
                                companie: companie.response.companie,
                                config: config_response.response.config,
                                credentials: credentials.response,
                                invoice_email: {
                                        from: credentials.response.user.email,
                                        to: '',
                                        subject: `Invoice #${invoice.response.invoice.invoice_code}`,
                                        invoice_id: this.props.id,
                                        attachment: null
                                },
                                loading: false,
                                selected_tags: invoice.response.invoice.tags.map(tag => tag.id),
                                invoice_tags: tags.response.tags,
                                invoice: invoice.response.invoice,
                        },
                        ...invoice.response.invoice,
                        ...{
                                invoice: _invoice,
                        }
                }
                this.setState(newState)
                await sleep(1000 * 2)

                this.issue_date.current!.value = moment(invoice.response.invoice.date_issue).format('DD/MM/YYYY')
                this.due_date.current!.value = moment(invoice.response.invoice.date_due).format('DD/MM/YYYY')
        }

        buildDate = (issue_date: string, due_date: string) => {
                return {
                        issue_date: `${issue_date.split('-').at(2)}/${issue_date.split('-').at(1)}/${issue_date.split('-').at(0)}`,
                        due_date: `${due_date.split('-').at(2)}/${due_date.split('-').at(1)}/${due_date.split('-').at(0)}`
                }
        }

        setInvoiceName = (e: any) => this.setState({ ...this.state, ...{ invoice_name: e.target.value } })

        ping = async () => (await ping(this.props.tk)).code == 200

        setBillHouse = (e: any) => this.setState({
                ...this.state, ...{
                        adress: {
                                ...this.state.adress, ...{
                                        house_number: e.target.value
                                }
                        }
                }
        })

        setBillStreet = (e: any) => this.setState({
                ...this.state, ...{
                        adress: {
                                ...this.state.adress, ...{
                                        street: e.target.value
                                }
                        }
                }
        })

        setBillCity = (e: any) => this.setState({
                ...this.state, ...{
                        adress: {
                                ...this.state.adress, ...{
                                        city: e.target.value
                                }
                        }
                }
        })

        setItemName = (invoice_item_name: string, item_key: number) => {
                this.setState({
                        ...this.state, ...{
                                items: this.state.items.map((item, key) => {
                                        if (key == item_key) {
                                                return { ...item, ...{ item_name: invoice_item_name } }
                                        }
                                        return item
                                })
                        }
                })
        }

        setItemCost = (item_key: number, cost: number) => {
                this.setState({
                        ...this.state, ...{
                                items: this.state.items.map((item, key) => {
                                        if (key == item_key) {
                                                return {
                                                        ...item,
                                                        ...{
                                                                cost: isNaN(cost) ? 0 : cost,
                                                                price: isNaN(parseFloat(parseFloat((cost * item.qty).toString()).toFixed(2))) ? 0 : parseFloat(parseFloat((cost * item.qty).toString()).toFixed(2))
                                                        }
                                                }
                                        }
                                        return item
                                })
                        }
                })
        }

        setItemQty = (item_key: number, qty: number) => {
                this.setState({
                        ...this.state, ...{
                                items: this.state.items.map((item, key) => {
                                        if (key == item_key) {
                                                return {
                                                        ...item,
                                                        ...{
                                                                qty: isNaN(qty) ? 0 : qty,
                                                                price: isNaN(parseFloat(parseFloat((item.cost * qty).toString()).toFixed(2))) ? 0 : parseFloat(parseFloat((item.cost * qty).toString()).toFixed(2))
                                                        }
                                                }
                                        }
                                        return item
                                })
                        }
                })
        }

        setItemDescription = (item_key: number, description: string) => {
                this.setState({
                        ...this.state, ...{
                                items: this.state.items.map((item, key) => {
                                        if (key == item_key) {
                                                return {
                                                        ...item,
                                                        ...{
                                                                description: description,
                                                        }
                                                }
                                        }
                                        return item
                                })
                        }
                })
        }

        setItemDiscount = (item_key: number, discount: number) => {
                discount = isNaN(discount) ? 0 : discount
                this.setState({
                        ...this.state, ...{
                                items: this.state.items.map((item, key) => {
                                        if (key == item_key) {
                                                return {
                                                        ...item,
                                                        ...{
                                                                discount
                                                        }
                                                }
                                        }
                                        return item
                                })
                        }
                })
        }

        setItemLabel = (item_key: number, label: string, type: 1 | 2) => {
                this.setState({
                        ...this.state, ...{
                                items: this.state.items.map((item, key) => {
                                        if (key == item_key) {
                                                return {
                                                        ...item,
                                                        ...{
                                                                [`tax_label${type}`]: label
                                                        }
                                                }
                                        }
                                        return item
                                })
                        }
                })
        }

        setItemTax = (item_key: number, tax1: number, tax2: number) => {
                if (!(tax1 >= 0 && tax1 <= 100) || !(tax2 >= 0 && tax2 <= 100)) return
                tax1 = isNaN(tax1) ? 0 : tax1
                tax2 = isNaN(tax2) ? 0 : tax2
                this.setState({
                        ...this.state, ...{
                                items: this.state.items.map((item, key) => {
                                        if (key == item_key) {
                                                return {
                                                        ...item,
                                                        ...{
                                                                tax1,
                                                                tax2
                                                        }
                                                }
                                        }
                                        return item
                                })
                        }
                })
        }

        addItem = () => this.setState({
                ...this.state, ...{
                        items: [...[
                                ...this.state.items, ...[{
                                        id: null,
                                        item_name: '',
                                        description: '',
                                        cost: 0,
                                        qty: 0,
                                        price: 0,
                                        discount: 0,
                                        tax_label1: '',
                                        tax_label2: '',
                                        tax1: 0,
                                        tax2: 0
                                }]
                        ]]
                }
        })

        removeItem = (item_index: number) => this.setState({ ...this.state, ...{ items: this.state.items.filter((item, key) => item.id !== item_index) } })

        closeAlert = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                e.preventDefault()
                this.buildError(ERROR_STATUS.SUCCESS, [])
        }

        save = async () => {
                let form = new FormData(),
                        issue_date = this.issue_date.current!.value,
                        due_date = this.due_date.current!.value

                issue_date = `${issue_date.split('/').at(2)}/${issue_date.split('/').at(1)}/${issue_date.split('/').at(0)}`
                due_date = `${due_date.split('/').at(2)}/${due_date.split('/').at(1)}/${due_date.split('/').at(0)}`

                form.append('id', this.props.id.toString())
                form.append('code_invoice', this.state.invoice_code)
                form.append('date_issue', issue_date)
                form.append('date_due', due_date)
                form.append('invoice_name', this.state.invoice_name)

                form.append('bill_to_name', this.state.adress.house_number)
                form.append('bill_to_descrip', this.state.adress.street)
                form.append('bill_to_city', this.state.adress.city)

                this.state.selected_tags.forEach(tag_id => {
                        form.append('tag[]', tag_id.toString())
                })

                this.state.items.forEach((item: any, key) => {
                        form.append(`items[${key}][id]`, !isNull(item.id) ? item.id.toString() : null)
                        form.append(`items[${key}][item_name]`, item.item_name)
                        form.append(`items[${key}][description]`, item.description)
                        form.append(`items[${key}][cost]`, item.cost.toString())
                        form.append(`items[${key}][qty]`, item.qty.toString())
                        form.append(`items[${key}][price]`, item.price.toString())
                        form.append(`items[${key}][discount]`, item.discount.toString())
                        form.append(`items[${key}][tax_label1]`, item.tax_label1.toString())
                        form.append(`items[${key}][tax_label2]`, item.tax_label2.toString())
                        form.append(`items[${key}][tax1]`, item.tax1.toString())
                        form.append(`items[${key}][tax2]`, item.tax2.toString())
                })

                if (!await this.ping()) {
                        this.buildError(ERROR_STATUS.DANGER, ['Not connection found !!!'])
                        return
                }
                this.buildError(ERROR_STATUS.SUCCESS, [])

                let response = await editInvoice(this.props.tk, form)

                if (response.code == 200) {
                        this.buildError(ERROR_STATUS.SUCCESS, ['Registered successfully !!!'])
                        return
                }

                try {
                        this.buildError(ERROR_STATUS.DANGER, response.response.errors)
                } catch (error) {
                        this.buildError(ERROR_STATUS.DANGER, ['An unexpected error occurred'])
                }
        }

        getPreview = () => {
                let preview: Preview = this.state.preview,
                        total_pay_to_date = parseFloat(this.state.invoice.total_pay_to_date.toFixed(2))

                preview.subtotal = this.state.items.reduce((accum, item) => accum + (item.cost * item.qty), 0)
                preview.discount = this.state.items.reduce((accum, item) => accum + ((item.discount / 100) * item.price), 0)
                preview.tax = this.state.items.reduce((accum, item) => accum + ((item.price - ((item.discount / 100) * item.price)) * ((item.tax1 / 100) + (item.tax2 / 100))), 0)
                preview.invoice_total = preview.subtotal - preview.discount + preview.tax
                preview.paid_to_date = total_pay_to_date
                preview.current_balance = parseFloat((preview.invoice_total - preview.paid_to_date).toFixed(2))
                preview.balance = parseFloat(preview.invoice_total.toFixed(2))

                return preview
        }

        preview = () => {
                const preview: Preview = this.getPreview()
                this.setState({ ...this.state, ...{ preview } })
        }

        setRestToPayBalance = async (price: number) => {
                if (!(price >= 0 && price <= this.getPreview().balance)) return
                this.setState({
                        ...this.state, ...{
                                invoice: {
                                        ...this.state.invoice, ...{
                                                total_pay_to_date: price
                                        }
                                }
                        }
                })

                await sleep(200)
                this.preview()
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

        sendInvoice = async () => {
                let file = generateInvoice(this.state.invoice, this.getPreview(), this.state.companie, 'export')
                if (file instanceof File) this.setState({
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
        }

        sendMail = async () => {
                if (
                        isNull(this.state.invoice_email.attachment) ||
                        this.state.invoice_email.to.length == 0
                ) {
                        this.buildError(ERROR_STATUS.DANGER, ['The "to" field is required'])
                        return
                }
                this.buildError(ERROR_STATUS.DANGER, [])
                this.setState({ ...this.state, ...{ send_email_pending: true } })

                let response = await invoiceSendMail(this.props.tk, {
                        to: this.state.invoice_email.to,
                        subject: this.state.invoice_email.subject,
                        attachment: this.state.invoice_email.attachment,
                        invoice_id: this.state.invoice_email.invoice_id
                })

                if (response.code !== 421) {
                        this.buildError(ERROR_STATUS.DANGER, response.response.errors)
                }

                if (response.code == 200) {
                        this.buildError(ERROR_STATUS.SUCCESS, ['Successfuly saved !!!'])
                        await sleep(1000 * 2)
                        this.cancelMail()
                        this.close_email_modal.current!.click()
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
                                                subject: `Invoice #${this.state.invoice_code}`,
                                                attachment: null
                                        }
                                }
                        }
                })
        }

        /**
         * Download invoice
         * Format A4 210x297cm => 794x1123px
         * 
         * Alternatively, it's more better than we use 
         * FPDF composer package to generate a PDF 
         * file with header abd footer
         */
        download = async () => {
                generateInvoice(this.state.invoice, this.getPreview(), this.state.companie)
                await setInvoiceHistory(this.props.tk, this.props.id, INVOICE_HISTORY_TYPE.DOWNLOAD)
        }

        updateTags = async () => {
                let tags = await getInvoice(this.props.tk, this.props.id)

                if (tags.code !== 200) return
                this.setState({
                        ...this.state, ...{
                                tags: tags.response.invoice.tags
                        }
                })
        }

        deleteInvoice = async (invoice_id: number) => {
                if (!this.delete_invoice_password.current) return
                let password = this.delete_invoice_password.current.value,
                        response = await deleteInvoice(this.props.tk, invoice_id, password)

                this.delete_invoice_password.current.value = ""
                if (response.code == 200) {
                        await setInvoiceHistory(this.props.tk, invoice_id, INVOICE_HISTORY_TYPE.DELETE)
                        this.buildError(ERROR_STATUS.SUCCESS, ['Successfully deleted'])
                        await sleep(1500)
                        location.href = `${this.state.config.origin}/user/invoice`
                        return
                }
                this.buildError(ERROR_STATUS.DANGER, response.response.errors ?? ['Server Error, please report this error if persisting'])
        }

        setTagList = (id: number) => {
                let tags = this.state.selected_tags.filter(tag => tag == id)
                if (tags.length == 0) {
                        this.setState({
                                ...this.state, ...{
                                        selected_tags: [...this.state.selected_tags, ...[id]]
                                }
                        })
                } else {
                        this.setState({
                                ...this.state, ...{
                                        selected_tags: this.state.selected_tags.filter(tag => tag !== id)
                                }
                        })
                }
        }

        buildError = (status: ERROR_STATUS, errors: Array<string> = []) => this.setState({ ...this.state, ...{ error: { ...this.state.error, ...{ errors, error_type: status } } } })

        render(): React.ReactNode {
                return <SafeRaiseError>
                        <Suspense fallback={<Loading />}>
                                {
                                        this.state.loading ?
                                                <Loading /> :
                                                <section className="invoice-edit-wrapper position-relative">
                                                        <AlertError {...{
                                                                error: this.state.error,
                                                                closeAlert: this.closeAlert
                                                        }} />
                                                        <div className="row">
                                                                <div className="col-xl-9 col-md-8 col-12">
                                                                        <div className="card">
                                                                                <div className="card-content" ref={this.preview_inner}>
                                                                                        <div className="card-body pb-0 mx-25">
                                                                                                <div className="row mx-0">
                                                                                                        <div className="col-xl-4 col-md-12 d-flex align-items-center pl-0">
                                                                                                                <h6 className="invoice-number mr-75">Invoice#</h6>
                                                                                                                <span className="rounded-lg" style={{ backgroundColor: '#F2F4F4', padding: '6px 15px', userSelect: 'none' }}>{this.state.invoice_code}</span>
                                                                                                        </div>
                                                                                                        <div className="col-xl-8 col-md-12 px-0 pt-xl-0 pt-1">
                                                                                                                <div className="invoice-date-picker d-flex align-items-center justify-content-xl-end flex-wrap">
                                                                                                                        <div className="d-flex align-items-center">
                                                                                                                                <small className="text-muted mr-75">Date Issue: </small>
                                                                                                                                <section className="d-flex ">
                                                                                                                                        <input type="text" id="date_issue" className="form-control pickadate mr-2 mb-50 mb-sm-0 picker__input" ref={this.issue_date} placeholder="Select Date" aria-haspopup="true" aria-expanded="false" aria-readonly="false" aria-owns="date_issue_root" />
                                                                                                                                        <InvoiceDatePicker {...{ id: 'date_issue_root' }} />
                                                                                                                                </section>
                                                                                                                        </div>
                                                                                                                        <div className="d-flex align-items-center">
                                                                                                                                <small className="text-muted mr-75">Date Due: </small>
                                                                                                                                <section className="d-flex">
                                                                                                                                        <input type="text" id="date_due" className="form-control pickadate mr-2 mb-50 mb-sm-0 picker__input" ref={this.due_date} placeholder="Select Date" aria-haspopup="true" aria-expanded="false" aria-readonly="false" aria-owns="date_due_root" />
                                                                                                                                        <InvoiceDatePicker {...{ id: 'date_due_root' }} />
                                                                                                                                </section>
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <hr />
                                                                                                <div className="row my-2 py-50">
                                                                                                        <div className="col-sm-6 col-12 order-2 order-sm-1">
                                                                                                                <h4 className="text-primary">Invoice</h4>
                                                                                                                <input type="text" id="product_name" value={this.state.invoice_name} onChange={this.setInvoiceName} className="form-control" placeholder="Product Name" />
                                                                                                        </div>
                                                                                                        <div className="col-sm-6 col-12 order-1 order-sm-1 d-flex justify-content-end">
                                                                                                                <h3 className="brand-text mb-0">{this.state.companie.name.toUpperCase()}</h3>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <hr />
                                                                                                <div className="row invoice-info">
                                                                                                        <div className="col-lg-6 col-md-12 mt-25">
                                                                                                                <h6 className="invoice-to">Bill To</h6>
                                                                                                                <fieldset className="invoice-address form-group">
                                                                                                                        <input type="text" className="form-control" value={this.state.adress.house_number} onChange={this.setBillHouse} id="bill_to_name" placeholder="House no." />
                                                                                                                </fieldset>
                                                                                                                <fieldset className="invoice-address form-group">
                                                                                                                        <textarea className="form-control" id="bill_to_descrip" value={this.state.adress.street} onChange={this.setBillStreet} rows={4} placeholder="Landmark/Street" />
                                                                                                                </fieldset>
                                                                                                                <fieldset className="invoice-address form-group">
                                                                                                                        <input type="text" id="bill_to_city" className="form-control" value={this.state.adress.city} onChange={this.setBillCity} placeholder="City" />
                                                                                                                </fieldset>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <hr />
                                                                                        </div>
                                                                                        <div className="card-body pt-50">
                                                                                                <div className="invoice-product-details">
                                                                                                        <form className="form invoice-item-repeater">
                                                                                                                {
                                                                                                                        this.state.items.map((item, key) => (
                                                                                                                                <div key={key} data-repeater-list="group-a">
                                                                                                                                        <div data-repeater-item="">
                                                                                                                                                <div className="row mb-50">
                                                                                                                                                        <div className="col-3 col-md-4 invoice-item-title">Item</div>
                                                                                                                                                        <div className="col-3 invoice-item-title">Cost</div>
                                                                                                                                                        <div className="col-3 invoice-item-title">Qty</div>
                                                                                                                                                        <div className="col-3 col-md-2 invoice-item-title">Price</div>
                                                                                                                                                </div>
                                                                                                                                                <div className="invoice-item d-flex border rounded mb-1">
                                                                                                                                                        <div className="invoice-item-filed row pt-1 px-1">
                                                                                                                                                                <div className="col-12 col-md-4 form-group">
                                                                                                                                                                        <input type="text" className="form-control" defaultValue={item.item_name} onChange={e => this.setItemName(e.target.value, key)} placeholder="Item" />
                                                                                                                                                                </div>
                                                                                                                                                                <div className="col-md-3 col-12 form-group">
                                                                                                                                                                        <input type="number" className="form-control" defaultValue={item.cost} onChange={e => this.setItemCost(key, parseFloat(e.target.value))} placeholder="Type Cost here ..." />
                                                                                                                                                                </div>
                                                                                                                                                                <div className="col-md-3 col-12 form-group">
                                                                                                                                                                        <input type="number" className="form-control" defaultValue={item.qty} onChange={e => this.setItemQty(key, parseFloat(e.target.value))} placeholder="Type Quantity here ..." />
                                                                                                                                                                </div>
                                                                                                                                                                <div className="col-md-2 col-12 form-group">
                                                                                                                                                                        <strong className="text-primary align-middle">${item.price}</strong>
                                                                                                                                                                </div>
                                                                                                                                                                <div className="col-md-4 col-12 form-group">
                                                                                                                                                                        <input type="text" className="form-control" defaultValue={item.description} onChange={e => this.setItemDescription(key, e.target.value)} placeholder="Description" />
                                                                                                                                                                </div>
                                                                                                                                                                <div className="col-md-8 col-12 form-group">
                                                                                                                                                                        <div className="row">
                                                                                                                                                                                <div className="col-4 text-center"><strong>Discount</strong></div>
                                                                                                                                                                                <div className="col-4 text-center"><strong>{item.tax_label1.length == 0 ? 'No labels' : item.tax_label1}</strong></div>
                                                                                                                                                                                <div className="col-4 text-center"><strong>{item.tax_label2.length == 0 ? 'No labels' : item.tax_label2}</strong></div>
                                                                                                                                                                        </div>
                                                                                                                                                                        <div className="row">
                                                                                                                                                                                <div className="col-4 text-center">{item.discount}%</div>
                                                                                                                                                                                <div className="col-4 text-center">{item.tax1}%</div>
                                                                                                                                                                                <div className="col-4 text-center">{item.tax2}%</div>
                                                                                                                                                                        </div>
                                                                                                                                                                </div>
                                                                                                                                                        </div>
                                                                                                                                                        <div className="invoice-icon d-flex flex-column justify-content-between border-left p-25">
                                                                                                                                                                <span className="cursor-pointer" data-repeater-delete="" onClick={() => this.removeItem(item.id)}>
                                                                                                                                                                        <i className="bx bx-x"></i>
                                                                                                                                                                </span>
                                                                                                                                                                <div className="dropdown">
                                                                                                                                                                        <i className="bx bx-cog cursor-pointer dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button"></i>
                                                                                                                                                                        <div className="dropdown-menu p-1" x-placement="bottom-start" style={{
                                                                                                                                                                                position: 'absolute',
                                                                                                                                                                                willChange: 'transform',
                                                                                                                                                                                top: 0,
                                                                                                                                                                                left: 0,
                                                                                                                                                                                transform: 'translate3d(0px, 18px, 0px)'
                                                                                                                                                                        }}>
                                                                                                                                                                                <div className="row">
                                                                                                                                                                                        <div className="col-12 form-group">
                                                                                                                                                                                                <label htmlFor="discount">Discount(%)</label>
                                                                                                                                                                                                <input type="number" className="form-control form-control-sm" defaultValue={item.discount} onChange={e => this.setItemDiscount(key, parseFloat(e.target.value))} id="discount" placeholder="0" />
                                                                                                                                                                                        </div>
                                                                                                                                                                                        <div className="col-6 form-group">
                                                                                                                                                                                                <input type="text" placeholder="Label name" value={item.tax_label1} onChange={e => this.setItemLabel(key, e.target.value, 1)} className="form-control form-control-sm mb-1" />
                                                                                                                                                                                                <input type="number" placeholder="Percent" defaultValue={item.tax1} min={0} max={100} onChange={e => this.setItemTax(key, parseFloat(e.target.value), item.tax2)} className="form-control form-control-sm mb-1" />
                                                                                                                                                                                        </div>
                                                                                                                                                                                        <div className="col-6 form-group">
                                                                                                                                                                                                <input type="text" placeholder="Label name" value={item.tax_label2} onChange={e => this.setItemLabel(key, e.target.value, 2)} className="form-control form-control-sm mb-1" />
                                                                                                                                                                                                <input type="number" placeholder="Percent" defaultValue={item.tax2} min={0} max={100} onChange={e => this.setItemTax(key, item.tax1, parseFloat(e.target.value))} className="form-control form-control-sm mb-1" />
                                                                                                                                                                                        </div>
                                                                                                                                                                                </div>
                                                                                                                                                                        </div>
                                                                                                                                                                </div>
                                                                                                                                                        </div>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        ))
                                                                                                                }
                                                                                                                <div className="form-group">
                                                                                                                        <div className="col p-0">
                                                                                                                                <a href="" className="btn btn-light-primary btn-sm" role="button" onClick={(e) => { e.preventDefault(); this.addItem() }}>
                                                                                                                                        <i className="bx bx-plus"></i>
                                                                                                                                        <span>Add Item</span>
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                        </form>
                                                                                                </div>
                                                                                                <hr />
                                                                                                <div className="invoice-subtotal pt-50">
                                                                                                        <div className="row">
                                                                                                                <div className="col-md-5 col-12">
                                                                                                                        <div className="form-group">
                                                                                                                                <input type="text" className="form-control" placeholder="Add Payment Terms" />
                                                                                                                        </div>
                                                                                                                        <div className="form-group">
                                                                                                                                <input type="text" className="form-control" placeholder="Add client Note" />
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                                <div className="col-lg-5 col-md-7 offset-lg-2 col-12">
                                                                                                                        <ul className="list-group list-group-flush">
                                                                                                                                <li className="list-group-item d-flex justify-content-between border-0 pb-0">
                                                                                                                                        <span className="invoice-subtotal-title">Subtotal</span>
                                                                                                                                        <h6 className="invoice-subtotal-value mb-0">${this.state.preview.subtotal!.toFixed(2)}</h6>
                                                                                                                                </li>
                                                                                                                                <li className="list-group-item d-flex justify-content-between border-0 pb-0">
                                                                                                                                        <span className="invoice-subtotal-title">Discount</span>
                                                                                                                                        <h6 className="invoice-subtotal-value mb-0">- ${this.state.preview.discount!.toFixed(2)}</h6>
                                                                                                                                </li>
                                                                                                                                <li className="list-group-item d-flex justify-content-between border-0 pb-0">
                                                                                                                                        <span className="invoice-subtotal-title">Tax</span>
                                                                                                                                        <h6 className="invoice-subtotal-value mb-0">{this.state.preview.tax!.toFixed(2)}%</h6>
                                                                                                                                </li>
                                                                                                                                <li className="list-group-item py-0 border-0 mt-25">
                                                                                                                                        <hr />
                                                                                                                                </li>
                                                                                                                                <li className="list-group-item d-flex justify-content-between border-0 py-0">
                                                                                                                                        <span className="invoice-subtotal-title">Invoice Total</span>
                                                                                                                                        <h6 className="invoice-subtotal-value mb-0">${this.state.preview.invoice_total!.toFixed(2)}</h6>
                                                                                                                                </li>
                                                                                                                                <li className="list-group-item d-flex justify-content-between border-0 pb-0">
                                                                                                                                        <span className="invoice-subtotal-title">Paid to date</span>
                                                                                                                                        <h6 className="invoice-subtotal-value mb-0">- ${this.state.preview.paid_to_date!.toFixed(2)}</h6>
                                                                                                                                </li>
                                                                                                                                <li className="list-group-item d-flex justify-content-between border-0 pb-0">
                                                                                                                                        <span className="invoice-subtotal-title">Balance (USD)</span>
                                                                                                                                        <h6 className="invoice-subtotal-value mb-0">${this.state.preview.current_balance!.toFixed(2)}</h6>
                                                                                                                                </li>
                                                                                                                                <li className="list-group-item border-0 pb-0">
                                                                                                                                        <button
                                                                                                                                                className="btn btn-primary btn-block subtotal-preview-btn"
                                                                                                                                                onClick={this.preview}>Preview</button>
                                                                                                                                </li>
                                                                                                                        </ul>
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

                                                                                                <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                                                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                                                                                                <div className="modal-content">
                                                                                                                        <div className="modal-header">
                                                                                                                                <h5 className="modal-title" id="exampleModalLongTitle">Invoice Mail</h5>
                                                                                                                                <button type="button" className="close text-danger" data-dismiss="modal" aria-label="Close" ref={this.close_email_modal}>
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
                                                                                                                                                <input type="email" id="m-subject" className="form-control form-control-sm shadow-none disabled" disabled value={`Invoice #${this.state.invoice_code}`} onChange={() => { }} />
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
                                                                                        </div>
                                                                                        <div className="invoice-action-btn mb-1">
                                                                                                <button className="btn btn-light-primary btn-block" onClick={this.download}>
                                                                                                        <span>Download Invoice</span>
                                                                                                </button>
                                                                                        </div>
                                                                                        <div className="invoice-action-btn mb-1 d-flex">
                                                                                                <div className="preview w-50 mr-50">
                                                                                                        <button className="btn btn-light-primary btn-block" onClick={this.preview}>
                                                                                                                <span className="text-nowrap">Preview</span>
                                                                                                        </button>
                                                                                                </div>
                                                                                                <div className="save w-50">
                                                                                                        <button className="btn btn-light-primary btn-block" onClick={this.save}>
                                                                                                                <span className="text-nowrap">Save</span>
                                                                                                        </button>
                                                                                                </div>
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
                                                                                </div>
                                                                                <div className="p-1">
                                                                                        <InvoiceStatus {...{
                                                                                                invoice_id: this.props.id,
                                                                                                tk: this.props.tk,
                                                                                                status: this.state.invoice.status,
                                                                                                total_pay_to_date: this.state.invoice.total_pay_to_date,
                                                                                                getPreview: this.getPreview,
                                                                                                setInvoiceState: this.setInvoiceState,
                                                                                                setRestToPayBalance: this.setRestToPayBalance,
                                                                                                buildError: this.buildError
                                                                                        }} />
                                                                                        <TagComponent {...{
                                                                                                tags: this.state.invoice_tags,
                                                                                                tk: this.props.tk,
                                                                                                update_tag: this.updateTags,
                                                                                                buildError: this.buildError,
                                                                                                display_mode: TAG_VIEW_MODE.WRITE,
                                                                                                setTag: this.setTagList,
                                                                                                selected_tags: this.state.selected_tags
                                                                                        }} />
                                                                                        <InvoiceHistory {...{
                                                                                                tk: this.props.tk,
                                                                                                invoice_id: this.props.id
                                                                                        }} />
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </section>
                                }
                        </Suspense>
                </SafeRaiseError >
        }
}

if (document.querySelector('#edit-invoice, #display-invoice-component')) {
        let tk = getHook(),
                id = document.querySelector('#edit-invoice, #display-invoice-component')!.getAttribute('data-id');
        if (!isNull(tk) && !isNull(document.getElementById('edit-invoice')) && !isNull(id)) createRoot(document.getElementById('edit-invoice')!).render(<EditInvoice {...{ tk, id: parseInt(id) }} />)
}