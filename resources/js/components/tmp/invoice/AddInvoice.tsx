import { isNull } from "lodash"
import React, { Suspense } from "react"
import { createRoot } from "react-dom/client"
import { v4 as uuid } from 'uuid'
import { getCompanie, getConfig, getTags, ping, saveInvoice } from "../API/pages/invoice"
import { ERROR_STATUS, TAG_VIEW_MODE } from "../enums/invoice"
import { getHook } from "../functions/tools"
import { AddInvoiceStateInterface, Companie, Config } from "../interfaces/pages/invoice"
import Loading from "../Loading"
import SafeRaiseError from "../SafeRaiseError"
import AlertError from "./AlertError"
import InvoiceDatePicker from "./InvoiceDatePicker"
import { TagComponent } from "./TagComponent"


class AddInvoice extends React.Component {

        state!: AddInvoiceStateInterface
        props!: Readonly<{ tk: string }>
        issue_date: React.RefObject<HTMLInputElement> = React.createRef()
        due_date: React.RefObject<HTMLInputElement> = React.createRef()

        constructor(props: Readonly<{}>) {
                super(props)
                this.state = {
                        invoice_code: `INV-${uuid().split('-').slice(0, 1).join('-')}`.toUpperCase(),
                        invoice_name: '',
                        adress: {
                                house_number: '',
                                street: '',
                                city: '',
                        },
                        items: [
                                {
                                        item_name: '',
                                        item_description: '',
                                        cost: 0,
                                        qty: 0,
                                        price: 0,
                                        discount: {
                                                discount: 0,
                                                tax_label1: '',
                                                tax_label2: '',
                                                tax1: 0,
                                                tax2: 0,
                                        }
                                }
                        ],
                        datas: [],
                        error: {
                                error_type: ERROR_STATUS.DANGER,
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
                                balance: 0,
                        },
                        tags: [],
                        selected_tags: []
                }
        }

        async componentDidMount() {
                if (! await this.ping()) return
                let companie = await getCompanie(this.props.tk),
                        config_response = await getConfig(this.props.tk),
                        tags = await getTags(this.props.tk)

                if (companie.code !== 200 || config_response.code !== 200 || tags.code !== 200) return

                this.setState({
                        ...this.state,
                        ...{
                                companie: companie.response.companie,
                                config: config_response.response.config,
                                tags: tags.response.tags
                        }
                })
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
                                                                item_description: description,
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
                                                                discount: {
                                                                        ...item.discount, ...{
                                                                                discount
                                                                        }
                                                                },
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
                                                                discount: {
                                                                        ...item.discount, ...{
                                                                                [`tax_label${type}`]: label
                                                                        }
                                                                },
                                                        },
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
                                                                discount: {
                                                                        ...item.discount, ...{
                                                                                tax1,
                                                                                tax2
                                                                        }
                                                                },
                                                        }
                                                }
                                        }
                                        return item
                                })
                        }
                })
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

        addItem = () => this.setState({
                ...this.state, ...{
                        items: [...[
                                ...this.state.items, ...[{
                                        item_name: '',
                                        item_description: '',
                                        cost: 0,
                                        qty: 0,
                                        price: 0,
                                        discount: {
                                                discount: 0,
                                                tax_label1: '',
                                                tax_label2: '',
                                                tax1: 0,
                                                tax2: 0
                                        }
                                }]
                        ]]
                }
        })

        removeItem = (item_index: number) => this.setState({ ...this.state, ...{ items: this.state.items.filter((item, key) => key !== item_index) } })

        closeAlert = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                e.preventDefault()
                this.buildError(ERROR_STATUS.SUCCESS, [])
        }

        save = async () => {
                let form = new FormData(),
                        issue_date = this.issue_date.current!.value,
                        due_date = this.due_date.current!.value

                issue_date = `${issue_date.split('/').at(2)}/${issue_date.split('/').at(0)}/${issue_date.split('/').at(1)}`
                due_date = `${due_date.split('/').at(2)}/${due_date.split('/').at(0)}/${due_date.split('/').at(1)}`

                form.append('code_invoice', this.state.invoice_code)
                form.append('date_issue', issue_date)
                form.append('date_due', due_date)
                form.append('invoice_name', this.state.invoice_name)

                form.append('bill_to_name', this.state.adress.house_number)
                form.append('bill_to_descrip', this.state.adress.street)
                form.append('bill_to_city', this.state.adress.city)

                this.state.selected_tags.forEach(tag => {
                        form.append(`tags[]`, tag.toString())
                })

                this.state.items.forEach((item, key) => {
                        form.append(`items[${key}][item_name]`, item.item_name)
                        form.append(`items[${key}][description]`, item.item_description)
                        form.append(`items[${key}][cost]`, item.cost.toString())
                        form.append(`items[${key}][qty]`, item.qty.toString())
                        form.append(`items[${key}][price]`, item.price.toString())
                        form.append(`items[${key}][discount]`, item.discount.discount.toString())
                        form.append(`items[${key}][tax_label1]`, item.discount.tax_label1.toString())
                        form.append(`items[${key}][tax_label2]`, item.discount.tax_label2.toString())
                        form.append(`items[${key}][tax1]`, item.discount.tax1.toString())
                        form.append(`items[${key}][tax2]`, item.discount.tax2.toString())
                })

                if (!await this.ping()) {
                        this.buildError(ERROR_STATUS.DANGER, ['Not connection found !!!'])
                        return
                }
                this.buildError(ERROR_STATUS.SUCCESS, [])
                
                let response = await saveInvoice(this.props.tk, form)

                if (response.code == 200) {
                        this.buildError(ERROR_STATUS.SUCCESS, ['Registered successfully !!!'])
                        location.href = `${this.state.config.origin}/user/invoice`
                        return
                }

                try {
                        this.buildError(ERROR_STATUS.DANGER, response.response.errors)
                } catch (error) {
                        this.buildError(ERROR_STATUS.DANGER, ['An unexpected error occurred'])
                }
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

        buildError = (status: ERROR_STATUS, errors: Array<string> = []) => this.setState({ ...this.state, ...{ error: { ...this.state.error, ...{ errors, error_type: status } } } })

        render(): React.ReactNode {
                return <SafeRaiseError>
                        <Suspense fallback={<Loading />}>
                                <section className="invoice-edit-wrapper position-relative">
                                        <AlertError {...{
                                                error: this.state.error,
                                                closeAlert: this.closeAlert
                                        }} />
                                        <div className="row">
                                                <div className="col-xl-9 col-md-8 col-12">
                                                        <div className="card">
                                                                <form onSubmit={e => { e.preventDefault(); e.stopPropagation(); }}>
                                                                        <div className="card-content">
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
                                                                                                                                <input type="text" id="date_issue" className="form-control pickadate mr-2 mb-50 mb-sm-0 picker__input" ref={this.issue_date} placeholder="Select Date" readOnly aria-haspopup="true" aria-expanded="false" aria-readonly="false" aria-owns="date_issue_root" />
                                                                                                                                <InvoiceDatePicker {...{ id: 'date_issue_root' }} />
                                                                                                                        </section>
                                                                                                                </div>
                                                                                                                <div className="d-flex align-items-center">
                                                                                                                        <small className="text-muted mr-75">Date Due: </small>
                                                                                                                        <section className="d-flex">
                                                                                                                                <input type="text" id="date_due" className="form-control pickadate mr-2 mb-50 mb-sm-0 picker__input" ref={this.due_date} placeholder="Select Date" readOnly aria-haspopup="true" aria-expanded="false" aria-readonly="false" aria-owns="date_due_root" />
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
                                                                                        <div className="invoice-product-details ">
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
                                                                                                                                                                <input type="number" className="form-control" defaultValue={0} onChange={e => this.setItemCost(key, parseFloat(e.target.value))} placeholder="Type Cost here ..." />
                                                                                                                                                        </div>
                                                                                                                                                        <div className="col-md-3 col-12 form-group">
                                                                                                                                                                <input type="number" className="form-control" defaultValue={0} onChange={e => this.setItemQty(key, parseFloat(e.target.value))} placeholder="Type Quantity here ..." />
                                                                                                                                                        </div>
                                                                                                                                                        <div className="col-md-2 col-12 form-group">
                                                                                                                                                                <strong className="text-primary align-middle">${item.price}</strong>
                                                                                                                                                        </div>
                                                                                                                                                        <div className="col-md-4 col-12 form-group">
                                                                                                                                                                <input type="text" className="form-control invoice-item-desc" defaultValue={item.item_description} onChange={e => this.setItemDescription(key, e.target.value)} placeholder="Description" />
                                                                                                                                                        </div>
                                                                                                                                                        <div className="col-md-8 col-12 form-group">
                                                                                                                                                                <div className="row">
                                                                                                                                                                        <div className="col-4 text-center"><strong>Discount</strong></div>
                                                                                                                                                                        <div className="col-4 text-center"><strong>{item.discount.tax_label1.length == 0 ? 'No labels' : item.discount.tax_label1}</strong></div>
                                                                                                                                                                        <div className="col-4 text-center"><strong>{item.discount.tax_label2.length == 0 ? 'No labels' : item.discount.tax_label2}</strong></div>
                                                                                                                                                                </div>
                                                                                                                                                                <div className="row">
                                                                                                                                                                        <div className="col-4 text-center">{item.discount.discount}%</div>
                                                                                                                                                                        <div className="col-4 text-center">{item.discount.tax1}%</div>
                                                                                                                                                                        <div className="col-4 text-center">{item.discount.tax2}%</div>
                                                                                                                                                                </div>
                                                                                                                                                        </div>
                                                                                                                                                </div>
                                                                                                                                                <div className="invoice-icon d-flex flex-column justify-content-between border-left p-25">
                                                                                                                                                        <span className="cursor-pointer" data-repeater-delete="" onClick={() => this.removeItem(key)}>
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
                                                                                                                                                                                        <input type="number" className="form-control form-control-sm" defaultValue={item.discount.discount} onChange={e => this.setItemDiscount(key, parseFloat(e.target.value))} id="discount" placeholder="0" />
                                                                                                                                                                                </div>
                                                                                                                                                                                <div className="col-6 form-group">
                                                                                                                                                                                        <input type="text" placeholder="Tax Label ..." defaultValue={item.discount.tax_label1} onChange={e => this.setItemLabel(key, e.target.value, 1)} className="form-control form-control-sm mb-1" />
                                                                                                                                                                                        <input type="number" placeholder="Percent" min={0} max={100} defaultValue={item.discount.tax1} onChange={e => this.setItemTax(key, parseFloat(e.target.value), item.discount.tax2)} className="form-control form-control-sm mb-1" />
                                                                                                                                                                                </div>
                                                                                                                                                                                <div className="col-6 form-group">
                                                                                                                                                                                        <input type="text" placeholder="Tax Label ..." defaultValue={item.discount.tax_label2} onChange={e => this.setItemLabel(key, e.target.value, 2)} className="form-control form-control-sm mb-1" />
                                                                                                                                                                                        <input type="number" placeholder="Percent" min={0} max={100} defaultValue={item.discount.tax2} onChange={e => this.setItemTax(key, item.discount.tax1, parseFloat(e.target.value))} className="form-control form-control-sm mb-1" />
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
                                                                                                        </div>
                                                                                                        <div className="col-lg-5 col-md-7 offset-lg-2 col-12">
                                                                                                                <ul className="list-group list-group-flush">
                                                                                                                        <li className="list-group-item d-flex justify-content-between border-0 pb-0">
                                                                                                                                <span className="invoice-subtotal-title">Subtotal</span>
                                                                                                                                <h6 className="invoice-subtotal-value mb-0">$00.00</h6>
                                                                                                                        </li>
                                                                                                                        <li className="list-group-item d-flex justify-content-between border-0 pb-0">
                                                                                                                                <span className="invoice-subtotal-title">Discount</span>
                                                                                                                                <h6 className="invoice-subtotal-value mb-0">- $ 00.00</h6>
                                                                                                                        </li>
                                                                                                                        <li className="list-group-item d-flex justify-content-between border-0 pb-0">
                                                                                                                                <span className="invoice-subtotal-title">Tax</span>
                                                                                                                                <h6 className="invoice-subtotal-value mb-0">0.0%</h6>
                                                                                                                        </li>
                                                                                                                        <li className="list-group-item py-0 border-0 mt-25">
                                                                                                                                <hr />
                                                                                                                        </li>
                                                                                                                        <li className="list-group-item d-flex justify-content-between border-0 py-0">
                                                                                                                                <span className="invoice-subtotal-title">Invoice Total</span>
                                                                                                                                <h6 className="invoice-subtotal-value mb-0">$ 00.00</h6>
                                                                                                                        </li>
                                                                                                                        <li className="list-group-item d-flex justify-content-between border-0 pb-0">
                                                                                                                                <span className="invoice-subtotal-title">Paid to date</span>
                                                                                                                                <h6 className="invoice-subtotal-value mb-0">- $ 00.00</h6>
                                                                                                                        </li>
                                                                                                                        <li className="list-group-item d-flex justify-content-between border-0 pb-0">
                                                                                                                                <span className="invoice-subtotal-title">Balance (USD)</span>
                                                                                                                                <h6 className="invoice-subtotal-value mb-0">$ 000</h6>
                                                                                                                        </li>
                                                                                                                        <li className="list-group-item border-0 pb-0">
                                                                                                                                <button className="btn btn-primary btn-block subtotal-preview-btn disabled" disabled>Preview</button>
                                                                                                                        </li>
                                                                                                                </ul>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </form>
                                                        </div>
                                                </div>
                                                <div className="col-xl-3 col-md-4 col-12">
                                                        <div className="card invoice-action-wrapper shadow-none border">
                                                                <div className="card-body" style={{
                                                                        padding: '1rem'
                                                                }}>
                                                                        <div className="invoice-action-btn mb-1">
                                                                                <button className="btn btn-primary btn-block invoice-send-btn disabled" disabled>
                                                                                        <i className="bx bx-send"></i>
                                                                                        <span>Send Invoice</span>
                                                                                </button>
                                                                        </div>
                                                                        <div className="invoice-action-btn mb-1">
                                                                                <button className="btn btn-light-primary btn-block disabled" disabled>
                                                                                        <span>Download Invoice</span>
                                                                                </button>
                                                                        </div>
                                                                        <div className="invoice-action-btn mb-1 d-flex">
                                                                                <div className="preview w-50 mr-50">
                                                                                        <button className="btn btn-light-primary btn-block disabled" disabled>
                                                                                                <span className="text-nowrap">Preview</span>
                                                                                        </button>
                                                                                </div>
                                                                                <div className="save w-50">
                                                                                        <button className="btn btn-light-primary btn-block" onClick={this.save}>
                                                                                                <span className="text-nowrap">Save</span>
                                                                                        </button>
                                                                                </div>
                                                                        </div>
                                                                        <TagComponent {...{
                                                                                tags: this.state.tags,
                                                                                tk: this.props.tk,
                                                                                update_tag: this.updateTags,
                                                                                buildError: this.buildError,
                                                                                display_mode: TAG_VIEW_MODE.WRITE,
                                                                                setTag: this.setTagList,
                                                                                selected_tags: this.state.selected_tags
                                                                        }} />
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </section>
                        </Suspense>
                </SafeRaiseError>
        }
}

let tk = getHook()
if (!isNull(tk) && !isNull(document.getElementById('add-invoice'))) createRoot(document.getElementById('add-invoice')!).render(<AddInvoice {...{ tk }} />)