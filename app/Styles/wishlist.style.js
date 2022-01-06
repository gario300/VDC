import { StyleSheet } from 'react-native';
import StylesVariables from './app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: StylesVariables.mainColor,
        paddingBottom: 40 * StylesVariables.responsiveHeightMulti,
        paddingHorizontal: 20 * StylesVariables.responsiveMulti,
    },
    headerTitle: {
        ...StylesVariables.appTitle,
        color: StylesVariables.whiteColor,
    },
    listContainer: {
        flex: 1,
    },
    listBtn: {
        position: "absolute",
        right: 20,
        top: -25,
        zIndex: 10,
    },
});