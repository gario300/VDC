import { Platform } from 'react-native';
import RegisterNotifications from './register_notifications';
import NotificationsStatus from './notifications_status';
import * as Notifications from 'expo-notifications';

export default class NotificationsPresenter {

    constructor() { }

    getDeviceToken = () => {
        return new Promise((resolve, reject) => {
                let register = new RegisterNotifications();
                let status = new NotificationsStatus();
                register.getDeviceTokenAsync()
                .then(data => {
                    if (data.status === status.granted) {
                        resolve({
                            status: 1,
                            token: this.parseToken(data.token)
                        });
                    } else if (data.status === status.denied) {
                        reject({
                            status: 2,
                            message: 'In order to receive notifications you must enabled them on settings',
                        })
                    } else {
                        reject({
                            status: 3,
                            message: 'In order to receive notifications you must enabled them on settings'
                        })
                    }
                })
                .catch(error => {
                    reject({
                        status: -1,
                        error: error,
                        message: 'There was a problem with the notifications registration'
                    })
                })
            }  
        );
    }

    parseToken = (tokenExpo) => {
        let expoSplit = tokenExpo.split('[');
        let expoSplitSecond = expoSplit[1].split(']');
        
        return expoSplitSecond[0];
    }

    getBadgeNumber = () => {
        return Notifications.getBadgeCountAsync();
    }

    setBadgeNumberMinusOne = () => {
        if (Platform.OS === 'ios') {
            Notifications.getBadgeCountAsync()
            .then((value) => {
            if (value > 0) {
                let newValue = value - 1;
                if (newValue < 0) newValue = 0;
                    Notifications.setBadgeCountAsync(newValue);
                }
            });
        }
    }

    resetBadgesCount = () => {
        if (Platform.OS === 'android') return
        Notifications.setBadgeCountAsync(0);
    }

    setBadgeeNumber = (val) => {
        if (Platform.OS === 'android') return
        Notifications.setBadgeCountAsync(val);
    }
};
