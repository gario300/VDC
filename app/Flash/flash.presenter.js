
import Localization from './../Localization/localization'
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import ApiServicesHelper from './../Utils/ApiServicesHelper/api_services_helper';
import DateTime from './../DateTime/date_time';
import { typesSeance } from '../Constants/constants.index'
import faker from 'faker'

export default class FlashPresenter {
    
    constructor() { 
        this.dateTime = new DateTime();
    }

    static manager = {
        data: [],
        hasData: false,
        isLoggedIn: false,
        setData: (objs) => {
            FlashPresenter.manager.data = objs;
            FlashPresenter.manager.hasData = true;
        }
    }

    getSentNotificationsFake() {
        return new Promise(resolve => {
            const data = [0, 1, 2, 3].map(obj => {
                const date = faker.date.past();
                const newDate = this.dateTime.dateFormattedFormal( this.dateTime.newDate(date) );
                const name = faker.name.firstName(0);
                const lastName = faker.name.lastName(0);
                return {
                    id: faker.random.uuid(),
                    author: name + " " + lastName,
                    name: name,
                    lastname: lastName,
                    title: faker.lorem.words(8),
                    phone: faker.phone.phoneNumber(""),
                    email: faker.internet.email( ),
                    dateSent: newDate,
                    seen: false

                }
            })
            resolve({status: 1, result: data});
        });
    }

    getNotificationDetailedFake() {
        return new Promise(resolve => {
            const date = faker.date.past();
            const newDate = this.dateTime.dateFormattedFormal( this.dateTime.newDate(date) );
            const name = faker.name.firstName(0);
            const lastName = faker.name.lastName(0);
            const images = [0, 1].map(val => {
                return faker.image.business(512)
            })
            const data = {
                id: faker.random.uuid(),
                author: name + " " + lastName,
                name: name,
                images: images,
                lastname: lastName,
                body: faker.lorem.paragraphs(8),
                title: faker.lorem.words(8),
                phone: faker.phone.phoneNumber(""),
                email: faker.internet.email( ),
                dateSent: newDate,
                seen: false

            }
            resolve({status: 1, result: data});
        });
    }

    getSentNotifications() {
        return new Promise ( async( resolve, reject ) => {
            const apiConnection = new WebApiConnectionPresenter();
            const request = await apiConnection.callApiService(
                WebApiServicesDictionary.dictionary.flashNotification.getSentNotifications,
                ApiServicesHelper.tokenFromSession,
                null,
                false,
            )
            resolve (request)
        })
    }

    getSentNotificationsFromServer() {
        const apiConnection = new  WebApiConnectionPresenter()
        apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.flashNotification.getSentNotifications,
            ApiServicesHelper.tokenFromSession,
            null,
            false,
        )
    }

    getNotificationDetailed(id) {
        return this.getNotificationDetailedFromServer(id);
    }

    getNotificationDetailedFromServer(id) {
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.flashNotification.getDetail,
            ApiServicesHelper.tokenFromSession,
            null,
            id,
        )
    }

    setLoggedIn(isLoggedIn) {
        FlashPresenter.manager.isLoggedIn = isLoggedIn;
    }

    setManagerData(list) {
        FlashPresenter.manager.setData(list);
    }

    parseServerResults = (results) => {
        let resultsList = results
        .filter(item => item.type !== null && !isNaN(item.type) && typeof item.seance.id !== "undefined" )
        .map((item) => {
            //return item;
            const date = this.dateTime.newDate(item["created"])
            if (item.type !== 4) {
                const type = typesSeance.find(element => element.value == parseInt(item.seance?.typeSeance, 10))
                return {
                    "key": item.seance?.id,
                    "title": item.title,
                    "link": item.link,
                    "short": item.short,
                    "body": item.body,
                    "linkId": typeof item.seance.id !== "undefined" ? item.seance.id : "",
                    "content": item.content,
                    "typeSeance" : typeof(type) == 'undefined' ? '' : type.key,
                    "id": item.id,
                    "date": date,
                    "dateFormatted": this.dateTime.dateFormattedTime(date),
                    "seen": true,
                    "content": item.content,
                    "startTime": item.seance?.startTime,
                    "endTime" : item.seance?.endTime,
                    "type" : item.type,
                    "send" : item.send
                };
            } else if(item.type === 4) {
                return {
                    "key": "",
                    "title": item.title,
                    "link": item.link,
                    "short": item.short,
                    "body": item.body,
                    "linkId": "",
                    "typeSeance": "",
                    "content": item.content,
                    "id": item.id,
                    "date": date,
                    "dateFormatted": this.dateTime.dateFormattedTime(date),
                    "seen": true,
                    "content": item.content,
                    "startTime": "",
                    "endTime" : "",
                    "type" : item.type
                };
            }
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

        const date = this.dateTime.newDate(item["dateSent"])
        
        return {
            "key": item.id,
            "title": item.title,
            "body": item.body,
            "short": item.short,
            "content": item.content,
            "id": item.id,
            "dateFormatted": this.dateTime.dateFormattedTime(date),
            "date": date,
            "image": item.images[0],
            "seen": true,
            "content": item.content,
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
};
