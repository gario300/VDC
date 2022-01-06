
import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import ApiServicesHelper from './../Utils/ApiServicesHelper/api_services_helper';
import dateTime from './../DateTime/date_time'
import DateTime from './../DateTime/date_time';

export default class Cat {
    constructor(){ }

    getMainCategories(){
        return new Promise(async(resolve, reject) => {
            const dictionary = WebApiServicesDictionary.dictionary.categories.mainCat
            const token = await ApiServicesHelper.tokenFromSession

            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null,
                null
            )
        
            if(request.status == 1){
                resolve(request.result)
            } else {
                reject('Network Err')
            }

        })
    }

    getCategories(){
        return new Promise(async(resolve, reject) => {
            const dictionary = WebApiServicesDictionary.dictionary.categories.cats
            const token = await ApiServicesHelper.tokenFromSession

            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null,
                null
            )

            if(request.status == 1){
                resolve(request.result)
            } else {
                reject('Network Err')
            }

        })
    }

    getSubCategorysById(id){
        return new Promise(async(resolve, reject) => {
            const dictionary = WebApiServicesDictionary.dictionary.categories.getSubCategorysById
            const token = await ApiServicesHelper.tokenFromSession

            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null,
                id
            )

            if(request.status == 1){
                resolve(request.result)
            }else{
                reject('Network Err')
            }
        }) 
    }

    getMarques(){
        return new Promise(async(resolve, reject) => {
            const dictionary = WebApiServicesDictionary.dictionary.categories.marques
            const token = await ApiServicesHelper.tokenFromSession
            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null,
                null
            )
           
            if(request.status == 1){
                resolve(request.result)
            } else {
                reject('Network Err')
            }
            
        })
    }

    getTailles(){
        return new Promise(async(resolve, reject) => {
            const dictionary = WebApiServicesDictionary.dictionary.categories.sizes
            const token = await ApiServicesHelper.tokenFromSession
            
            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null,
                null
            )

            if(request.status == 1){
                resolve(request.result)
            } else {
                reject('Network Err')
            }
            
        })
    }

    getCoileurs(){
        return new Promise(async(resolve, reject) => {
            const dictionary = WebApiServicesDictionary.dictionary.categories.coileurs
            const token = await ApiServicesHelper.tokenFromSession

            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null,
                null
            )

            if(request.status == 1){
                resolve(request.result)
            } else {
                reject('Network Err')
            }
            
        })
    }

    getAuth(){
        return new Promise(async(resolve, reject) => {
            const dictionary = WebApiServicesDictionary.dictionary.categories.authenticite
            const token = await ApiServicesHelper.tokenFromSession

            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null,
                null
            )

            if(request.status == 1){
                resolve(request.result)
            } else {
                reject('Network Err')
            }
            
        })
    }

    getEtat(){
        return new Promise(async(resolve, reject) => {
            const dictionary = WebApiServicesDictionary.dictionary.categories.etat
            const token = await ApiServicesHelper.tokenFromSession

            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null,
                null
            )

            if(request.status == 1){
                resolve(request.result)
            } else {
                reject('Network Err')
            }
            
        })
    }

    parseCategorysFilters(objArray, sty){
        const newArr =  objArray.map((item) => {
            return {
                name: [
                    { title: item.value, style: sty }
                ],
                id: item.id,
                image:  'https://img.icons8.com/ios/452/apple-phone.png' 

            }
        })
        return newArr
    } 

    parseSubCategorysFilter(objArray, sty){
        const newArr = objArray.map((item) => {
            return {
                name: [
                    { title: item.value, style: sty }
                ],
                id: item.id
            }
        })
        
        return newArr
    }

    parseCategorys(objArray){
        const newArr = objArray.map((item) => {
            return {
                title: item.value,
                id: item.id
            }
        })
        return newArr
    }
}
