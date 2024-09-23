import { getURI } from "../functions/tools";
import { AppPreferenceResponse } from "../interfaces/app";



export function setTourStatus(token: string): Promise<AppPreferenceResponse> {
        return fetch(`${getURI()}/api/tour-doned`, {
            method: 'POST',
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                }
        }).then(async response => ({ code: response.status, response: await response.json() }))
}