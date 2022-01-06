import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import DateTime from '../../DateTime/date_time';
import StylesVariables from '../../Styles/app.style';
import ModalBase from './modal.layout.component';

const styles = StyleSheet.create({
    container: {
        marginVertical: 10 * StylesVariables.responsiveMulti,
    },
    textCont: {
        marginHorizontal: 10 * StylesVariables.responsiveMulti,
        marginVertical: 20 * StylesVariables.responsiveHeightMulti,
    },
    text: {
        ...StylesVariables.appText,
    },
    descCont: {
        alignSelf: "center",
    },
    descRow: {
        flexDirection: "row",
    },
    label: {
        ...StylesVariables.appText,
        fontFamily: StylesVariables.mediumFont,
    },
    desc: {
        ...StylesVariables.appText,
    },
    imageCont: {
        alignSelf: "center",
        height: 300,
        marginVertical: 10 * StylesVariables.responsiveHeightMulti,
        width: 300,
    }
});

const dateTime = new DateTime();

const ModalMemoPreview = ({ memo, visible, OnCloseModal }) => {
    const created = dateTime.dateFormatted(dateTime.newDate(memo.created));

    let previewContent = null;

    switch (memo.type) {
        case 1:
            previewContent = <View />
            break;
        case 2:
            previewContent = (
                <View style={styles.textCont}>
                    <Text style={styles.text}>{memo.note}</Text>
                </View>
            )
            break;
        case 3:
            previewContent = (
                <View style={styles.imageCont}>
                    <Image
                        source={{ uri: memo.photos["0"]}}
                        style={styles.imageCont}
                        resizeMode="contain" />
                </View>
            )
            break;
    }

    return (
        <ModalBase
            title="MEMO"
            visible={visible}
            OnCloseModal={OnCloseModal}>
            <View style={styles.container}>
                <View style={styles.descCont}>
                    <View style={styles.descRow}>
                        <Text style={styles.label}>Ajouté le : </Text>
                        <Text style={styles.desc}>{created}</Text>
                    </View>
                    <View style={styles.descRow}>
                        <Text style={styles.label}>Détails : </Text>
                        <Text style={styles.desc}>Chapitre {memo.chapter}, p{memo.page}</Text>
                    </View>
                </View>
                {previewContent}
            </View>
        </ModalBase>
    )
}

export default ModalMemoPreview
