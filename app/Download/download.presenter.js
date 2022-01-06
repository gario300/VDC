import WebApiServicesDictionary from '../WebApiServices/web_api_services_dict';
import WebApiConnectionPresenter from '../WebApiConnection/web_api_connection.presenter';
import ApiServicesHelper from '../Utils/ApiServicesHelper/api_services_helper';


export default class DownloadPresenter {

    constructor() { }

    newDownloadEvent(id, type, os) {
        const apiConection = new WebApiConnectionPresenter();

        let formData = new FormData();
        formData.append('type', type);
        formData.append('id', id);
        formData.append('os', os);

        apiConection.callApiServiceDebug(
            WebApiServicesDictionary.dictionary.log.newEvent,
            ApiServicesHelper.tokenFromSession,
            formData,
            false
        )
        .then(result => {
            if (result.status === 1) {
                console.log("New Log Success !")
            }
        })
        .catch(err => {
            console.log("New Log Error: ", err)
        })
    }
}