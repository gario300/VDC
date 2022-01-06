const dictionary = {
    normalpost: () => {
        return {
            'Content-Type': 'multipart/form-data'
        } 
    }, 
    customHeader: () => {
        return {
            'Content-Type': 'multipart/form-data',
            'Api-Key': "Api-token 6102"
        } 
    }, 
    normalget: () => {
        return {
            'Content-Type': 'multipart/form-data'
        } 
    } 
}

export default class WebApiHeaders {

    constructor() { }

    static get postHeaders() {
        return dictionary['normalpost']();
    }

    static get customHeader() {
        return dictionary['customHeader']();
    }

    static tokenHeader(token) {
        return {'token': token};
    }
}