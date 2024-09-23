import React from "react";


export default class SafeRaiseError extends React.Component {
    props!: { children: JSX.Element }
    state!: { error_raised: boolean }
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            error_raised: false
        }
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({ ...this.state, ...{ error_raised: true, error, errorInfo } })
    }

    render(): React.ReactNode {
        return (!this.state.error_raised) ? this.props.children : <>Some Error occured</>
    }
}