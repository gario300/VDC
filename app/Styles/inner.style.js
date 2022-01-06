import { StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImgContainer: {
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,

        top: 0,
        bottom: 0,
        width: '100%'
    },
    backgroundImg: {
        width: (StylesVariables.windowWidth/1.05) * StylesVariables.responsiveMulti,
        height: (StylesVariables.windowWidth/1.05) * StylesVariables.responsiveMulti,
        opacity: .17,
        alignSelf: 'center'
    },
    titleContainer: {
        flex: .4,
        justifyContent: 'space-evenly',
    },
    titleText: {
        ...StylesVariables.appTitleLarge,
        fontFamily: "LibreBaskerville-Bold",
        color: StylesVariables.secondaryColor,
        textAlign: 'center'
    },
    subTitleText: {
        ...StylesVariables.appTextMedium,
        fontFamily: StylesVariables.subTitleFont,
        fontSize: StylesVariables.textFontSize + 1,
        lineHeight: StylesVariables.textFontSize + 6,
        textAlign: 'center'
    },
    favouritesContainer: {
        flex: .4
    },
    favouritesTitleContainer: {
        height: 30 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center',
        marginHorizontal: StylesVariables.spacing * 2 * StylesVariables.responsiveHeightMulti
    },
    favouritesTitleText: {
        ...StylesVariables.appTextMedium,
        fontFamily: StylesVariables.titleFont,
        color: StylesVariables.secondaryColor,
        fontSize: StylesVariables.titleFontSize - 2,
        lineHeight: StylesVariables.textFontSize + 6,
    },
    favouritesContent: {
        flex: 1,
        justifyContent: 'center'
    },
    goToProductsContainer: {
        flex: 1,
        alignItems: 'center',
        maxHeight: 148 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center'
    },
    goToProductsImageBackground: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        width: StylesVariables.windowWidth,
        height: 148 * StylesVariables.responsiveHeightMulti
    },
    emptyContainer: {
        flex: 1,
        alignSelf: 'center',
    },
    emptyBox: {
        padding: StylesVariables.spacing * 1.5 * StylesVariables.responsiveMulti,
        marginHorizontal: StylesVariables.spacing * 2 * StylesVariables.responsiveMulti,
        borderRadius: 21,
        borderWidth: 1,
        width: 276 * StylesVariables.responsiveMulti,
        height: 129 * StylesVariables.responsiveHeightMulti,
        borderStyle: 'dashed',
        justifyContent: 'space-around',
        borderColor: StylesVariables.mainColor
    },
    emptyIcon: {
        flex: 1,
        justifyContent: 'center',
        color: StylesVariables.textColor,
        fontSize: 30 * StylesVariables.responsiveMulti
    },
    emptyTextes: {
        flex: 2,
        justifyContent: 'space-evenly',
    },
    emptyTitle: {
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.subTitleFontSize - 2,
        marginBottom: StylesVariables.spacing / 2
    },
    emptyText: {
        ...StylesVariables.appTextMedium,
        fontSize: StylesVariables.subTitleFontSize - 3,
        lineHeight: StylesVariables.subTitleFontSize + 3
    },
    
    topInner: {
        height: 85 * StylesVariables.responsiveMulti
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: StylesVariables.windowWidth,
        height: StylesVariables.windowHeight,
        zIndex: -1
    }
});
