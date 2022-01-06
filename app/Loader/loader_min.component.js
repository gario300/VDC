import React from 'react';
import { StyleSheet, View, Image, Platform, Modal } from 'react-native';
//import LottieView from 'lottie-react-native';
import StylesVariables from './../Styles/app.style';
import AppStore from './../Flux/AppStore';
import myAppState from '../AppState/app_state';
import LottieView from 'lottie-react-native';

//const lottieAnim = require("./../../assets/loader/avocado.gif");
//const lottieAnimPay = require("./../../assets/loader/pay.gif");
const lottieAnim = require("./../../assets/loader/fly-plane-loading.json");

const styles = StyleSheet.create({
    loaderContainer: {
        position: 'relative',
        display: 'none',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        justifyContent: 'center',
        flex: 1,
        zIndex: 1100,
    },
    loaderNormal: {
        flex: 1,
        backgroundColor: StylesVariables.mainColorOverlay
    },
    loaderNormalPay: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)",
    },
    loaderActive: {
        position: 'absolute',
        display: 'flex',
        flex: 1,
        backgroundColor: "#33333388"
    },
    loaderTop: {
        flex: .2,
    },
    loaderBottom: {
        flex: .1
    },
    loaderContent: {
        flex: 1.2,
        position: 'relative',
        justifyContent: 'flex-end',
    },
    loaderContentPay: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
    },
    animationStyle: {
        alignSelf: 'flex-end',
        marginHorizontal: StylesVariables.spacing * 1,
        width: (140 * 1.1) * StylesVariables.responsiveMulti,
        height: (140 * 1.1) * StylesVariables.responsiveMulti
    },
    animationStylePay: {
        alignSelf: 'center',
        width: (180 * 1) * StylesVariables.responsiveMulti,
        height: (180 * 1) * StylesVariables.responsiveMulti
    }
});

const LoaderMin = () => {

    const [isActive, setLoaderState] = React.useState(false);

    React.useEffect( () => {

        const OnLoaderUpdated = (value) => {
            setLoaderState(value)
        }
        
        AppStore.on("loaderUpdatedMin", OnLoaderUpdated);

        return () => {
            AppStore.removeListener("loaderUpdatedMin", OnLoaderUpdated);
        }
    }, []);
    
    return (
        <View style={[styles.loaderContainer, isActive && styles.loaderActive]}>
            {<View style={styles.loaderNormal}>
                <View style={styles.loaderTop}></View>
                <View style={styles.loaderContent}>
                    {Platform.OS === "ios" && <LottieView
                        autoPlay
                        autoSize={true}
                        loop
                        source={lottieAnim}
                        speed={1.2}
                        style={styles.animationStyle}
                    />}
                </View>
                <View style={styles.loaderBottom}></View>
            </View>}
        </View>
    )
};
export default LoaderMin;