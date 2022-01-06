import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import StylesVariables from './../Styles/app.style';

import { EvilIcons, MaterialIcons, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons'; 

const iconClock = require('../../assets/icons/clock.png')

const styles = StyleSheet.create({
    imgIconContainer: {
        width: 26 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageIcon: {
        height: 20 * StylesVariables.responsiveMulti,
        width: 20 * StylesVariables.responsiveMulti,
    },
    icon: {
        color: StylesVariables.textSecundaryColor,
        fontSize: 28 * StylesVariables.responsiveMulti
    }
});

export default {
    CloseIcon: (_props) => 
    <View style={styles.imgIconContainer}>
        <EvilIcons name="close-o" size={styles.icon.fontSize} color={StylesVariables.textColor} />
    </View>,
    DeleteIcon: (_props) => 
    <View style={styles.imgIconContainer}>
        <MaterialIcons name="delete" size={styles.icon.fontSize} color={styles.icon.color} />
    </View>,
    CalendarIcon: (_props) => 
    <View style={styles.imgIconContainer}>
        <MaterialCommunityIcons name="calendar" size={styles.icon.fontSize - 8} color={styles.icon.color} />
    </View>,
    DownloadIcon: (_props) => 
    <View style={styles.imgIconContainer}>
        <Feather name="download" size={styles.icon.fontSize} color={StylesVariables.secondaryColor} />
    </View>,
    IconClock: () => 
    <View style={styles.imgIconContainer}>
        <Image
            source={iconClock}
            style={styles.imageIcon}
            resizeMode="contain" />
    </View>,
    IconHourGlass: () => 
    <View style={styles.imgIconContainer}>
        <FontAwesome name="hourglass-end" size={20} color={StylesVariables.mainColor} />
    </View>
}