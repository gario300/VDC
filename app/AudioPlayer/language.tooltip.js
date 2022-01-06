import React, { Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StylesVariables from '../Styles/app.style';

import * as Arrays from '../Constants/constants.index';
import Tooltip from 'rn-tooltip';

const styles = StyleSheet.create({
    tooltip: {
        height: 40 * StylesVariables.responsiveHeightMulti,
        width: 180 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.cardTextColor,
    },
    tooltipText: {
        ...StylesVariables.appTitle,
        fontFamily: StylesVariables.textFont,
    },
    tooltipTextSelected: {
        ...StylesVariables.appTitle,
        color: StylesVariables.btnDisabled,
        fontFamily: StylesVariables.textFont,
    },
    separatorTooltip: {
        backgroundColor: StylesVariables.textColor,
        height: 1,
        marginVertical: StylesVariables.spacing * 0.5,
        width: 160 * StylesVariables.responsiveMulti,
    }
})

const LanguageToolTip = ({ 
    children, 
    onChangeLang, 
    selectedLang 
}) => {
    const tooltip = (
        <Fragment>
            { Arrays.getLanguageArray()
            .map((lang, index) => {
                if (index === 0) {
                    return (
                        <Fragment key={`first_${index}`}>
                            <TouchableOpacity onPress={() => onChangeLang(lang.value)}>
                                <Text
                                    style={selectedLang == lang.value ? styles.tooltipTextSelected : styles.tooltipText}>
                                    {lang.label}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.separatorTooltip} />
                        </Fragment>
                    )
                } else if (index === Arrays.getLanguageArray().length) {
                    return (
                        <TouchableOpacity key={`middle_${index}`} onPress={() => onChangeLang(lang.value)}>
                            <Text
                                style={selectedLang == lang.value ? styles.tooltipTextSelected : styles.tooltipText}>
                                {lang.label}
                            </Text>
                        </TouchableOpacity>
                    )
                } else {
                    return (
                        <Fragment key={`last_${index}`}>
                            <TouchableOpacity onPress={() => onChangeLang(lang.value)}>
                                <Text
                                    style={selectedLang == lang.value ? styles.tooltipTextSelected : styles.tooltipText}>
                                    {lang.label}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.separatorTooltip} />
                        </Fragment>
                    )
                }
            })}
        </Fragment>
    )
    return (
        <Tooltip 
            backgroundColor={"#617080"}
            height={styles.tooltip.height * (Arrays.getLanguageArray().length + 1)}
            popover={tooltip}
            overlayColor={"#3e3e3e88"}
            width={styles.tooltip.width} >
            {children}
        </Tooltip>
    )
}

export default LanguageToolTip