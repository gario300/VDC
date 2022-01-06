import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import styles from './../Styles/navigation.style';
import { AntDesign } from '@expo/vector-icons'; 
import StylesVariables from './../Styles/app.style';

const NavWelcome = props => (
    <View style={styles.modalHeader}>
        <View style={styles.modalHeaderContainer}>
            <View style={styles.asideContent}>
                { props.withReturn && (
                    <TouchableOpacity style={styles.closeButtonContent} onPress={props.OnBackPress} activeOpacity={0.6}>
                        <Ionicons name='ios-arrow-back' size={24} color={StylesVariables.textColor} />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.centerContent}></View>
            <View style={styles.asideContent}></View>
        </View>
    </View>
);

export default NavWelcome;