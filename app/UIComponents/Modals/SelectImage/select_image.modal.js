import React from 'react'
import { StyleSheet, Text, Modal, View, Animated, Dimensions, TouchableOpacity } from 'react-native'
import NormalButton from '../../Button/normal_button.component'
import StylesVariables from '../../../Styles/app.style'
import { AntDesign } from '@expo/vector-icons'; 

const SelectImageModal = ({ OnCloseModal, visible, onSelectImage, onSelectPhoto }) => {

    const buttons = [
        { title: "Prendre une photo", color: "yellow", action: onSelectPhoto },
        { title: "Aller dans mes photos", color: "yellow", action: onSelectImage }
    ];

    const renderButtons = buttons.map((btn, index) =>
        <View 
            key={`btn_si_${index}`}
            style={styles.row}
        >
            <NormalButton
                callback={btn.action}
                color={btn.color} 
                title={btn.title}
            />
        </View>
    )

    return (
        <Modal
            animated
            animationType="slide"
            visible={visible}
            transparent
            onRequestClose={OnCloseModal}>
            <View style={styles.overlay}>
                <Animated.View 
                    style={[styles.container]}
                    useNativeDriver={true}
                >
                    <View 
                        style={styles.top}
                    >
                        <TouchableOpacity 
                            onPress={OnCloseModal}
                            underlayColor={StylesVariables.whiteColor}
                            style={styles.closeBtn}>
                            <AntDesign name="close" size={32 * StylesVariables.responsiveMulti} color={StylesVariables.blackColor} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalBody}>
                        {renderButtons}
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

export default SelectImageModal

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: '#31313101'
    },
    container: {
        backgroundColor: 'white',
        paddingTop: StylesVariables.spacing * 2,
        marginHorizontal: StylesVariables.spacing * StylesVariables.responsiveMulti,
        width: "95%",
        alignSelf: 'center',
        borderTopRightRadius: 12,
        height: StylesVariables.windowHeight / 4,
        borderTopLeftRadius: 12,
        justifyContent: "center",
    },
    modalBody: {
        alignSelf: 'center',
        width: 330 * StylesVariables.responsiveMulti,
        flex: 1,
        justifyContent: 'space-evenly'
    },
    row: {
        flexDirection: "row",
        alignSelf: 'center',
        width: "70%",
        height: 48 * StylesVariables.responsiveHeightMulti
    },
    textCont: {
        marginLeft: 20 * StylesVariables.responsiveMulti,
    },
    titleText: {
        ...StylesVariables.appTitle,
        fontFamily: StylesVariables.italicFont,
    },
    top: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: 50 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
        zIndex: 200
    },
    closeBtn: {
        height: 42 * StylesVariables.responsiveMulti,
        width: 42 * StylesVariables.responsiveMulti,
        marginHorizontal: StylesVariables.spacing,
        top: StylesVariables.spacing/2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});