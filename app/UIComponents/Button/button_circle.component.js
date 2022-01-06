import React from 'react';
import { StyleSheet, TouchableHighlight, Image, Text, View } from 'react-native';
import StylesVariables from '../../Styles/app.style';

const audio = require('../../../assets/icons/audio.png');
const note = require('../../../assets/icons/text.png');
const photo = require('../../../assets/icons/photo.png');

const styles = StyleSheet.create({
    buttonCont: {
        alignItems: "center",
        backgroundColor: StylesVariables.whiteColor,
        borderColor: StylesVariables.secondaryColor,
        borderRadius: 45,
        borderWidth: 1,
        height: 90,
        justifyContent: "center",
        width: 90,
    },
    icon: {
        height: 40,
        width: 40,
    },
    iconText: {
        ...StylesVariables.appText,
    }
})

const active = {
    "inactive": StyleSheet.create({
        buttonCont: {
            ...styles.buttonCont,
        },
        underlayColor: {
            color: StylesVariables.whiteColor,
        }
    }),
    "active": StyleSheet.create({
        buttonCont: {
            ...styles.buttonCont,
            backgroundColor: StylesVariables.blueColor,
            borderColor: StylesVariables.blueColor
        },
        underlayColor: {
            color: StylesVariables.blueColor,
        }
    }),
}

const ButtonCircle = ({ onPress, isActive = false, style = null, icon }) => {
    const selected = isActive ? "active" : "inactive";
    const activeStyle = active[selected];
    let sourceIcon;

    switch (icon) {
        case 'Audio':
            sourceIcon = audio;
            break;
        case 'Note':
            sourceIcon = note;
            break;
        case 'Photo':
            sourceIcon = photo;
            break;
    }


    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor={activeStyle.underlayColor}
            style={[activeStyle.buttonCont, style]}>
            <View>
                <Image
                    style={styles.icon}
                    source={sourceIcon}
                    resizeMode="cover" />
                <Text style={styles.iconText}>{icon}</Text>
            </View>
        </TouchableHighlight>
    )
}

export default ButtonCircle