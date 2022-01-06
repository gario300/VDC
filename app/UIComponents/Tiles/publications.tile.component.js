import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import StylesVariables from '../../Styles/app.style'
import DateTime from '../../DateTime/date_time';

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
    descCont: {
        justifyContent: "flex-start",
        flex: 4,
    },
    title: {
        ...StylesVariables.appSubTitle,
    },
    tileText: {
        ...StylesVariables.appText,
    }
})

const dateTime = new DateTime();

const PublicationsTile = ({ book, onPress }) => {
    const date = dateTime.dateFormatted(dateTime.newDate(book.book.date));
    const isFav = false;

    return (
        <TouchableHighlight
            underlayColor={StylesVariables.whiteColor}
            onPress={onPress}>
            <View style={styles.row}>
                <View style={styles.imageCont}>
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={{ uri: book.book.photos[0] }} />
                </View>
                <View style={styles.descCont}>
                    <Text style={styles.title}>{book.book.title}</Text>
                    <Text style={styles.tileText}>{book.book.author}</Text>
                    <Text style={styles.tileText}>Ajouté le {date}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    {isFav ?
                        <TouchableOpacity
                            underlayColor={StylesVariables.whiteColor}
                            onPress={() => console.log('fav')}>
                            <AntDesign
                                color={StylesVariables.heartColor}
                                name="heart"
                                size={28} />
                        </TouchableOpacity>
                        : <TouchableOpacity
                            underlayColor={StylesVariables.whiteColor}
                            onPress={() => console.log('fav')}>
                            <AntDesign
                                color={StylesVariables.heartColor}
                                name="hearto"
                                size={28} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default PublicationsTile