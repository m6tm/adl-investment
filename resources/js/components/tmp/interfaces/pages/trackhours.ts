import { RefObject } from "react"
import { CompanyMemberUser, GetCustomUser, User } from "../chat"
import { Companie } from "./invoice"
import ReactApexChart from "react-apexcharts"
import { CHART_TYPE } from "../../enums/trackhours"


export interface StandardDate {
        updated_at: string
        created_at: string
}

export interface DateSelectorState {
        selectedDate: Date
        user: GetCustomUser
        company_members: Array<CompanyMemberUser>
        selected_member: number
        activity: ActivityInterface | null
        company: Companie
        screenshots: Array<string>
        loading_in_progress: boolean
}

export interface ReportState {
        selectedDate: Array<Date>
        user: GetCustomUser
        company_members: Array<CompanyMemberUser>
        selected_member: number
        activity: ActivityInterface
        activities: Array<ActivityUserInterface>
        activities_for_all: Array<ActivityInterface>
        activities_by_all: {
                [user_id: number]: ActivityUserInterface[];
        }
        company: Companie
        chart_type: CHART_TYPE
        loading_in_progress: boolean
        time_loading: boolean
        occupancie_loading: boolean
        chart_loading: boolean
        chart: {
                single: ReportApexChartObj
                all: ReportApexChartObj
        }
}

export interface ReportApexChartObj {
        ref: RefObject<ReactApexChart>,
        apex: ReactApexChart | null
}

export interface ActivityProps {
        tk: string
}

export interface ReportProps {
        tk: string
}

export interface ActivityInterface extends StandardDate {
        id: number
        user_id: number
        companie_id: number
        occupancy: number
        time: string
        screenshots: Array<Screenshot>
}

export interface ActivityUserInterface extends StandardDate {
        id: number
        user_id: number
        companie_id: number
        occupancy: number
        time: string
        screenshots: Array<Screenshot>
        user: User
}

export interface Screenshot extends StandardDate {
        id: number
        activitie_id: number
        capture: string
        occupancy: string
        idle_time: number
        total_activity: string
        start_time: string
        last_activity: string
        captured_at: string
}

export interface ScreenshotCapture extends StandardDate {
        id: number
        activitie_id: number
        capture: Array<string>
        occupancy: string
        idle_time: number
        total_activity: string
        start_time: string
        last_activity: string
        captured_at: string
}

export interface Screenshot10min {
        start: string
        end: string
        screenshots: Array<ScreenshotCapture>
}

export interface Screenshot01h {
        start: string
        end: string
        screenshots: Array<Screenshot10min>
}

export type ScreenshotCollection = Array<Screenshot01h>

export interface WeekRange {
        startDate: Date
        endDate: Date
}

export interface GetDayliActivityResponse {
        code: number
        activity: ActivityInterface | null
        errors: Array<string> | undefined
}

export interface GetActivityRangeDateResponse {
        code: number
        response: Array<ActivityInterface>
        errors: Array<string> | undefined
}

export interface GetActivityRangeDateAllResponse {
        code: number
        response: Array<ActivityUserInterface>
        errors: Array<string> | undefined
}