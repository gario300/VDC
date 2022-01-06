import { StyleSheet } from 'react-native';
import StylesVariables from './app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: StylesVariables.mainColor,
        flexDirection: "row",
        paddingBottom: 30 * StylesVariables.responsiveHeightMulti,
    },
    bookImageCont: {
        alignItems: "center",
        flex: 2,
    },
    bookImg: {
        marginTop: 25 * StylesVariables.responsiveHeightMulti,
        height: 160 * StylesVariables.responsiveHeightMulti,
        width: 100 * StylesVariables.responsiveMulti,
    },
    bookImgDefault: {
        alignItems: "center",
        borderColor: StylesVariables.textColorLight,
        borderWidth: 0.5,
        height: 160 * StylesVariables.responsiveHeightMulti,
        justifyContent: "center",
        marginTop: 25 * StylesVariables.responsiveHeightMulti,
        width: 100 * StylesVariables.responsiveMulti,
    },
    bookDescCont: {
        flex: 3,
    },
    descTile: {
        marginVertical: 5 * StylesVariables.responsiveHeightMulti,
    },
    titleWhite: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.whiteColor,
        fontFamily: StylesVariables.mediumFont,
        marginTop: 15 * StylesVariables.responsiveHeightMulti,
        marginBottom: 5 * StylesVariables.responsiveHeightMulti,
    },
    textWhite: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.whiteColor,
        fontFamily: StylesVariables.lightFont,
        marginVertical: 2 * StylesVariables.responsiveHeightMulti,
    },
    textRed: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.redColorLight,
        fontFamily: StylesVariables.lightFont,
        marginVertical: 2 * StylesVariables.responsiveHeightMulti,
    },
    btnDesc: {
        height: 22 * StylesVariables.responsiveHeightMulti,
        width: 190 * StylesVariables.responsiveMulti,
    },
    listContainer: {
        flex: 1,
    },
    listBtn: {
        position: "absolute",
        right: 20,
        top: -25,
        zIndex: 10,
    },
    btnIconCont: {
        height: 30 * StylesVariables.responsiveHeightMulti,
        marginVertical: 7 * StylesVariables.responsiveHeightMulti,
        width: 200 * StylesVariables.responsiveMulti,
    },
});