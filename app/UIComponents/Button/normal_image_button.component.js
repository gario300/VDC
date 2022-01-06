import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import StylesVariables from './../../Styles/app.style';

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        maxWidth: 310 * StylesVariables.responsiveMulti,
        height: 55 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.mainColor,
        borderRadius: 10,
        flexDirection: 'row'
    },
    buttonDeactive: {
        borderColor: StylesVariables.mainColorLight,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    iconContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        flex: 3,
        justifyContent: 'center',
    },
    title: {
        color: StylesVariables.whiteColor,
        fontFamily: StylesVariables.mediumFont,
        fontSize: StylesVariables.textFontSize + 1
    },
    iconImg: {
        width: 30 * StylesVariables.responsiveMulti,
        height: 30 * StylesVariables.responsiveMulti,
        tintColor: StylesVariables.whiteColor
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const themes = {
    "primary": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.secondaryColor
        },
        underlayColor: {
            color: StylesVariables.mainColor
        },
        title: {
            ...styles.title,
            color: StylesVariables.whiteColor,
        },
        iconImg: {
            ...styles.icon,
            color: StylesVariables.whiteColor
        }
    }),
    "secondary": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.whiteColor
        },
        underlayColor: {
            color: StylesVariables.lightWhiteColor
        },
        title: {
            ...styles.title,
            color: StylesVariables.textColor,
        },
        iconImg: {
            ...styles.iconImg,
            tintColor: StylesVariables.secondaryColor
        }
    })
}

const NormalImageButton = ({ 
    theme = "primary",
    title, 
    callback, 
    disabled, 
    icon,
    customIcon = null
}) => {
    const aTheme = themes[theme];
    return (
        <TouchableHighlight 
            style={[aTheme.buttonContainer, disabled && styles.buttonDeactive]} 
            underlayColor={disabled ? 'transparent' : aTheme.underlayColor.color}
            onPress={disabled ? () => {} : callback}
        >
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    {customIcon === null && <Image
                        style={aTheme.iconImg}
                        resizeMode={'contain'} 
                        source={icon}
                    />}
                    {customIcon !== null && customIcon}
                </View>
                <View style={styles.titleContainer}>
                    <Text style={aTheme.title}>
                        {title}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};
  
export default NormalImageButton;