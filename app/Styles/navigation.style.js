import { StyleSheet, Platform, StatusBar } from 'react-native';
import StylesVariables from './app.style';

export default StyleSheet.create({
    navHeaderFloat: {
        position: 'absolute',
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        height: 55 * StylesVariables.responsiveMulti,
        zIndex: 10,
    },
    navHeaderSolid: {
        height: Platform.OS === 'android' ? 0 + (55 * StylesVariables.responsiveMulti) : 55 * StylesVariables.responsiveMulti,
        maxHeight: Platform.OS === 'android' ? 0 + (55 * StylesVariables.responsiveMulti) : 55 * StylesVariables.responsiveMulti,
        zIndex: 10,
        backgroundColor: StylesVariables.backgroundColor,
        paddingTop: Platform.OS === 'android' ? 0 : 0,
    },
    backButton: {
        height: 60 * StylesVariables.responsiveMulti,
        width: 120 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    qustionButton: {
        height: 60 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginHorizontal: 20
    },
    navContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    navContent: {
        flex: 1,
        flexDirection: 'row'
    },
    asideContent: {
        flex:.2,
        justifyContent: 'center'
    },
    asideContentLeft: {
        flex: 2,
        justifyContent: "flex-start"
    },
    asideContentRight: {
        flex: 1.6,
        justifyContent: "center",
        alignItems: 'center',
    },
    centerContent: {
        flex: .6,
        justifyContent: 'center'
    },
    backButtonContent: {
        flex: 1,
        justifyContent: 'center',
    },
    backArrowContent: {
        width: 50 * StylesVariables.responsiveMulti,
        height: 40 * StylesVariables.responsiveMulti,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButtonImg: {
        tintColor: StylesVariables.blackColor
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    logoContent: {
        flex: 1,
        justifyContent: 'center'
    },
    logoIcon: {
        width: 65 * StylesVariables.responsiveMulti,
        height: 62 * StylesVariables.responsiveMulti,
        alignSelf: 'center'
    },
    titleContent: {
        flex: 1,
        justifyContent: 'center'
    },
    titleContentModal: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    titleText: {
        color: StylesVariables.whiteColor,
        fontFamily: StylesVariables.fontFamily,
        letterSpacing: 1,
        textAlign: 'center',
        fontSize: (StylesVariables.textFontSize) * StylesVariables.textMulti,
        fontWeight: '800'
    },
    titleTextInner: {
        ...StylesVariables.appSubTitle,
        textAlign: 'center',
        color: StylesVariables.textSecundaryColor,
        fontSize: StylesVariables.subTitleFontSize - 2
    },
    titleTextModal: {
        ...StylesVariables.appTextMedium
    },
    titleTextFilter: {
        ...StylesVariables.appTextMedium,
        marginHorizontal: StylesVariables.spacing * .5,
        marginRight: StylesVariables.spacing * 1,
    },
    questionContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    question: {
        width: 32 * StylesVariables.responsiveMulti,
        height: 32 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.mainColor,
        justifyContent: 'center',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: StylesVariables.whiteColor
    },
    questionText: {
        color: StylesVariables.whiteColor,
        textAlign: 'center',
        fontFamily: StylesVariables.fontFamily,
        fontSize: StylesVariables.textFontSize + 2,
        fontWeight: '600'
    },
    modalContainer: {
        flex: 1,
        maxHeight: (60) * StylesVariables.responsiveMulti,
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'android' ? 0 : 0,
        position: 'relative',
        top: 0
    },
    modalContainerTitle: {
        height: (50) * StylesVariables.responsiveMulti,
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'android' ? 0 : 0,
        position: 'relative'
    },
    modalHeader: {
        height: 55 * StylesVariables.responsiveMulti
    },
    modalHeaderHome: {
        height: 50 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.greenColor
    },
    modalHeaderInner: {
        height: 50 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.whiteColor
    },
    modalHeaderHard: {
        flex: 1,
        flexDirection: 'row',
    },
    modalFloat: {
        backgroundColor: 'transparent'
    },
    modalHeaderContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    modalHeaderWelcome: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    closeButtonContent: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        maxWidth: 44,
        alignItems: 'center'
    },
    closeButtonContentLeft: {
        alignSelf: 'center'
    },
    cartButtonContent: {
        flex: 1,
        borderRadius: 30,
        width: 44 * StylesVariables.responsiveMulti,
        height: 44 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.backgroundColor,
        margin: StylesVariables.spacing / 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    closeButtonImg: {
        width: 50 * StylesVariables.responsiveMulti,
        height: 40 * StylesVariables.responsiveMulti,
        tintColor: StylesVariables.blackColor
    },
    subscriptionContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    suscriptionButtonContent: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: 90 * StylesVariables.responsiveMulti,
        maxHeight: 32 * StylesVariables.responsiveMulti,
        borderRadius: 8,
        backgroundColor: StylesVariables.orangeColor
    },
    suscriptionButtonText: {
        color: StylesVariables.whiteColor,
        textAlign: 'center',
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize,
    },
    iconImgContainer: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 50 * StylesVariables.responsiveMulti
    },
    iconImg: {
        width: (StylesVariables.logoSize.w/2.2) * StylesVariables.responsiveMulti,
        height: (StylesVariables.logoSize.h/2.2) * StylesVariables.responsiveMulti
    },
    filterIconContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: StylesVariables.spacing * 1
    },
    iconFilter: {
        fontSize: 21 * StylesVariables.responsiveMulti,
        color: StylesVariables.textColor
    },
    iconTitle: {
        height: 32 * StylesVariables.responsiveHeightMulti,
        tintColor: StylesVariables.mainColor,
        marginRight: StylesVariables.spacing,
        width: 32 * StylesVariables.responsiveHeightMulti,
    },
    filterButton: {
        flex: 1, 
        borderRadius: 50,
        borderWidth: .5,
        borderColor: StylesVariables.textColor,
        maxHeight: 32 * StylesVariables.responsiveHeightMulti,
    },
    locationButton: {
        flex: 1,
        alignSelf: 'center',
        maxWidth: 240 * StylesVariables.responsiveMulti,
        minWidth: 190 * StylesVariables.responsiveMulti,
        borderRadius: 50,
        borderWidth: .5,
        borderColor: StylesVariables.textColor,
        maxHeight: 32 * StylesVariables.responsiveHeightMulti,
    },
    locationIconContainer: {
        alignSelf: 'center',
        marginLeft: StylesVariables.spacing * .5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    locationIcon: {
        fontSize: 21 * StylesVariables.responsiveMulti,
        color: StylesVariables.textColor
    },
    locationTitleContent: {
        minWidth: 100,
        justifyContent: 'center'
    },
    locationTitle: {
        ...StylesVariables.appTextMedium,
        maxWidth: 230 * StylesVariables.responsiveMulti,
        paddingHorizontal: 5 * StylesVariables.responsiveMulti,
        fontSize: StylesVariables.textFontSize - 2
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    rightBtn: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: 48 * StylesVariables.responsiveMulti,
        height: 48 * StylesVariables.responsiveMulti
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center",
    },
    titleContainerWithIcon: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    },
    titleTextSecondary: {
        ...StylesVariables.appText,
        color: StylesVariables.grayDarkColor,
        textAlign: 'center',
        fontSize: StylesVariables.subTitleFontSize + 1,
    },
    border: {
        borderBottomColor: StylesVariables.secondaryColor,
        borderBottomWidth: 1,
    },
    textIcon: {
        ...StylesVariables.appText,
        color: StylesVariables.whiteColor,
        fontFamily: StylesVariables.mediumFont,
        marginRight: 5,
    }
});
