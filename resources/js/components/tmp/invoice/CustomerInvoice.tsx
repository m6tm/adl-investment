import React from "react";
import { CustomerInvoiceProps, CustomerInvoiceState } from "../interfaces/pages/invoice";
import { v4 as uuid } from 'uuid'
import { Customer } from "../interfaces/pages/customer";
import { getCustomers } from "../API/pages/customer";
import { isNull } from "lodash";
import { setInvoiceCustomer } from "../API/pages/invoice";
import { showToast } from "../functions/toast";


export default class CustomerInvoice extends React.Component {

        props!: Readonly<CustomerInvoiceProps>;
        state: Readonly<CustomerInvoiceState>;

        constructor(props: Readonly<any>) {
                super(props)
                this.state = {
                        customers: [],
                        selected_customer: isNull(this.props.customer) ? -1 : this.props.customer.id
                }
        }

        async componentDidMount(): Promise<void> {
                let response = await getCustomers(this.props.tk)

                if (response.code == 200) {
                        this.customers = response.response.customers
                }
        }

        get selected_customer() {
                return this.state.selected_customer
        }

        set selected_customer(selected_customer: number) {
                this.setState({ ...this.state, ...{ selected_customer } })
        }

        get customers() {
                return this.state.customers
        }

        set customers(customers: Array<Customer>) {
                this.setState({
                        ...this.state, ...{
                                customers: [...this.state.customers, ...customers]
                        }
                })
        }

        onSelectCustomer = async (customer_id:  number) : Promise<void> => {
                const { tk, invoice_id } = this.props
                let response = await setInvoiceCustomer(tk, invoice_id, customer_id)

                if (response.code == 200) {
                        console.log(customer_id);
                        this.selected_customer = customer_id
                        showToast("Customer Changed", "success").showToast()
                        return
                }
                showToast(response.response.response, "danger").showToast()
        }

        render(): React.ReactNode {
                const { customer } = this.props
                return <div className="card-body p-0">
                        <div className="invoice-action-btn mb-1">
                                <h5 className="text-muted text-uppercase">Customers</h5>
                                
                                <select
                                        name="customers"
                                        className="custom-select custom-select-sm"
                                        value={this.selected_customer}
                                        onChange={e => this.onSelectCustomer(parseInt(e.target.selectedOptions[0].value))}>
                                        <option value={-1}>Select Customer</option>
                                        {
                                                this.customers.map(customer => (
                                                        <option key={uuid()} value={customer.id}>{customer.last_name} {customer.first_name}</option>
                                                ))
                                        }
                                </select>
                        </div>
                </div>
        }
}