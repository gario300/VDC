import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import ApiServicesHelper from './../Utils/ApiServicesHelper/api_services_helper';


class Vendre {
    constructor(){}
        
    newVendre(form, cats, photos ){
        return new Promise(async (resolve, reject) => {   

            if (photos.length == 0) {
               reject('Veuillez saisir un photo')
                return
            }

            if (form.title == '') {
                reject('Veuillez saisir un titre')
                return
            }      

            if (form.description == '') {
                reject('Veuillez saisir un description')
                return
            }
            
            for (let key in cats) {
                if (cats[key].length == 0) {
                    reject(`Veuillez saisir un ${key}`)
                    return
                }
            }
            
            if (form.price == '') {
                reject('Veuillez saisir un prix')
                return
            }

            const categorys = JSON.stringify(cats.categories.map((item) => {
                return item.id
            }))
            const marques = JSON.stringify(cats.marques.map((item) => {
                return item.id
            }))

            const autenticites = JSON.stringify(cats.authenticite.map((item) => {
                return item.id
            }))

            const etats = JSON.stringify(cats.etat.map((item) => {
                return item.id
            }))

            const coleurs = JSON.stringify(cats.coileur.map((item) => {  
                return item.id
            }))

            const tailes = JSON.stringify(cats.tailes.map((item) => {
                return item.id
            }))
            
            const date = new Date()

            let formSend = new FormData()
            formSend.append('titre', form.title)
            formSend.append('description', form.description)
            formSend.append('prix', form.price)
            formSend.append('pour', form.pour)
            formSend.append('subcategorie', categorys)
            formSend.append('authenticite', autenticites)
            formSend.append('etat', etats)
            formSend.append('couleur', coleurs)
            formSend.append('taille', tailes)
            formSend.append('marque', marques)
            formSend.append('created', date.toISOString())
            if (photos.length > 0) {
                formSend.append('articleImage', JSON.stringify(photos))
                formSend = ApiServicesHelper.setImages(photos, formSend);
            }
            const dictionary = WebApiServicesDictionary.dictionary.vendre.add
            const token = await ApiServicesHelper.tokenFromSession

            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                formSend,
                null
            )

            if(request.status == 1){
                resolve(request.result)
            } else {
                reject('Network Err')
            }

        })
    }
        
    updateVendre(form, cats, photos, id ){
        return new Promise(async (resolve, reject) => {   

            if (photos.length == 0) {
               reject('Veuillez saisir un photo')
                return
            }

            if (form.title == '') {
                reject('Veuillez saisir un titre')
                return
            }      

            if (form.description == '') {
                reject('Veuillez saisir un description')
                return
            }
            
            for (let key in cats) {
                if (cats[key].length == 0) {
                    reject(`Veuillez saisir un ${key}`)
                    return
                }
            }
            
            if (form.price == '') {
                reject('Veuillez saisir un prix')
                return
            }

            const categorys = JSON.stringify(cats.categories.map((item) => {
                return item.id
            }))
            const marques = JSON.stringify(cats.marques.map((item) => {
                return item.id
            }))

            const autenticites = JSON.stringify(cats.authenticite.map((item) => {
                return item.id
            }))

            const etats = JSON.stringify(cats.etat.map((item) => {
                return item.id
            }))

            const coleurs = JSON.stringify(cats.coileur.map((item) => {  
                return item.id
            }))

            const tailes = JSON.stringify(cats.tailes.map((item) => {
                return item.id
            }))
            
            const date = new Date()

            let formSend = new FormData()
            formSend.append('titre', form.title)
            formSend.append('description', form.description)
            formSend.append('prix', form.price)
            formSend.append('pour', form.pour)
            formSend.append('subcategorie', categorys)
            formSend.append('authenticite', autenticites)
            formSend.append('etat', etats)
            formSend.append('couleur', coleurs)
            formSend.append('taille', tailes)
            formSend.append('marque', marques)
            formSend.append('created', date.toISOString())
            if (photos.length > 0) {
                formSend.append('articleImage', JSON.stringify(photos))
                formSend = ApiServicesHelper.setImages(photos, formSend);
            }
            const dictionary = WebApiServicesDictionary.dictionary.vendre.update
            const token = await ApiServicesHelper.tokenFromSession

            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                formSend,
                id
            )

            if(request.status == 1){
                resolve(request.result)
            } else {
                reject('Network Err')
            }

        })
    }
}

export default Vendre
