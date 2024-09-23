# product.ts

## Overview

This TypeScript file (`product.ts`) contains functionality related to product calculations and form interactions in the application. It utilizes a sleep function from the `tools` module.

## Function: calculateTotal()

The file defines an asynchronous function `calculateTotal()` that calculates the total price based on the selected product, quantity, and discount. It uses the `sleep` function for a delay and updates total values for specified form selectors.

### Code Snippet

```typescript
import { sleep } from "./tools";

const form_selectors = ['#product-order-form', '#product-order-form-edit'];

async function calculateTotal() {
    await sleep(100);

    form_selectors.forEach(selector => {
        let price = parseFloat($(`${selector} #product`).attr('data-price') as any ?? 0),
            qty = parseInt($(`${selector} #qty`).val() as any ?? '0'),
            discount = parseFloat($(`${selector} #discount`).val() as any ?? 0),
            total = (price * qty) * (1 - (discount / 100));

        $(`${selector} #total`).attr('value', '$' + (isNaN(total) ? 0 : total.toFixed(2)));
    });
}
```

## Form Interaction

The script interacts with product order forms, specifically identified by the selectors `#product-order-form` and `#product-order-form-edit`. It sets up event listeners for form elements like product selection, quantity input, and discount input, triggering the `calculateTotal()` function.

### Code Snippet

```typescript
if ($('#product-order-form').length) {
    form_selectors.forEach(selector => {
        // Event listener for product selection change
        $(`${selector} #product`).on('change', ({ target }) => {
            const select: HTMLSelectElement = target as any;
            select.setAttribute('data-price', select.selectedOptions[0].getAttribute('data-price') ?? '0');
            $(`${selector} #order-description`).text(select.selectedOptions[0].getAttribute('data-description') ?? '0');
        });

        // Event listeners for keyup and change events on product, quantity, and discount inputs
        $(`${selector} #product, ${selector} #qty, ${selector} #discount`).each((index, input) => {
            $(input).on('keyup', calculateTotal);
            $(input).on('change', calculateTotal);
        });
    });
}
