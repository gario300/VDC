import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import StylesVariables from '../../../Styles/app.style'
import NormalButton from '../../Button/normal_button.component'

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15 * StylesVariables.responsiveMulti,
        height: 450 * StylesVariables.responsiveHeightMulti
    },
    imageCont: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8 * StylesVariables.responsiveHeightMulti,
    },
    image: {
        height: 168 * StylesVariables.responsiveHeightMulti,
        width: 105,
    },
    titleText: {
        ...StylesVariables.appSubTitle,
        alignSelf: "center",
        marginVertical: 8 * StylesVariables.responsiveHeightMulti,
        textAlign: "center",
    },
    autorText: {
        ...StylesVariables.appSubTitle,
        alignSelf: "center",
        fontFamily: StylesVariables.lightFont,
        marginVertical: 4 * StylesVariables.responsiveHeightMulti,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
    },
    infoText: {
        ...StylesVariables.appSubTitle,
        fontFamily: StylesVariables.lightFont,
        marginHorizontal: 30 * StylesVariables.responsiveMulti,
        marginVertical: 4 * StylesVariables.responsiveHeightMulti,
    },
    resumeText: {
        ...StylesVariables.appSubTitle,
        flex: 1,
        fontFamily: StylesVariables.lightFont,
        marginBottom: 8 * StylesVariables.responsiveHeightMulti,
        marginVertical: 4 * StylesVariables.responsiveHeightMulti,
    },
    resumeCont: {
        flex: 1,
        marginVertical: 8 * StylesVariables.responsiveHeightMulti
    },
    buttonCont: {
        height: 50 * StylesVariables.responsiveHeightMulti,
        marginHorizontal: 5 * StylesVariables.responsiveMulti,
        width: 146 * StylesVariables.responsiveMulti,
    }
})

const BookResult = ({ book, onBack, onEnd }) => {
    const onAddBook = () => {
        const data = book;
        onEnd(data);
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageCont}>
                <Image
                    source={{ uri: book.image }}
                    resizeMode="contain"
                    style={styles.image} />
            </View>
            <Text style={styles.titleText}>{book.title}</Text>
            <Text style={styles.autorText}>{book.autor}</Text>
            <View style={styles.row}>
                <Text style={styles.infoText}>{book.numPages} pages</Text>
                <Text style={styles.infoText}>{book.date}</Text>
            </View>
            <ScrollView style={styles.resumeCont}>
                <Text style={styles.resumeText}>{book.resume}</Text>
            </ScrollView>
            <View style={styles.row}>
                <View style={styles.buttonCont}>
                    <NormalButton
                        callback={onBack}
                        themeName="blue-gray"
                        title="<   Précédent" />
                </View>
                <View style={styles.buttonCont}>
                    <NormalButton
                        callback={onAddBook}
                        title="Ajouter à ma wishlist" />
                </View>
            </View>
        </View>
    )
}

export default BookResult