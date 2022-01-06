import { StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    profileContainer: {
        backgroundColor: StylesVariables.mainColor,
        height: 80 * StylesVariables.responsiveHeightMulti,
        paddingHorizontal: 22,
    },
    linkContainer: {
        flexDirection: "row",
    },
    nameText: {
        ...StylesVariables.appTitle,
        color: StylesVariables.textSecundaryColor,
    },
    profileLink: {
        ...StylesVariables.appText,
        color: StylesVariables.textSecundaryColor,
    },
    profileIcon: {
        height: 20,
        marginRight: 5,
        tintColor: StylesVariables.textSecundaryColor,
        width: 20,
    },
    listCont: {
        flex: 1,
    },
    buttonAdd: {
        position: "absolute",
        right: 20,
        top: -25,
        zIndex: 10,
    },
    emptyText: {
        flex: 5,
        alignSelf: 'center',
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 1,
        color: StylesVariables.cardTextColor,
    },
    emptyListCont: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: StylesVariables.spacing * 5,
    },
    emptyIcon: {
        height: 32 * StylesVariables.responsiveHeightMulti,
        tintColor: StylesVariables.textSecundaryColor,
        width: 32 * StylesVariables.responsiveHeightMulti,
    },
    homeHeader: {
        flex: 2,
        maxHeight: 350 * StylesVariables.responsiveHeightMulti
    },
    homeHeaderTop: {
        display: 'flex',
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    aside: {
        flex: 1,
        justifyContent: 'center'
    },
    headerBtn: {
        width: 60 * StylesVariables.responsiveMulti,
        height: 60 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 60
    },
    center: {
        flex: 2,
        justifyContent: 'center'
    },
    homeHeaderBody: {
        display: 'flex',
        flex: 3,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    logoImg: {
        width: StylesVariables.logoSize.w * .9 * StylesVariables.responsiveMulti,
        height: StylesVariables.logoSize.h * .9  * StylesVariables.responsiveMulti,
        alignSelf: 'center'
    },
    avatarImg:{
        width: 125 * .5 * StylesVariables.responsiveMulti,
        height: 125 * .5 * StylesVariables.responsiveMulti,
        alignSelf: 'center'
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: StylesVariables.windowWidth,
        height: StylesVariables.windowHeight,
        zIndex: -1
    },
    homeBody: {
        flex: 1,
        backgroundColor: StylesVariables.whiteColor,
        flexDirection : 'row',
        flexWrap: 'wrap',
    },
    homeBodyTop: {
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    homeBodyTitle: {
        fontFamily: StylesVariables.mediumFont,
        lineHeight: 30,
        fontSize: StylesVariables.subTitleFontSize + 2,
        color: StylesVariables.mainColor,
    }
});
