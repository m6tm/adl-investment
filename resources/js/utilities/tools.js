

let textOrientations = document.querySelectorAll("[data-orientation][data-orientation-text]")

textOrientations.forEach(element => {
    const orientations = ['vertical', 'horizontal']
    const element_value = element.getAttribute('data-orientation')
    if (orientations.includes(element_value)) aligText(element, element_value)
})

/**
 * Aligne le texte selon l'orientation
 * @param {HTMLElement} element 
 * @param {'vertical' | 'horizontal'} orientation 
 */
function aligText(element, orientation) {
    const text = (element.getAttribute('data-orientation-text') ?? '').split('')
    switch (orientation) {
        case 'vertical':
            element.classList.add('d-flex', 'flex-column', 'align-items-center')
            element.childNodes.forEach(child => child.remove())
            text.forEach(letter => {
                const span = document.createElement('span')
                span.classList.add('d-block', 'text-center')
                span.style.height = `20px`
                span.textContent = letter
                element.appendChild(span)
            })
            break;
    
        default:
            break;
    }
}

function selectLanguage() {
    /**
     * @type {HTMLSelectElement | null}
     */
    const languauge_input = document.getElementById('lang-country')
    if (!languauge_input) return
    const language_icon = languauge_input.parentElement.querySelector('span.fi')
    const current_language = languauge_input.selectedOptions[0].value
    const current_language_flag = languauge_input.selectedOptions[0].getAttribute('data-lang')
    let url = location.href
    
    if (!languauge_input || !language_icon) return
    
    language_icon.setAttribute('class', `fi fi-${current_language}`)
    languauge_input.addEventListener('change', () => {
        const selected_language = languauge_input.selectedOptions[0].getAttribute('data-lang')
        const selected_language_flag = languauge_input.selectedOptions[0].value
        language_icon.setAttribute('class', `fi fi-${selected_language_flag}`)
        console.log(url, current_language);
        url = url.replace(`${location.origin}/${current_language_flag}`, `${location.origin}/${selected_language}`)
        location.href = `${location.origin}/locale/${selected_language}`
    })
}
selectLanguage()

function dataLinkCursor() {
    const links = Array.from(document.querySelectorAll('.cursor-pointer[data-link]'))
    links.forEach(link => {
        link.addEventListener('click', () => {
            const link_str = link.getAttribute('data-link')
            if (typeof link_str === 'string') {
                window.location.href = link_str
            }
        }, false)
    })
}
dataLinkCursor()

function sidebarToggler() {
    const sidebar_toggler = document.getElementById('sidebar-toggler')
    const sidebar_aside = document.getElementById('sidebar-aside')
    if (!sidebar_toggler || !sidebar_aside) return
    
    sidebar_toggler.addEventListener('click', () => {
        sidebar_aside.classList.toggle('side-bar-hidden')
        sidebar_toggler.classList.toggle('rotate-180')
    })
}
sidebarToggler()

function accountVerificationSteps() {
    const steps = document.getElementById('account-verification-steps')
    const tabs = document.getElementById('verification-account-tabs')
    if (!steps || !tabs) return
    if (!steps.hasAttribute('data-current-step')) steps.setAttribute('data-current-step', 1)
    const next_step = steps.querySelector('button#next')
    const prev_step = steps.querySelector('button#prev')
    const finish = steps.querySelector('button#finish')
    const step_items = Array.from(steps.children).filter(child => child.hasAttribute('data-step'))
    const tab_items = Array.from(tabs.children).filter(child => child.hasAttribute('data-tab-step'))
    let step_count = Array.from(steps.children).filter(child => child.hasAttribute('data-step')).length
    let current_step = parseInt(steps.getAttribute('data-current-step') ?? '1');

    const steps_worker = (() => {
        if (current_step > 1) {
            prev_step.classList.remove('hidden')
            finish.classList.add('hidden')
        }
        if  (current_step === step_count) {
            next_step.classList.add('hidden')
            finish.classList.remove('hidden')
        }
        if (current_step < step_count) {
            next_step.classList.remove('hidden')
            finish.classList.add('hidden')
        }
        if (current_step === 1) {
            prev_step.classList.add('hidden')
            finish.classList.add('hidden')
        }

        step_items.forEach((current_item, key) => current_step !== (key + 1) ? current_item.classList.add('verification-account-hidden') : current_item.classList.remove('verification-account-hidden'))
        tab_items.forEach((current_item, key) => current_step !== (key + 1) ? current_item.classList.remove('bg-slate-100') : current_item.classList.add('bg-slate-100'))
        tab_items.forEach((current_item, key) => current_step !== (key + 1) ? current_item.classList.remove('dark:bg-slate-600') : current_item.classList.add('dark:bg-slate-600'))
    });
    steps_worker()

    next_step.addEventListener('click', () => {
        if (current_step < step_count) {
            current_step += 1
        }
        steps_worker()
    })
    
    prev_step.addEventListener('click', () => {
        if (current_step > 1) {
            current_step -= 1
        }
        steps_worker()
    })

    tab_items.forEach((current_item, key) => {
        current_item.addEventListener('click', () => {
            current_step = key + 1
            steps_worker()
        })
    })
}
accountVerificationSteps()