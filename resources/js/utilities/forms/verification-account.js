import JustValidate from 'just-validate';

const validate = new JustValidate('#verification-account-form');

validate.addField('#nom', [
    {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Le nom doit comporter au moins 2 caractères',
    },
    {
        rule: 'maxLength',
        value: 255,
        errorMessage: 'Le nom doit comporter au maximum 255 caractères',
    },
    {
        rule: 'required',
        errorMessage: 'Le nom est requis',
    },
])

validate.validate(true).then(data => {
    console.log(data)
})