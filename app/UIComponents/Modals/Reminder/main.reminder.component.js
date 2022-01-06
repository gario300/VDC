import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StylesVariables from '../../../Styles/app.style';
import NormalButton from '../../Button/normal_button.component';
import InputDateScroll from '../../Input/input_date.scroll.component';
import InputSelectScroll from '../../Input/input_select.scroll.component';

const styles = StyleSheet.create({
    container: {
        marginVertical: 10 * StylesVariables.responsiveHeightMulti,
    },
    input: {
        alignSelf: "center",
        marginVertical: 15 * StylesVariables.responsiveHeightMulti,
    },
    btnCont: {
        alignSelf: "center",
        marginVertical: 30 * StylesVariables.responsiveHeightMulti,
        height: 50 * StylesVariables.responsiveHeightMulti,
        width: 266 * StylesVariables.responsiveMulti,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
    },
    buttonCont: {
        height: 50 * StylesVariables.responsiveHeightMulti,
        marginHorizontal: 5 * StylesVariables.responsiveMulti,
        width: 146 * StylesVariables.responsiveMulti,
    },
})

const options = [
    'Tous les jours',
    'Tous les 2 jours',
    'Tous les 3 jours',
    'Tous les 4 jours',
    'Tous les 5 jours',
    '1 fois par semaine',
]

const MainReminder = ({ onActivate, onDateChange, onFrequencyChange, date, frequency, edit, onDelete, onModify }) => {
    const disabled = (frequency && date) === '';

    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <InputDateScroll
                    onValueChange={onDateChange}
                    placeholder="Rappel à un moment précis *"
                    selected={date} />
            </View>
            <View style={styles.input}>
                <InputSelectScroll
                    items={options}
                    onValueChange={onFrequencyChange}
                    placeholder="Répéter * "
                    selected={frequency} />
            </View>
            { edit ?
                <View style={styles.row}>
                    <View style={styles.buttonCont}>
                        <NormalButton
                            callback={() => onDelete()}
                            themeName="blue"
                            title="Supprimer" />
                    </View>
                    <View style={styles.buttonCont}>
                        <NormalButton
                            callback={() => onModify()}
                            title="Modifier" />
                    </View>
                </View>
                : <View style={styles.btnCont}>
                    <NormalButton
                        callback={onActivate}
                        title="Activer"
                        isDisabled={disabled}
                        themeName={disabled ? "blue-gray" : "secundary"} />
                </View>
            }
        </View>
    )
}

export default MainReminder