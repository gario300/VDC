import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import ApiServicesHelper from './../Utils/ApiServicesHelper/api_services_helper';

export default class AddressPresenter {
    constructor() {}
    
    newAddress(form, uid){
        return new Promise(async(resolve, reject) => {
            const dictionary = WebApiServicesDictionary.dictionary.address.newAddress
            const token = await ApiServicesHelper.tokenFromSession
            
            for (const key in form) {
                if (form[key] == '') {
                    reject('Tous les champs sont requis')
                    return
                }
            }
            const formSend = new FormData();
            formSend.append('pays', form.pays)
            formSend.append('ville', form.ville)
            formSend.append('adresse', form.adresse)
            formSend.append('code_postal', form.cp)
            formSend.append('description', form.description)
            formSend.append('uid', uid)
        
            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                formSend,
                null
            )

            if (request.status == 1) {
                resolve(true)     
            } else {
                reject('server error')
            }
        })
    }

    getAddress(){
        return new Promise(async(resolve, reject) => {
            const dictionary = WebApiServicesDictionary.dictionary.address.addressList
            const token = await ApiServicesHelper.tokenFromSession

            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token
            )

            if (request.status == 1) {
                resolve(request.result) 
            } else {
                reject('Network Err')
            }
        })
    }

    parseAddress(objArray){
        const newArr = objArray.map((obj) => {
            return {
                id: obj.id,
                pays: obj.pays,
                code_postal: obj.code_postal,
                ville: obj.ville,
                address: obj.adresse,
            }
        })

        return newArr
    }
}
