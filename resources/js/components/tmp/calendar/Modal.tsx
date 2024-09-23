import React from "react";
import { ModalProps, TagForm } from "../interfaces/calendar";



export default class Modal extends React.Component {
    props!: ModalProps

    constructor(props: {} | Readonly<{}>) {
        super(props)
    }

    render(): React.ReactNode {
        return (
            <div className="modal fade text-left" id="default" tabIndex={-1} role="dialog"
                aria-labelledby="myModalLabel1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                            <div className="modal-body">
                                    <div>
                                        <label>Preview :</label>
                                        <p ref={this.props.preview}>
                                            Preview text
                                        </p>
                                    </div>
                                <div className="mt-1">
                                    <label htmlFor="tag">Tag :</label>
                                    <input
                                        type="text"
                                        id="tag"
                                        className="form-control form-control-sm col-6"
                                        placeholder={this.props.action == 'create' ? 'success' : this.props.form.name}
                                        value={this.props.form.name}
                                        onChange={e => this.props.setTagName(e.target.value)}
                                        />
                                </div>
                                <div className="mt-1">
                                    <label htmlFor="color" className="d-block">Color&nbsp;:</label>
                                    <input
                                        type="color"
                                        id="color"
                                        name="color_tag"
                                        className="mr-1"
                                        value={this.props.form.color}
                                        onChange={e => this.props.setTagColor(e.target.value)}
                                        />
                                </div>
                            </div>
                            <div className="modal-footer">
                                {
                                    this.props.action == 'update' ?
                                        <button type="button" className="btn btn-danger" onClick={() => this.props.deleteTag(this.props.form?.id.toString())} data-dismiss="modal">
                                            <i className="bx bx-x d-block d-sm-none"></i>
                                            <span className="d-none d-sm-block">Delete</span>
                                        </button> :
                                        <button type="button" className="btn btn-danger" data-dismiss="modal">
                                            <i className="bx bx-x d-block d-sm-none"></i>
                                            <span className="d-none d-sm-block">Cancel</span>
                                        </button>
                                }
                                <button type="button" className="btn btn-primary ml-1" data-dismiss="modal" onClick={() => this.props.saveNewTag()}>
                                    <i className="bx bx-check d-block d-sm-none"></i>
                                    <span className="d-none d-sm-block">{ this.props.action == 'create' ? 'Save' : 'Update' }</span>
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}