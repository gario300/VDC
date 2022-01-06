import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import ApiServicesHelper from './../Utils/ApiServicesHelper/api_services_helper';

export default class FavouritesPresenter {
    
    constructor() { }

    getProducersLiked() {
        return ApiServicesHelper.getTokenFromSession()
        .then(data => {
            return this.getProducersLikedFromServer(data);
        });
    }

    getProducersLikedFromServer(data) {
        const token = data.token;
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.userClient.getProducersLiked,
            token,
            null,
            false
        )
    }

    updateLikeProducer(producerId, action) {
        return ApiServicesHelper.getTokenFromSession()
        .then(data => {
            return this.updateLikeProducerFromServer(data, producerId, action);
        });
    }

    updateLikeProducerFromServer(data, producerId, action) {

        let formData = new FormData();
        formData.append("producerId", producerId);
        formData.append("action", action);
        
        const token = data.token;
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.userClient.updateProducerLiked,
            token,
            formData,
            false
        )
    }

    parseItems(producersList) {
        if (producersList.length <= 0) return [];
        return producersList.filter(obj => obj.isFavorite)
    }

    /*
    getSentNotificationsFromServer(data) {
        const token = data.token;

        const webApiServicesPresenter = new WebApiServicesPresenter();
        const serviceCall = WebApiServicesDictionary.dictionary.getSentNotifications.service;

        return webApiServicesPresenter.doGETWebApiConnection(serviceCall, token, "");   
    }

    getNotificationDetailed(id) {
        return ApiServicesHelper.getTokenFromSession()
        .then(data => {
            return this.getNotificationDetailedFromServer(data, id);
        });
    }

    getNotificationDetailedFromServer(data, id) {
        const token = data.token;

        const webApiServicesPresenter = new WebApiServicesPresenter();
        const serviceCall = WebApiServicesDictionary.dictionary.getNotificationDetailed.service + "/" + id;

        return webApiServicesPresenter.doGETWebApiConnection(serviceCall, token, "");   
    }

    setLoggedIn(isLoggedIn) {
        FlashPresenter.manager.isLoggedIn = isLoggedIn;
    }

    setManagerData(list) {
        FlashPresenter.manager.setData(list);
    }

    parseServerResults(results) {
        const apiConfig = new WebApiConfig();
        let resultsList = results.map((item) => {
            const date = this.getDateFromItem(item["dateSent"])
            return {
                "key": item.id,
                "title": item.title,
                "link": item.link,
                //"author": item.author,
                "author": item.short,
                "id": item.id,
                "date": date,
                "seen": true
            };
        })

        if (resultsList.length <= 0) {
            FlashPresenter.manager.data = [];
            FlashPresenter.manager.hasData = false;
            return [];
        }

        FlashPresenter.manager.setData(resultsList);

        return resultsList;
    }

    parseResult(item) {
        const apiConfig = new WebApiConfig();

        const date = this.getDateFromItem(item["dateSent"])
        //const images = item.images;
        
        const images = item.images.map(value => {
            return apiConfig.AssetsFlashAddress + value
        });
        
        return {
            "key": item.id,
            "title": item.title,
            "body": item.body,
            "short": item.short,
            "id": item.id,
            "date": date,
            "image": images[0],
            "seen": true
        };
    }
    
    getDateFromItem(dateSent) {
        try {
            
            const date = this.dateTime.newDate(dateSent.split(" ")[0]);
            return date.getDate() + " " + Localization.getMonth(date.getMonth()) + " " + date.getFullYear();
            
        } catch (error) {
            return " - ";
        }
    }

    getItemSelected(id) {
        let itemsFound = FlashPresenter.manager.data.filter((item, index) => {
            if (item.id === id) {
                return item;
            }
        })

        if (itemsFound.length > 0) {
            return itemsFound[0];
        }

        return null;
    }

    isDataAlreadyLoaded(isLoggedIn) {
        return FlashPresenter.manager.isLoggedIn === isLoggedIn && FlashPresenter.manager.hasData;
    }

    isDataAlreadyLoadedFromMenu() {
        return FlashPresenter.manager.data.length > 0;
    }

    getDataLoaded() {
        return FlashPresenter.manager.data;
    }
    */
};
