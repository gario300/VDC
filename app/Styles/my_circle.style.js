import { StyleSheet } from 'react-native';
import StylesVariables from './app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        alignItems: "center",
        backgroundColor: StylesVariables.mainColor,
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingBottom: 40 * StylesVariables.responsiveHeightMulti,
    },
    headerTitle: {
        ...StylesVariables.appTitle,
        color: StylesVariables.whiteColor,
    },
    headerSub: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.whiteColor,
        fontFamily: StylesVariables.lightFont,
        textAlign: "center",
    },
    headerSubQty: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.whiteColor,
        fontFamily: StylesVariables.mediumFont,
        textAlign: "center",
    },
    listContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: "row",
    },
    listTitle: {
        ...StylesVariables.appSubTitle,
        marginVertical: 25 * StylesVariables.responsiveHeightMulti,
        marginHorizontal: 25 * StylesVariables.responsiveMulti,
    },
    listBtn: {
        position: "absolute",
        right: 20,
        top: -25,
        zIndex: 10,
    },
    containerBordered: {
        flex: 1,
        borderTopColor: StylesVariables.secondaryColor,
        borderTopWidth: 0.5,
    },
    subscTitle: {
        ...StylesVariables.appTitle,
        fontFamily: StylesVariables.subTitleFont,
        fontSize: StylesVariables.subTitleFontSize + 1,
        marginVertical: 25 * StylesVariables.responsiveHeightMulti,
        marginHorizontal: 20 * StylesVariables.responsiveMulti,
    },
    btnRow: {
        alignSelf: "center",
        flexDirection: "row",
    },
    btnCont: {
        height: 30 * StylesVariables.responsiveHeightMulti,
        marginHorizontal: 8 * StylesVariables.responsiveMulti,
        width: 140 * StylesVariables.responsiveMulti,
    },
    publiTitle: {
        ...StylesVariables.appTitle,
        color: StylesVariables.whiteColor,
        marginVertical: 4 * StylesVariables.responsiveHeightMulti,
        textAlign: "center",
    },
    publiTitleCont: {
        alignSelf: "center",
        marginVertical: 10 * StylesVariables.responsiveMulti,
    },
    publiHeaderContainer: {
        backgroundColor: StylesVariables.mainColor,
        paddingBottom: 30 * StylesVariables.responsiveHeightMulti,
    }
});