import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import ApiServicesHelper from './../Utils/ApiServicesHelper/api_services_helper';
import NotificationsPresenter from './../PushNotifications/notifications_presenter';
import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';

export default class NotificationsServer {

    constructor() { }
    
    verifyUserDeviceRegistered(token, deviceID) {
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.sns.isDeviceRegistered,
            token,
            {},
            deviceID
        );
    }

    registerDeviceForFlashNotifications(token, deviceID) {

        let formData = new FormData();
        formData.append('device_token', deviceID);
        //formData.append('topics', 'flashes');
        //formData.append('topics', 'staging,flashesandroid');

        formData.append('topics', 'flashes');
        //formData.append('topics', 'dev');
        
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.sns.registerDevice,
            token,
            formData,
            ""
        );
    }

    resetNotificationsFlashBadgesCount(badges, userID) {
       const formData = new FormData();
       formData.append('uid', userID);
       formData.append('badges', badges);
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.sns.usersPush,
            token,
            formData,
            ""
        );
    }

    getUserPushNotificationsNotSeen() {
        return this.getUserPushNotificationsNotSeenFromServer(ApiServicesHelper.tokenFromSession);
    }

    getUserPushNotificationsNotSeenFromServer(token) {
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.sns.usersPush,
            token,
            null,
            false
        );
    }

    updateFlashNotificationAsSeen(itemID) {
        return this.updateFlashNotificationAsSeenFromServer(itemID);
    }

    updateFlashNotificationAsSeenFromServer(itemID) {
        const token = ApiServicesHelper.tokenFromSession;

        let formData = new FormData();
        formData.append('itemid', itemID);
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.sns.updateUsersPush,
            token,
            formData,
            false
        );
    }

    removeDeviceToken = () => {
        let notificationsPresenter = new NotificationsPresenter();

        return notificationsPresenter.getDeviceToken()
        .then((tokenPermission) => {
            if (tokenPermission.status === 1)
            {
                let formData = new FormData();
                formData.append('device_token', tokenPermission.token);
                const apiConnection = new WebApiConnectionPresenter();
                return apiConnection.callApiService(
                    WebApiServicesDictionary.dictionary.sns.removeDeviceNotifications,
                    false,
                    formData,
                    false
                );
            }
            return false;
        })
    }

    postDeviceToken = (deviceToken) => {
        return this.postDeviceTokenOnServer(ApiServicesHelper.tokenFromSession, deviceToken);
    }

    postDeviceTokenOnServer = (token, deviceToken) => {
        this.verifyUserDeviceRegistered(token, deviceToken)
        .then(result => {
            //console.log("Result: ", result)
            if (result.status === 1) {
                console.log('The device is already registered');
            } else if (result.status === 2) {
                this.registerDeviceForFlashNotifications(token, deviceToken)
                .then(resultRegister => {
                    if (resultRegister.status === 1) {
                        // alert('Device registered for push notifications with success!');
                        console.log(resultRegister.message);
                    } else {
                        console.log('There was a problem registering the device', resultRegister.message);
                    }
                })
                .catch(error => {
                    console.log('Error on register: ', error);
                });
            }
        })
        .catch(error => {
            console.log('Error: ', error);
        });
    }

};
