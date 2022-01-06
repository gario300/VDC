import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import ApiServicesHelper from './../Utils/ApiServicesHelper/api_services_helper';

export default class SubscriptionPresenter {
    constructor() {}

    getSubscriptions() {
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.subscriptions.getSubscriptions,
            ApiServicesHelper.tokenFromSession,
            null,
            null,
        );
    }

    getSentSubscriptions() {
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.subscriptions.getSentSubscriptions,
            ApiServicesHelper.tokenFromSession,
            null,
            null,
        );
    }

    getMemosFromSubscriptions() {
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.subscriptions.getMemosFromSubscriptions,
            ApiServicesHelper.tokenFromSession,
            null,
            null,
        );
    }

    sendSubscriptionRequest(userId) {
        const apiConnection = new WebApiConnectionPresenter();
        let formData = new FormData();
        formData.append('request', userId);

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.subscriptions.newRequest,
            ApiServicesHelper.tokenFromSession,
            formData,
            null,
        );
    }
    
    acceptSubscriptionRequest(userId) {
        const apiConnection = new WebApiConnectionPresenter();
        let formData = new FormData();
        formData.append('request', userId);

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.subscriptions.acceptRequest,
            ApiServicesHelper.tokenFromSession,
            formData,
            null,
        );
    }

    refuseSubscriptionRequest(userId) {
        const apiConnection = new WebApiConnectionPresenter();
        let formData = new FormData();
        formData.append('request', userId);

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.subscriptions.refuseRequest,
            ApiServicesHelper.tokenFromSession,
            formData,
            null,
        );
    }

    unSubscribe(userId) {
        const apiConnection = new WebApiConnectionPresenter();
        let formData = new FormData();
        formData.append('subscription', userId);

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.subscriptions.unSubscribe,
            ApiServicesHelper.tokenFromSession,
            formData,
            null,
        );
    }
}