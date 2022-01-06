import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import ModalBase from './modal.layout.component'
import InputText from '../Input/input_text_login.component'
import NormalButton from '../Button/normal_button.component'
import StylesVariables from '../../Styles/app.style'

const styles = StyleSheet.create({
    content: {
        marginHorizontal: 20 * StylesVariables.responsiveMulti,
    },
    inputCont: {
        marginVertical: 20 * StylesVariables.responsiveHeightMulti,
    },
    btn: {
        height: 50 * StylesVariables.responsiveHeightMulti,
        width: "100%",
    }
})

const ModalPhone = ({ OnCloseModal, visible, OnSendPhoneNumber }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <ModalBase
            OnCloseModal={OnCloseModal}
            title="Vous souhaitez partager votre contenu vos contacts ? Suivez les mémos de vos contacts"
            visible={visible}>
            <View style={styles.content}>
                <View style={styles.inputCont}>
                <InputText
                    value={phoneNumber}
                    maxLength={10}
                    placeholder="Numéro de téléphone portable"
                    editable={true}
                    keyboardType='numeric'
                    callback={setPhoneNumber}
                    submiting={() => OnSendPhoneNumber(phoneNumber)} />
                </View>
                <View style={styles.btn}>
                    <NormalButton
                        callback={() => OnSendPhoneNumber(phoneNumber)}
                        isDisabled={phoneNumber === ''}
                        title="Válider"
                        themeName={phoneNumber === '' ? "blue-gray" : "secundary"} />
                </View>
            </View>
        </ModalBase>
    )
}

export default ModalPhone