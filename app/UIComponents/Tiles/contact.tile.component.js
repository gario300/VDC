import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StylesVariables from '../../Styles/app.style';
import ButtonSmallText from '../Button/button.small_text.component';

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 8 * StylesVariables.responsiveHeightMulti,
        paddingHorizontal: 15 * StylesVariables.responsiveMulti,
    },
    nameCont: {
        flex: 1,
    },
    nameText: {
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.textFontSize
    },
    subsText: {
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.textFontSize,
        color: StylesVariables.blueColor,
    },
    buttonsCont: {
        flex: 2,
    },
    btnInvite: {
        alignSelf: "flex-end",
        height: 30 * StylesVariables.responsiveHeightMulti,
        width: 190 * StylesVariables.responsiveMulti,
    },
    btnMemos: {
        height: 30 * StylesVariables.responsiveHeightMulti,
        width: 110 * StylesVariables.responsiveMulti,
    },
    btnAdd: {
        flex: 1,
    },
    buttonsActive: {
        alignItems: "center",
        flexDirection: "row",
    }
})

const ContactTile = ({ contact, onSendSubRequest }) => {
    return (
        <View style={styles.container}>
            <View style={styles.nameCont}>
                <Text ellipsizeMode={"tail"} numberOfLines={1} style={styles.nameText}>{contact.name}</Text>
            </View>
            <View style={styles.buttonsCont}>
                {contact.user !== null ?
                    <View style={styles.buttonsActive}>
                        <View style={styles.btnAdd}>
                            {!contact.isSub ?
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={onSendSubRequest}>
                                    <Text style={styles.subsText}>{"S'abonner"}</Text>
                                </TouchableOpacity>
                                : null
                            }
                        </View>
                        <View style={styles.btnMemos}>
                            <ButtonSmallText
                                callback={() => { }}
                                title="Partager mémos" />
                        </View>
                    </View>
                    : <View style={styles.btnInvite}>
                        <ButtonSmallText
                            callback={() => { }}
                            title="Inviter à télécharger l'app"
                            themeName="blue" />
                    </View>
                }
            </View>
        </View>
    )
}

export default ContactTile
