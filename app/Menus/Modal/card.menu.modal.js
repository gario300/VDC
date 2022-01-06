import React from 'react'
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import Localization from '../../Localization/localization';
import StylesVariables from '../../Styles/app.style'

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        height: 80 * StylesVariables.responsiveHeightMulti,
        paddingHorizontal: StylesVariables.spacing,
        paddingRight: StylesVariables.spacing * 1,
        width: 175 * StylesVariables.responsiveMulti,
    },
    labelText: {
        flex: 1,
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.subTitleFontSize - 4
    },
    menuIcon: {
        height: 32,
        marginRight: StylesVariables.spacing,
        tintColor: StylesVariables.whiteColor,
        width: 32,
    },
})

const MenuModalCard = ({ bgColor, onPress, title }) => {
    let icon = null;
    switch (title) {
        case 1:
        case 'cat1':
        case 'cardio':
            icon = require(`../../../assets/icons/tags/heart-pulse.png`);
            break;
        case 2:
        case 'cat2':
        case 'diabete':
            icon = require(`../../../assets/icons/tags/syringe.png`);
            break;
        case 3:
        case 'cat3':
        case 'aff_resp':
            icon = require(`../../../assets/icons/tags/lung.png`);
            break;
        case 4:
        case 'cat4':
        case 'cancer':
            icon = require(`../../../assets/icons/tags/cancer.png`);
            break;
        case 5:
        case 'cat5':
        case 'drepan':
            icon = require(`../../../assets/icons/tags/blood-sample.png`);
            break;
        case 6:
        case 'cat6':
        case 'hypert':
            icon = require(`../../../assets/icons/tags/pulse.png`);
            break;
        case 7:
        case 'cat7':
        case 'child_maladies':
            icon = require(`../../../assets/icons/tags/baby.png`);
            break;
        case 8:
        case 'cat8':
        case 'autre':
            icon = require(`../../../assets/icons/tags/other.png`);
            break;
        case 9:
        case 'cat9':
            icon = require(`../../../assets/icons/tags/mental-health.png`);
            break;
    }

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
            <View style={[styles.container, {backgroundColor: StylesVariables.menuCardColors[bgColor]}]}>
                <Image
                    resizeMode='contain'
                    source={icon}
                    style={styles.menuIcon} />
                <Text style={styles.labelText}>{Localization.word(title)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MenuModalCard