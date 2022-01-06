import React from 'react';
import { Text, View, Modal, Image, StyleSheet, TouchableOpacity } from 'react-native';

import StylesVariables from './../../Styles/app.style';

import { AntDesign, Ionicons } from '@expo/vector-icons'


import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 0 : 0,
        backgroundColor: StylesVariables.backgroundColor
    },
    asideContainer: {
        height: 50 * StylesVariables.responsiveHeightMulti,
        marginVertical: StylesVariables.spacing * 1,
    },
    modalContent: {
        flex: 1
    },
    modalInfo: {
        flex: 1,
        justifyContent: 'space-evenly',
        marginHorizontal: StylesVariables.spacing * 2
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    titleText: {
        ...StylesVariables.appTitle,
        fontSize: StylesVariables.titleFontSize,
        textAlign: 'center',
        alignSelf: 'center',
        color: StylesVariables.secondaryColor
    },
    messageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        maxWidth: StylesVariables.maxWidth,
    },
    messageContainerLarge: {
        flex: 1.5
    },
    messageText: {
        ...StylesVariables.appTextMedium,
        textAlign: 'center',
        fontSize: StylesVariables.textFontSize + 2,
    },
    innerSpace: {
        height: StylesVariables.spacing * StylesVariables.responsiveMulti
    },
    textsContainer: {
        flex: 1,
        justifyContent: "space-around",
    },
    textsContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15 * StylesVariables.responsiveMulti
    },
    iconContainer: {
        justifyContent: 'center',
        paddingHorizontal: 5 * StylesVariables.responsiveMulti
    },
    textIconContainer: {
        paddingHorizontal: 7 * StylesVariables.responsiveMulti,
        justifyContent: 'center'
    },
    textIconText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 2,
        lineHeight: StylesVariables.textLineHeight,
        textAlign: 'center',
        color: StylesVariables.mainColor,
    },
    
    submitButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    conditionsTextContainer: {
        flex: 1,
        maxHeight: 80 * StylesVariables.responsiveMulti,
        justifyContent: 'flex-start'
    },
    conditionsText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 2,
        textAlign: 'center',
        color: StylesVariables.mainColor
    },
    imageContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImg: {
        width: (500/3) * StylesVariables.responsiveMulti,
        height: (500/3) * StylesVariables.responsiveMulti
    },
    mainTextColor: {
        ...StylesVariables.appTitle,
        color: StylesVariables.mainColor,
        fontSize: StylesVariables.titleFontSize - 4,
    },
    emptyView: {
        flex: .1,
    }
});

const SuccessModal = ({ activeModal, OnCloseModal }) => {
    return (
        <Modal
        animationType="slide"
        transparent={false}
        visible={activeModal}
        onRequestClose={() => { }}>
            <SafeAreaView style={styles.modalContainer}>
                <View style={{flex: 1}}>
                    <View style={styles.asideContainer}>
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={OnCloseModal}
                        >
                            <AntDesign name='close' size={42} color={StylesVariables.textSecundaryColor} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalInfo}>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.iconImg}
                                resizeMode={'contain'} 
                                source={require('./../../../assets/logo/logo.png')}
                            />
                        </View>
                        <View style={styles.innerSpace}></View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{`Votre commande a bien été envoyée aux producteurs.`}</Text>
                        </View>
                        <View style={styles.innerSpace}></View>
                        <View style={[styles.messageContainer, styles.messageContainerLarge]}>
                            <Text style={styles.messageText}>{`Vous recevrez dès validation des producteurs et le QR Code de récupération de votre commande.
                            
RDV dans :
MON COMPTE > MES COMMANDES`}</Text>
                        </View>
                        <View style={styles.innerSpace}></View>
                        <View style={styles.messageContainer}>
                            <Text style={[styles.messageText, styles.mainTextColor]}>{`MERCI ! ET A BIENTOT`}</Text>
                        </View>
                        <View style={styles.emptyView}></View>
                    </View>
                    </View>
            </SafeAreaView>
        </Modal>
    )
}

export default SuccessModal;
