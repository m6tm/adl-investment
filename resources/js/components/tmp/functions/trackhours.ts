import moment from "moment";
import {
	ActivityInterface,
	ActivityUserInterface,
	WeekRange,
} from "../interfaces/pages/trackhours";
import { StaticActivity } from "../data/trackhours";
import { isNull, isNumber, isUndefined } from "lodash";
import { User } from "../interfaces/chat";
import { in_array } from "./tools";

export function getWeekRange(date: string): WeekRange {
	const startDate = moment(date).startOf("week").toDate();
	const endDate = moment(date).endOf("week").toDate();

	return { startDate, endDate };
}

export function rangeActivities(
	startAt: string,
	endAt: string,
	activities: Array<ActivityInterface | ActivityUserInterface>
) {
	let activities_: Array<ActivityInterface | ActivityUserInterface> = [],
		initial_date = moment(startAt + " 00:00:00"),
		final_date = moment(endAt + " 00:00:00"),
		iterator = 1;

	while (initial_date <= final_date) {
		let hasActivity = activities.find(
			(activity) =>
				moment(activity.created_at).format("YYYY-MM-DD") ==
				initial_date.format("YYYY-MM-DD")
		);
		if (hasActivity) {
			activities_.push(hasActivity);
		} else {
			activities_.push({
				...StaticActivity,
				...{
					created_at: `${initial_date.format("YYYY-MM-DD")}T00:00:00Z`,
					updated_at: `${initial_date.format("YYYY-MM-DD")}T00:00:00Z`,
				},
			});
		}
		initial_date.add(1, "day");
		iterator++;
	}

	return activities_;
}

export async function rangeActivityForAll(
	start: string,
	end: string,
	activities: Array<ActivityUserInterface>,
	users: Array<User>
) {
	let activities_by_user: { [user_id: number]: Array<ActivityUserInterface> } =
		{};

	await Promise.all(
		activities.map(async (activity) => {
			if (isUndefined(activities_by_user[activity.user_id])) {
				activities_by_user[activity.user_id] = [];
			}
			activities_by_user[activity.user_id].push(activity);
			return activity;
		})
	);

	await Promise.all(
		Object.keys(activities_by_user).map(async (user_id) => {
			activities_by_user[parseInt(user_id)] = rangeActivities(
				start,
				end,
				activities_by_user[parseInt(user_id)]
			) as Array<ActivityUserInterface>;
			return activities_by_user[parseInt(user_id)];
		})
	);

	users
		.filter(
			(user) => !in_array(user.id.toString(), Object.keys(activities_by_user))
		)
		.forEach((user) => {
			activities_by_user[user.id] = [];
			activities_by_user[user.id] = rangeActivities(
				start,
				end,
				activities_by_user[user.id]
			) as Array<ActivityUserInterface>;
		});

	return activities_by_user;
}

export function sumTimes(timeDurations: string[]): string {
	const totalSeconds = timeDurations.reduce((total, time) => {
		const [hours, minutes, seconds] = time.split(":").map(Number);
		return total + hours * 3600 + minutes * 60 + seconds;
	}, 0);

	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const formattedTotalTime = `${String(hours).padStart(2, "0")}:${String(
		minutes
	).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
	return formattedTotalTime;
}

export function sumTimesForAllUsers(activities_by_user: {
	[user_id: number]: ActivityUserInterface[];
}): string {
	let time_grouped_by_user: {
		[user_id: number]: string;
	} = {};

	Object.keys(activities_by_user).map((user_id) => {
		if (!time_grouped_by_user[parseInt(user_id)])
			time_grouped_by_user[parseInt(user_id)] = "00:00:00";
		time_grouped_by_user[parseInt(user_id)] = sumTimes(
			activities_by_user[parseInt(user_id)].map((activity) => activity.time)
		);
	});
	const timeDurations = sumTimes(Object.values(time_grouped_by_user));

	return timeDurations;
}

export function actititiesAverage(activities: Array<number>) {
	if (activities.length == 0) return 0;
	let activities_filtered = activities
		.map((activity) => (isNumber(activity) ? activity : parseFloat(activity)))
		.filter((item) => item > 0);
        const AVG = (
		activities_filtered.reduce(
			(accumulator, current) => accumulator + current,
			0
		) / activities.length
	);
	return AVG
}

export function actititiesAverages(activities: Array<ActivityUserInterface>) {
        activities = activities.filter(activity => activity.occupancy > 0)
	if (activities.length == 0) return 0;
	let activities_filtered = activities
		.map((activity) => (isNumber(activity.occupancy) ? activity.occupancy : parseFloat(activity.occupancy)));
        const AVG = (
		activities_filtered.reduce(
			(accumulator, current) => accumulator + current,
			0
		) / activities.length
	);
	return AVG
}

export function actititiesAverageForAllUsers(activities: {
	[user_id: number]: ActivityUserInterface[];
}) {
	let activities_by_user: {
			[user_id: number]: number;
		} = {},
		final_activities_len = 0,
		AVG = 0;

	Object.keys(activities).forEach((user_id) => {
		if (!activities_by_user[parseInt(user_id)])
			activities_by_user[parseInt(user_id)] = 0;
		activities_by_user[parseInt(user_id)] = activities[
			parseInt(user_id)
		].reduce((accumulator, current) => accumulator + current.occupancy, 0);
	});
	final_activities_len = Object.values(activities_by_user).filter(
		(occupancy) => occupancy > 0
	).length;
	AVG =
		Object.values(activities_by_user)
			.filter((occupancy) => occupancy > 0)
			.reduce((accum, curr) => accum + curr, 0) / final_activities_len;

	AVG = isNaN(AVG) ? 0 : AVG;
	return AVG;
}

export function getRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculates the sum of activities within a given range for each user.
 *
 * @param {Object} activities_by_user An object mapping user IDs to arrays of ActivityUserInterface.
 * @returns {Array<ActivityUserInterface>} An array containing the summed activities for each user within the specified range.
 */
export function sumActivitiesRange(activities_by_user: {
	[user_id: number]: Array<ActivityUserInterface>;
}) {
	const activities: Array<ActivityUserInterface> = [];
	let coordonnees = {
			x: Object.values(activities_by_user)[0]
				? Object.values(activities_by_user)[0].length
				: 0,
			y: Object.values(activities_by_user)
				? Object.values(activities_by_user).length
				: 0,
		},
		iterator_x = 0,
		currentActivity: ActivityUserInterface | null = null;

	while (iterator_x < coordonnees.x) {
		let iterator_y = 0,
			activities_y: Array<ActivityUserInterface> = [];
		currentActivity = null;

		while (iterator_y < coordonnees.y) {
			if (isNull(currentActivity))
				currentActivity =
					Object.values(activities_by_user)[iterator_y][iterator_x];
			activities_y.push(
				Object.values(activities_by_user)[iterator_y][iterator_x]
			);
			iterator_y++;
		}

		currentActivity!.time = sumTimes(
			activities_y.map((activity) => activity.time)
		);
		currentActivity!.occupancy = parseInt(
			actititiesAverage(
				activities_y.map((activity) => activity.occupancy)
			).toFixed(2)
		);
		activities.push(currentActivity!);
		iterator_x++;
	}

	return activities;
}
