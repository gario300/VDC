import { StyleSheet } from 'react-native';
import StylesVariables from '../../Styles/app.style';

export default StyleSheet.create({
    container: {
        minHeight: 180 * StylesVariables.responsiveHeightMulti,
        width: StylesVariables.windowWidth,
    },
    tagsRow: {
        flexDirection: "row",
        marginHorizontal: StylesVariables.spacing * 2,
        marginVertical: StylesVariables.spacing * 1.5,
    },
    tag: {
        marginRight: StylesVariables.spacing,
    },
    titleCardCont: {
        paddingHorizontal: StylesVariables.spacing * 2,
    },
    titleText: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.cardTitleTextColor,
    },
    descCont: {
        paddingHorizontal: StylesVariables.spacing * 2,
        paddingVertical: StylesVariables.spacing * 1.5,
    },
    descText: {
        ...StylesVariables.appText,
        color: StylesVariables.cardTextColor,
    },
    authorCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: StylesVariables.spacing * 2,
        marginBottom: StylesVariables.spacing * 1.5,
    },
    authorText: {
        ...StylesVariables.appText,
        color: StylesVariables.cardTextColor,
        fontSize: StylesVariables.smallFontSize,
    },
    footCont: {
        alignItems: "center",
        backgroundColor: StylesVariables.whiteColor,
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: 50 * StylesVariables.responsiveHeightMulti,
    },
    imageCont: {
        height: 165 * StylesVariables.responsiveHeightMulti,
        width: StylesVariables.windowWidth,
    },
    imageArticle: {
        height: 140 * StylesVariables.responsiveHeightMulti,
        width: 140 * StylesVariables.responsiveMulti,
    },
    imageSearch: {
        height: 100 * StylesVariables.responsiveHeightMulti,
        width: 100 * StylesVariables.responsiveMulti,
    },
    imageSearchCont: {
        marginLeft: StylesVariables.spacing * 2,
        marginVertical: StylesVariables.spacing,
    },
    articleRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        color: StylesVariables.cardTextColor,
        height: 25 * StylesVariables.responsiveHeightMulti,
        marginRight: StylesVariables.spacing,
        width: 25 * StylesVariables.responsiveHeightMulti,
    },
    separator: {
        height: 3,
        backgroundColor: StylesVariables.backgroundInputLogin
    },
    downloadBtn: {
        backgroundColor: 'transparent'
    },
    downloadBtnDisabled: {
        color: StylesVariables.lightGrayColor
    },
    footerText: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.cardTextColor,
        fontSize: StylesVariables.textFontSize,
    }
});
