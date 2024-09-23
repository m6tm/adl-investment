import { getCsfrToken, getHook } from "../functions/tools"
import * as route from '../data/routes.json'
import { isNull } from "lodash"
import { getConfig } from "../API/pages/invoice"
import { Config } from "../interfaces/pages/invoice"

interface Routes {
        admin: Array<{ uri: string, method: string }>,
        user: Array<{ uri: string, method: string }>,
}

interface View {
        uri: string,
        view: string
}

interface SearchItem {
        name: string
        url: string
        uri: string
        icon: string
        view: string
}

interface SearchData {
        listItems: Array<SearchItem>
}

declare global {
        interface Window {
                search_data: SearchData
                search_is_ready: boolean
        }
}

const routes: Routes = route as Routes
const tk = getCsfrToken()!,
        _tk = getHook()!

let config: Config,
        search_input: HTMLInputElement

const search = () => {
        window.search_is_ready = false
        search_input = document.querySelector('.search-input input.input')!
        window.$(".search-input .input").off('keyup')
        if (isNull(search_input) || isNull(tk) || isNull(_tk)) return

        main()
}

// search()
window.search_is_ready = true


async function main() {
        // Fetch all routes view content
        let views: Array<View> = [],
                config_response = await getConfig(_tk)

        if (config_response.code !== 200 || config_response.response.code !== 200) return
        config = config_response.response.config

        routes.user.forEach(async (route, key) => {
                let params = new URLSearchParams()
                params.append('_token', tk)

                let response = await fetch(`${config.origin}/${route.uri}`, {
                        method: 'GET',
                        headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + tk
                        }
                })
                        .then(async data => ({ status: data.status, response: await data.text() }))

                if (response.status !== 200) return
                views.push({
                        uri: route.uri,
                        view: response.response
                })

                if (routes.user.length - 1 == key) settings(views)
        })
}

function settings(views: Array<View>) {
        let pages_text: Array<SearchItem | null> = []

        views.forEach(view => {
                try {
                        pages_text.push({
                                url: `${config.origin}/${view.uri}`,
                                uri: view.uri,
                                view: new DOMParser().parseFromString(view.view, 'text/html').querySelector('body')!.textContent!,
                                name: new DOMParser().parseFromString(view.view, 'text/html').querySelector('title')!.textContent!,
                                icon: 'bx bx-search'
                        })
                } catch (error) {
                        console.error(error);
                }
        })
        pages_text = pages_text.filter(page => !isNull(page))

        window.search_data = {
                listItems: pages_text as Array<SearchItem>
        }

        require('./searchbarAction.js')
}