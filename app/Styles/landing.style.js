import { Platform, StyleSheet } from 'react-native';
import StylesVariables from './../Styles/app.style';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StylesVariables.backgroundColor
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
    head: {
        flex: .5,
    },
    headRow: {
        flex: .25,
        marginLeft: StylesVariables.spacing * 1,
        marginRight: StylesVariables.spacing * 1,
        paddingTop: StylesVariables.spacing * 3,
        flexDirection: 'row'
    },
    leftContent: {
        flex: 1,
        justifyContent: 'center'
    },
    rightContent: {
        flex: .8
    },
    iconImgContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    titleContainer: {
        flex: .55,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    introText: {
        fontFamily: StylesVariables.textFont,
        fontSize: 17,
        color: StylesVariables.grayDarkColor
    },
    introTextPolicy: {
        fontFamily: StylesVariables.textFont,
        fontSize: 13,
        lineHeight: 16,
        color: StylesVariables.textColorLight
    },
    titleText: {
        textAlign: 'center',
        fontFamily: StylesVariables.mediumFont,
        fontSize: 22.5,
        textAlign: 'center',
        marginTop: 5
    },
    content: {
        flex: .8,
        paddingBottom: StylesVariables.spacing
    },
    scrollContainer: {
        flex: 4, 
        marginTop: StylesVariables.spacing * 1
    },
    buttonContainer: {
        flex: .5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: StylesVariables.spacing * 2,
        marginRight: StylesVariables.spacing * 2,
        maxHeight: 58,
        marginBottom: StylesVariables.spacing
    },
    spacing: {
        height: StylesVariables.spacing * 1
    },
    button: {
        width: "100%",
        height: 58,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 0,
        borderColor: StylesVariables.blackColor,
        borderWidth: .5,
        alignItems: 'center'
    },
    buttonApple: {
        width: "100%",
        height: 58,
        borderRadius: 0,
    },
    socialIcon: {
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    socialTextContent: {
        justifyContent: 'center',
    },
    iconImg: {
        width: 500/5 * StylesVariables.responsiveMulti,
        height: 500/5 * StylesVariables.responsiveMulti
    },
    socialConnectionIcon: {
        width: 21 * StylesVariables.responsiveMulti,
        height: 21 * StylesVariables.responsiveMulti
    },
    appleButtonIcon: {
        flex: 1,
        fontFamily: StylesVariables.mediumFont,
        justifyContent: 'flex-start',
        borderRadius: 0
    },
    introContainer: {
        flex: 1,
        marginLeft: StylesVariables.spacing * 2,
        marginRight: StylesVariables.spacing * 2,
        justifyContent: 'space-evenly',
        maxHeight: 150
    },
    socialText: () => {
        const base = {
            paddingHorizontal: StylesVariables.spacing * 1,
        }
        if (Platform.OS === "ios") {
            return {
                ...base,
                fontWeight: '500',
                fontSize: StylesVariables.subTitleFontSize + 2,
                color: "#111"
            }
        } else {
            return {
                ...base,
                fontFamily: StylesVariables.textFont,
                fontSize: StylesVariables.subTitleFontSize + 2,
                color: "#111"
            }
        }
    },
    bottom: {
        flex: .3
    },
    black: {
        color: StylesVariables.blackColor
    },
    blueButton: {
        backgroundColor: StylesVariables.blueColor
    },
    faceButton: {
        backgroundColor: StylesVariables.whiteColor
    },
    yellowButton: {
        backgroundColor: '#FFC100'
    },
    mail: {
        backgroundColor: StylesVariables.whiteColor
    },
    anonym: {
        backgroundColor: "#77A1AB",
        borderRadius: 0,
        backgroundColor: 'transparent',
    },
    anonymText: {
        fontWeight: '500',
        fontSize: StylesVariables.subTitleFontSize + 2,
        color: "#111"
    },
    google: {
        backgroundColor: StylesVariables.whiteColor
    },
    green: {
        color: StylesVariables.mainColor
    },
});
