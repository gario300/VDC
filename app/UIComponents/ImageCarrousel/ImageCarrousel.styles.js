import { StyleSheet } from 'react-native'
import StylesVariables from '../../Styles/app.style'

export const styles = StyleSheet.create({
    container: {
        width:'100%',
        marginBottom: StylesVariables.spacing
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 20,
        overflow: 'hidden',
        margin: StylesVariables.spacing -5
    },
    deleteContainer: {
        width: '100%',
        alignItems: 'flex-end',
        padding: 5
    },
    deleteButtonContainer:{
        width: 20,
        height: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: StylesVariables.dangerColor
    }
})
