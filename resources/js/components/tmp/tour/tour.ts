import { setTourStatus } from "../API/app";
import { getHook } from "../functions/tools";

document.addEventListener('DOMContentLoaded', () => {
    const tour_elements = {
        tour_1: {
            btn: document.getElementById('tour_1')!,
            position: document.getElementById('tour_1')!.getBoundingClientRect(),
        },
        tour_2: {
            btn: document.getElementById('tour_2')!,
            position: document.getElementById('tour_2')!.getBoundingClientRect(),
        },
        tour_3: {
            btn: document.getElementById('tour_3')!,
            position: document.getElementById('tour_3')!.getBoundingClientRect(),
        },
        tour_4: {
            btn: document.getElementById('tour_4')!,
            position: document.getElementById('tour_4')!.getBoundingClientRect(),
        },
        tour_5: {
            btn: document.getElementById('tour_5')!,
            position: document.getElementById('tour_5')!.getBoundingClientRect(),
        },
    }
    const overlay = document.getElementById('tour-overlay')!
    const overlay_lock_touch = document.querySelector('.tour-overlay-lock-touch')!
    const tour_container = document.getElementById('tour-container')!

    if (!overlay || !tour_container) return
    const next_btn = tour_container.querySelector('.tour-next')! as HTMLButtonElement
    const prev_btn = tour_container.querySelector('.tour-prev')! as HTMLButtonElement
    const tour_description = tour_container.querySelector('.tour_description')! as HTMLParagraphElement
    const indicator = tour_container.querySelector('.tour_indicator')! as HTMLSpanElement
    const tour_skyp = tour_container.querySelector('.tour_skyp')! as HTMLButtonElement
    const tour_finish = tour_container.querySelector('.tour_finish')! as HTMLButtonElement

    overlay.style.backgroundColor = '#00000080'
    tour_container.classList.remove('d-none')

    const steps: {
        [step: string]: () => number;
    } = {
        step_1: () => {
            overlay.style.top = (tour_elements.tour_1.position.top - 10) + 'px'
            overlay.style.left = (tour_elements.tour_1.position.left - 20) + 'px'

            tour_container.style.top = (tour_elements.tour_1.position.top + 65) + 'px'
            tour_container.style.left = (tour_elements.tour_1.position.left - (250 / 3)) + 'px'

            tour_description.innerHTML = 'Click on this button to close or open the menu panel.'
            return 1
        },
        step_2: () => {
            overlay.style.top = (tour_elements.tour_2.position.top - 10) + 'px'
            overlay.style.left = (tour_elements.tour_2.position.left - 10) + 'px'

            tour_container.style.top = (tour_elements.tour_2.position.top + 65) + 'px'
            tour_container.style.left = (tour_elements.tour_2.position.left - (250 / 3)) + 'px'

            tour_description.innerHTML = 'Click on this button to manage favorite pages.'
            return 2
        },
        step_3: () => {
            overlay.style.top = (tour_elements.tour_3.position.top + 2) + 'px'
            overlay.style.left = (tour_elements.tour_3.position.left - 6) + 'px'

            tour_container.style.top = (tour_elements.tour_3.position.top + 70) + 'px'
            tour_container.style.left = (tour_elements.tour_3.position.left - (250 / 3)) + 'px'

            tour_description.innerHTML = 'Click on this button to put the window in full screen.'
            return 3
        },
        step_4: () => {
            overlay.style.top = (tour_elements.tour_4.position.top - 8) + 'px'
            overlay.style.left = (tour_elements.tour_4.position.left - 9) + 'px'

            tour_container.style.top = (tour_elements.tour_4.position.top + 65) + 'px'
            tour_container.style.left = (tour_elements.tour_4.position.left - (250 / 3)) + 'px'

            tour_description.innerHTML = 'Click on this button to download the activity tracking software.'
            return 4
        },
        step_5: () => {
            overlay.style.top = (tour_elements.tour_5.position.top - 10) + 'px'
            overlay.style.left = (tour_elements.tour_5.position.left - 9) + 'px'

            tour_container.style.top = (tour_elements.tour_5.position.top + 65) + 'px'
            tour_container.style.left = (tour_elements.tour_5.position.left - (250)) + 'px'

            tour_description.innerHTML = 'Click on this button to see the session options.'
            return 5
        },
    }
    let current_step = steps.step_1()
    const next_prev_btn = () => {
        switch (current_step) {
            case 1:
                next_btn.classList.remove('disabled')
                prev_btn.classList.add('disabled')
                tour_skyp.classList.remove('d-none')
                tour_finish.classList.add('d-none')
                break;
            case 5:
                    next_btn.classList.add('disabled')
                    prev_btn.classList.remove('disabled')
                    tour_skyp.classList.add('d-none')
                    tour_finish.classList.remove('d-none')
                break;
        
            default:
                next_btn.classList.remove('disabled')
                prev_btn.classList.remove('disabled')
                tour_skyp.classList.remove('d-none')
                tour_finish.classList.add('d-none')
                break;
        }
        indicator.innerText = current_step.toString()
    }
    next_prev_btn()
    const close_overlay = () => {
        let token = getHook()
        overlay.remove()
        overlay_lock_touch.remove()
        if (!token) return
        setTourStatus(token)
    }

    next_btn.addEventListener('click', () => {
        if (current_step < 5) {
            current_step = steps[`step_${current_step + 1}`]()
            next_prev_btn()
        }
    }, false)
    prev_btn.addEventListener('click', () => {
        if (current_step > 1) {
            current_step = steps[`step_${current_step - 1}`]()
            next_prev_btn()
        }
    }, false)
    tour_skyp.addEventListener('click', close_overlay, false)
    tour_finish.addEventListener('click', close_overlay, false)
}, false);
