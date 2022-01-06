import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import StylesVariables from '../../Styles/app.style';
import ButtonSmallText from '../Button/button.small_text.component';

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
    autor: {
        ...StylesVariables.appText,
        marginVertical: 8 * StylesVariables.responsiveHeightMulti,
    },
    btnCont: {
        height: 30 * StylesVariables.responsiveHeightMulti,
        width: 180 * StylesVariables.responsiveMulti,
    }
})

const WishListBookTile = ({ book, onDelete }) => {
    return (
            <View style={styles.row}>
                <View style={styles.imageCont}>
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={{ uri: book.image }} />
                </View>
                <View style={styles.descCont}>
                    <Text style={styles.title}>{book.title}</Text>
                    <Text style={styles.autor}>{book.autor}</Text>
                    <View style={styles.btnCont}>
                        <ButtonSmallText 
                            callback={onDelete}
                            title="Supprimer de ma wishlist" />
                    </View>
                </View>
                <View style={{ flex: 1 }} />
            </View>
    )
}

export default WishListBookTile