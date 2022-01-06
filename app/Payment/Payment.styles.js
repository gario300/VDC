import { StyleSheet } from 'react-native'
import StylesVariables from '../Styles/app.style'
export const styles = StyleSheet.create({
    container: {
        flex : 1,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: StylesVariables.spacing
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: StylesVariables.spacing 
    },
    column: {
        flex: 1
    },
    titlePrice : {
        ...StylesVariables.appText,
        color: StylesVariables.grayColor,
        fontSize: 18
    },
    priceLigth: {
        ...StylesVariables.appText,
        color: StylesVariables.grayDarkColor,
        fontSize: 18
    },
    totalTitle: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.grayDarkColor
    },
    payMethodsHeaderText: {
        ...StylesVariables.appText,
        color: StylesVariables.grayDarkColor,
        fontSize: 18
    },
    addressContainer: {
        width: '100%',
        flexDirection: 'row' ,
        backgroundColor: 'white',
        borderBottomWidth: .5,
        borderBottomColor: StylesVariables.grayColor,
        alignItems: 'center',
        padding: StylesVariables.spacing -5
    },
    addressLeft: {
        flex: .7
    },
    addressRigth: {
        flex: .3,
        alignItems: 'flex-end'
    } 
})
