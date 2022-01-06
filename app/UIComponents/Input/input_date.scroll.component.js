import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, Modal, View, TouchableOpacity } from 'react-native';
import Picker from 'rmc-picker';
import moment from 'moment';
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    container: {
        backgroundColor: StylesVariables.whiteColor,
        borderColor: StylesVariables.borderSelectColor,
        borderWidth: 0.5,
        flexDirection: "row",
        height: 200 * StylesVariables.responsiveHeightMulti,
        width: StylesVariables.windowWidth,
    },
    inputContainer: {
        alignItems: "center",
        backgroundColor: 'transparent',
        borderColor: StylesVariables.secondaryColor,
        borderRadius: 12,
        borderWidth: 0.5,
        height: 50 * StylesVariables.inputMulti,
        justifyContent: "center",
        shadowColor: "#000",
        width: 288 * StylesVariables.responsiveMulti,
    },
    placeholder: {
        color: StylesVariables.textColor,
        fontFamily: StylesVariables.mediumFont,
        fontSize: StylesVariables.inputFontSize,
        paddingHorizontal: StylesVariables.spacing * StylesVariables.inputMulti,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    item: {
        ...StylesVariables.appTitle,
        fontSize: StylesVariables.titleFontSize - 3,
        fontFamily: StylesVariables.textFont,
        textAlign: "center",
    },
})

const getArrays = () => {
    let hours = [];
    let minutes = [];

    for (let i = 0; i < 24; i++) {
        hours.push(`${i}`);
    }
    for (let i = 0; i < 60; i++) {
        minutes.push(`${i < 10 ? '0' + i : i}`);
    }

    return { hours, minutes };
}

const getArrayDates = (date, increment) => {
    let res = [];
    const tempDate = moment(date);
    for (let i = 1; i <= 10; i++) {
        if (increment) {
            res.push(moment(tempDate).add(i, 'days').toISOString());
        } else {
            res.push(moment(tempDate).subtract(i, 'days').toISOString());
        }
    }

    if (!increment) {
        res.reverse();
    }
    return res;
}

const getTempArray = (selected, array) => {
    let index = array.indexOf(selected);
    let tempArray = [...array];

    if (index === 0) {
        tempArray = tempArray.slice(1);
    } else if (index === (array.length - 1)) {
        tempArray.pop();
    } else {
        tempArray = [...tempArray.slice(index + 1, array.length), ...tempArray.slice(0, index)]
    }
    return tempArray;
}

const getSelectedItem = (selected) => (
    <Picker.Item value={selected} key={`opt_${selected}`} >
        {selected}
    </Picker.Item>
)

const getSelectedDate = (selected) => (
    <Picker.Item value={selected} key={`selected_date`} >
        {moment(selected).format('ddd DD MMM').toString()}
    </Picker.Item>
)

const getTempItems = (array) => array.map((item, index) => (
    <Picker.Item value={item} key={`opt_${index}`} >
        {item}
    </Picker.Item>
));

const getDateItems = (array) => array.map((item, index) => (
    <Picker.Item value={item} key={`date_${index}`} >
        {moment(item).format('ddd DD MMM').toString()}
    </Picker.Item>
));

const getInitialDate = (date) => {
    if(typeof date === 'string' && date !== '') {
        return { date: moment(new Date(date)).toISOString(), hour: '0', minute: '00' }
    } else {
        return { date: moment().toISOString(), hour: '0', minute: '00' }
    }
}

const InputDateScroll = ({ selected, onValueChange, placeholder }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getInitialDate(selected));
    const { hours, minutes } = getArrays();

    const tempArrayHours = getTempArray(selectedDate.hour, hours);
    const tempArrayMinutes = getTempArray(selectedDate.minute, minutes);
    const tempPrevDates = getArrayDates(selectedDate.date, false);
    const tempNextDates = getArrayDates(selectedDate.date, true);

    const renderPrevDates = getDateItems(tempPrevDates);
    const renderNextDates = getDateItems(tempNextDates);
    const renderTempHours = getTempItems(tempArrayHours);
    const renderTempMinutes = getTempItems(tempArrayMinutes);

    const renderSelectedDate = getSelectedDate(selectedDate.date);
    const renderSelectedHour = getSelectedItem(selectedDate.hour);
    const renderSelectedMinute = getSelectedItem(selectedDate.minute);

    const OnDateChange = (value, type) => {
        setSelectedDate({
            ...selectedDate,
            [type]: value,
        });
        onValueChange(selectedDate);
    }

    return (
        <Fragment>
            <TouchableHighlight
                onPress={() => setShowPicker(true)}
                underlayColor={StylesVariables.whiteColor}
                style={styles.inputContainer}>
                <Text style={styles.placeholder}>
                    {selected.hasOwnProperty('date') ?
                        `${moment(selectedDate.date).format('ddd DD MMM').toString()} ${selectedDate.hour} : ${selectedDate.minute}`
                        : typeof selected === 'string' && selected !== '' ? 
                        moment(new Date(selected)).format('ddd DD MMM').toString() 
                        : placeholder
                        }
                </Text>
            </TouchableHighlight>
            <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowPicker(false)}
                visible={showPicker}>
                <Fragment>
                <TouchableOpacity style={styles.overlay} onPress={() => setShowPicker(false)} />
                <View style={styles.container}>
                    <Picker
                        itemStyle={styles.item}
                        style={{flex: 3}}
                        selectedValue={selectedDate.date}
                        onValueChange={(selectedValue) => OnDateChange(selectedValue, 'date')}>
                        {renderPrevDates}
                        {renderSelectedDate}
                        {renderNextDates}
                    </Picker>
                    <Picker
                        itemStyle={styles.item}
                        style={{flex: 1}}
                        selectedValue={selectedDate.hour}
                        onValueChange={(selectedValue) => OnDateChange(selectedValue, 'hour')}>
                        {renderTempHours}
                        {renderSelectedHour}
                        {renderTempHours}
                    </Picker>
                    <Picker
                        itemStyle={styles.item}
                        style={{flex: 2}}
                        selectedValue={selectedDate.minute}
                        onValueChange={(selectedValue) => OnDateChange(selectedValue, 'minute')}>
                        {renderTempMinutes}
                        {renderSelectedMinute}
                        {renderTempMinutes}
                    </Picker>
                </View>
                </Fragment>
            </Modal>
        </Fragment>

    )
}

export default InputDateScroll