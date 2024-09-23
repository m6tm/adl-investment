import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

declare global {
        interface Window {
                showToast: (message: string, status: 'success' | 'danger') => any
        }
}

export function showToast(message: string, status: 'success' | 'danger') {
        return Toastify({
                text: message,
                duration: 3000,
                // destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: status == 'danger' ? "linear-gradient(to right, #FF5B5C, #eb696a)" : "linear-gradient(to right, #00b026, #4acf67)",
                },
                onClick: function(){}
              })
}

window.showToast = showToast