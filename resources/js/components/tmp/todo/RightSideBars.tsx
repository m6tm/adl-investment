import React, { Suspense } from "react";
import { TODO_PANEL_MODE, TODO_PANEL_STATE, TODO_TASK_CATEGORY } from "../enums/todo";
import { sleep } from "../functions/tools";
import { TaskUser, TodoRightProps } from "../interfaces/pages/todo";
import Loading from "../Loading";
import SafeRaiseError from "../SafeRaiseError";
import TaskItem from "./TaskItem";


export default class RightSideBars extends React.Component {
	props!: Readonly<TodoRightProps>
	constructor(props: Readonly<{}>) {
		super(props)
	}

	displayPanel = async (task_user: TaskUser) => {
		if (this.props.task_category == TODO_TASK_CATEGORY.DELETE) return
		this.props.setTaskUser(task_user, TODO_PANEL_MODE.UPDATE)
		await sleep(200)
		this.props.setPanelState(TODO_PANEL_STATE.SHOW)
	}
	
	hidePanel = async () => {
		this.props.setTaskUser(null, TODO_PANEL_MODE.CREATE)
		await sleep(200)
		this.props.setPanelState(TODO_PANEL_STATE.HIDE)
	}

	render(): React.ReactNode {
		return <SafeRaiseError>
			<Suspense fallback={<Loading />}>
				<div className="content-right">
					<div className="content-overlay"></div>
					<div className="content-wrapper">
						<div className="content-header row">
						</div>
						<div className="content-body">
							<div
								className={`app-content-overlay${this.props.panel_is_visible ? ' show' : ''}`}
								onClick={this.hidePanel}
								style={{ zIndex: 97 }}></div>
							<div className="todo-app-area">
								<div className="todo-app-list-wrapper">
									<div className="todo-app-list">
										<div className="todo-fixed-search d-flex justify-content-between align-items-center">
											<div className="sidebar-toggle d-block d-lg-none">
												<i className="bx bx-menu"></i>
											</div>
											<fieldset className="form-group position-relative has-icon-left m-0 flex-grow-1">
												<input
													type="text"
													className="form-control todo-search"
													placeholder="Search Task"
													value={this.props.search_text}
													onChange={e => this.props.searchText(e.target.value)} />
												<div className="form-control-position">
													<i className="bx bx-search"></i>
												</div>
											</fieldset>
											<div className="todo-sort dropdown mr-1">
												<button className="btn dropdown-toggle sorting" type="button" id="sortDropdown" data-toggle="dropdown"
													aria-haspopup="true" aria-expanded="false">
													<i className="bx bx-filter"></i>
													<span>Sort</span>
												</button>
												<div className="dropdown-menu dropdown-menu-right" aria-labelledby="sortDropdown">
													<a className="dropdown-item ascending" href="#">Ascending</a>
													<a className="dropdown-item descending" href="#">Descending</a>
												</div>
											</div>
										</div>
										<div className="todo-task-list list-group">
											{/* <!-- task list start --> */}
											<ul className="todo-task-list-wrapper list-unstyled" id="todo-task-list-drag">
												{
													this.props.tasks.map((task, key) => (
														<TaskItem
															key={key}
															onClick={e => {
																const element = e?.target as HTMLElement
																if (!element.classList.contains('bx-trash') && !element.classList.contains('bx-star') && !element.classList.contains('for-input')) {
																	this.displayPanel(task)
																}
															}}
															{...{
																buildError: this.props.buildError,
																task_user: task,
																task_category: this.props.task_category,
																tk: this.props.tk,
																origin: this.props.origin,
																updateTodo: this.props.updateTodo,
																setPanelState: this.props.setPanelState,
															}} />
													))
												}
											</ul>
											{/* <!-- task list end --> */}
											<div className="no-results">
												<h5>No Task Found</h5>
											</div>

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