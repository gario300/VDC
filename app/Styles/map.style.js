import { StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        width: '100%',
        height: 300
    },
    map: {
        flex: 1
    },
    markContainer: {
        backgroundColor: StylesVariables.redColor,
        borderRadius: 30,
        width: 25 * StylesVariables.responsiveMulti,
        height: 25 * StylesVariables.responsiveMulti,
        borderColor: StylesVariables.redColor,
        borderWidth: 1
    },
    markContainerSelf: {
        backgroundColor: StylesVariables.textColor,
        borderRadius: 30,
        width: 18 * StylesVariables.responsiveMulti,
        height: 18 * StylesVariables.responsiveMulti,
        borderColor: StylesVariables.blackColor,
        borderWidth: 1
    },
    markActive: {
        borderColor: StylesVariables.textSecundaryColor,
        borderWidth: 2
    },
    mapViewInformation: {
        position: 'absolute',
        bottom: 0,
        height: 105 * StylesVariables.responsiveHeightMulti,
        width: '100%',
        backgroundColor: '#FFFFFFee'
    },
    mapViewContent: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: StylesVariables.spacing,
        marginVertical: StylesVariables.spacing,
        justifyContent: 'space-evenly',
    },
    subtitleText: {
        ...StylesVariables.subtitleText,
        color: StylesVariables.secondaryColor,
        fontFamily: StylesVariables.subTitleFont
    },
    titleText: {
        ...StylesVariables.subtitleText,
        fontFamily: StylesVariables.titleFont
    },
    inlineIconText: {
        flexDirection: 'row',
    },
    inlineText: {
        ...StylesVariables.appTextMedium,
        color: StylesVariables.textSecundaryColor,
        fontSize: StylesVariables.textFontSize - 2
    },
    buttonClose: {
        width: 45 * StylesVariables.responsiveMulti,
        alignItems: 'center',
        paddingTop: StylesVariables.spacing * 1
    },
    halfSpacing: {
        height: StylesVariables.spacing / 2
    },
    buttonProducer: {
        borderWidth: 1,
        backgroundColor: StylesVariables.whiteColor,
        paddingHorizontal: StylesVariables.spacing,
        paddingVertical: StylesVariables.spacing * .5,
        justifyContent: 'space-evenly',
        flex: 1,
        borderRadius: 5,
        borderColor: StylesVariables.textColor
    },
    displayProducer: {
        justifyContent: 'space-evenly',
        flex: 1
    },
    rightView: {
        position: 'absolute',
        right: StylesVariables.spacing,
        bottom: StylesVariables.spacing
    }
});