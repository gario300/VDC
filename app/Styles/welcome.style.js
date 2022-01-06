import { StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StylesVariables.backgroundColor
    },
    loginContainer: {
        flex: 1,
        height: StylesVariables.windowHeight
    },
    header: {
        height: 60 * StylesVariables.responsiveMulti
    },
    head: {
        flex: 3.5
    },
    headBottom: {
        flex: 1,
        maxHeight: 25 * StylesVariables.responsiveMulti
    },
    body: {
        flex: 7,
        maxHeight: 300 * StylesVariables.responsiveMulti
    },
    scrollView: {
        flex: 1,
    },
    logoImgContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logoImg: {
        width: (700/4.5) * StylesVariables.responsiveMulti,
        height: (484/4.5) * StylesVariables.responsiveMulti
    },
    middleContainer: {
        flex: 2,
        maxHeight: 400 * StylesVariables.responsiveMulti,
        justifyContent: 'flex-end'
    },
    middleText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.titleFontSize + 8,
        textAlign: 'center',
        fontWeight: '300',
        color: StylesVariables.textColor
    },
    titleContainer: {
        flex: 1,
        maxHeight: 50 * StylesVariables.responsiveMulti,
        justifyContent: 'center'
    },
    mainTitleText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.titleFontSize + 10,
        textAlign: 'center',
        color: StylesVariables.orangeColor
    },
    titleText: {
        fontFamily: StylesVariables.titleFont,
        fontSize: StylesVariables.titleFontSize,
        textAlign: 'center',
        letterSpacing: 1,
        color: StylesVariables.mainColor,
        fontWeight: '600'
    },
    screenTitleMax: {
        maxWidth: 220 * StylesVariables.multi
    },
    bodyContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    inputButton: {
        flex: 1,
        maxHeight: 68 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ouContainer: {
        flex: 0.3,
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
    buttonInputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 2
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
    inputFieldCheckContent: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: 310 * StylesVariables.responsiveMulti,
    },
    checkStyle: {
        maxWidth: 200 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.backgroundColor,
        borderColor: StylesVariables.backgroundColor,   
        height: 40 * StylesVariables.responsiveMulti
    },
    textCheckStyle: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 2,
        color: StylesVariables.mainColor
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
        color: StylesVariables.mainColor
    }
});