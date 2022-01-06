import { StyleSheet } from 'react-native';
import StylesVariables from './../../Styles/app.style';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StylesVariables.backgroundColor
    },
    body: {
        flex: 1
    },
    scrollView: {
        flex: 1,
    },
    innerSubtitleContainer: {
        flex: 1,
        height: 50 * StylesVariables.responsiveMulti,
        justifyContent: 'center'
    },
    innerSubtitle: {
        ...StylesVariables.appSubTitle
    },
    spacing: {
        height: StylesVariables.spacing
    },
    slide: {
        flex: 1,
        justifyContent: 'center'
    },
    slideCreditCard: {
        flex: 1,
        justifyContent: 'center'
    },
    creditCardContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    creditCard: {
        flex: 1,
        opacity: 0  
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 3,
        elevation: 3,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
        padding: 12 * StylesVariables.responsiveMulti,
    },
    button: {
        height: 40,
        backgroundColor: '#1ba549',
        justifyContent: 'center',
    },
    textButton: {
        textAlign: 'center',
        color: '#fff'
    },
    innerView: {
        flex: 1,
        maxHeight: 100 * StylesVariables.responsiveMulti
    },
    text: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 4,
        lineHeight: StylesVariables.titleLineHeight,
        color: StylesVariables.mainColorLight
    },
    textInput: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 4,
        color: StylesVariables.mainColor
    },
    submitButton: {
        height: 60 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        height: 60 * StylesVariables.responsiveMulti
    },
    title: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.titleFontSize + 8,
        textAlign: 'center',
        lineHeight: StylesVariables.titleLineHeight,
        color: StylesVariables.mainColor
    },
    inputContainer: {
        height: 80 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center'
    },
    inputLabel: {
        ...StylesVariables.appTextMedium,
        color: StylesVariables.textColorLight
    },
    inputStyle: {
        ...StylesVariables.appTextMedium,
        color: StylesVariables.textColor,
        fontSize: StylesVariables.textFontSize + 2
    },
    inputContainerStyle: {
        borderBottomWidth: .6,
        height: 38 * StylesVariables.responsiveHeightMulti,
        borderBottomColor: StylesVariables.textColorLight
    }
});