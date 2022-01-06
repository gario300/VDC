import { StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardInfoRect: {
        flex: 1,
        paddingVertical: StylesVariables.spacing * 2,
        paddingHorizontal: StylesVariables.spacing * 1.5,
        backgroundColor: 'transparent'
    },
    cardButton: {
        flex: 1,
        paddingVertical: StylesVariables.spacing * 2,
        backgroundColor: StylesVariables.whiteColor,
        paddingHorizontal: StylesVariables.spacing * 1.5,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    cardText: {
        ...StylesVariables.appTextMedium,
        fontSize: StylesVariables.textFontSize,
        lineHeight: StylesVariables.textFontSize + 5,
        fontFamily: StylesVariables.subTitleFont,
    },
    cardTextTitle: {
        ...StylesVariables.appTextMedium,
        color: StylesVariables.textColorLight,
        fontSize: StylesVariables.textFontSize + 2,
        fontFamily: StylesVariables.titleFont,
    },
    cardTextStatus: {
        ...StylesVariables.appTextMedium,
        color: StylesVariables.mainColor,
        fontFamily: StylesVariables.subTitleFont,
    },
    spacing: {
        height: StylesVariables.spacing * 1
    },
    cardPrice: {
        ...StylesVariables.appTextMedium,
        fontSize: StylesVariables.textFontSize + 1,
        fontFamily: StylesVariables.titleFont
    },
    borderBottom: {
        borderBottomColor: StylesVariables.textColorLight,
        borderBottomWidth: .5
    },
    
    cardInfoContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    cardPriceContainer: {
        width: 100 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardRightContainer: {
        width: 60 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardTextContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: StylesVariables.spacing / 2
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    inline: {
        backgroundColor: StylesVariables.textColorLight,
        height: .5
    },

    cartItemLocContent: {
        flex: 1
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
    inlineContentButton: {
        minHeight: 40 * StylesVariables.responsiveHeightMulti,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inlineContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowButtonText: {
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    cartItemContainer: {
        flex: 1,
        paddingVertical: StylesVariables.spacing * 2,
        paddingHorizontal: StylesVariables.spacing * 1,
        backgroundColor: StylesVariables.whiteColor
    },
    inlineText: {
        flex: 1,
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.textFontSize,
        lineHeight: StylesVariables.textFontSize + 5
    },
    subTitleText: {
        flex: 1,
        ...StylesVariables.appSubTitle,
        color: StylesVariables.secondaryColor,
        fontSize: StylesVariables.subTitleFontSize - 2
    },
    qrContainer: {
        flex: 1,
        marginVertical: StylesVariables.spacing * 2, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputButton: {
        flex: 1,
        height: 60 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;