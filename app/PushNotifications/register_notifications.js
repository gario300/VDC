import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';

import NotificationsStatus from './notifications_status';

export default class RegisterNotifications { 

    status = new NotificationsStatus();

    async getDeviceTokenAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
            }
            if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
            }
            //token = (await Notifications.getExpoPushTokenAsync()).data;
            let experienceId = undefined;
            if (!Constants.manifest) {
                // Absence of the manifest means we're in bare workflow
                //experienceId = '@username/example';
                experienceId = '@techgoodways/app-vdc';
            }
                
            let tokenD = await Notifications.getExpoPushTokenAsync({
                experienceId: experienceId,
                development: false
            });

            token = tokenD.data
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            });
        }        

        return {status: this.status.granted, token: token};
    }
}
