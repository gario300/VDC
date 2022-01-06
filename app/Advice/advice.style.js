import { StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StylesVariables.mainColor,
    },
    body: {
        flex: 1
    },
    scroll: {
        flex: 1
    },
    itemsContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    newsItemContainer: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5
    },
    newsItemTouch: {
        flex: 1,
        minHeight: 70 * StylesVariables.responsiveMulti,
        marginLeft: 15, 
        marginRight: 15,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: StylesVariables.mainColor,
        backgroundColor: StylesVariables.mainColor
    },
    newsItemContent: {
        flex: 1,
        justifyContent: 'center'
    },
    itemContainer: {
        flex: 1
    },
    newsItemTitle: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    newsItemTitleText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.titleFontSize,
        fontWeight: '600',
        textAlign: 'center',
        color: StylesVariables.fillColor
    },
    itemContent: {
        flex: 1
    },
    itemWebViewContent: {
        flex: 1,
        height: 400,
        backgroundColor: 'white'
    },
    itemText: {
        fontFamily: StylesVariables.textFont,
        color: StylesVariables.textColor
    },
    itemTitle: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5
    },
    itemTitleText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.titleFontSize - 2,
        fontWeight: '800',
        lineHeight: StylesVariables.titleLineHeight - 2,
        color: StylesVariables.secondaryColor
    },
    itemSubtitle: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5
    },
    itemDateText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize,
        fontWeight: '600',
        color: StylesVariables.notifTextColor
    },
    itemRow: {
        flex: 1,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: StylesVariables.mainColor
    },
    itemCategory: {
        justifyContent: 'center'
    },
    itemCategoryText: {
        fontSize: StylesVariables.textFontSize - 3,
        lineHeight: StylesVariables.textLineHeight,
        fontWeight: '400',
        color: StylesVariables.secondaryColor,
        textDecorationLine: "underline"
    },
    itemDate: {
        justifyContent: 'center'
    },
    itemDescription: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5
    },
    itemDescriptionText: {
        fontSize: StylesVariables.textFontSize - 2,
        lineHeight: StylesVariables.textLineHeight - 2,
        color: "#333"
    },
    itemImg: {
        width: StylesVariables.windowWidth,
        height: 350 * StylesVariables.responsiveMulti,
        alignSelf: 'center'
    },
    itemContentPDF: {
        marginHorizontal: 5,
        flex: 1,
        marginBottom: 5
    },
    pdfFileLink: {
        fontSize: StylesVariables.textFontSize - 2,
        lineHeight: StylesVariables.textLineHeight,
        fontWeight: '600',
        color: StylesVariables.mainColor,
        borderColor: StylesVariables.mainColor,
        borderWidth: 1,
        flex: 1,
        textAlign: 'center'
    },
    itemContentContent: {
        flex: 1
    },
    itemContentHTML: {
        flex: 1,
        marginHorizontal: 5
    },
    baseText: {
        fontSize: StylesVariables.textFontSize - 3,
        lineHeight: StylesVariables.textLineHeight - 5,
        fontWeight: '400',
        color: StylesVariables.textColor
    },
    empty: {
        flex: 1,
        height: 10 * StylesVariables.responsiveMulti
    },
    innerEmpty: {
        flex: 1,
        height: 5 * StylesVariables.responsiveMulti
    },

    scrollView: {
        flex: 1
    },
    scrollContent: {
        flex: 1
    },
    titleContainer: {
        flex: 1,
        marginVertical: 5 * StylesVariables.responsiveMulti,
        marginHorizontal: 15 * StylesVariables.responsiveMulti,
    },
    dateContainer: {
        flex: 1,
        marginVertical: 5 * StylesVariables.responsiveMulti,
        marginHorizontal: 15 * StylesVariables.responsiveMulti,
    },
    descriptionContainer: {
        flex: 1,
        marginVertical: 10 * StylesVariables.responsiveMulti,
        marginHorizontal: 15 * StylesVariables.responsiveMulti,
    },
    itemContentImg: {
        flex: 1,
        marginVertical: 5 * StylesVariables.responsiveMulti,
        height: 180 * StylesVariables.responsiveHeightMulti,
        overflow: 'hidden',
        justifyContent: 'flex-start'
    },
    separator: {
        height: 10 * StylesVariables.responsiveMulti
    }
});