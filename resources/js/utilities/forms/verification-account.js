import JustValidate from 'just-validate';
import localization from './localization.json'
import parsePhoneNumber from 'libphonenumber-js'

const validate = new JustValidate('#verification-account-form', undefined, localization);
let locale = document.querySelector('html').getAttribute('lang') ?? 'en'

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


const run_validation = async () => {
    await validate.validate(true)
    /**
     * @type {HTMLFormElement}
    */
   const form = validate.form
   const error_list = document.querySelector('#error-validation-list')
   const country = form.querySelector('#pays')
   const country_code = country.getAttribute('data-code')
   const listener = async (e) => {
       e.preventDefault()

       let phone = form.querySelector('#telephone').value.trim();
       if (phone.length === 0) phone = '000'
       const phoneNumber = parsePhoneNumber(phone, country_code)
       
       if (phoneNumber.isValid()) {
        validate.addField('#telephone', [
            {
                rule: 'required',
                errorMessage: 'phone.required',
            },
            {
                rule: 'phone',
                errorMessage: 'phone.invalid',
            },
        ])
       }

       await validate.validate(true)
       Array.from(error_list.children).forEach(li => li.remove())
       if (validate.isValid) {
           form.submit()
           error_list.innerHTML = ''
           return
       }
       const errors = Object.values(validate.errorLabels).map(label => label.textContent)
       errors.forEach(error => {
            const li = document.createElement('li')
            li.textContent = error
           error_list.appendChild(li)
       })
    }
    form.addEventListener('submit', listener, false)
}
run_validation()
validate.setCurrentLocale(locale)
