
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        maxWidth: 295 * StylesVariables.responsiveMulti,
        maxHeight: 50 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.mainColor,
        borderRadius: 8,
        flexDirection: 'row'
    },
    btnTextContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 5,
        marginVertical: 2
    },
    buttonText: {
        ...StylesVariables.appTextInput,
        color: StylesVariables.whiteColor,
        fontSize: StylesVariables.textFontSize - 2,
        fontFamily: StylesVariables.mediumFont,
        textAlign: 'center'
    }
});

const themes = {
    "primary": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.mainColor,
        },
        underlayColor: {
            color: StylesVariables.secondaryColor
        },
        buttonText: {
            ...styles.buttonText,
            color: "white"
        }
    }),
    "secundary": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.secondaryColor,
            borderRadius: 8
        },
        underlayColor: {
            color: StylesVariables.secondaryColor + "CC"
        },
        buttonText: {
            ...styles.buttonText,
            color: StylesVariables.mainColor
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
        buttonText: {
            ...styles.buttonText,
            color: StylesVariables.mainColor
        }
    }),
    "blue-gray": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.blueGrayColor,
        },
        underlayColor: {
            color: StylesVariables.blueGrayColor,
        },
        buttonText: {
            ...styles.buttonText,
            color: StylesVariables.mainColor,
        }
    }),
    "blue": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.blueColor,
        },
        underlayColor: {
            color: StylesVariables.blueColor,
        },
        buttonText: {
            ...styles.buttonText,
            fontSize: StylesVariables.textFontSize - 2,
            color: StylesVariables.mainColor,
        }
    }),
}

const ButtonSmallText = ({ title, callback, themeName = "secundary", isDisabled = false }) => {
    const theme = themes[themeName];
    return (
        <TouchableHighlight 
            style={theme.buttonContainer} 
            underlayColor={theme.underlayColor.color}
            disabled={isDisabled}
            onPress={callback}
        >
            <View style={styles.btnTextContainer}>
                <Text style={theme.buttonText}>
                    {title}
                </Text>
            </View>
        </TouchableHighlight>
    );
};

export default ButtonSmallText;