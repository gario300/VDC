import { StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StylesVariables.backgroundColor
    },
    scrollView: {
        flex: 1,
    },
    head: {
        flex: 1.3,
        justifyContent: 'center'
    },
    chats: {
        flex: 5
    },
    body: {
        flex: 3
    },
    
    headContent: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20 * StylesVariables.responsiveMulti,
    },
    upperText: {
        fontFamily: StylesVariables.titleFont,
        fontSize: StylesVariables.textFontSize + 2,
        lineHeight: StylesVariables.textLineHeight - 1,
        color: StylesVariables.textColor,
        fontWeight: '800'
    },
    buttonContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10 * StylesVariables.responsiveMulti,
        justifyContent: 'center'
    },
    buttonContact: {
        width: "90%",
        height: 100 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: StylesVariables.whiteColor
    },
    buttonContactContent: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonImageContainer: {
        flex: .7,
        justifyContent: 'center',
    },
    iconImg: {
        width: 30 * StylesVariables.responsiveMulti,
        alignSelf: 'center'
    },
    buttonTextsContainer: {
        flex: 3,
        justifyContent: 'space-around'
    },
    btnText: {
        fontFamily: StylesVariables.titleFont,
        fontSize: StylesVariables.textFontSize - 3,
        lineHeight: StylesVariables.textLineHeight - 7,
        color: StylesVariables.textColor,
        fontWeight: '800'
    },
    buttonIconContainer: {
        flex: .5,
        justifyContent: 'center'
    },

    buttonsContainer: {
        height: 72 * StylesVariables.responsiveMulti,
        justifyContent: 'center'
    },
    inputButton: {
        flex: 1,
        maxHeight: 68 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },


    inputButtonCheck: {
        flex: 1,
        maxHeight: 48 * StylesVariables.responsiveMulti,
        width: 310 * StylesVariables.responsiveMulti,
        alignSelf: 'center',
        flexDirection: "row",
        justifyContent: 'center'
    },
    checkStyle: {
        backgroundColor: StylesVariables.backgroundColor,
        borderColor: StylesVariables.backgroundColor,
        alignSelf: 'center'
    },
    textCheckStyle: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 3,
        color: StylesVariables.mainColor
    },
    textLinkContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    textLinkText: {
        fontFamily: StylesVariables.lightFont,
        fontSize: StylesVariables.textFontSize - 1,
        lineHeight: StylesVariables.textLineHeight,
        color: StylesVariables.textColor,
        fontWeight: '300'
    },

    textTitleContainer: {
        width: 288 * StylesVariables.responsiveMulti,
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 10 * StylesVariables.responsiveMulti
    },
    textTitle: {
        fontFamily: StylesVariables.lightFont,
        fontSize: StylesVariables.textFontSize + 1,
        lineHeight: StylesVariables.textLineHeight,
        color: StylesVariables.textColor,
    },

    inputField: {
        marginVertical: 10 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },

    upperSpace: {
        height: 10 * StylesVariables.responsiveMulti
    },

    attachContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10 * StylesVariables.responsiveMulti
    },
    attachContent: {
        width: 288 * StylesVariables.responsiveMulti,
        flex: 1,
        flexDirection: 'row'
    },

    attachButton: {
        width: 207 * StylesVariables.responsiveMulti,
        borderColor: StylesVariables.borderColor,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 45 * StylesVariables.responsiveMulti,
        borderRadius: 10
    },
    attachIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40 * StylesVariables.responsiveMulti
    },
    attachText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 1,
        lineHeight: StylesVariables.textLineHeight,
        color: StylesVariables.textColor,
    },

    attachResult: {
        flex: 1,
        justifyContent: 'center'
    },
    attachResultText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 2,
        lineHeight: StylesVariables.textLineHeight,
        color: StylesVariables.textColor,
        fontWeight: '300',
        textAlign: 'center'
    },

    buttonLogin: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonInput: {
        width: 320 * StylesVariables.responsiveMulti,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60 * StylesVariables.responsiveMulti
    }
});