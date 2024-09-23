import React, { lazy, Suspense } from "react";
import { extractExtension, getFileCategoryByExtension, getFileSizeInfo } from "../../data/chat";
import Loading from "../../Loading";
import SafeRaiseError from "../../SafeRaiseError";


export default class FilePreview extends React.Component {
    props!: {
        key: number,
        data: File,
        removeFile: Function,
    }
    constructor(props: {} | Readonly<{}>) {
        super(props)
    }

    closeFilePreview = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        this.props.removeFile(this.props.data)
    }

    render(): React.ReactNode {
        return <SafeRaiseError>
            <Suspense fallback={<Loading />}>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-4 attachment-item">
                    <div className="attachment-body fil pt-2 px-2 px-md-3">
                        <a href="#close" onClick={e => this.closeFilePreview(e)} className="attachement-closer"><i className="bx bx-plus"></i></a>
                        <i className="title number-of-line-1 w-100">{this.props.data.name}</i>
                        <i className="category d-block w-100"><strong>Type :</strong> {getFileCategoryByExtension(extractExtension(this.props.data.name)!)} [{extractExtension(this.props.data.name)?.slice(1)}]</i>
                        <i className="size d-block w-100"><strong>Size info :</strong> {getFileSizeInfo(this.props.data).value} {getFileSizeInfo(this.props.data).symbol.toUpperCase()}</i>
                    </div>
                </div>
            </Suspense>
        </SafeRaiseError>
    }
}