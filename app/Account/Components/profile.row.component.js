import React from 'react';
import { Image, StyleSheet, Switch, Text, TouchableHighlight, View } from 'react-native';
import { Fontisto, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import StylesVariables from '../../Styles/app.style';

const profile = require('../../../assets/icons/profile.png');
const notification = require('../../../assets/icons/notification.png');
const docText = require('../../../assets/icons/doc_text.png');

const styles = StyleSheet.create({
    container: {
        height: 50 * StylesVariables.responsiveHeightMulti,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: StylesVariables.spacing * 2.5,
        borderBottomWidth: .5,
        borderBottomColor: StylesVariables.grayColor,
    },
    rightCont: {
        position: "absolute",
        right: StylesVariables.spacing * 2,
        flex: .27
    },
    icon: {
        height: 18 * StylesVariables.responsiveHeightMulti,
        marginRight: StylesVariables.spacing,
        tintColor: StylesVariables.whiteColor,
        width: 18 * StylesVariables.responsiveMulti,
    },
    text: {
        ...StylesVariables.appText,
        fontSize: 15,
    }
});

const theme = {
    "primary": StyleSheet.create({
        container: {
            ...styles.container,
            backgroundColor: StylesVariables.btnPrimary,
        },
        underlayColor: {
            color: StylesVariables.btnPrimary,
        },
        text: {
            ...styles.text,
        },
        icon: {
            ...styles.icon,
        }
    }),
    "secondary": StyleSheet.create({
        container: {
            ...styles.container,
            backgroundColor: StylesVariables.mainColor,
        },
        underlayColor: {
            color: StylesVariables.mainColorLight,
        },
        text: {
            ...styles.text,
            color: StylesVariables.whiteColor
        },
        icon: {
            ...styles.icon,
            tintColor: StylesVariables.whiteColor,
        }
    }),
    "third": StyleSheet.create({
        container: {
            ...styles.container,
            backgroundColor: StylesVariables.secondaryColor,
            borderBottomWidth: .5,
            borderBottomColor: 'white'
        },
        underlayColor: {
            color: StylesVariables.mainColorDark,
        },
        text: {
            ...styles.text,
            color: StylesVariables.whiteColor,
        },
        icon: {
            ...styles.icon,
            tintColor: StylesVariables.whiteColor,
        }
    }),
    "white": StyleSheet.create({
        container: {
            ...styles.container,
            backgroundColor: StylesVariables.whiteColor,
        },
        underlayColor: {
            color: StylesVariables.lightGrayColor,
        },
        text: {
            ...styles.text,
            color: StylesVariables.mainColor,
        },
        icon: {
            ...styles.icon,
            tintColor: StylesVariables.mainColor,
        }
    }),
}

const ProfileRow = ({ iconName, color, check = false, title, isActive, onToggle, onPress }) => {
    const bgStyle = theme[color];
    let leftIcon;

    switch (iconName) {
        case 'profile':
            leftIcon = <Image source={profile} style={bgStyle.icon} resizeMode='contain' />;
            break;
        case 'notification':
            leftIcon = <Image source={notification} style={bgStyle.icon} />;
            break;
        case 'contact':
            leftIcon = <Fontisto name="email" size={25} color={bgStyle.icon.tintColor} />;
            break;
        case 'lock':
            leftIcon = <Fontisto name="locked" size={25} color={bgStyle.icon.tintColor} />;
            break;
        case 'doc':
            leftIcon = <Image source={docText} style={bgStyle.icon} resizeMode='contain' />;
            break;
        case 'log-out':
            leftIcon = <Feather name="log-out" size={25} color={StylesVariables.bgStyle.icon.tintColor} />;
            break;
        case 'none':
            leftIcon = null
            break;
    }

    return (
        <TouchableHighlight
            underlayColor={bgStyle.underlayColor}
            onPress={onPress}>
            <View style={bgStyle.container}>
                <View
                    style={{flex: .13}}
                >
                    {iconName !== 'none' && (
                        <View style={styles.icon}>
                            {leftIcon}
                        </View>
                    )}
                </View>
                <View
                    style={{flex: .73}}
                >
                    <Text style={bgStyle.text}>{title}</Text>
                </View>
                <View style={styles.rightCont}>
                    {check ?
                        <Switch
                            trackColor={{ true: StylesVariables.greenColor, false: StylesVariables.redColor }}
                            thumbColor={StylesVariables.whiteColor}
                            ios_backgroundColor={isActive ? StylesVariables.greenColor : StylesVariables.redColor}
                            onValueChange={() => onToggle(!isActive)}
                            value={isActive} />
                        : <MaterialCommunityIcons name="chevron-right" size={25} color={bgStyle.icon.tintColor} />
                    }
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default ProfileRow
