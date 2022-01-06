import FormValidations from './../FormValidations/form_validations';
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import ApiServicesHelper from './../Utils/ApiServicesHelper/api_services_helper';

import faker from 'faker'
import * as Arrays from '../Constants/constants.index';

export default class UserPresenter {

    constructor() { }

    getUserMeFake() {
        return new Promise(resolve => {
            const data = {
                id: faker.random.uuid(),
                name: faker.name.firstName(0),
                lastName: faker.name.lastName(0),
                phone: faker.phone.phoneNumber(""),
                email: faker.internet.email( ),
                poste: faker.company.companyName(0),
                company: faker.company.companyName(0),
                password: faker.internet.password(8),
                professional: faker.random.number(10).toString()
            }

            resolve({status: 1, user: data});
        });
    }

    getMyFileFake() {
        return new Promise(resolve => {
            const data = {
                gender: faker.random.arrayElement(Arrays.getGendersArray()).value,
                birthDate: faker.date.past(),
                weight: faker.random.number({min: 40, max: 200}).toString(),
                height: faker.random.number({min: 120, max: 200}).toString(),
                smoker: faker.random.arrayElement(Arrays.getYesNoArray()).value,
                exercise: faker.random.arrayElement(Arrays.getFreqSportArray()).value,
                children: faker.random.arrayElement(Arrays.getKidsArray()).value,
                pregnant: faker.random.arrayElement(Arrays.getYesNoArray()).value,
                pathology: faker.random.arrayElement(Arrays.getPathoArray()).value,
                antecedents: faker.random.arrayElement(Arrays.getPathoArray()).value,
                bloodGroup: faker.random.arrayElement(Arrays.getBloodArray()).value,
            }

            resolve({status: 1, data: data});
        });
    }

    validateUserMeForm(data) {
        const isNameValid = this.validateRequiredField(data.name, 'name');
        if (isNameValid.error) return isNameValid;
        const isLastNameValid = this.validateRequiredField(data.lastName, 'lastName');
        if (isLastNameValid.error) return isLastNameValid;
        const insLangValid = this.validateRequiredField(data.language, 'language');
        return insLangValid;
        /*
        const isCityValid = this.validateRequiredField(data.city, 'city');
        if (isCityValid.error) return isCityValid;
        const isCountryValid = this.validateRequiredField(data.country, 'country');
        return isCountryValid;
        */
    }

    getUserMe() {
        return this.getUserMeFromServer(ApiServicesHelper.tokenFromSession);
    }

    getUserMeFromServer(token) {
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.users.getUserMe,
            token,
            null,
            false
        )
    }

    parseUserMe = (result) => {
        const user = {
            email: result.email,
            lastName: result.lastName,
            alias: result.alias,
            name: result.name,
            phone: result.phone,
            notification: result.notification,
            permissions: result.permissions,
            pushMessages: result.push_messages,
            pushChatMessages: result.push_chat_messages,
            badges: result.badges,
            status: result.status,
            language: result.lang,
            city: result.profile.city,
            country: result.profile.country,
            profile: result.profile,
        }
        return user;
    }

    parseUserAnonym = (result) => {
        const user = {
            email: "",
            lastName: "",
            alias: "Poseur",
            name: "Poseur",
            phone: "",
            notification: false,
            permissions: 1,
            pushMessages: [],
            badges: 0,
            status: 1,
            language: "fr",
            city: "",
            country: "",
            profile: {
                "gender": "",
                "birthDate": null,
                "weight": 0,
                "height": 0,
                "smoker": false,
                "exercise": 0,
                "children": 0,
                "pregnant": false,
                "selectedLanguage": "fr",
                "pathology": [],
                "antecedents": [],
                "bloodGroup": "",
            }
        }
        return user;
    }

    verifyUserFromServer(email) {
        const service = WebApiServicesDictionary.dictionary.users.verifyUser;
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            service,
            false,
            null,
            email
        )
    }

    updateUserMe(data) {
        const apiConnection = new WebApiConnectionPresenter();
        let formData = new FormData();
        formData.append('name', data.name);
        formData.append('lastName', data.lastName);
        formData.append('city', data.city);
        formData.append('age', data.age)
        formData.append('niveau', data.niveau)
        formData.append('etablissement', data.etablissement)
        formData.append('description', data.description) 
        
        formData = ApiServicesHelper.setImages( [data.photo], formData, 'photo' )

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.userClient.updateUserInfo,
            ApiServicesHelper.tokenFromSession,
            formData,
            false
        );
    }

    updateMyFile(data) {
        const apiConnection = new WebApiConnectionPresenter();
        const formData = new FormData();
        formData.append('gender', data.gender);
        if (data.birthDate !== null) {
            formData.append('birthDate', data.birthDate.toISOString() );
        }
        formData.append('weight', data.weight);
        formData.append('height', data.height);
        formData.append('smoker', data.smoker);
        formData.append('sportFrequency', data.exercise);
        formData.append('kids', data.children);
        formData.append('isPregnant', data.pregnant);
        formData.append('pathologies', JSON.stringify([...data.pathology]));
        formData.append('familyHistory', JSON.stringify([...data.antecedents]));
        formData.append('bloodType', data.bloodGroup);

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.users.updateUserProfile,
            ApiServicesHelper.tokenFromSession,
            formData,
            false
        );
    }

    updateUserPhone(phone) {
        const formData = new FormData();
        formData.append("phone", phone);

        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.userClient.updateUserInfo,
            ApiServicesHelper.tokenFromSession,
            formData,
            false
        );
    }

    updateUserAddress(formData) {
        return ApiServicesHelper.getTokenFromSession()
        .then(data => {
            return this.updateUserAddressFromServer(data, formData);
        });
    }

    updateUserAddressFromServer(data, formData) {
        const token = data.token;
        
        /*
        const webApiServicesPresenter = new WebApiServicesPresenter();
        
        const service = WebApiServicesDictionary.dictionary.updateUserAddress.service;
        return webApiServicesPresenter.executeApiServiceWithToken(service, token, formData);
        */

        //TODO
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.todo.uno,
            token,
            null,
            false
        );
    }

    updateUserPassword(formData) {
        return ApiServicesHelper.getTokenFromSession()
        .then(data => {
            return this.updateUserPasswordFromServer(data, formData);
        });
    }

    updateUserPasswordFromServer(data, formData) {
        const token = data.token;

        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.users.updatePassword,
            token,
            formData,
            false
        );
    }

    updateUser(data) {
        
        let formData = new FormData();
        formData.append('userid', data.id);
        formData.append('usernotification', data.notification);
        formData.append('useradmin', data.admin);
        formData.append('useractive', data.isActive);
        formData.append('username', data.username);

        /*
        const service = WebApiServicesDictionary.dictionary.userClient.updateUserInfo;
        return webApiServicesPresenter.executeServerApiService(service, formData);
        */

        //TODO
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.todo.uno,
            token,
            null,
            false
        );
    }

    updateUserNotifications(notifications) {
        return ApiServicesHelper.getTokenFromSession()
        .then(data => {
            return this.updateServerUserSettings(data, notifications);
        });
    }

    updateServerUserSettings = (data, notifications) => {
        let formData = new FormData();
        formData.append('notifications', notifications ? 1 : 0);

        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.userClient.updateNotificationStatus,
            data.token,
            formData,
            false
        );
    }

    sendMessageNotification(title, body, roomId, users) {
        const token = ApiServicesHelper.tokenFromSession;
        let formData = new FormData();
        formData.append('users', JSON.stringify(users));
        formData.append('title', title);
        formData.append('body', body);
        formData.append('roomId', roomId);

        /*
        const service = WebApiServicesDictionary.dictionary.sendMessageNotification.service;
        const webApiServicesPresenter = new WebApiServicesPresenter();
        return webApiServicesPresenter.executeApiServiceWithToken(service, data.token, formData)
        .then(resultService => resultService);
        */

        //TODO
        //console.log("Form", formData)
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.sns.sendNotification,
            token,
            formData,
            false
        );
    }

    updateChatMeessages(list) {
        let formData = new FormData();
        formData.append('list', JSON.stringify(list));

        
        /*
        const service = WebApiServicesDictionary.dictionary.updateChatMeessages.service;
        const webApiServicesPresenter = new WebApiServicesPresenter();
        return webApiServicesPresenter.executeApiServiceWithToken(service, data.token, formData)
        .then(resultService => resultService);
        */

        //TODO
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.sns.updateChatMeessages,
            ApiServicesHelper.tokenFromSession,
            formData,
            false
        );
    }

    /*
    setAppVersion(token, appVersion) {
        const webApiServicesPresenter = new WebApiServicesPresenter();
        
        let formData = new FormData();
        formData.append('appversion', appVersion);
        return webApiServicesPresenter.executeUserAppVersionSet(token, formData)
        .then(result => {
            if (result.status === 1) {  
                return({status: result.status, result: result.data});
            }
        });
    }
    */

    validateForm(data) {

        const isPasswordValid = this.validatePassword(data.password, 'Mot de passe actuel');
        if (isPasswordValid.error) {
            return isPasswordValid;
        }

        const isPasswordNewValid = this.validatePassword(data.newPassword, 'Nouveau mot de passe');
        if (isPasswordNewValid.error) {
            return isPasswordNewValid;
        }

        const isPasswordCValid = this.validatePassword(data.confirmPassword, 'Confirmer le mot de passe');
        if (isPasswordCValid.error) {
            return isPasswordCValid;
        }

        return isPasswordCValid;
    }

    validatePassword(value, fieldName) {
        const isPasswordValid = FormValidations.validatePasswordField(value);
        if (!isPasswordValid.valid) return FormValidations.backResponse(true, fieldName + ' ' + isPasswordValid.msg);

        return FormValidations.backResponse(false, '');
    }
    
    validateRequiredField(value, fieldName) {
        const maxValid = FormValidations.validateRequiredField(value);
        if (!maxValid.valid) return FormValidations.backResponse(true, fieldName + ' ' + maxValid.msg);

        return FormValidations.backResponse(false, '');
    }

    updateUserSettings(lang) {
        return this.updateServerUserSettings(ApiServicesHelper.tokenFromSession, lang);
    }

    updateServerUserSettings = (token, lang) => {
        let formData = new FormData();
        formData.append( 'lang', lang );

        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.users.updateUserSettings,
            token,
            formData,
            false
        );
    }

    getUserList() {
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.users.getUsers,
            ApiServicesHelper.tokenFromSession,
            null,
            false
        );
    }
};
