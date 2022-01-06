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
        flex: 1,
        marginHorizontal: StylesVariables.spacing * 2 * StylesVariables.responsiveMulti
    },
    titleContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    titleText: {
        ...StylesVariables.appTitle,
        textAlign: 'center'
    },
    openingHoursContainer: {
        flex: 1,
    },
    rowButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inlineRowMargin: {
        marginBottom: StylesVariables.spacing * .5
    },
    imgIconContainer: {
        flex: .2,
        justifyContent: 'center'
    },
    imageIcon: {
        width: 20 * StylesVariables.responsiveMulti,
        height: 20 * StylesVariables.responsiveMulti
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
    hoursContainer: {
        flex: 1.5,
        flexDirection: 'column'
    },
    hoursRowContainer: {
        height: 30 * StylesVariables.responsiveHeightMulti,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dayTitleContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    daysHoursInfo: {
        flex: 2.5,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    daysHoursInfoBetween: {
        justifyContent: 'space-between'
    },
    daysHoursText: {
        ...StylesVariables.appTextMedium
    },
    daysHoursTextInline: {
        marginRight: StylesVariables.spacing * .5
    },
    spacing: {
        height: StylesVariables.spacing * 1 * StylesVariables.responsiveHeightMulti
    }
});
