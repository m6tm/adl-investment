import JustValidate from 'just-validate';
import localization from './localization.json'
import parsePhoneNumber from 'libphonenumber-js'
import moment from 'moment'
import JustValidatePluginDate from 'just-validate-plugin-date';

const profil_validator = () => {
    const validate = new JustValidate('#profil-account-form', undefined, localization);
    let locale = document.querySelector('html').getAttribute('lang') ?? 'en'
    /**
     * @type {HTMLFormElement}
     */
    const form = validate.form
    const today = moment(moment.now())
    
    validate.addField('#Nom', [
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'last_name.too.short',
        },
        {
            rule: 'maxLength',
            value: 255,
            errorMessage: 'last_name.too.long',
        },
        {
            rule: 'required',
            errorMessage: 'last_name.required',
        },
    ])
        .addField('#Prenom', [
            {
                rule: 'minLength',
                value: 3,
                errorMessage: 'first_name.too.short',
            },
            {
                rule: 'maxLength',
                value: 255,
                errorMessage: 'first_name.too.long',
            },
            {
                rule: 'required',
                errorMessage: 'first_name.required',
            },
        ])
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'email.required',
            },
            {
                rule: 'email',
                errorMessage: 'email.invalid',
            },
        ])
        .addField('#username', [
            {
                rule: 'required',
                errorMessage: 'username.required',
            },
        ])
        .addField('#street', [
            {
                rule: 'required',
                errorMessage: 'street.required',
            },
        ])
        .addField('#birth_day', [
            {
                rule: 'required',
                plugin: JustValidatePluginDate(() => ({
                    required: true,
                    isAfter: moment(moment.now()).subtract(100, 'years').format('YYYY-MM-DD'),
                    isBefore: moment(moment.now()).subtract(19, 'years').format('YYYY-MM-DD'),
                })),
                errorMessage: 'birth_day.invalid'
            },
        ])
        .addField('#ville', [
            {
                rule: 'required',
                errorMessage: 'town.required',
            },
        ])
        .addField('#pays', [
            {
                rule: 'required',
                errorMessage: 'country.required',
            },
        ])
    
    
    const run_validation = async () => {
        await validate.validate(true)
        /**
         * @type {HTMLFormElement}
        */
        const form = validate.form
        const country = form.querySelector('#pays')
        const country_code = country.getAttribute('data-code')
        let has_telephone_field = false
        const listener = async (e) => {
            e.preventDefault()
    
            let phone = form.querySelector('#telephone').value.trim();
            if (phone.length === 0) phone = '000'
            let phoneNumber = parsePhoneNumber(phone, country_code)
            if (phoneNumber) phoneNumber = parsePhoneNumber(phoneNumber.formatNational(), country_code)
            
            if (!phoneNumber.isValid()) {
                has_telephone_field = true
                form.querySelector('#telephone').value = ""
                validate.addField('#telephone', [
                    {
                        rule: 'required',
                        errorMessage: 'phone.invalid',
                    },
                ])
                await validate.validate(true)
                return
            } else {
                if (has_telephone_field) validate.removeField('#telephone')
                has_telephone_field = false
            }

            if (validate.isValid) form.submit()
        }
        form.addEventListener('submit', listener, false)
    }
    run_validation()
    validate.setCurrentLocale(locale)
}

const form_validation_element = document.querySelector('#profil-account-form')
if (form_validation_element) {
    profil_validator()
}
