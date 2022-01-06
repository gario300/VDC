const responseData = (isValid, msg) => {
    if (isValid) {
        msg = '';
    }
    return {valid: isValid, msg: msg};
}

export default class FormValidations {
    constructor() { }

    static validateRequiredField = (value) => 
    {
        const empty_string = /^\s*$/;
        const msg = 'est requis';
        const isValid = !empty_string.test(value);
        return responseData(isValid, msg);
    }

    static validateEmailField = (email) => {
        const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const msg = "n'est pas valide";
        const isValid = email_regex.test(email);
        return responseData(isValid, msg);
    }

    static validatePasswordField = (value) => {
        const password_regex = /^(?=.{6,})(?=.*[0-9])((?=.*[a-z]){1}).*$/g;
        const msg = "6 caractères minimum et au moins 1 chiffre";
        const isValid = password_regex.test(value);
        return responseData(isValid, msg);
    }
    
    static validateMaxLengthField = (value, maxLength) => {
        const maxLength_regex = new RegExp('^.{0,'+ maxLength +'}$');
        const msg = 'la longueur maximale est ' + maxLength;
        const isValid = maxLength_regex.test(value);
        return responseData(isValid, msg);
    }

    static validateMinLengthField = (value, minLength) => {
        const minLength_regex = new RegExp('^.{'+ minLength +',1000}$');
        const msg = 'la longueur minimale est ' + minLength;
        const isValid = minLength_regex.test(value);
        return responseData(isValid, msg);        
    }

    static backResponse = (error, msg) => {
        return {error: error, msg: msg};
    }
};