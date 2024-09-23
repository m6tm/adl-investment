import moment from "moment";
import { getURI } from "../../functions/tools";
import { IBalanceSheetResponse } from "../../interfaces/pages/accounting-expenses";

export function getBalanceSheet(token: string, start: string, end: string): Promise<IBalanceSheetResponse> {
        const URI = `${getURI()}/api/balance-sheet/${moment(start).format('YYYY-MM-DD')}/${moment(end).format('YYYY-MM-DD')}`
        
        return fetch(URI, {
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                }
        }).then(async response => ({ code: response.status, response: await response.json() }))
        .catch(error => ({ code: 400, response: { message: error.message, revenues: [], expenses: [], invoices: [] } }))
}