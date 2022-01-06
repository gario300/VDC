import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, Modal } from 'react-native';
import StylesVariables from './../Styles/app.style';
import Localization from './../Localization/localization';
import message from '../Message/message';
import styles from './../Styles/custom_alert.style';
import { AntDesign } from '@expo/vector-icons'; 
import AppStore from './../Flux/AppStore';

const CustomAlertMin = () => {

    const [isMsgVisible, setIsMsgVisible] = useState(false);

    React.useEffect( () => {

        const OnMessageUpdated = (value) => {
            console.log("On Message Updated")
            setIsMsgVisible(value)
        }
        
        AppStore.on("messageUpdatedMin", OnMessageUpdated);

        return () => {
            AppStore.removeListener("messageUpdatedMin", OnMessageUpdated);
        }
    }, []);

    const [fadeAnim] = useState( new Animated.Value(0) )

    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                easing: Easing.easing,
                duration: 200,
                useNativeDriver: true
            },
        ).start();
    }, []);

    const OnClose = () => {
        setIsMsgVisible(false)   
    }

    return (
    <Animated.View 
        style={[styles.loaderContainer, {opacity: fadeAnim}, isMsgVisible && styles.loaderActive]}
    >
        {isMsgVisible && <View style={styles.content}>
            <View style={styles.contentRow}>
                <View style={styles.contentColumn}>
                    <View style={styles.boxContainer}>
                        <View style={styles.iconContainer}>
                            <AntDesign name="warning" size={24} style={styles.iconWarning} />
                        </View>
                        <View style={styles.messageContainer}>
                            <Text 
                                style={styles.titleMessage}
                                selectable
                            >
                                {message.getMessage()}
                            </Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                activeOpacity={0.4}
                                style={styles.btnContent}
                                onPress={() => {
                                    OnClose();
                                    message.callListeners();
                                }}
                            >
                                <Text style={styles.btnText}>
                                    {Localization.word('ok')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>}
    </Animated.View>
    )
}

export default CustomAlertMin;