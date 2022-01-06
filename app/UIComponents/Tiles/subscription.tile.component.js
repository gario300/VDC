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
        paddingHorizontal: 25 * StylesVariables.responsiveMulti,
    },
    btnCont: {
        height: 30 * StylesVariables.responsiveHeightMulti,
        width: 110 * StylesVariables.responsiveMulti,
    },
    nameCont: {
        flex: 1,
    },
    subscriptionText: {
        ...StylesVariables.appSubTitle,
        fontFamily: StylesVariables.mediumFont,
        fontSize: StylesVariables.textFontSize,
    }
});

const SubscriptionTile = ({ subscription }) => {
    return (
        <View style={styles.container}>
            <View style={styles.nameCont}>
                <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.subscriptionText}>
                    {subscription.user.name} {subscription.user.lastName}
                </Text>
            </View>
            <View style={styles.btnCont}>
                <ButtonSmallText
                    callback={() => { }}
                    title="Abonné" />
            </View>
        </View>
    )
}

export default SubscriptionTile