import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StylesVariables from './../../Styles/app.style';

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        backgroundColor: StylesVariables.filterGrayColor,
        borderRadius: 10,
        flexDirection: 'row',
        height: 46 * StylesVariables.responsiveMulti,
        marginHorizontal: 5 * StylesVariables.responsiveMulti
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
        fontFamily: StylesVariables.textFont,
        color: StylesVariables.whiteColor,
        textAlign: 'center',
        fontSize: StylesVariables.textFontSize,
    },
    buttonTextActive: {
        color: StylesVariables.whiteColor,
    }
});

export default FilterButton = ({ title, active, callback, style }) => {
    
    return (
        <TouchableOpacity 
            style={[styles.buttonContainer, style]} 
            activeOpacity={0.85}
            underlayColor={StylesVariables.mainColorOpacity}
            onPress={() => {
                callback();
            }}
        >
            <View style={styles.btnTextContainer}>
                <Text style={[styles.buttonText, {color: style.backgroundColor === styles.buttonText.color ? StylesVariables.mainColor : StylesVariables.whiteColor}]}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
