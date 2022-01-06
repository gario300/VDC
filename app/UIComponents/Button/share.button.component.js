import React from 'react';
import { TouchableOpacity, Share } from 'react-native';
import * as Linking from 'expo-linking';

const OnSharePressed = async (article) => {
    let message = `Hello:
    iOS: url
    Android: url
    `;
    message += `http://appbeafya.com/mobile/index.html?path=${"publication"}&publication=${article.id}&type=${article.type}`;
    
    //url for testing
    // let message = Linking.makeUrl("publication", {publication: article.id, type: article.type})
    
    try {
        const result = await Share.share({
            message: message,
            title: article.title,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
}

const ShareButton = ({ children, article }) => {
    return (
        <TouchableOpacity 
            onPress={() => OnSharePressed(article)}
            activeOpacity={0.7}
        >
            {children}
        </TouchableOpacity>
    )
}

export default ShareButton
