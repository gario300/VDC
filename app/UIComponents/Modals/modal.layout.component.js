import React from 'react';
import { StyleSheet, Text, View, Modal, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import StylesVariables from '../../Styles/app.style';
import LoaderMin from './../../Loader/loader_min.component';
import CustomAlertMin from './../../CustomAlert/custom_alert_min.component';

const styles = StyleSheet.create({
    modalBackground: {
        alignItems: "center",
        backgroundColor: StylesVariables.modalBackgroundColor,
        flex: 1,
        justifyContent: "center",
    },
    modalBody: {
        backgroundColor: StylesVariables.whiteColor,
        borderRadius: 23,
        minHeight: 414 * StylesVariables.responsiveHeightMulti,
        maxHeight: StylesVariables.windowHeight - 40,
        width: 330 * StylesVariables.responsiveMulti
    },
    top: {
        height: 50 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'blue',
        backgroundColor: 'transparent',
    },
    closeBtn: {
        height: 42 * StylesVariables.responsiveMulti,
        width: 42 * StylesVariables.responsiveMulti,
        marginHorizontal: StylesVariables.spacing,
        top: StylesVariables.spacing/2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleCont: {
        justifyContent: 'flex-end',
        marginHorizontal: StylesVariables.spacing
    },
    titleText: {
        ...StylesVariables.appTitle,
        fontSize: 23 * StylesVariables.textMulti,
        lineHeight: 32 * StylesVariables.textMulti,
        textAlign: 'center'
    },
    footer: {
        height: StylesVariables.spacing * 3
    }
})

const ModalBase = ({visible, OnCloseModal, title, children}) => {
    
    return (
        <Modal 
            animationType="slide"
            visible={visible}
            transparent={true}
            onRequestClose={OnCloseModal}>
            <SafeAreaView style={styles.modalBackground}>
                <View style={styles.modalBody}>
                    <View style={styles.top}>
                        <TouchableOpacity 
                            onPress={OnCloseModal}
                            underlayColor={StylesVariables.whiteColor}
                            style={styles.closeBtn}>
                            <AntDesign name="close" size={32 * StylesVariables.responsiveMulti} color={StylesVariables.blackColor} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleCont}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                    <View style={styles.childrenCont}>
                        {children}
                    </View>
                    <View style={styles.footer} />
                </View>
                <CustomAlertMin />
                <LoaderMin />
            </SafeAreaView>
        </Modal>
    )
}

export default ModalBase