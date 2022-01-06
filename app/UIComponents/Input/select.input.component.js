import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import StylesVariables from '../../Styles/app.style';
import { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'transparent',
        justifyContent: "center",
        alignSelf: 'center',
        width: 310 * StylesVariables.responsiveMulti,
        height: 58 * StylesVariables.inputMulti,
    },
})

const theme = {
    "primary": StyleSheet.create({
        inputContainer: {
            ...styles.inputContainer,
            width: 310 * StylesVariables.responsiveMulti,
            height: 58 * StylesVariables.inputMulti,
            backgroundColor: 'white',
            borderRadius: 10
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
        color: StylesVariables.mainColor,
        fontFamily: StylesVariables.mediumFont,
        fontSize: StylesVariables.inputFontSize,
        lineHeight: StylesVariables.inputFontSize + 5,
        height: 50,
        marginHorizontal: StylesVariables.spacing,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        color: StylesVariables.mainColor,
        fontFamily: StylesVariables.mediumFont,
        fontSize: StylesVariables.inputFontSize,
        lineHeight: StylesVariables.inputFontSize + 5,
        height: 50,
        marginHorizontal: StylesVariables.spacing,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 15,
        right: 5
    },
    placeholder: {
        color: StylesVariables.mainColorLight,
        fontWeight: 'bold',
    },
})

const SelectInput = ({selectedValue, items, OnChange, disabled, placeholder, mRef}) => {
    const themeStyle = disabled ? theme['disabled'] : theme['primary'];
    const customPlaceholder = {
        label: placeholder,
        value: null,
        color: StylesVariables.inputTextColor,
    }

    return (
        <View style={themeStyle.inputContainer}>
            {Platform.OS === "android" && (
            <RNPickerSelect
                ref={mRef}
                disabled={disabled}
                onValueChange={OnChange}
                placeholder={customPlaceholder}
                items={items}
                style={pickerSelectStyles}
                value={selectedValue} 
                Icon={() => <Feather
                    name="chevron-down"
                    size={24}
                    color={StylesVariables.textColor} 
                    />
                }
                />)}

            {Platform.OS === "ios" && (
                <RNPickerSelect
                    ref={mRef}
                    disabled={disabled}
                    onValueChange={OnChange}
                    items={items}
                    style={pickerSelectStyles}
                    value={selectedValue} 
                    Icon={() => <Feather
                        name="chevron-down"
                        size={24}
                        color={StylesVariables.textColor} 
                        />
                    }
                />
            )}

        </View>
    )
}

export default SelectInput
