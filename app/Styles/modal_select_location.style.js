import { StyleSheet, StatusBar } from 'react-native';
import StylesVariables from './app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: StylesVariables.backgroundColor,
        zIndex: 500
    },
    modalContainer: {
        flex: 1,
        backgroundColor: StylesVariables.backgroundColor,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
    },
    head: {
        flexDirection: 'row',
    },
    asideContainer: {
        flex: 1,
        margin: StylesVariables.spacing * 2
    },
    closeButton: {

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
    titleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    titleText: {
        ...StylesVariables.appTitle,
        fontFamily: StylesVariables.mediumFont,
        textAlign: 'center'
    },
    spacing: {
        height: StylesVariables.spacing
    },
    container: {
        flex: 1,
        maxHeight: 400 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.mainColorLight
    },
    modalContent: {
        flex: 1
    },
    scrollContainer: {
        flex: 1,
        maxHeight: 200 * StylesVariables.responsiveHeightMulti
    },
    contentContainer: {
        flex: 1,
        paddingBottom: 20 * StylesVariables.responsiveMulti,
    },
    content: {
        flex: 1,
        marginHorizontal: 15 * StylesVariables.responsiveMulti
    },
    filterTitle: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 10 * StylesVariables.responsiveMulti
    },
    filterTitleText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 1,
        lineHeight: StylesVariables.textLineHeight,
        color: StylesVariables.textColor,
        fontWeight: '800'
    },
    filterContent: {
        flex: 1,
        marginHorizontal: 10 * StylesVariables.responsiveMulti
    },
    filterSection: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5 * StylesVariables.responsiveMulti,
    },
    filterInfoContainer: {
        flex: 4,
        justifyContent: 'center'
    },
    filterInfo: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize,
        color: StylesVariables.textColor,
        lineHeight: StylesVariables.textLineHeight,
    },
    filterCheckContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    filterCheck: {
        width: 20 * StylesVariables.responsiveMulti,
        height: 20 * StylesVariables.responsiveMulti,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: StylesVariables.fillColor,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    filterInner: {
        margin: 0,
        flex: 1,
        borderRadius: 4,
        borderWidth: 0,
        borderColor: StylesVariables.fillColor,
    },
    filterInnerChecked: {
        backgroundColor: StylesVariables.fillColor
    },

    searchElementButton: {
        height: 40 * StylesVariables.responsiveHeightMulti,
        marginBottom: 5 * StylesVariables.responsiveMulti,
        padding: StylesVariables.spacing * 1 * StylesVariables.responsiveMulti,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
    },
    searchElementContent: {
        flex: 1,
        marginHorizontal: 5 * StylesVariables.responsiveMulti
    },
    searchElementText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize,
        color: StylesVariables.textColor,
        lineHeight: StylesVariables.textLineHeight,
    },

    selectedFilters: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    filterElementContainer: {
        width: "80%",
        height: 40 * StylesVariables.responsiveHeightMulti,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 30,
        marginTop: StylesVariables.spacing * 1,
        alignSelf: 'center',
        borderColor: 'rgba(0,0,0,0.3)',
    },
    filterElementText: {
        ...StylesVariables.appTextMedium,
        marginHorizontal: StylesVariables.spacing
    },
    filterElementClose: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 38 * StylesVariables.responsiveMulti,
        height: 38 * StylesVariables.responsiveMulti,
    },

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 44 * StylesVariables.responsiveMulti,
        borderColor: StylesVariables.lightGrayColor,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        marginVertical: 6 * StylesVariables.responsiveMulti,
        marginHorizontal: 12 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.whiteColor
    },
    searchInput: {
        flex: 1,
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize,
        color: StylesVariables.textColor,
        paddingHorizontal: 10 * StylesVariables.responsiveMulti
    },
    clearIcon: {
        justifyContent: 'center',
        paddingHorizontal: 3 * StylesVariables.responsiveMulti
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
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
        ...StylesVariables.appText
    },
    sliderTextValue: {
        ...StylesVariables.appTextMedium
    },
    btnApply: {
        flex: 1,
        maxHeight: 68 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterElementTextContainer: {
        flex: 1,
        paddingHorizontal: StylesVariables.spacing * 1,
        flexDirection: "row",
        alignItems: 'center'
    }
});
