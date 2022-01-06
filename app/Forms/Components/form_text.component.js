import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StylesVariables from '../../Styles/app.style'
import InputText from '../../UIComponents/Input/input_text.component'

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingLeft: StylesVariables.spacing * 2,
        paddingRight: StylesVariables.spacing * 3
    },
    labelCont: {
        flex: 1,
        justifyContent: "center",
    },
    labelText: {
        ...StylesVariables.appText,
        color: StylesVariables.inputTextColor,
        fontFamily: StylesVariables.mediumFont,
    },
    inputCont: {
        flex: 3,
        flexDirection: "row-reverse",
    }
})

const FormInputText = ({
    callback,
    disabled,
    keyboardType,
    multiline,
    OnFocus,
    placeholder,
    required,
    secure,
    title,
    value,
}) => (
        <View style={styles.container}>
            <View style={styles.labelCont}>
                <Text style={styles.labelText}>{title}{required ? '*' : null}</Text>
            </View>
            <View style={styles.inputCont}>
                <InputText
                    callback={callback}
                    editable={!disabled}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    OnFocus={OnFocus}
                    placeholder={placeholder}
                    secure={secure}
                    value={value} />
            </View>
        </View>
    )

export default FormInputText