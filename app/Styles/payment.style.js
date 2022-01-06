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
    inlineTitle: {
        flexDirection: 'row',
    },
    inlineHeadContent: {
        flex: 1,
        maxHeight: 104 * StylesVariables.responsiveHeightMulti,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonBody: {
        flex: 1,
        flexDirection: 'column',
    },
    titleText: {
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.textFontSize + 1
    },
    additionalInfo: {
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.textFontSize - 2,
        lineHeight: StylesVariables.textFontSize + 2,
        width: "90%",
        alignSelf: 'center',
        maxWidth: 320 * StylesVariables.responsiveMulti,
    },
    cartTitleTextBold: {
        fontFamily: StylesVariables.subTitleFont
    },
    content: {
        flex: 1,
        paddingHorizontal: StylesVariables.spacing * StylesVariables.responsiveMulti,
        minHeight: 50 * StylesVariables.responsiveHeightMulti,
    },
    lineSeparator: {
        height: .5 * StylesVariables.responsiveHeightMulti,
        backgroundColor: StylesVariables.textColorLight
    },
    cartItemContainer: {
        flex: 1,
        backgroundColor: StylesVariables.whiteColor,
        height: 100 * StylesVariables.responsiveHeightMulti,
    },
    cartItemContent: {
        flex: 1,
        marginHorizontal: StylesVariables.spacing * 2 * StylesVariables.responsiveMulti,
        justifyContent: 'space-evenly'
    },
    cartItemLocContent: {
        flex: 1,
        marginHorizontal: StylesVariables.spacing * 2 * StylesVariables.responsiveMulti,
    },
    cartItemInfo: {
        flex: 1,
        justifyContent: 'center'
    },
    cartItemPrice: {
        flex: .24,
        justifyContent: 'center'
    },
    cartItemPriceText: {
        ...StylesVariables.appTextMedium
    },
    addRemoveCount: {
        width: 42 * StylesVariables.responsiveMulti,
        justifyContent: 'center'
    },
    addRemoveCountText: {
        ...StylesVariables.appSubTitle,
        textAlign: 'center',
    },
    selectButtons: {
        flex: 1.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cartTotalPrice: {
        flex: 1,
        justifyContent: 'center'
    },
    cartTotalPriceText: {
        marginLeft: StylesVariables.spacing,
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.subTitleFontSize - 1
    },
    deleteButton: {
        width: 48 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartItemTitle: {
    },
    cartItemTitleText: {
        marginLeft: StylesVariables.spacing,
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.subTitleFontSize - 3
    },
    leftIcon: {
        width: 48 * StylesVariables.responsiveMulti,
        alignItems: 'center',
    },
    itemLocationContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    itemLocationText: {
        ...StylesVariables.appTextMedium,
        fontSize: StylesVariables.textFontSize - 2,
        lineHeight: StylesVariables.textFontSize + 3,
    },

    spacing: {
        height: StylesVariables.spacing * StylesVariables.responsiveHeightMulti
    },
    
    payButton: {
        height: 48 * StylesVariables.responsiveHeightMulti,
    },
    
    payButtonFinish: {
        height: 54 * StylesVariables.responsiveHeightMulti,
        width: "90%",
        maxWidth: 320 * StylesVariables.responsiveMulti,
        alignSelf: 'center'
    },
    
    payFooterContainer: {
        flex: 1,
        backgroundColor: StylesVariables.textColor,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    payButtonText: {
        marginHorizontal: StylesVariables.spacing,
        ...StylesVariables.appTextMedium,
        fontSize: StylesVariables.textFontSize + 2,
        color: StylesVariables.whiteColor,
    },
    payButtonTotal: {
        marginHorizontal: StylesVariables.spacing,
        ...StylesVariables.appTextMedium,
        color: StylesVariables.whiteColor,
        fontSize: StylesVariables.textFontSize + 2,
        fontFamily: StylesVariables.subTitleFont
    },

    checkStyle: {
        backgroundColor: StylesVariables.backgroundColor,
        borderWidth: 0
    },

    inputContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
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