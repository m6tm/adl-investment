import React from "react";
import { createRoot } from "react-dom/client";
import Chart from "react-apexcharts";
import { IBalancesheetProps, IBalancesheetState, IDateRange } from "../interfaces/pages/accounting-expenses";
import { BalanceSheetWorker } from "./BalanceSheetWorker";
import { isNaN, isUndefined, last } from "lodash";
import moment from "moment";
import { BalanceSheetChartTimeFrame } from "../enums/accounting-expenses";
import ContentLoader from "react-content-loader";
import { getHook, sleep } from "../functions/tools";
import { getBalanceSheet } from "../API/pages/accounting-espenses";
import { showToast } from "../functions/toast";

const INITIAL_DATE_RANGE: IDateRange = {
	start: moment(moment.now()).startOf("month").format("MM-DD-YYYY"),
	end: moment(moment.now()).endOf("month").format("MM-DD-YYYY"),
}

export default class BalanceSheet extends React.Component {
	state: Readonly<IBalancesheetState>;
        props!: Readonly<IBalancesheetProps>;

	constructor(props: Array<any>) {
		super(props);
		this.state = {
			options: undefined,
			series: undefined,
			date_range: INITIAL_DATE_RANGE,
			prev_date_range: {
				start: moment(moment.now()).subtract(1, "month").startOf("month").format("MM-DD-YYYY"),
				end: moment(moment.now()).subtract(1, "month").endOf("month").format("MM-DD-YYYY"),
			},
			timeframe: BalanceSheetChartTimeFrame.MOUNTHLY,
			balanceSheet: {
				revenues: [],
				expenses: [],
				invoices: [],
			},
			oldBalanceSheet: {
				revenues: [],
				expenses: [],
				invoices: [],
			},
			loading: false,
			worker: new BalanceSheetWorker(this),
		};
	}

	get worker() {
		return this.state.worker;
	}

	async componentDidMount(): Promise<void> {
		this.worker.loading = true
		await sleep(.2)
		this.worker.initialiseChart();
		const response = await getBalanceSheet(this.props.tk, this.state.date_range.start, this.state.date_range.end)
		this.worker.prev_date_range = INITIAL_DATE_RANGE
		await sleep(.2)
		const old_response = await getBalanceSheet(this.props.tk, this.state.prev_date_range.start, this.state.prev_date_range.end)
		
		if (response.code !== 200 || old_response.code !== 200) {
			showToast(response.response.message, 'danger').showToast()
			return
		}
		
		const { revenues, expenses, invoices } = response.response
		this.worker.balance_sheet = { revenues, expenses, invoices }
		await sleep(.2)
		const { revenues: old_revenues, expenses: old_expenses, invoices: old_invoices } = old_response.response
		this.worker.old_balance_sheet = { revenues: old_revenues, expenses: old_expenses, invoices: old_invoices }
		await sleep(.2)
		const datas = await this.worker.initialiseChart(this.worker.fetchChartData());
		await sleep(.2)
		this.worker.loading = false
		console.log(datas)
	}

	render(): React.ReactNode {
		const { current: current_pending_payment, prev: prev_pending_payment } = this.worker.pendingPayments()
		const { percent: percent_pending_payment_diff, status: status_pending_payment_diff } = this.worker.pendingPaymentsDiff(prev_pending_payment, current_pending_payment)

		const { current: current_total_expenses, prev: prev_total_expenses } = this.worker.totalExpenses()
		const { percent: percent_total_expenses_diff, status: status_total_expenses_diff } = this.worker.totalEpensesDiff(prev_total_expenses, current_total_expenses)

		const { current: current_brute_sales, prev: prev_brute_sales } = this.worker.brutSales()
		const { percent: percent_brute_sales_diff, status: status_brute_sales_diff } = this.worker.bruteSalesDiff(prev_brute_sales, current_brute_sales)

		const { brute_sales, brute_sales_diff } = this.worker.netSales()
		const { current: current_net_sales, prev: prev_net_sales } = brute_sales
		const { percent: percent_net_sales_diff, status: status_net_sales_diff } = brute_sales_diff

		console.log('series', this.state.series);

		return (
			<div className="card widget-order-activity">
				<div className="card-header d-md-flex justify-content-between align-items-center">
					<h4 className="card-title">Balance Sheet</h4>
					<div className="header-right mt-md-0 mt-50">
						<fieldset className="d-inline-block form-group position-relative has-icon-left mb-50">
							<input
								type="text"
								className="form-control daterange"
								value={`${this.state.date_range.start} - ${this.state.date_range.end}`}
								onChange={(e) =>
									this.worker.onChangeDate({
										start: e.target.value.split(" - ").at(0)!,
										end: e.target.value.split(" - ").at(1)!,
									})
								}
							/>
							<div className="form-control-position">
								<i className="bx bx-calendar"></i>
							</div>
						</fieldset>
						<div className="btn-group d-none" role="group" aria-label="Basic example">
							<button
								type="button"
								className={
									"btn" +
									(this.state.timeframe === BalanceSheetChartTimeFrame.MOUNTHLY
										? " active"
										: "")
								}
								onClick={() =>
									this.worker.onChangeTimeframe(
										BalanceSheetChartTimeFrame.MOUNTHLY
									)
								}
							>
								Mounthly
							</button>
							<button
								type="button"
								className={
									"btn" +
									(this.state.timeframe === BalanceSheetChartTimeFrame.ANNUALLY
										? " active"
										: "")
								}
								onClick={() =>
									this.worker.onChangeTimeframe(
										BalanceSheetChartTimeFrame.ANNUALLY
									)
								}
							>
								Annually
							</button>
						</div>
					</div>
				</div>
				<div className="card-content">
					<div className="card-body">
						<div className="container-fluid">
							{!isUndefined(this.worker.options) &&
							!isUndefined(this.worker.series) ? (
								<Chart
									options={this.worker.options}
									series={this.worker.series}
									type="line"
									width={"100%"}
									height={"500px"}
								/>
							) : (
								<span></span>
							)}
						</div>
					</div>
				</div>
				<div className="card-footer border-top widget-order-activity-footer">
					<div className="row">
						<div className="col-md-3 col-sm-6">
							<div className="d-flex flex-column">
								<span>Net sales</span>
								{this.state.loading ? (
									<ContentLoader
										rtl
										speed={2}
										width={100}
										height={80}
										viewBox="0 0 100 80"
										backgroundColor="#d1d1d1"
										foregroundColor="#ecebeb"
									>
										<rect x="0" y="13" rx="3" ry="3" width="50" height="24" />
										<circle cx="80" cy="25" r="20" />
									</ContentLoader>
								) : (
									<>
										<div className="d-flex align-items-center">
											<div className="badge-circle badge-circle-lg badge-circle-light-secondary flex-column mr-1">
												<i className={`bx bx-caret-up text-${status_net_sales_diff == 'down' ? 'danger' : 'success'} font-medium-4`}></i>
												<small className="text-muted">{status_net_sales_diff == 'down' ? '-' : '+'}{isNaN(percent_net_sales_diff) ? 0 : percent_net_sales_diff}%</small>
											</div>
											<h4 className="mb-0">${current_net_sales}</h4>
										</div>
									</>
								)}
							</div>
						</div>
						<div className="col-md-3 col-sm-6">
							<div className="d-flex flex-column">
								<span>Brut sales</span>
								{this.state.loading ? (
									<ContentLoader
										rtl
										speed={2}
										width={100}
										height={80}
										viewBox="0 0 100 80"
										backgroundColor="#d1d1d1"
										foregroundColor="#ecebeb"
									>
										<rect x="0" y="13" rx="3" ry="3" width="50" height="24" />
										<circle cx="80" cy="25" r="20" />
									</ContentLoader>
								) : (
									<>
										<div className="d-flex align-items-center">
											<div className="badge-circle badge-circle-lg badge-circle-light-secondary flex-column mr-1">
												<i className={`bx bx-caret-up text-${status_brute_sales_diff == 'down' ? 'danger' : 'success'} font-medium-4`}></i>
												<small className="text-muted">{status_brute_sales_diff == 'down' ? '-' : '+'}{isNaN(percent_brute_sales_diff) ? 0 : percent_brute_sales_diff}%</small>
											</div>
											<h4 className="mb-0">${current_brute_sales}</h4>
										</div>
									</>
								)}
							</div>
						</div>
						<div className="col-md-3 col-sm-6">
							<div className="d-flex flex-column">
								<span>Total expenses</span>
								{this.state.loading ? (
									<ContentLoader
										rtl
										speed={2}
										width={100}
										height={80}
										viewBox="0 0 100 80"
										backgroundColor="#d1d1d1"
										foregroundColor="#ecebeb"
									>
										<rect x="0" y="13" rx="3" ry="3" width="50" height="24" />
										<circle cx="80" cy="25" r="20" />
									</ContentLoader>
								) : (
									<>
										<div className="d-flex align-items-center">
											<div className="badge-circle badge-circle-lg badge-circle-light-secondary flex-column mr-1">
												<i className={`bx bx-caret-up text-${status_total_expenses_diff == 'down' ? 'danger' : 'success'} font-medium-4`}></i>
												<small className="text-muted">{status_total_expenses_diff == 'down' ? '-' : '+'}{isNaN(percent_total_expenses_diff) ? 0 : percent_total_expenses_diff}%</small>
											</div>
											<h4 className="mb-0">${current_total_expenses}</h4>
										</div>
									</>
								)}
							</div>
						</div>
						<div className="col-md-3 col-sm-6">
							<div className="d-flex flex-column">
								<span>Pending Payments</span>
								{this.state.loading ? (
									<ContentLoader
										rtl
										speed={2}
										width={100}
										height={80}
										viewBox="0 0 100 80"
										backgroundColor="#d1d1d1"
										foregroundColor="#ecebeb"
									>
										<rect x="0" y="13" rx="3" ry="3" width="50" height="24" />
										<circle cx="80" cy="25" r="20" />
									</ContentLoader>
								) : (
									<>
										<div className="d-flex align-items-center">
											<div className="badge-circle badge-circle-lg badge-circle-light-secondary flex-column mr-1">
												<i className={`bx bx-caret-up text-${status_pending_payment_diff == 'down' ? 'danger' : 'success'} font-medium-4`}></i>
												<small className="text-muted">{status_pending_payment_diff == 'down' ? '-' : '+'}{isNaN(percent_pending_payment_diff) ? 0 : percent_pending_payment_diff}%</small>
											</div>
											<h4 className="mb-0">${current_pending_payment}</h4>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const balance_sheet = document.getElementById("balance-sheet-component");
const tk = getHook()

if (balance_sheet && tk) {
	createRoot(balance_sheet).render(<BalanceSheet {...{ tk }} />);
}
