import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Localization from '../../Localization/localization';
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    tagContainer: {
        alignItems: "center",
        borderRadius: 29,
        flexDirection: "row",
        height: 36 * StylesVariables.responsiveHeightMulti,
        maxWidth: 300 * StylesVariables.responsiveMulti,
        minWidth: 113 * StylesVariables.responsiveMulti,
        paddingHorizontal: StylesVariables.spacing * 1.5
    },
    tagIcon: {
        height: 25,
        marginRight: StylesVariables.spacing,
        tintColor: StylesVariables.whiteColor,
        width: 25,
    },
    tagText: {
        ...StylesVariables.appText,
        color: StylesVariables.whiteColor,
        fontSize: StylesVariables.textFontSize - 1
    },
    categoryTag: {
        backgroundColor: StylesVariables.tagBgColor[0],
    },
    typeTag: {
        backgroundColor: StylesVariables.tagBgColor[1]
    },
})

const Tag = ({
    title,
    category = false,
    type = false,
    style = null,
}) => {
    let icon = null;
    if (category) {
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
            case 'infartus':
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
    } else if (type) {
        switch (title) {
            case 1:
            case 'audio':
            case 'podcast':
                icon = require(`../../../assets/icons/tags/audio.png`);
                break;
            case 2:
            case 'video':
                icon = require(`../../../assets/icons/tags/video.png`);
                break;
            case 3:
            case 'article':
                icon = require(`../../../assets/icons/tags/article.png`);
                break;
        }
    }

    return (
        <View 
            style={[
                styles.tagContainer,
                type ? styles.typeTag : styles.categoryTag,
                style]}>
            <Image
                resizeMode="contain"
                source={icon}
                style={styles.tagIcon} />
            <Text 
                style={styles.tagText}
            >
                {Localization.word(title)}
            </Text>
        </View>
    )
}

export default Tag