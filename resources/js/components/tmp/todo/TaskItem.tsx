import { isNull } from "lodash";
import React from "react";
import { taskComplete, taskDelete, taskRestore, taskStar } from "../API/pages/todo";
import { ERROR_STATUS } from "../enums/invoice";
import { TODO_TASK_CATEGORY } from "../enums/todo";
import { sleep } from "../functions/tools";
import { TaskItemProps, TaskUser, TodoTask } from "../interfaces/pages/todo";
import { showToast } from "../functions/toast";



export default class TaskItem extends React.Component {
	props!: Readonly<TaskItemProps>;

	constructor(props: Readonly<{}>) {
		super(props)
	}

	taskStar = async (task: TodoTask) => {
		this.props.buildError(ERROR_STATUS.SUCCESS, [])
		await sleep(200)
		let response = await taskStar(this.props.tk, this.props.origin, task)

		if (response.code == 200 && response.response.code == 200) {
			await this.props.updateTodo()
                        showToast("Starred successfully !!", "success")
			return
		}
		this.props.buildError(ERROR_STATUS.DANGER, response.response.errors ?? ['Unknow error source'])
	}

	taskDelete = async (task: TodoTask) => {
		this.props.buildError(ERROR_STATUS.SUCCESS, [])
		await sleep(200)
		let response = await taskDelete(this.props.tk, this.props.origin, task)

		if (response.code == 200 && response.response.code == 200) {
			await this.props.updateTodo()
                        showToast("Delete todo completed successfully !!", "success")
			return
		}
		this.props.buildError(ERROR_STATUS.DANGER, response.response.errors ?? ['Unknow error source'])
	}

	taskDeleteDefinitely = async (task: TodoTask) => {
		this.props.buildError(ERROR_STATUS.SUCCESS, [])
		await sleep(200)
		let response = await taskDelete(this.props.tk, this.props.origin, task, true)

		if (response.code == 200 && response.response.code == 200) {
			await this.props.updateTodo()
                        showToast("Delete todo definitely successfully !!", "success")
			return
		}
		this.props.buildError(ERROR_STATUS.DANGER, response.response.errors ?? ['Unknow error source'])
	}

	taskRestore = async (task: TodoTask) => {
		this.props.buildError(ERROR_STATUS.SUCCESS, [])
		await sleep(200)
		let response = await taskRestore(this.props.tk, this.props.origin, task)

		if (response.code == 200 && response.response.code == 200) {
			await this.props.updateTodo()
                        showToast("Restore todo completed successfully !!", "success")
			return
		}
		this.props.buildError(ERROR_STATUS.DANGER, response.response.errors ?? ['Unknow error source'])
	}

	taskComplete = async (task: TodoTask) => {
		this.props.buildError(ERROR_STATUS.SUCCESS, [])
		await sleep(200)
		let response = await taskComplete(this.props.tk, this.props.origin, task)

		if (response.code == 200 && response.response.code == 200) {
			await this.props.updateTodo()
                        showToast("Completed successfully !!", "success")
			return
		}
		this.props.buildError(ERROR_STATUS.DANGER, response.response.errors ?? ['Unknow error source'])
	}

	extractUnauthorizedCharacters = (htmlText: string) => {
		let html = (new DOMParser()).parseFromString(htmlText, 'text/html').querySelector('body')
		html?.querySelectorAll('*').forEach(element => {
			if (element instanceof HTMLImageElement || element instanceof HTMLLinkElement) element.remove()
		})
		return html!.innerHTML
	}

	taskDisplayAuthorization = (task_user: TaskUser) => {
		const deleted_definitely = task_user.task.deleted_definitely == 1
		const deleted = !isNull(task_user.deleted_at)

		return !deleted_definitely || !deleted
	}

	render(): React.ReactNode {
		const { origin, task_user: { task, user, access } } = this.props
		const token = task.id
		return task.deleted_definitely == 0 ? <li onClick={this.props.onClick}
			className={`todo-item todo-item-li ${task.status == 1 ? 'completed' : ''}`}
			style={{ zIndex: 95 }}>
			<div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
				<div className="todo-title-area d-flex align-items-center">
					<i className='bx bx-grid-vertical handle'></i>
					<div className="checkbox">
						<input
							type="checkbox"
							onChange={() => this.taskComplete(task)}
							checked={task.status == 1}
							className="checkbox-input for-input"
							id={`checkbox${token}`}
						/>
						<label htmlFor={`checkbox${token}`} className="for-input"></label>
					</div>
					<p className="mx-50 m-0 truncate d-flex align-items-center">
						<span className="todo-title todo-title-sp mr-2">{task.name}</span>|
							<span
								dangerouslySetInnerHTML={{ __html: this.extractUnauthorizedCharacters(task.description) }}
								className="todo-date-sp ml-2 number-of-line-1"
								style={{ height: '25px' }}></span>
					</p>
				</div>
				<div className="todo-item-action d-flex align-items-center">
					<div className="todo-badge-wrapper d-flex">
						{
							task.labels.map((label, key) => (
								<span key={key} className="badge badge-pill ml-50"
									style={{ backgroundColor: label.label.label }}>{label.label.name}</span>
							))
						}
					</div>
					<div className="avatar ml-1">
						<img src={`${origin}/${user.avatar}`}
							alt="avatar" height="30" width="30" />
					</div>
					{
						access == "1" ? <i className="bx bx-share-alt text-primary ml-1" title="Shared"></i> : null
					}
					{
						task.is_copy == 1 ? <i className="bx bx-copy-alt ml-1" title="This is a copy of another task"></i> : null
					}
					<a href="#" onClick={() => this.taskStar(task)}
						className={`todo-item-favorite ml-75${!isNull(task.deleted_at) ? ' hidden' : ''}${task.favorite == 0 ? '' : ' warning'}`}>
						<i className="bx bx-star bxs-star"></i>
					</a>
					{
						this.props.task_category == TODO_TASK_CATEGORY.DELETE ?
							(
								<>
									<a
										href="#"
										className='todo-item-delete ml-75 text-primary'
										onClick={() => this.taskRestore(task)}>
										<i className="bx bx-reset"></i>
									</a>
									<a
										href="#"
										className='todo-item-delete ml-75 text-danger'
										type="button"
										data-toggle="modal"
										data-target="#DeleteForever">
										<i className="bx bx-trash"></i>
									</a>
									<div className="modal fade position-fixed" id="DeleteForever" tabIndex={-1} role="dialog" aria-labelledby="DeleteForeverTitle" aria-hidden="true">
										<div className="modal-dialog modal-dialog-centered" role="document">
											<div className="modal-content">
												<div className="modal-header">
													<h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
													<button type="button" className="close" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
												<div className="modal-body">
													Please note that this action is irreversible.
												</div>
												<div className="modal-footer">
													<button type="button" className="btn btn-sm btn-light-primary" data-dismiss="modal">Cancel</button>
													<button
														type="button"
														className="btn btn-sm btn-light-danger"
														onClick={() => this.taskDeleteDefinitely(task)}>Delete definitely</button>
												</div>
											</div>
										</div>
									</div>
								</>
							) :
							<a href="#" onClick={() => this.taskDelete(task)} className='todo-item-delete ml-75 text-danger'>
								<i className="bx bx-trash"></i>
							</a>
					}
				</div>
			</div>
		</li> : <section></section>
	}
}