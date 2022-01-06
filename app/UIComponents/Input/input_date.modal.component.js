import React, { Fragment, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Text, View, Image } from 'react-native';
import DateTime from '../../DateTime/date_time';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import StylesVariables from '../../Styles/app.style';
import localization from '../../Localization/localization';

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
        width: "100%",
    },
    icon: {
        alignSelf: "center",
        height: 25,
        marginHorizontal: StylesVariables.spacing * StylesVariables.inputMulti,
        tintColor: StylesVariables.inputTextColor,
        width: 25,
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

const dateTime = new DateTime();

const InputDateModal = ({
    OnDateChange,
    disabled,
    value,
    initialDate = new Date(),
    mode = 'date',
    placeholder,
    style, }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const themeStyle = disabled ? theme['disabled'] : theme['primary'];
    const dateFormated = dateTime.dateFormatted(dateTime.newDate(value))

    const handleDate = (date) => {
        setShowDatePicker(false);
        OnDateChange(date);
    }

    return (
        <Fragment>
            <TouchableWithoutFeedback 
                onPress={() => {
                    if (disabled) return
                    setShowDatePicker(true)
                }}
            >
                <View style={[
                    themeStyle.inputContainer,
                    style ? style : null]}>
                        <Image
                            source={require('../../../assets/icons/calendar.png')}
                            style={styles.icon}
                            resizeMode="contain" />
                        {value === '' || value === null ? 
                            <Text style={[styles.textInput, {color: StylesVariables.textColorLight}]}>
                                {placeholder}
                            </Text>
                            : <Text style={styles.textInput}>
                                {dateFormated}
                            </Text>
                        }
                    <Text></Text>
                </View>
            </TouchableWithoutFeedback>
            <DateTimePickerModal
                isVisible={showDatePicker}
                mode={mode}
                date={value === "" || value === null ? initialDate : value}
                locale={"fr"}
                disabled={false}
                onConfirm={handleDate}
                titleIOS={localization.word("choose_date")}
                headerTextIOS={localization.word("choose_date")}
                confirmTextIOS={localization.word("confirmer")}
                cancelTextIOS={localization.word("annuler")}
                onCancel={() => setShowDatePicker(false)} />
        </Fragment>
    );
};

export default InputDateModal;