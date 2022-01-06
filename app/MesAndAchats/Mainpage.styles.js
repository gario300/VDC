import { StyleSheet } from 'react-native'
import StylesVariables from '../Styles/app.style'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    column: {
        flex: 1,
        alignItems: 'center',
        borderBottomColor: StylesVariables.grayColor,
        borderBottomWidth: 1
    },
    textMenuContainer : {
        width: '70%',
        borderBottomWidth: 1.5,
        alignItems: 'center',
        padding: StylesVariables.spacing 
    },
    textMenu: {
        ...StylesVariables.appText
    },
    row : {
        width: '100%',
        flexDirection: 'row',
        marginVertical: StylesVariables.spacing * 2.5,
        alignItems: 'center',
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

})
