import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
})

const theme = {
    "primary": StyleSheet.create({
        inputContainer: {
            ...styles.inputContainer,
            borderColor: StylesVariables.borderColor,
            borderWidth: 0.5,
            backgroundColor: 'white',
            borderRadius: 10,
            overflow: 'hidden',
            height: 50 * StylesVariables.responsiveMulti
        },
    }),
    "disabled": StyleSheet.create({
        inputContainer: {
            ...styles.inputContainer,
            backgroundColor: StylesVariables.backgroundInputColor,
        },
    }),
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: StylesVariables.mediumFont,
        color: StylesVariables.grayDarkColor,
        fontSize: StylesVariables.textFontSize + 1,
        height: 50 * StylesVariables.responsiveMulti,
        paddingHorizontal: StylesVariables.spacing*.5,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.grayDarkColor,
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 1,
        height: 50 * StylesVariables.responsiveMulti,
        paddingHorizontal: StylesVariables.spacing*.5,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
})

const SelectInput = ({
    selectedValue, 
    items, 
    OnChange, 
    disabled, 
    placeholder, 
    mRef,
    icon
}) => {
    const themeStyle = disabled ? theme['disabled'] : theme['primary'];
    const customPlaceholder = {
        label: placeholder,
        value: null,
        color: StylesVariables.inputTextColor,
    }

    return (
        <View style={themeStyle.inputContainer}>

            <View style={{justifyContent: 'center', flexDirection: 'row', alignSelf: 'center', paddingHorizontal: StylesVariables.spacing, paddingRight: StylesVariables.spacing*.5}}>
                {icon()}
            </View>
            
            <View style={{flex: 1, justifyContent: 'center'}}>
                {Platform.OS === "android" && (
                <RNPickerSelect
                    ref={mRef}
                    disabled={disabled}
                    onValueChange={OnChange}
                    placeholder={customPlaceholder}
                    items={items}
                    style={pickerSelectStyles}
                    value={selectedValue} 
                />)
                }

                {Platform.OS === "ios" && (
                <RNPickerSelect
                    ref={mRef}
                    disabled={disabled}
                    onValueChange={OnChange}
                    placeholder={customPlaceholder}
                    items={items}
                    style={pickerSelectStyles}
                    value={selectedValue} />)}

            </View>
        </View>
    )
}

export default SelectInput
