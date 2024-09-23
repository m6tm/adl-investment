import React from "react";


export default class Advantage extends React.Component {
    constructor(props: Readonly<any>) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div className="invoice-product-details ">
                <div className="row mb-50">
                    <div className="col-3 col-md-4 invoice-item-title">Advantages</div>
                </div>
                <section className="form invoice-item-repeater">
                    <div data-repeater-list="advantages">
                        <div data-repeater-item>
                            <div className="mb-1">
                                <div className="row pt-1">
                                    <div className="col-9">
                                        <input type="text" className="form-control" placeholder="type an adventage here" name="description" />
                                    </div>
                                    <div className="col-3">
                                        <button className="btn btn-sm btn-danger" type="button" data-repeater-delete>Cancel <i className="bx bx-x"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col p-0">
                            <button className="btn btn-light-primary btn-sm" data-repeater-create type="button">
                                <i className="bx bx-plus"></i>
                                <span className="invoice-repeat-btn">Add Item</span>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}