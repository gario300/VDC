import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import StylesVariables from './../../Styles/app.style';
import { EvilIcons } from '@expo/vector-icons'

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        maxWidth: 295 * StylesVariables.responsiveMulti,
        maxHeight: 50 * StylesVariables.responsiveMulti,
        borderRadius: 30,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    titleContainer: {
        marginRight: StylesVariables.spacing * 2,
        justifyContent: 'center',
    },
    title: {
        ...StylesVariables.appTextMedium,
        fontFamily: StylesVariables.subTitleFont,
        fontSize: StylesVariables.textFontSize - 2
    },
    iconContainer: {
        marginHorizontal: StylesVariables.spacing * 2,
        marginRight: StylesVariables.spacing,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 42
    },
    btnDisabled: {
        opacity: 0.5
    }
});

const themes = {
    "primary": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.mainColor
        },
        underlayColor: {
            color: StylesVariables.whiteColor
        },
        title: {
            ...styles.title,
            color: StylesVariables.textColor,
        },
        icon: {
            ...styles.icon,
            color: StylesVariables.textColor
        }
    }),
    "secundary": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.secondaryColor,
            borderRadius: 12
        },
        underlayColor: {
            color: StylesVariables.secondaryColor
        },
        title: {
            ...styles.title,
            color: StylesVariables.textColor,
        },
        icon: {
            ...styles.icon,
            color: StylesVariables.whiteColor
        }
    }),
    "white": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.whiteColor,
        },
        underlayColor: {
            color: StylesVariables.mainColor
        },
        title: {
            ...styles.title,
            color: StylesVariables.secondaryColor,
        },
        icon: {
            ...styles.icon,
            color: StylesVariables.secondaryColor
        }
    }),
    "blue": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.blueColor,
            borderRadius: 12
        },
        underlayColor: {
            color: StylesVariables.blueColor
        },
        title: {
            ...styles.title,
            color: StylesVariables.textColor,
        },
        icon: {
            ...styles.icon,
            color: StylesVariables.textColor
        }
    })
}

const IconButton = ({ title, callback, icon, isDisabled, themeName }) => {
    const theme = themes[themeName];
    return (
        <TouchableHighlight 
            style={[theme.buttonContainer, isDisabled && styles.btnDisabled]} 
            underlayColor={theme.underlayColor.color}
            onPress={callback}
            disabled={isDisabled}
        >
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    {icon}
                </View>
                <View style={styles.titleContainer}>
                    <Text style={theme.title}>
                        {title}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};
  
export default IconButton;