import { StyleSheet } from 'react-native'
import StylesVariables from '../Styles/app.style'
export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row : {
        width: '100%',
        flexDirection: 'row',
        marginVertical: StylesVariables.spacing * 2.5,
        alignItems: 'center',
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
})
