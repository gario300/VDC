import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import StylesVariables from './../Styles/app.style';
import { AntDesign } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import localization from '../Localization/localization';
import * as AppActions from '../Flux/AppActions';
import { Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    localizationContainer: {
        justifyContent: 'flex-start'
    },
    iconImg: {
        width: 30 * StylesVariables.responsiveMulti,
        height: 30 * StylesVariables.responsiveMulti,
    },

    textLoc: {
        ...StylesVariables.appTextMedium,
        color: StylesVariables.secondaryColor
    },
    textLocalize: {
        height: 30 * StylesVariables.responsiveMulti,
        alignItems: 'center',
        flexDirection: 'row',
        minWidth: 100,
        justifyContent: 'space-evenly'
    },
    inputContainer: {
        opacity: 1,
        left: 0,
        top: 0,
        height: 48 * StylesVariables.responsiveMulti,
        position: 'absolute',
        right: 0,
        justifyContent: "center",
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.inputTextColor,
        color: "blue",
        backgroundColor: 'cyan',
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.inputTextColor,
        fontFamily: StylesVariables.textFont,
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
})

const LocalizeLayout = props => {

    const [selectedValue, setSelectedLang] = React.useState(localization.activeLang)
    let pickerRef = React.useRef(null)
    const customPlaceholder = {
        label: "-",
        value: null,
        color: 'gray',
    }

    return (
        <View style={styles.container}>
            <View 
                style={styles.buttonContainer}
            >
                <View style={styles.localizationContainer}>
                    {selectedValue == "fr" && <Image
                        style={styles.iconImg}
                        resizeMode={'contain'} 
                        source={require('../../assets/icons/france.png')}
                    />}
                    {selectedValue == "en" && <Image
                        style={styles.iconImg}
                        resizeMode={'contain'} 
                        source={require('../../assets/icons/united.png')}
                    />}
                    {selectedValue == "es" && <Image
                        style={styles.iconImg}
                        resizeMode={'contain'} 
                        source={require('../../assets/icons/spanish.png')}
                    />}
                </View>
                <View style={styles.textLocalize}>
                    <Text style={styles.textLoc}>{localization.getActiveTitle()}</Text>
                    <AntDesign name="down" size={16} color={StylesVariables.secondaryColor} />
                </View>
            </View> 
            <View style={styles.inputContainer}>
            <RNPickerSelect
                ref={pickerRef}
                onValueChange={(val) => {
                    if (val !== "fr" && val !== "en") return
                    setSelectedLang(val)
                    if (Platform.OS === "ios") {
                        if (pickerRef.current === null 
                            || typeof pickerRef.current.state.showPicker === "undefined"
                            || !pickerRef.current.state.showPicker
                            ) return
                    }
                    if (val === null) return
                    pickerRef.current.togglePicker()
                    AppActions.displayLoader(true);
                    localization.changeLang(val)
                    .then(result => {
                        AppActions.displayLoader(false);
                        props.onUpdate()
                    })
                    .catch(err => {
                        AppActions.displayLoader(false);
                        console.log("On Change Error: ", err);
                    })
                }}
                placeholder={customPlaceholder}
                items={localization.getLangList().map(el => {
                    return {
                        "label": el.title,
                        "value": el.key
                    }
                })}
                onDonePress={() => {
                    /*
                    const val = selectedValue;
                    if (val === null) return
                    console.log("Change: ", val)
                    pickerRef.current.togglePicker()
                    AppActions.displayLoader(true);
                    localization.changeLang(val)
                    .then(result => {
                        AppActions.displayLoader(false);
                        
                        props.onUpdate()
                    })
                    .catch(err => {
                        AppActions.displayLoader(false);
                        console.log("On Change Error: ", err);
                    })
                    */
                }}
                doneText={""}
                style={pickerSelectStyles}
                value={selectedValue}>
                    <View style={{
                        backgroundColor: 'rgba(100, 100, 100, 0)',
                        height: "100%",
                        width: "100%"
                    }}><Text>{""}</Text></View>
                </RNPickerSelect>
            </View>
        </View>
    )

}

export default LocalizeLayout;