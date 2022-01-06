import React from 'react';
import { Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import DateTime from '../DateTime/date_time';
import StylesVariables from '../Styles/app.style';

const styles = StyleSheet.create({
    container: {
        backgroundColor: StylesVariables.mainColor,
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 12 * StylesVariables.responsiveHeightMulti,
    },
    imageCont: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 5 * StylesVariables.responsiveMulti,
    },
    image: {
        height: 100 * StylesVariables.responsiveHeightMulti,
        width: 60 * StylesVariables.responsiveMulti,
    },
    descCont: {
        flex: 3,
    },
    titleText: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.whiteColor,
    },
    labelText: {
        ...StylesVariables.appText,
        color: StylesVariables.whiteColor,
        marginVertical: 4 * StylesVariables.responsiveHeightMulti,
        fontFamily: StylesVariables.lightFont,
    },
})

const dateTime = new DateTime();

const HeaderSubscriber = ({ book, onPress }) => {
    const date = dateTime.dateFormatted(dateTime.newDate(book.date));

    return (
        <View style={styles.container}>
            <View style={{flex: .4}} />
            <View style={styles.imageCont}>
                <Image
                    source={{ uri: book.photos['0'] }}
                    style={styles.image}
                    resizeMode="contain" />
                <TouchableHighlight
                    underlayColor={StylesVariables.mainColor}
                    onPress={onPress}>
                    <Text style={styles.labelText}>Voir détails</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.descCont}>
                <Text style={styles.titleText}>{book.title}</Text>
                <Text style={styles.labelText}>{book.author}</Text>
                <Text style={styles.labelText}>Ajouté le {date}</Text>
            </View>
        </View>
    )
}

export default HeaderSubscriber