import { StyleSheet } from 'react-native';
import Sizes from './../Styles/sizes.style'
import GlobalStyles from './../Styles/app.style'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundContainer: {
        flex: 1,
        alignItems: 'center'
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 120,
        backgroundColor: 'white',
        overflow: 'hidden',
        marginVertical: Sizes.spacing,
        marginBottom: GlobalStyles.spacing * 1.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgProfile: {
        width: 120,
        height: 120,
    },
    textHeader: {
        ...GlobalStyles.appSubTitle,
        color: 'white',
        marginVertical: Sizes.spacing,
        textAlign: 'center'
    },
    inputs:{
        color: GlobalStyles.currentUtilities.mainColor,
        borderRadius: 10,
        width: '100%'
    },
    annotationsContent: {
        flex: 1,
        marginTop: GlobalStyles.spacing/2,
        maxWidth: 320 * GlobalStyles.responsiveMulti,
        marginBottom: GlobalStyles.spacing
    },
    annotations: {
        ...GlobalStyles.appTextMinor,
        color: '#47525E',
        marginVertical: GlobalStyles.spacing/2
    },
    button: {
        backgroundColor: GlobalStyles.currentUtilities.mainColorSaturate,
        marginVertical: Sizes.spacing -5,
        padding: Sizes.spacing -3,
        borderRadius: 8,
        alignItems: 'center'
    },
    textButton: {
        color: 'white'
    },
    textColors: {
        color: GlobalStyles.currentUtilities.mainColor
    },
    submitButton: {
        flex: 1,
        height: 64 * GlobalStyles.responsiveHeightMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollContent: {
        paddingBottom: GlobalStyles.spacing * 4
    },
    inputContent: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 58 * GlobalStyles.responsiveMulti,
        maxHeight: 68,
        marginBottom: GlobalStyles.spacing/2
    },
    inputContentMultiple: {
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 320,
        marginBottom: GlobalStyles.spacing/2
    }

})

