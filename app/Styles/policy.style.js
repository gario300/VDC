import { StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer: {
        justifyContent: 'center'
    },
    textContainer: {
        flexDirection: 'row',
        marginHorizontal: 10 * StylesVariables.responsiveMulti
    },
    titleText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.titleFontSize,
        lineHeight: StylesVariables.titleLineHeight,
        textAlign: 'center',
        marginHorizontal: 5 * StylesVariables.responsiveMulti,
        color: StylesVariables.mainColor
    },
    text: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 4,
        lineHeight: StylesVariables.textLineHeight - 4,
        color: StylesVariables.mainColor
    },
    subtitle: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize,
        lineHeight: StylesVariables.titleLineHeight,
        color: StylesVariables.mainColor
    },
    subsubtitle: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 4,
        lineHeight: StylesVariables.textLineHeight,
        color: StylesVariables.fillColor
    },
    textCenter: {
        textAlign: 'center'
    },
    innerSpace: {
        height: 10 * StylesVariables.responsiveMulti,
        maxHeight: 10 * StylesVariables.responsiveMulti
    },
    scrollContainer: {
        flex: 1
    },
    scrollContent: {
        flex: 1,
        justifyContent: 'center'
    },
    loader: {
        backgroundColor: StylesVariables.secondaryColor
    }
});
