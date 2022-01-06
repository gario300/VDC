import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StylesVariables from '../../Styles/app.style'
import InputDateModal from '../../UIComponents/Input/input_date.modal.component'

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

const FormInputDate = ({
    callback,
    disabled,
    placeholder,
    required,
    title,
    value,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.labelCont}>
                <Text style={styles.labelText}>{title}{required ? '*' : null}</Text>
            </View>
            <View style={styles.inputCont}>
                <InputDateModal
                    disabled={disabled}
                    OnDateChange={callback}
                    placeholder={placeholder}
                    value={value} />
            </View>
        </View>
    )
}

export default FormInputDate
