import { isNull } from "lodash"
import { getURI, sleep } from "../functions/tools"


let menu = document.querySelector('div.main-menu')

const main_menu = ((menu: HTMLDivElement) => {
        menu.addEventListener('mouseenter', () => {
                menu.querySelector('img.logo')!.setAttribute('src', getURI('assets/vendor/app-assets/images/logo/cccode.png'))
                toggle_menu_expansion_style(MENU_EXPANSION_STATE.SHOW, menu)
        })
        menu.addEventListener('mouseleave', async () => {
                await sleep(10)
                if (menu_is_expanded(menu)) {
                        toggle_menu_expansion_style(MENU_EXPANSION_STATE.SHOW, menu)
                } else {
                        menu.querySelector('img.logo')!.setAttribute('src', getURI('assets/logo.png'))
                        toggle_menu_expansion_style(MENU_EXPANSION_STATE.HIDE, menu)
                }
        })
})

if (!isNull(menu)) main_menu(menu as HTMLDivElement)

/**
 * Function Section
 */

function menu_is_expanded(menu: HTMLDivElement) {
        return menu.classList.contains('expanded')
}


function toggle_menu_expansion_style(state: MENU_EXPANSION_STATE, menu: HTMLDivElement) {
        switch (state) {
                case MENU_EXPANSION_STATE.SHOW:
                        menu.querySelector('img.logo')!.setAttribute('style', `
                        height: 45px;
                        width: 200px;
                        margin-left: -15px;
                        margin-top: 20px;
                        `)
                        break;

                case MENU_EXPANSION_STATE.HIDE:
                        menu.querySelector('img.logo')!.setAttribute('style', `
                                height: 45px;
                                width: 45px;
                                margin-left: -15px;
                                margin-top: 0px;
                        `)
                        break;
        
                default:
                        break;
        }
}

/**
 * Enum Section
 */

enum MENU_EXPANSION_STATE {
        SHOW = 'show',
        HIDE = 'hide'
}
