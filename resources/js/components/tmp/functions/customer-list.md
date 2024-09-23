# customer-list.ts

## Overview

This TypeScript file (`customer-list.ts`) contains logic related to customer data management in the application. It utilizes DataTables for enhanced table functionality.

## Initialization

The file begins with the initialization of DataTables for the customer list. It sets up specific configurations and options for the DataTable instance.

### Customer List DataTable Initialization

```typescript
if ($(".customer-find").length) {
    // DataTable configuration for the customer list
    var dataListView = ($(".customer-find") as any).DataTable({
        // ... (configurations)
    });
    window.dataListView = dataListView;
}
```

## DataTable Configuration

The DataTable configuration includes column definitions, order settings, DOM structure, language settings, and other options specific to the customer list.

### Customer List Configuration

```typescript
columnDefs: [
    {
        targets: 0,
        className: "control"
    },
    // ... (other column definitions)
],
order: [2, 'asc'],
dom: '<"top d-flex flex-wrap"<"action-filters flex-grow-1"f><"actions action-btns d-flex align-items-center justify-content-end"<"mr-2"l>B>>t<"bottom"ip>',
language: {
    search: "",
    searchPlaceholder: "Search Customer"
},
select: false,
lengthMenu: [[25, 50, 75, 100], [25, 50, 75, 100]],
pageLength: 25,
responsive: {
    details: {
        type: "column",
        target: 0
    }
}
```

## Product List and Order List Sections

Following the customer list configuration, the file includes similar DataTable configurations for the product list and order list sections. Each section has its specific settings and functionalities.

### Product List Configuration

```typescript
if ($(".product-list").length) {
    ($(".product-list") as any).DataTable({
        // ... (product list configurations)
    });

    // Checkbox change event handling for the product list
    $('.product-list input[type="checkbox"]').each((key, input) => {
        // ... (checkbox change event logic)
    });
}
```

### Order List Configuration

```typescript
if ($(".order-list").length) {
    ($(".order-list") as any).DataTable({
        // ... (order list configurations)
    });

    // Checkbox change event handling for the order list
    $('.order-list input[type="checkbox"]').each((key, input) => {
        // ... (checkbox change event logic)
    });
}
