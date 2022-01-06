import {EventEmitter} from "events";
import dispatcher from "./Dispatcher";
import * as AppActions from "./AppActions";
import myAppState from './../AppState/app_state';
import filterState from '../Filters/filter.state';
import downloadState from './../Download/download_state';
import chatsState from './../Chat/chats_state';

class AppStore extends EventEmitter {

    constructor(props) {
        super(props);
        this.setMaxListeners(200);
    }

    handleActions(action) {
        switch (action.type) {
            case AppActions.APP_ACTIONS.DISPLAY_LOADER: {
                myAppState.setLoaderActive( action.value );
                this.emit("loaderUpdated");
                break;
            }
            case AppActions.APP_ACTIONS.DISPLAY_LOADER_MIN: {
                this.emit("loaderUpdatedMin", action.value);
                break;
            }
            case AppActions.APP_ACTIONS.DISPLAY_MESSAGE: {
                myAppState.setMessageActive( action.value );
                this.emit("messageUpdated");
                break;
            }
            case AppActions.APP_ACTIONS.DISPLAY_MESSAGE_MIN: {
                this.emit("messageUpdatedMin", action.value);
                break;
            }
            case AppActions.APP_ACTIONS.UPDATE_MENU_NAV: {
                this.emit("updateMenuNav");
                break;
            }
            
            case AppActions.APP_ACTIONS.SET_INSCRIPTION_VALUES: {
                this.emit("inscriptionValues");
                break;
            }
            
            case AppActions.APP_ACTIONS.GET_USER_ME: {
                this.emit("onGetUser");
                break;
            }
            case AppActions.APP_ACTIONS.SET_USER_ME: {
                myAppState.setUserMe(action.value);
                this.emit("onSetUser");
                break;
            }
            case AppActions.APP_ACTIONS.GET_FAVOURITES: {
                this.emit("onGetFavourites");
                break;
            }
            case AppActions.APP_ACTIONS.SET_FILTER: {
                filterState.setFilter( action.value );
                this.emit("filterUpdated");
                break;
            }
            case AppActions.APP_ACTIONS.FILTER_UPDATED: {
                this.emit("filterUpdated");
                break;
            }
            case AppActions.APP_ACTIONS.GET_LOCATIONS: {
                this.emit("onGetLocations");
                break;
            }
            case AppActions.APP_ACTIONS.DO_LOGOUT: {
                this.emit("doLogout");
                break;
            }
            case AppActions.APP_ACTIONS.DO_LOGIN: {
                this.emit("doLogin", {
                    isAnonym: action.isAnonym
                });
                break;
            }
            case AppActions.APP_ACTIONS.SET_NOTIFICATIONS: {
                myAppState.setNotifications(action.value);
                this.emit("notificationsUpdated");
                break;
            }
            case AppActions.APP_ACTIONS.SET_ADVICE_NOTIFICATIONS: {
                myAppState.setAdviceNotifications(action.value);
                this.emit("notificationsAdviceUpdated");
                break;
            }
            case AppActions.APP_ACTIONS.UPDATE_MESSAGES: {
                this.emit("onUpdateMessages");
                break;
            }
            case AppActions.APP_ACTIONS.FETCH_SENT_SUB: {
                this.emit("fetchSentSubs");
                break;
            }
            case AppActions.APP_ACTIONS.FETCH_ME_SUB: {
                this.emit("fetchMeSubs");
                break;
            }
            case AppActions.APP_ACTIONS.FETCH_CONTACTS: {
                this.emit("fetchContacts");
                break;
            }
            case AppActions.APP_ACTIONS.START_DOWNLOAD: {
                downloadState.setDownload(action.value);
                this.emit("startDownload");
                break;
            }
            case AppActions.APP_ACTIONS.REMOVE_DOWNLOAD: {
                downloadState.setRemove(action.value);
                this.emit("removeDownload");
                break;
            }
            case AppActions.APP_ACTIONS.LOG_OPENED_ARTICLE: {
                this.emit("openedArticle", action.value);
                break;
            }
            case AppActions.APP_ACTIONS.SET_CHAT_NOTIFICATIONS: {
                myAppState.setChatNotifications(action.value);
                this.emit("notificationsChatUpdated");
                break;
            }
            case AppActions.APP_ACTIONS.SET_MESSAGE_CHAT: {
                chatsState.setChats(action.value);
                this.emit("onChatThread");
                break;
            }
            case AppActions.APP_ACTIONS.UPDATE_MESSAGES: {
                this.emit("onUpdateMessages");
                break;
            }
            case AppActions.APP_ACTIONS.SET_MESSAGE_CHAT_ADMIN: {
                chatsState.setChatsAdmin(action.value);
                this.emit("onChatThread");
                break;
            }
            default: {
                console.log("Break")
                break;
            }
        }
    }

    getIsMessageActive() {
        return myAppState.getMessageActive;
    }
}

const appStore = new AppStore();
dispatcher.register(appStore.handleActions.bind(appStore));
export default appStore;