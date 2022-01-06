import dispatcher from "./Dispatcher";

export const APP_ACTIONS = {
    DISPLAY_LOADER: 'appActions.displayLoader',
    DISPLAY_LOADER_MIN: 'appActions.displayLoaderMin',
    DISPLAY_MESSAGE: 'appActions.displayMessage',
    DISPLAY_MESSAGE_MIN: 'appActions.displayMessageMin',

    SET_FILTER: 'appActions.setFilter',
    FILTER_UPDATED: 'appActions.updatedFilter',
    
    GET_USER_ME: 'appActions.getUserMe',
    SET_USER_ME: 'appActions.setUserMe',

    GET_FAVOURITES: 'appActions.getFavourites',

    NAVIGATE_TO_PRODUCER_DETAIL: 'appActions.navigateProducerDetail',
    
    ADD_TO_CART: 'appActions.addToCart',
    REMOVE_FROM_CART: 'appActions.removeFromCart',

    GET_LOCATIONS: 'appActions.getLocations',
    SET_LOCATIONS: 'appActions.setLocations',
    SET_INSCRIPTION_VALUES: 'appActions.setInscriptionValues',
    UPDATE_MENU_NAV: 'appActions.updateMenuNav',
    SET_NOTIFICATIONS: 'appActions.setNotifications',
    SET_ADVICE_NOTIFICATIONS: 'appActions.setAdviceNotifications',
    UPDATE_MESSAGES: 'appActions.updateMessages',
    DO_LOGOUT: 'appActions.doLogout',
    DO_LOGIN: 'appActions.doLogin',

    FETCH_SENT_SUB: 'appActions.fetchSentSubs',
    FETCH_ME_SUB: 'appActions.fetchMeSubs',
    FETCH_CONTACTS: 'appActions.fetchContacts',

    START_DOWNLOAD: 'APP_ACTIONS.startDownload',
    REMOVE_DOWNLOAD: 'APP_ACTIONS.removeDownload',

    LOG_OPENED_ARTICLE: 'APP_ACTIONS.openedArticle',

    SET_CHAT_NOTIFICATIONS: 'appActions.setChatNotifications',
    SET_MESSAGE_CHAT: 'appActions.setMessageChat',
};

export function updateMenuNav() {
    dispatcher.dispatch({
        type: APP_ACTIONS.UPDATE_MENU_NAV
    })
}

export function displayLoader(isActive) {
    dispatcher.dispatch({
        type: APP_ACTIONS.DISPLAY_LOADER,
        value: {isActive, type: 1}
    })
}

export function displayLoaderMin(isActive) {
    dispatcher.dispatch({
        type: APP_ACTIONS.DISPLAY_LOADER_MIN,
        value: isActive
    })
}

export function displayCustomLoader(isActive, type) {
    dispatcher.dispatch({
        type: APP_ACTIONS.DISPLAY_LOADER,
        value: {isActive, type}
    })
}

export function displayMessage(isActive) {
    dispatcher.dispatch({
        type: APP_ACTIONS.DISPLAY_MESSAGE,
        value: isActive
    })
}

export function displayMessageMin(isActive) {
    dispatcher.dispatch({
        type: APP_ACTIONS.DISPLAY_MESSAGE_MIN,
        value: isActive
    })
}

export function setFilter(obj) {
    dispatcher.dispatch({
        type: APP_ACTIONS.SET_FILTER,
        value: obj
    })
}

export function filterUpdated(obj) {
    dispatcher.dispatch({
        type: APP_ACTIONS.FILTER_UPDATED,
        value: obj
    })
}

export function setInscriptionValues() {
    dispatcher.dispatch({
        type: APP_ACTIONS.SET_INSCRIPTION_VALUES
    })
}

export function getUserMe(obj) {
    dispatcher.dispatch({
        type: APP_ACTIONS.GET_USER_ME,
        value: obj
    })
}

export function setUserMe(obj) {
    dispatcher.dispatch({
        type: APP_ACTIONS.SET_USER_ME,
        value: obj
    })
}
export function getFavourites(obj) {
    dispatcher.dispatch({
        type: APP_ACTIONS.GET_FAVOURITES,
        value: obj
    })
}

export function getLocations(obj) {
    dispatcher.dispatch({
        type: APP_ACTIONS.GET_LOCATIONS,
        value: obj
    })
}

export function setLocations(obj) {
    dispatcher.dispatch({
        type: APP_ACTIONS.SET_LOCATIONS,
        value: obj
    })
}

export function doLogout() {
    dispatcher.dispatch({
        type: APP_ACTIONS.DO_LOGOUT
    })
}

export function doLogin(value, isAnonym) {
    dispatcher.dispatch({
        type: APP_ACTIONS.DO_LOGIN,
        value: value,
        isAnonym: isAnonym
    })
}

export function setNotifications(val) {
    dispatcher.dispatch({
        type: APP_ACTIONS.SET_NOTIFICATIONS,
        value: val
    })
}

export function addToCart(val) {
    dispatcher.dispatch({
        type: APP_ACTIONS.ADD_TO_CART,
        value: val
    })
}

export function removeFromCart(item) {
    dispatcher.dispatch({
        type: APP_ACTIONS.REMOVE_FROM_CART,
        value: item
    })
}

export function setAdviceNotifications(item) {
    dispatcher.dispatch({
        type: APP_ACTIONS.SET_ADVICE_NOTIFICATIONS,
        value: item
    })
}

export function updateMessages(val) {
    dispatcher.dispatch({
        type: APP_ACTIONS.UPDATE_MESSAGES,
        value: val
    })
}

export function fetchSentSubs() {
    dispatcher.dispatch({
        type: APP_ACTIONS.FETCH_SENT_SUB,
    })
}

export function fetchMeSubs() {
    dispatcher.dispatch({
        type: APP_ACTIONS.FETCH_ME_SUB,
    })
}

export function fetchContacts() {
    dispatcher.dispatch({
        type: APP_ACTIONS.FETCH_CONTACTS,
    })
}

export function startDownload(obj) {
    dispatcher.dispatch({
        type: APP_ACTIONS.START_DOWNLOAD,
        value: obj
    })
}

export function removeDownload(obj) {
    dispatcher.dispatch({
        type: APP_ACTIONS.REMOVE_DOWNLOAD,
        value: obj
    })
}

export function openedArticle(obj) {
    dispatcher.dispatch({
        type: APP_ACTIONS.LOG_OPENED_ARTICLE,
        value: obj
    })
}

export function setChatNotifications(val) {
    dispatcher.dispatch({
        type: APP_ACTIONS.SET_CHAT_NOTIFICATIONS,
        value: val
    })
}

export function setMessageChat(val) {
    dispatcher.dispatch({
        type: APP_ACTIONS.SET_MESSAGE_CHAT,
        value: val
    })
}