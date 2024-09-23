import { sleep } from "./tools"

const form_selectors = ['#product-order-form', '#product-order-form-edit']

async function calculateTotal() {
        await sleep(100)
        form_selectors.forEach(selector => {
                let price = parseFloat($(`${selector} #product`).attr('data-price') as any ?? 0),
                product = document.querySelector(`${selector} #product`) as HTMLSelectElement,
                qty = parseInt($(`${selector} #qty`).val() as any ?? '0'),
                discount = parseFloat($(`${selector} #discount`).val() as any ?? 0),
                currency_symbol = product.selectedOptions.item(0)!.getAttribute('data-currency') ?? '$',
                total = (price * qty) * (1 - (discount / 100))
                
                $(`${selector} #total`).attr('value', (isNaN(total) ? 0 : total.toFixed(2)) + ' ' + currency_symbol)
        })
}

if ($('#product-order-form').length) {
        form_selectors.forEach(selector => {
                $(`${selector} #product`).on('change', ({ target }) => {
                        const select: HTMLSelectElement = target as any
                        select.setAttribute('data-price', select.selectedOptions[0].getAttribute('data-price') ?? '0')
                        $(`${selector} #order-description`).text(select.selectedOptions[0].getAttribute('data-description') ?? '0')
                })
                
                $(`${selector} #product, ${selector} #qty, ${selector} #discount`).each((index, input) => {
                        $(input).on('keyup', calculateTotal)
                        $(input).on('change', calculateTotal)
                })
        })
}
