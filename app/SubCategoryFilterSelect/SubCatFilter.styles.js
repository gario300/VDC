import { StyleSheet } from 'react-native'
import StylesVariables from '../Styles/app.style'

export const styles = StyleSheet.create ({
    container: {
        flex:1
    },
    row: {
        width: '100%',
        padding: StylesVariables.spacing
    },
    emptyText: {
        flex: 5,
        alignSelf: 'center',
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 1,
        color: StylesVariables.cardTextColor,
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
    subCatAuthContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 8
    },
    catTextTop: {
        ...StylesVariables.appText,
        color: StylesVariables.grayDarkColor,
        fontSize: 16
    },
    iconsContainer: {
        width: '100%',
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: 'center'
    },
    iconContainer: {
        padding: 3,
        width: 100,
        height: 100,
        margin: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textIcon: {
        ...StylesVariables.appText,
        textAlign: 'center',
        fontSize: 14
    }
})
