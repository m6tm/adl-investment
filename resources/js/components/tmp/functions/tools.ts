import moment from "moment-timezone";
import randomColor from "randomcolor";
import { CalendarTag } from "../interfaces/calendar";
import $ from "jquery";
import { isNull } from "lodash";

/**
 * Get a safe URL path
 * @param path path format: (/)?[a-zA-Z0-9\/]+
 * @returns {string}
 */
export function getURI(path: string = "") {
	path = path[0] == "/" ? path.slice(1, path.length) : path;
	let URI = `${window.location.origin}/${path}`;
	URI = URI.slice(-1) == "/" ? URI.slice(0, -1) : URI;
	return URI;
}

export function in_array<T extends object>(value: any, array: T | Array<T>) {
	if (Array.isArray(array)) {
		return array.indexOf(value) !== -1;
	} else {
		return Object.values(array).indexOf(value) !== -1;
	}
}

export function random(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min;
}

export function getUserTimezone() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function extractFormatMessage(
	datetime: string,
	senderTimezone: string,
	recipientTimezone: string,
	format: string = "HH:mm"
) {
	const momentDatetime = moment.utc(
		adjustTimezone(datetime, senderTimezone, recipientTimezone)
	);
	return momentDatetime.format(format);
}

function adjustTimezone(
	datetime: string,
	senderTimezone: string,
	recipientTimezone: string
): string {
	const senderMoment = moment.tz(datetime, senderTimezone);
	const recipientMoment = senderMoment.clone().tz(recipientTimezone);
	return recipientMoment.format("YYYY-MM-DD HH:mm:ss");
}

export function extractDateFormat(datetime: string) {
	let date = new Date(datetime.split(".").at(0)!.replace("T", " "));
	let dateFactory = date
		.toLocaleDateString(`${window.navigator.language}`, {
			month: "numeric",
			day: "numeric",
			year: "numeric",
		})
		.split(/( |,)+/);
	return dateFactory[dateFactory.length - 1];
}

export function getHook() {
	const meta = document.head.querySelector('meta[name="hook"]');
	if (isNull(meta)) return "";
	return meta.getAttribute("content");
}

export function getCsfrToken() {
	return document.head
		.querySelector('meta[name="csrf-token"]')!
		.getAttribute("content");
}

declare global {
	interface Window {
		randomcolor: Function;
		CalendarLists: Array<CalendarTag>;
		calendar_is_ready: boolean;
		moment: Function;
	}
}

window.randomcolor = randomColor;
window.moment = moment;

export function setCalendarList(calendarList: Array<CalendarTag>) {
	window.CalendarLists = calendarList.map((calendar) => ({
		...calendar,
		...{ name: calendar.name.toUpperCase() },
	}));
	window.calendar_is_ready = true;
}

export function debugge(...args: any[]) {
	console.log(...args);
	return null;
}

export async function sleep(millisecond: number): Promise<boolean> {
	return new Promise((resolved) => {
		setTimeout(() => {
			resolved(true);
		}, millisecond);
	});
}

export function togglePasswordVisibility() {
	if ($("#login-form").length == 0) return;

	$("#login-form #toggle-btn").on("click", () => {
		let password = $('#login-form input[name="password"]'),
			icon = $("#login-form i.bx");
		if (password.attr("type") == "password") {
			password.attr("type", "text");
			icon.attr("class", "bx bx-hide");
		} else {
			password.attr("type", "password");
			icon.attr("class", "bx bx-show");
		}
	});
}