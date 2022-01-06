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
        flex: 1
    },
    sliderImageComponent: {
        overflow: 'hidden',
    },
    productTextContainer: {
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

    infoTitleContainer: {
        flex: 1
    },
    infoTitle: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 2,
        lineHeight: StylesVariables.textLineHeight + 2,
        color: StylesVariables.mainColor
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
        ...StylesVariables.appTitle,
        color: StylesVariables.secondaryColor
    },
    infoText: {
        ...StylesVariables.appText
    },
    infoDescription: {
        ...StylesVariables.appTextMedium,
        fontSize: StylesVariables.subTitleFontSize - 2,
        lineHeight: StylesVariables.subTitleFontSize + 3
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgIconContainer: {
        flex: .13,
        justifyContent: 'center'
    },
    imageIcon: {
        width: 15 * StylesVariables.responsiveMulti,
        height: 15 * StylesVariables.responsiveMulti
    },
    rowButtonText: {
        flex: 1.5,
        flexDirection: 'row',
        paddingVertical: StylesVariables.spacing * 1,
        justifyContent: 'flex-start'
    },
    inlineText: {
        flex: 1,
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.textFontSize,
        lineHeight: StylesVariables.textFontSize + 5
    },
    itemText: {
        flex: .7,
        ...StylesVariables.appText,
        lineHeight: StylesVariables.textFontSize + 5
    },
    itemTextRight: {
        flex: .7
    },
    iconOrganicContainer: {
        flex: 1,
        position: 'absolute',
        left: StylesVariables.spacing / 2 * StylesVariables.responsiveMulti,
        top: StylesVariables.spacing / 2 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.secondaryColor,
        flexDirection: 'row',
        borderRadius: 30,
        width: 40 * StylesVariables.responsiveMulti,
        height: 40 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgIconOrganic: {
        alignSelf: 'center',
        width: 25 * StylesVariables.responsiveMulti,
        height: 25 * StylesVariables.responsiveMulti
    },
    iconContainer: {
        flex: 1,
        position: 'absolute',
        right: StylesVariables.spacing / 2 * StylesVariables.responsiveMulti,
        top: StylesVariables.spacing / 2 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.secondaryColor,
        flexDirection: 'row',
        borderRadius: 30,
        width: 34 * StylesVariables.responsiveMulti,
        height: 34 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: 24 * StylesVariables.responsiveMulti,
        alignSelf: 'center',
        paddingLeft: 2,
        paddingTop: 3,
        color: StylesVariables.whiteColor
    },
    cartButton: {
        flex: 1,
        maxHeight: 50 * StylesVariables.responsiveHeightMulti,
        marginHorizontal: StylesVariables.spacing * 1,
        marginVertical: StylesVariables.spacing / 2,
        borderRadius: 10,
        backgroundColor: StylesVariables.mainColor
    },
    btnContent: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconBtnContainer: {
        marginHorizontal: StylesVariables.spacing * 2,
        marginRight: StylesVariables.spacing,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTitleContainer: {
        marginRight: StylesVariables.spacing * 2,
        marginLeft: StylesVariables.spacing * 1,
        justifyContent: 'center',
    },
    btnTitle: {
        ...StylesVariables.appTextMedium,
        color: StylesVariables.textColor,
        fontFamily: StylesVariables.subTitleFont,
        fontSize: StylesVariables.inputFontSize
    },
    btnDisabled: {
        opacity: 0.5
    }
});