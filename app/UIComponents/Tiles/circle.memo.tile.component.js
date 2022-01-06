import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import DateTime from '../../DateTime/date_time';
import StylesVariables from '../../Styles/app.style';
import ModalMemoPreview from '../Modals/preview.memo.modal';

const styles = StyleSheet.create({
    container: {
        borderBottomColor: StylesVariables.secondaryColor,
        borderBottomWidth: 0.5,
        width: StylesVariables.windowWidth,
    },
    row: {
        flexDirection: "row",
        height: 100 * StylesVariables.responsiveMulti,
        marginVertical: 10 * StylesVariables.responsiveHeightMulti,
        paddingBottom: 15 * StylesVariables.responsiveHeightMulti,
    },
    iconCont: {
        alignItems: "center",
        flex: 1,
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
        flex: 2,
    },
    label: {
        ...StylesVariables.appText,
    },
    desc: {
        ...StylesVariables.appText,
        fontFamily: StylesVariables.subTitleFont,
    },
    btnCont: {
        height: 30 * StylesVariables.responsiveHeightMulti,
        width: 120 * StylesVariables.responsiveMulti,
    },
    labelRow: {
        flexDirection: "row",
        marginBottom: 5 * StylesVariables.responsiveHeightMulti,
    },
    topRow: {
        alignItems: "center",
        backgroundColor: StylesVariables.secondaryColor,
        flexDirection: "row",
        height: 36 * StylesVariables.responsiveHeightMulti,
        justifyContent: "space-between",
        paddingHorizontal: 24 * StylesVariables.responsiveMulti,
    }
})

const iconAudio = require('../../../assets/icons/audio.png');
const iconPhoto = require('../../../assets/icons/photo.png');
const iconNote = require('../../../assets/icons/text.png');
const dateTime = new DateTime();

const CircleMemoTile = ({ item, onPress }) => {
    const [showModal, setShowModal] = useState(false);
    const created = dateTime.dateFormatted(dateTime.newDate(item.memo.created));

    let icon;
    let type;

    switch (item.memo.type) {
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
            <View style={styles.container}>
                <TouchableHighlight
                    onPress={onPress}
                    underlayColor={StylesVariables.secondaryColor}>
                    <View style={styles.topRow}>
                        <Text style={styles.desc}>
                            {item.user.name} {item.user.lastBame}
                        </Text>
                        <Text style={styles.label}>Ajouté le : {created}</Text>
                    </View>
                </TouchableHighlight>
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
                                <Text style={styles.desc}>{item.book.title}</Text>
                            </View>
                            <View style={styles.labelRow}>
                                <Text style={styles.label}>{item.book.author}</Text>
                            </View>
                            <View style={styles.labelRow}>
                                <Text style={styles.label}>Détails :</Text>
                                <Text style={styles.desc}>
                                    Chapitre {item.memo.chapter}, p{item.memo.page}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
            <ModalMemoPreview
                OnCloseModal={() => setShowModal(false)}
                visible={showModal}
                memo={item.memo} />
        </Fragment>
    )
}

export default CircleMemoTile