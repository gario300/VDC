import { StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StylesVariables.backgroundColor
    },
    head: {
        flex: .8,
        justifyContent: 'center',
    },
    body: {
        flex: 3
    },
    
    headContent: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20 * StylesVariables.responsiveMulti,
    },
    upperText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 1,
        lineHeight: StylesVariables.textLineHeight - 1,
        color: StylesVariables.textColor,
    },
    buttonContent: {
        flex: 1,
        maxHeight: 60 * StylesVariables.responsiveMulti,
        alignItems: 'center',
        justifyContent: 'center'
    }
});