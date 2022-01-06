import { StyleSheet, Platform } from 'react-native';
import StylesVariables from './../Styles/app.style';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 0 : 0,
        backgroundColor: StylesVariables.backgroundColor
    },
    modalContent: {
        flex: 1
    },
    modalInfo: {
        flex: 1,
        justifyContent: 'center'
    },
    modalSubscriptionInfo: {
        flex: 1,
        justifyContent: 'space-around'
    },
    titleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: 10 * StylesVariables.responsiveMulti,
    },
    titleText: {
        fontFamily: StylesVariables.titleFont,
        fontSize: StylesVariables.titleFontSize,
        lineHeight: StylesVariables.titleFontSize + 5,
        textAlign: 'center',
        alignSelf: 'center',
        maxWidth: 320 * StylesVariables.responsiveMulti,
        color: StylesVariables.secondaryColor
    },
    messageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        maxWidth: StylesVariables.maxWidth,
        marginHorizontal: (StylesVariables.spacing * 2) * StylesVariables.responsiveMulti
    },
    messageText: {
        ...StylesVariables.appTextMedium,
        textAlign: 'center',
        fontSize: StylesVariables.titleFontSize - 6,
        lineHeight: StylesVariables.textFontSize + 8,
        color: StylesVariables.backgroundInputLogin
    },
    messageLargeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    messageLargeText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 3,
        lineHeight: StylesVariables.textLineHeight - 3,
        marginHorizontal: 20 * StylesVariables.responsiveMulti,
        color: StylesVariables.mainColor
    },
    innerSpace: {
        flex: 1,
        maxHeight: StylesVariables.spacing * StylesVariables.responsiveHeightMulti
    },
    bottomView: {
        flex: 1
    },
    titlePriceContainer: {
        flex: 2,
        position: 'relative',
        justifyContent: 'center',
        maxHeight: 65 * StylesVariables.responsiveMulti
    },
    titlePriceText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.titleFontSize + 10,
        textAlign: 'center',
        color: StylesVariables.orangeColor,
    },
    titlePriceTextAnnounce: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.titleFontSize + 4,
        textAlign: 'center',
        color: StylesVariables.orangeColor,
    },
    titlePriceTextOver: {
        position: 'absolute',
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.titleFontSize + 5,
        textAlign: 'center',
        alignSelf: 'center',
        letterSpacing: 1,
        color: StylesVariables.orangeColor,
    },
    imageContainer: {
        flex: 2,
        justifyContent: 'center',
        maxHeight: 160 * StylesVariables.responsiveMulti
    },
    imageContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageSubscription: {
        width: 50,
        height: 50
    },
    textsContainer: {
        flex: 1,
        justifyContent: "space-around",
    },
    textsContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15 * StylesVariables.responsiveMulti
    },
    iconContainer: {
        justifyContent: 'center',
        paddingHorizontal: 5 * StylesVariables.responsiveMulti
    },
    textIconContainer: {
        paddingHorizontal: 7 * StylesVariables.responsiveMulti,
        justifyContent: 'center'
    },
    textIconText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 2,
        lineHeight: StylesVariables.textLineHeight,
        textAlign: 'center',
        color: StylesVariables.mainColor,
    },
    priceMessageText: {
        flex: 1,
        justifyContent: 'center'
    },
    priceText: {
        fontFamily: StylesVariables.titleFont,
        fontSize: StylesVariables.titleFontSize + 3,
        lineHeight: StylesVariables.titleLineHeight + 5,
        textAlign: 'center',
        color: StylesVariables.mainColor
    },
    priceTextMid: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 2,
        lineHeight: StylesVariables.titleLineHeight + 4,
        marginBottom: 2 * StylesVariables.responsiveMulti,
        textAlign: 'center',
        color: StylesVariables.mainColor
    },
    priceTextBottom: {
        fontFamily: StylesVariables.titleFont,
        fontSize: StylesVariables.titleFontSize + 3,
        lineHeight: StylesVariables.titleLineHeight + 6,
        textAlign: 'center',
        color: StylesVariables.mainColor
    },
    submitButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    conditionsTextContainer: {
        flex: 1,
        maxHeight: 80 * StylesVariables.responsiveMulti,
        justifyContent: 'flex-start'
    },
    conditionsText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 2,
        textAlign: 'center',
        color: StylesVariables.mainColor
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10 * StylesVariables.responsiveMulti
    },
    iconImg: {
        width: StylesVariables.logoSize.w * StylesVariables.responsiveMulti,
        height: StylesVariables.logoSize.h * StylesVariables.responsiveMulti
    },
    conditionsTextUnder: {
        textDecorationLine: 'underline'
    },
    ruleTextTitle: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.titleFontSize + 4,
        lineHeight: StylesVariables.titleLineHeight,
        textAlign: 'center',
        paddingBottom: 4 * StylesVariables.responsiveMulti,
        color: StylesVariables.mainColor
    },
    mainTextColor: {
        color: StylesVariables.mainColor
    }
});
