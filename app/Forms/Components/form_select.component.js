import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StylesVariables from '../../Styles/app.style';
import InputSelectCustom from '../../UIComponents/Input/input_select.custom.component';
import SelectInput from '../../UIComponents/Input/select.input.component';

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        height: 58 * StylesVariables.inputMulti,
        backgroundColor: 'red',
        marginHorizontal: 16
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
})

const sizes = {
    "normal": StyleSheet.create({
        inputCont: {
            width: 242 * StylesVariables.responsiveMulti,
        }
    }),
    "medium": StyleSheet.create({
        inputCont: {
            width: 134 * StylesVariables.responsiveMulti,
        }
    }),
    "small": StyleSheet.create({
        inputCont: {
            width: 88 * StylesVariables.responsiveMulti,
        }
    }),
}

const FormInputSelect = ({
    callback,
    disabled,
    items,
    multiple,
    placeholder,
    required,
    title,
    selectedValue,
    size = "normal",
    custom,
    mRef
}) => {
    return (
        <View style={[styles.container]}>
                {!custom ?
                    <SelectInput
                        disabled={disabled}
                        OnChange={callback}
                        placeholder={placeholder}
                        mRef={mRef}
                        items={items}
                        selectedValue={selectedValue} />
                    : <InputSelectCustom
                        items={items}
                        disabled={disabled}
                        selectedValue={selectedValue}
                        multiple={multiple}
                        placeholder={placeholder}
                        onChange={callback} />
                }
        </View>
    );
}

export default FormInputSelect
