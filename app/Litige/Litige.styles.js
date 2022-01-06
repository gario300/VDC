import { StyleSheet } from 'react-native'
import StylesVariables from '../Styles/app.style'
export const styles= StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        padding: StylesVariables.spacing * 2
    },
    topText: {
        ...StylesVariables.appText,
        fontSize: 17
    },
    textLink: {
        ...StylesVariables.appText,
        fontSize: 17,
        color: StylesVariables.blueColor,
        textDecorationLine: 'underline',
        marginVertical: StylesVariables.spacing -3
    },
    title: {
        ...StylesVariables.appText,
        fontSize: 17,
        fontWeight: 'bold',
        marginVertical: StylesVariables.spacing
    },
    textItemStyle: {
        ...StylesVariables.appText,
        fontSize: 15,
    },
    row: {
        width: '100%',
        padding: StylesVariables.spacing,
        marginVertical: StylesVariables.spacing
    },
    containerVideo: {
        padding: StylesVariables.spacing * 2,
        borderWidth: .5,
        borderColor: StylesVariables.dangerColor
    },
    dangerText: {
        ...StylesVariables.appText,
        color: StylesVariables.dangerColor,
        fontSize: 17
    }
})
