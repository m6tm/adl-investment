

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