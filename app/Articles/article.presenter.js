import FormValidations from '../FormValidations/form_validations';
import WebApiServicesDictionary from '../WebApiServices/web_api_services_dict';
import WebApiConnectionPresenter from '../WebApiConnection/web_api_connection.presenter';
import ApiServicesHelper from '../Utils/ApiServicesHelper/api_services_helper';
import Localization from '../Localization/localization';
import * as Arrays from '../Constants/constants.index';
import faker from 'faker';

export default class ArticlePresenter {
    constructor() { }

    parseArticle(article, lang) {
        const categories = this.parseCategories(article.categories);
        const type = this.parseType(article.type);
        const content = article.content;
        if (typeof article.content["fr"] === "undefined") {
            content["fr"] = {
                "title": "",
                "description": ""
            }
        }
        return {
            "author": article.author,
            "available": article.available,
            "categories": categories,
            "content": content,
            "created": article.created,
            "date": article.date,
            "id": article.id,
            "title": article.content["fr"].title,
            "description": article.content["fr"].description,
            "images": article.images,
            "status": article.status,
            "type": type,
        }
    }

    parseArticleForSearch(article, lang) {
        const selectedLang = lang !== undefined ? lang : Localization.getUserLanguage();
        const categories = this.parseCategories(article.categories);
        const type = this.parseType(article.type);
        const content = article.content;
        if (typeof article.content[selectedLang] === "undefined") {
            article.content[selectedLang] = {
                "title": ""
            }
        }
        return {
            "author": article.author,
            "available": article.available,
            "categories": categories,
            "content": content,
            "created": article.created,
            "date": article.date,
            "id": article.id,
            "title": article.content[selectedLang].title,
            "images": article.images,
            "status": article.status,
            "type": type,
        }
    }

    parseCategories(categories) {
        return Object.keys(categories).map(key => (categories[key]));
    }

    parseType(type) {
        switch (type) {
            case 1: return 'video'
            case 2: return 'audio'
            case 3: return 'article'
        }
    }

    getFakeData(count) {
        const types = ['article', 'audio', 'video'];
        let category = [];
        let tempData = [];
        Arrays.getCategories().forEach( cat => {category.push(cat.value)});
        for (let i = 0; i < count; i++) {
            const element = {
                author: {
                    id: faker.random.alphaNumeric(10),
                    name: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                },
                avaliable: 2,
                categories: faker.random.arrayElement(category),
                content: {
                    "fr": {
                        body: faker.lorem.paragraph(20),
                        description: faker.lorem.sentence(10),
                        file: {},
                        title: faker.lorem.sentence(10),
                    }
                },
                created: faker.date.past(),
                date: faker.date.past(),
                id: faker.random.alphaNumeric(10),
                images: { "0": faker.image.imageUrl() },
                status: 1,
                type: faker.random.arrayElement(types),
            };
            tempData.push(element);
        }
        return tempData;
    }

    getPublications() {
        const apiConection = new WebApiConnectionPresenter();

        return apiConection.callApiService(
            WebApiServicesDictionary.dictionary.publications.getPublicationsAvaliable,
            ApiServicesHelper.tokenFromSession,
            null,
            null,
        )
    }

    getPublicationDetail(id) {
        const apiConection = new WebApiConnectionPresenter();

        return apiConection.callApiService(
            WebApiServicesDictionary.dictionary.publications.getPublicationDetail,
            ApiServicesHelper.tokenFromSession,
            null,
            id,
        )
    }

    getPublicationsWithFilter(filter) {
        const apiConection = new WebApiConnectionPresenter();

        return apiConection.callApiService(
            WebApiServicesDictionary.dictionary.publications.getPublicationsWithFilter,
            ApiServicesHelper.tokenFromSession,
            null,
            filter,
        )
    }

    openedArticleEvent(article) {
        const apiConection = new WebApiConnectionPresenter();

        let formData = new FormData();
        formData.append('type', article.type);
        formData.append('id', article.id);
        formData.append('os', article.os);

        return apiConection.callApiService(
            WebApiServicesDictionary.dictionary.log.opendedArticle,
            ApiServicesHelper.tokenFromSession,
            formData,
            null,
        )
    }
}