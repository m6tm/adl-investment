import { getURI } from "../../functions/tools";
import { CustomerResponse } from "../../interfaces/pages/customer";


export function getCustomers(token: string): Promise<CustomerResponse> {

        return fetch(`${getURI()}/api/customers`, {
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                }
        }).then(async response => ({ code: response.status, response: await response.json() }))
}