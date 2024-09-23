import { isNull } from "lodash"


/**
 * Save profile account
 */
(() => {
        let input: HTMLInputElement | null = document.querySelector('input[name="avatar"][hidden]'),
        image: HTMLImageElement | null = document.querySelector('img[alt="profile image"]'),
        reset: HTMLButtonElement | null = document.querySelector('button#profile-reset'),
        current_img: string | null
        if (isNull(input) || isNull(image) || isNull(reset)) return

        input.addEventListener('change', e => {
                if (input!.files!.length == 0) return
                current_img = image!.getAttribute('src')
                const file = input!.files![0]
                
                image!.setAttribute('src', URL.createObjectURL(file))
        }, false)

        reset.addEventListener('click', () => image?.setAttribute('src', current_img!))
})()