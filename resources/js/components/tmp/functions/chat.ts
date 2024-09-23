import randomColor from "randomcolor";
import { status } from "../data/chat";
import { Messages } from "../interfaces/chat";
import { getURI, random } from "./tools";
import animateScrollTo, { IUserOptions } from 'animated-scroll-to';
import { isFunction, isUndefined } from "lodash";


export function formatUser(user: any) {
    return {
        ...user,
        ...{
            color: randomColor(),
            status: status[random(0, status.length - 1)]
        }
    }
}

export function formatUsers(msgs: Messages) {
    let messages: Messages = Object.assign(msgs);

    for (const key in msgs) {
        if (Object.prototype.hasOwnProperty.call(msgs, key)) {
            const category = msgs[key];

            for (const index in category) {
                if (Object.prototype.hasOwnProperty.call(category, index)) {
                    const chatList = category[index];
                    messages[key][index].participant.me = {
                        ...messages[key][index].participant.me, ...{
                            color: randomColor(),
                            status: status[random(0, status.length - 1)]
                        }
                    }
                    messages[key][index].participant.you = {
                        ...messages[key][index].participant.you, ...{
                            color: randomColor(),
                            status: status[random(0, status.length - 1)]
                        }
                    }
                }
            }
        }
    }

    return messages
}

export function renew_login() {
    // location.href = getURI('/admin/logout')
    document.body.setAttribute('id', 'auth-modal')
}

export const ScrollOptions: IUserOptions = {
    cancelOnUserAction: true,

    // Animation easing function, with "easeOutCubic" as default
    easing(t: number) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },

    // DOM element that should be scrolled
    // Example: document.querySelector('#element-to-scroll'),
    elementToScroll: window,

    // Horizontal scroll offset
    // Practical when you are scrolling to a DOM element and want to add some padding
    horizontalOffset: 0,

    // Maximum duration of the scroll animation
    maxDuration: 3000,

    // Minimum duration of the scroll animation
    minDuration: 250,

    // Duration of the scroll per 1000px
    speed: 500,

    // Vertical scroll offset
    // Practical when you are scrolling to a DOM element and want to add some padding
    verticalOffset: 0,
},
defaultY = 500;

export async function scrollTo(elementToScroll: Element, y: number = defaultY, options: IUserOptions = ScrollOptions, callback?: Function) {
    options = { ...options, ...{ elementToScroll: elementToScroll } }
    setTimeout(() => {
        if (!isUndefined(callback) && isFunction(callback)) callback!()
    }, options.maxDuration);
    return animateScrollTo(y + defaultY, options)
}