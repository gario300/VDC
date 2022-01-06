import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import ApiServicesHelper from './../Utils/ApiServicesHelper/api_services_helper';

export default class ContactPresenter {
    constructor() {}

    getContactsFromServer() {
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.contacts.getPublicContacts,
            ApiServicesHelper.tokenFromSession,
            null,
            null,
        );
    }
}