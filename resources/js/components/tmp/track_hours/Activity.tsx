import React, { Suspense, createRef } from 'react'
import { createRoot } from 'react-dom/client'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ActivityProps, DateSelectorState, Screenshot, Screenshot10min, Screenshot01h, ScreenshotCollection, ScreenshotCapture } from '../interfaces/pages/trackhours';
import moment from 'moment';
import { debugge, getHook, getURI, sleep } from '../functions/tools';
import { isNull, isUndefined } from 'lodash';
import { getCompanyMember, getMyCredentials } from '../API/chat';
import { deleteScreenshots, getDailyActivity } from '../API/pages/trackhours';
import { GetCustomUser } from '../interfaces/chat';
import SafeRaiseError from '../SafeRaiseError';
import Loading from '../Loading';
import { getCompanie } from '../API/pages/invoice';
import { Companie } from '../interfaces/pages/invoice';
import { TIME_INTERVAL } from '../enums/trackhours';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper';
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/zoom'
import { TYPE_USER } from '../enums/chat';


const component = document.getElementById('activity-component'),
        token = getHook()

class Activity extends React.Component {

        state: Readonly<DateSelectorState>;
        props!: Readonly<ActivityProps>;
        screenshotContainerRef: React.RefObject<HTMLDivElement> = createRef()
        swiper!: SwiperType

        constructor(props: Readonly<any>) {
                super(props)
                this.state = {
                        selectedDate: moment(moment.now()).toDate(),
                        user: {} as GetCustomUser,
                        company_members: [],
                        selected_member: 0,
                        activity: null,
                        company: {} as Companie,
                        screenshots: [],
                        loading_in_progress: true
                }
        }

        get pageLoading() {
                return this.state.loading_in_progress
        }

        set pageLoading(loading_in_progress: boolean) {
                this.setState({
                        ...this.state, ...{
                                loading_in_progress
                        }
                })
        }

        get screenshots() {
                return this.state.screenshots
        }

        set screenshots(screenshots: Array<string>) {
                this.setState({
                        ...this.state, ...{
                                screenshots
                        }
                })
        }

        componentDidMount(): void {
                this.setDataState()
        }

        setDataState = async (user_id: number | undefined = this.state.selected_member == 0 ? undefined : this.state.selected_member) => {
                this.pageLoading = true
                await sleep(200)
                const companie_member = await getCompanyMember(this.props.tk),
                        myCredentials = await getMyCredentials(this.props.tk),
                        myActivity = await getDailyActivity(this.props.tk, moment(this.state.selectedDate).format('YYYY-MM-DD'), user_id),
                        company = await getCompanie(this.props.tk)

                if (companie_member.code !== 200 || (myCredentials.code !== 200 || isNull(myCredentials.response.user)) || myActivity.code !== 200 || company.code !== 200) return
                this.setState({
                        ...this.state, ...{
                                user: myCredentials.response.user,
                                company_members: companie_member.data,
                                selected_member: isUndefined(user_id) ? myCredentials.response.user.id : user_id,
                                activity: myActivity.activity,
                                company: company.response.companie,
                        }
                })
                await sleep(200)
                if (this.pageLoading) this.pageLoading = false
                await sleep(200)
                this.onSelectScreenshots()
        }

        handleDateChange = async (date: Date) => {
                this.setState({
                        selectedDate: date,
                });
                await sleep(200)
                await this.setDataState()
        };

        handlePrevDay = async () => {
                if (this.state.selectedDate) {
                        const prevDate = new Date(this.state.selectedDate);
                        prevDate.setDate(prevDate.getDate() - 1);
                        this.setState({
                                selectedDate: prevDate,
                        });
                        await sleep(200)
                        this.setDataState()
                }
        };

        handleNextDay = async () => {
                if (this.state.selectedDate) {
                        const nextDate = new Date(this.state.selectedDate);
                        nextDate.setDate(nextDate.getDate() + 1);
                        this.setState({
                                selectedDate: nextDate,
                        });
                        await sleep(200)
                        this.setDataState()
                }
        };

        handleToDay = async () => {
                if (moment(this.state.selectedDate).format('YYYY-MM-DD') == moment(moment.now()).format('YYYY-MM-DD')) return
                const today = moment(moment.now()).toDate();
                today.setDate(today.getDate());
                this.setState({
                        selectedDate: today,
                });
                await sleep(200)
                this.setDataState()
        };

        formatScreenshots = (screenshots: Array<Screenshot>): ScreenshotCollection => {
                if (screenshots.length == 0) return []

                let screenshot10min: Screenshot10min = {
                        start: '',
                        end: '',
                        screenshots: []
                },
                        screenshot1h: Screenshot01h = {
                                start: '',
                                end: '',
                                screenshots: [],
                        },
                        screenshotCollection: ScreenshotCollection = []

                screenshots.forEach((capture, key) => {
                        const screenshot: ScreenshotCapture = {
                                ...capture as any, ...{
                                        capture: JSON.parse(capture.capture)
                                }
                        },
                                nextScreenshot = screenshots.at(key + 1),
                                nextScreenshotTimming = {
                                        hour: nextScreenshot ? nextScreenshot.total_activity.split(':').map(item => parseInt(item)).at(0)! : 0,
                                        minute: nextScreenshot ? nextScreenshot.total_activity.split(':').map(item => parseInt(item)).at(1)! : 0,
                                        second: nextScreenshot ? nextScreenshot.total_activity.split(':').map(item => parseInt(item)).at(2)! : 0,
                                        interval: nextScreenshot ? nextScreenshot.total_activity.split(':').map(item => parseInt(item)).at(1)! % 10 : 0,
                                }

                        if (screenshot10min.screenshots.length > 0) {
                                screenshot10min.screenshots.push(screenshot)
                        } else {
                                screenshot10min = {
                                        start: screenshot.created_at,
                                        end: '',
                                        screenshots: [screenshot]
                                }
                        }

                        if ((!nextScreenshot || (nextScreenshot && nextScreenshotTimming.interval == TIME_INTERVAL['0MIN']))) {
                                screenshot10min.end = screenshot.created_at
                                if (screenshot1h.screenshots.length == 0) {
                                        screenshot1h.start = screenshot10min.start
                                }

                                screenshot1h.screenshots.push(screenshot10min)
                                screenshot10min = {
                                        start: '',
                                        end: '',
                                        screenshots: []
                                }

                                if (screenshot1h.screenshots.length >= 6) {
                                        screenshot1h.end = screenshot1h.screenshots.at(-1)!.end
                                        screenshotCollection.push(screenshot1h)
                                        screenshot1h = {
                                                start: '',
                                                end: '',
                                                screenshots: [],
                                        }
                                }
                        }
                })

                if (screenshot10min.screenshots.length > 0) {
                        screenshot10min.end = screenshot10min.screenshots.at(-1)!.created_at
                        if (screenshot1h.screenshots.length > 0) {
                                screenshot1h.screenshots.push(screenshot10min)
                                screenshot1h.end = screenshot10min.end
                        } else {
                                screenshot1h = {
                                        start: screenshot10min.start,
                                        end: screenshot10min.end,
                                        screenshots: [screenshot10min],
                                }
                        }
                        screenshot10min = {
                                start: '',
                                end: '',
                                screenshots: []
                        }
                }

                if (screenshot1h.screenshots.length > 0) {
                        screenshot1h.end = screenshot1h.screenshots.at(-1)!.end
                        screenshotCollection.push(screenshot1h)
                        screenshot1h = {
                                start: '',
                                end: '',
                                screenshots: [],
                        }
                }

                return screenshotCollection
        }

        getOccupancyTime = (screenshot: Screenshot10min): string => {
                const start = moment(screenshot.start),
                        end = moment(screenshot.end)

                let difference = end.diff(start, 'minutes'),
                        hours = Math.floor(difference / 3600),
                        minutes = Math.floor(difference % 3600) / 60,
                        seconds = difference % 60

                return moment({ hours: hours, minutes: minutes, seconds: seconds }).format('mm:ss')
        }

        onSelectedMember = async (member_id: number) => {
                this.setState({
                        ...this.state, ...{
                                selected_member: member_id
                        }
                })
                sleep(200)
                this.setDataState(member_id)
        }

        onSelectScreenshots = () => {
                const container = this.screenshotContainerRef.current
                if (isNull(container)) return
                let screen1h: NodeListOf<HTMLDivElement> = container.querySelectorAll('div[data-screen]'),
                        selectedScreenshot: Set<number> = new Set()
                screen1h.forEach(screenItem => {
                        let head = Array.from(screenItem.children).at(0) as HTMLDivElement,
                                headInput = head.querySelector('input[type="checkbox"]') as HTMLInputElement,
                                screenListContainer = Array.from(screenItem.children).at(1) as HTMLDivElement,
                                screenInputContainerList: Array<HTMLInputElement> = Array.from(screenListContainer.querySelectorAll('input[type="checkbox"]'))

                        const onHeadInputChange = () => {
                                if (headInput.checked) {
                                        screenInputContainerList.forEach(input => input.checked = true)
                                } else {
                                        screenInputContainerList.forEach(input => input.checked = false)
                                }
                                screenInputContainerList.forEach(input => onInputContainerChange(input))
                        },
                                onInputContainerChange = (input: HTMLInputElement) => {
                                        let id_list = input.getAttribute('data-screenshot')
                                        const screenshots_id = isNull(id_list) ? [] : id_list.split(',').map(id => parseInt(id))
                                        if (!input.checked) {
                                                headInput.checked = false
                                                screenshots_id.forEach(id => selectedScreenshot.delete(id))
                                        } else {
                                                const all_inputs_checked = screenInputContainerList.map(input => input.checked).filter(isChecked => isChecked == true).length == screenInputContainerList.length
                                                if (all_inputs_checked) headInput.checked = true
                                                screenshots_id.forEach(id => selectedScreenshot.add(id))
                                        }
                                        this.onScreenshotSelected(Object.values(Object.fromEntries(selectedScreenshot.entries())))
                                }

                        headInput ? headInput.addEventListener('change', onHeadInputChange, false) : null

                        screenInputContainerList.forEach(input => {
                                input.addEventListener('change', () => onInputContainerChange(input), false)
                        })
                })
        }

        onScreenshotSelected = (screenshots_id: Array<number>) => {
                const screenshot_option = this.screenshotContainerRef.current!.querySelector('#screenshot-option')
                if (isNull(screenshot_option)) return

                if (screenshots_id.length > 0) {
                        if (screenshot_option.classList.contains('d-none')) screenshot_option.classList.remove('d-none')
                        screenshot_option.querySelector('span:first-child')!.textContent = screenshots_id.length.toString()
                        screenshot_option.querySelector('span:last-child')!.addEventListener('click', async () => {
                                const delete_response = await deleteScreenshots(this.props.tk, screenshots_id)
                                if (delete_response.code !== 200) return
                                this.setDataState()
                        })
                } else {
                        if (!screenshot_option.classList.contains('d-none')) screenshot_option.classList.add('d-none')
                }
        }

        onScreenshotClick = (e: any, screenshot10min: Screenshot10min) => {
                if (e.target instanceof HTMLLabelElement || e.target instanceof HTMLInputElement) return
                let screenshots: Array<string> = []
                screenshot10min.screenshots.forEach(screenshot => {
                        screenshot.capture.forEach(image => screenshots.push(image))
                })

                this.screenshots = screenshots
        }

        displayScreenshots = () => this.screenshots.map((screenshot, key) => (
                <SwiperSlide
                        key={key}
                        className='d-flex justify-content-center align-items-center'>
                        <img src={getURI(`screenshots/screenshots_${(this.state.company as any).id}/${screenshot}`)} className="mw-100" alt="" />
                </SwiperSlide>
        )) ?? <span></span>

        onSwiperInit = (swiper: SwiperType) => {
                this.swiper = swiper
        }

        render(): React.ReactNode {
                const { selectedDate, selected_member } = this.state,
                        company_members = [...Object.values(this.state.company_members), ...[this.state.user]].reverse();
                let selected_member_id = company_members.length > 0 ? company_members.map(member => member.id).filter(user_id => user_id == selected_member).at(0)! : undefined,
                screenshots = this.state.activity ? this.state.activity.screenshots : [],
                occupancy = screenshots.map(screenshot => parseFloat(screenshot.occupancy)).filter(occupancy => occupancy > 0).reduce((accum, curr) => accum + curr, 0) / screenshots.length
                occupancy = isNaN(occupancy) ? 0 : occupancy

                return <SafeRaiseError>
                        <Suspense fallback={<Loading />}>
                                {
                                        this.pageLoading ? <div className=""></div> : <>
                                                <div className="card p-2">
                                                        <div className="container">
                                                        <h3 className="text-light">Activity</h3>
                                                                <div className="container py-2">
                                                                        <div className="row">
                                                                                <div className="col-xs-12 col-xl-8 mt-2">
                                                                                        <div className="d-flex align-items-center">
                                                                                                <button className='btn btn-light-secondary mr-2' onClick={this.handlePrevDay}>
                                                                                                        <i className="bx bx-chevron-left"></i>
                                                                                                </button>
                                                                                                <DatePicker
                                                                                                        selected={selectedDate}
                                                                                                        onChange={this.handleDateChange}
                                                                                                        showTimeSelect
                                                                                                        timeFormat="HH:mm"
                                                                                                        timeIntervals={15}
                                                                                                        dateFormat="dd/MM/yyyy HH:mm"
                                                                                                        className='form-control mw-110'
                                                                                                />
                                                                                                <button className='btn btn-outline-secondary mx-2' onClick={this.handleToDay}>Today</button>
                                                                                                <button className='btn btn-light-secondary' onClick={this.handleNextDay}>
                                                                                                        <i className="bx bx-chevron-right"></i>
                                                                                                </button>
                                                                                        </div>
                                                                                </div>
                                                                                <div className="col-xs-12 col-xl-4 mt-2">
                                                                                        {
                                                                                                this.state.user.type_user == TYPE_USER.USER ?
                                                                                                        <select
                                                                                                                name="company_member"
                                                                                                                className='custom-select'
                                                                                                                onChange={e => this.onSelectedMember(parseInt(e.target.selectedOptions[0].value))}
                                                                                                                value={selected_member_id}>
                                                                                                                {
                                                                                                                        company_members.map((member, key) => (
                                                                                                                                <option key={key} value={member.id}>{member.last_name} {member.first_name} {member.id == this.state.user.id ? '(Me)' : ''}</option>
                                                                                                                        ))
                                                                                                                }
                                                                                                        </select> : <span></span>
                                                                                        }
                                                                                </div>
                                                                        </div>
                                                                </div>

                                                                <div className="row activity_record position-relative my-3">
                                                                        <div className="col-xs-12 col-sm-6 col-lg-5">
                                                                                <h5 className="text-muted">Timer</h5>
                                                                                <span>
                                                                                        { this.state.activity ? this.state.activity.time : '00:00:00' }
                                                                                </span>
                                                                        </div>
                                                                        <div className="col-xs-12 col-sm-6 col-lg-5">
                                                                                <h5 className="text-muted">Occupancy</h5>
                                                                                <span>
                                                                                        { this.state.activity ? occupancy.toFixed(2) : 0 }%
                                                                                </span>
                                                                        </div>
                                                                </div>

                                                                {/* <!-- Widgets Statistics End --> */}
                                                                {/* <!-- Basic Tables start --> */}
                                                                <div className="row" id="basic-table">
                                                                        <div className="col-12">
                                                                                <div className="card">
                                                                                        <div className="card-content">
                                                                                                <div className="card-body">
                                                                                                        {/* <!-- Table with outer spacing --> */}
                                                                                                        <div className="container-fluid" ref={this.screenshotContainerRef}>
                                                                                                                {
                                                                                                                        this.state.activity && this.state.activity.screenshots.length > 0 ?
                                                                                                                                this.formatScreenshots(this.state.activity.screenshots).map((screenshot1h, key) => (
                                                                                                                                        <div key={key} data-screen>
                                                                                                                                                <section className='mb-2'>
                                                                                                                                                        <div className="custom-control custom-checkbox">
                                                                                                                                                                {
                                                                                                                                                                        this.state.user.type_user == TYPE_USER.USER && this.state.user.permission.deleteScreenshots == 1 ? (<>
                                                                                                                                                                                <input type="checkbox" className="custom-control-input bg-secondary" id={`screenshot1h_${key}`} />
                                                                                                                                                                                <label className="custom-control-label cursor-pointer" htmlFor={`screenshot1h_${key}`}>
                                                                                                                                                                                        {moment(screenshot1h.start).format('HH:mm')} - {moment(screenshot1h.end).format('HH:mm')}
                                                                                                                                                                                </label>
                                                                                                                                                                        </>) : <span>
                                                                                                                                                                                {moment(screenshot1h.start).format('HH:mm')} - {moment(screenshot1h.end).format('HH:mm')}
                                                                                                                                                                        </span>
                                                                                                                                                                }
                                                                                                                                                        </div>
                                                                                                                                                </section>
                                                                                                                                                <section className='container-fluid'>
                                                                                                                                                        <div className="row position-relative" style={{ height: '180px' }}>
                                                                                                                                                                {
                                                                                                                                                                        screenshot1h.screenshots.map((screenshot10min, index) => (
                                                                                                                                                                                <div key={index} className="col-12 col-md-6 col-lg-2 col-xl-2 screenshot-item mb-3">
                                                                                                                                                                                        <div className="d-flex flex-column position-relative">
                                                                                                                                                                                                <img
                                                                                                                                                                                                        src={`${getURI(`screenshots/screenshots_${(this.state.company as any).id}/${screenshot10min.screenshots.at(-1)!.capture.at(-1)}`)}`}
                                                                                                                                                                                                        className='w-100 rounded-lg position-absolute'
                                                                                                                                                                                                        alt="" />
                                                                                                                                                                                                <section
                                                                                                                                                                                                        className='screenshot-overlay rounded-lg'
                                                                                                                                                                                                        onClick={(e) => this.onScreenshotClick(e, screenshot10min)}>
                                                                                                                                                                                                        {
                                                                                                                                                                                                                this.state.user.type_user == TYPE_USER.USER && this.state.user.permission.deleteScreenshots == 1 ?
                                                                                                                                                                                                                        <div className="custom-control custom-checkbox">
                                                                                                                                                                                                                                <input type="checkbox" className="custom-control-input" id={`screenshot10min_${key}${index}`} data-screenshot={screenshot10min.screenshots.map(screen => screen.id)} />
                                                                                                                                                                                                                                <label className="custom-control-label cursor-pointer" htmlFor={`screenshot10min_${key}${index}`}>
                                                                                                                                                                                                                                        <i className="sr-only"></i>
                                                                                                                                                                                                                                </label>
                                                                                                                                                                                                                        </div> : <span></span>
                                                                                                                                                                                                        }
                                                                                                                                                                                                </section>
                                                                                                                                                                                                <section className='position-absolute w-100 screenshot-body'>
                                                                                                                                                                                                        <strong className='d-block'>{moment(screenshot10min.start).format('HH:mm')} - {moment(screenshot10min.end).format('HH:mm')}</strong>
                                                                                                                                                                                                        <span>{Math.ceil(screenshot10min.screenshots.reduce((accumulator, current) => accumulator + parseInt(current.occupancy), 0) / screenshot10min.screenshots.length)}%</span> -
                                                                                                                                                                                                        <span> {this.getOccupancyTime(screenshot10min)}</span>
                                                                                                                                                                                                </section>
                                                                                                                                                                                        </div>
                                                                                                                                                                                </div>
                                                                                                                                                                        ))
                                                                                                                                                                }
                                                                                                                                                        </div>
                                                                                                                                                </section>
                                                                                                                                        </div>
                                                                                                                                )) : <div className='d-flex justify-content-center align-items-center'>
                                                                                                                                        <p>Not activity</p>
                                                                                                                                </div>
                                                                                                                }
                                                                                                                <div
                                                                                                                        className={`screenshot-swiper ${this.screenshots.length > 0 ? '' : 'd-none'}`.trimEnd()}>
                                                                                                                        <button
                                                                                                                                className='screenshot-close-btn'
                                                                                                                                onClick={() => this.screenshots = []}>
                                                                                                                                <i className="bx bx-x"></i>
                                                                                                                        </button>
                                                                                                                        <Swiper
                                                                                                                                modules={[Navigation, Pagination, Zoom]}
                                                                                                                                spaceBetween={50}
                                                                                                                                slidesPerView={1}
                                                                                                                                navigation={{
                                                                                                                                        hideOnClick: true
                                                                                                                                }}
                                                                                                                                pagination={{
                                                                                                                                        clickable: true,
                                                                                                                                        hideOnClick: true
                                                                                                                                }}
                                                                                                                                zoom={{
                                                                                                                                        maxRatio: 5,
                                                                                                                                        toggle: true
                                                                                                                                }}
                                                                                                                                style={{
                                                                                                                                        width: '100%',
                                                                                                                                        height: '100%'
                                                                                                                                }}
                                                                                                                                onInit={this.onSwiperInit}>
                                                                                                                                {this.displayScreenshots()}
                                                                                                                        </Swiper>
                                                                                                                </div>
                                                                                                                <div className="screenshot-option d-none" id='screenshot-option'>
                                                                                                                        <span></span>
                                                                                                                        <span><i className="bx bx-trash text-danger"></i></span>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                {/* <!-- pagination and page count --> */}
                                                        </div>
                                                </div>
                                        </>
                                }
                        </Suspense>
                </SafeRaiseError>
        }
}

if (!isNull(component) && !isNull(token))
        createRoot(component).render(<Activity {...{ tk: token }} />);