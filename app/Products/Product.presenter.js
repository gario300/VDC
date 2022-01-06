import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import ApiServicesHelper from './../Utils/ApiServicesHelper/api_services_helper';
import DateTime from '../DateTime/date_time'
class ProductsPresenter {
    constructor() { }
    
    getMyProducts(){
        return new Promise( async( resolve, reject ) => {
            const dictionary = WebApiServicesDictionary.dictionary.products.list
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

    getAllProducts(){
        return new Promise(async(resolve, reject) => {
            const dictionary = WebApiServicesDictionary.dictionary.vendre.filters
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


    getDetails(id){
        return new Promise ( async( resolve, reject ) => {
            const dictionary = WebApiServicesDictionary.dictionary.products.detail
            const token = await ApiServicesHelper.tokenFromSession
            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null,
                id
            )
            
            if(request.status == 1){
                resolve(request.result)
            } else {
                reject('Network Err')
            }
        })
    }

    getRelatedProducts(){
        return new Promise( async ( resolve, reject ) => {
            const dictionary = WebApiServicesDictionary.dictionary.products.related
            const token = await ApiServicesHelper.tokenFromSession()
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

    getTitleLong(objArray){
        if(objArray.length == 1 ){
            return `${objArray[0].size}`
        } 

        if(objArray.length > 1){
            return `${objArray[0].size} et ${objArray.length - 1} encore de`
        }

        return ''
    }

    parseForScreen(objArray){
        const newArr = objArray.map((item) => {
            return {
                title:  item.titre,
                price: item.prix,
                id: item.id,
                taille: this.getTitleLong(item.taille),
                articleImage: item.articleImage.length == 0 ? 'https://www.emsevilla.es/wp-content/uploads/2020/10/no-image-1.png' : 
                item.articleImage[0]
            }
        }) 
        return newArr
    }

    parseForMyItems(objArray){
        const newArr = objArray.map((item) => {
            return {
                title:  item.titre,
                price: item.prix,
                id: item.id,
                taille: item.taille.value,
                articleImage: item.articleImage.length == 0 ? 'https://www.emsevilla.es/wp-content/uploads/2020/10/no-image-1.png' : 
                item.articleImage[0],
                status: 'termine',
            }
        }) 
        return newArr
    }

    parseForDetails(obj){
        const d = new DateTime();
        const dateObj = d.newDate(obj.created)
        return {
            id: obj.id,
            ownerId: obj.owner.id,
            images: obj.articleImage.map((item, index) => {
                return {
                    key: index,
                    url: item,
                    updated: false
                }
            }),
            resume: {
                title: obj.titre,
                size: '',
                price: obj.prix,
                description: obj.description
            },
            categorie: obj.subcategorie?.map((item) =>{
                return item.value
            }),
            sizes: obj.taille.map((item) => {
                return item.size
            }),
            etat: obj.etat.map((item) => {
                return item.value
            }),
            color: obj.couleur.map((item) => {
                return item.color
            }),
            date: d.dateFormatted(dateObj),
            author: obj.owner.name+' '+obj.owner.lastName,
        }
    }

    parseForUpdate(obj){
        const d = new DateTime();
        const dateObj = d.newDate(obj.created)
        return {
            id: obj.id,
            ownerId: obj.owner.id,
            images: obj.articleImage.map((item, index) => {
                 return {
                    file: item,
                    fileID: obj.id,
                    active: true,
                    updated: false,
                    fileSaved:'',
                    title: ''
                } 
            }),
            resume: {
                title: obj.titre,
                size: '',
                price: obj.prix,
                description: obj.description,
                pour: obj.pour
            },
            categories: obj.subcategorie?.map((item) => {
                return {
                    title: item.value,
                    id: item.id,
                    selected: true
                }
            }),
            sizes: obj.taille.map((item) => {
                return {
                    title: item.value,
                    id: item.id,
                    selected: true
                }
            }),
            etat: obj.etat.map((item) => {
                return {
                    title: item.value,
                    id: item.id,
                    selected: true
                }
            }),
            color: obj.couleur.map((item) => {
                return {
                    title: item.value,
                    id: item.id,
                    selected: true
                }
            }),
            authenticite: obj.authenticite.map((item) => {
                return{
                    title: item.value,
                    id: item.id,
                    selected: true
                }
            }),
            marques: obj.marque.map((item) => {
                return {
                    title: item.value,
                    id: item.id,
                    selected: true
                }
            }),
            date: d.dateFormatted(dateObj),
            author: obj.owner.name+' '+obj.owner.lastName,
        }
    }

    filterElements(params){
        return new Promise( async( resolve, reject ) => {
            let route = ''
            
            for (const key in params) {
                if (params[key].length > 0 && key !== 'pour') {
                    let newArr = []
                    params[key].map((item) => {
                       newArr.push(item.id)
                    })
                    route = route+`${key}=${JSON.stringify(newArr)}`     
                } 
            }
            if(route !== '') {
                route = '?'+route
            } 

            const dictionary = WebApiServicesDictionary.dictionary.vendre.filters
            const token = await ApiServicesHelper.tokenFromSession
            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null,
                route
            )

            
            if(request.status == 1){
                const newArr = []
                if(params.pour.length !== 0){
                    request.result.map((item) => {
                        if(pour.length == 2) {
                            newArr.push(item)
                        } 
                        const find = params.pour.find(element => element.title == item.pour)
                        if(find !== undefined){
                            return item
                        }
                    })
                }

                resolve(newArr.length > 0 ? newArr : request.result)
            } else {
                reject('Network Err')
            }
        })
    }
}

export default ProductsPresenter
