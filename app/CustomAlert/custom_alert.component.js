import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import StylesVariables from './../Styles/app.style';
import Localization from './../Localization/localization';
import message from '../Message/message';
import styles from './../Styles/custom_alert.style';
import { AntDesign } from '@expo/vector-icons'; 
import AppStore from './../Flux/AppStore';

export default CustomAlert = props => {

    const [fadeAnim] = useState( new Animated.Value(0) )

    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                easing: Easing.easing,
                duration: 200,
                useNativeDriver: false
            }
        ).start();
    }, []);

    const [messageState, setMessageState] = React.useState(false);

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
                                    setMessageState(false);
                                        message.callListeners();
                                }}
                            >
                                <Text style={styles.btnText}>
                                    {Localization.word('ok')}
                                </Text>
                            </TouchableOpacity>

                            {message.withCancel && 
                                (<TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setMessageState(false);
                                        message.callListenersOther();
                                    }}
                                    style={styles.btnContent}
                                >
                                    <Text style={styles.btnText}>
                                        {Localization.word('cancel')}
                                    </Text>
                                </TouchableOpacity>)
                            }
                        </View>
                    </View>
                </View>
            </View>
        </View>}
    </Animated.View>
    )
}