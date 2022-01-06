import { StyleSheet } from 'react-native'
import StylesVariables from '../Styles/app.style'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 400,
        width: '100%'
    },
    body:{
        padding: StylesVariables.spacing
    },
    row: {
        paddingVertical: StylesVariables.spacing + 2,
        flexDirection: 'row',
        width: '100%'
    },
    textNormal : {
        ...StylesVariables.appText,
        marginVertical: StylesVariables.spacing -3
    },
    column: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
    },
    buttonTransparent: {
        padding: StylesVariables.spacing + 2,
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    },
    descriptionRow: {
        width: '100%',
        borderBottomWidth: .5,
        borderBottomColor: '#343F4B',
        paddingVertical: StylesVariables.spacing + 2,
        flexDirection: 'row'
    },
    blackScreen: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: .7,
        position: 'absolute'
    }
})


export const productStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 400,
        width: '100%'
    },
})
