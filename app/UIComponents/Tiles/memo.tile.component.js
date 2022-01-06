import React, { Fragment, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import DateTime from '../../DateTime/date_time'
import AppIcons from '../../AppIcons/app_icons'
import StylesVariables from '../../Styles/app.style'
import IconButton from '../Button/button_icon.component'
import NewReminderModal from '../Modals/Reminder/new_reminder.momdal'

const styles = StyleSheet.create({
    row: {
        borderBottomColor: StylesVariables.secondaryColor,
        borderBottomWidth: 0.5,
        flexDirection: "row",
        height: 100 * StylesVariables.responsiveMulti,
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
    btnCont: {
        height: 30 * StylesVariables.responsiveHeightMulti,
        width: 120 * StylesVariables.responsiveMulti,
    },
    labelRow: {
        flexDirection: "row",
        marginBottom: 5 * StylesVariables.responsiveHeightMulti,
    },
    iconRightCont: {
        alignItems: "center",
        flex: 1,
    },
    iconRight: {
        tintColor: StylesVariables.redColor,
        height: 32 * StylesVariables.responsiveHeightMulti,
        width: 32 * StylesVariables.responsiveMulti,
    },
})

const iconAudio = require('../../../assets/icons/audio.png');
const iconPhoto = require('../../../assets/icons/photo.png');
const iconNote = require('../../../assets/icons/text.png');
const iconNotif = require('../../../assets/icons/notification.png');
const timeClock = <AppIcons.IconClock />
const dateTime = new DateTime();

const tempReminder = {
    hasReminder: false,
    date: new Date(),
    frequency: 'Tous les jours',
}

const MemoTile = ({ memo, onPress }) => {
    const [showModal, setshowModal] = useState(false);
    const memoDate = dateTime.dateFormatted(dateTime.newDate(memo.created));

    let icon;
    let type = '';

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
                onPress={() => onPress(memo)}>
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
                            <Text style={styles.desc}>{memoDate}</Text>
                        </View>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>Détails : </Text>
                            <Text style={styles.desc}>Chapitre {memo.chapter}, p{memo.page}</Text>
                        </View>
                        <View style={styles.btnCont}>
                            <IconButton
                                callback={() => setshowModal(true)}
                                icon={timeClock}
                                themeName="blue"
                                title="Programmer" 
                            />
                        </View>
                    </View>
                    <View style={styles.iconRightCont} >
                        {/* {memo.reminder.hasReminder ?
                            <Image
                                source={iconNotif}
                                style={styles.iconRight}
                                resizeMode="contain" />
                            : null
                        } */}
                    </View>
                </View>
            </TouchableHighlight>
            <NewReminderModal
                // reminder={memo.reminder}
                reminder={tempReminder}
                edit={tempReminder.hasReminder}
                // edit={memo.reminder.hasReminder}
                OnCloseModal={() => setshowModal(false)}
                visible={showModal} />
        </Fragment>
    )
}

export default MemoTile