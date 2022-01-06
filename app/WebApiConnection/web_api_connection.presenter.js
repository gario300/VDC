import WebApiConfig from './web_api_connection.config';
import WebApiHeaders from './web_api_headers';
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';

export default class WebApiConnectionPresenter {
    
    constructor() {  
        this.apiConfig = new WebApiConfig();
    }

    getCallOptions = (dict, token, formData) => {
        if (dict.method === WebApiServicesDictionary.methods.GET) {
            if (dict.token) {
                return {
                    "method": dict.method,
                    "headers": WebApiHeaders.tokenHeader(token)
                }
            } else {
                return {
                    "method": dict.method
                }
            }
        }

        const headers = dict.token
        ? WebApiHeaders.tokenHeader(token) 
        : WebApiHeaders.postHeaders;

        return {
            "method": dict.method,
            "headers": headers,
            "body": formData
        }
    }

    networkError = () => {
        return {"status": 0, "message": "The request is not correct or there are Network connection issues"}
    }

    notFoundError = () => {
        return {"status": 404, "message": "404\nNot Found"}
    }

    serverError = (msg) => {
        return {"status": 500, "message": msg}
    }

    callApiService = async (service, token, formData, urlParams) => {
        const url = this.getApiURLWithServiceNameAndParams(service.service, urlParams);                
        const fetchOptions = this.getCallOptions(service, token, formData);
        console.log("API CALL: ", url)
        //console.log("API OPTIONS: ", fetchOptions)
        const apiCall = await fetch( url, fetchOptions )
        if (apiCall.ok) {
            try {
                const result = await apiCall.json()
                return Promise.resolve(result)
            } catch(error) {
                console.log('Error Parse: ', error);
                return Promise.reject(this.networkError());
            }
        } else {
            if (typeof apiCall.status === "undefined") {
                console.log("Api Call NOT OK undefined")
                return Promise.reject(this.networkError())
            } else if (apiCall.status === 404) {
                console.log("Api Call NOT OK 404")
                return Promise.reject(this.notFoundError())
            } else if (apiCall.status === 500) {
                //const result = await apiCall.json()
                return Promise.reject(this.serverError("Server Error !"))
            } else {
                console.log("Api Call NOT OK unkown")
                return Promise.reject(this.networkError())
            }
        }
    }

    callApiServiceDebug = async (service, token, formData, urlParams) => {
        const url = this.getApiURLWithServiceNameAndParams(service.service, urlParams);                
        const fetchOptions = this.getCallOptions(service, token, formData);
        console.log("API CALLss: ", url)
        const apiCall = await fetch( url, fetchOptions )

        if (apiCall.ok) {
            try {
                const result = await apiCall.text()
                console.log("Reesults: ", result);
                return Promise.resolve(result)
            } catch(error) {
                console.log('Error Parse: ', error);
                return Promise.reject(this.networkError());
            }
        } else {
            if (typeof apiCall.status === "undefined") {
                return Promise.reject(this.networkError())
            }
            
            console.log("Sttatus: ", apiCall.status)
            if (apiCall.status === 404) {
                console.log("Api Call NOT OK 404")
                return Promise.reject(this.notFoundError())
            } else if (apiCall.status === 500) {
                console.log("Api Call 500")
                const result = await apiCall.json()
                console.log("Api Call NOT OK unkown", result)
                return Promise.reject(this.serverError(result.error_description))
            } else {
                const result = await apiCall.text()
                console.log("Api Call NOT OK unkown", result)
                return Promise.reject(this.networkError())
            }
        }
    }

    doPostActionNoToken = (serviceName, formData) => {
        const url = this.getApiURLWithServiceName(serviceName);                
        return fetch(url, {
            method: 'POST',
            headers: WebApiHeaders.postHeaders,
            body: formData
        })
        .then((response) => response.json() );
    }

    doPostActionWithToken = (serviceName, formData, token) => {
        const url = this.getApiURLWithServiceName(serviceName);                
        return fetch(url, {
            method: 'POST',
            headers: WebApiHeaders.tokenHeader(token),
            body: formData
        })
        .then((response) => response.json());
    }

    doGetAction = (serviceName, token, params) => {
        const url = this.getApiURLWithServiceNameAndParams(serviceName, params);   
        return fetch(url, {
            method: 'GET',
            headers: WebApiHeaders.tokenHeader(token)
        })
        .then((response) => response.json());
    }

    doGet = (serviceName, token) => {
        const url = this.getApiURLWithServiceName(serviceName);   
        return fetch(url, {
            method: 'GET',
            headers: WebApiHeaders.tokenHeader(token)
        })
        .then((response) => response.json());
    }

    doGetWithoutToken = (serviceName, params) => {
        let url = this.getApiURLWithServiceName(serviceName);   
        if (params) {
            url = this.getApiURLWithServiceNameAndParams(serviceName, params);
        }
        return fetch(url, {
            method: 'GET'
        })
        .then((response) => response.json());
    }

    getApiURLWithServiceName(serviceName) {
        return this.apiConfig.ApiAddress + '/' + serviceName + '/'; 
    }

    getServerApiURLWithServiceName(serviceName) {
        return this.apiConfig.APIServerAddress + '?action=' + serviceName; 
    }

    getApiURLWithServiceNameAndParams(serviceName, params) {
        if (!params || params === "" || params.length === 0) 
            return this.apiConfig.ApiAddress + '/' + serviceName; 

        const paramsList = params.split("?");
        if (paramsList.length > 1) {
            return this.apiConfig.ApiAddress + '/' + serviceName + '?' + paramsList[1]; 
        }
        const paramsListS = params.split("&");
        if (paramsListS.length > 1) {
            return this.apiConfig.ApiAddress + '/' + serviceName + '?' + params;
        }

        return this.apiConfig.ApiAddress + '/' + serviceName + '/' + params; 
    }

}
