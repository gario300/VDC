
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import StylesVariables from './../../Styles/app.style';
import { Foundation } from '@expo/vector-icons';

const styles = StyleSheet.create({
    addRemoveButton: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: StylesVariables.secondaryColor,
        width: 48 * StylesVariables.responsiveMulti,
        height: 48 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconAddRemove: {
        color: StylesVariables.textColor,
        fontSize: StylesVariables.textFontSize
    }
});

const AddRemoveButton = ({ type, id, callback }) => {
    if (type === "add") {
        return (
            <TouchableHighlight 
                style={styles.addRemoveButton}
                underlayColor={StylesVariables.secondaryColor}
                onPress={() => {
                    callback(id)
                }}
            >
                <Foundation name="plus" size={styles.iconAddRemove.fontSize} color={styles.iconAddRemove.color} />
            </TouchableHighlight>
        );
    } else {
        return (
            <TouchableHighlight 
                style={styles.addRemoveButton}
                underlayColor={StylesVariables.secondaryColor}
                onPress={() => {
                    callback(id)
                }}
            >
                <Foundation name="minus" size={styles.iconAddRemove.fontSize} color={styles.iconAddRemove.color} />
            </TouchableHighlight>
        );
    }
};

export default AddRemoveButton;