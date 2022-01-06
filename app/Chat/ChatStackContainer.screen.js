import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import ChatScreen from './chats.screen'
import TopMenu from '../NotificartionsMessages/index.screen'
import AdviceScreen from '../Advice/advice.screen'
const ChatStackContainer = ({navigation, route}) => {
    const [type, setType] = useState('Messages');
   
    return (
        <View
            style={styles.container}
        >
            <TopMenu
                type={type}
                setType={setType}
            />
            {
                type == 'Messages' &&
                <ChatScreen
                    navigation={navigation}
                    route={route}
                />
            }
            {
                type == 'Notifications' &&
                <AdviceScreen
                    navigation={navigation}
                    route={route}
                />
            }
        </View>
    )
}

export default ChatStackContainer

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
