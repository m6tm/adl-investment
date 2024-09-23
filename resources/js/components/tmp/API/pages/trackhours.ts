import { isUndefined } from "lodash";
import { getURI } from "../../functions/tools";
import { GetActivityRangeDateAllResponse, GetActivityRangeDateResponse, GetDayliActivityResponse } from "../../interfaces/pages/trackhours";


export async function getDailyActivity(tk: string, date: string, user_id?: number): Promise<GetDayliActivityResponse> {
        return fetch(getURI(`api/get-activity?date=${date}${isUndefined(user_id) ? '' : `&usrbin=${user_id}`}`), {
                headers: {
                        "Authorization": `Bearer ${tk}`,
                        Accept: 'application/json'
                }
        }).then(async response => ({...(await response.json()), ...{ code: response.status }}))
}

export async function getActivityRangeDate(tk: string, start: string, end: string, user_id?: number): Promise<GetActivityRangeDateResponse> {
        return fetch(getURI(`api/get-activity-range/${start}/${end}${isUndefined(user_id) ? '' : `/${user_id}`}`), {
                headers: {
                        "Authorization": `Bearer ${tk}`,
                        Accept: 'application/json'
                }
        }).then(async response => ({...(await response.json()), ...{ code: response.status }}))
}

export async function getActivityRangeDateForAll(tk: string, start: string, end: string): Promise<GetActivityRangeDateAllResponse> {
        return fetch(getURI(`api/get-activity-range-all/${start}/${end}`), {
                headers: {
                        "Authorization": `Bearer ${tk}`,
                        Accept: 'application/json'
                }
        }).then(async response => ({...(await response.json()), ...{ code: response.status }}))
}

export async function deleteScreenshots(tk: string, screenshot_list: Array<number>): Promise<GetDayliActivityResponse> {
        const data = new FormData();
        screenshot_list.forEach(id => {
                data.append('screen_id[]', id.toString())
        })

        return fetch(getURI(`api/delete-screenshots`), {
                method: 'POST',
                headers: {
                        "Authorization": `Bearer ${tk}`,
                        Accept: 'application/json'
                },
                body: data
        }).then(async response => ({...(await response.json()), ...{ code: response.status }}))
}