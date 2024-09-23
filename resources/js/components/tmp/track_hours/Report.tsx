import React, { RefObject, Suspense, createRef } from "react";
import { getHook, getURI, sleep } from "../functions/tools";
import { ReportApexChartObj, ReportProps, ReportState } from "../interfaces/pages/trackhours";
import { isEmpty, isNull, isUndefined } from "lodash";
import { createRoot } from "react-dom/client";
import moment, { Moment } from "moment";
import { GetCustomUser } from "../interfaces/chat";
import { Companie } from "../interfaces/pages/invoice";
import { getCompanyMember, getMyCredentials } from "../API/chat";
import { getActivityRangeDate, getActivityRangeDateForAll, getDailyActivity } from "../API/pages/trackhours";
import { getCompanie } from "../API/pages/invoice";
import SafeRaiseError from "../SafeRaiseError";
import Loading from "../Loading";
import { TYPE_USER } from "../enums/chat";
import { StaticActivity, lineChartOptions } from "../data/trackhours";
import ReactApexChart from "react-apexcharts";
import ContentLoader from "react-content-loader";
import { actititiesAverage, actititiesAverageForAllUsers, actititiesAverages, getRandomNumber, getWeekRange, rangeActivities, rangeActivityForAll, sumActivitiesRange, sumTimes, sumTimesForAllUsers } from "../functions/trackhours";
import { CHART_TYPE } from "../enums/trackhours";
import * as XLSx from 'xlsx'

declare global {
        interface Window {
                $: any
        }
}


const component = document.getElementById('report-component'),
        token = getHook()

class Report extends React.Component {

        props!: Readonly<ReportProps>
        state: Readonly<ReportState>
        singleTableRef: RefObject<HTMLTableElement> = createRef()
        allTableRef: RefObject<HTMLDivElement> = createRef()

        constructor(props: Readonly<{}>) {
                super(props)
                this.state = {
                        selectedDate: [moment().startOf('week').toDate(), moment().endOf('week').toDate()],
                        user: {} as GetCustomUser,
                        company_members: [],
                        selected_member: 0,
                        activity: StaticActivity,
                        activities: [],
                        activities_for_all: [],
                        activities_by_all: {},
                        company: {} as Companie,
                        chart_type: CHART_TYPE.SINGLE,
                        loading_in_progress: true,
                        time_loading: true,
                        occupancie_loading: true,
                        chart_loading: true,
                        chart: {
                                single: {
                                        ref: createRef(),
                                        apex: null
                                },
                                all: {
                                        ref: createRef(),
                                        apex: null
                                },
                        }
                }
        }

        get selected_member() {
                return this.state.selected_member
        }

        set selected_member(selected_member: number) {
                this.setState({
                        ...this.state, ...{
                                selected_member
                        }
                })
        }

        get chartLoading() {
                return this.state.chart_loading
        }

        set chartLoading(chart_loading: boolean) {
                this.setState({
                        ...this.state, ...{
                                chart_loading
                        }
                })
        }

        get chart_type() {
                return this.state.chart_type
        }

        set chart_type(chart_type: CHART_TYPE) {
                this.setState({
                        ...this.state, ...{
                                chart_type
                        }
                })
        }

        get ocupancieLoading() {
                return this.state.occupancie_loading
        }

        set ocupancieLoading(occupancie_loading: boolean) {
                this.setState({
                        ...this.state, ...{
                                occupancie_loading
                        }
                })
        }

        get timeLoading() {
                return this.state.time_loading
        }

        set timeLoading(time_loading: boolean) {
                this.setState({
                        ...this.state, ...{
                                time_loading
                        }
                })
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

        get selected_date() {
                return this.state.selectedDate
        }

        set selected_date(selectedDate: Array<Date>) {
                this.setState({
                        ...this.state, ...{
                                selectedDate
                        }
                })
        }

        get chart_single() {
                return this.state.chart.single
        }

        set chart_single(single: ReportApexChartObj) {
                this.setState({
                        ...this.state, ...{
                                chart: {
                                        ...this.state.chart, ...{
                                                single
                                        }
                                }
                        }
                })
        }

        get chart_all() {
                return this.state.chart.all
        }

        set chart_all(all: ReportApexChartObj) {
                this.setState({
                        ...this.state, ...{
                                chart: {
                                        ...this.state.chart, ...{
                                                all
                                        }
                                }
                        }
                })
        }

        componentDidMount(): void {
                this.pageLoading = true
                this.setDataState()
        }

        setDataState = async (user_id: number | undefined = this.state.selected_member == 0 ? undefined : this.state.selected_member) => {
                await sleep(200)
                this.timeLoading = true
                await sleep(100)
                this.ocupancieLoading = true
                await sleep(100)
                this.chartLoading = true
                const weekRange = {
                        startDate: moment(this.selected_date[0]).format('YYYY-MM-DD'),
                        endDate: moment(this.selected_date[1]).format('YYYY-MM-DD'),
                }
                const companie_member = await getCompanyMember(this.props.tk),
                        myCredentials = await getMyCredentials(this.props.tk),
                        myActivity = await getDailyActivity(this.props.tk, moment(moment.now()).format('YYYY-MM-DD'), user_id),
                        activityRange = await getActivityRangeDate(this.props.tk, weekRange.startDate, weekRange.endDate, user_id),
                        activityRangeAll = await getActivityRangeDateForAll(this.props.tk, weekRange.startDate, weekRange.endDate),
                        company = await getCompanie(this.props.tk)

                if (
                        [
                                companie_member.code, myActivity.code,
                                activityRange.code, company.code, activityRangeAll.code
                        ].find(code => code !== 200) ||
                        (myCredentials.code !== 200 || isNull(myCredentials.response.user))
                ) return

                const activities_by_all_users = await rangeActivityForAll(weekRange.startDate, weekRange.endDate, activityRangeAll.response, [...Object.values(companie_member.data), ...[myCredentials.response.user]])

                this.setState({
                        ...this.state, ...{
                                user: myCredentials.response.user,
                                company_members: companie_member.data,
                                selected_member: isUndefined(user_id) ? myCredentials.response.user.id : user_id,
                                activity: myActivity.activity ?? StaticActivity,
                                activities: rangeActivities(weekRange.startDate, weekRange.endDate, activityRange.response),
                                company: company.response.companie,
                                activities_for_all: await sumActivitiesRange(activities_by_all_users),
                                activities_by_all: activities_by_all_users,
                        }
                })
                
                await sleep(200)
                if (this.pageLoading) this.pageLoading = false
                await sleep(100)
                if (this.timeLoading) this.timeLoading = false
                await sleep(100)
                if (this.ocupancieLoading) this.ocupancieLoading = false
                await sleep(100)
                if (this.chartLoading) this.chartLoading = false

                window.$('#daterange').daterangepicker({
                        opens: 'left',
                        startDate: moment(this.selected_date[0]),
                        endDate: moment(this.selected_date[1]),
                }, async (start: Moment, end: Moment, label: string) => {
                        this.selected_date = [moment(start).toDate(), moment(end).toDate()]
                        await sleep(200)
                        this.setDataState()
                })
        }

        selecteMember = async (value: HTMLCollectionOf<HTMLOptionElement>) => {
                const values = Array.from(value).map(option => option.value).filter(option => !isNaN(parseInt(option)))
                if (isEmpty(values)) {
                        this.chart_type = CHART_TYPE.ALL
                        return
                }
                this.chart_type = CHART_TYPE.SINGLE
                await sleep(200)
                this.selected_member = isEmpty(values[0]) ? this.selected_member : parseInt(values[0])
                await sleep(200)
                this.setDataState()
        }

        exportAsXlsx = () => {
                let table = this.singleTableRef.current,
                        _tables = this.allTableRef.current

                if (!table || !_tables) return

                let tables = Array.from(_tables.querySelectorAll('table')),
                        workpaper = XLSx.utils.book_new()

                workpaper.Props = {
                        ...workpaper.Props, ...{
                                Title: "Activity Report Sheet",
                                Author: "Kanban Codrock",
                        }
                }

                if (this.chart_type == CHART_TYPE.SINGLE) {
                        let table_copy: HTMLTableElement = table.cloneNode(true) as any
                        
                        for (let index = 0; index < table.rows.length; index++) {
                                const occupancy = table_copy.rows.item(index)!.cells.item(2)!.textContent
                                table_copy.rows.item(index)!.cells.item(2)!.textContent = !occupancy || !occupancy.match(/^[\d\.]+/) ? '0.00' : occupancy.match(/^[\d\.]*/)![0]
                        }
                        let worksheet = XLSx.utils.table_to_sheet(table_copy)
                        XLSx.utils.book_append_sheet(workpaper, worksheet, "Tableau")
                } else {
                        tables.forEach((table_item, index) => {
                                let table_copy: HTMLTableElement = table_item.cloneNode(true) as any

                                for (let index = 0; index < table_copy.rows.length; index++) {
                                        const occupancy = table_copy.rows.item(index)!.cells.item(2)!.textContent
                                        table_copy.rows.item(index)!.cells.item(2)!.textContent = !occupancy || !occupancy.match(/^[\d\.]+/) ? '0.00' : occupancy.match(/^[\d\.]*/)![0]
                                }
                                let worksheet = XLSx.utils.table_to_sheet(table_copy)
                                XLSx.utils.book_append_sheet(workpaper, worksheet, `Tableau ${index}`)
                        })
                }

                XLSx.writeFileXLSX(workpaper, 'report.xlsx', {
                        type: 'file',
                        bookType: 'xlsx'
                })
        }

        render(): React.ReactNode {
                return <SafeRaiseError>
                        <Suspense fallback={<Loading />}>
                                {
                                        this.pageLoading ? <div className=""></div> : (
                                                <div className="card p-2">
                                                        <h3 className="text-light">Time &amp; Activity report</h3>
                                                        <ul className="nav nav-pills d-flex justify-content-end">
                                                                <li className="nav-item d-flex align-items-center">
                                                                        <fieldset className="form-group position-relative has-icon-left mb-0" style={{ width: '300px' }}>
                                                                                <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="daterange"
                                                                                        value={`${moment(this.selected_date[0]).format('MM/DD/YYYY')} - ${moment(this.selected_date[1]).format('MM/DD/YYYY')}`}
                                                                                        onChange={e => false}
                                                                                />

                                                                                <div className="form-control-position">
                                                                                        <i className="bx bx-calendar"></i>
                                                                                </div>
                                                                        </fieldset>

                                                                        {
                                                                                <select
                                                                                        className="custom-select ml-1"
                                                                                        value={this.chart_type == CHART_TYPE.ALL ? "" : this.state.selected_member}
                                                                                        onChange={e => this.selecteMember(e.target.selectedOptions)}
                                                                                        style={{ width: '200px' }}>
                                                                                        <option value="">Show for all</option>
                                                                                        <option value={this.state.user.id}>(Me) {this.state.user.last_name} {this.state.user.first_name}</option>
                                                                                        {
                                                                                                Object.values(this.state.company_members).map(member => (
                                                                                                        <option value={member.id} key={member.id}>{member.last_name} {member.first_name}</option>
                                                                                                ))
                                                                                        }
                                                                                </select>
                                                                        }
                                                                </li>
                                                                <li className="nav-item d-flex align-items-center">
                                                                        <button
                                                                                className="btn btn-secondary round"
                                                                                onClick={this.exportAsXlsx}>
                                                                                <i className="bx bx-download"></i>
                                                                        </button>
                                                                </li>
                                                        </ul>
                                                        <div className="tab-content shadow-none">
                                                                <div role="tabpanel" className={`tab-pane ${this.chart_type == CHART_TYPE.SINGLE ? 'active show' : ''}`.trimEnd()} id="single" aria-labelledby="single-tab">
                                                                        <div className="row activity_record position-relative">
                                                                                <div className="col-xs-12 col-sm-6 col-lg-5">
                                                                                        <h5 className="text-muted">Time</h5>
                                                                                        <span>
                                                                                                {
                                                                                                        this.timeLoading ? (
                                                                                                                <ContentLoader
                                                                                                                        speed={2}
                                                                                                                        width={400}
                                                                                                                        height={195}
                                                                                                                        viewBox="0 0 400 195"
                                                                                                                        backgroundColor="#f3f3f3"
                                                                                                                        foregroundColor="#ecebeb"
                                                                                                                        style={{ pointerEvents: 'none', position: 'absolute' }}
                                                                                                                >
                                                                                                                        <rect x="0" y="0" rx="3" ry="3" width="150" height="38" />
                                                                                                                </ContentLoader>
                                                                                                        ) : sumTimes(this.state.activities.map(activity => activity.time))
                                                                                                }
                                                                                        </span>
                                                                                </div>
                                                                                <div className="col-xs-12 col-sm-6 col-lg-5">
                                                                                        <h5 className="text-muted">Avg Activity</h5>
                                                                                        <span>
                                                                                                {
                                                                                                        this.ocupancieLoading ? (
                                                                                                                <ContentLoader
                                                                                                                        speed={2}
                                                                                                                        width={400}
                                                                                                                        height={195}
                                                                                                                        viewBox="0 0 400 195"
                                                                                                                        backgroundColor="#f3f3f3"
                                                                                                                        foregroundColor="#ecebeb"
                                                                                                                        style={{ pointerEvents: 'none', position: 'absolute' }}
                                                                                                                >
                                                                                                                        <rect x="0" y="0" rx="3" ry="3" width="100" height="38" />
                                                                                                                </ContentLoader>
                                                                                                        ) : `${actititiesAverage(this.state.activities.map(activity => activity.occupancy).filter(activity => activity > 0)).toFixed(2)}%`
                                                                                                }
                                                                                        </span>
                                                                                </div>
                                                                        </div>
                                                                        <div className="card-body position-relative" style={{ height: 370 }}>
                                                                                {
                                                                                        this.chartLoading ?
                                                                                                <Loading {...{ width: '100%', height: 350, top: 0, right: 0 }} /> :
                                                                                                <ReactApexChart
                                                                                                        options={lineChartOptions.options(
                                                                                                                this.state.activities.map(activity => moment(activity.created_at).format('ddd, DD'))
                                                                                                        )}
                                                                                                        ref={this.chart_single.ref}
                                                                                                        series={lineChartOptions.series(
                                                                                                                this.state.activities.map(activity => activity.time),
                                                                                                        )}
                                                                                                        type="line"
                                                                                                        height={350}
                                                                                                />
                                                                                }
                                                                        </div>
                                                                        <div className="card-body">
                                                                                <div id="accordion">
                                                                                        {
                                                                                                !this.chartLoading ? [
                                                                                                        this.state.selected_member == this.state.user.id ? this.state.user : Object.values(this.state.company_members).find(user => user.id == this.state.selected_member)!
                                                                                                ].map((user, index) => (
                                                                                                        <React.Fragment key={index}>
                                                                                                                <div className="card mb-0">
                                                                                                                        <div className="card-header py-1" id={`heading${index}`}>
                                                                                                                                <h5 className="mb-0">
                                                                                                                                        <button className="btn btn-link th-user-btn" data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                                                                                                                                                <div className="avatar">
                                                                                                                                                        <img src={getURI(user.avatar)} alt="avtar img holder" height="32" width="32" />
                                                                                                                                                </div>
                                                                                                                                                <span className='text-capitalize ml-1'>
                                                                                                                                                        {`${user.last_name} ${user.first_name}`}
                                                                                                                                                </span>
                                                                                                                                        </button>
                                                                                                                                </h5>
                                                                                                                        </div>
                                                                                                                </div>

                                                                                                                <div id={`collapse${index}`} className={`collapse ${index == 0 ? 'show' : ''}`.trimEnd()} aria-labelledby={`heading${index}`} data-parent="#accordion">
                                                                                                                        <div className="card-body py-0">
                                                                                                                                <div className="table-responsive">
                                                                                                                                        <table className="table table-hover mb-0" ref={this.singleTableRef}>
                                                                                                                                                <thead>
                                                                                                                                                        <tr>
                                                                                                                                                                <th>TOTAL</th>
                                                                                                                                                                <th>{sumTimes(this.state.activities.map(activity => activity.time))}</th>
                                                                                                                                                                <th>{`${actititiesAverage(this.state.activities.map(activity => activity.occupancy).filter(activity => activity > 0)).toFixed(2)}%`}</th>
                                                                                                                                                        </tr>
                                                                                                                                                </thead>
                                                                                                                                                <tbody>
                                                                                                                                                        {
                                                                                                                                                                this.state.activities.map((activity, key) => (
                                                                                                                                                                        <tr key={key}>
                                                                                                                                                                                <td className="text-bold-500">
                                                                                                                                                                                        {moment(activity.created_at).format('ddd, DD MMM YYYY')}
                                                                                                                                                                                </td>
                                                                                                                                                                                <td>
                                                                                                                                                                                        {activity.time}
                                                                                                                                                                                </td>
                                                                                                                                                                                <td>
                                                                                                                                                                                        {activity.occupancy}%
                                                                                                                                                                                </td>
                                                                                                                                                                        </tr>
                                                                                                                                                                ))
                                                                                                                                                        }
                                                                                                                                                </tbody>
                                                                                                                                        </table>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                        </React.Fragment>
                                                                                                )) : <span></span>
                                                                                        }
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                {
                                                                        this.state.user.type_user == TYPE_USER.USER ?
                                                                                <div className={`tab-pane ${this.chart_type == CHART_TYPE.ALL ? 'active show' : ''}`.trimEnd()} id="all" role="tabpanel" aria-labelledby="all-tab">
                                                                                        <div className="row activity_record position-relative">
                                                                                                <div className="col-xs-12 col-sm-6 col-lg-5">
                                                                                                        <h5 className="text-muted">Time</h5>
                                                                                                        <span>
                                                                                                                {
                                                                                                                        this.timeLoading ? (
                                                                                                                                <ContentLoader
                                                                                                                                        speed={2}
                                                                                                                                        width={400}
                                                                                                                                        height={195}
                                                                                                                                        viewBox="0 0 400 195"
                                                                                                                                        backgroundColor="#f3f3f3"
                                                                                                                                        foregroundColor="#ecebeb"
                                                                                                                                        style={{ pointerEvents: 'none', position: 'absolute' }}
                                                                                                                                >
                                                                                                                                        <rect x="0" y="0" rx="3" ry="3" width="150" height="38" />
                                                                                                                                </ContentLoader>
                                                                                                                        ) : sumTimesForAllUsers(this.state.activities_by_all)
                                                                                                                }
                                                                                                        </span>
                                                                                                </div>
                                                                                                <div className="col-xs-12 col-sm-6 col-lg-5">
                                                                                                        <h5 className="text-muted">Avg Activity</h5>
                                                                                                        <span>
                                                                                                                {
                                                                                                                        this.ocupancieLoading ? (
                                                                                                                                <ContentLoader
                                                                                                                                        speed={2}
                                                                                                                                        width={400}
                                                                                                                                        height={195}
                                                                                                                                        viewBox="0 0 400 195"
                                                                                                                                        backgroundColor="#f3f3f3"
                                                                                                                                        foregroundColor="#ecebeb"
                                                                                                                                        style={{ pointerEvents: 'none', position: 'absolute' }}
                                                                                                                                >
                                                                                                                                        <rect x="0" y="0" rx="3" ry="3" width="100" height="38" />
                                                                                                                                </ContentLoader>
                                                                                                                        ) : `${actititiesAverageForAllUsers(this.state.activities_by_all).toFixed(2)}%`
                                                                                                                }
                                                                                                        </span>
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="card-body position-relative" style={{ height: 370 }}>
                                                                                                {
                                                                                                        this.chartLoading ?
                                                                                                                <Loading {...{ width: '100%', height: 350, top: 0, right: 0 }} /> :
                                                                                                                <ReactApexChart
                                                                                                                        options={lineChartOptions.options(
                                                                                                                                this.state.activities_for_all.map(activity => moment(activity.created_at).format('ddd, DD'))
                                                                                                                        )}
                                                                                                                        ref={this.chart_all.ref}
                                                                                                                        series={lineChartOptions.series(
                                                                                                                                this.state.activities_for_all.map(activity => activity.time),
                                                                                                                        )}
                                                                                                                        type="line"
                                                                                                                        height={350}
                                                                                                                />
                                                                                                }
                                                                                        </div>
                                                                                        <div className="card-body">
                                                                                                <div id="accordion" ref={this.allTableRef}>
                                                                                                        {
                                                                                                                !this.chartLoading ? [
                                                                                                                        ...[this.state.user], ...Object.values(this.state.company_members)
                                                                                                                ].map((user, index) => {
                                                                                                                        const activities = this.state.activities_by_all[user.id] ?? []
                                                                                                                        index = parseInt(`${index}${getRandomNumber(100, 300)}`)
                                                                                                                        return (
                                                                                                                                <div className="card mb-0" key={index}>
                                                                                                                                        <div className="card-header py-1" id={`heading${index}`}>
                                                                                                                                                <h5 className="mb-0">
                                                                                                                                                        <button className="btn btn-link th-user-btn" data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                                                                                                                                                                <div className="avatar">
                                                                                                                                                                        <img src={getURI(user.avatar)} alt="avtar img holder" height="32" width="32" />
                                                                                                                                                                </div>
                                                                                                                                                                <span className='text-capitalize ml-1'>
                                                                                                                                                                        {`${user.last_name} ${user.first_name}`}
                                                                                                                                                                </span>
                                                                                                                                                        </button>
                                                                                                                                                </h5>
                                                                                                                                        </div>
                                                                                                                                        <div id={`collapse${index}`} className="collapse" aria-labelledby={`heading${index}`} data-parent="#accordion">
                                                                                                                                                <div className="card-body py-0">
                                                                                                                                                        <div className="table-responsive">
                                                                                                                                                                <table className="table table-hover mb-0">
                                                                                                                                                                        <thead>
                                                                                                                                                                                <tr>
                                                                                                                                                                                        <th>TOTAL</th>
                                                                                                                                                                                        <th>{sumTimes(activities.map(activity => activity.time))}</th>
                                                                                                                                                                                        <th>{`${actititiesAverages(activities).toFixed(2)}%`}</th>
                                                                                                                                                                                </tr>
                                                                                                                                                                        </thead>
                                                                                                                                                                        <tbody>
                                                                                                                                                                                {
                                                                                                                                                                                        activities.map((activity, key) => (
                                                                                                                                                                                                <tr key={key}>
                                                                                                                                                                                                        <td className="text-bold-500">
                                                                                                                                                                                                                {moment(activity.created_at).format('ddd, DD MMM YYYY')}
                                                                                                                                                                                                        </td>
                                                                                                                                                                                                        <td>
                                                                                                                                                                                                                {activity.time}
                                                                                                                                                                                                        </td>
                                                                                                                                                                                                        <td>
                                                                                                                                                                                                                {activity.occupancy}%
                                                                                                                                                                                                        </td>
                                                                                                                                                                                                </tr>
                                                                                                                                                                                        ))
                                                                                                                                                                                }
                                                                                                                                                                        </tbody>
                                                                                                                                                                </table>
                                                                                                                                                        </div>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        )
                                                                                                                }) : <span></span>
                                                                                                        }
                                                                                                </div>
                                                                                        </div>
                                                                                </div> : <span></span>
                                                                }
                                                        </div>
                                                </div>
                                        )
                                }
                        </Suspense>
                </SafeRaiseError >
        }
}

if (!isNull(component) && !isNull(token))
        createRoot(component).render(<Report {...{ tk: token }} />);