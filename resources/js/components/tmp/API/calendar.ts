import { getURI } from "../functions/tools";
import { Calendar, CreateScheduleForm, CustomTag, ResponseRequestCreateSchedule, ResponseRequestDeleteTag, ResponseRequestGetSchedule, ResponseRequestNewTag, ResponseRequestTag, ResponseRequestUpdateSchedule, TagForm } from "../interfaces/calendar";

const LOCATION_KEY = "pk.6b497b81e01365a72b3efa2d5520cb62"


export async function getMyTags(URI: string, token: string): Promise<ResponseRequestTag> {
    return await fetch(`${URI}/my-tags`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
            Accept: 'application/json',
        }
    }).then(data => data.json())
        .catch(err => {
            console.error(err);
            return {
                code: 418,
                response: 'error'
            }
        })
}

export async function saveNewTag(URI: string, token: string, form: TagForm): Promise<ResponseRequestNewTag> {
    return fetch(`${URI}/create-tag/api`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ ...form, ...{ id: form.id == -1 ? null : form.id } })
    }).then(data => data.json())
        .catch(err => {
            console.error(err);
            return {
                code: 418,
                response: 'error'
            }
        })
}

export async function deleteTag(token: string, tag: CustomTag): Promise<ResponseRequestDeleteTag> {
    return fetch(getURI(`api/delete-tag`), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            id: tag.id
        })
    }).then(data => data.json())
        .catch(err => {
            console.error(err);
            return {
                code: 418,
                response: 'An error occured on sending request please try again later'
            }
        })
}

export async function createSchedule(token: string, schedule: CreateScheduleForm): Promise<ResponseRequestCreateSchedule> {
    let form = new FormData()

    form.append('groupId', schedule.groupId!)
    form.append('title', schedule.title)
    form.append('color', schedule.color.toString())
    form.append('description', schedule.description)
    form.append('location', schedule.location)
    form.append('start', schedule.timeline_start)
    form.append('end', schedule.timeline_end)
    schedule.members.forEach(member => form.append(`members[]`, member.toString()))

    return fetch(getURI(`api/create-schedule`), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
        body: form
    }).then(data => data.json())
        .catch(err => {
            console.error(err);
            return {
                code: 418,
                response: 'An error occured on sending request please try again later'
            }
        })
}

export async function updateSchedule(token: string, schedule: Calendar): Promise<ResponseRequestUpdateSchedule> {
    let form = new FormData()

    form.append('id', schedule.id.toString())
    form.append('groupId', schedule.groupId)
    form.append('title', schedule.title)
    form.append('color', schedule.color.toString())
    form.append('description', schedule.description)
    form.append('location', schedule.location)
    form.append('start', schedule.start)
    form.append('end', schedule.end)
    schedule.members.forEach(member => form.append(`members[]`, member.toString()))

    return fetch(getURI(`api/set-my-schedules`), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
        body: form
    }).then(data => data.json())
        .catch(err => {
            console.error(err);
            return {
                code: 418,
                response: 'An error occured on sending request please try again later'
            }
        })
}

export async function deleteSchedule(token: string, schedule: Calendar): Promise<ResponseRequestCreateSchedule> {
    let form = new FormData()

    form.append('id', schedule.id.toString())
    form.append('groupId', schedule.groupId)
    form.append('title', schedule.title)
    form.append('color', schedule.color.toString())
    form.append('description', schedule.description)
    form.append('location', schedule.location)
    form.append('start', schedule.start)
    form.append('end', schedule.end)
    schedule.members.forEach(member => form.append(`members[]`, member.toString()))

    return fetch(getURI(`api/delete-schedule`), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
        body: form
    }).then(data => data.json())
        .catch(err => {
            console.error(err);
            return {
                code: 418,
                response: 'An error occured on sending request please try again later'
            }
        })
}

export async function getMySchedule(token: string): Promise<ResponseRequestGetSchedule> {

    return fetch(getURI(`api/my-schedules`), {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        }
    }).then(data => data.json())
        .catch(err => {
            console.error(err);
            return {
                code: 418,
                response: 'An error occured on sending request please try again later'
            }
        })
}

interface Location {
    lat: string
    lon: string
    adress: {
        country: string
        state: string
        city: string
    }
}

export async function getLocation(): Promise<Location> {
    // On récupère la position de l'utilisateur
    return new Promise(resolved => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            // On envoie une requête à l'API de Unwired Labs
            fetch(`https://eu1.unwiredlabs.com/v2/reverse.php?token=${LOCATION_KEY}&lat=${latitude}&lon=${longitude}`)
                .then(response => response.json())
                .then(data => {
                    const { address, lat, lon } = data;
                    resolved({
                        lat,
                        lon,
                        adress: {
                            country: address.country,
                            state: address.state,
                            city: address.city,
                        }
                    })
                })
                .catch(error => {
                    console.error(error);
                });
        }, error => {
            console.error(error);
        });
    })
}