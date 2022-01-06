import { StyleSheet, Dimensions } from 'react-native';
import StylesVariables from '../Styles/app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StylesVariables.whiteColor
    },
    containerWPadding: {
        flex: 1,
        backgroundColor: StylesVariables.whiteColor,
        paddingVertical: StylesVariables.spacing,
    },
    containerMe: {
        flex: 1,
        backgroundColor: StylesVariables.mainColor
    },
    scrollContainer: {
        backgroundColor: StylesVariables.whiteColor,
        flex: 1
    },
    scrollContent: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 30 * StylesVariables.responsiveMulti
    },

    head: {
        height: 120 * StylesVariables.responsiveMulti,
        marginBottom: 10 * StylesVariables.responsiveMulti
    },
    iconImgContainer: {
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    iconImg: {
        width: (700/9) * StylesVariables.responsiveMulti,
        height: (484/9) * StylesVariables.responsiveMulti,
        marginBottom: 8 * StylesVariables.responsiveMulti
    },
    innerSubtitleContainer: {
        flex: 1,
        backgroundColor: 'green'
    },

    innerBody: {
        flex: 1,
    },
    inputSection: {
        flex: 1,
        justifyContent: 'center'
    },
    empty: {
        flex: 1,
        maxHeight: 10 * StylesVariables.responsiveMulti
    },
    emptyView: {
        flex: 1,
    },
    inputButton: {
        flex: 1,
        height: 80 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContent: {
        justifyContent: 'center',
        height: 68 * StylesVariables.responsiveHeightMulti,
        maxHeight: 68  * StylesVariables.responsiveHeightMulti,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: StylesVariables.secondaryColor,
        paddingHorizontal: 8
    },
    buttonsContainer: {
        flex: 3,
        justifyContent: 'center',
    },
    topSpace: {
        flex: 1,
        height: 10 * StylesVariables.responsiveMulti
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    textInputContainer: {
        justifyContent: 'center',
    },
    inputContainerSample: {
        flex: 1,
        justifyContent: 'center'
    },
    inputContainerMinor: {
    },
    inputContainerMinorPass: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    inputWithText: {
        flex: 1,
        backgroundColor: StylesVariables.whiteColor
    },
    contentRow: {
        flexDirection: 'row',
        flex: 1,
        height: 80 * StylesVariables.responsiveHeightMulti,
        backgroundColor: 'transparent'
    },
    contentRowHigh: {
        flexDirection: 'row',
        height: 80 * StylesVariables.responsiveMulti,
        alignItems: 'flex-start'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    contentCenter: {
        flex: 1,
        marginHorizontal: 10 * StylesVariables.responsiveMulti
    },
    contenInput: {
        flex: 1,
        height: 68 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'flex-end',
        marginHorizontal: StylesVariables.spacing,
    },
    spacing: {
        height: StylesVariables.spacing * 1
    },
    contentCenterSample: {
        flex: 1,
        marginHorizontal: 10 * StylesVariables.responsiveMulti,
        height: 100 * StylesVariables.responsiveMulti,
    },
    footer: {
        flex: 2,
        maxHeight: 80 * StylesVariables.responsiveMulti
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
    checkStyle: {
        maxWidth: 300 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.whiteColor,
        borderColor: StylesVariables.whiteColor,
        alignSelf: 'center'
    },
    textCheckStyle: {
        fontFamily: StylesVariables.fontFamily,
        fontSize: StylesVariables.textFontSize,
        fontWeight: '400',
        color: StylesVariables.textColor
    },
    linksContainer: {
        flex: 1,
        justifyContent: 'center',
        maxHeight: 36 * StylesVariables.responsiveMulti
    },
    linkButton: {
        flex: 1,
        justifyContent: 'center'
    },
    linkText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 3,
        textAlign: 'center',
        fontWeight: '800',
        textDecorationLine: "underline",
        color: StylesVariables.mainColor
    },
    textInput: {
        ...StylesVariables.appTextMedium
    },
    textInputSample: {
        fontFamily: StylesVariables.textFont,
        paddingLeft: 2 * StylesVariables.inputMulti,
        paddingRight: 2 * StylesVariables.inputMulti,
        color: StylesVariables.fillColor,
        fontSize: StylesVariables.textFontSize,
        fontWeight: '600',
        textAlign: 'center'
    },
    textRight: {
        textAlign: 'right'
    },
    textCenter: {
        lineHeight: 48 * StylesVariables.inputMulti
    },
    inputText: {
        ...StylesVariables.appTextMedium,
        marginHorizontal: StylesVariables.spacing * 1,
        marginLeft: StylesVariables.spacing * 2
    },
    inputTextLabel: {
        ...StylesVariables.appTextMedium
    },
    inputTextSample: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.inputFontSize,
        lineHeight: StylesVariables.textLineHeight + 5,
        color: StylesVariables.textColor,
        textAlign: 'center'
    },
    textInputDisabled: {
        opacity: 0.6
    },
    center: {
        textAlign: 'right',
        paddingRight: 10 * StylesVariables.responsiveMulti
    },
    inputSwitchLeft: {
        flex: 5,
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    inputSwitchRight: {
        flex: 2,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    inputTextLeft: {
        backgroundColor: 'transparent',
    },
    inputTextRight: {
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    inputDate: {
        flex: 3,
        justifyContent: 'center'
    },
    inputSwitchContainer: {
        flex: 1.1,
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        height: 48 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center',
    },
    inputSwitchContent: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: StylesVariables.spacing * 2,
        height: 48 * StylesVariables.responsiveHeightMulti,
    },
    inputNoBorder: {
        borderWidth: 0,
        margin: 0
    },
    inputDescriptionContainer: {
        flex: 1,
        paddingLeft: 10 * StylesVariables.inputMulti,
        paddingRight: 10 * StylesVariables.inputMulti,
    },
    inputDescriptionText: {
        ...StylesVariables.appText,
        fontSize: StylesVariables.textFontSize - 2,
        lineHeight: StylesVariables.textFontSize + 4,
        marginLeft: StylesVariables.spacing * 2,
        alignSelf: 'flex-start'
    },
    border: {
        height: .5,        
        flex: 1,
        backgroundColor: StylesVariables.textColorLight,
    },
    spaceInputContainer: {
        height: StylesVariables.spacing * 8 * StylesVariables.responsiveHeightMulti,
        justifyContent: "flex-end",
        paddingHorizontal: StylesVariables.spacing * 2
    },
    spaceInput: {
        height: 50 * StylesVariables.responsiveMulti
    },
    spaceInputText: {
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.textFontSize + 2,
        lineHeight: StylesVariables.subTitleFontSize + 5,
        marginBottom: StylesVariables.spacing * 1
    },
    textLogout: {
        color: StylesVariables.redColor,
        fontFamily: StylesVariables.subTitleFont
    },
    buttonInput: {
        width: "90%",
        justifyContent: 'center',
        height: 60 * StylesVariables.responsiveMulti,
        alignItems: 'center'
    },

    inputContainerRow: {
        flexDirection: 'row',
        height: 68 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'space-evenly',
        alignItems: 'center'
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
        color: StylesVariables.secondaryColor,
        fontSize: StylesVariables.textFontSize + 2
    },
    inputContainerStyle: {
        borderBottomWidth: .6,
        height: 38 * StylesVariables.responsiveHeightMulti,
        borderBottomColor: StylesVariables.textColorLight,
        marginBottom: StylesVariables.spacing * 1
    },

    passwordButton: {

    },
    textInputPasswordContent: {
        alignItems: "center",
        flex: 1,
        justifyContent: 'center',
        margin: StylesVariables.spacing * 1,
    },
    textInputPassword: {
        ...StylesVariables.appTextMedium,
        color: StylesVariables.whiteColor,
        fontSize: StylesVariables.textFontSize + 3
    },
    headerCont: {
        backgroundColor: StylesVariables.mainColor,
        paddingVertical: StylesVariables.spacing * 2,
        paddingHorizontal: StylesVariables.spacing * 2,
    },
    title: {
        ...StylesVariables.appTitle,
        color: StylesVariables.textSecundaryColor,
    },
    btnLogout: {
        alignSelf: "flex-start",
        height: 50 * StylesVariables.responsiveHeightMulti,
        marginVertical: StylesVariables.spacing * 3,
        width: 290 * StylesVariables.responsiveMulti,
    },
    separator: {
        backgroundColor: 'transparent',
        height: StylesVariables.spacing * 2,
    },
    iconHeader: {
        height: 50,
        marginBottom: StylesVariables.spacing,
        width: 50,
    },
    avatarContainer:{
        width: 120,
        height: 120,
        borderRadius: 120,
        backgroundColor: 'lightgray',
        overflow: 'hidden'
    },
    titlePhotoC: {
        backgroundColor: 'transparent'
    },
    titlePhoto:{
        ...StylesVariables.appText,
        marginVertical: 8
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
    label: {
        marginHorizontal: 16,
    },
    labelTxt: {
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.textFontSize + 2,
        color: StylesVariables.secondaryColor
    }
});
