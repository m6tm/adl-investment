import Toastify from "toastify-js"
import "toastify-js/src/toastify.css"
import { TOASTIFY_TYPE, TOASTIFY_TYPE_COLOR } from "../enums/toastify"


function toatifyer(message: string, type: TOASTIFY_TYPE = TOASTIFY_TYPE.INFO) {
    let className: TOASTIFY_TYPE_COLOR = TOASTIFY_TYPE_COLOR.INFO
    if (type === TOASTIFY_TYPE.SUCCESS) {
        className = TOASTIFY_TYPE_COLOR.SUCCESS
    } else if (type === TOASTIFY_TYPE.ERROR) {
        className = TOASTIFY_TYPE_COLOR.ERROR
    } else if (type === TOASTIFY_TYPE.WARNING) {
        className = TOASTIFY_TYPE_COLOR.WARNING
    }

    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        className,
    }).showToast()
}

declare global {
    interface Window {
        toatifyer: typeof toatifyer
    }
}

window.toatifyer = toatifyer