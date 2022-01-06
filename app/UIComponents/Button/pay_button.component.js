
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import StylesVariables from './../../Styles/app.style';

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        maxWidth: '90%',
        maxHeight: 60 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.textColor,
        borderRadius: 8,
        flexDirection: 'row'
    },
    btnTextContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 15,
        marginVertical: 2
    },
    buttonText: {
        ...StylesVariables.appTextMedium,
        color: StylesVariables.whiteColor,
        textAlign: 'center'
    }
});

const PayButton = ({ title, callback, isDisabled = false }) => {
    return (
        <TouchableHighlight 
            style={[styles.buttonContainer, isDisabled && {backgroundColor: StylesVariables.textColorLight}]} 
            underlayColor={StylesVariables.mainColor}
            disabled={isDisabled}
            onPress={callback}
        >
            <View style={styles.btnTextContainer}>
                <Text style={styles.buttonText}>
                    {title}
                </Text>
            </View>
        </TouchableHighlight>
    );
};

export default PayButton;