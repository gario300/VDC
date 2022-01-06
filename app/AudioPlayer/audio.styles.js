import { StyleSheet } from "react-native";
import StylesVariables from "../Styles/app.style";

export default StyleSheet.create({
    container: {
        backgroundColor: StylesVariables.secondaryColor,
        width: StylesVariables.windowWidth,
    },
    innerEmpty: {
        flex: 1,
        height: StylesVariables.spacing * StylesVariables.responsiveMulti
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    controlContent: {
        flex: 1,
        justifyContent: 'center',
        height: 70 * StylesVariables.responsiveMulti,
    },
    control: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    recordContainer: {
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderRadius: 40,
        borderColor: StylesVariables.blueColor,
        borderWidth: 3.5,
        alignItems: 'center'
    },
    recordStarted: {
        borderColor: StylesVariables.redColor
    },
    sliderContainer: {
        flex: 3,
        justifyContent: 'space-around',
    },
    sliderComponent: {
        justifyContent: 'center',
        height: 3 * StylesVariables.responsiveMulti
    },
    sliderTop: {
        flex: 1
    },
    audioTexts: {
        flex: 1,
        position: 'absolute',
        bottom: StylesVariables.spacing * 0,
        left: StylesVariables.spacing * StylesVariables.responsiveMulti,
        marginHorizontal: StylesVariables.spacing * StylesVariables.responsiveMulti,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    progressText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 1,
        textAlign: 'justify',
        color: StylesVariables.textColor
    },
    middleText: {
        marginHorizontal: 4
    },
    thumbStyle: {
        backgroundColor: StylesVariables.mainColor,
        borderColor: StylesVariables.borderPointerColor,
        borderRadius: 7.5,
        borderWidth: 0.5,
        height: 15 * StylesVariables.responsiveMulti,
        width: 15 * StylesVariables.responsiveMulti,
    },
    track: {
        backgroundColor: StylesVariables.mediaBarColor,
        borderRadius: 2.5,
        height: 3 * StylesVariables.responsiveMulti,
    },
    activeTrack: {
        backgroundColor: StylesVariables.mediaActiveBarColor,
        borderRadius: 2.5,
        height: 3 * StylesVariables.responsiveMulti,
    },
    duration: {
        ...StylesVariables.appText,
        margin: StylesVariables.spacing,
    },
    btnsRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: StylesVariables.spacing / 2,
    },
    icon: {
        height: 20 * StylesVariables.responsiveHeightMulti,
        tintColor: StylesVariables.mainColor,
        width: 20 * StylesVariables.responsiveHeightMulti,
    },
    tooltipContainer: {
        width: 48 * StylesVariables.responsiveMulti,
        height: 36 * StylesVariables.responsiveMulti,
        alignItems: 'center',
        justifyContent: 'center'
    }
})