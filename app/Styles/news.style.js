import { StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    headerCont: {
        backgroundColor: StylesVariables.mainColor,
        paddingHorizontal: 20 * StylesVariables.responsiveMulti,
        paddingVertical: 25 * StylesVariables.responsiveHeightMulti,
    },
    headerTitle: {
        ...StylesVariables.appTitle,
        color: StylesVariables.whiteColor,
    },
    listCont: {
        flex: 1,
    }
});