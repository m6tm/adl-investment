import { getURI } from "../../functions/tools"
import { CreateAdvantageRsponse } from "../../types/advantages"

export function createAdvantage(token: string, form: FormData): Promise<CreateAdvantageRsponse> {
    const URI = `${getURI()}/api/create-advantage`
    
    return fetch(URI, {
            headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                    Accept: 'application/json',
            },
            method: 'POST',
            body: form
    }).then(async response => ({ code: response.status, response: await response.json() }))
    .catch(error => ({ code: 400, response: { message: error.message, } }))
}
