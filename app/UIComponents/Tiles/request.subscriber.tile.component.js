import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StylesVariables from '../../Styles/app.style';
import ButtonSmallText from '../Button/button.small_text.component';

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderBottomColor: StylesVariables.secondaryColor,
        borderBottomWidth: 0.5,
        flexDirection: "row",
        height: 45 * StylesVariables.responsiveHeightMulti,
        paddingLeft: 25 * StylesVariables.responsiveMulti,
        paddingRight: 15 * StylesVariables.responsiveMulti,
    },
    btnCont: {
        height: 30 * StylesVariables.responsiveHeightMulti,
        width: 100 * StylesVariables.responsiveMulti,
    },
    btnAcept: {
        height: 30 * StylesVariables.responsiveHeightMulti,
        marginHorizontal: 5 * StylesVariables.responsiveMulti,
        width: 90 * StylesVariables.responsiveMulti,
    },
    nameCont: {
        flex: 1,
    },
    subscriberText: {
        ...StylesVariables.appSubTitle,
        fontFamily: StylesVariables.mediumFont,
        fontSize: StylesVariables.textFontSize,
    }
});

const RequestSubscriberTile = ({ subscriber, onAccept, onReject }) => {
    return (
        <View style={styles.container}>
            <View style={styles.nameCont}>
                <Text 
                    ellipsizeMode="tail" 
                    numberOfLines={1} 
                    style={styles.subscriberText}>
                    {subscriber.user.name} {subscriber.user.lastName}
                </Text>
            </View>
            <View style={styles.btnAcept}>
                <ButtonSmallText
                    callback={() => onAccept(subscriber.id)}
                    themeName="blue"
                    title="Confirmer" />
            </View>
            <View style={styles.btnCont}>
                <ButtonSmallText
                    callback={() => onReject(subscriber.id)}
                    title="Supprimer" />
            </View>
        </View>
    )
}

export default RequestSubscriberTile