import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import DateTime from '../../DateTime/date_time';
import StylesVariables from '../../Styles/app.style';
import ModalMemoPreview from '../Modals/preview.memo.modal';

const styles = StyleSheet.create({
    row: {
        borderBottomColor: StylesVariables.secondaryColor,
        borderBottomWidth: 0.5,
        flexDirection: "row",
        height: 88 * StylesVariables.responsiveMulti,
        paddingVertical: 15,
    },
    iconCont: {
        alignItems: "center",
        flex: 2,
        justifyContent: "center",
    },
    iconBorder: {
        alignItems: "center",
        borderColor: StylesVariables.mainColor,
        borderRadius: 33,
        borderWidth: 1,
        height: 66,
        justifyContent: "center",
        width: 66,
    },
    icon: {
        height: 32 * StylesVariables.responsiveHeightMulti,
        width: 32 * StylesVariables.responsiveMulti,
    },
    descCont: {
        justifyContent: "flex-end",
        flex: 4,
    },
    label: {
        ...StylesVariables.appText,
    },
    desc: {
        ...StylesVariables.appText,
        fontFamily: StylesVariables.subTitleFont,
    },
    labelRow: {
        flexDirection: "row",
        marginBottom: 5 * StylesVariables.responsiveHeightMulti,
    },
})

const iconAudio = require('../../../assets/icons/audio.png');
const iconPhoto = require('../../../assets/icons/photo.png');
const iconNote = require('../../../assets/icons/text.png');
const dateTime = new DateTime();

const SubscriptionMemoTile = ({ memo }) => {
    const [showModal, setShowModal] = useState(false);
    const created = dateTime.dateFormatted(dateTime.newDate(memo.created));

    let icon;
    let type;

    switch (memo.type) {
        case 1:
            icon = iconAudio;
            type = 'Audio';
            break;
        case 2:
            icon = iconNote;
            type = 'Note';
            break;
        case 3:
            icon = iconPhoto;
            type = 'Photo';
            break;
    }

    return (
        <Fragment>
            <TouchableHighlight
                underlayColor={StylesVariables.whiteColor}
                onPress={() => setShowModal(true)}>
                <View style={styles.row}>
                    <View style={styles.iconCont}>
                        <View style={styles.iconBorder}>
                            <Image
                                resizeMode="contain"
                                style={styles.icon}
                                source={icon} />
                            <Text style={styles.label}>{type}</Text>
                        </View>
                    </View>
                    <View style={styles.descCont}>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>Ajouté le </Text>
                            <Text style={styles.desc}>{created}</Text>
                        </View>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>Détails : </Text>
                            <Text style={styles.desc}>
                            Chapitre {memo.chapter}, p{memo.page}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
            </TouchableHighlight>
            <ModalMemoPreview
                OnCloseModal={() => setShowModal(false)}
                visible={showModal}
                memo={memo} />
        </Fragment>
    )
}

export default SubscriptionMemoTile