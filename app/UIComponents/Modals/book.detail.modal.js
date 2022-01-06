import React from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTime from '../../DateTime/date_time';
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    areaContainer: {
        flex: 1,
        backgroundColor: StylesVariables.modalBookColor,
    },
    closeBtn: {
        top: 20 * StylesVariables.responsiveHeightMulti,
        left: 24 * StylesVariables.responsiveMulti,
        position: "absolute",
        zIndex: 10,
    },
    container: {
        flex: 1,
        paddingBottom: 20 * StylesVariables.responsiveHeightMulti,
        paddingTop: 50 * StylesVariables.responsiveHeightMulti,
    },
    row: {
        flexDirection: "row",
        paddingHorizontal: 20 * StylesVariables.responsiveMulti,
    },
    imageCont: {
        alignSelf: "center",
        marginVertical: 10 * StylesVariables.responsiveHeightMulti,
    },
    image: {
        height: 160 * StylesVariables.responsiveHeightMulti,
        width: 100 * StylesVariables.responsiveMulti,
    },
    imageDefault: {
        alignItems: "center",
        borderColor: StylesVariables.textColorLight,
        borderWidth: 0.5,
        height: 160 * StylesVariables.responsiveHeightMulti,
        justifyContent: "center",
        width: 100 * StylesVariables.responsiveMulti,
    },
    title: {
        ...StylesVariables.appSubTitle,
        textAlign: "center",
        paddingHorizontal: 20 * StylesVariables.responsiveMulti,
    },
    autor: {
        ...StylesVariables.appText,
        alignSelf: "center",
    },
    subtitleCont: {
        alignSelf: "center",
        marginVertical: 10 * StylesVariables.responsiveHeightMulti,
    },
    subtitle: {
        ...StylesVariables.appSubTitle,
        fontFamily: StylesVariables.mediumFont,
        fontSize: StylesVariables.subTitleFontSize + 2.5,
    },
    resumeCont: {
        flex: 1,
        overflow: "hidden",
        paddingLeft: 20 * StylesVariables.responsiveMulti,
        paddingRight: 10 * StylesVariables.responsiveMulti,
    },
    resume: {
        ...StylesVariables.appText,
    },
    labelRow: {
        ...StylesVariables.appSubTitle,
        fontFamily: StylesVariables.lightFont,
    },
    descRow: {
        ...StylesVariables.appSubTitle,
        fontFamily: StylesVariables.mediumFont,
    }
})

const dateTime = new DateTime();

const BookDetailModal = ({ OnCloseModal, visible, book }) => {
    const bookDate = dateTime.dateFormatted(dateTime.newDate(book.date));

    return (
        <Modal
            animationType="slide"
            onRequestClose={OnCloseModal}
            visible={visible}>
            <SafeAreaView style={styles.areaContainer}>
                <TouchableOpacity
                    onPress={OnCloseModal}
                    style={styles.closeBtn}>
                    <AntDesign
                        name="close"
                        size={32 * StylesVariables.responsiveMulti}
                        color={StylesVariables.textColor} />
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text style={styles.title}>{book.title}</Text>
                    <Text style={styles.autor}>{book.author}</Text>
                    <View style={styles.imageCont}>
                    { book.photos.hasOwnProperty("0") ?
                        <Image
                            source={{ uri: book.photos["0"] }}
                            style={styles.image}
                            resizeMode="contain" />
                        :
                        <View style={styles.imageDefault}>
                            <MaterialCommunityIcons 
                                name="image-off"
                                size={50}
                                color={styles.imageDefault.borderColor} />
                        </View>
                    }
                    </View>
                    <View style={styles.subtitleCont}>
                    <Text style={styles.subtitle}>Résumé</Text>
                </View>
                <View style={styles.resumeCont}>
                    <Text style={styles.resume}>{book.resume}</Text>
                </View>
                <View style={styles.subtitleCont}>
                    <Text style={styles.subtitle}>Détails</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.labelRow}>Page : </Text>
                    <Text style={styles.descRow}>{book.pages}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.labelRow}>Date de parution : </Text>
                    <Text style={styles.descRow}>{bookDate}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.labelRow}>ISBN : </Text>
                    <Text style={styles.descRow}>{book.isbn}</Text>
                </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default BookDetailModal