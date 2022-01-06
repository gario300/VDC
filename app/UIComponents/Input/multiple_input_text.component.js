import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    inputContainer: {
        width: 310 * StylesVariables.responsiveMulti,
        height: 180 * StylesVariables.inputMulti,
        backgroundColor: StylesVariables.whiteColor,
        borderRadius: 10,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    textInput: {
        flex: 1,
        fontFamily: StylesVariables.mediumFont,
        paddingLeft: 10 * StylesVariables.inputMulti,
        paddingRight: 10 * StylesVariables.inputMulti,
        fontSize: StylesVariables.inputFontSize,
        color: StylesVariables.textColor
    }
});

const MultipleInputText = ({ value, secure, maxLength, placeholder, editable, keyboardType, callback, submiting, OnFocus, multiline, Ref }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={[styles.textInput, styles !== undefined ? styles : {}]}
                secureTextEntry={secure}
                value={value}
                numberOfLines={2}
                multiline={true}
                maxLength = {maxLength}
                onChangeText={callback}
                autoCorrect={false}
                placeholder={placeholder}
                placeholderTextColor={StylesVariables.mainColorLight}
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

export default MultipleInputText;
