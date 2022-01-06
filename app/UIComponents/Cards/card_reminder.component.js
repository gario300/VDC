import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

import StylesVariables from './../../Styles/app.style';
import { AntDesign } from '@expo/vector-icons';

import Localization from './../../Localization/localization';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopColor: StylesVariables.mainColor,
        paddingVertical: 5 * StylesVariables.responsiveMulti
    },
    topBorder: {
        borderTopWidth: 1,
        borderTopColor: StylesVariables.mainColor,
    },
    bottomBorder: {
        borderBottomColor: StylesVariables.mainColor,
        borderBottomWidth: 1
    },
    btnSection: {
        flex: 1,
        marginHorizontal: 12 * StylesVariables.responsiveMulti,
        justifyContent: 'space-around'
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row'
    },

    cardImgContainer: {
        flex: .6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImgContent: {
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImg: {
        width: 90 * StylesVariables.responsiveMulti,
        height: 90 * StylesVariables.responsiveMulti
    },
    
    cardInfoContainer: {
        flex: 1,
        marginHorizontal: 5 * StylesVariables.responsiveMulti,
        marginVertical: 8 * StylesVariables.responsiveMulti
    },
    cardTitleContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    cardReminder: {
        flex: 1,
        marginBottom: 5 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
    },
    reminderTitle: {
        flex: 1,
        marginVertical: 5 * StylesVariables.responsiveMulti,    
        justifyContent: 'center',
    },
    reminderTitleText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize,
        color: StylesVariables.textColor,
        fontWeight: '300',
    },
    reminderDate: {
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        maxWidth: 140 * StylesVariables.responsiveMulti,
        borderColor: StylesVariables.fillColor,
        paddingVertical: 2 * StylesVariables.responsiveMulti 
    },
    reminderDateText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 2,
        color: StylesVariables.textColor,
        fontWeight: '600',
        marginHorizontal: 10 * StylesVariables.responsiveMulti
    },
    textBold: {
        fontWeight: '800'
    },
    bottomButtonsContainer: {
        flex: 1,
        height: 45 * StylesVariables.responsiveMulti,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 4 * StylesVariables.responsiveMulti
    },
    innerSpace: {
        height: 6 * StylesVariables.responsiveMulti
    },
    footer: {
        flex: 1,
        height: 15 * StylesVariables.responsiveMulti
    },

    buttonsContent: {
        flex: 1,
        height: 60 * StylesVariables.responsiveMulti,
        justifyContent: 'center'
    },
    buttonsContainer: {
        height: 45 * StylesVariables.responsiveMulti,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iconContainer: {
        justifyContent: 'center',
        marginLeft: 5 * StylesVariables.responsiveMulti
    }
});

export default CardReminder = ({ id, index, OnPress, item }) => {

    return (
        <View style={[styles.container, styles.bottomBorder, index === 0 && styles.topBorder]}>
            <TouchableOpacity 
                    style={[styles.btnSection]}
                    activeOpacity={.5}
                    onPress={() => {
                        OnPress(id)
                    }}
                >
                    <View style={styles.reminderTitle}>
                        <Text style={styles.reminderTitleText}>{item.summary}</Text>
                    </View>
                    <View style={styles.cardReminder}>
                        <View style={styles.reminderDate}>
                            <View style={styles.iconContainer}>
                                <AntDesign name="calendar" size={18} color={StylesVariables.fillColor} />
                            </View>
                            <Text style={styles.reminderDateText}>{item.dateFormatted}</Text>
                        </View>
                    </View>
            </TouchableOpacity>
       </View>
    )

}