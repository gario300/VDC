import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        width: 110 * StylesVariables.responsiveMulti,
    },
    nameCont: {
        flex: 3,
    },
    followCont: {
        flex: 2,
    },
    followText: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.blueColor,
        fontFamily: StylesVariables.mediumFont,
        fontSize: StylesVariables.textFontSize,
    },
    subscriberText: {
        ...StylesVariables.appSubTitle,
        fontFamily: StylesVariables.mediumFont,
        fontSize: StylesVariables.textFontSize,
    }
});

const SubscriberTile = ({ subscriber, onUnsubscribe, onSubscribe }) => {
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
            <View style={styles.followCont}>
                {subscriber.followed ?
                    null :
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => onSubscribe(subscriber.id)}>
                        <Text style={styles.followText}>S'abonner</Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.btnCont}>
                <ButtonSmallText
                    callback={() => onUnsubscribe(subscriber.id)}
                    title="Supprimer" />
            </View>
        </View>
    )
}

export default SubscriberTile