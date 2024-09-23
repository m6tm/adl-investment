import React from "react";
import { createRoot } from "react-dom/client";
import Advantage from "../adventages/Advantage";
import { showToast } from "../../functions/toast";
import { AdvantageProps, AdvantageState } from "../../types/advantages";
import { getHook } from "../../functions/tools";
import { createAdvantage } from "../../API/admin/adventage";


export default class CreatePackage extends React.Component {

    state: Readonly<AdvantageState>
    props!: Readonly<AdvantageProps>;
    formRef: React.RefObject<HTMLFormElement> = React.createRef();
    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            images: [],
            files: []
        }
    }

    onSubmit = async () => {
        const form = this.formRef.current;
        if (!form) {
            showToast("Not form found", "danger").showToast()
            return;
        }

        const form_data = new FormData(form);
        form_data.delete("images");
        this.state.files.forEach((file, index) => form_data.append(`images[${index}]`, file));
        const respose = await createAdvantage(this.props.token, form_data)
        console.log(respose);
    }

    onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        event.target.files = null;
        if (files) {
            const images = Array.from(files).map(file => URL.createObjectURL(file));
            const _files = Array.from(files).map(file => file);
            this.setState({ ...this.state, ...{ images, files: _files } });
        }
    }

    render() {
        return (
            <form className="form form-horizontal" ref={this.formRef}  action="{{ route('package.store') }}" method="POST">
                <div className="form-body py-2">
                    <h4 className="text-uppercase">Product informations</h4>
                    <div className="row mt-2">
                        <div className="col-12 mb-2">
                            {
                                this.state.images.map((image, index) => (
                                    <img className="m-2 rounded-lg square-124" key={index} src={image} alt={"Product imapge " + index} title={"Product imapge " + ((index + 1))} />
                                ))
                            }
                        </div>
                        

                        <div className="col-6 mb-3">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="product-active" name="active" defaultChecked />
                                <label className="custom-control-label" htmlFor="product-active">Product is availlable</label>
                            </div>
                        </div>

                        <div className="col-6 d-flex justify-content-end">
                            <span>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={this.onSubmit}
                                    type="button">
                                        Start product creation <i className="bx bx-plus"></i>
                                </button>
                            </span>
                        </div>

                        <div className="col-12 col-md-6 mb-3">
                            <label htmlFor="product-images" className="form-label">Select product images</label>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    id="product-images"
                                    accept=".png"
                                    name="images"
                                    onChange={this.onChangeFile}
                                    multiple
                                    required />
                                <label className="custom-file-label" htmlFor="product-images">Choose a product images</label>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 mb-3">
                            <label htmlFor="product-name" className="form-label">Product name</label>
                            <input type="text" className="form-control" name="name" id="product-name" placeholder="Product name" required />
                        </div>

                        <div className="col-12 col-md-6 mb-3 d-none">
                            <label htmlFor="tax-code" className="form-label">Tax Code</label>
                            <input type="text" className="form-control disabled" name="tax_code" id="tax-code" value="txcd_10102000" readOnly />
                        </div>

                        <div className="col-12 col-md-6 mb-3 d-none">
                            <label htmlFor="statement-descriptor" className="form-label">Tax Code</label>
                            <input type="text" className="form-control disabled" name="statement_descriptor" id="statement-descriptor" value="Kanban Codrock" readOnly />
                        </div>

                        <div className="col-12 col-md-6 mb-3">
                            <label htmlFor="price-id" className="form-label">Default price</label>
                            <select name="price_id" id="price-id" className="custom-select">
                                <option value="">Select a default price</option>
                            </select>
                        </div>

                        <div className="col-12 col-md-6 mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea name="description" className="form-control form-control-sm" placeholder="Describe your product here ..." rows={6} required></textarea>
                        </div>
                    </div>
                </div>

                <div className="form-body">
                    <div className="row">
                        <div className="col">
                            <Advantage />
                        </div>
                    </div>
                </div>

                <h4 className="text-uppercase my-2">Price informations</h4>
            </form>
        )
    }
}

let createPackageElement = document.getElementById('create-package');
let token = getHook()

if (createPackageElement && token) createRoot(createPackageElement).render(<CreatePackage {...{token } }/>);
