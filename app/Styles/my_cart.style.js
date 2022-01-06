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
    inlineContent: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cartTitleText: {
        ...StylesVariables.appTextMedium,
        fontSize: StylesVariables.textFontSize + 1,
        color: StylesVariables.secondaryColor
    },
    cartText: {
        ...StylesVariables.appTextMedium,
    },
    cartTitleTextBold: {
        fontFamily: StylesVariables.subTitleFont
    },
    content: {
        paddingHorizontal: StylesVariables.spacing * StylesVariables.responsiveMulti,
        minHeight: 50 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center'
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
    emptyResult: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyResultSquare: {
        width: 80 * StylesVariables.responsiveMulti,
        height: 80 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.whiteColor,
        justifyContent: 'center',
        borderRadius: 12,
        alignItems: 'center'
    },
    emptyIcon: {
        fontSize: 48 * StylesVariables.responsiveMulti,
        color: StylesVariables.textColor
    },
    backgroundImgContainer: {
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,

        top: 0,
        bottom: 0,
        width: '100%'
    },
    backgroundImg: {
        width: (StylesVariables.windowWidth/1.05) * StylesVariables.responsiveMulti,
        height: (StylesVariables.windowWidth/1.05) * StylesVariables.responsiveMulti,
        opacity: .17,
        alignSelf: 'center'
    },
    
});