import FormValidations from './../FormValidations/form_validations';
import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import Localization from './../Localization/localization';

export default class InscriptionPresenter {

    constructor() { }

    validateForm(data) {
        const isEmailValid = this.validateEmail(data.email, 'email');
        if (isEmailValid.error) {
            return isEmailValid;
        }

        const isNameValid = this.validateRequiredField(data.name, 'nom');
        if (isNameValid.error) {
            return isNameValid;
        }

        const isLastNameValid = this.validateRequiredField(data.lastName, 'prénom');
        if (isLastNameValid.error) {
            return isLastNameValid;
        }

        const isPasswordValid = this.validatePassword(data.password, 'mot de passe');
        if (isPasswordValid.error) {
            return isPasswordValid;
        }

        return isPasswordValid;
    }

    validateFormInscription(data) {
        const isEmailValid = this.validateEmail(data.email, 'email');
        if (isEmailValid.error) {
            return isEmailValid;
        }

        const isPhoneValid = this.validatePhone(data.phone, 'téléphone');
        if (isPhoneValid.error) {
            return isPhoneValid;
        }

        const isNameValid = this.validateRequiredField(data.name, 'nom');
        if (isNameValid.error) {
            return isNameValid;
        }

        const isLastNameValid = this.validateRequiredField(data.lastName, 'prénom');
        if (isLastNameValid.error) {
            return isLastNameValid;
        }

        const isSocietyValid = this.validateRequiredField(data.society, Localization.word('societe') );
        if (isSocietyValid.error) {
            return isSocietyValid;
        }

        const isProfessionalRefValid = this.validateRequiredField(data.professionalRef, Localization.word('prof_ref') );
        if (isProfessionalRefValid.error) {
            return isProfessionalRefValid;
        }

        const isDistrictValid = this.validateRequiredField(data.district, Localization.word('quartier') );
        if (isDistrictValid.error) {
            return isDistrictValid;
        }

        const isMunicipalityValid = this.validateRequiredField(data.municipality, Localization.word('commune') );
        if (isMunicipalityValid.error) {
            return isMunicipalityValid;
        }

        const isCityValid = this.validateRequiredField(data.city, Localization.word('ville') );
        if (isCityValid.error) {
            return isCityValid;
        }

        const isPasswordValid = this.validatePassword(data.password, 'mot de passe');
        if (isPasswordValid.error) {
            return isPasswordValid;
        }

        return isPasswordValid;
    }

    validateFormInscriptionSetValues(data) {

        const isPhoneValid = this.validatePhone(data.phone, 'téléphone');
        if (isPhoneValid.error) {
            return isPhoneValid;
        }

        const isDistrictValid = this.validateRequiredField(data.district, Localization.word('quartier') );
        if (isDistrictValid.error) {
            return isDistrictValid;
        }

        const isMunicipalityValid = this.validateRequiredField(data.municipality, Localization.word('commune') );
        if (isMunicipalityValid.error) {
            return isMunicipalityValid;
        }

        const isCityValid = this.validateRequiredField(data.city, Localization.word('ville') );
        if (isCityValid.error) {
            return isCityValid;
        }

        return isCityValid;
    }

    validateEmail(value, fieldName) {
        const isEmailFill = FormValidations.validateEmailField(value);
        if (!isEmailFill.valid) return FormValidations.backResponse(true, fieldName + ' ' + isEmailFill.msg);

        return FormValidations.backResponse(false, '');
    }

    validatePassword(value, fieldName) {
        const isPasswordValid = FormValidations.validatePasswordField(value);
        if (!isPasswordValid.valid) return FormValidations.backResponse(true, fieldName + ' ' + isPasswordValid.msg);

        return FormValidations.backResponse(false, '');
    }

    validatePhone(value, fieldName) {
        const maxValid = FormValidations.validateMaxLengthField(value, 12);
        if (!maxValid.valid) return FormValidations.backResponse(true, fieldName + ' ' + maxValid.msg);

        return FormValidations.backResponse(false, '');
    }

    validateRequiredField(value, fieldName) {
        const maxValid = FormValidations.validateRequiredField(value);
        if (!maxValid.valid) return FormValidations.backResponse(true, fieldName + ' ' + maxValid.msg);

        return FormValidations.backResponse(false, '');
    }
    
    sendInscriptionToServer(data) {
        const formData = new FormData();
        Object.keys(data).forEach( key => {
            formData.append(key, data[key]);
        })

        const service = WebApiServicesDictionary.dictionary.users.inscription;

        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            service, 
            false,
            formData,
            false
        );
    }
    
    sendInscriptionSocialToServer(data) {
        const formData = new FormData();
        Object.keys(data).forEach( key => {
            formData.append(key, data[key]);
        })

        const service = WebApiServicesDictionary.dictionary.users.inscriptionSocial;

        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            service, 
            false,
            formData,
            false
        );
    }
};
