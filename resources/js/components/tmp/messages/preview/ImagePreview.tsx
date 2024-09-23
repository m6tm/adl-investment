import React, { lazy, Suspense } from "react";
import Loading from "../../Loading";
import SafeRaiseError from "../../SafeRaiseError";


export default class ImagePreview extends React.Component {
    props!: {
        key: number,
        data: File,
        removeFile: Function,
    }
    constructor(props: {} | Readonly<{}>) {
        super(props)
    }

    closeImagePreview = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        this.props.removeFile(this.props.data)
    }

    render(): React.ReactNode {
        return <SafeRaiseError>
            <Suspense fallback={<Loading />}>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-4 attachment-item">
                    <div className="attachment-body">
                        <a href="#close" onClick={e => this.closeImagePreview(e)} className="attachement-closer"><i className="bx bx-plus"></i></a>
                        <img
                            className="image"
                            src={URL.createObjectURL(this.props.data)}
                            alt={this.props.data.name} />
                    </div>
                </div>
            </Suspense>
        </SafeRaiseError>
    }
}