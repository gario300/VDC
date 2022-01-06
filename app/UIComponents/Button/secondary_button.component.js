import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import StylesVariables from './../../Styles/app.style';

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        maxWidth: 288 * StylesVariables.responsiveMulti,
        maxHeight: 50 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.secondaryColor,
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

const SecondaryButton = ({ title, callback }) => {
    return (
        <TouchableHighlight 
            style={styles.buttonContainer} 
            underlayColor={StylesVariables.borderColor}
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

export default SecondaryButton;
