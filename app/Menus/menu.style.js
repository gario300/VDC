import { StyleSheet } from 'react-native';
import StylesVariables from '../Styles/app.style';

export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: StylesVariables.whiteColor,
    },
    modalHeaderCont: {
        backgroundColor: StylesVariables.backgroundInputLogin,
    },
    modalCloseIconRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: StylesVariables.spacing * 1.5,
        marginTop: StylesVariables.spacing * 1.5,
        width: StylesVariables.windowWidth,
    },
    modalProfileRow: {
        flexDirection: "row",
        marginVertical: StylesVariables.spacing * 3,
        paddingHorizontal: StylesVariables.spacing * 2,
    },
    modalTitleCont: {
        paddingHorizontal: StylesVariables.spacing * 2,
    },
    modalTitleText: {
        ...StylesVariables.appTitle,
        color: StylesVariables.whiteColor,
    },
    modalProfileName: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.whiteColor,
    },
    modalProfileText: {
        ...StylesVariables.appText,
        color: StylesVariables.whiteColor,
    },
    modalListCont: {
        marginVertical: StylesVariables.spacing * 1.5,
    },
    closeIcon: {
        height: 32,
        tintColor: StylesVariables.whiteColor,
        width: 32,
    },
    profileIcon: {
        height: 40,
        tintColor: StylesVariables.whiteColor,
        marginRight: StylesVariables.spacing * 0.5,
        width: 40,
    }
});