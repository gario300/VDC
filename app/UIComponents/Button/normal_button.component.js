
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import StylesVariables from './../../Styles/app.style';

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        maxWidth: 335 * StylesVariables.responsiveMulti,
        maxHeight: 60 * StylesVariables.responsiveMulti,
        borderRadius: 10,
        backgroundColor: StylesVariables.mainColor,
        flexDirection: 'row'
    },
    btnTextContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 15,
        marginVertical: 2
    },
    buttonText: {
        ...StylesVariables.appTextInput,
        color: StylesVariables.whiteColor,
        textAlign: 'center'
    }
});

const themes = {
    "primary": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.secondaryColor,
        },
        underlayColor: {
            color: StylesVariables.lightGrayColor
        },
        buttonText: {
            ...styles.buttonText,
            color: "white"
        }
    }),
    "secundary": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor:  StylesVariables.grayDarkColor, 
            borderBottomWidth: .5,
            borderBottomColor: 'white'
        },
        underlayColor: {
            color: '#fafafa11'
        },
        buttonText: {
            ...styles.buttonText,
            color: StylesVariables.whiteColor
        }
    }),
    "white": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.whiteColor,
        },
        underlayColor: {
            color: StylesVariables.lightGrayColor
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
            color: StylesVariables.blueColor,
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
            color: StylesVariables.lightGrayColor,
        },
        buttonText: {
            ...styles.buttonText,
            color: StylesVariables.mainColor,
        }
    }),
    "disabled": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.btnDisabled,
        },
        underlayColor: {
            color: StylesVariables.lightGrayColor,
        },
        buttonText: {
            ...styles.buttonText,
            color: StylesVariables.mainColor,
        }
    }),
}

const NormalButton = ({ title, callback, themeName = "white", isDisabled = false }) => {
    const theme = themes[isDisabled ? 'disabled' : themeName];
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

export default NormalButton;
