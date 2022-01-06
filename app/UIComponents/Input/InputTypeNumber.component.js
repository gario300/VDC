import React, {useState} from "react"
import { TextInput, StyleSheet } from 'react-native'
import StylesVariables from '../../Styles/app.style.js'
import AppStore from '../../Flux/AppStore'

const InputTypeNumber = ({placeholder, valueText, callback, key}) => {

    const numberVerification = (text) => {
        let newText = '';
        let numbers = '0123456789';

        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                AppStore.emit("displayToast", {
                    message: `Veuillez sélectionner une valeur valide`,
                    type: 2
                });
            }
        }
        callback(newText)
    }

    return(
        <TextInput
            style={styles}
            placeholder={placeholder}
            placeholderTextColor={StylesVariables.grayColor}
            value={valueText}
            onChangeText={(value) => {
                numberVerification(value)
            }}
            keyboardType={'numeric'}
        />
    )
}

export default InputTypeNumber

const styles = StyleSheet.create({
    inputNumber: {
        width: '100%',
        padding: StylesVariables.spacing,
        height: 58 * StylesVariables.inputMulti,
        color: StylesVariables.mainColor,
        borderBottomWidth: .5,
        borderColor: StylesVariables.grayColor
    }
})

