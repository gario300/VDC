import WebApiServicesDictionary from './web_api_services_dict';
import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';

export default class WebApiServicesPresenter {

    constructor() { }
    
    executeRegisterService(body) {
        return this.doWebServerApiConnection(WebApiServicesDictionary.dictionary.register.service, body)
        .then((result) => {
            if (result.status === 1) {
                return result;
            } else {
                return Promise.reject(result);                
            }
        });
    }

    executeApiServiceGetWithToken(service, token, params) {
        return this.doGETWebApiConnection(service, token, params)
        .then((result) => {

            const resultObj = {};
            resultObj['status'] = result.status;
            if (typeof result.data !== "undefined") {
                resultObj['data'] = result.data;
            }
            if (typeof result.result !== "undefined") {
                resultObj['result'] = result.result;
            }
            if (typeof result.user !== "undefined") {
                resultObj['user'] = result.user;
            }
            if (typeof result.message !== "undefined") {
                resultObj['message'] = result.message;
            }
            return resultObj;
        });
    }

    executeApiServiceWithToken(service, token, formData) {
        return this.doWebApiWithTokenConnection(service, formData, token)
        .then((result) => {
            if (result.status === 1 || result.status === 5) {
                return result;
            } else {
                return Promise.reject(result);                
            }
        });
    }

    executeServerApiService(service, body) {
        return this.doWebServerApiConnection(service, body)
        .then((result) => {
            if (result.status === 1) {
                return result;
            } else {
                return Promise.reject(result);                
            }
        });
    }

    executeApiService(service, body) {
        return this.doWebApiConnection(service, body)
        .then((result) => {
            if (result.status === 1) {
                return result;
            } else {
                return Promise.reject(result);                
            }
        });
    }

    executeRecoveryPasswordService(email) {
        return this.doGETNoTokenWebApiConnection(WebApiServicesDictionary.dictionary.passwordrecovery.service + email)
        .then((result) => {
            if (result.status === 1) {
                return result;
            } else {
                return Promise.reject(result);                
            }
        });
    }

    executeGetDataService(service) {
        return this.doGETNoTokenWebApiConnection(service, []);
    }

    // Web API Methods
    doWebApiConnection(service, body) {
        const webApiPresenter = new WebApiConnectionPresenter();
        return webApiPresenter
        .doPostAction(service, body)
        .catch((error) => {
            try {
                console.log("Error Connection:    ", error);
                var msg = error !== undefined ? error.text() : 'Unknown Error';
                return Promise.reject({status: -1, message: msg});
            } catch(error) {
                console.log('Error Parse: ', error);
                return Promise.reject({status: -1, message: 'Server Error'});
            }
        });
    }

    doWebServerApiConnection(service, body) {
        const webApiPresenter = new WebApiConnectionPresenter();
        return webApiPresenter
        .doPostServerAction(service, body)
        .catch((error) => {
            try {
                console.log("Error:    ", error);
                var msg = error !== undefined ? error.text() : 'Unknown Error';
                return Promise.reject({status: -1, message: msg});
            } catch(error) {
                console.log('Error Parse: ', error);
                return Promise.reject({status: -1, message: 'Server Error'});
            }
        });
    }

    doWebApiWithTokenConnection(service, formData, token) {
        const webApiPresenter = new WebApiConnectionPresenter();
        return webApiPresenter
        .doPostActionWithToken(service, formData, token)
        .catch((error) => {
            try {
                var msg = error !== undefined ? error.text() : 'Unknown Error';
                return Promise.reject({status: -1, message: msg});
            } catch(error) {
                console.log('Error Parse: ', error);
                return Promise.reject({status: -1, message: 'Server Error'});
            }
        });
    }

    doGETWebApiConnection(service, token, params) {
        const webApiPresenter = new WebApiConnectionPresenter();
        return webApiPresenter
        .doGetAction(service, token, params)
        .catch((error) => {
            console.log("Texxt", error)
            try {
                var msg = error !== undefined ? error.text() : 'Unknown Error';
                return Promise.reject({status: -1, message: msg});
            } catch(error) {
                console.log('Error Parse: ', error);
                return Promise.reject({status: -1, message: 'Server Error'});
            }
        });
    }

    doGETNoTokenWebApiConnection(service, params) {
        const webApiPresenter = new WebApiConnectionPresenter();
        return webApiPresenter
        .doGetWithoutToken(service, params);
    }

    doGETWebApi(service, token) {
        const webApiPresenter = new WebApiConnectionPresenter();
        return webApiPresenter
        .doGet(service, token)
        .catch((error) => {
            console.log('Error: ', error);
            try {
                var msg = error !== undefined ? error.text() : 'Unknown Error';
                return Promise.reject({status: -1, message: msg});
            } catch(error) {
                console.log('Error Parse: ', error);
                return Promise.reject({status: -1, message: 'Server Error'});
            }
        });
    }
}