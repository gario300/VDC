import { StyleSheet } from "react-native";
import StylesVariables from "../Styles/app.style";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StylesVariables.whiteColor,
    },
    topContent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 62 * StylesVariables.responsiveHeightMulti,
    },
    tagRowContainer: {
        flex: 1,
        paddingVertical: 2,
        marginLeft: StylesVariables.spacing * 2
    },
    closeIcon: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: StylesVariables.spacing / 2,
        height: 42 * StylesVariables.responsiveHeightMulti,
        maxHeight: 42 * StylesVariables.responsiveHeightMulti,
        tintColor: StylesVariables.textSecundaryColor,
        //position: "absolute",
    },
    closeBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: StylesVariables.whiteColor,
        height: 42 * StylesVariables.responsiveHeightMulti,
        width: 54 * StylesVariables.responsiveHeightMulti
    },
    titleHeaderRow: {
        marginBottom: StylesVariables.spacing,
        marginHorizontal: StylesVariables.spacing * 1.5,
    },
    titleText: {
        ...StylesVariables.appTitle,
        color: StylesVariables.textSecundaryColor,
    },
    descContainer: {
        padding: StylesVariables.spacing * 1.5
    },
    videoHeaderRow: {
        padding: StylesVariables.spacing * 1.5
    },
    videoLogosRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    videoLogo: {
        height: 90 * StylesVariables.responsiveHeightMulti,
        tintColor: StylesVariables.whiteColor,
        width: 90 * StylesVariables.responsiveHeightMulti,
    },
    videoLogoMin: {
        height: 40 * StylesVariables.responsiveHeightMulti,
        tintColor: StylesVariables.whiteColor,
        width: 40 * StylesVariables.responsiveHeightMulti,
    },
    videoLogoMinContainer: {
        height: 60 * StylesVariables.responsiveHeightMulti, 
        width: 70,
        alignItems: 'center',
        justifyContent: 'center', 
        alignSelf: 'flex-start' 
    },
    videoCloseIcon: {
        height: 32 * StylesVariables.responsiveHeightMulti,
        tintColor: StylesVariables.whiteColor,
        width: 32 * StylesVariables.responsiveHeightMulti,
    },
    videoTitleText: {
        ...StylesVariables.appTitle,
        marginBottom: StylesVariables.spacing * 1.5,
    },
    videoImage: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        width: StylesVariables.windowWidth,
    },
    videoImageBack: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        top: 0,
        width: StylesVariables.windowWidth,
    },
    videoAuthorText: {
        ...StylesVariables.appText,
        fontSize: StylesVariables.smallFontSize,
    },
    videoFooterContainer: {
        backgroundColor: StylesVariables.mainColor,
        borderRadius: 12.5,
        alignSelf: 'flex-end',
        width: StylesVariables.windowWidth,
    },
    emptyText: {
        flex: 5,
        alignSelf: 'center',
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 1,
        color: StylesVariables.cardTextColor,
        fontWeight: '800',
    },
    emptyListCont: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: StylesVariables.spacing * 5,
    },
    emptyIcon: {
        height: 32 * StylesVariables.responsiveHeightMulti,
        tintColor: StylesVariables.textSecundaryColor,
        width: 32 * StylesVariables.responsiveHeightMulti,
    },
    authorCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: StylesVariables.spacing * 0,
        marginBottom: StylesVariables.spacing * 1.5,
    },
    descText: {
        ...StylesVariables.appText,
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 1,
        color: StylesVariables.cardTextColor,
        fontWeight: "500"
    }
})