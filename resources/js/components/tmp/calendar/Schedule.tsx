import React, { Component, createRef, RefObject } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import moment from 'moment';
import { EventChangeArg, EventClickArg, EventContentArg, EventInput } from '@fullcalendar/core';
import { getConfig } from '../API/pages/invoice';
import { createSchedule, deleteSchedule, getLocation, getMySchedule, getMyTags, updateSchedule } from '../API/calendar';
import { ScheduleProps, ScheduleState, ScheduleEventData, Tag, CreateScheduleForm, Calendar } from '../interfaces/calendar';
import { Config } from '../interfaces/pages/invoice';
import { getCompanyMember } from '../API/chat';
import { debugge, sleep } from '../functions/tools';
import { v4 as uuid } from 'uuid';
import { isNull } from 'lodash';
import AlertError from '../invoice/AlertError';
import { ERROR_STATUS } from '../enums/invoice';


export default class Schedule extends Component {

        props!: Readonly<ScheduleProps>;
        state: Readonly<ScheduleState>;
        calendarRef: RefObject<FullCalendar> = createRef()
        static tag: Tag = {
                id: 0,
                user_id: 0,
                name: 'Select color tag',
                color: '',
                bgColor: '#fff',
                borderColor: '',
                dragBgColor: '',
                deleted_at: '',
                created_at: '',
                updated_at: '',
        }
        static form: CreateScheduleForm = {
                groupId: null,
                color: 0,
                title: '',
                description: '',
                location: '',
                timeline_start: moment().format('YYYY-MM-DD HH:mm:ss'),
                timeline_end: moment().format('YYYY-MM-DD HH:mm:ss'),
                members: [],
        }

        constructor(props: Readonly<{}>) {
                super(props);
                this.state = {
                        config: {} as Config,
                        tags: [],
                        members: [],
                        calendars: [],
                        current_date: moment().format("YYYY-MM-DD"),
                        create_schedule_popup_opened: false,
                        selectedTag: Schedule.tag,
                        form: Schedule.form,
                        error: {
                                error_type: ERROR_STATUS.DANGER,
                                errors: []
                        },
                }
        }

        async componentDidMount() {
                await this.updateScheduleState()
                this.props.event.on('tags updated', this.updateScheduleState)
                this.props.event.on('open scredule popup', () => this.toggle_popup_state = true)
        }

        componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
                this.updateScheduleEvents()
        }

        updateScheduleEvents = () => {
                if (this.calendars.length > 0) this.calendarApi.removeAllEvents();
                this.calendars.forEach(calendar => {
                        let color: Tag = this.tags.find(tag => tag.id == calendar.color)!
                        if (!color) color = {
                                id: 0,
                                user_id: 0,
                                name: '',
                                deleted_at: null,
                                created_at: '',
                                updated_at: null
                        }
                        const event: EventInput = {
                                groupId: calendar.groupId,
                                title: JSON.stringify(calendar),
                                editable: true,
                                start: calendar.start,
                                end: calendar.end,
                                backgroundColor: color.bgColor,
                                borderColor: color.borderColor,
                                color: color.color,
                        }
                        this.calendarApi.addEvent(event)
                })
        }

        updateScheduleState = async () => {
                let config = await getConfig(this.props.token);
                if (config.code !== 200 || config.response.code !== 200) return
                let tags = await getMyTags(`${config.response.config.origin}/api`, this.props.token)
                let companie = await getCompanyMember(this.props.token)
                let calendars = await getMySchedule(this.props.token)
                if (tags.code !== 200 || tags.code !== 200 || companie.code !== 200 || calendars.code !== 200) return

                this.setState({
                        ...this.state, ...{
                                config: config.response.config,
                                tags: tags.data,
                                members: Object.values(companie.data),
                                calendars: calendars.data,
                        }
                })
        }

        onCalendarClick = (event: EventClickArg) => {
                const calendar = this.calendars.find(calendar => calendar.groupId == event.event.groupId)
                let tag = this.tags.find(tag => tag.id == calendar?.color)
                if (!tag) tag = Schedule.tag
                if (!calendar) return

                this.setState({
                        ...this.state, ...{
                                form: {
                                        groupId: calendar.groupId,
                                        color: parseInt(calendar.color as unknown as string),
                                        title: calendar.title,
                                        description: calendar.description,
                                        location: calendar.location,
                                        timeline_start: calendar.start,
                                        timeline_end: calendar.end,
                                        members: (calendar.members as unknown as Array<string>).map(member => parseInt(member))
                                },
                                selectedTag: tag,
                                create_schedule_popup_opened: true
                        }
                })
        }

        onCalendarChange = async (event: EventChangeArg) => {
                const oldCalendar = this.calendars.find(calendar => calendar.groupId == event.oldEvent.groupId)
                if (!oldCalendar) return
                let newCalendar: Calendar = {
                        ...oldCalendar, ...{
                                start: event.event.startStr,
                                end: event.event.endStr,
                        }
                }

                this.calendars = [
                        ...this.calendars, ...[
                                newCalendar
                        ]
                ]

                await sleep(200)
                this.updateSchedule(oldCalendar.groupId)
        }

        get tags() {
                return this.state.tags
        }

        set tags(tags: Array<Tag>) {
                this.setState({
                        ...this.state, ...{
                                tags
                        }
                })
        }

        get calendars() {
                return this.state.calendars
        }

        set calendars(calendars: Array<Calendar>) {
                this.setState({
                        ...this.state, ...{
                                calendars
                        }
                })
        }

        get calendarApi() {
                return this.calendarRef.current!.getApi()
        }

        onSelectDate = (date: string) => {
                if (moment(date).isValid()) this.gotoDate(moment(date).format("YYYY-MM-DD"))
        }

        gotoDate(date: string) {
                this.calendarApi.gotoDate(date)
                this.setCurrentDate = date
        }

        onPrev = () => {
                this.calendarApi.prev()
                this.setCurrentDate = moment(this.calendarApi.getDate()).format("YYYY-MM-DD")
        }

        onNext = () => {
                this.calendarApi.next()
                this.setCurrentDate = moment(this.calendarApi.getDate()).format("YYYY-MM-DD")
        }

        get currentDate() {
                return this.state.current_date
        }

        set setCurrentDate(date: string) {
                this.setState({
                        ...this.state, ...{
                                current_date: date
                        }
                })
        }

        get scheduleTag() {
                return this.state.selectedTag
        }

        set scheduleTag(selectedTag: Tag) {
                this.setState({
                        ...this.state, ...{
                                selectedTag
                        }
                })
        }

        /**
         * Create new Schedule methods
         */

        get popup_is_opened() {
                return this.state.create_schedule_popup_opened
        }

        set toggle_popup_state(state: boolean) {
                this.setState({
                        ...this.state, ...{
                                create_schedule_popup_opened: state
                        }
                })
        }

        setColor = async (tag_id: number) => {
                if (isNaN(tag_id) || !this.tags.find(tag => tag_id == tag.id)) {
                        this.scheduleTag = Schedule.tag
                        await sleep(100)
                        this.formColor = Schedule.tag.id
                        return
                }
                const color_tag = this.tags.find(tag => tag.id == tag_id)!
                this.scheduleTag = color_tag
                await sleep(100)
                this.formColor = color_tag.id
        }

        closePopup = async (element: HTMLElement) => {
                if (element.hasAttribute('data-popup')) {
                        this.setState({
                                ...this.state, ...{
                                        create_schedule_popup_opened: false,
                                        form: Schedule.form,
                                        selectedTag: Schedule.tag
                                }
                        })
                }
        }

        get formGroupId() {
                return this.state.form.groupId
        }

        set formGroupId(groupId: string | null) {
                this.setState({
                        ...this.state, ...{
                                form: {
                                        ...this.state.form, ...{
                                                groupId
                                        }
                                }
                        }
                })
        }

        get formColor() {
                return this.state.form.color
        }

        set formColor(color: number) {
                this.setState({
                        ...this.state, ...{
                                form: {
                                        ...this.state.form, ...{
                                                color
                                        }
                                }
                        }
                })
        }

        get formTitle() {
                return this.state.form.title
        }

        set formTitle(title: string) {
                this.setState({
                        ...this.state, ...{
                                form: {
                                        ...this.state.form, ...{
                                                title
                                        }
                                }
                        }
                })
        }

        get formDescription() {
                return this.state.form.description
        }

        set formDescription(description: string) {
                this.setState({
                        ...this.state, ...{
                                form: {
                                        ...this.state.form, ...{
                                                description
                                        }
                                }
                        }
                })
        }

        get formLocation() {
                return this.state.form.location
        }

        set formLocation(location: string) {
                this.setState({
                        ...this.state, ...{
                                form: {
                                        ...this.state.form, ...{
                                                location
                                        }
                                }
                        }
                })
        }

        onLocation = async () => {
                let location = await getLocation()
                this.formLocation = `${location.adress.country}, ${location.adress.city} ${location.adress.state}`.trim()
        }

        get formTimeLineFrom() {
                return this.state.form.timeline_start
        }

        set formTimeLineFrom(timeline_start: string) {
                this.setState({
                        ...this.state, ...{
                                form: {
                                        ...this.state.form, ...{
                                                timeline_start
                                        }
                                }
                        }
                })
        }

        get formTimeLineTo() {
                return this.state.form.timeline_end
        }

        set formTimeLineTo(timeline_end: string) {
                this.setState({
                        ...this.state, ...{
                                form: {
                                        ...this.state.form, ...{
                                                timeline_end
                                        }
                                }
                        }
                })
        }

        get formShare() {
                return this.state.form.members
        }

        set formShare(members: Array<number>) {
                this.setState({
                        ...this.state, ...{
                                form: {
                                        ...this.state.form, ...{
                                                members
                                        }
                                }
                        }
                })
        }

        get form() {
                return this.state.form
        }

        set form(form: CreateScheduleForm) {
                this.setState({
                        ...this.state, ...{
                                form
                        }
                })
        }

        createSchedule = async () => {
                this.buildError(ERROR_STATUS.SUCCESS, [])
                let response = await createSchedule(this.props.token, {
                        ...this.form, ...{
                                groupId: uuid()
                        }
                })

                if (response.code == 200) {
                        this.updateScheduleState()
                        await sleep(100)
                        this.toggle_popup_state = false
                        await sleep(100)
                        this.form = Schedule.form
                        return
                }
                this.buildError(ERROR_STATUS.DANGER, response.errors ?? [])
        }

        updateSchedule = async (schedule_tk: string) => {
                let calendar = this.calendars.find(calendar => calendar.groupId == schedule_tk)
                if (!calendar) return
                this.buildError(ERROR_STATUS.SUCCESS, [])

                calendar = {
                        ...calendar, ...{
                                color: this.formColor,
                                title: this.formTitle,
                                description: this.formDescription,
                                location: this.formLocation,
                                start: this.formTimeLineFrom,
                                end: this.formTimeLineTo,
                                members: this.formShare,
                        }
                }
                let response = await updateSchedule(this.props.token, calendar)

                if (response.code == 200) {
                        this.updateScheduleState()
                        await sleep(100)
                        this.toggle_popup_state = false
                        await sleep(100)
                        this.form = Schedule.form
                        return
                }

                this.buildError(ERROR_STATUS.DANGER, response.errors ?? [])
        }

        deleteSchedule = async (schedule_tk: string) => {
                let calendar = this.calendars.find(calendar => calendar.groupId == schedule_tk)
                if (!calendar) return

                calendar = {
                        ...calendar, ...{
                                color: this.formColor,
                                title: this.formTitle,
                                description: this.formDescription,
                                location: this.formLocation,
                                start: this.formTimeLineFrom,
                                end: this.formTimeLineTo,
                                members: this.formShare,
                        }
                }
                let response = await deleteSchedule(this.props.token, calendar)

                if (response.code == 200) {
                        location.reload()
                }
        }

        // END

        changeCalendarView = (buttonText: string) => {
                this.calendarApi.changeView(buttonText);
        }

        renderEventContent = (eventInfo: EventContentArg) => {
                const schedule_data: ScheduleEventData = JSON.parse(eventInfo.event.title)
                let color: Tag = this.tags.find(tag => tag.id == schedule_data.color)!
                if (!color) color = {
                        id: 0,
                        user_id: 0,
                        name: '',
                        deleted_at: null,
                        created_at: '',
                        updated_at: null
                }
                return (
                        <>
                                <p
                                        className="mb-0 d-flex align-items-center"
                                        style={{ color: color.color ?? 'none' }}>&nbsp;
                                        <span>{moment(schedule_data.start).format('HH:mm')} - {moment(schedule_data.end).format('HH:mm')}</span>&nbsp;
                                        <i className="bx bx-time"></i>&nbsp;
                                        <i>{schedule_data.title}</i>
                                </p>
                        </>
                )
        }

        closeAlert = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                e.preventDefault()
                this.buildError(ERROR_STATUS.SUCCESS, [])
        }

        buildError = (status: ERROR_STATUS, errors: Array<string> = []) => this.setState({ ...this.state, ...{ error: { ...this.state.error, ...{ errors, error_type: status } } } })

        render() {
                return (
                        <>
                                <section
                                        className='d-flex justify-content-between align-items-center px-2 calendar-control'
                                        style={{ height: 50 }}>
                                        <div className='d-flex align-items-center'>
                                                <button
                                                        className="btn btn-sm btn-light-secondary nav-prev"
                                                        onClick={this.onPrev}>
                                                        <i className="bx bx-left-arrow"></i>
                                                </button>
                                                <section className='position-relative mx-1'>
                                                        <input
                                                                type="date"
                                                                value={this.currentDate}
                                                                className="form-control form-control-sm"
                                                                placeholder="Select Date"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                                aria-readonly="false"
                                                                onChange={e => this.onSelectDate(e.target.value)} />
                                                </section>
                                                <button
                                                        className="btn btn-sm btn-light-secondary nav-prev"
                                                        onClick={this.onNext}>
                                                        <i className="bx bx-right-arrow"></i>
                                                </button>

                                                <select name="timeframe" className='custom-select custom-select-sm ml-3' defaultValue={"dayGridMonth"} onChange={e => this.changeCalendarView(e.target.value)}>
                                                        <option value="dayGridMonth">Monthly</option>
                                                        <option value="timeGridWeek">Weekly</option>
                                                        <option value="timeGridDay">Daily</option>
                                                </select>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                                {
                                                        this.calendarRef.current ?
                                                                <h3 className='mb-0'>
                                                                        <span>{moment(this.currentDate).toDate().toLocaleDateString('en-EN', { month: 'long', year: 'numeric' })}</span>
                                                                </h3> : null
                                                }
                                        </div>
                                </section>
                                <FullCalendar
                                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                        initialView="dayGridMonth"
                                        headerToolbar={false}
                                        // dateClick={args => console.log(args)}
                                        eventClick={this.onCalendarClick}
                                        eventChange={this.onCalendarChange}
                                        eventContent={this.renderEventContent}
                                        ref={this.calendarRef}
                                />
                                <AlertError {...{
                                        error: this.state.error,
                                        closeAlert: this.closeAlert
                                }} />
                                <section
                                        className={`schedule-popup ${this.popup_is_opened ? '' : 'd-none'}`.trim()}
                                        data-popup
                                        onClick={e => this.closePopup(e.target as HTMLElement)}>
                                        <div className="schedule-container scroll-mode py-2">
                                                <div className="container mb-1">
                                                        <label htmlFor="tag-color">Color</label>
                                                        <div
                                                                className="input-group input-group-sm mb-2">
                                                                <div className="input-group-prepend">
                                                                        <div
                                                                                className="input-group-text"
                                                                                style={{ backgroundColor: this.scheduleTag.bgColor }}>#</div>
                                                                </div>
                                                                <select
                                                                        name="color"
                                                                        id="tag-color"
                                                                        className='custom-select custom-select-sm'
                                                                        value={this.form.color}
                                                                        onChange={e => this.setColor(parseInt(e.target.value))}>
                                                                        {
                                                                                <>
                                                                                        <option value={Schedule.tag.id}>{Schedule.tag.name}</option>
                                                                                        {
                                                                                                this.tags.map((tag, index) => (
                                                                                                        <option key={index} value={tag.id}>{tag.name}</option>
                                                                                                ))
                                                                                        }
                                                                                </>
                                                                        }
                                                                </select>
                                                        </div>
                                                </div>

                                                <div className="container mb-1">
                                                        <label htmlFor="tag-name">Title</label>
                                                        <div className="input-group input-group-sm mb-2">
                                                                <div className="input-group-prepend">
                                                                        <div className="input-group-text"><i className="bx bx-font"></i></div>
                                                                </div>
                                                                <input
                                                                        type="text"
                                                                        className='form-control form-control-sm'
                                                                        value={this.formTitle}
                                                                        onChange={e => this.formTitle = e.target.value}
                                                                        id='tag-name'
                                                                        placeholder='Title' />
                                                        </div>
                                                </div>

                                                <div className="container mb-1">
                                                        <label htmlFor="tag-description">Description</label>
                                                        <textarea
                                                                id="tag-description"
                                                                rows={5}
                                                                className="form-control form-control-sm"
                                                                value={this.formDescription}
                                                                onChange={e => this.formDescription = e.target.value}
                                                                placeholder="Description ..." />
                                                </div>

                                                <div className="container mb-1">
                                                        <label htmlFor="tag-location">Location</label>
                                                        <div className="input-group input-group-sm mb-2">
                                                                <div className="input-group-prepend">
                                                                        <button
                                                                                className='btn btn-light-primary'
                                                                                onClick={this.onLocation}>
                                                                                <i className="bx bx-map"></i>
                                                                        </button>
                                                                </div>
                                                                <input
                                                                        type="text"
                                                                        className='form-control form-control-sm'
                                                                        id='tag-location'
                                                                        value={this.formLocation}
                                                                        onChange={e => this.formLocation = e.target.value}
                                                                        placeholder='Location' />
                                                        </div>
                                                </div>

                                                <div className="container mb-1">
                                                        <label htmlFor="tag-timline-one">Timeline</label>
                                                        <label htmlFor="tag-timline-one" className='d-block'>
                                                                <small>From</small>
                                                        </label>
                                                        <input
                                                                type="datetime-local"
                                                                className='form-control form-control-sm'
                                                                id='tag-timline-one'
                                                                value={this.formTimeLineFrom}
                                                                onChange={e => this.formTimeLineFrom = e.target.value}
                                                                placeholder='Location' />
                                                        <label htmlFor="tag-timline-two">
                                                                <small>To</small>
                                                        </label>
                                                        <input
                                                                type="datetime-local"
                                                                id="tag-timline-two"
                                                                className='form-control form-control-sm'
                                                                value={this.formTimeLineTo}
                                                                onChange={e => this.formTimeLineTo = e.target.value}
                                                                placeholder='Location' />
                                                </div>

                                                <div className="container mb-1">
                                                        <label htmlFor="tag-members">Share to</label>
                                                        <div className="input-group input-group-sm mb-2">
                                                                <div className="input-group-prepend">
                                                                        <div className='input-group-text'>
                                                                                <i className="bx bx-group"></i>
                                                                        </div>
                                                                </div>
                                                                <select
                                                                        multiple
                                                                        size={3}
                                                                        className='custom-select custom-select-sm scroll-mode'
                                                                        value={this.formShare as any[]}
                                                                        onChange={e => this.formShare = Array.from(e.target.selectedOptions).map(option => parseInt(option.value))}
                                                                        id='tag-members'>
                                                                        {
                                                                                this.state.members.map((user, index) => (
                                                                                        <option key={index} value={user.id}>{`${user.last_name} ${user.first_name}`}</option>
                                                                                ))
                                                                        }
                                                                </select>
                                                        </div>
                                                </div>

                                                <div className="container mb-1 d-flex">
                                                        <button
                                                                className='btn btn-sm btn-light-primary mr-2'
                                                                onClick={() => {
                                                                        this.setState({
                                                                                ...this.state, ...{
                                                                                        create_schedule_popup_opened: false,
                                                                                        form: Schedule.form,
                                                                                        selectedTag: Schedule.tag
                                                                                }
                                                                        })
                                                                }}>Cancel</button>
                                                        {
                                                                !isNull(this.form.groupId) ?
                                                                        <>
                                                                                <button
                                                                                        className='btn btn-sm btn-light-danger mr-2'
                                                                                        onClick={() => this.deleteSchedule(this.form.groupId!)}>Delete</button>
                                                                                <button
                                                                                        className='btn btn-sm btn-light-success'
                                                                                        onClick={() => this.updateSchedule(this.form.groupId!)}>Update</button>
                                                                        </> :
                                                                        <button
                                                                                className='btn btn-sm btn-light-success'
                                                                                onClick={this.createSchedule}>Save</button>
                                                        }
                                                </div>
                                        </div>
                                </section>
                        </>
                );
        }
}