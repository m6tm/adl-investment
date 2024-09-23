import { isNull, isUndefined } from "lodash";
import React, { Suspense } from "react";
import { createTodoTag, deleteTodoTag, setTodoTag } from "../API/pages/todo";
import { TASK_USER } from "../data/data";
import { ERROR_STATUS } from "../enums/invoice";
import { TODO_PANEL_MODE, TODO_PANEL_STATE, TODO_TASK_CATEGORY } from "../enums/todo";
import { debugge, sleep } from "../functions/tools";
import { TaskUser, TodoLeftProps, TodoLeftState, TodoTag } from "../interfaces/pages/todo";
import Loading from "../Loading";
import SafeRaiseError from "../SafeRaiseError";
import PanelSide from "./PanelSide";
import { showToast } from "../functions/toast";


export default class LeftSideBars extends React.Component {
        props!: Readonly<TodoLeftProps>;
        state: Readonly<TodoLeftState>
        constructor(props: Readonly<{}>) {
                super(props)
                this.state = {
                        selectedTag: {
                                id: 0,
                                name: '',
                                label: '',
                        },
                }
        }

        selectTag = (tag: TodoTag) => {
                this.setState({
                        ...this.state, ...{
                                selectedTag: tag
                        }
                })
        }

        updateTag = async () => {
                if (isUndefined(this.state.selectedTag.id) || this.state.selectedTag.id <= 0) {
                        this.props.buildError(ERROR_STATUS.DANGER, [])
                        await sleep(200)
                        const response = await createTodoTag(this.props.tk, this.props.origin, this.state.selectedTag)

                        if (response.code == 200 && response.response.code == 200) {
                                await this.props.updateTodo()
                                showToast("Set tag completed successfully !!", "success")
                                return
                        }
                        this.props.buildError(ERROR_STATUS.DANGER, response.response.errors ?? ['Unknow error source'])
                        return
                }
                
                if (this.state.selectedTag.name.length < 3) return
                this.props.buildError(ERROR_STATUS.SUCCESS, [])
                await sleep(200)

                const response = await setTodoTag(this.props.tk, this.props.origin, this.state.selectedTag)
                if (response.code !== 200 || response.response.code !== 200) {
                        this.props.buildError(ERROR_STATUS.DANGER, response.response.errors ?? ['Unknow error source'])
                        return
                }
                await this.props.updateTodo()
        }

        deleteTag = async () => {
                if (isUndefined(this.state.selectedTag.id) || this.state.selectedTag.id <= 0) {
                        this.props.buildError(ERROR_STATUS.DANGER, [
                                'Invalid tag or not tag selected'
                        ])
                        return
                }
                this.props.buildError(ERROR_STATUS.SUCCESS, [])
                const response = await deleteTodoTag(this.props.tk, this.props.origin, this.state.selectedTag)
                if (response.code !== 200 || response.response.code !== 200) {
                        this.props.buildError(ERROR_STATUS.DANGER, response.response.errors ?? ['Unknow error source'])
                        return
                }
                await this.props.updateTodo()
                showToast("Deleted successfully !!", "success")
        }

        setTagName = (name: string) => this.setState({ ...this.state, ...{ selectedTag: { ...this.state.selectedTag, ...{ name } } } })

        setTagColor = (label: string) => this.setState({ ...this.state, ...{ selectedTag: { ...this.state.selectedTag, ...{ label } } } })

        createTagName = (name: string) => this.setState({ ...this.state, ...{ selectedTag: { ...this.state.selectedTag, ...{ name } } } })

        createTagColor = (label: string) => this.setState({ ...this.state, ...{ selectedTag: { ...this.state.selectedTag, ...{ label } } } })

        resetTag = () => this.setState({ ...this.state, ...{ selectedTag: { id: 0, name: '', label: '' } } })

	displayPanel = async (task_user: TaskUser) => {
		this.props.setTaskUser(task_user, TODO_PANEL_MODE.CREATE)
		await sleep(200)
		this.props.setPanelState(TODO_PANEL_STATE.SHOW)
	}

        render(): React.ReactNode {
                return <SafeRaiseError>
                        <Suspense fallback={<Loading />}>
                                <div className="sidebar-left">
                                        <div className="sidebar">
                                                <div className="todo-sidebar d-flex">
                                                        <span className="sidebar-close-icon">
                                                                <i className="bx bx-x"></i>
                                                        </span>
                                                        {/* <!-- todo app menu -. */}
                                                        <div className="todo-app-menu">
                                                                <div className="form-group text-center add-task">
                                                                        {/* <!-- new task button -. */}
                                                                        <button
                                                                                type="button"
                                                                                className="btn btn-primary add-task-btn btn-block my-1"
                                                                                onClick={() => this.displayPanel(TASK_USER)}>
                                                                                <i className="bx bx-plus"></i>
                                                                                <span>New Task</span>
                                                                        </button>
                                                                </div>
                                                                {/* <!-- sidebar list start -. */}
                                                                <div className="sidebar-menu-list">
                                                                        <div className="list-group">
                                                                                <a
                                                                                        href="#"
                                                                                        className={`list-group-item border-0${this.props.task_category == TODO_TASK_CATEGORY.ALL ? ' active' : ''}`}
                                                                                        onClick={() => this.props.setTaskCategory(TODO_TASK_CATEGORY.ALL)}>
                                                                                        <span className="fonticon-wrap mr-50">
                                                                                                <i className="livicon-evo"
                                                                                                        data-options="name: list.svg; size: 24px; style: lines; strokeColor:#5A8DEE; eventOn:grandparent;"></i>
                                                                                        </span>
                                                                                        <span> All</span>
                                                                                </a>
                                                                        </div>
                                                                        <label className="filter-label mt-2 mb-1 pt-25">Filters</label>
                                                                        <div className="list-group">
                                                                                <a
                                                                                        href="#"
                                                                                        className={`list-group-item border-0${this.props.task_category == TODO_TASK_CATEGORY.FAVORITE ? ' active' : ''}`}
                                                                                        onClick={() => this.props.setTaskCategory(TODO_TASK_CATEGORY.FAVORITE)}>
                                                                                        <span className="fonticon-wrap mr-50">
                                                                                                <i className="livicon-evo"
                                                                                                        data-options="name: star.svg; size: 24px; style: lines; strokeColor:#475f7b; eventOn:grandparent;"></i>
                                                                                        </span>
                                                                                        <span className="favoriting">Favourites</span>
                                                                                </a>
                                                                                <a
                                                                                        href="#"
                                                                                        className={`list-group-item border-0${this.props.task_category == TODO_TASK_CATEGORY.DONE ? ' active' : ''}`}
                                                                                        onClick={() => this.props.setTaskCategory(TODO_TASK_CATEGORY.DONE)}>
                                                                                        <span className="fonticon-wrap mr-50">
                                                                                                <i className="livicon-evo"
                                                                                                        data-options="name: check.svg; size: 24px; style: lines; strokeColor:#475f7b; eventOn:grandparent;"></i>
                                                                                        </span>
                                                                                        <span className="doning">Done</span>
                                                                                </a>
                                                                                <a
                                                                                        href="#"
                                                                                        className={`list-group-item border-0${this.props.task_category == TODO_TASK_CATEGORY.DELETE ? ' active' : ''}`}
                                                                                        onClick={() => this.props.setTaskCategory(TODO_TASK_CATEGORY.DELETE)}>
                                                                                        <span className="fonticon-wrap mr-50">
                                                                                                <i className="livicon-evo"
                                                                                                        data-options="name: trash.svg; size: 24px; style: lines; strokeColor:#475f7b; eventOn:grandparent;"></i>
                                                                                        </span>
                                                                                        <span className="deleting">Deleted</span>
                                                                                </a>
                                                                        </div>

                                                                        <button
                                                                                type="button"
                                                                                className="btn btn-primary btn-block my-1"
                                                                                data-toggle="modal"
                                                                                data-target="#new-label"
                                                                                onClick={this.resetTag}>
                                                                                <i className="bx bx-plus"></i>
                                                                                <span>New Tag</span>
                                                                        </button>

                                                                        <label className="filter-label mt-2 mb-1 pt-25">
                                                                                Tags
                                                                        </label>
                                                                        <div className="list-group">
                                                                                {
                                                                                        this.props.tags.map((tag, index) => <React.Fragment key={index}>
                                                                                                <a
                                                                                                        href="#"
                                                                                                        data-toggle="modal"
                                                                                                        data-target={`#edit-1`}
                                                                                                        onClick={() => this.selectTag(tag)}
                                                                                                        className="list-group-item border-0 d-flex align-items-center justify-content-between text-capitalize">
                                                                                                        <span>{tag.name}</span>
                                                                                                        <span className="bullet bullet-sm" style={{ backgroundColor: tag.label }}></span>
                                                                                                </a>

                                                                                                <div className="modal fade text-left" id={`edit-1`} tabIndex={-1} role="dialog" aria-hidden="true">
                                                                                                        <div className="modal-dialog modal-dialog-scrollable" role="document">
                                                                                                                <div className="modal-content">
                                                                                                                        <div className="modal-body">
                                                                                                                                <div>
                                                                                                                                        <p>Tag Modification</p>
                                                                                                                                </div>
                                                                                                                                <div className="mb-1">
                                                                                                                                        <label htmlFor="name">Nom :</label>
                                                                                                                                        <input type="text" className="form-control form-control-sm" name="name" value={this.state.selectedTag.name} onChange={e => this.setTagName(e.target.value)} />
                                                                                                                                </div>
                                                                                                                                <div className="mb-1">
                                                                                                                                        <label htmlFor="color" className="mr-2">Color :</label>
                                                                                                                                        <input type="color" name="label" value={this.state.selectedTag.label} onChange={e => this.setTagColor(e.target.value)} />
                                                                                                                                </div>
                                                                                                                                <div>
                                                                                                                                        <button
                                                                                                                                                type="submit"
                                                                                                                                                className="btn btn-sm btn-light-primary mr-2"
                                                                                                                                                data-dismiss="modal"
                                                                                                                                                onClick={this.updateTag}>
                                                                                                                                                Update
                                                                                                                                        </button>
                                                                                                                                        <button
                                                                                                                                                type="submit"
                                                                                                                                                className="btn btn-sm btn-light-danger"
                                                                                                                                                data-dismiss="modal"
                                                                                                                                                onClick={this.deleteTag}>
                                                                                                                                                Delete
                                                                                                                                        </button>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </React.Fragment>)
                                                                                }
                                                                        </div>
                                                                </div>
                                                                {/* <!-- sidebar list end -. */}
                                                        </div>
                                                </div>
                                                {/* <!-- todo new task sidebar -. */}
                                                {
                                                        isNull(this.props.task_user) ? null :
                                                        <PanelSide {...{
                                                                buildError: this.props.buildError,
                                                                tk: this.props.tk,
                                                                origin: this.props.origin,
                                                                tags: this.props.tags,
                                                                mode: this.props.panel_mode,
                                                                panel_is_visible: this.props.panel_is_visible,
                                                                setPanelState: this.props.setPanelState,
                                                                updateTodo: this.props.updateTodo,
                                                                task_user: this.props.task_user,
                                                                company_member: this.props.company_member,
                                                                setTaskUser: this.props.setTaskUser,
                                                        }} />
                                                }

                                                {/* <!-- todo new label sidebar -. */}
                                                <div className="modal fade text-left" id="new-label" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel1"
                                                        aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-scrollable" role="document">
                                                                <div className="modal-content">
                                                                        <div className="modal-body">
                                                                                <div>
                                                                                        <p>Create a new Tag</p>
                                                                                </div>
                                                                                <div className="mb-1">
                                                                                        <label htmlFor="name">Nom :</label>
                                                                                        <input
                                                                                                type="text"
                                                                                                className="form-control form-control-sm"
                                                                                                name="name"
                                                                                                value={this.state.selectedTag.name}
                                                                                                onChange={e => this.createTagName(e.target.value)} />
                                                                                </div>
                                                                                <div className="mb-1">
                                                                                        <label htmlFor="color" className="mr-2">Color :</label>
                                                                                        <input
                                                                                                type="color"
                                                                                                name="label"
                                                                                                value={this.state.selectedTag.label}
                                                                                                onChange={e => this.createTagColor(e.target.value)} />
                                                                                </div>
                                                                                <div>
                                                                                        <button
                                                                                                type="submit"
                                                                                                className="btn btn-sm btn-light-primary"
                                                                                                data-dismiss="modal"
                                                                                                onClick={this.updateTag}>Save</button>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </Suspense>
                </SafeRaiseError>
        }
}