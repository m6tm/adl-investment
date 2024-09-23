import { isNull, isUndefined } from "lodash";
import randomColor from "randomcolor";
import React from "react";
import { deleteTag, getMyTags, saveNewTag } from "./API/calendar";
const Modal = React.lazy(() => import('./calendar/Modal'))
import { setCalendarList } from "./functions/tools";
import { CalendarSideBarProps, CalendarSideBarState, CalendarTag, CustomTag, ResponseRequestNewTag, ResponseRequestTag } from "./interfaces/calendar";
import SafeRaiseError from "./SafeRaiseError";
import { EventEmitter } from 'events'

declare global {
    interface Window { loadCalender: Function }
}

export default class CalendarSideBar extends React.Component {
    props!: Readonly<CalendarSideBarProps>
    state!: CalendarSideBarState
    URI!: string
    saveButton!: React.RefObject<HTMLButtonElement>
    preview!: React.RefObject<HTMLParagraphElement>
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tags: null,
            form: {
                id: -1,
                name: '',
                color: "#32e24f",
                bgColor: "#9ef7ad",
                borderColor: "#71ed86",
                dragBgColor: "#8cf79e",
            },
            formAction: 'create'
        }
        this.URI = `${window.location.origin}/api`
        this.saveButton = React.createRef();
        this.preview = React.createRef();
    }

    async componentDidMount() {
        if (isNull(this.props.token)) return
        let counter = 5,
            response: ResponseRequestTag,
            tagList!: Array<CalendarTag>
        while (counter > 0) {
            response = await getMyTags(this.URI, this.props.token)
            if (response.code == 200) break
            counter--
        }
        if (response!.code !== 200) {
            console.error("No tags were found. This is probably a network problem, please reload the page.");
            return
        }

        tagList = this.buildTagList(response!)
        this.setTags(tagList)
    }

    buildTagList(response: { data: Array<any> }) {
        let tag = response.data.map(tag => ({
            id: tag.id.toString(),
            name: tag.name,
            checked: true,
            color: tag.color,
            bgColor: tag.bgColor,
            borderColor: tag.borderColor,
            dragBgColor: tag.dragBgColor,
        }))
        return tag
    }

    setTags(tagList: Array<CalendarTag>) {
        setCalendarList(tagList)
        this.setState({ ...this.state, ...{ tags: tagList } })
    }

    setTagName = (name: string) => {
        this.setState({ ...this.state, ...{ form: { ...this.state.form, ...{ name: name } } } })
        return true
    }

    setTagColor = (color: string) => {
        let formColor = {
            color,
            bgColor: "",
            borderColor: "",
            dragBgColor: "",
        }

        formColor.bgColor = randomColor({
            hue: color,
            luminosity: 'light'
        })
        formColor.borderColor = formColor.color
        formColor.dragBgColor = formColor.bgColor

        this.setState({ ...this.state, ...{ form: { ...this.state.form, ...formColor } } })
        return true
    }

    setPreview = () => {
        let form = this.state.form
        this.preview.current?.setAttribute('style', `margin-bottom: 0; padding-left: 5px; color: ${form.color}; border-left: 4px solid ${form.borderColor}; background-color: ${form.bgColor};`)
    }

    saveNewTag = async () => {
        if (isNull(this.props.token)) return;
        let response: ResponseRequestNewTag = await saveNewTag(this.URI, this.props.token, this.state.form)

        if (response.code == 200) this.saveButton.current?.click()
        if (response.code !== 200) return

        let responseReq: ResponseRequestTag = await getMyTags(this.URI, this.props.token),
            tagList!: Array<CalendarTag>
        if (responseReq.code !== 200) return

        this.props.event.emit('tags updated')
        tagList = this.buildTagList(responseReq)
        this.setTags(tagList)
    }

    deleteTag = async (id: string) => {
        let customTag: CustomTag = this.gettagById(id),
            { response, code } = await deleteTag(this.props.token!, customTag)

        // // Run delete tag process now
        if (code !== 200) {
            console.error(response);
            return
        }
        this.props.event.emit('tags updated')
        this.setState({ ...this.state, ...{ tags: this.state.tags!.filter(tag => tag.id !== id) } })
    }

    openModalToUpdateATag(id: string) {
        let customTag: CustomTag = this.gettagById(id)

        this.setState({ ...this.state, ...{ form: { ...this.state.form, ...customTag }, formAction: 'update' } })
    }

    gettagById(id: string) {
        if (isNull(this.state.tags)) return {} as CustomTag
        let tag = this.state.tags.filter(tag => tag.id == id);
        if (isUndefined(tag) || tag.length == 0) return {} as CustomTag;
        let newTag: any = tag[0];

        let customTag: CustomTag = {};
        for (const item in newTag) {
            if (item in this.state.form) customTag[item] = !isNaN(parseInt(newTag[item])) ? parseInt(newTag[item]) : newTag[item];
        }
        return customTag
    }

    openModalToCreateANoewTag = () => {
        this.setState({ ...this.state, ...{ formAction: 'create' } })
    }

    render(): React.ReactNode {
        this.setPreview()
        return <SafeRaiseError>
            <React.Suspense>
                <>
                    <div className="app-content-overlay"></div>
                    <div className="sidebar-new-schedule">
                        {/* <!-- create new schedule button --> */}
                        <button
                            id="btn-new-schedule"
                            type="button"
                            className="btn btn-primary btn-block sidebar-new-schedule-btn"
                            onClick={() => this.props.event.emit('open scredule popup')}>
                            New schedule
                        </button>
                        <button type="button" onClick={this.openModalToCreateANoewTag} className="btn btn-primary btn-block" data-toggle="modal" data-target="#default">
                            New Tag
                        </button>
                    </div>
                    {/* // <!-- sidebar calendar labels --> */}
                    <div id="sidebar-calendars" className="sidebar-calendars">
                        <div className="sidebar-calendars-d1">
                            {
                                !isNull(this.state.tags) ? this.state.tags.map(tag => <div key={tag.id} className="sidebar-calendars-item">
                                    <label>
                                        <input type="checkbox" className="tui-full-calendar-checkbox-round"
                                            value={tag.id} defaultChecked />
                                        <span
                                            style={{ borderColor: tag.borderColor, backgroundColor: tag.color }}
                                            data-toggle="modal"
                                            data-target="#default"
                                            onClick={() => this.openModalToUpdateATag(tag.id)}></span>
                                        <span>{tag.name}</span>
                                    </label>
                                </div>) : null
                            }
                        </div>

                        <Modal {...{
                            setTagName: this.setTagName,
                            setTagColor: this.setTagColor,
                            saveNewTag: this.saveNewTag,
                            saveButton: this.saveButton,
                            deleteTag: this.deleteTag,
                            preview: this.preview,
                            form: this.state.form,
                            action: this.state.formAction
                        }} />

                    </div>
                </>
            </React.Suspense>
        </SafeRaiseError>
    }
}