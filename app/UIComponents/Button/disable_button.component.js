import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import StylesVariables from './../../Styles/app.style';

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        maxWidth: 310 * StylesVariables.responsiveMulti,
        maxHeight: 46 * StylesVariables.responsiveMulti,
        backgroundColor: 'transparent',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: StylesVariables.mainColor,
        flexDirection: 'row'
    },
    buttonContainerActive: {
        flex: 1,
        backgroundColor: StylesVariables.mainColor,
    },
    btnTextContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 15,
        marginVertical: 2
    },
    buttonText: {
        color: StylesVariables.mainColor,
        textAlign: 'center',
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.inputFontSize + 1
    },
    buttonTextActive: {
        color: StylesVariables.whiteColor,
    }
});

const DisableButton = ({ title, active, callback }) => {
    
    return (
        <TouchableHighlight 
            style={[styles.buttonContainer, active && styles.buttonContainerActive]} 
            underlayColor={(active) ? StylesVariables.mainColorOpacity : "transparent"}
            onPress={() => {
                if (active) {
                    callback();
                }
            }}
        >
            <View style={styles.btnTextContainer}>
                <Text style={[{...styles.buttonText, color: active ? StylesVariables.whiteColor : StylesVariables.mainColor}]}>
                    {title}
                </Text>
            </View>
        </TouchableHighlight>
    );
};

export default DisableButton;