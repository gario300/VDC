import React from 'react';
import { View, Linking, Image, Platform, Text } from 'react-native';

import styles from './advice.screen.style';

import FlashPresenter from './../Flash/flash.presenter';
import NotificationsServer from './../PushNotifications/notifications_server';
import ElementsListFetch from './../UIComponents/ElementsList/elements_list_fetch.component';
import AppStore from './../Flux/AppStore';

import CardList from './advice.component';

import myAppState from './../AppState/app_state';
import * as AppActions from "./../Flux/AppActions";
import localization from './../Localization/localization';
import authState from '../Auth/auth.state';
import MenuTop from '../NotificartionsMessages/index.screen'

export default class AdviceScreen extends React.Component {

    constructor(props) {
        super(props);

        const { state } = this.props.navigation;

        const notificationObj = myAppState.getAdviceNotifications();
        this.presenter = new FlashPresenter();
        this.state = {
            news: [ ],
            userPush: false,
            dataLoaded: false,
            fetching: false,
            pushMessages: [],
            badges: 0,
            isFlash: notificationObj.isFlash,
            target: notificationObj.target,
            onUpdate: false
        };
    }

    getFlashNotifications = () => {
        this.presenter.getSentNotifications()
        .then(result => {
            if (result.status === 1) {
                console.log(result)
                this.setNews(result);
            } else {
                console.log("There was a problem retrieving the news");
            }
        })
        .catch(error => {
            console.log("On Get Error: ", error);
        });
    }

    setNews = (result) => {
        if (result.status === 1) {  
            const presenter = new FlashPresenter();
            const news = presenter.parseServerResults(result.result);
            this.setState({
                "news": news,
                "dataLoaded": true,
                "fetching": false
            }, () => {
                
                if (this.state.userPush) {
                    this.markUnseenMessages();
                    this.findNotificationsWithNoLinkAndMarkAsSeen();
                    if (this.state.isFlash) {
                        this.OnSelectedItem(this.state.target);
                    }
                }
                
            });
        }
    }

    componentDidMount() { 
        const { navigation } = this.props;
        AppStore.on("notificationsAdviceUpdated", this.handleFlashes);

        myAppState.resetAdviceNotifications();
        //this.getFlashNotifications();
        //this.verifyPushNotifications();
        this.focusListener = navigation.addListener("focus", payload => {
            this.setState({onUpdate: !this.state.onUpdate});
        });
    }

    componentWillUnmount() {
        const { navigation } = this.props;
        AppStore.removeListener("notificationsAdviceUpdated", this.handleFlashes);
        navigation.removeListener("focus", this.OnFetchData);
    }
    
    handleFlashes = () => {
        const notificationObj = myAppState.getAdviceNotifications();
        this.setState({
            isFlash: notificationObj.isFlash,
            target: notificationObj.target
        }, () => {
            if (this.state.isFlash) {
                //this.OnSelectedItem(this.state.target);
                this.OnFetchData();
                myAppState.resetAdviceNotifications();
            }
        })
    }
 
    findNotificationsWithNoLinkAndMarkAsSeen = () => {
        if (authState.isAuthAnonym) return
        this.state.pushMessages.forEach( message => {
            if ( message['seen'] ) return;
            let notFound = true;

            for(let i = 0; i < this.state.news.length; ++i) {
                const obj = this.state.news[i]; 
                if (obj['id'] === message['id']) {
                    notFound = false;
                    //this.updateUserNotificationAsSeen(message);
                }
            }  
            
            if (notFound) {
                this.updateUserNotificationAsSeen(message);
            }
        });
    }

    verifyPushNotifications = () => {
        this.getUserPushMessagesNotSeen();
    }

    getUserPushMessagesNotSeen = () => {
        const snsServer = new NotificationsServer();
        snsServer.getUserPushNotificationsNotSeen( )
        .then(this.OnGetUserPushSuccess)
        .catch(this.OnGetUserPushError);
    }

    OnGetUserPushSuccess = (data) => {
        if (data.status === 1) {
            const pushMessages = data.data['pushmessages'];
            this.setState({
                userPush: true, 
                pushMessages: pushMessages,
                badges: pushMessages.length
            }, () => {
                if (this.state.dataLoaded) {
                    this.markUnseenMessages();
                    this.findNotificationsWithNoLinkAndMarkAsSeen();
                    if (this.state.isFlash) {
                        this.OnSelectedItem(this.state.target);
                    }
                }
            });
        } else {
            console.log("On Get User Push Error");
        }
    }

    OnGetUserPushError = (error) => {
        console.log('Error!', error.message);
    }

    markUnseenMessages = () => {
        if (authState.isAuthAnonym) return
        const pushMessages = this.state.pushMessages;
        for(let i = 0; i < pushMessages.length; ++i) {
            const message = pushMessages[i];
            if (message['seen'] === false) {
                this.findFlashWithIDAndMarkAsUnseen(message['id']);
            }
        }
        AppActions.setNotifications(pushMessages.length)

        setTimeout( () => {
            this.findNotificationsWithNoLinkAndMarkAsSeen();
        }, 400);

        this.setState({onUpdate: !this.state.onUpdate});
    }

    findFlashWithIDAndMarkAsUnseen = (id) => {
        let indexFound = -1;
        this.state.news.forEach((obj, index) => {
            if (obj['id'] === id) {
                indexFound = index;
            }
        });        

        if (indexFound >= 0) {
            let news = this.state.news;
            let obj = this.state.news[indexFound];
            obj['seen'] = false;
            news[indexFound] = obj;
            this.setState({
                "news": news
            });
        }
    }

    findFlashWithIDAndMarkAsSeen = (id) => {
        let indexFound = -1;
        let updated = false;

        this.state.news.forEach((obj, index) => {
            if (obj['id'] === id) {
                indexFound = index;
            }
        });        

        if (indexFound >= 0) {
            const news = this.state.news;
            const obj = this.state.news[indexFound];
            obj['seen'] = true;
            news[indexFound] = obj;
            updated = true;
            this.setState({
                "news": news, 
                "onUpdate": !this.state.onUpdate
            });
        }

        return updated;
    }

    switchBehaviour = (id, type) => {
        switch(type) {
            case 1: 
                myAppState.setLinkProposer(id)
                this.props.navigation.navigate('Proposer')
            break;
            case 2: 
                this.props.navigation.navigate('DetailProposer',{
                    id: id
                })
            break;
            case 3: 
                this.props.navigation.navigate('Blob')
            break;
            case 5:
                this.props.navigation.navigate('Blob')
            break;
            case null:
                this.props.navigation.navigate('Blob')
            break;
        }
    }

    OnSelectedItem = (id) => {
        const presenter = new FlashPresenter();
        let item = presenter.getItemSelected(id);
        if (item === null) return;
        this.navigateTo(item);
    }

    navigateTo = (item) => {
        this.switchBehaviour(item.key, item.type);

        if (typeof item.seen !== "undefined" && !item.seen) {
            this.updateUserNotificationAsSeen(item);
        }
        this.setState({"isFlash": false, "target": ""});
        myAppState.resetAdviceNotifications();
    }

    updateUserNotificationAsSeen = (item) => {  
        const userPresenter = new NotificationsServer();
        userPresenter.updateFlashNotificationAsSeen(item.id)
        .then(this.OnUpdateUserFlashSuccess)
        .catch(error => {
            console.log("Error on get Flash Notifications: ", error);
        });
    }

    OnUpdateUserFlashSuccess = (result) => {
        if (result.status === 1) {
            let itemID = result.data.itemid;
            this.findFlashWithIDAndMarkAsSeen(itemID);
            AppActions.setNotifications(myAppState.getNotifications() - 1);
        }
    }

    OnFetchData = () => {
        this.setState({
            fetching: true,
            userPush: false
        }, () => {
            this.getFlashNotifications();
            this.verifyPushNotifications();
        });
    }

    getItemById = (id) => {
        for(let i = 0; i < this.state.news.length; ++i) {
            if (this.state.news[i].id === id) return this.state.news[i];
        }
        
        return false;
    }

    renderItem = ({item, index}) => {

        return (
            <CardList
                navigation={this.props.navigation}
                index={index}
                id={item.id}
                OnPress={this.OnSelectedItem}
                item={item}
                lang={localization.getUserLanguage()}
            />
        )
}

    goToHome = () => {
        const { navigate } = this.props.navigation;
        navigate('Accueil');
    }
        

    render() {
        return (
        <View style={styles.container}> 
            <View style={styles.body}>
                <ElementsListFetch
                    data={this.state.news}
                    renderItem={this.renderItem}
                    FetchData={this.OnFetchData}
                    loading={this.state.fetching}
                    state={this.state.onUpdate}
                />  
            </View>
        </View>
        )
    }
}
