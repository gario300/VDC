import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import ApiServicesHelper from '../Utils/ApiServicesHelper/api_services_helper';
import DateTime from '../DateTime/date_time';
import producers from './producers';

import faker from 'faker'
import { colors } from 'react-native-elements';

export default class ProducersPresenter {
    
    constructor() { 
        this.dateTime = new DateTime();
    }

    getAvailable() {
        return ApiServicesHelper.getTokenFromSession()
        .then(data => {
            console.log("Session Data: ", data)
            return this.getAvailableFromServer(data);
        });
    }

    getAvailableFromServer(data) {
        const token = data.token;

        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.producers.getAvailable,
            token,
            null,
            ""
        )
    }

    searchByFilters(params) {
        return ApiServicesHelper.getTokenFromSession()
        .then(data => {
            console.log("Session Data: ", data)
            return this.searchByFiltersFromServer(data, params);
        });
    }

    searchByFiltersFromServer(data, params) {
        const token = data.token;

        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.producers.search,
            token,
            null,
            params
        )
    }

    getItemById(itemId) {
        return new Promise(resolve => {
            const randomNum = faker.random.number(10) + 1;
            //const randomNum = 0;
            let list = [];
            for(let i = 0; i < randomNum; ++i) {
                list.push(i);
            }
            const data = {
                id: faker.random.uuid(),
                images: [faker.image.food(361 * 2, 140 * 2)],
                title: faker.company.companyName(),
                categories: [faker.commerce.department()],
                direction: faker.address.streetAddress(true), 
                isFavorite: faker.random.boolean(),
                isOrganic: faker.random.boolean(),
                description: faker.lorem.paragraph(5),
                products: list.map(_obj => {
                    return {
                        "id": faker.random.uuid(),
                        "title": faker.commerce.productName(),
                        "ingredients": faker.commerce.productMaterial(),
                        "price": faker.commerce.price(1, 1000, true),
                        "image": faker.image.food(400 * 2, 400 * 2),
                    }
                }),
                openingHours: [
                    {
                        title: "monday",
                        hours: [["10:00", "14:00"], ["15:00", "19:00"]],
                        isClosed: true
                    },
                    {
                        title: "tuesday",
                        hours: [["10:00", "14:00"], ["15:00", "19:00"]],
                        isClosed: false
                    },
                    {
                        title: "wednesday",
                        hours: [["10:00", "14:00"], ["15:00", "19:00"]],
                        isClosed: false
                    },
                    {
                        title: "thursday",
                        hours: [["10:00", "14:00"], ["15:00", "19:00"]],
                        isClosed: false
                    },
                    {
                        title: "friday",
                        hours: [["10:00", "14:00"], ["15:00", "19:00"]],
                        isClosed: false
                    },
                    {
                        title: "saturday",
                        hours: [["10:00", "14:00"], ["15:00", "19:00"]],
                        isClosed: false
                    },
                    {
                        title: "sunday",
                        hours: [["10:00", "14:00"], ["15:00", "19:00"]],
                        isClosed: true
                    },
                ],
                status: 1
            }
            resolve({status: 1, result: data});
        });
    }

    getItemDescription(itemId) {
        return ApiServicesHelper.getTokenFromSession()
        .then(data => {
            return this.getItemDescriptionFromServer(data, itemId);
        });
    }

    getItemDescriptionFromServer(data, itemId) {
        const token = data.token;

        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.producers.getProducerDescription,
            token,
            null,
            itemId
        )
    }

    parseData(results) {
        return results.map((item) => {
            let color = "fff";
            let categories = typeof item.categories.length !== "undefined" ? item.categories : "";
            categories = categories.map(key => {
                for(let i = 0; i < producers.pCategories.length; ++i) {
                    if (producers.pCategories[i].key === key) {
                        color = producers.pCategoriesColor[i].value;
                        return producers.pCategories[i].value;
                        break;
                    }
                }
            })
            .join(", ");
            
            return {
                "id": item.id,
                "key": item.id,
                "color": color,
                "title": item.title,
                "image": typeof item.photos.length !== "undefined" ? item.photos[0] : "",
                "direction": item.pickUpAddress.cp + ", " + item.pickUpAddress.city + " ",
                "directionComplete": item.pickUpAddress.address + ", " + item.pickUpAddress.cp + " " + item.pickUpAddress.city + " ",
                "pickUpAddress": item.pickUpAddress,
                "categories": categories,
                "isOrganic": item.areOrganic,
                "pickHour": producers.getPickHours(item.pickUpAddress.deliveryTime),
                "pickHourTime": producers.getPickUpTime(item.pickUpAddress.deliveryTime),
                "status": item.status
            };
        })
    }

    parseItems(results, favList) {
        return results.map((item) => {
            let color = "fff";
            let categories = typeof item.categories.length !== "undefined" ? item.categories : "";
            categories = categories.map(key => {
                for(let i = 0; i < producers.pCategories.length; ++i) {
                    if (producers.pCategories[i].key === key) {
                        color = producers.pCategoriesColor[i].value;
                        return producers.pCategories[i].value;
                        break;
                    }
                }
            })
            .join(", ");
            const favItem = favList.filter((obj) => obj.id === item.id)
            let isFavourite = false;
            if (favItem.length > 0) {
                isFavourite = true;
            }
            
            return {
                "id": item.id,
                "key": item.id,
                "color": color,
                "title": item.title,
                "image": typeof item.photos.length !== "undefined" ? item.photos[0] : "",
                "direction": item.pickUpAddress.cp + ", " + item.pickUpAddress.city + " ",
                "directionComplete": item.pickUpAddress.address + ", " + item.pickUpAddress.cp + " " + item.pickUpAddress.city + " ",
                "pickUpAddress": item.pickUpAddress,
                "categories": categories,
                "isFavorite": isFavourite,
                "isOrganic": item.areOrganic,
                "pickHour": producers.getPickHours(item.pickUpAddress.deliveryTime),
                "pickHourTime": producers.getPickUpTime(item.pickUpAddress.deliveryTime),
                "status": item.status
            };
        })
    }
    
    parseItemsFav(results, favList) {
        return results.map((item) => {
            const favItem = favList.filter((obj) => obj.id === item.id)
            item["isFavorite"] = favItem.length > 0 ? true : false 
            return item;
        })
    }

    parseItemDetails(item, favList) {
        let categories = typeof item.categories.length !== "undefined" ? item.categories : "";
        let color = "fff";
        categories = categories.map(key => {
            for(let i = 0; i < producers.pCategories.length; ++i) {
                if (producers.pCategories[i].key === key) {
                    color = producers.pCategoriesColor[i].value;
                    return producers.pCategories[i].value;
                    break;
                }
            }
        })
        .join(", ");

        const favItem = favList.filter((obj) => obj.id === item.id)
        let isFavourite = false;
        if (favItem.length > 0) {
            isFavourite = true;
        }
        return {
            "id": item.id,
            "key": item.id,
            "title": item.title,
            "color": color,
            "images": typeof item.photos.length !== "undefined" ? item.photos : [],
            "direction": item.pickUpAddress.cp + ", " + item.pickUpAddress.city + " ",
            "pickUpAddress": item.pickUpAddress,
            "categories": categories,
            "description": item.descriptionShort,
            "products": item.products,
            "isFavorite": isFavourite,
            "isOrganic": item.areOrganic,
            "pickHour": producers.getPickHours(item.pickUpAddress.deliveryTime),
            "pickHourTime": producers.getPickUpTime(item.pickUpAddress.deliveryTime),
            "openingHours": item.openingTime,
            "status": item.status
        };
    }

    parseProducts(list) {
        return list.map(item => {
            try {
                const photos = Object.keys(item.photos).map(val => item.photos[val])[0];
                item.title = item.name;
                item.image = photos;
                item.count = 0;
                return item;
            } catch(error) {
                return item;
            }
        })
    }

    parseOpeningHours(list) {
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const daysFrench = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        return Object.keys(list).map((key, index) => {
            const indexTitle = days.indexOf(key);
            if (indexTitle < 0) return {};
            const obj = list[key];
            let dayTitle = daysFrench[indexTitle];

            let firstHours = obj.openingHours[0];
            let secondHours = obj.openingHours[1];
            let isClosed = obj.isClosed;

            return {
                "key": dayTitle + "_" + index,
                "title": dayTitle,
                "first": [ firstHours[0], firstHours[1] ],
                "second": [ secondHours[0], secondHours[1] ],
                "isClosed": isClosed
            }
        })
    }

};
