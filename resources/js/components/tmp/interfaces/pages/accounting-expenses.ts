import { ApexOptions } from "apexcharts"
import { BalanceSheetWorker } from "../../accounting-expenses/BalanceSheetWorker"
import { BalanceSheetChartTimeFrame, BalanceSheetChartType } from "../../enums/accounting-expenses"
import { BalanceSheetGroup, ExpenseCollection, RevenuSheetCollection } from "../../types/account-expenses"
import { MainInvoiceCustom } from "./invoice"


export interface IBalancesheetState {
        options: ApexOptions | undefined
        series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
        date_range: IDateRange
        prev_date_range: IDateRange
        timeframe: BalanceSheetChartTimeFrame
        balanceSheet: BalanceSheetGroup
        oldBalanceSheet: BalanceSheetGroup
        loading: boolean
        worker: BalanceSheetWorker
}

export interface IDateRange {
        start: string
        end: string
}

export interface IBalancesheetProps {
        tk: string
}

export interface IBalanceSheetResponse {
        code: number
        response: {
                message: string
                revenues: RevenuSheetCollection
                expenses: ExpenseCollection
                invoices: MainInvoiceCustom[]
        }
}

export interface IChartCoordonnees {
        [date: string]: {
                type: BalanceSheetChartType
                coordonees: IChartCoordonneesItem
        }
}

export interface IChartCoordonneesItem {
        x: string
        y: number
}

export interface IChartData {
        expenses: IChartCoordonnees;
        revenues_paid: IChartCoordonnees;
        revenues_pending_payment: IChartCoordonnees;
}