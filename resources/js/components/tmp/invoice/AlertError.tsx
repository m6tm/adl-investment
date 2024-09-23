import React from "react"
import { AlertError as Alert } from "../interfaces/pages/invoice"



export default class AlertError extends React.Component {
        props!: {
                error: Alert,
                closeAlert: (e: any) => void
        }
        
        constructor(props: Readonly<{}>) {
                super(props)
        }

        render(): React.ReactNode {
            return (
                <div className={`alert-box ${this.props.error.error_type}${this.props.error.errors.length > 0 ? '' : ' d-none'}`}>
                        <a href="" className="alert-dismiss-btn" onClick={this.props.closeAlert}>&times;</a>
                        {
                                this.props.error.error_type == 'danger' ?
                                <ul>
                                        {
                                                this.props.error.errors.map((error, key) => (
                                                        <li key={key}>{error}</li>
                                                ))
                                        }
                                </ul> :
                                <p>{this.props.error.errors.at(0)}</p>
                        }
                </div>
            )
        }
}