import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import StylesVariables from '../../Styles/app.style';
import AppStore from '../../Flux/AppStore';
import myAppState from '../../AppState/app_state';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    badge: {
        alignItems: 'center',
        backgroundColor: 'crimson',
        borderRadius: 50,
        height: 12 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        left: 15 * StylesVariables.responsiveMulti,
        position: 'absolute',
        top: 2,
        width: 12 * StylesVariables.responsiveMulti,
    }
})


const MenuTabChat = ({ color, icon, size }) => {
    const [badgeCount, setBadgeCount] = useState(0)

    useEffect(() => {
        const OnNotificationsUpdated = () => {
            setBadgeCount(myAppState.getChatNotifications());
        }
        AppStore.on("notificationsChatUpdated", OnNotificationsUpdated);
        return () => {
            AppStore.removeListener("notificationsChatUpdated", OnNotificationsUpdated);
        }
    }, [])

    return (
        <View style={styles.container}>
          <Ionicons name={icon} size={size} color={color} />
            {badgeCount > 0 && (
            <View style={styles.badge}>
                <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold', textAlign: 'center' }}>
                    {'!'}
                </Text>
            </View>
            )}
        </View>
      );
}

export default MenuTabChat;