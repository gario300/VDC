import React from 'react';
import { Text, View, Modal, Image } from 'react-native';

import styles from './../../Styles/modal_alert.style';

import NavHeadModal from '../../Navigation/NavHead/nav_head_modal.component';

import { SafeAreaView } from 'react-native-safe-area-context';

const WarningModal = ({ activeModal, OnCloseModal, title, message }) => {
    return (
        <Modal
        animationType="slide"
        transparent={false}
        visible={activeModal}
        onRequestClose={() => { }}>
            <SafeAreaView style={styles.modalContainer}>
                <NavHeadModal
                    OnBackPress={OnCloseModal}
                />
                <View style={styles.modalContent}>
                    <View style={styles.modalInfo}>
                    <View style={styles.bottomView}></View>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.iconImg}
                                resizeMode={'contain'} 
                                source={require('./../../../assets/logo/logo.png')}
                            />
                        </View>
                        <View style={styles.innerSpace}></View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{title}</Text>
                        </View>
                        <View style={styles.innerSpace}></View>
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>{message}</Text>
                        </View>
                        <View style={styles.bottomView}></View>
                        <View style={styles.bottomView}></View>
                        <View style={styles.bottomView}></View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default WarningModal;