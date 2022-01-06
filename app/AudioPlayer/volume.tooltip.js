import React, { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StylesVariables from '../Styles/app.style';

import Tooltip from 'rn-tooltip';
import { Slider } from 'react-native-elements';

const styles = StyleSheet.create({
    tooltip: {
        alignItems: "center",
        backgroundColor: StylesVariables.cardTextColor,
        height: 200 * StylesVariables.responsiveHeightMulti,
        paddingVertical: StylesVariables.spacing,
        width: 40 * StylesVariables.responsiveMulti,
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
})

const VolumeTooltip = ({ children, onChangeVolume, volume }) => {
    const tooltip = (
        <View style={styles.tooltip}>
            <Slider
                step={0.1}
                style={{flex: 1}}
                orientation="vertical"
                thumbStyle={styles.thumbStyle}
                minimumTrackTintColor={styles.track.backgroundColor}
                maximumTrackTintColor={styles.activeTrack.backgroundColor}
                trackStyle={styles.track}
                onValueChange={onChangeVolume}
                thumbTintColor={StylesVariables.secondaryColor}
                value={volume}
                minimumValue={0}
                maximumValue={1.0} />
        </View>
    )
    
    return (
        <Tooltip
            backgroundColor={"#617080"}
            height={styles.tooltip.height}
            popover={tooltip}
            overlayColor={"#3e3e3e88"}
            width={styles.tooltip.width} >
            {children}
        </Tooltip>
    )
}

export default VolumeTooltip