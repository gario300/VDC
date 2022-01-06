import { StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StylesVariables.backgroundColor
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
    body: {
        flex: 1
    },
    scroll: {
        flex: 1
    },
    noResultsContainer: {
        flex: 1,
        minHeight: 500 * StylesVariables.responsiveHeightMulti
    },
    noResultsHead: {
        flex: 1.2,
        justifyContent: 'center'
    },
    noResultsFooter: {
        flex: 1
    },
    spacing: {
        marginVertical: StylesVariables.spacing * 1 * StylesVariables.responsiveHeightMulti,
    },
    noResultsTextContainerTop: {
        flex: .85,
        justifyContent: 'flex-end',
    },
    noResultsTextContainerBottom: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    noResultsTitle: {
        ...StylesVariables.appTitleLarge,
        textAlign: 'center'
    },
    noResultsText: {
        ...StylesVariables.appTextMedium,
        fontSize: StylesVariables.textFontSize + 1,
        lineHeight: StylesVariables.textFontSize + 6,
        color: StylesVariables.textSecundaryColor,
        textAlign: 'center'
    },
    noResultsTitleContainer: {
        height: 45 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center'
    },
    noResultsSubTitle: {
        ...StylesVariables.appTitle,
        color: StylesVariables.secondaryColor,
        textAlign: 'center'
    },
    noResultsButtonContainer: {
        height: 68 * StylesVariables.responsiveHeightMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptySpace: {
        height: 40 * StylesVariables.responsiveMulti
    }
});