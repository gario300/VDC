import { StyleSheet } from "react-native";
import StylesVariables from "../Styles/app.style";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StylesVariables.backgroundColor
    },
    typesRowCont: {
        backgroundColor: StylesVariables.backgroundInputLogin,
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingBottom: StylesVariables.spacing * 2,
    },
    selectedTag: {
        backgroundColor: StylesVariables.tagBgColor[0],
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
    }
})