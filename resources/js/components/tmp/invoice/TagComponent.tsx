import React from "react";
import { addTagToInvoice, createTag, deleteTag, getTags, setTag } from "../API/pages/invoice";
import { ERROR_STATUS, TAG_GROUP, TAG_VIEW_MODE } from "../enums/invoice";
import { sleep } from "../functions/tools";
import { Tag } from "../interfaces/pages/invoice";



export class TagComponent extends React.Component {

        props!: Readonly<{
                tags: Array<Tag>
                tk: string
                invoice_id?: number
                update_tag: () => Promise<void>
                buildError: (status: ERROR_STATUS, errors: Array<string>) => void
                setTag?: any
                display_mode: TAG_VIEW_MODE
                selected_tags?: Array<number>
        }>
        state: {
                selected_tag: Tag
                pending_update: boolean
                pending_delete: boolean
                pending_create: boolean
                all_tags: Array<Tag>
                tag_group: TAG_GROUP
        }
        close_modal: React.RefObject<HTMLButtonElement> = React.createRef()
        tag_name: React.RefObject<HTMLInputElement> = React.createRef()
        tag_color: React.RefObject<HTMLInputElement> = React.createRef()

        constructor(props: Readonly<{}>) {
                super(props)
                this.state = {
                        selected_tag: {
                                id: 0,
                                companie_id: 0,
                                name: '',
                                label: ''
                        },
                        pending_update: false,
                        pending_delete: false,
                        pending_create: false,
                        all_tags: [],
                        tag_group: TAG_GROUP.INVOICE,
                }
        }

        async componentDidMount() {
                let tags = await getTags(this.props.tk)

                if (tags.code !== 200) return
                this.setState({ ...this.state, ...{ all_tags: tags.response.tags } })
        }

        select_tag = async (tag_id: number) => {
                let tags = this.props.tags.filter(tag => tag.id == tag_id)
                if (tags.length == 0) return
                this.setState({ ...this.state, ...{ selected_tag: tags.at(0)! } })
        }

        add_tag = async (id: number) => {
                if (!('invoice_id' in this.props) || this.state.tag_group == TAG_GROUP.INVOICE) return
                const invoice_id: any = this.props.invoice_id
                let add_request = await addTagToInvoice(this.props.tk, invoice_id, id)

                if (add_request.code !== 200) {
                        this.props.buildError(ERROR_STATUS.DANGER, add_request.response.errors || ['Server error'])
                        return
                }

                this.props.update_tag()
        }

        set_tag_label = (name: string) => this.setState({ ...this.state, ...{ selected_tag: { ...this.state.selected_tag, ...{ name } } } })

        set_tag_color = (label: string) => this.setState({ ...this.state, ...{ selected_tag: { ...this.state.selected_tag, ...{ label } } } })

        delete = async () => {
                if (this.state.selected_tag.id == 0) return
                this.setState({ ...this.state, ...{ pending_delete: true } })
                let tag = await deleteTag(this.props.tk, this.state.selected_tag, this.state.tag_group, this.props.invoice_id)

                if (tag.code !== 200) {
                        this.props.buildError(ERROR_STATUS.DANGER, tag.response.errors! || ['Server error'])
                        await sleep(1000)
                        this.setState({ ...this.state, ...{ pending_delete: false } })
                        return
                }

                await this.props.update_tag()
                await sleep(1000)
                this.close_modal.current!.click()
                this.props.buildError(ERROR_STATUS.SUCCESS, ['Successfuly saved !!!'])
                await sleep(1000)
                this.setState({ ...this.state, ...{ pending_delete: false } })
                await sleep(1000)
                this.clear_form()
        }

        update = async () => {
                if (this.state.selected_tag.id == 0) return
                this.setState({ ...this.state, ...{ pending_update: true } })
                let tag = await setTag(this.props.tk, this.state.selected_tag)

                if (tag.code !== 200) {
                        this.props.buildError(ERROR_STATUS.DANGER, tag.response.errors!)
                        await sleep(1000)
                        this.setState({ ...this.state, ...{ pending_update: false } })
                        return
                }

                await this.props.update_tag()
                await sleep(1000)
                this.close_modal.current!.click()
                this.props.buildError(ERROR_STATUS.SUCCESS, ['Successfuly saved !!!'])
                await sleep(1000)
                this.setState({ ...this.state, ...{ pending_update: false } })
                await sleep(1000)
                this.clear_form()
        }

        clear_form = () => this.setState({
                ...this.state,
                ...{
                        selected_tag: {
                                id: 0,
                                companie_id: 0,
                                name: '',
                                label: ''
                        }
                }
        })

        createTag = async () => {
                if (this.state.selected_tag.name.length <= 3) {
                        this.props.buildError(ERROR_STATUS.DANGER, ['The tag name must contain at least 3 characters'])
                        return
                }

                if (!/^#[A-Za-z0-9]{6}$/.test(this.state.selected_tag.label)) {
                        this.props.buildError(ERROR_STATUS.DANGER, ['Invalid tag color'])
                        return
                }
                this.props.buildError(ERROR_STATUS.SUCCESS, [])

                let response = await createTag(this.props.tk, this.state.selected_tag)

                switch (response.code) {
                        case 200:
                                this.props.buildError(ERROR_STATUS.SUCCESS, ['Success !!!'])
                                this.props.update_tag()
                                break;

                        case 421:
                                this.props.buildError(ERROR_STATUS.DANGER, response.response.errors!)
                                break;

                        default:
                                this.props.buildError(ERROR_STATUS.DANGER, ['Server Error !'])
                                break;
                }
        }

        selected_tag = (tag_id: number) => {
                if ('setTag' in this.props) this.props.setTag(tag_id)
        }

        displayTagListItem = (tag: Tag, key: number) => {
                let data_target = "",
                        on_click: Function = (tag_id: number) => null

                data_target = this.props.display_mode == TAG_VIEW_MODE.UPDATE ? "#tagSelectorModalEdit" : data_target
                on_click = this.props.display_mode == TAG_VIEW_MODE.UPDATE ? this.select_tag : on_click

                return (
                        <li
                                key={key}
                                className="w-100 d-flex justify-content-between align-items-center cursor-pointer text-capitalize flex-wrap"
                                data-toggle="modal"
                                data-target={data_target}
                                onClick={async () => {
                                        if (this.props.display_mode == TAG_VIEW_MODE.WRITE) this.selected_tag(tag.id)
                                        on_click(tag.id)
                                }
                                }>
                                {
                                        this.props.display_mode == TAG_VIEW_MODE.WRITE ? <>
                                                <span className="flex-grow-1">
                                                        <div className="custom-control custom-checkbox">
                                                                <input
                                                                        type="checkbox"
                                                                        className="custom-control-input"
                                                                        id={`customCheck${tag.id}`}
                                                                        name="tag"
                                                                        checked={this.props.selected_tags && this.props.selected_tags.filter(id => id == tag.id).length > 0 ? true : false}
                                                                        onChange={async () => {
                                                                                this.select_tag(tag.id)
                                                                                await sleep(500)
                                                                                this.selected_tag(tag.id)
                                                                        }
                                                                        } />
                                                                <label className="custom-control-label" htmlFor={`customCheck${tag.id}`}>
                                                                        <strong className="text-capitalize">{tag.name}</strong>
                                                                </label>
                                                        </div>
                                                </span>
                                        </> : <strong className="text-capitalize">{tag.name}</strong>
                                }
                                <div className="flex-grow-1 d-flex align-items-center justify-content-end">
                                        {
                                                this.props.display_mode !== TAG_VIEW_MODE.UPDATE ?
                                                        <a onClick={async e => {
                                                                this.select_tag(tag.id)
                                                                await sleep(1000)
                                                                this.delete()
                                                        }
                                                        } className="text-danger mr-2">
                                                                <i className="bx bx-trash"></i>
                                                        </a> : null
                                        }
                                        {
                                                this.props.display_mode == TAG_VIEW_MODE.WRITE ?
                                                        <a
                                                                onClick={async () => {
                                                                        this.select_tag(tag.id)
                                                                }}
                                                                data-toggle="modal"
                                                                data-target={"#tagSelectorModalEdit"}
                                                                className="text-primary mr-2">
                                                                <i className="bx bx-pencil"></i>
                                                        </a> : null
                                        }
                                        <span>
                                                <span
                                                        style={{ backgroundColor: tag.label }}
                                                        className="badge badge-pill d-block"></span>
                                        </span>
                                </div>
                        </li>
                )
        }

        render(): React.ReactNode {
                return (
                        <div className="card-body p-0">
                                <div className="invoice-action-btn mb-1 mt-1 mx-0">
                                        <hr className="w-50 mt-2" />
                                        <h5 className="text-uppercase text-muted d-flex justify-content-between align-items-center mb-2">
                                                Invoice Tags:
                                                {
                                                        this.props.display_mode == TAG_VIEW_MODE.WRITE ?
                                                                <button
                                                                        className="btn btn-sm btn-light-info add-invoice-tag"
                                                                        data-toggle="modal"
                                                                        data-target={"#tagSelectorModalCreate"}>
                                                                        <i className="bx bx-plus"></i>
                                                                </button> : null
                                                }
                                        </h5>

                                        {
                                                this.props.display_mode == TAG_VIEW_MODE.WRITE ?
                                                        <div className="modal fade" id="tagSelectorModalCreate" tabIndex={-1} role="dialog" aria-labelledby="tagSelectorModalCreateTitle" aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                                        <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                        <h5 className="modal-title" id="exampleModalLongTitle">Create a new Invoice Tag</h5>
                                                                                        <button type="button" className="close text-danger" data-dismiss="modal" aria-label="Close" ref={this.close_modal}>
                                                                                                <span aria-hidden="true">&times;</span>
                                                                                        </button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                        <form action="" className="container" onSubmit={e => e.preventDefault()}>
                                                                                                <div className=" form-row mb-2">
                                                                                                        <label htmlFor="m-from" className="text-muted">Tag Name:</label>
                                                                                                        <input type="email" id="m-from" className="form-control form-control-sm shadow-none" value={this.state.selected_tag.name} onChange={e => this.set_tag_label(e.target.value)} />
                                                                                                </div>

                                                                                                <div className=" form-row mb-2">
                                                                                                        <label htmlFor="m-from" className="text-muted">Tag Color:</label>
                                                                                                        <input type="color" ref={this.tag_color} id="m-from" className="form-control form-control-sm shadow-none" value={this.state.selected_tag.label} onChange={e => this.set_tag_color(e.target.value)} />
                                                                                                </div>
                                                                                        </form>
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                        <button
                                                                                                type="button"
                                                                                                className={`btn btn-light-success`}
                                                                                                onClick={this.createTag}>
                                                                                                {
                                                                                                        this.state.pending_create ? (
                                                                                                                <div className="spinner-border text-secondary" style={{ width: '20px', height: '20px' }} role="status">
                                                                                                                        <span className="sr-only">Loading...</span>
                                                                                                                </div>
                                                                                                        ) : 'Create'
                                                                                                }
                                                                                        </button>
                                                                                        <button
                                                                                                type="button"
                                                                                                className={`btn btn-light-danger`}
                                                                                                data-dismiss="modal">
                                                                                                Cancel
                                                                                        </button>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div> : null
                                        }

                                        <ul className="m-0 p-0 list-unstyled tag-list">
                                                {
                                                        this.props.tags.map((tag, key) => this.displayTagListItem(tag, key))
                                                }
                                        </ul>

                                        {
                                                this.props.display_mode == TAG_VIEW_MODE.UPDATE || this.props.display_mode == TAG_VIEW_MODE.WRITE ?
                                                        <div className="modal fade" id="tagSelectorModalEdit" tabIndex={-1} role="dialog" aria-labelledby="tagSelectorModalEditTitle" aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                                        <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                        <h5 className="modal-title" id="exampleModalLongTitle">Update the Invoice Tag</h5>
                                                                                        <button type="button" className="close text-danger" data-dismiss="modal" aria-label="Close" ref={this.close_modal}>
                                                                                                <span aria-hidden="true">&times;</span>
                                                                                        </button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                        <form action="" className="container" onSubmit={e => e.preventDefault()}>
                                                                                                <div className=" form-row mb-2">
                                                                                                        <label htmlFor="m-from" className="text-muted">Tag Name:</label>
                                                                                                        <input type="email" id="m-from" className="form-control form-control-sm shadow-none" value={this.state.selected_tag.name} onChange={e => this.set_tag_label(e.target.value)} />
                                                                                                </div>

                                                                                                <div className=" form-row mb-2">
                                                                                                        <label htmlFor="m-from" className="text-muted">Tag Color:</label>
                                                                                                        <input type="color" ref={this.tag_color} id="m-from" className="form-control form-control-sm shadow-none" value={this.state.selected_tag.label} onChange={e => this.set_tag_color(e.target.value)} />
                                                                                                </div>
                                                                                        </form>
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                        <button
                                                                                                type="button"
                                                                                                className={`btn btn-light-success`}
                                                                                                onClick={this.update}>
                                                                                                {
                                                                                                        this.state.pending_update ? (
                                                                                                                <div className="spinner-border text-secondary" style={{ width: '20px', height: '20px' }} role="status">
                                                                                                                        <span className="sr-only">Loading...</span>
                                                                                                                </div>
                                                                                                        ) : 'Update'
                                                                                                }
                                                                                        </button>
                                                                                        <button
                                                                                                type="button"
                                                                                                className={`btn btn-light-danger`}
                                                                                                onClick={this.delete}>
                                                                                                Delete
                                                                                        </button>
                                                                                        <button
                                                                                                type="button"
                                                                                                className={`btn btn-light-danger`}
                                                                                                data-dismiss="modal">
                                                                                                Cancel
                                                                                        </button>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div> : null
                                        }
                                </div>
                        </div>
                )
        }
}