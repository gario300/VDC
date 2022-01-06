import React from 'react'
import { TextInput, StyleSheet, Text, View } from 'react-native'
import StylesVariables from '../../Styles/app.style'

const InputText = ({value, Icon, callBack, placeholder, id, type = "default"}) => {
    return(
    <View style={styles.container}>
        <View style={{justifyContent: 'center', flexDirection: 'row', alignSelf: 'center', paddingHorizontal: StylesVariables.spacing, paddingRight: StylesVariables.spacing}}>
            {Icon()}
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={text=>{
                    callBack(text, id)
                }}
                keyboardType={type}
                style={styles.input}
            />
        </View>
    </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50 * StylesVariables.responsiveMulti,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: StylesVariables.grayDarkColor,
        overflow: 'hidden',
        backgroundColor: StylesVariables.whiteColor
    },
    input: {
        width: '100%',
        height: 50 * StylesVariables.responsiveMulti,
        flexDirection: 'row',
        color: StylesVariables.grayDarkColor,
        backgroundColor: StylesVariables.whiteColor,
        overflow: 'hidden'
    },
})
