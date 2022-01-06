import { StyleSheet } from 'react-native'
import StylesVariables from '../Styles/app.style'
export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        width: '100%',
        padding: StylesVariables.spacing,
        paddingHorizontal: StylesVariables.spacing * 2
    },
    titleText: {
        ...StylesVariables.appText, 
        fontSize: 15
    },
    navbarContainer: {
        width: '100%',
        padding: StylesVariables.spacing,
        flexDirection: 'row',
        alignItems: 'center'
    },
    navHorrizontal: {
        flex: .2,
    },
    navCenter: {
        flex: .6,
        alignItems: 'center'
    },
    titleHeader: {
        ...StylesVariables.appText,
        fontSize: 18
    }
})
