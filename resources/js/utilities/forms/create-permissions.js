import JustValidate from 'just-validate';
import localization from './localization.json'

$(() => {
    $('#create-permissions-form').repeater({
        // (Optional)
        // start with an empty list of repeaters. Set your first (and only)
        // "data-repeater-item" with style="display:none;" and pass the
        // following configuration flag
        initEmpty: true,
        // (Optional)
        // "defaultValues" sets the values of added items.  The keys of
        // defaultValues refer to the value of the input's name attribute.
        // If a default value is not specified for an input, then it will
        // have its value cleared.
        defaultValues: {
            // 'text-input': 'foo'
        },
        // (Optional)
        // "show" is called just after an item is added.  The item is hidden
        // at this point.  If a show callback is not given the item will
        // have $(this).show() called on it.
        show: function () {
            $(this).slideDown();
        },
        // (Optional)
        // "hide" is called when a user clicks on a data-repeater-delete
        // element.  The item is still visible.  "hide" is passed a function
        // as its first argument which will properly remove the item.
        // "hide" allows for a confirmation step, to send a delete request
        // to the server, etc.  If a hide callback is not given the item
        // will be deleted.
        hide: function (deleteElement) {
            $(this).slideUp(deleteElement);
        },
        // (Optional)
        // Removes the delete button from the first list item,
        // defaults to false.
        isFirstItemUndeletable: true
    });
})

const validator = () => {
    const validate = new JustValidate('#create-permissions-forms', undefined, localization);
    /**
     * @type {HTMLFormElement}
     */
    const form = validate.form
    /**
     * @type {HTMLButtonElement}
     */
    const add_item_button = form.querySelector('button[data-repeater-create]')
    let locale = document.querySelector('html').getAttribute('lang') ?? 'en'

    form.querySelectorAll('input[name="permission-code[]"]').forEach(input => {
        console.log(input);
        
        validate.addField(input, [
            {
                rule: 'required',
                errorMessage: 'permission.code.required',
            },
            {
                rule: 'customRegexp',
                value: /^[a-z]+(\.[a-z]+)*$/,
                errorMessage: 'permission.code.invalid',
            }
        ])
    })
    
    form.querySelectorAll('textarea[name="permission-description[]"]').forEach(input => {
        validate.addField(input, [
            {
                rule: 'required',
                errorMessage: 'permission.description.required',
            },
            {
                rule: 'minLength',
                value: 5,
                errorMessage: 'permission.description.too_short',
            }
        ])
    })

    add_item_button.addEventListener('click', (e) => {
        form.querySelectorAll('input[name="permission-code[]"]').forEach(input => {
            validate.removeField(input)
        })
        
        form.querySelectorAll('textarea[name="permission-description[]"]').forEach(input => {
            validate.removeField(input)
        })
        validator();
        validate.validate(true)
    })
    
    
    const run_validation = () => {
        /**
         * @type {HTMLFormElement}
        */
        const form = validate.form
        const listener = async (e) => {
            e.preventDefault()
            await validate.validate(true)
        }
        form.addEventListener('submit', listener, false)
    }
    run_validation()
    validate.setCurrentLocale(locale)
}

const form_validation_element = document.querySelector('#create-permissions-forms')
if (form_validation_element) {
    validator()
}
