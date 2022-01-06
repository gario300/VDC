import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    buttonCont: {
        alignItems: "center",
        backgroundColor: StylesVariables.blueColor,
        borderRadius: 25,
        height: 50,
        justifyContent: "center",
        width: 50,
    }
})

const bgColor = {
    "blue": StyleSheet.create({
        buttonCont: {
            ...styles.buttonCont,
        },
        underlayColor: {
            color: StylesVariables.blueColor,
        }
    }),
    "yellow": StyleSheet.create({
        buttonCont: {
            ...styles.buttonCont,
            backgroundColor: StylesVariables.secondaryColor
        },
        underlayColor: {
            color: StylesVariables.secondaryColor,
        }
    }),
    "dark-blue": StyleSheet.create({
        buttonCont: {
            ...styles.buttonCont,
            backgroundColor: StylesVariables.darkBlueColor,
        },
        underlayColor: {
            color: StylesVariables.darkBlueColor,
        }
    }),
    "black": StyleSheet.create({
        buttonCont: {
            ...styles.buttonCont,
            backgroundColor: StylesVariables.mainColor,
        },
        underlayColor: {
            color: StylesVariables.mainColor,
        }
    }),
}

const ButtonPlus = ({onPress, color = "blue", style = null, iconSize = 25 }) => {
    const bgStyles = bgColor[color];

    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor={bgStyles.underlayColor}
            style={[bgStyles.buttonCont, style]}>
            <Octicons name="plus" size={iconSize} color={StylesVariables.whiteColor} />
        </TouchableHighlight>
    )
}

export default ButtonPlus