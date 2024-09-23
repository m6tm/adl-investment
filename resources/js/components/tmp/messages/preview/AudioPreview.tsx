import React, { lazy, Suspense } from "react";
import { extractExtension, getFileCategoryByExtension } from "../../data/chat";
import Loading from "../../Loading";
import SafeRaiseError from "../../SafeRaiseError";


export default class AutioPreview extends React.Component {
    props!: {
        key: number,
        data: File,
        removeFile: Function,
    }
    constructor(props: {} | Readonly<{}>) {
        super(props)
    }

    closeAudioPreview = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        this.props.removeFile(this.props.data)
    }

    render(): React.ReactNode {
        return <SafeRaiseError>
            <Suspense fallback={<Loading />}>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-4 attachment-item">
                    <div className="attachment-body pt-2">
                        <a href="#close" onClick={e => this.closeAudioPreview(e)} className="attachement-closer"><i className="bx bx-plus"></i></a>
                        <span className="number-of-line-1 title">{this.props.data.name}</span>
                        <audio
                            className="audio"
                            src={URL.createObjectURL(this.props.data)}
                            controls />
                    </div>
                </div>
            </Suspense>
        </SafeRaiseError>
    }
}