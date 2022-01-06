import FormValidations from './../FormValidations/form_validations';
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';

export default class PasswordRecoveryPresenter {

    constructor() { }

    validateForm(data) {

        const isPasswordValid = this.validatePassword(data.password, 'Mot de passe');
        if (isPasswordValid.error) {
            return isPasswordValid;
        }

        const isPasswordValidA = this.validatePassword(data.newPassword, 'Nouveau mot de passe');
        if (isPasswordValidA.error) {
            return isPasswordValidA;
        }

        const isPasswordValidB = this.validatePassword(data.newPasswordConfirmed, 'Nouveau mot de passe');
        if (isPasswordValidB.error) {
            return isPasswordValidB;
        }

        return isPasswordValidB;
    }

    validateEmail(value) {
        const isEmailFill = FormValidations.validateEmailField(value);
        if (!isEmailFill.valid) return FormValidations.backResponse(true, 'Email' + ' ' + isEmailFill.msg);

        return FormValidations.backResponse(false, '');
    }

    validatePassword(value, fieldName) {
        const isPasswordValid = FormValidations.validatePasswordField(value);
        if (!isPasswordValid.valid) return FormValidations.backResponse(true, fieldName + ' ' + isPasswordValid.msg);

        return FormValidations.backResponse(false, '');
    }
    
    sendAuthFormToRecoveryPassword(email) {
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.users.passwordRecovery,
            false,
            null,
            email
        )
    }

    updateUserPassword(token, formData) {
        return this.updateUserPasswordFromServer(token, formData);
    }

    updateUserPasswordFromServer(token, formData) {
        
        console.log("Toke: ", token);
        const webApiServicesPresenter = new WebApiConnectionPresenter();
        
        const service = WebApiServicesDictionary.dictionary.updateUserPassword.service;
        console.log("Service: ", service)
        return webApiServicesPresenter.executeApiServiceWithToken(service, token, formData);
    }

};
