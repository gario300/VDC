import AppSizes from './sizes.style';
import AppTexts from './texts.style';
import AppTheme from './theme.style'

const logoSize = {
    w: 500 / 6,
    h: 500 / 6
}

const responsiveMulti = 
AppSizes.windowWidth >= AppSizes.XXLarge ? 1.7 
: AppSizes.windowWidth >= AppSizes.LargeM ? 1.14 
: 1;

/*
const responsiveHeightMulti = 
AppSizes.windowHeight >= 1024 ? 1.22
: AppSizes.windowHeight > 667 ? 1.16
: AppSizes.windowHeight > 600 ? .88
: 1;
*/
const responsiveHeightMulti = ((AppSizes.windowHeight * 100) / 667) / 100;

const inputMulti = AppSizes.windowWidth >= AppSizes.XXLarge ? 1.2 : AppSizes.windowWidth >= AppSizes.XLarge ? 1.3 : AppSizes.windowWidth >= AppSizes.Large ? 1.1 : 1;
const headerMulti = AppSizes.windowWidth >= AppSizes.XXLarge ? 1.3 : AppSizes.windowWidth >= AppSizes.XLarge ? 1.1 : AppSizes.windowWidth >= AppSizes.Large ? 1 : .85;

/**** COLORS */
const backgroundColor = 'white';
const mainColorImg = '#EFF0E9';
const orangeColor = '#DF4D2F';
const mainColorOpacity = '#3C4858';
const mainColorLight = '#D2DAE6';
const mainColorDark = "rgb(88, 88, 88)";
const mainColorBlack = "rgb(11, 1, 1)";
const mainColorOverlay = 'rgba(33, 33, 33, .25)';
const mainColorOverlayLight = 'rgba(33, 33, 33, .10)';
const mainUnderlay = '#EFE8E6'; 
const blackColor = 'rgb(33, 33, 33)';
const lightWhiteColor = 'rgb(250, 250, 250)';
const shadowColor = 'rgb(33, 33, 33)';
const greenColor = "rgb(45, 160, 105)";
const redColor = "#E11014";
const greenColorLight = "rgb(105, 240, 155)";
const grayColor = "rgb(145, 145, 145)";
const lightGrayColor = "rgb(205, 205, 205)";
const yellowColor = "rgb(245, 185, 35)";
const textGrayColor = "rgb(105, 105, 105)";
const grayDarkColor = "rgb(55, 65, 75)";
const borderInputColor = "#8492A6"
const fillColor = AppTheme.mainColor;
const whiteColor = 'white'
const statusColors = ["#000", "#77D353", "#FF9900", "#F95F62", "#F95F62", "#77D353", "#539144"];
const verticalToastsColors = [ 'white', '#969FA9', '#77D352', '#343F4B', '#24A6FF' ]
const dangerColor = "#E1332B"
const appText = {
    fontFamily: AppTexts.textFont,
    color: AppTheme.textColor,
    fontSize: AppTexts.textFontSize,
    fontWeight: "600",
    textAlign: 'left'
}
const blackColors = 'black';
const appTextInput = {
    fontFamily: AppTexts.mediumFont,
    color: AppTheme.textColor,
    fontSize: AppTexts.textFontSize * 1.2,
    fontWeight: "600",
    textAlign: 'left'
}

const appTextMinor = {
    fontFamily: AppTexts.textFont,
    color: AppTheme.textColor,
    fontSize: AppTexts.textFontSize * 0.8,
    textAlign: 'left'
}

const appTitleLarge = {
    fontFamily: AppTexts.titleFont,
    color: AppTheme.textColor,
    fontSize: AppTexts.titleFontSize * 1.4,
    textAlign: 'left'
}

const appTitle = {
    fontFamily: AppTexts.titleFont,
    color: AppTheme.textColor,
    fontSize: AppTexts.titleFontSize,
    textAlign: 'left'
}

const appTextMedium = {
    fontFamily: AppTexts.mediumFont,
    color: AppTheme.textColor,
    fontSize: AppTexts.textFontSize,
    textAlign: 'left'
}

const appSubTitle = {
    fontFamily: AppTexts.titleFont,
    color: AppTheme.textColor,
    lineHeight: AppTexts.subTitleFontSize * 1.3,
    fontSize: AppTexts.subTitleFontSize,
    textAlign: 'left'
}
// blob
const currentUtilities = {
    mainColor: '#3FB8BD',
    mainColorSaturate: '#07717B'
}
const StylesVariables = {
    whiteColor,
    currentUtilities,
    ...AppSizes,
    ...AppTexts,
    ...AppTheme,
    appText,
    appTitleLarge,
    appTextInput,
    appTitle,
    appTextMedium,
    appSubTitle,
    mainColorImg: mainColorImg,
    mainColorLight: mainColorLight,
    mainColorDark: mainColorDark,
    mainColorBlack: mainColorBlack,
    orangeColor: orangeColor,
    mainColorOverlay: mainColorOverlay,
    mainColorOverlayLight: mainColorOverlayLight,
    mainColorOpacity: mainColorOpacity,
    backgroundColor: backgroundColor, 
    blackColor: blackColor,
    greenColor: greenColor,
    fillColor: fillColor,
    greenColorLight: greenColorLight,
    redColor: redColor,
    lightWhiteColor: lightWhiteColor,
    grayColor: grayColor,
    lightGrayColor: lightGrayColor,
    yellowColor: yellowColor,
    textGrayColor: textGrayColor,
    grayDarkColor: grayDarkColor,
    shadowColor: shadowColor,
    mainUnderlay: mainUnderlay,
    inputMulti: inputMulti,
    responsiveMulti: responsiveMulti,
    responsiveHeightMulti: responsiveHeightMulti,
    headerMulti: headerMulti,
    borderInputColor: borderInputColor,
    statusColors: statusColors,
    logoSize,
    verticalToastsColors,
    blackColors,
    dangerColor

};

export default StylesVariables;
