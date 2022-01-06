import { StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

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
    scrollView: {
        flex: 1
    },
    loginContainer: {
        flex: 1,
    },
    headRow: {
        flex: .25,
        marginLeft: StylesVariables.spacing * 0,
        marginRight: StylesVariables.spacing * 2,
        flexDirection: 'row'
    },
    leftContent: {
        flex: 1,
        marginLeft: StylesVariables.spacing * 2,
        justifyContent: 'center'
    },
    rightContent: {
        flex: .8
    },
    headerInn: {
        height: 10 * StylesVariables.responsiveMulti
    },
    head: {
        height: 180 * StylesVariables.responsiveHeightMulti
    },
    headPassword: {
        flex: 2.5,
        justifyContent: 'center'
    },
    headBottom: {
        flex: 1,
        maxHeight: 25 * StylesVariables.responsiveMulti
    },
    body: {
        flex: 6
    },
    bodyPassword: {
        flex: 7,
    },
    iconImgContainer: {
        flex: 1,
    },
    iconImgContainerPassword: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    iconImg: {
        width: StylesVariables.logoSize.w * StylesVariables.responsiveMulti,
        height: StylesVariables.logoSize.h * StylesVariables.responsiveMulti
    },
    inputContainer: {
        height: 180 * StylesVariables.responsiveMulti,
        minHeight: 160,
        maxHeight: 220
    },
    inputField: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputFieldCheck: {
        height: 48 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
    },
    inputFieldCheckContent: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: 338 * StylesVariables.responsiveMulti
    },
    checkStyle: {
        maxWidth: 338 * StylesVariables.responsiveMulti,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        justifyContent: 'center',
        height: 45 * StylesVariables.responsiveMulti
    },
    textCheckStyle: {
        ...StylesVariables.appText,
        fontSize: StylesVariables.textFontSize,
        color: StylesVariables.grayColor
    },
    titleContainer: {
        flex: 1,
        maxHeight: 48 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center'
    },
    titlePasswordContainer: {
        flex: .5,
        justifyContent: 'center',
        marginLeft: StylesVariables.spacing * 2,
        marginRight: StylesVariables.spacing * 2
    },
    titleText: {
        ...StylesVariables.appTitleLarge,
        color: StylesVariables.whiteColor,
        textAlign: 'center'
    },
    titlePasswordText: {
        ...StylesVariables.appSubTitle,
        fontFamily: StylesVariables.italicFont,
        color: StylesVariables.whiteColor
    },
    screenTitleMax: {
        maxWidth: 220 * StylesVariables.multi
    },
    bodyContainer: {
        flex: 1
    },
    inputSection: {
        flex: 1,
        justifyContent: 'center'
    },
    empty: {
        flex: 1,
        maxHeight: StylesVariables.spacing * StylesVariables.responsiveHeightMulti
    },
    inputsContainer: {
        flex: 2,
        maxHeight: 200 * StylesVariables.responsiveMulti,
        justifyContent: 'space-between'
    },
    inputButton: {
        flex: 1,
        height: 68 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputButtonText: {
        flex: 1,
        marginVertical: StylesVariables.spacing * 1,
        maxHeight: 58 * StylesVariables.responsiveMulti,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttonsContainer: {
        height: 65 * StylesVariables.responsiveHeightMulti,
        maxHeight: 74,
        justifyContent: 'center'
    },
    inlineTextContainer: {
        flexDirection: 'column',
        height: 60 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        height: 40 * StylesVariables.responsiveMulti
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    inlineText: {
        ...StylesVariables.appTextMinor
    },
    buttonText: {
        color: "#001AFF",
        fontSize: StylesVariables.textFontSize * 0.9
    },
    forgotPasswordContainer: {
        height: 48 * StylesVariables.responsiveHeightMulti,
    },
    linksContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    linkButton: {
        height: 22,
        justifyContent: 'center',
        alignSelf: 'center',
        borderBottomColor: StylesVariables.lightGrayColor,
        borderBottomWidth: 1
    },
    linkText: {
        ...StylesVariables.appTextMinor,
        textAlign: 'center',
        fontFamily: StylesVariables.textFont,
        color: StylesVariables.grayColor
    },

    ouContainer: {
        height: 50 * StylesVariables.responsiveMulti,
        justifyContent: 'center'
    },
    ouContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    ouTextContainer: {
        flex: 0.2,
        justifyContent: 'center'
    },
    ouText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 2,
        textAlign: 'center',
        fontWeight: '600',
        color: StylesVariables.textColor
    },
    ouLineContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ouLine: {
        height: 1,
        width: 100 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.textColor
    },
    socialButton: {
        width: 48 * StylesVariables.responsiveMulti,
        height: 48 * StylesVariables.responsiveMulti,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#1877f2',

        shadowColor: "#333",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.32,
        shadowRadius: 2.22,

        elevation: 1,

        borderRadius: 11
    },
    socialConnectionContainer: {
        justifyContent: 'center',
        height: 48 * StylesVariables.responsiveMulti
    },
    socialConnectionContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    socialConnectionIcon: {
        width: 18 * StylesVariables.responsiveMulti,
        height: 18 * StylesVariables.responsiveMulti,
        alignSelf: 'center'
    },
    appleButton: {  
        width: 48 * StylesVariables.responsiveMulti,
        height: 48 * StylesVariables.responsiveMulti,
        backgroundColor: 'black',

        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: "#333",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.32,
        shadowRadius: 2.22,

        elevation: 1,

        borderRadius: 11,
    },
    spacing: {
        height: StylesVariables.spacing * 1
    },
    appleButtonIcon: {
        width: 45 * StylesVariables.responsiveMulti,
        height: 45 * StylesVariables.responsiveMulti,
    },
    loginHeader: {
        flex: 1,
        height: 50 * StylesVariables.responsiveHeightMulti,
        marginLeft: StylesVariables.spacing * 2,
        marginRight: StylesVariables.spacing * 2
    },
    loginHeaderContent: {
        width: "100%",
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    loginHeaderButton: {
        height: 48 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center'
    },
    loginHeaderText: {
        fontFamily: StylesVariables.textFont,
        fontSize: 17 * StylesVariables.textMulti,
        color: StylesVariables.grayDarkColor,
    },
    loginHeaderTextRight: {
        ...StylesVariables.appSubTitle,
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.subTitleFontSize - 2,
        color: StylesVariables.grayDarkColor
    }
});
