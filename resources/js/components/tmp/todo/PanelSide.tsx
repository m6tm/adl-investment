import React, { RefObject, StrictMode, createRef } from "react";
import { TODO_PANEL_MODE, TODO_PANEL_STATE } from "../enums/todo";
import { CreateTaskData, PanelSideProps, PanelSideState, UpdateTaskData } from "../interfaces/pages/todo";
import moment from "moment";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import ReactQuill from 'react-quill'
import 'quill/dist/quill.snow.css'
import { getURI, in_array, sleep } from "../functions/tools";
import { isEmpty, isNull } from "lodash";
import { PostComment, createTask, duplicateTask, getTaskComments, taskComplete, updateTask } from "../API/pages/todo";
import { ERROR_STATUS } from "../enums/invoice";
import { showToast } from "../functions/toast";


export default class PanelSide extends React.Component {
        props!: Readonly<PanelSideProps>;
        state: Readonly<PanelSideState>

        quill_description: React.RefObject<ReactQuill> = createRef()
        quill_comment: React.RefObject<ReactQuill> = createRef()
        quill_comment_chat: React.RefObject<ReactQuill> = createRef()
        modules_description = {}
        modules_comment = {}
        modules_comment_chat = {}
        formats: Array<string> = []
        description_attachments: Array<File> = []
        comment_attachments: Array<File> = []
        comment_attachments_chat: Array<File> = []
        todoPrintPreview: RefObject<HTMLDivElement> = createRef()

        constructor(props: Readonly<{}>) {
                super(props)
                const { task_user } = this.props
                this.state = {
                        task_name: task_user.task.name,
                        task_due_date: this.convertDateStringToDate(this.props.task_user.task.date_task),
                        task_description: task_user.task.description,
                        task_description_attachs: isNull(this.props.task_user.task.description_attachments) ? [] : JSON.parse(this.props.task_user.task.description_attachments),
                        task_comment: task_user.task.comment,
                        task_comment_chat: '',
                        task_comment_chat_list: [],
                        task_comment_attachs: isNull(this.props.task_user.task.comment_attachments) ? [] : JSON.parse(this.props.task_user.task.comment_attachments),
                        task_comment_attachs_chat: [],
                        task_owners: this.props.task_user.users.map(user => user.id),
                        task_tags: this.props.task_user.task.labels.map(label => label.label.id),
                        mode: TODO_PANEL_MODE.UPDATE,
                        submitting: false
                }

                this.modules_description = {
                        toolbar: {
                                container: '#toolbar-task-description',
                                handlers: {
                                        'image': () => {
                                                const input = document.createElement('input');
                                                input.setAttribute('type', 'file');
                                                input.multiple = true
                                                input.setAttribute('accept', '.png,.jpg,.jpeg,.PNG,.JPEG,.JPG');
                                                input.onchange = () => {
                                                        Array.from(input.files!).forEach(file => {
                                                                const reader = new FileReader();
                                                                reader.onload = () => {
                                                                        const range = this.quill_description.current!.getEditorSelection();
                                                                        const cursorPosition = this.quill_description.current!.getEditorSelection()!.index;
                                                                        this.quill_description.current?.editor?.insertEmbed(range!.index, 'image', reader.result);
                                                                        this.quill_description.current!.getEditor().setSelection(cursorPosition + 1 as any);
                                                                };
                                                                reader.readAsDataURL(file);
                                                        })
                                                }
                                                input.click();
                                        },
                                        'file': () => {
                                                const input = document.createElement('input');
                                                input.setAttribute('type', 'file');
                                                input.multiple = true
                                                input.setAttribute('accept', '.pdf,.docx,.doc,.txt');
                                                let files: Array<string> = []
                                                input.onchange = () => {
                                                        Array.from(input.files!).forEach(file => {
                                                                if (this.description_attachments.find(file_attach => file_attach.name == file.name && file_attach.size == file.size && file_attach.type == file.type)) return
                                                                this.description_attachments.push(file)
                                                                files = [...files, ...[file.name]]
                                                        })
                                                        this.setState({ ...this.state, ...{ task_description_attachs: [...this.state.task_description_attachs, ...files] } })
                                                }
                                                input.click();
                                        }
                                }
                        },
                        clipboard: {
                                // toggle to add extra line breaks when pasting HTML:
                                matchVisual: false,
                        }
                };

                this.modules_comment = {
                        toolbar: {
                                container: '#toolbar-task-comment',
                                handlers: {
                                        'image': () => {
                                                const input = document.createElement('input');
                                                input.setAttribute('type', 'file');
                                                input.multiple = true
                                                input.setAttribute('accept', '.png,.jpg,.jpeg,.PNG,.JPEG,.JPG');
                                                input.onchange = () => {
                                                        Array.from(input.files!).forEach(file => {
                                                                const reader = new FileReader();
                                                                reader.onload = () => {
                                                                        const range = this.quill_comment.current!.getEditorSelection();
                                                                        const cursorPosition = this.quill_comment.current!.getEditorSelection()!.index;
                                                                        this.quill_comment.current?.editor?.insertEmbed(range!.index, 'image', reader.result);
                                                                        this.quill_comment.current!.getEditor().setSelection(cursorPosition + 1 as any);
                                                                };
                                                                reader.readAsDataURL(file);
                                                        })
                                                }
                                                input.click();
                                        },
                                        'file': () => {
                                                const input = document.createElement('input');
                                                input.setAttribute('type', 'file');
                                                input.multiple = true
                                                input.setAttribute('accept', '.pdf,.docx,.doc,.txt');
                                                let files: Array<string> = []
                                                input.onchange = () => {
                                                        Array.from(input.files!).forEach(file => {
                                                                if (this.comment_attachments.find(file_attach => file_attach.name == file.name && file_attach.size == file.size && file_attach.type == file.type)) return
                                                                this.comment_attachments.push(file)
                                                                files = [...files, ...[file.name]]
                                                        })
                                                        this.setState({ ...this.state, ...{ task_comment_attachs: [...this.state.task_comment_attachs, ...files] } })
                                                }
                                                input.click();
                                        }
                                }
                        },
                        clipboard: {
                                // toggle to add extra line breaks when pasting HTML:
                                matchVisual: false,
                        }
                };

                this.modules_comment_chat = {
                        toolbar: {
                                container: '#toolbar-task-comment-chat',
                                handlers: {
                                        'image': () => {
                                                const input = document.createElement('input');
                                                input.setAttribute('type', 'file');
                                                input.multiple = true
                                                input.setAttribute('accept', '.png,.jpg,.jpeg,.PNG,.JPEG,.JPG');
                                                input.onchange = () => {
                                                        Array.from(input.files!).forEach(file => {
                                                                const reader = new FileReader();
                                                                reader.onload = () => {
                                                                        const range = this.quill_comment_chat.current!.getEditorSelection();
                                                                        const cursorPosition = this.quill_comment_chat.current!.getEditorSelection()!.index;
                                                                        this.quill_comment_chat.current?.editor?.insertEmbed(range!.index, 'image', reader.result);
                                                                        this.quill_comment_chat.current!.getEditor().setSelection(cursorPosition + 1 as any);
                                                                };
                                                                reader.readAsDataURL(file);
                                                        })
                                                }
                                                input.click();
                                        },
                                        'file': () => {
                                                const input = document.createElement('input');
                                                input.setAttribute('type', 'file');
                                                input.multiple = true
                                                input.setAttribute('accept', '.pdf,.docx,.doc,.txt');
                                                let files: Array<string> = []
                                                input.onchange = () => {
                                                        Array.from(input.files!).forEach(file => {
                                                                if (this.comment_attachments_chat.find(file_attach => file_attach.name == file.name && file_attach.size == file.size && file_attach.type == file.type)) return
                                                                this.comment_attachments_chat.push(file)
                                                                files = [...files, ...[file.name]]
                                                        })
                                                        this.setState({ ...this.state, ...{ task_comment_attachs_chat: [...this.state.task_comment_attachs_chat, ...files] } })
                                                }
                                                input.click();
                                        }
                                }
                        },
                        clipboard: {
                                // toggle to add extra line breaks when pasting HTML:
                                matchVisual: false,
                        }
                };

                this.formats = [
                        'image'
                ];
        }

        componentDidMount(): void {
                this.getComments()
        }

        getComments = async () => {
                this.setState({
                        ...this.state, ...{
                                submitting: true,
                        }
                })
                await sleep(100)
                const response = await getTaskComments(this.props.tk, this.props.task_user.task_id)
                if (response.code !== 200) {
                        showToast(response.errors?.at(0)!, 'danger').showToast()
                        this.setState({
                                ...this.state, ...{
                                        submitting: false,
                                }
                        })
                        return
                }

                this.setState({
                        ...this.state, ...{
                                task_comment_chat_list: response.comments,
                                submitting: false,
                        }
                })
        }

        onComment = async () => {
                this.setState({
                        ...this.state, ...{
                                submitting: true,
                        }
                })
                await sleep(100)
                const response = await PostComment(this.props.tk, this.props.task_user.task_id, this.state.task_comment_chat, this.comment_attachments_chat)
                console.log(response);
                if (response.code !== 200) {
                        showToast(response.errors?.at(0)!, 'danger').showToast()
                        this.setState({
                                ...this.state, ...{
                                        submitting: false,
                                }
                        })
                        return
                }

                this.setState({
                        ...this.state, ...{
                                task_comment_chat: '',
                                task_comment_attachs_chat: [],
                        }
                })
                this.comment_attachments_chat = []
                await sleep(100)
                this.getComments()
        }

        hidePanel = async () => {
                this.props.setTaskUser(null, TODO_PANEL_MODE.CREATE)
                await sleep(200)
                this.props.setPanelState(TODO_PANEL_STATE.HIDE)
        }

        convertDateStringToDate = (date: string) => moment(isEmpty(date) ? this.convertDateToDateString(new Date()) : date, "YYYY/MM/DD").toDate()

        convertDateToDateString = (date: Date) => moment(date).format('YYYY/MM/DD')

        setTaskName = (task_name: string) => this.setState({ ...this.state, ...{ task_name } })

        setTaskOwners = (options: HTMLCollectionOf<HTMLOptionElement>) => {
                let users = Array.from(options, (option) => parseInt(option.value))
                this.setState({ ...this.state, ...{ task_owners: users } })
        }

        setTaskTags = (options: HTMLCollectionOf<HTMLOptionElement>) => {
                let users = Array.from(options, (option) => parseInt(option.value))
                this.setState({ ...this.state, ...{ task_tags: users } })
        }

        removeDescriptionAttach = (file_name: string) => {
                this.description_attachments = this.description_attachments.filter(file => file.name !== file_name)
                this.setState({ ...this.state, ...{ task_description_attachs: this.state.task_description_attachs.filter(file => file !== file_name) } })
        }

        removeCommentAttach = (file_name: string) => {
                this.comment_attachments = this.comment_attachments.filter(file => file.name !== file_name)
                this.setState({ ...this.state, ...{ task_comment_attachs: this.state.task_comment_attachs.filter(file => file !== file_name) } })
        }

        setTaskDescription = (description: string) => this.setState({ ...this.state, ...{ task_description: description } })

        setTaskComment = (comment: string) => this.setState({ ...this.state, ...{ task_comment: comment } })

        setTaskCommentChat = (comment: string) => this.setState({ ...this.state, ...{ task_comment_chat: comment } })

        setTaskDueDate = (task_due_date: Date | null) => !isNull(task_due_date) ? this.setState({ ...this.state, ...{ task_due_date } }) : null

        markComplete = async () => {
                this.props.buildError(ERROR_STATUS.SUCCESS, [])
                await sleep(200)
                let response = await taskComplete(this.props.tk, this.props.origin, this.props.task_user.task)

                if (response.code == 200 && response.response.code == 200) {
                        await this.props.updateTodo()
                        await this.hidePanel()
                        return
                }
                this.props.buildError(ERROR_STATUS.DANGER, response.response.errors ?? ['Unknow error source'])
        }

        createTask = async () => {
                this.props.buildError(ERROR_STATUS.SUCCESS, [])
                await sleep(200)
                let task_data: CreateTaskData = {
                        task_name: this.state.task_name,
                        task_members: this.state.task_owners,
                        task_due_date: this.convertDateToDateString(this.state.task_due_date),
                        task_description: this.state.task_description,
                        task_description_attachments: this.description_attachments,
                        task_description_tmp_attachments: this.state.task_description_attachs,
                        task_tags: this.state.task_tags,
                        task_comment: this.state.task_comment,
                        task_comment_attachments: this.comment_attachments,
                        task_comment_tmp_attachments: this.state.task_comment_attachs,
                }

                let response = await createTask(this.props.tk, this.props.origin, task_data)

                if (response.code == 200 && response.response.code == 200) {
                        await this.props.updateTodo()
                        await this.hidePanel()
                        showToast("Create task completed successfully !!", "success").showToast()
                        return
                }
                this.props.buildError(ERROR_STATUS.DANGER, response.response.errors ?? ['Unknow error source'])
        }

        updateTask = async () => {
                this.props.buildError(ERROR_STATUS.SUCCESS, [])
                await sleep(200)
                let task_data: UpdateTaskData = {
                        task: this.props.task_user.task.id,
                        task_name: this.state.task_name,
                        task_members: this.state.task_owners,
                        task_due_date: this.convertDateToDateString(this.state.task_due_date),
                        task_description: this.state.task_description,
                        task_description_attachments: this.description_attachments,
                        task_description_tmp_attachments: this.state.task_description_attachs,
                        task_tags: this.state.task_tags,
                        task_comment: this.state.task_comment,
                        task_comment_attachments: this.comment_attachments,
                        task_comment_tmp_attachments: this.state.task_comment_attachs,
                }

                let response = await updateTask(this.props.tk, this.props.origin, task_data)

                if (response.code == 200 && response.response.code == 200) {
                        await this.props.updateTodo()
                        await this.hidePanel()
                        showToast("Update task completed successfully !!", "success").showToast()
                        return
                }
                this.props.buildError(ERROR_STATUS.DANGER, response.response.errors ?? ['Unknow error source'])
        }

        duplicateTask = async () => {
                this.props.buildError(ERROR_STATUS.SUCCESS, [])
                await sleep(200)
                let response = await duplicateTask(this.props.tk, this.props.origin, this.props.task_user.task.id)

                if (response.code == 200 && response.response.code == 200) {
                        await this.props.updateTodo()
                        await this.hidePanel()
                        showToast("Duplication completed successfully !!", "success").showToast()
                        return
                }
                this.props.buildError(ERROR_STATUS.DANGER, response.response.errors ?? ['Unknow error source'])
        }

        print = async () => {
                let print_window = window.open('', '', 'width=700,height=800'),
                        invoice_copy = this.todoPrintPreview.current!.cloneNode(true) as HTMLDivElement
                invoice_copy.firstElementChild!.classList.add('vh-100')

                print_window!.document.write(`
                        <html>
                                <head>
                                        ${document.head.innerHTML}
                                </head>
                                <body>
                                        ${invoice_copy.innerHTML}
                                </body>
                        </html>
                `)

                print_window!.focus()
                await sleep(1000 * 10)
                print_window!.print()
                'close' in print_window!.document ? print_window!.document.close() : print_window!.close()
        }

        render(): React.ReactNode {
                const { task_user } = this.props
                return (
                        <StrictMode>
                                <div className={`todo-new-task-sidebar ps${this.props.panel_is_visible ? ' show' : ''}`} style={{ top: 96, zIndex: 100 }} id="to_print">
                                        <div className="card shadow-none h-100 p-0 m-0">
                                                <div className="card-header border-bottom py-75">
                                                        <div className="task-header d-flex justify-content-between align-items-center">
                                                                <h5 className="new-task-title mb-0">{this.props.mode == TODO_PANEL_MODE.CREATE ? 'Create a new' : 'Modify a'} Task</h5>

                                                                {
                                                                        this.props.mode == TODO_PANEL_MODE.UPDATE ?
                                                                                <button
                                                                                        id="id"
                                                                                        className={`mark-complete-btn btn btn-light-${task_user.task.status == 0 ? 'primary' : 'danger'} btn-sm`}
                                                                                        onClick={() => this.markComplete()}>
                                                                                        <i className={`bx bx-${task_user.task.status == 0 ? 'check' : 'x'} align-middle`}></i>
                                                                                        <span className="mark-complete align-middle">
                                                                                                Mark {task_user.task.status == 0 ? 'Complete' : 'Uncomplete'}
                                                                                        </span>
                                                                                </button> : null
                                                                }
                                                                <span className="dropdown mr-50">
                                                                        <a href="#" className="dropdown-toggle" id="todo-sidebar-dropdown" data-toggle="dropdown" aria-haspopup="true"
                                                                                aria-expanded="true">
                                                                                <i className='bx bx-dots-vertical-rounded'></i>
                                                                        </a>
                                                                        <span className="dropdown-menu dropdown-menu-right" aria-labelledby="todo-sidebar-dropdown">
                                                                                <a href="#" className="dropdown-item" onClick={this.print}>Print</a>
                                                                                <a href="#" className="dropdown-item" onClick={this.duplicateTask}>Duplicate</a>
                                                                        </span>
                                                                </span>
                                                        </div>
                                                        {/* Print domsection */}
                                                        <div className="todo-preview d-none" ref={this.todoPrintPreview}>
                                                                <div className="todo-print-paper-layout scroll-mode">
                                                                        <h4 className="text-uppercase text-primary">{this.state.task_name}</h4>
                                                                        <h5 className="text-capitalize mt-1 text-primary">Collaborators:</h5>
                                                                        <ul className="list-unstyled pl-2">
                                                                                {
                                                                                        this.props.company_member.map((member, index) => in_array(member.id, this.state.task_owners) ? (
                                                                                                <li
                                                                                                        key={index}>
                                                                                                        {`${member.last_name} ${member.first_name}`}
                                                                                                </li>
                                                                                        ) : null)
                                                                                }
                                                                        </ul>
                                                                        <h5 className="text-capitalize text-primary mt-1">Due date: <small className="text-dark">{moment(this.state.task_due_date).format('YYYY-MM-DD')}</small></h5>
                                                                        <h5 className="text-capitalize text-primary mt-1">Tags:</h5>
                                                                        <ul className="list-unstyled pl-2">
                                                                                {
                                                                                        this.props.tags.map((tag, index) => (
                                                                                                <li key={index}>
                                                                                                        <span className="badge badge-pill mr-2" style={{ backgroundColor: tag.label }}></span>
                                                                                                        {tag.name}
                                                                                                </li>
                                                                                        ))
                                                                                }
                                                                        </ul>
                                                                        <h5 className="text-capitalize text-primary mt-1">Description:</h5>
                                                                        <p className="pl-1" dangerouslySetInnerHTML={{ __html: this.state.task_description }}>
                                                                        </p>
                                                                        <section className="d-flex justify-content-end align-items-center">
                                                                                <span className="d-flex justify-content-center align-items-center">
                                                                                        <small className="text-primary mr-1">Attachments: </small> <small>{this.state.task_description_attachs.length}</small> <i className="bx bx-file"></i>
                                                                                </span>
                                                                        </section>
                                                                        <h5 className="text-capitalize text-primary mt-1">Comment:</h5>
                                                                        <p className="pl-1" dangerouslySetInnerHTML={{ __html: this.state.task_comment }}>
                                                                        </p>
                                                                        <section className="d-flex justify-content-end align-items-center">
                                                                                <span className="d-flex justify-content-center align-items-center">
                                                                                        <small className="text-primary mr-1">Attachments: </small> <small>{this.state.task_comment_attachs.length}</small> <i className="bx bx-file"></i>
                                                                                </span>
                                                                        </section>
                                                                </div>
                                                        </div>
                                                        {/* End section */}
                                                        <button
                                                                type="button"
                                                                className="close close-icon text-danger"
                                                                onClick={this.hidePanel}>
                                                                <i className="bx bx-x"></i>
                                                        </button>
                                                </div>
                                                {/* <!-- form start -. */}
                                                <section className="mt-1 flex-grow-1 d-flex flex-column">
                                                        <div id="menu_content">
                                                                <ul className="nav nav-tabs justify-content-center" role="tablist">
                                                                        <li className="nav-item" role="presentation">
                                                                                <button className="nav-link active" id="info-tab" data-toggle="tab" data-target="#info" type="button" role="tab" aria-controls="info" aria-selected="true">TASK INFO</button>
                                                                        </li>
                                                                        <li className="nav-item" role="presentation">
                                                                                <button className="nav-link" id="comments-tab" data-toggle="tab" data-target="#comments" type="button" role="tab" aria-controls="comments" aria-selected="false">COMMENTS</button>
                                                                        </li>
                                                                </ul>
                                                        </div>

                                                        <div className="tab-content d-flex flex-grow-1">
                                                                <div className="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
                                                                        <div id="for_new_task">
                                                                                <div className="card-body py-0 border-bottom">
                                                                                        <div className="form-group">
                                                                                                {/* <!-- text area for task title -. */}
                                                                                                <textarea
                                                                                                        id="texte_name"
                                                                                                        name="name"
                                                                                                        className="form-control task-title"
                                                                                                        cols={1}
                                                                                                        rows={1}
                                                                                                        placeholder="Write a Task Name"
                                                                                                        value={this.state.task_name}
                                                                                                        onChange={e => this.setTaskName(e.target.value)}
                                                                                                        required></textarea>
                                                                                        </div>
                                                                                        <div className="assigned d-flex flex-column justify-content-between">
                                                                                                <div className="form-group d-flex justify-content-between align-items-center mr-1">
                                                                                                        {/* <!-- users avatar -. */}
                                                                                                        <div className="avatar">
                                                                                                                <img src="#" className="avatar-user-image d-none" alt="#" width="38" height="38" />
                                                                                                                <div className="avatar-content">
                                                                                                                        <i className='bx bx-user font-medium-4'></i>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                        {/* <!-- select2  for user name  -. */}
                                                                                                        <div className="select-box mr-1" style={{ flex: 1 }}>
                                                                                                                <select
                                                                                                                        multiple
                                                                                                                        size={3}
                                                                                                                        value={this.state.task_owners as any[]}
                                                                                                                        className="select2-users-name custom-select"
                                                                                                                        onChange={e => this.setTaskOwners(e.target.selectedOptions)}>
                                                                                                                        {
                                                                                                                                this.props.company_member.map((member, index) => (
                                                                                                                                        <option
                                                                                                                                                key={index}
                                                                                                                                                value={member.id}>
                                                                                                                                                {`${member.id == this.props.task_user.user.id ? '(Me) - ' : ''} ${member.last_name} ${member.first_name}`.trimStart()}
                                                                                                                                        </option>
                                                                                                                                ))
                                                                                                                        }
                                                                                                                </select>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div className="form-group d-flex align-items-center position-relative">
                                                                                                        {/* <!-- date picker -. */}
                                                                                                        <div className="date-icon mr-50" style={{ marginLeft: '5px' }}>
                                                                                                                <button type="button" className="btn btn-icon btn-outline-secondary round">
                                                                                                                        <i className='bx bx-calendar-alt'></i>
                                                                                                                </button>
                                                                                                        </div>
                                                                                                        <div className="date-picker-react">
                                                                                                                <DatePicker
                                                                                                                        selected={this.state.task_due_date}
                                                                                                                        onChange={date => this.setTaskDueDate(date)}
                                                                                                                        className="form-control form-control-sm" />
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                                <div className="card-body border-bottom task-description">
                                                                                        <div id="description_files_inner" className="col-md-12 col-xl-12 contentfiles d-flex flex-column">
                                                                                                {
                                                                                                        this.state.task_description_attachs.map((file_name, index) => (
                                                                                                                <div key={index} className="contentfile rounded mb-1 w-100 mw-100 d-flex justify-content-between position-relative">
                                                                                                                        {
                                                                                                                                this.description_attachments.find(file => file.name == file_name) ?
                                                                                                                                        <a
                                                                                                                                                href={URL.createObjectURL(this.description_attachments.find(file => file.name == file_name)!)}
                                                                                                                                                download={file_name}>
                                                                                                                                                <i
                                                                                                                                                        className="bx bx-x position-absolute"
                                                                                                                                                        style={{ cursor: 'pointer', top: '-10px', right: '-10px' }}
                                                                                                                                                        onClick={() => this.removeDescriptionAttach(file_name)}></i>
                                                                                                                                                <span className="number-of-line-1">
                                                                                                                                                        <span className="bx bx-file"></span>
                                                                                                                                                        <span>{file_name}</span>
                                                                                                                                                </span>
                                                                                                                                        </a> :
                                                                                                                                        <a
                                                                                                                                                href={`${origin}/todo_files/${file_name}`}
                                                                                                                                                download={file_name}>
                                                                                                                                                <i
                                                                                                                                                        className="bx bx-x position-absolute"
                                                                                                                                                        style={{ cursor: 'pointer', top: '-10px', right: '-10px' }}
                                                                                                                                                        onClick={() => this.removeDescriptionAttach(file_name)}></i>
                                                                                                                                                <span className="number-of-line-1">
                                                                                                                                                        <span className="bx bx-file"></span>
                                                                                                                                                        <span>{file_name}</span>
                                                                                                                                                </span>
                                                                                                                                        </a>
                                                                                                                        }
                                                                                                                </div>
                                                                                                        ))
                                                                                                }
                                                                                        </div>
                                                                                        {/* <!--  Quill editor for task description -. */}
                                                                                        <div className="snow-container border rounded p-50">
                                                                                                <ReactQuill
                                                                                                        value={this.state.task_description}
                                                                                                        ref={this.quill_description}
                                                                                                        formats={this.formats}
                                                                                                        modules={this.modules_description}
                                                                                                        onChange={description_text => this.setTaskDescription(description_text)}
                                                                                                        placeholder="Type some description here ..."
                                                                                                        className="text-muted" />
                                                                                                <div id="toolbar-task-description">
                                                                                                        <button className="ql-image"></button>
                                                                                                        <button className="ql-file">
                                                                                                                <i className="bx bx-file"></i>
                                                                                                        </button>
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="tag d-flex justify-content-between align-items-center pt-1">
                                                                                                <div className="flex-grow-1 d-flex align-items-center">
                                                                                                        <i className="bx bx-tag align-middle mr-25"></i>
                                                                                                        <select
                                                                                                                className="select2-assign-label custom-select"
                                                                                                                value={this.state.task_tags as any[]}
                                                                                                                onChange={e => this.setTaskTags(e.target.selectedOptions)}
                                                                                                                multiple
                                                                                                                size={3}>
                                                                                                                {
                                                                                                                        this.props.tags.map((tag, index) => (
                                                                                                                                <option key={index} value={tag?.id}>
                                                                                                                                        {tag.name}
                                                                                                                                </option>
                                                                                                                        ))
                                                                                                                }
                                                                                                        </select>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                        <div className="card-body pb-1">

                                                                                {/* {--box to show messages --} */}
                                                                                <div className="p-1 h-20" id="comment_content_list" style={{ overflow: 'auto', maxHeight: '340px' }}>
                                                                                        {/* {--the messages list --} */}
                                                                                </div>

                                                                                {/* {--box to write message --} */}
                                                                                <div className="comment" id="comment_content">
                                                                                        <div className="d-flex align-items-center mb-1">
                                                                                                <div className="avatar mr-75">
                                                                                                        <img src={`${origin}/${task_user.user.avatar}`}
                                                                                                                alt="avatar" height="40" width="40" />
                                                                                                </div>
                                                                                                {/* <div className="avatar-content">
                                                                                        {'Auth::user().name'} created this task
                                                                                </div>
                                                                                <small className="ml-75 text-muted">13 days ago</small> */}
                                                                                        </div>
                                                                                        <div className="col-md-12 col-xl-12 contentfiles d-flex flex-column">
                                                                                                {
                                                                                                        this.state.task_comment_attachs.map((file_name, index) => (
                                                                                                                <div key={index} className="contentfile rounded mb-1 w-100 mw-100 d-flex justify-content-between position-relative">
                                                                                                                        {
                                                                                                                                this.comment_attachments.find(file => file.name == file_name) ?
                                                                                                                                        <a
                                                                                                                                                href={URL.createObjectURL(this.comment_attachments.find(file => file.name == file_name)!)}
                                                                                                                                                download={file_name}>
                                                                                                                                                <i
                                                                                                                                                        className="bx bx-x position-absolute"
                                                                                                                                                        style={{ cursor: 'pointer', top: '-10px', right: '-10px' }}
                                                                                                                                                        onClick={() => this.removeCommentAttach(file_name)}></i>
                                                                                                                                                <span className="number-of-line-1">
                                                                                                                                                        <span className="bx bx-file"></span>
                                                                                                                                                        <span>{file_name}</span>
                                                                                                                                                </span>
                                                                                                                                        </a> :
                                                                                                                                        <a
                                                                                                                                                href={`${origin}/todo_files/${file_name}`}
                                                                                                                                                download={file_name}>
                                                                                                                                                <i
                                                                                                                                                        className="bx bx-x position-absolute"
                                                                                                                                                        style={{ cursor: 'pointer', top: '-10px', right: '-10px' }}
                                                                                                                                                        onClick={() => this.removeCommentAttach(file_name)}></i>
                                                                                                                                                <span className="number-of-line-1">
                                                                                                                                                        <span className="bx bx-file"></span>
                                                                                                                                                        <span>{file_name}</span>
                                                                                                                                                </span>
                                                                                                                                        </a>
                                                                                                                        }
                                                                                                                </div>
                                                                                                        ))
                                                                                                }
                                                                                        </div>
                                                                                        {/* <!-- quill editor for comment -. */}
                                                                                        <div className="snow-container border rounded p-50">
                                                                                                <ReactQuill
                                                                                                        value={this.state.task_comment}
                                                                                                        ref={this.quill_comment}
                                                                                                        formats={this.formats}
                                                                                                        modules={this.modules_comment}
                                                                                                        onChange={comment_text => this.setTaskComment(comment_text)}
                                                                                                        placeholder="Type some comment here ..."
                                                                                                        className="text-muted" />
                                                                                                <div id="toolbar-task-comment">
                                                                                                        <button className="ql-image"></button>
                                                                                                        <button className="ql-file">
                                                                                                                <i className="bx bx-file"></i>
                                                                                                        </button>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="card-body">
                                                                                        <div id="add_task_save_change">
                                                                                                <div className="mt-1 d-flex justify-content-end">
                                                                                                        <button
                                                                                                                className="btn btn-sm btn-light-primary add-todo"
                                                                                                                onClick={() => this.props.mode == TODO_PANEL_MODE.CREATE ? this.createTask() : this.updateTask()}>
                                                                                                                {this.props.mode == TODO_PANEL_MODE.CREATE ? 'Create' : 'Update'} Task
                                                                                                        </button>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>

                                                                <div className="tab-pane fade w-100" id="comments" role="tabpanel" aria-labelledby="comments-tab">
                                                                        <div className="card-body pb-1 h-100 d-flex flex-column justify-content-between">

                                                                                {/* {--box to write message --} */}
                                                                                <div className="comment flex-grow-1" id="comment_content" style={{ overflowY: 'auto', maxHeight: '40vh' }}>
                                                                                        <div className="col-md-12 col-xl-12 contentfiles d-flex flex-column">
                                                                                                {
                                                                                                        this.state.task_comment_chat_list.length > 0 ? this.state.task_comment_chat_list.map((comment, index) => (
                                                                                                                <div>
                                                                                                                        <div className="avatar">
                                                                                                                                <img src={`${origin}/${comment.posted.avatar}`}
                                                                                                                                        alt="avatar" height="40" width="40" />
                                                                                                                        </div>
                                                                                                                        <span className="d-flex">Posted at { moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss') }</span>
                                                                                                                        <div key={index} className="contentfile rounded mb-1 w-100 mw-100 d-flex justify-content-between position-relative">
                                                                                                                                {
                                                                                                                                        comment.attachments.find(attachement => attachement.task_comment_id == comment.id) ?
                                                                                                                                                (
                                                                                                                                                        <div className="item_comment">
                                                                                                                                                                <a
                                                                                                                                                                        href={getURI(`${comment.attachments.at(0)!.path}/${comment.attachments.at(0)!.name}`)}
                                                                                                                                                                        download={comment.attachments.at(0)!.original_name}>
                                                                                                                                                                        <span className="number-of-line-1">
                                                                                                                                                                                <span className="bx bx-file"></span>
                                                                                                                                                                                <span>{comment.attachments.at(0)!.original_name}</span>
                                                                                                                                                                        </span>
                                                                                                                                                                </a>
                                                                                                                                                                <div dangerouslySetInnerHTML={{ __html: comment.comment }}></div>
                                                                                                                                                        </div>
                                                                                                                                                ) :
                                                                                                                                                <div className="item_comment" dangerouslySetInnerHTML={{ __html: comment.comment }}></div>
                                                                                                                                }
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                        )) : <p className="">
                                                                                                                Not Comment ...
                                                                                                        </p>
                                                                                                }
                                                                                        </div>
                                                                                </div>

                                                                                <div className="card-body flex-grow-0">
                                                                                        <div className="avatar mr-75">
                                                                                                <img src={`${origin}/${task_user.user.avatar}`}
                                                                                                        alt="avatar" height="40" width="40" />
                                                                                        </div>
                                                                                        {/* <!-- quill editor for comment -. */}
                                                                                        <div className="snow-container border rounded p-50">
                                                                                                <ReactQuill
                                                                                                        value={this.state.task_comment_chat}
                                                                                                        ref={this.quill_comment_chat}
                                                                                                        formats={this.formats}
                                                                                                        modules={this.modules_comment_chat}
                                                                                                        onChange={comment_text => this.setTaskCommentChat(comment_text)}
                                                                                                        placeholder="Type some comment here ..."
                                                                                                        className="text-muted" />
                                                                                                <div id="toolbar-task-comment-chat">
                                                                                                        <button className="ql-image"></button>
                                                                                                        <button className="ql-file">
                                                                                                                <i className="bx bx-file"></i>
                                                                                                        </button>
                                                                                                </div>
                                                                                        </div>
                                                                                        <div id="add_task_save_change">
                                                                                                <div className="mt-1 d-flex justify-content-end">
                                                                                                        <button
                                                                                                                className="btn btn-sm btn-light-primary add-todo"
                                                                                                                onClick={this.onComment}>
                                                                                                                {
                                                                                                                        this.state.submitting ? (
                                                                                                                                <div className="spinner-grow" role="status">
                                                                                                                                        <span className="visually-hidden">Loading...</span>
                                                                                                                                </div>
                                                                                                                        ) : (
                                                                                                                                <span>Post Comment</span>
                                                                                                                        )
                                                                                                                }
                                                                                                        </button>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </section>
                                                {/* <!-- form start end-. */}
                                        </div>
                                </div>
                        </StrictMode>
                )
        }
}