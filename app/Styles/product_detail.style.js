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
    scrollContent: {
        flex: 1,
    },
    content: {
        marginHorizontal: StylesVariables.spacing * StylesVariables.responsiveMulti
    },
    contentWarning: {
        marginHorizontal: 8 * StylesVariables.responsiveMulti,
        backgroundColor: "#EFEFEF",
        borderRadius: 10,
        marginVertical: 10 * StylesVariables.responsiveMulti
    },
    body: {
        flex: 1
    },
    mainTitle: {
        flex: 1,
        justifyContent: 'center'
    },
    mainTitleText: {
        fontFamily: StylesVariables.titleFont,
        fontSize: StylesVariables.titleFontSize - 1,
        lineHeight: StylesVariables.titleLineHeight,
        textAlign: 'center',
        paddingVertical: 7 * StylesVariables.responsiveMulti,
        color: StylesVariables.textColor
    },
    listContainer: {
        flex: 10,
        justifyContent: 'flex-start'
    },
    listColumn: {
        flex: 1,
        marginHorizontal: 10 * StylesVariables.responsiveMulti
    },
    imageCarouselContainer: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    sliderImageComponent: {
        width: 182 * StylesVariables.responsiveMulti,
        height: 182 * StylesVariables.responsiveMulti
    },
    textDisplay: {
    },
    tables: {
        flex: 1,
    },
    textTableTwo: {
        flex: 1,
        flexDirection: 'row'
    },
    textTableRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingRight: StylesVariables.spacing
    },
    productDescriptionTitleText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize,
        color: StylesVariables.textColor
    },
    productDescription: {
        flex: 1
    },
    productDescriptionText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize,
        lineHeight: StylesVariables.textLineHeight - 2,
        color: StylesVariables.textColor
    },
    lineSeparator: {
        height: 1 * StylesVariables.responsiveMulti,
        backgroundColor: '#DADADA'
    },
    infoRow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    infoRowBreak: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    infoLeftRow: {
        flex: 2
    },
    infoRightRow: {
        flex: 2,
    },
    infoTitle: {
        ...StylesVariables.appTitle
    },
    infoCategories: {
        ...StylesVariables.appTitle,
        color: StylesVariables.secondaryColor
    },
    infoText: {
        ...StylesVariables.appTextMedium,
        fontSize: StylesVariables.textFontSize + 1
    },
    textTableTitle: {
        ...StylesVariables.appTextMedium,
        fontSize: StylesVariables.textFontSize - 1,
        color: StylesVariables.textSecundaryColor
    },
    textNutritionContainer: {
        paddingLeft: StylesVariables.spacing * .5,
        minHeight: 26 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center'
    },
    textTwo: {
        ...StylesVariables.appTextMedium,
        fontSize: StylesVariables.textFontSize + 1,
        color: StylesVariables.textColorLight
    },
    sectionTitle: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.textColor
    },
    sectionTitleColor: {
        color: StylesVariables.mainColor
    },
    textPrice: {
        ...StylesVariables.appTitle,
        fontSize: StylesVariables.subTitleFontSize + 3
    },
    infoTextRight: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize,
        lineHeight: StylesVariables.textLineHeight,
        color: StylesVariables.textColor
    },
    infoLeftRowList: {
        paddingRight: 7 * StylesVariables.responsiveMulti
    },
    infoRightRowList: {
        flex: 1
    },
    infoTextRightList: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 2,
        color: StylesVariables.grayColor
    },
    boldText: {
        fontWeight: '800'
    },
    halfSpace: {
        height: StylesVariables.spacing * 0.5 * StylesVariables.responsiveHeightMulti
    },
    borderLine: {
        height: 0.5,
        backgroundColor: StylesVariables.textColorLight
    },
    spacing: {
        height: StylesVariables.spacing * StylesVariables.responsiveHeightMulti
    },
    separatorInfo: {
        height: 2 * StylesVariables.responsiveMulti
    },
    scrollBottom: {
        height: 30 * StylesVariables.responsiveMulti
    },
    bottomButtonsContainer: {
        height: 60 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.mainUnderlay,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
        height: 40 * StylesVariables.responsiveMulti,
        marginHorizontal: 4 * StylesVariables.responsiveMulti
    },

    warningContainer: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10 * StylesVariables.responsiveMulti
    },
    warningIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    warningTitleContainer: {
        flex: 6,
        justifyContent: 'center',
        marginHorizontal: 10 * StylesVariables.responsiveMulti
    },
    warningTitle: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 1,
        color: StylesVariables.redColor,
    },
    warningInfoContainer: {
        flex: 1,
        marginBottom: 5 * StylesVariables.responsiveMulti,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    infoLeftRowList: {
        flex: .12,
        alignItems: 'center',
        height: 30
    },
    warningInfo: {
        flex: 1,
        marginTop: 4 * StylesVariables.responsiveMulti,
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 2,
        color: StylesVariables.textColor,
    },
    columnButton: {
        flexDirection: 'column'
    },
    rowButton: {
        flexDirection: 'row',
        flex: 1,
        minHeight: 42 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inlineRow: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inlineRowMargin: {
        marginBottom: StylesVariables.spacing * .5
    },
    imgIconContainer: {
        flex: .13,
        justifyContent: 'center'
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: StylesVariables.spacing * 1,
        marginHorizontal: StylesVariables.spacing * 1,
        marginBottom: 0
    },
    imageIcon: {
        width: 15 * StylesVariables.responsiveMulti,
        height: 15 * StylesVariables.responsiveMulti
    },
    rowButtonText: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    inlineText: {
        flex: 1,
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.textFontSize,
        lineHeight: StylesVariables.textFontSize + 5
    },
    contentDescription: {
        marginHorizontal: StylesVariables.spacing * StylesVariables.responsiveMulti
    },
    contentBody: {
        backgroundColor: StylesVariables.whiteColor
    },
    selectQuantityContainer: {
        backgroundColor: StylesVariables.backgroundColor,
        height: 80 * StylesVariables.responsiveHeightMulti,
        flexDirection: 'row'
    },
    addRemoveButton: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: StylesVariables.secondaryColor,
        width: 48 * StylesVariables.responsiveMulti,
        height: 48 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconAddRemove: {
        color: StylesVariables.textColor,
        fontSize: StylesVariables.textFontSize
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cartButton: {
        flex: 1.4,
        marginHorizontal: StylesVariables.spacing,
        justifyContent: 'center'
    }
});