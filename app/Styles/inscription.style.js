import { StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StylesVariables.backgroundColor
    },
    header: {
        width: '100%',
        height: 60
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: StylesVariables.windowWidth,
        height: StylesVariables.windowHeight,
        zIndex: -1
    },
    body: {
        flex: 10
    },
    bodyContainer: {
        flex: 1
    },
    head: {
        height: 100 * StylesVariables.responsiveHeightMulti
    },
    separation: {
        height: (StylesVariables.spacing * 3) * StylesVariables.responsiveMulti
    },
    iconImgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconImg: {
        width: StylesVariables.logoSize.w * StylesVariables.responsiveMulti - 50,
        height: StylesVariables.logoSize.h * StylesVariables.responsiveMulti - 50
    },
    inputSection: {
        flex: 1,
        justifyContent: 'center'
    },
    empty: {
        height: StylesVariables.spacing
    },
    inputButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60 * StylesVariables.responsiveMulti,
        maxHeight: 68,
    },
    submitButton: {
        flex: 1,
        height: 64 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContent: {
        flex: 5,
        justifyContent: 'space-around'
    },
    buttonsContainer: {
        flex: 3,
        justifyContent: 'center',
    },
    footer: {
        flex: 1,
        maxHeight: 40 * StylesVariables.responsiveHeightMulti
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    footerText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 3,
        textAlign: 'center',
        fontWeight: '300',
        color: StylesVariables.mainColor
    },
    inputButtonCheck: {
        flex: 1,
        alignSelf: 'center',
        maxWidth: 338 * StylesVariables.responsiveMulti,
        height: 50 * StylesVariables.responsiveHeightMulti,
        flexDirection: "row"
    },
    checkStyle: {
        padding: StylesVariables.spacing / 2,
        margin: 0,
        width: 20 + StylesVariables.spacing,
        height: 20 + StylesVariables.spacing,
        alignSelf: 'center',
        backgroundColor: StylesVariables.backgroundColor
    },
    textCheckStyle: {
        ...StylesVariables.appText,
        fontSize: StylesVariables.textFontSize + 1,
        color: StylesVariables.secondaryColor
    },
    titleText: {
        ...StylesVariables.appTitleLarge,
        fontFamily: "LibreBaskerville-Bold",
        color: StylesVariables.secondaryColor,
        textAlign: 'center'
    },
    textLinkContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    textLinkText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 2,
        lineHeight: StylesVariables.textFontSize + 2,
        color: StylesVariables.grayColor
    },
    scrollView: {
        flex: 1,
        zIndex: 999
    },
    scrollViewContent: {
        flex: 1
    },
    alreadyContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    alreadyText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 3,
        lineHeight: StylesVariables.textLineHeight + 3,
        color: StylesVariables.textColor,
        textAlign: 'center',
        fontWeight: '600'
    },
    inputButtonAuto: {
        flex: 1,
        justifyContent: 'center',
        height: 55 * StylesVariables.responsiveMulti,
        alignSelf: 'center',
        zIndex: 999
    },
    autocompleteContainer: {
        width: 288 * StylesVariables.responsiveMulti,
        height: 55 * StylesVariables.inputMulti,
        backgroundColor: StylesVariables.whiteColor,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: StylesVariables.borderInputColor,
        shadowColor: "#000",
        flexDirection: 'row',
        zIndex: 100,
    }
});
