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
    warning: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: StylesVariables.grayColor
    },
    textWarning:{
        ...StylesVariables.appText,
        color: 'white'
    },
    whiteContainer: {
        width: '100%',
        backgroundColor: 'white',
        marginVertical: StylesVariables.spacing
    }
})
