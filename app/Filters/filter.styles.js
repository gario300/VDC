import { StyleSheet } from 'react-native';
import StylesVariables from '../Styles/app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: StylesVariables.windowWidth,
        height: StylesVariables.windowHeight,
        zIndex: -1
    },
    filterHeader: {
        backgroundColor: StylesVariables.backgroundInputLogin,
    },
    filterCloseIconRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: StylesVariables.spacing * 1.5,
        marginTop: StylesVariables.spacing * 1.5,
        width: StylesVariables.windowWidth,
    },
    filterTitleCont: {
        paddingHorizontal: StylesVariables.spacing * 2,
    },
    filterTitleText: {
        ...StylesVariables.appTitle,
        color: StylesVariables.whiteColor,
    },
    filterSubtitleText: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.textSecundaryColor,
        marginTop: StylesVariables.spacing * 1.5
    },
    filterTagText: {
        ...StylesVariables.appText,
        color: StylesVariables.cardTextColor,
        fontFamily: StylesVariables.mediumFont,
        fontSize: StylesVariables.textFontSize + 2,
        marginVertical: StylesVariables.spacing
    },
    filterCancelText: {
        ...StylesVariables.appText,
        color: StylesVariables.whiteColor,
        fontFamily: StylesVariables.mediumFont,
        fontSize: StylesVariables.textFontSize + 2,
        marginLeft: StylesVariables.spacing,
        marginVertical: StylesVariables.spacing
    },
    filterListCont: {
        marginVertical: StylesVariables.spacing * 1.5,
    },
    filterMarginH: {
        marginHorizontal: StylesVariables.spacing * 2,
    },
    filterCategoryTag: {
        width: 165 * StylesVariables.responsiveMulti,
    },
    seletedCategoryTag: {
        backgroundColor: StylesVariables.secondaryColor,
        width: 165 * StylesVariables.responsiveMulti,
    },
    filterTypeTag: {
        width: 113 * StylesVariables.responsiveMulti,
    },
    selectedTypeTag: {
        backgroundColor: StylesVariables.btnSecondary,
        width: 113 * StylesVariables.responsiveMulti,
    },
    filterTypeRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: StylesVariables.windowWidth
    },
    filterBottomBtns: {
        alignSelf: "center",
        marginVertical: StylesVariables.spacing,
    },
    btnCont: {
        height: 50 * StylesVariables.responsiveHeightMulti,
        marginVertical: StylesVariables.spacing * 0.5,
        width: 338 * StylesVariables.responsiveMulti,
    },
    dateCont: {
        alignSelf: "center",
        width: 338 * StylesVariables.responsiveMulti,
    },
    categoryRow: {
        alignSelf: "center",
        flexDirection: "row",
        marginVertical: StylesVariables.spacing * 0.5,
        justifyContent: "space-evenly",
        width: StylesVariables.windowWidth,
    },
    searchCont: {
        marginVertical: StylesVariables.spacing,
        marginBottom: StylesVariables.spacing * 2,
    },
    searchContActive: {
        flexDirection: "row-reverse",
        width: 270 * StylesVariables.responsiveMulti
    },
    filterSearchInputCont: {
        alignItems: "center",
        backgroundColor: StylesVariables.searchInputColor,
        borderRadius: 12.5,
        flexDirection: "row",
        height: 45 * StylesVariables.responsiveHeightMulti,
        width: 350 * StylesVariables.responsiveMulti,
    },
    filterSearchIcon: {
        color: StylesVariables.textColorLight,
        height: 25 * StylesVariables.responsiveMulti,
        marginHorizontal: StylesVariables.spacing,
        width: 25 * StylesVariables.responsiveMulti,
    },
    filterSearchCont: {
        flex: 1,
        height: 45 * StylesVariables.responsiveHeightMulti,
        justifyContent: "center",
        paddingHorizontal: StylesVariables.spacing,
    },
    filterSearchPlaceHolder: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.textColorLight,
        fontFamily: StylesVariables.lightFont
    },
    closeIcon: {
        height: 32,
        tintColor: StylesVariables.whiteColor,
        width: 32,
    },
    profileIcon: {
        height: 40,
        tintColor: StylesVariables.whiteColor,
        marginRight: StylesVariables.spacing * 0.5,
        width: 40,
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
    filterDateInfoContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    filterDateContainer: {
        width: 240 * StylesVariables.responsiveMulti,
        height: 50 * StylesVariables.inputMulti,
        backgroundColor: 'cyan',
        alignSelf: 'center',
        shadowColor: "#000",
        flexDirection: 'row'
    },
    filterDate: {
        flex: 1,
        justifyContent: 'center'
    },
    filterDateText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 2,
        color: StylesVariables.secondaryColor,
        lineHeight: StylesVariables.textLineHeight,
        textAlign: 'center'
    },
})
