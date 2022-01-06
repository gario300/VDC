import { StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';

export default StyleSheet.create({
    loaderContainer: {
        position: 'relative',
        display: 'none',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        flex: 1,
        zIndex: 1000
    },
    loaderActive: {
        position: 'absolute',
        display: 'flex',
        backgroundColor: StylesVariables.mainColorOverlay
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentColumn: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
    },
    boxContainer: {
        margin: (StylesVariables.spacing * 2) * StylesVariables.responsiveMulti,
        paddingTop: (StylesVariables.spacing * 1) * StylesVariables.responsiveMulti,
        paddingBottom: (StylesVariables.spacing * 1) * StylesVariables.responsiveMulti,
        borderRadius: 14,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        width: '90%',
        maxWidth: 380 * StylesVariables.responsiveMulti,
        alignSelf: 'center',
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: StylesVariables.whiteColor,
    },
    messageContainer: {
        justifyContent: 'center',
        width: '85%',
        alignSelf: 'center',
        paddingVertical: (StylesVariables.spacing * 2) * StylesVariables.responsiveHeightMulti,
        paddingTop: (StylesVariables.spacing * 1) * StylesVariables.responsiveHeightMulti
    },
    iconContainer: {
        width: "95%",
        justifyContent: 'flex-start',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    iconWarning: {
        alignSelf: 'center',
        color: StylesVariables.redColor
    },
    titleMessage: {
        ...StylesVariables.appText,
        letterSpacing: .5,
        marginHorizontal: StylesVariables.spacing * 2,
        fontSize: StylesVariables.subTitleFontSize,
        lineHeight: StylesVariables.subTitleFontSize + 3,
        color: StylesVariables.mainColor,
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContent: {
        margin: StylesVariables.spacing * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.secondaryColor,
        height: 46 * StylesVariables.responsiveHeightMulti,
        width: 175 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        borderRadius: 2
    },
    btnContentDouble: {
        margin: 5 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.mainColor,
        borderRadius: 10,
        height: 64 * StylesVariables.responsiveMulti,
        width: 175 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
    },
    btnText: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.whiteColor,
        top: 3,
        textAlign: 'center'
    },
    btnTextOrange: {
        fontFamily: StylesVariables.titleFont,
        color: StylesVariables.greenColor,
        fontSize: StylesVariables.textFontSize + 2,
        fontWeight: '600',
        textAlign: 'center'
    },
    btnCancelContent: {
        margin: 5 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.secondaryColor,
        height: 44 * StylesVariables.responsiveMulti,
        width: 180 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        borderRadius: 10
    }
});
