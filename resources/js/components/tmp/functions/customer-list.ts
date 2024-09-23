import { isUndefined } from "lodash";

if ($(".customer-find").length) {
        var dataListView = ($(".customer-find") as any).DataTable({
                columnDefs: [
                        {
                                targets: 0,
                                className: "control"
                        },
                        {
                                targets: [0, 7],
                                orderable: false
                        },
                ],
                order: [2, 'asc'],
                dom:
                        '<"top d-flex flex-wrap"<"action-filters flex-grow-1"f><"actions action-btns d-flex align-items-center justify-content-end"<"mr-2"l>B>>t<"bottom"ip>',
                language: {
                        search: "",
                        searchPlaceholder: "Search Customer"
                },
                select: false,
                lengthMenu: [[25, 50, 75, 100], [25, 50, 75, 100]],
                pageLength: 25,
                responsive: false
        });
        window.dataListView = dataListView
}

if ($(".posting-request-find").length) {
        var dataListView = ($(".posting-request-find") as any).DataTable({
                columnDefs: [
                        {
                                targets: 0,
                                className: "control"
                        },
                        {
                                targets: [0, 10],
                                orderable: false
                        },
                ],
                order: [8, 'desc'],
                dom:
                        '<"top d-flex flex-wrap"<"action-filters flex-grow-1"f><"actions action-btns d-flex align-items-center justify-content-end"<"mr-2"l>B>>t<"bottom"ip>',
                language: {
                        search: "",
                        searchPlaceholder: "Search Posting Request"
                },
                select: false,
                lengthMenu: [[25, 50, 75, 100], [25, 50, 75, 100]],
                pageLength: 25,
                responsive: false
        });
        window.dataListView = dataListView
}

if ($(".product-list").length) {
        ($(".product-list") as any).DataTable({
                columnDefs: [
                        {
                                targets: 0,
                                className: "control",
                                data: null,
                                orderable: false,
                                render: function (data: any, type: any, row: any) {
                                        let btn = new DOMParser().parseFromString(Object.values(row).at(-1) as any, 'text/html').querySelector('button')!
                                        return "<input data-type=\"checkbox\" type='checkbox' name='product_ids[]' style='pointer-events: none' value='" + btn.getAttribute('data-prod') + "'>";
                                }
                        },
                        {
                                orderable: true,
                                targets: 0,
                                checkboxes: { selectRow: true }
                        },
                        {
                                targets: [0, 6],
                                orderable: false
                        }
                ],
                order: [1, 'asc'],
                dom: '<"top d-flex flex-wrap"<"action-filters flex-grow-1"f><"actions action-btns d-flex align-items-center justify-content-end"<"mr-2"l>B><"ml-auto"i>>t<"bottom"ip>',
                language: {
                        search: "",
                        searchPlaceholder: "Search Product"
                },
                select: {
                        style: 'multi',
                        selector: 'td:first-child',
                        items: "row"
                },
                lengthMenu: [[25, 50, 75, 100], [25, 50, 75, 100]],
                pageLength: 25,
                responsive: false
        });

        $('.product-list input[type="checkbox"]').each((key, input) => {
                $(input).on('change', (e: any) => {
                        setTimeout(() => {

                                let btn = $(input).parent().parent().children().last().children('button[data-prod]'),
                                        is_first_input = isUndefined($('.product-list input[type="checkbox"]:checked').first().attr('name'))

                                if (!is_first_input) {
                                        if ((input as HTMLInputElement).checked) {
                                                btn.removeAttr('disabled')
                                        } else {
                                                btn.attr('disabled', 'on')
                                        }
                                }
                                $('.product-list input[type="checkbox"][name="product_ids[]"]').each((index, input2) => {
                                        let btn2 = btn = $(input2).parent().parent().children().last().children('button[data-prod]')
                                        if ((input2 as HTMLInputElement).checked) {
                                                btn2.removeAttr('disabled')
                                        } else {
                                                btn2.attr('disabled', 'on')
                                        }
                                })

                                if ($('.product-list input[type="checkbox"]:checked').length == 1 && is_first_input) {
                                        $('button#delete-all').attr('disabled', 'on')
                                        return
                                }
                                if ($('.product-list input[type="checkbox"]:checked').length > 0) {
                                        $('button#delete-all').removeAttr('disabled')
                                } else {
                                        $('button#delete-all').attr('disabled', 'on')
                                }
                        }, 100);
                })
        })
}

if ($(".order-list").length) {
        ($(".order-list") as any).DataTable({
                columnDefs: [
                        {
                                targets: 0,
                                className: "control",
                                data: null,
                                orderable: false,
                                render: function (data: any, type: any, row: any) {
                                        let btn = new DOMParser().parseFromString(Object.values(row).at(-1) as any, 'text/html').querySelector('button')!,
                                                deleted = btn.hasAttribute('data-deleted')
                                        return `<input data-type="checkbox" ${deleted ? 'disabled readonly' : ''} type="checkbox" name="order_ids[]" style="pointer-events: none" value="${btn.getAttribute('data-prod')}">`;
                                }
                        },
                        {
                                orderable: true,
                                targets: 0,
                                checkboxes: { selectRow: true }
                        },
                        {
                                targets: [0, 6],
                                orderable: false
                        }
                ],
                order: [1, 'asc'],
                dom: '<"top d-flex flex-wrap"<"action-filters flex-grow-1"f><"actions action-btns d-flex align-items-center justify-content-end"<"mr-2"l>B><"ml-auto"i>>t<"bottom"ip>',
                language: {
                        search: "",
                        searchPlaceholder: "Search Order"
                },
                select: {
                        style: 'multi',
                        selector: 'td:first-child',
                        items: "row"
                },
                lengthMenu: [[25, 50, 75, 100], [25, 50, 75, 100]],
                pageLength: 25,
                responsive: false
        });

        $('.order-list input[type="checkbox"]').each((key, input) => {
                $(input).on('change', (e: any) => {
                        setTimeout(() => {

                                let btn = $(input).parent().parent().children().last().children('button[data-prod]'),
                                        is_first_input = isUndefined($('.order-list input[type="checkbox"]:checked').first().attr('name'))

                                if (!is_first_input) {
                                        if ((input as HTMLInputElement).checked) {
                                                btn.removeAttr('disabled')
                                        } else {
                                                btn.attr('disabled', 'on')
                                        }
                                }
                                $('.order-list input[type="checkbox"][name="order_ids[]"]').each((index, input2) => {
                                        let btn2 = btn = $(input2).parent().parent().children().last().children('button[data-prod]')
                                        if ((input2 as HTMLInputElement).checked) {
                                                btn2.removeAttr('disabled')
                                        } else {
                                                btn2.attr('disabled', 'on')
                                        }
                                })

                                if ($('.order-list input[type="checkbox"]:checked').length == 1 && is_first_input) {
                                        $('button#delete-all').attr('disabled', 'on')
                                        return
                                }
                                if ($('.order-list input[type="checkbox"]:checked').length > 0) {
                                        $('button#delete-all').removeAttr('disabled')
                                } else {
                                        $('button#delete-all').attr('disabled', 'on')
                                }
                        }, 100);
                })
        })
}