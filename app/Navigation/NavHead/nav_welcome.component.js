import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import styles from '../../Styles/navigation.style';
import StylesVariables from '../../Styles/app.style';

const NavWelcome = ({withReturn = false, enabled = true, isFloat = false, OnBackPress}) => (
    <View style={[styles.modalHeader, !enabled && {height: StylesVariables.spacing * 0}, isFloat && {height: StylesVariables.spacing * 0}]}>
        <View style={[{flex: 1}, isFloat && styles.navHeaderFloat]}>
        <View style={[styles.modalHeaderContainer, {backgroundColor: 'transparent'}]}>
            <View style={styles.asideContent}>
                { withReturn && (
                    <TouchableOpacity 
                        style={styles.closeButtonContent} 
                        onPress={OnBackPress} 
                        activeOpacity={0.8}>
                        <Ionicons name="chevron-back" size={26 * StylesVariables.textMulti} color={StylesVariables.goldColor} />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.centerContent}></View>
            <View style={styles.asideContent}></View>
        </View>
        </View>
    </View>
);

export default NavWelcome;
