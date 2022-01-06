import { Alert } from 'react-native';
import * as AppActions from "./../Flux/AppActions";
import * as Notifications from 'expo-notifications';
import NotificationsServer from './../PushNotifications/notifications_server';
import NotificationsPresenter from './../PushNotifications/notifications_presenter';
import AppStore from './../Flux/AppStore';
import myAppState from '../AppState/app_state';

class AdviceNotification {

    _notificationSubscription = null;
    _subscription = null;
    _navigate = null;
    constructor() {
        this._notificationSubscription = null;
        this._subscription = null;
        this._navigate = null;
    }

    start = (props) => {
        this._notificationSubscription = Notifications.addNotificationReceivedListener(this._handleNotification);
        this._subscription = Notifications.addNotificationResponseReceivedListener(this._handleNotificationForeground);
        this.getUserPushMessagesNotSeen();
        AppStore.on("notificationsUpdated", this.OnNotificationsUpdated);
        this._navigate = props.navigation
    }

    exit = () => {
        this._notificationSubscription.remove();
        this._subscription.remove()
        AppStore.removeListener("notificationsUpdated", this.OnNotificationsUpdated);
    }

    _handleNotification = (notification) => {    
        let data = notification.request.content.data;
        if (Platform.OS === "ios") {
          data = notification.request.content.data;
        }
        
        if (typeof data.active !== "undefined" || typeof data.chat !== "undefined") {
          this.handleNotificationReceived(notification.request.content.data);
        }
    }
  
    _handleNotificationForeground = (response) => {    
        const notification = response.notification;
        let data = notification.request.content.data;
        if (Platform.OS === "ios") {
          data = notification.request.content.data;
        }

        if ( typeof data.chat !== "undefined") {
            this.goToChat(data.target);
            AppActions.setChatNotifications(["Chat"]);
            this.OnNotificationsUpdated();
        }
        else
        if (typeof data.active !== "undefined") {
          this.updateBadgesCount( data.badges );
          if (typeof data.id !== "undefined") {
            
             this.goToFlashNews(data.id);
          }
        }
    }

    handleNotificationReceived = (notification) => {
        let title = notification.body;
        let body = notification.body;
        if (Platform.OS === "ios") {
          title = notification.title;
          body = notification.body;
        }
        if ( typeof notification.chat !== "undefined") {
          AppActions.setChatNotifications(["Chat"]);
          this.OnNotificationsUpdated();
        } else {
          this.updateBadgesCount(notification.badges);
          Alert.alert(
              title,
              body,
              [
              {text: 'Annuler', onPress: () => {
                  // console.log('Flash Cancel');
              }},
              {text: 'Ouvrir', onPress: () => {
                  // console.log(notification.data);
                  let data = notification;
                  if (data.id !== undefined) {
                      this.goToFlashNews(data.id);
                  }
              }},
          ]);
      }
    }
  
    updateBadgesCount = (badges) => {
        if (badges === null) {
            const snsServer = new NotificationsServer();
            snsServer.getUserPushNotificationsNotSeen( )
            .then((data) => {
                if (data.status === 1) {
                    const pushMessages = data.data['pushmessages'];
                    const totalPushMessages = pushMessages.length;
  
                    AppActions.setNotifications(totalPushMessages)
                } else {
                  AppActions.setNotifications(0);
                }
            })
            .catch((error) => {
                console.log('Error!', error.message);
                AppActions.setNotifications(0);
            });
        } else {
          AppActions.setNotifications(badges);
        }
    }
  
    goToFlashNews = (id) => {
        AppActions.setAdviceNotifications({
          isFlash: true,
          target: id
        });
        this._navigate.navigate('Notifications', {
            id: id,
            isFlash: true
        });
    }

    goToChat = (target) => {
        /*
        chatsState.setChatFlash(
          {
            target: target,
            isFlash: true
          }
        );
        */
        this._navigate.navigate('Message');
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
            AppActions.setNotifications(pushMessages.length)
        } else {
            console.log("On Get User Push Error");
        }
    }
    
    OnGetUserPushError = (error) => {
        console.log('Error!', error.message);
    }
    
    OnNotificationsUpdated = () => {
        const notifPresenter = new NotificationsPresenter();
        notifPresenter.setBadgeeNumber(myAppState.getNotifications() + myAppState.getChatNotifications());
    }
    
    OnNotificationsUpdatedLast = (push, chat) => {
        const notifPresenter = new NotificationsPresenter();
        notifPresenter.setBadgeeNumber(push + chat);
    }
}

export default new AdviceNotification();