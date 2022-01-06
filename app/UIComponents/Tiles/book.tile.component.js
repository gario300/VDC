import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTime from '../../DateTime/date_time';
import StylesVariables from '../../Styles/app.style'

const styles = StyleSheet.create({
    row: {
        borderBottomColor: StylesVariables.secondaryColor,
        borderBottomWidth: 0.5,
        flexDirection: "row",
        height: 130 * StylesVariables.responsiveMulti,
        paddingVertical: 15,
    },
    imageCont: {
        alignItems: "center",
        flex: 2,
        justifyContent: "center",
    },
    image: {
        height: 108 * StylesVariables.responsiveHeightMulti,
        width: 81,
    },
    imageDefault: {
        alignItems: "center",
        borderColor: StylesVariables.textColorLight,
        borderWidth: 0.5,
        height: 108 * StylesVariables.responsiveHeightMulti,
        justifyContent: "center",
        width: 81,
    },
    descCont: {
        justifyContent: "flex-end",
        flex: 4,
    },
    title: {
        ...StylesVariables.appSubTitle,
        position: "absolute",
        top: 0,
    },
    autor: {
        ...StylesVariables.appText,
    },
    start: {
        ...StylesVariables.appText,
    },
    end: {
        ...StylesVariables.appText,
    }
})

const dateTime = new DateTime();

const BookTile = ({ book, onPress }) => {
    const bookDate = dateTime.dateFormatted(dateTime.newDate(book.book.date));

    return (
        <TouchableHighlight 
            underlayColor={StylesVariables.whiteColor}
            onPress={onPress}>
            <View style={styles.row}>
                <View style={styles.imageCont}>
                { book.book.photos.hasOwnProperty("0") ?
                        <Image
                            source={{ uri: book.book.photos["0"] }}
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
                <View style={styles.descCont}>
                    <Text style={styles.title} numberOfLines={2}>{book.book.title}</Text>
                    <Text style={styles.autor}>{book.book.author}</Text>
                    <Text style={styles.start}>Ajouté le {bookDate}</Text>
                    <Text style={styles.end}>Terminé le : {bookDate}</Text>
                </View>
                <View style={{ flex: 1 }} />
            </View>
        </TouchableHighlight>
    )
}

export default BookTile