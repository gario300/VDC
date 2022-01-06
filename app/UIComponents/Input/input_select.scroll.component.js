import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, Modal, TouchableOpacity } from 'react-native';
import Picker from 'rmc-picker';
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    picker: {
        backgroundColor: StylesVariables.whiteColor,
        borderColor: StylesVariables.borderSelectColor,
        borderWidth: 0.5,
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
        fontFamily: StylesVariables.mediumFont,
        textAlign: "center",
    },
})

const InputSelectScroll = ({ items, selected, onValueChange, placeholder }) => {
    const [showPicker, setShowPicker] = useState(false);

    const renderItems = items.map((item, index) => (
        <Picker.Item value={item} key={`opt_${index}`} >
            {item}
        </Picker.Item>
    ));

    return (
        <Fragment>
            <TouchableHighlight
                onPress={() => setShowPicker(true)}
                underlayColor={StylesVariables.whiteColor}
                style={styles.inputContainer}>
                <Text style={styles.placeholder}>{selected === '' ? placeholder : selected}</Text>
            </TouchableHighlight>
            <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowPicker(false)}
                visible={showPicker}>
                <TouchableOpacity style={styles.overlay} onPress={() => setShowPicker(false)} />
                <Picker
                    itemStyle={styles.item}
                    style={styles.picker}
                    selectedValue={selected}
                    onValueChange={(selectedValue) => onValueChange(selectedValue)}>
                    {renderItems}
                </Picker>
            </Modal>
        </Fragment>

    )
}

export default InputSelectScroll