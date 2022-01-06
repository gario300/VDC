import { StyleSheet, Dimensions } from 'react-native'
import StylesVariables from '../../Styles/app.style'
const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    carroussel : {
        width: width / 2.5,
        height: width / 2 ,
        margin: 5
    },
    boxContent : {
        display: "flex",
        flex: .5,
        height: 280 * StylesVariables.responsiveHeightMulti
    },
    box : {
        flex: 1,
        margin: StylesVariables.spacing * .5,
        backgroundColor: StylesVariables.whiteColor,
        height: 300 * StylesVariables.responsiveHeightMulti
    },
    boxTop: {
        flex: .78,
    },
    bosxBody: {
        flex: .18,
        padding: StylesVariables.spacing       
    },
    imageBox: {
        width: 10,
        height: 10
    },
    priceTitle : {
        ...StylesVariables.appSubTitle,
        color: 'black'
    },
    priceSubtitle: {
        ...StylesVariables.appText,
        color: StylesVariables.grayDarkColor,
        fontWeight: 'bold'
    },
    priceSize: {
        ...StylesVariables.appText,
        color: StylesVariables.grayColor,
        fontWeight: 'bold'
    },
    statusContainer: {
        width: '100%',
        position: 'absolute',
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        
    },
    textStatus: {
        ...StylesVariables.appText,
        color: StylesVariables.grayDarkColor
    }
})
