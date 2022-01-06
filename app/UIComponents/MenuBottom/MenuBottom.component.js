import React from 'react'
import { StyleSheet, Text, Modal, View, Animated, Dimensions, TouchableOpacity, Share } from 'react-native'
import NormalButton from '../Button/normal_button.component'
import StylesVariables from '../../Styles/app.style'
import { AntDesign } from '@expo/vector-icons'; 

const OnSharePressed = async (article) => {
    let message = `Hello:
    iOS: url
    Android: url
    `;
    message += `http://appbeafya.com/mobile/index.html?path=${article.id}`;
    
    //url for testing
    // let message = Linking.makeUrl("publication", {publication: article.id, type: article.type})
    
    try {
        const result = await Share.share({
            message: message,
            title: article.title,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
}
const SelectImageModal = ({ OnCloseModal, visible, partager, onSelectModeur }) => {

    const buttons = [
        { title: "Partager", color: "yellow", action: () => {
            OnSharePressed(partager.id)
        } },
        { title: "Signaler aux modérateurs", color: "yellow", action: onSelectModeur }
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
    },
});
