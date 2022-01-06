import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import StylesVariables from './app.style';
import sizes from './sizes.style'
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        zIndex: 500
    },
    row: {
        width: '100%',
        padding: StylesVariables.spacing,
        paddingHorizontal: StylesVariables.spacing*2
    },
    rowSearch: {
        width: '100%',
        padding: StylesVariables.spacing,
        paddingHorizontal: StylesVariables.spacing*2
    },
    content: {
        flex: 1,
        flexDirection: 'column',
    },
    head: {
        flexDirection: 'row',
    },
    contentC: {
        flex: 1,
        justifyContent: 'center'
    },
    contentCText: {
        ...StylesVariables.appTitle,
        fontFamily: StylesVariables.subTitleFont,
        color: StylesVariables.borderColor,
        textAlign: 'center',
        fontSize: StylesVariables.titleFontSize - 4
    },
    footer: {
        justifyContent: 'space-evenly',
        marginBottom: 4
    },
    btnFooter: {
        height: 46 * StylesVariables.responsiveMulti,
        marginBottom: StylesVariables.spacing,
        marginHorizontal: StylesVariables.spacing
    },
    asideContainer: {
        flex: 1,
        margin: StylesVariables.spacing * 2,
        alignItems: 'flex-end'
      
    },
    closeButton: {

    },
    titleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    title: {
        ...StylesVariables.appTitle,
        fontFamily: StylesVariables.mediumFont,
        textAlign: 'center',
        fontSize: StylesVariables.titleFontSize + 4
    },
    titleMinor: {
        fontSize: StylesVariables.titleFontSize - 6,
    },


    lineSeparator: {
        height: 1,
        backgroundColor: StylesVariables.fillColor
    },

    buttonActionContainer: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 40 * StylesVariables.responsiveHeightMulti
    },
    buttonContent: {
        width: 172
    },

    buttonsContainer: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: 45 * StylesVariables.responsiveMulti
    },
    buttonInput: {
        width: "45%",
        justifyContent: 'center'
    },


    modalInfo: {
        flex: 1,
        justifyContent: 'center'
    },
    modalSubscriptionInfo: {
        flex: 1,
        justifyContent: 'space-around'
    },
    
    titleText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.titleFontSize + 8,
        textAlign: 'center',
        alignSelf: 'center',
        maxWidth: 260 * StylesVariables.responsiveMulti,
        color: StylesVariables.orangeColor,
    },
    messageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        maxWidth: StylesVariables.maxWidth,
        marginHorizontal: 40 * StylesVariables.responsiveMulti
    },
    messageText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.titleFontSize,
        lineHeight: StylesVariables.titleLineHeight,
        textAlign: 'center',
        color: StylesVariables.mainColor
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
        maxHeight: 10 * StylesVariables.responsiveMulti
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
        alignItems: 'center',
        paddingVertical: StylesVariables.spacing * 2 * StylesVariables.responsiveMulti
    },
    iconImg: {
        width: (90) * StylesVariables.responsiveMulti,
        height: (90) * StylesVariables.responsiveMulti
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
    spacing: {
        height: StylesVariables.spacing
    },    
    boxContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    box: {
        width: 'auto',
        minWidth: '25%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderWidth: 3,
        padding: 8,
        paddingVertical: StylesVariables.spacing*1.5
    },
    textBox: {
        ...StylesVariables.appTextMedium,
        color: 'white',
        marginTop: 4,
        marginHorizontal: 4,
        fontSize: 8
    },
    button: {
        width: '100%',
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: .5,
        borderColor: '#2EC0BA',
        borderRadius: 8,
        marginVertical: 1
    },
    textButton: {
        ...StylesVariables.appSubTitle
    },
    normalText:{
        ...StylesVariables.appText,
        color: 'black'
    },
    sliderContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginHorizontal: StylesVariables.spacing * 2 * StylesVariables.responsiveMulti
    },
    sliderValuesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sliderText: {
        ...StylesVariables.appTextMedium,
        color: StylesVariables.secondaryColor
    },
    sliderTextRight: {
        ...StylesVariables.appText,
        color: StylesVariables.grayColor
    },
    sliderTextValue: {
        ...StylesVariables.appTextMedium
    },
});
