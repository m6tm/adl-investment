import { ApexOptions } from "apexcharts";
import BalanceSheet from "./BalanceSheet";
import { in_array, sleep } from "../functions/tools";
import { BalanceSheetChartTimeFrame, BalanceSheetChartType } from "../enums/accounting-expenses";
import {
	BalanceSheetGroup,
	Expense,
	RevenuSheet,
	RevenuSheetCollection,
} from "../types/account-expenses";
import { isNull, isUndefined } from "lodash";
import moment from "moment";
import { IChartCoordonnees, IChartData, IDateRange } from "../interfaces/pages/accounting-expenses";
import { INVOICE_STATUS } from "../enums/invoice";
import { MainInvoiceCustom } from "../interfaces/pages/invoice";

export const $primary = "#5A8DEE";
export const $success = "#39DA8A";
export const $danger = "#FF5B5C";
export const $warning = "#FDAC41";
export const $info = "#00CFDD";
export const $label_color = "#304156";
export const $danger_light = "#FFDEDE";
export const $gray_light = "#828D99";
export const $bg_light = "#f2f4f4";
export class BalanceSheetWorker {
	constructor(private balanceSheet: BalanceSheet) {}

	get options() {
		return this.balanceSheet.state.options;
	}

	set options(options: ApexOptions | undefined) {
		this.balanceSheet.setState({ ...this.balanceSheet.state, ...{ options } });
	}

	get series() {
		return this.balanceSheet.state.series;
	}

	set series(series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined) {
		this.balanceSheet.setState({ ...this.balanceSheet.state, ...{ series } });
	}

	set timeframe(timeframe: BalanceSheetChartTimeFrame) {
		this.balanceSheet.setState({
			...this.balanceSheet.state,
			...{ timeframe },
		});
	}

	set balance_sheet(balanceSheet: BalanceSheetGroup) {
		this.balanceSheet.setState({
			...this.balanceSheet.state,
			...{ balanceSheet },
		});
	}

	set old_balance_sheet(prevBalanceSheet: BalanceSheetGroup) {
		this.balanceSheet.setState({
			...this.balanceSheet.state,
			...{ prevBalanceSheet },
		});
	}

	set loading(loading: boolean) {
		this.balanceSheet.setState({ ...this.balanceSheet.state, ...{ loading } });
	}

	set date_range(date_range: IDateRange) {
		this.balanceSheet.setState({
			...this.balanceSheet.state,
			...{ date_range },
		});
	}

	set prev_date_range(date_range: IDateRange) {
		const prev_date_range = this._prev_date_range(date_range);
		this.balanceSheet.setState({
			...this.balanceSheet.state,
			...{ prev_date_range },
		});
	}

	private _prev_date_range(date_range: IDateRange) {
		let prev_date_range = { ...date_range },
			copy_date = { ...date_range };
		prev_date_range.end = moment(copy_date.start)
			.subtract(1, "days")
			.format("MM-DD-YYYY");
		const diffDays = moment(copy_date.end).diff(copy_date.start, "days");
		prev_date_range.start = moment(prev_date_range.end)
			.subtract(diffDays, "days")
			.format("MM-DD-YYYY");
		return prev_date_range;
	}

	async initialiseChart(data?: IChartData) {
		const default_data: Array<number> = new Array(this.numberOfDays(this.balanceSheet.state.date_range)).fill(0);
		const expenses_y = !isUndefined(data) ? Object.values(data.expenses).map(expense => expense.coordonees.y) : default_data
		const revenues_paid_y = !isUndefined(data) ? Object.values(data.revenues_paid).map(expense => expense.coordonees.y) : default_data
		const revenues_unpaid_y = !isUndefined(data) ? Object.values(data.revenues_pending_payment).map(expense => expense.coordonees.y) : default_data

		const max_amount = Math.max(...expenses_y,...revenues_paid_y,...revenues_unpaid_y);
		
		const categories =
			this.balanceSheet.state.timeframe === BalanceSheetChartTimeFrame.MOUNTHLY
				? this.formatChartCoordonneesDateRange(this.balanceSheet.state.date_range)
				: [
						"Jan",
						"Feb",
						"Mar",
						"Apr",
						"May",
						"Jun",
						"Jul",
						"Aug",
						"Sept",
						"Oct",
						"Nov",
						"Dec",
				  ];


		this.options = {
			chart: {
				height: 350,
				type: "line",
				toolbar: {
					show: false,
				},
			},
			colors: [$danger, $success, $gray_light],
			dataLabels: {
				enabled: false,
			},
			series: [
					{
						name: "Expenses",
						data: expenses_y,
					},
					{
						name: "Revenues Paid",
						data: revenues_paid_y,
					},
					{
						name: "Revenues Pending Payment",
						data: revenues_unpaid_y,
					},
			],
			markers: {
				size: 5,
				hover: {
					size: 7,
					sizeOffset: 7,
				},
			},
			xaxis: {
				categories,
				axisTicks: {
					show: false,
				},
				axisBorder: {
					show: false,
				},
				labels: {
					style: {
						colors: $gray_light,
					},
					offsetX: 3,
				},
			},
			yaxis: {
				title: {
					text: "Expenses rate",
				},
				min: 0,
				max: max_amount,
				tickAmount: 3,
				labels: {
					style: {
						colors: $gray_light,
					},
				},
			},
			grid: {
				padding: {
					left: 15,
				},
			},
		};

		await sleep(.3);
		
		const series = [
			{
				name: "Expenses",
				data: expenses_y,
			},
			{
				name: "Revenues Paid",
				data: revenues_paid_y,
			},
			{
				name: "Revenues Pending Payment",
				data: revenues_unpaid_y,
			},
		]

		this.series = series;
		return series
	}

	fetchChartData = (): IChartData => {
		const date_range = {...this.balanceSheet.state.date_range};
		const expenses: IChartCoordonnees = {}
		const revenues_paid: IChartCoordonnees = {}
		const revenues_pending_payment: IChartCoordonnees = {}
		const start = moment(date_range.start)
		const end = moment(date_range.end)

		while (start <= end) {
			const date = start.format("MM-DD-YYYY");
			const _expenses = this.searchExpenseByCreatedDate(date);
			
			expenses[date] = {
				type: BalanceSheetChartType.EXPENSES,
				coordonees: {
					x: date,
					y: _expenses.reduce((acc: number, curr: Expense) => acc + parseFloat(curr.amount), 0),
				}
			};
			
			const _revenues_paid_ = this.searchRevenuesByCreatedDate(date, 'paid');
			let revenue_paid_amount = _revenues_paid_.reduce((acc: number, curr: RevenuSheet | MainInvoiceCustom) => {
				if ("status" in curr) return acc + curr.total_pay_to_date
				return parseFloat(acc + curr.revenue)
			}, 0)
			
			revenues_paid[date] = {
				type: BalanceSheetChartType.REVENUES,
				coordonees: {
					x: date,
					y: revenue_paid_amount,
				}
			};
	
			const _revenue_pending_paiement_ = this.searchRevenuesByCreatedDate(date, 'pending_payment');
			let revenue_pending_paiement_amount = _revenue_pending_paiement_.reduce((acc: number, curr: RevenuSheet | MainInvoiceCustom) => {
				if ("status" in curr) {
					return curr.items.reduce((accu, item) => accu + item.price, 0)
				}
				return parseFloat(acc + curr.revenue)
			}, 0)
	
			revenues_pending_payment[date] = {
				type: BalanceSheetChartType.REVENUES,
				coordonees: {
					x: date,
					y: revenue_pending_paiement_amount,
				}
			};
			start.add(1, "days");
		}

		return {
			expenses,
			revenues_paid,
			revenues_pending_payment
		}
	}

	searchExpenseByCreatedDate = (date: string): Array<Expense> => {
		const expenses = this.balanceSheet.state.balanceSheet.expenses;
		const expenses_by_date = expenses.filter((expense) => moment(expense.created_at).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'));
		return expenses_by_date;
	}

	searchRevenuesByCreatedDate = (date: string, status: "paid" | "pending_payment"): Array<RevenuSheet | MainInvoiceCustom> => {
		if (!in_array(status, ["paid", "pending_payment"])) return []

		const revenues: RevenuSheetCollection = [...this.balanceSheet.state.balanceSheet.revenues]
		const invoices: Array<MainInvoiceCustom> = [...this.balanceSheet.state.balanceSheet.invoices]

		date = moment(date).format("YYYY-MM-DD")

		if (status === "paid") {
			const paid_invoices: Array<MainInvoiceCustom> = invoices
				.filter((invoice) => invoice.status !== INVOICE_STATUS.PENDING_PAYMENT)
			let revenues_list: Array<RevenuSheet | MainInvoiceCustom> = paid_invoices.filter((invoice) => moment(invoice.created_at).format("YYYY-MM-DD") === date)
			revenues_list = revenues_list.concat(revenues.filter((revenue) => moment(revenue.created_at).format('YYYY-MM-DD') === date))

			return revenues_list
		}

		if (status === "pending_payment") {
			return invoices.filter((invoice) => invoice.status === INVOICE_STATUS.PENDING_PAYMENT && moment(invoice.created_at).format('YYYY-MM-DD') === date)
		}

		return []
	}

	onChangeDate = async (date_range: IDateRange) => {
		this.balanceSheet.setState({ ...this.balanceSheet.state, date_range });
		await sleep(0.2);

		let prev_date_range = this._prev_date_range(date_range);

		this.balanceSheet.setState({ ...this.balanceSheet.state, prev_date_range });
	};

	async onChangeTimeframe(timeframe: BalanceSheetChartTimeFrame) {
		this.timeframe = timeframe;
		await sleep(0.2);
	}

	pendingPayments() {
		return {
			current: this.balanceSheet.state.balanceSheet.invoices
				.filter((invoice) => invoice.status === INVOICE_STATUS.PENDING_PAYMENT)
				.reduce((accumulator, current) => {
					const price = parseFloat(
						current.items
							.reduce((accu, current) => accu + current.qty * current.price, 0)
							.toFixed(2)
					);
					return accumulator + price;
				}, 0),
			prev: this.balanceSheet.state.oldBalanceSheet.invoices
				.filter((invoice) => invoice.status === INVOICE_STATUS.PENDING_PAYMENT)
				.reduce((accumulator, current) => {
					const price = parseFloat(
						current.items
							.reduce((accu, current) => accu + current.qty * current.price, 0)
							.toFixed(2)
					);
					return accumulator + price;
				}, 0),
		};
	}

	pendingPaymentsDiff(
		last: number,
		current: number
	): { percent: number; status: "up" | "down" } {
		const diff = current - last;
		const percentDiff = (diff / (last > 0 ? last : diff)) * 100;

		return percentDiff > 0
			? {
					percent: percentDiff,
					status: "up",
			  }
			: {
					percent: percentDiff,
					status: "down",
			  };
	}

	totalExpenses() {
		return {
			current: this.balanceSheet.state.balanceSheet.expenses.reduce(
				(accumulator, current) => {
					const price = parseFloat(current.amount);
					return accumulator + price;
				},
				0
			),
			prev: this.balanceSheet.state.oldBalanceSheet.expenses.reduce(
				(accumulator, current) => {
					const price = parseFloat(current.amount);
					return accumulator + price;
				},
				0
			),
		};
	}

	totalEpensesDiff = this.pendingPaymentsDiff;

	brutSales() {
		const current_sales_invoices = this.balanceSheet.state.balanceSheet.invoices
			.filter((invoices) => invoices.status !== INVOICE_STATUS.PENDING_PAYMENT)
			.reduce((accumulator, current) => accumulator + current.total_pay_to_date, 0);
		const last_sales_invoices = this.balanceSheet.state.oldBalanceSheet.invoices
			.filter((invoices) => invoices.status !== INVOICE_STATUS.PENDING_PAYMENT)
			.reduce((accumulator, current) => accumulator + current.total_pay_to_date, 0);
		return {
			current:
				this.balanceSheet.state.balanceSheet.revenues.reduce(
					(accumulator, current) => {
						const price = parseFloat(current.revenue);
						return accumulator + price;
					},
					0
				) + current_sales_invoices,
			prev:
				this.balanceSheet.state.oldBalanceSheet.revenues.reduce(
					(accumulator, current) => {
						const price = parseFloat(current.revenue);
						return accumulator + price;
					},
					0
				) + last_sales_invoices,
		};
	}

	bruteSalesDiff = this.pendingPaymentsDiff;

	netSales() {
		const { current: current_net_sales, prev: prev_net_sales } =
			this.brutSales();
		const { current: current_total_expenses, prev: prev_total_expenses } =
			this.totalExpenses();
		const brute_sales = {
			current: current_net_sales - current_total_expenses,
			prev: prev_net_sales - prev_total_expenses,
		};
		const brute_sales_diff = this.netSalesDiff(brute_sales.prev, brute_sales.current);

		return {
			brute_sales,
			brute_sales_diff,
		};
	}

	netSalesDiff = this.pendingPaymentsDiff;

	numberOfDays(date_range?: IDateRange) {
		if (!date_range) {
			date_range = {
				start: moment(moment.now()).startOf("month").format("YYYY-MM-DD"),
				end: moment(moment.now()).endOf("month").format("YYYY-MM-DD"),
			}
		}
		const start = moment(moment(date_range.start).format("YYYY-MM-DD"));
		const end = moment(moment(date_range.end).format("YYYY-MM-DD"));
		return end.diff(start, "days") + 1;
	}

	private formatChartCoordonneesDateRange(date_range: IDateRange) {
		const start = moment(date_range.start);
		const end = moment(date_range.end);
		const days = [];

		while (start <= end) {
			days.push(start.format("D MMM YY"));
			start.add(1, "days");
		}

		return days
	}
}
