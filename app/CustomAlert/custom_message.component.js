import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import StylesVariables from './../Styles/app.style';
import Localization from './../Localization/localization';
import message from '../Message/message';
import styles from './../Styles/custom_alert.style';
import AppStore from './../Flux/AppStore';

export default CustomMessage = props => {

    const [fadeAnim] = useState( new Animated.Value(0) )

    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                easing: Easing.ease,
                duration: 240,
                useNativeDriver: false
            }
        ).start();
    }, []);

    const [messageState, setMessageState] = React.useState(true);

    React.useEffect( () => {

        const OnMessageUpdated = () => {
            setMessageState(AppStore.getIsMessageActive())
        }
        
        AppStore.on("messageUpdated", OnMessageUpdated);

        return () => {
            AppStore.removeListener("messageUpdated", OnMessageUpdated);
        }
    }, []);

    return (
    <Animated.View 
        style={[styles.loaderContainer, {opacity: fadeAnim}, messageState && styles.loaderActive]}
    >
        {messageState && <View style={styles.content}>
            <View style={styles.contentRow}>
                <View style={styles.contentColumn}>
                    <View style={styles.boxContainer}>
                        
                        <View style={styles.messageContainer}>
                            <Text style={styles.titleMessage}>
                                {message.getMessage()}
                            </Text>
                        </View>

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.btnContentDouble}
                                onPress={() => {
                                    message.callListeners();
                                }}
                            >
                                <Text 
                                    style={styles.btnText}
                                    numberOfLines={2}
                                >
                                    {props.one}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    message.callListenersOther();
                                }}
                                style={styles.btnContent}
                            >
                                <Text style={styles.btnText}>
                                    {props.two}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setMessageState(false)
                                }}
                                style={styles.btnCancelContent}
                            >
                                <Text style={styles.btnTextOrange}>
                                    {Localization.word("cancel")}
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