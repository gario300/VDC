import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        height: 58 * StylesVariables.inputMulti,
        backgroundColor: StylesVariables.whiteColor,
        borderRadius: 10,
        flexDirection: 'row',
        borderBottomWidth: .5,
        borderColor: StylesVariables.grayColor
    },
    textInput: {
        alignSelf: "center",
        ...StylesVariables.appText,
        paddingHorizontal: StylesVariables.spacing * StylesVariables.inputMulti,
        fontSize: StylesVariables.inputFontSize,
        color: StylesVariables.mainColor,
        lineHeight: StylesVariables.inputFontSize + 5,
        width: "100%",
    },
});

const theme = {
    "primary": StyleSheet.create({
        inputContainer: {
            ...styles.inputContainer
        },
    }),
    "secondary": StyleSheet.create({
        inputContainer: {
            ...styles.inputContainer
        },
    }),
    "disabled": StyleSheet.create({
        inputContainer: {
            ...styles.inputContainer
        },
    }),
}

const InputText = ({ 
    value,
    secure,
    maxLength,
    placeholder,
    editable,
    keyboardType,
    callback,
    submiting,
    OnFocus,
    multiline = false,
    Ref,
    color = "primary",
    style, }) => {
    
    const themeStyle = editable ? theme[color] : theme['disabled'];
    return (
        <View style={[
            themeStyle.inputContainer,
            style? style : null ]}>
            <TextInput
                style={[
                    styles.textInput,
                    multiline ? {"alignSelf": "flex-start"} : {"alignSelf": "center"},
                ]}
                secureTextEntry={secure}
                value={value}
                numberOfLines={4}
                multiline={multiline}
                maxLength = {maxLength}
                onChangeText={callback}
                autoCorrect={false}
                placeholder={placeholder}
                placeholderTextColor={StylesVariables.grayColor}
                autoCapitalize={'none'}
                editable={editable}
                returnKeyType={'done'}
                onSubmitEditing={submiting}
                keyboardType={keyboardType !== "undefined" ? keyboardType : 'default'}
                onFocus={OnFocus}
                ref={Ref}
            />            
        </View>
    );
};

export default InputText;
