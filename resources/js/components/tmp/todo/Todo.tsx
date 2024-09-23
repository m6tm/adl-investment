import { isNull } from "lodash";
import React from "react";
import { createRoot } from "react-dom/client";
import { getConfig } from "../API/pages/invoice";
import { getTodo } from "../API/pages/todo";
import { ERROR_STATUS } from "../enums/invoice";
import { TODO_PANEL_MODE, TODO_PANEL_STATE, TODO_TASK_CATEGORY } from "../enums/todo";
import { getHook, sleep } from "../functions/tools";
import { Config } from "../interfaces/pages/invoice";
import { TaskUser, TodoProps, TodoState } from "../interfaces/pages/todo";
import AlertError from "../invoice/AlertError";
import Loading from "../Loading";
import LeftSideBars from "./LeftSideBars";
import RightSideBars from "./RightSideBars";

declare global {
        interface Window {
                search_is_ready: boolean
        }
}

class Todo extends React.Component {
        props!: Readonly<TodoProps>
        state: Readonly<TodoState>

        constructor(props: Readonly<{}>) {
                super(props)
                this.state = {
                        loaded: false,
                        config: { origin: location.origin } as Config,
                        tags: [],
                        tasks: [],
                        task_filter: TODO_TASK_CATEGORY.ALL,
                        tasks_filter: [],
                        task_user: null,
                        panel_mode: TODO_PANEL_MODE.CREATE,
                        company_member: [],
                        panel_is_visible: false,
                        search_text: '',
                        error: {
                                error_type: 'success',
                                errors: []
                        }
                }
        }

        componentDidMount = async (): Promise<void> => {
                const { tk: token } = this.props
                let config = await getConfig(token)
                if (config.code !== 200 || config.response.code !== 200) return

                const newState = {
                        ...this.state, ...{
                                config: config.response.config,
                        }
                }

                this.setState(newState)
                await sleep(200)
                await this.updateTodo()

                let timer = setInterval(() => {
                        let keys = new Set(Object.keys(window))
                        if (keys.has('search_is_ready') && window.search_is_ready) {
                                clearInterval(timer)
                                this.setState({ ...this.state, ...{ loaded: true } })
                        }
                }, 500)
        }

        updateTodo = async () => {
                const { tk: token } = this.props

                let todo = await getTodo(token, this.state.config.origin)
                if (todo.code !== 200 || todo.response.code !== 200) return

                const newState = {
                        ...this.state, ...{
                                tags: todo.response.tags,
                                tasks: todo.response.tasks,
                                tasks_filter: todo.response.tasks,
                                company_member: todo.response.company_member,
                        }
                }

                this.setState(newState)
                await sleep(200)
                this.taskFilter(this.state.task_filter)
                await sleep(200)
                this.setTaskCategory(this.state.task_filter)
        }

        searchText = (search_text: string) => {
                let tasks = this.taskFilterResult(this.state.task_filter),
                        tasks_filter = tasks.filter(task => `${task.task.name} ${task.task.description}`.toLowerCase().includes(search_text.toLowerCase()))

                this.setState({ ...this.state, ...{ tasks_filter, search_text } })
        }

        setPanelState = (state: TODO_PANEL_STATE) => this.setState({ ...this.state, ...{ panel_is_visible: state == TODO_PANEL_STATE.SHOW } })

        setTaskUser = (task_user: TaskUser | null, panel_mode: TODO_PANEL_MODE) => {
                this.setState({ ...this.state, ...{ task_user, panel_mode } })
        }

        setTaskCategory = async (task_filter: TODO_TASK_CATEGORY) => {
                this.setState({ ...this.state, ...{ task_filter, search_text: '' } })
                await sleep(200)
                this.taskFilter(task_filter)
        }

        taskFilter = (task_filter: TODO_TASK_CATEGORY) => {
                switch (task_filter) {
                        case TODO_TASK_CATEGORY.ALL:
                                this.setState({
                                        ...this.state, ...{
                                                task_filter,
                                                tasks_filter: this.taskFilterResult(task_filter),
                                        }
                                })
                                break;

                        case TODO_TASK_CATEGORY.FAVORITE:
                                this.setState({
                                        ...this.state, ...{
                                                task_filter,
                                                tasks_filter: this.taskFilterResult(task_filter),
                                        }
                                })
                                break;

                        case TODO_TASK_CATEGORY.DONE:
                                this.setState({
                                        ...this.state, ...{
                                                task_filter,
                                                tasks_filter: this.taskFilterResult(task_filter),
                                        }
                                })
                                break;

                        case TODO_TASK_CATEGORY.DELETE:
                                this.setState({
                                        ...this.state, ...{
                                                task_filter,
                                                tasks_filter: this.taskFilterResult(task_filter),
                                        }
                                })
                                break;

                        default:
                                this.taskFilter(TODO_TASK_CATEGORY.ALL)
                                break;
                }
        }

        taskFilterResult = (task_filter: TODO_TASK_CATEGORY): Array<TaskUser> => {
                switch (task_filter) {
                        case TODO_TASK_CATEGORY.ALL:
                                return this.state.tasks.filter(task => isNull(task.task.deleted_at))

                        case TODO_TASK_CATEGORY.FAVORITE:
                                return this.state.tasks.filter(task => task.task.favorite == 1)

                        case TODO_TASK_CATEGORY.DONE:
                                return this.state.tasks.filter(task => task.task.status == 1)

                        case TODO_TASK_CATEGORY.DELETE:
                                return this.state.tasks.filter(task => !isNull(task.task.deleted_at))

                        default:
                                return this.taskFilterResult(TODO_TASK_CATEGORY.ALL)
                }
        }

        buildError = (status: ERROR_STATUS, errors: Array<string> = []) => this.setState({ ...this.state, ...{ error: { ...this.state.error, ...{ errors, error_type: status } } } })

        closeAlert = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                e.preventDefault()
                this.buildError(ERROR_STATUS.SUCCESS, [])
        }

        render(): React.ReactNode {
                return this.state.loaded ? <>
                        <AlertError {...{
                                error: this.state.error,
                                closeAlert: this.closeAlert
                        }} />
                        <LeftSideBars {...{
                                tk: this.props.tk,
                                origin: this.state.config.origin,
                                tags: this.state.tags,
                                task_user: this.state.task_user,
                                task_category: this.state.task_filter,
                                panel_mode: this.state.panel_mode,
                                panel_is_visible: this.state.panel_is_visible,
                                company_member: this.state.company_member,
                                updateTodo: this.updateTodo,
                                buildError: this.buildError,
                                setTaskUser: this.setTaskUser,
                                setTaskCategory: this.setTaskCategory,
                                setPanelState: this.setPanelState,
                                searchText: this.searchText,
                        }} />
                        <RightSideBars {...{
                                tk: this.props.tk,
                                origin: this.state.config.origin,
                                tags: this.state.tags,
                                tasks: this.state.tasks_filter,
                                task_user: this.state.task_user,
                                task_category: this.state.task_filter,
                                search_text: this.state.search_text,
                                panel_mode: this.state.panel_mode,
                                panel_is_visible: this.state.panel_is_visible,
                                company_member: this.state.company_member,
                                buildError: this.buildError,
                                updateTodo: this.updateTodo,
                                setTaskUser: this.setTaskUser,
                                setTaskCategory: this.setTaskCategory,
                                setPanelState: this.setPanelState,
                                searchText: this.searchText,
                        }} />
                </> : <Loading />
        }
}

let tk = getHook(),
        dom = document.getElementById('todo-container')

if (!isNull(tk) && !isNull(dom)) createRoot(dom).render(<Todo {...{ tk }} />)