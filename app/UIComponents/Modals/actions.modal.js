import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import StylesVariables from '../../Styles/app.style'
import ButtonPlus from '../Button/button_plus.component'
import ModalBase from './modal.layout.component'

const styles = StyleSheet.create({
    row: {
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 45 * StylesVariables.responsiveMulti,
        marginVertical: 20 * StylesVariables.responsiveHeightMulti,
    },
    textCont: {
        marginLeft: 20 * StylesVariables.responsiveMulti,
    },
    titleText: {
        ...StylesVariables.appTitle,
        fontFamily: StylesVariables.italicFont,
    }
})

const ActionsModal = ({ OnCloseModal, visible, action }) => {
    const buttons = [
        { title: "Liver", color: "blue", action: 'NewBook' },
        { title: "Mémo", color: "yellow", action: 'NewMemo' },
        { title: "Whislist", color: "dark-blue", action: 'NewWish' },
        { title: "Amis du cercle", color: "black", action: '' },
    ];

    const renderButtons = buttons.map((btn, index) =>
        <TouchableHighlight
            key={`btn_${index}`}
            onPress={() => action(btn.action)}
            underlayColor={StylesVariables.whiteColor}>
            <View style={styles.row}>
                <ButtonPlus
                    onPress={() => action(btn.action)}
                    color={btn.color} />
                <View style={styles.textCont}>
                    <Text style={styles.titleText}>{btn.title}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )

    return (
        <ModalBase
            title="ACTIONS RAPIDES"
            visible={visible}
            OnCloseModal={OnCloseModal}>
            {renderButtons}
        </ModalBase>
    )
}

export default ActionsModal