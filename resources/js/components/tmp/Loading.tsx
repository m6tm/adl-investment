import React from "react";
import { LoadingProps } from "./interfaces/loading";


export default class Loading extends React.Component {

    props!: Readonly<LoadingProps>

    constructor(props: {} | Readonly<{}>) {
        super(props)
    }

    render(): React.ReactNode {
        const style = {
            ...styles.container,
            ...this.props
        }
        return (
            <div
                style={style}
                className="position-absolute d-flex justify-content-center align-items-center">
                <div className="spinner-border text-secondary" style={{width: '50px', height: '50px'}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}

const styles: {
    container: React.CSSProperties
} = {
    container: {
        width: '80%',
        height: '80vh',
        top: '5vh',
        right: '6vw',
    }
}