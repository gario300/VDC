import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import ApiServicesHelper from './../Utils/ApiServicesHelper/api_services_helper';
import DateTime from '../DateTime/date_time'

export default class OrderPresenter{
    constructor() {}

    newOrder(form, id){
        return new Promise( async( resolve, reject ) => {
            const dictionary = WebApiServicesDictionary.dictionary.order.newOrder
            const token = await ApiServicesHelper.tokenFromSession 

            const produits = [ id ]
            const formSend = new FormData();
            formSend.append('produit', JSON.stringify(produits))
            formSend.append('adresseFacturation', form.addressId)
            
            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                formSend,
                null
            )

            if (request.status == 1) {
                resolve(request.result.id)
            } else {
                reject('Network Error')
            }
        })
    }

    getList(){
        return new Promise( async(resolve, reject) => {
            const dictionary = WebApiServicesDictionary.dictionary.order.listOrder
            const token = await ApiServicesHelper.tokenFromSession

            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token
            )

            if (request.status == 1) {
                resolve(request.result)
            } else {
                reject('Network Error')
            }
        })
    }

    detailOrder(id){
        return new Promise ( async( resolve, reject ) => {
            const dictionary = WebApiServicesDictionary.dictionary.order.detailOrder
            const token = await ApiServicesHelper.tokenFromSession
            
            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null,
                id
            )

            if (request.status == 1) {
                resolve(request.result)
            } else {
                reject('Network Error')
            }
        })
    }


    parsePurchaseDetail(obj, userId){
        const d = new DateTime();
        const dateObj = d.newDate(obj.produit[0].created)
        return {
            productOwnerId: 0,
            ownerOrder: obj.owner.id,
            slides: obj.produit[0].articleImage.map((item, index) => {
                return {
                    key: index,
                    url: item
                }
            }),
            description: obj.produit[0].description,
            title: obj.produit[0].titre,
            tailleAndEtat: obj.produit[0].taille[0]?.value +' - '+obj.produit[0].etat[0]?.value,
            prix: obj.produit[0].prix,
            id: obj.id,
            created: d.dateFormattedMin(dateObj),
            status: obj.statusOrder,
            ownerType: obj.owner.id == userId ? 'client' : 'vendeur',
            clientVideo: obj.videoClient.map((item) => {
                return {
                    file: item,
                    updated: false,
                }
            }),
            videoVendeur: obj.videoVendeur.map((item) => {
                return {
                    file: item,
                    updated: false
                }
            }),
            product:{
                categorie: obj.produit[0].subcategorie[0]?.value,
                taille: obj.produit[0].taille[0]?.value,
                etat: obj.produit[0].etat[0]?.value,
                color: obj.produit[0].couleur[0]?.color,
                owner: obj.produit[0].owner[0].name+' '+obj.produit[0].owner[0].lastName
            }
        }
    }

    parseOrderList(objArray){
        const d = new DateTime();
        const newArr = objArray.map((item) => {
            const dateObj = d.newDate(item.produit[0].created)
            return {
                id: item.id,
                articleImage: item.produit[0].articleImage['0'],
                status: item.statusOrder,
                created: d.dateFormatted(dateObj),
                title: item.produit[0].titre,
                price: item.produit[0].prix,
                taille: item.produit[0].taille[0]?.value
            }
        })

        return newArr
    }

    newLitige(comments, raisons, photos, orderId){
        return new Promise( async( resolve, reject ) => {
            const dictionary = WebApiServicesDictionary.dictionary.litige.newLitige
            const token = await ApiServicesHelper.tokenFromSession
            let formSend = new FormData()
            formSend.append('commentaires', comments)
            formSend.append('vendeur', orderId)
            formSend.append('raison', JSON.stringify(raisons))
            if (photos.length > 0) {
               formSend.append('photosLitige', JSON.stringify(photos))
               formSend = ApiServicesHelper.setImages(photos, formSend);
            }

            const request = await new WebApiConnectionPresenter().callApiServiceDebug(
                dictionary,
                token,
                formSend,
                null
            )

            if (request.status == 1) {
                resolve('Litige expédié')   
            } else {
                reject('Network Error')
            }
        })
    }

    endOrder(id, video){
       return new Promise ( async( resolve, reject ) => {
            if (video.length == 0) {
                reject('il nécessaire de joindre une vidéo')
                return
            }

            const dictionary = WebApiServicesDictionary.dictionary.order.endOrder
            const token = await ApiServicesHelper.tokenFromSession
            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null,
                id
            )

            if (request.status == 1) {
                resolve('Litige expédié')   
            } else {
                reject('Network Error')
            }
       })
    }

    rejectOrder(id){
       return new Promise ( async( resolve, reject ) => {

            const dictionary = WebApiServicesDictionary.dictionary.order.rejectOrder
            const token = await ApiServicesHelper.tokenFromSession
            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null,
                id
            )

            if (request.status == 1) {
                resolve('Litige expédié')   
            } else {
                reject('Network Error')
            }
       })
    }
    sendClientVideo(orderId, video){
        return new Promise( async( resolve, reject ) => {
            const dictionary = WebApiServicesDictionary.dictionary.order.clientVideo
            const token = await ApiServicesHelper.tokenFromSession
            if (video.length == 0) {
                reject('il est nécessaire de joindre une vidéo')
                return
            }

            let formSend = new FormData()
            formSend.append('videoClient', JSON.stringify(video))
            formSend = ApiServicesHelper.setImages(video, formSend);

            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                formSend,
                orderId
            )

            if (request.status == 1) {
                resolve('video expédié')   
            } else {
                reject('Network Error')
            }
        })
    }


    sendCustomerVideo(orderId, video){
        return new Promise( async( resolve, reject ) => {
            const dictionary = WebApiServicesDictionary.dictionary.order.customerVideo
            const token = await ApiServicesHelper.tokenFromSession
            if (video.length == 0) {
                reject('il est nécessaire de joindre une vidéo')
                return
            }

            let formSend = new FormData()
            formSend.append('videoVendeur', JSON.stringify(video))
            formSend = ApiServicesHelper.setImages(video, formSend);
            console.log(formSend, 'here')
            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                formSend,
                orderId
            )

            if (request.status == 1) {
                resolve('video expédié')   
            } else {
                reject('Network Error')
            }
        })
    }
}
