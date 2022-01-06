import React, { Fragment, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import StylesVariables from '../../Styles/app.style';
import DateRangePicker from './../../UIComponents/DateTime/date_range_picker.component';

const styles = StyleSheet.create({
    inputContainer: {
        width: 240 * StylesVariables.responsiveMulti,
        height: 50 * StylesVariables.inputMulti,
        backgroundColor: 'transparent',
        shadowColor: "#000",
        flexDirection: 'row'
    },
    textInput: {
        alignSelf: "center",
        fontFamily: StylesVariables.mediumFont,
        paddingHorizontal: StylesVariables.spacing * StylesVariables.inputMulti,
        fontSize: StylesVariables.inputFontSize,
        color: StylesVariables.inputTextColor,
        lineHeight: StylesVariables.inputFontSize + 5,
        textAlign: 'center',
        width: "100%",
    },
    icon: {
        alignSelf: "center",
        height: 25,
        marginHorizontal: StylesVariables.spacing * StylesVariables.inputMulti,
        tintColor: StylesVariables.inputTextColor,
        width: 25,
    },
    filterDateInfoContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    filterDateContainer: {
        flex: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: StylesVariables.mainColor,
        borderWidth: 1,
        borderRadius: 4,
        padding: 5 * StylesVariables.responsiveMulti
    },
    filterDate: {
        flex: 1,
        justifyContent: 'center'
    },
    filterDateText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 2,
        color: StylesVariables.secondaryColor,
        lineHeight: StylesVariables.textLineHeight,
        textAlign: 'center'
    },
    contentDate: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        justifyContent: 'center',
        backgroundColor: 'rgba(33, 33, 33, .3)'
    },
    pickerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: StylesVariables.secondaryColor,
        borderRadius: 9,
        width: 520 * StylesVariables.responsiveMulti,
        maxWidth: StylesVariables.windowWidth - (30 * StylesVariables.responsiveMulti),
        maxHeight: 56 * 8 * StylesVariables.responsiveMulti,
    }
});

const theme = {
    "primary": StyleSheet.create({
        inputContainer: {
            ...styles.inputContainer,
            borderColor: StylesVariables.borderColor,
            borderWidth: 0.5,
        },
    }),
    "secondary": StyleSheet.create({
        inputContainer: {
            ...styles.inputContainer,
            borderColor: StylesVariables.secondaryColor,
        },
    }),
    "disabled": StyleSheet.create({
        inputContainer: {
            ...styles.inputContainer,
            backgroundColor: StylesVariables.backgroundInputColor,
        },
    }),
}

const InputDateModal = ({
    OnDateChange,
    disabled,
    startDate,
    endDate,
    placeholder,
    onCancel,
    style, }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const themeStyle = disabled ? theme['disabled'] : theme['primary'];

    const OnDateRange = (startString, endString) => {
        OnDateChange(startString, endString);
    }

    return (
        <Fragment>
            <TouchableOpacity 
                onPress={() => setShowDatePicker(!showDatePicker)}
            >
                <View style={[
                    themeStyle.inputContainer,
                    style ? style : null]}>
                        <Image
                            source={require('../../../assets/icons/calendar.png')}
                            style={styles.icon}
                            resizeMode="contain" />
                        <View style={styles.filterDate}>
                            <Text style={styles.textInput}>
                                {placeholder}
                            </Text>
                        </View>
                </View>
            </TouchableOpacity>
            {showDatePicker && 
                <View style={styles.contentDate}>
                    <View style={styles.pickerContainer}>
                        <DateRangePicker
                            //initialRange={[startDate, endDate]}
                            initialRange={[startDate, endDate]}
                            onSuccess={(s, e) => {
                                OnDateRange(s, e);
                            }}
                            OnContinue={() => {
                                setShowDatePicker(false)
                            }}
                            OnCancel={() => {
                                setShowDatePicker(false)
                                onCancel()
                            }}
                            theme={{ markColor: StylesVariables.secondaryColor, markTextColor: StylesVariables.whiteColor }}
                        />
                    </View>
                </View>
            }
        </Fragment>
    );
};

export default InputDateModal;