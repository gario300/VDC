import { StyleSheet } from 'react-native'
import StylesVariables from '../Styles/app.style'


export const styles = StyleSheet.create({
    container: {
        padding: StylesVariables.spacing
    },
    textItem:{
        ...StylesVariables.appText,
        fontSize: 15,
        color: StylesVariables.grayDarkColor
    }
})
