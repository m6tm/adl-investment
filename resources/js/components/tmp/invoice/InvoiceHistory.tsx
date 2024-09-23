import React from "react";
import { getInvoiceHistory } from "../API/pages/invoice";
import { extractDateFormat } from "../functions/tools";
import { InvoiceHistoryStateInterface } from "../interfaces/pages/invoice";


export default class InvoiceHistory extends React.Component {
        props!: Readonly<{ invoice_id: number, tk: string }>
        state: Readonly<InvoiceHistoryStateInterface>;

        constructor(props: Readonly<{}>) {
                super(props)
                this.state = {
                        history: []
                }
        }

        async componentDidMount() {
                let invoice_histories = await getInvoiceHistory(this.props.tk, this.props.invoice_id)

                if (invoice_histories.code !== 200) {
                        return
                }

                this.setState({ ...this.state, ...{ history: invoice_histories.response.history } })
        }

        render(): React.ReactNode {
                return (
                        <div className="card-body p-0">
                                <div className="invoice-action-btn mb-1 mt-1 mx-0">
                                        <hr className="w-50 mt-2" />
                                        <h5 className="text-uppercase text-muted d-flex justify-content-between align-items-center mb-2">
                                                Invoice History:
                                        </h5>

                                        <ul className="m-0 p-0 list-unstyled tag-list">
                                                {
                                                        this.state.history.slice(0, 5).map((invoice, key) => (
                                                                <li key={key}>
                                                                        <strong className="text-capitalize">
                                                                                {invoice.action}
                                                                        </strong>: {invoice.action_description} at {extractDateFormat(invoice.created_at)} <br />
                                                                        <strong className="text-capitalize">
                                                                                By
                                                                        </strong>: {invoice.user.last_name} {invoice.user.first_name}
                                                                </li>
                                                        ))
                                                }
                                        </ul>
                                </div>
                        </div>
                )
        }
}