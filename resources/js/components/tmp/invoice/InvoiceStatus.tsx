import { isNull, isUndefined } from "lodash";
import React, { createRef, RefObject } from "react";
import { getInvoiceStatus, setInvoiceHistory, setInvoicePaiment, setInvoiceStatus } from "../API/pages/invoice";
import { ERROR_STATUS, INVOICE_HISTORY_TYPE, INVOICE_STATUS, TAG_VIEW_MODE } from "../enums/invoice";
import { sleep } from "../functions/tools";
import { Preview } from "../interfaces/pages/invoice";



export default class InvoiceStatus extends React.Component {

        props!: Readonly<{
                invoice_id: number
                tk: string
                status?: INVOICE_STATUS
                total_pay_to_date?: number
                mode?: TAG_VIEW_MODE
                buildError: (status: ERROR_STATUS, errors: Array<string>) => void
                getPreview?: () => Preview
                setInvoiceState?: () => Promise<void>
                setRestToPayBalance?: (price: number) => void
        }>;
        state: Readonly<{
                status: INVOICE_STATUS
                status_list: Array<INVOICE_STATUS>
        }>
        amount_inmut: RefObject<HTMLInputElement> = createRef()

        constructor(props: Readonly<{}>) {
                super(props)
                this.state = {
                        status: INVOICE_STATUS.PENDING_PAYMENT,
                        status_list: []
                }
        }

        get total_pay_to_date() {
                const preview: Preview | undefined = isUndefined(this.props.getPreview) ? undefined : this.props.getPreview()
                return {
                        total_pay_to_date: isUndefined(this.props.total_pay_to_date) || isUndefined(preview) ? parseFloat((0).toFixed(2)) : parseFloat((preview.balance - this.props.total_pay_to_date).toFixed(2)),
                        preview
                }
        }

        async componentDidMount() {
                let status = await getInvoiceStatus(this.props.tk, this.props.invoice_id)

                if (status.code !== 200 || status.response.code !== 200) return
                this.setState({
                        ...this.state,
                        ...{
                                status: !isUndefined(this.props.status) ? this.props.status : status.response.status,
                                status_list: status.response.status_list,
                        }
                })

                if (this.props.total_pay_to_date == 0 && status.response.status !== INVOICE_STATUS.PENDING_PAYMENT) this.setPaiement(this.props.total_pay_to_date, INVOICE_STATUS.PENDING_PAYMENT)
        }

        setStatus = async (new_status: INVOICE_STATUS) => {
                const state = this.state.status
                this.setState({ ...this.state, ...{ status: new_status } })

                let response = await setInvoiceStatus(this.props.tk, this.props.invoice_id, new_status)

                if (response.code == 200 && response.response.code == 200) {
                        this.props.buildError(ERROR_STATUS.SUCCESS, ['Status changed successfully !!'])
                        if (isUndefined(this.props.setInvoiceState)) return
                        this.props.setInvoiceState()
                        return
                }
                this.props.buildError(ERROR_STATUS.DANGER, response.response.errors || ['Server Error'])
                await sleep(500)
                this.setState({ ...this.state, ...{ status: state } })
        }

        setPaiement = async (new_price: number, status: INVOICE_STATUS) => {
                if (isUndefined(this.props.setInvoiceState)) return
                let response = await setInvoicePaiment(this.props.tk, this.props.invoice_id, new_price, status)
                await setInvoiceHistory(this.props.tk, this.props.invoice_id, INVOICE_HISTORY_TYPE.UPDATE_INVOICE_STATUS)

                if (response.code == 200 && response.response.code == 200) {
                        this.props.buildError(ERROR_STATUS.SUCCESS, ['Amount added successfully !!'])
                        await sleep(500)
                        await this.props.setInvoiceState()
                        return
                }
                this.props.buildError(ERROR_STATUS.DANGER, response.response.errors || ['Server Error'])
        }

        setRestToPayBalance = (input: HTMLInputElement) => {
                if (isUndefined(this.props.total_pay_to_date) || isUndefined(this.props.setRestToPayBalance)) return

                const preview: Preview | null = isUndefined(this.props.getPreview) ? null : this.props.getPreview()
                let balance: number = isUndefined(this.props.total_pay_to_date) || isNull(preview) ? parseFloat((0).toFixed(2)) : preview.balance
                let price = 0

                try {
                        price = parseFloat(parseFloat(input.value).toFixed(2))
                } catch (error) {
                        price = this.props.total_pay_to_date
                }

                if (price > balance || isNaN(price)) {
                        if (!this.amount_inmut.current!.classList.contains('border-danger')) this.amount_inmut.current!.classList.add('border-danger')
                        return
                }
                if (this.amount_inmut.current!.classList.contains('border-danger')) this.amount_inmut.current!.classList.remove('border-danger')
                this.props.setRestToPayBalance(price)
        }

        render(): React.ReactNode {
                let {total_pay_to_date, preview} = this.total_pay_to_date,
                balance = isUndefined(preview) ? 0 : preview.balance

                return <div className="card-body p-0">
                        <div className="invoice-action-btn mb-1">
                                <h5 className="text-muted text-uppercase">Status</h5>
                                {
                                        this.props.mode && this.props.mode == TAG_VIEW_MODE.READ ? <span className="text-primary">{ this.state.status.replace('_', ' ') }</span> : <select name="invoice_status" className="custom-select custom-select-sm" value={!isUndefined(this.props.status) ? this.props.status : this.state.status} onChange={e => this.setStatus(e.target.value as INVOICE_STATUS)}>
                                                {
                                                        this.state.status_list.map((status, key) => (
                                                                <option key={key} value={status}>{status.replace('_', ' ')}</option>
                                                        ))
                                                }
                                        </select>
                                }
                        </div>
                        {
                                !isNull(preview) && !isUndefined(this.props.total_pay_to_date) ?
                                        <div className="invoice-action-btn mb-1">
                                                <h5 className="text-muted text-uppercase">New Paiement</h5>
                                                <p className="text-muted">
                                                        Total balance: <span className="text-primary">${balance}</span> <br />
                                                        Rest to pay: <span className="text-danger">${total_pay_to_date}</span>
                                                </p>
                                                <input
                                                        type="number"
                                                        ref={this.amount_inmut}
                                                        className="form-control form-control-sm"
                                                        placeholder="$00.00"
                                                        value={this.props.total_pay_to_date}
                                                        onChange={e => this.setRestToPayBalance(e.target)}
                                                        max={preview?.balance}
                                                        step={.01} />
                                                <button
                                                        className="btn btn-sm btn-light-success mt-2 d-block w-100"
                                                        onClick={() => {
                                                                let paiement = this.props.total_pay_to_date!
                                                                if (paiement > 0 && paiement < preview!.balance) {
                                                                        this.setPaiement(paiement, INVOICE_STATUS.PARTIAL_PAID)
                                                                } else if (paiement < 0 || paiement > preview!.balance) { //     This condition was intentionally added but should never normally execute
                                                                        this.setPaiement(paiement, INVOICE_STATUS.CREDIT)
                                                                } else if (paiement == preview?.balance) {
                                                                        this.setPaiement(paiement, INVOICE_STATUS.PAID)
                                                                } else {
                                                                        this.setPaiement(paiement, INVOICE_STATUS.PENDING_PAYMENT)
                                                                }
                                                        }}>
                                                        Add amount <i className="bx bx-dollar"></i>
                                                </button>
                                        </div> : null
                        }
                </div>
        }
}