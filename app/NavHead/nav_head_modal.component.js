import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'
import styles from './../Styles/navigation.style';
import StylesVariables from './../Styles/app.style';

const NavHeadModal = props => (
    <View style={styles.modalContainer}>
        <View style={styles.modalHeaderHard}>
            <View style={styles.modalHeaderContainer}>
                <View style={styles.asideContent}>
                    <TouchableOpacity style={styles.closeButtonContent} onPress={props.OnBackPress} activeOpacity={0.6}>
                        <EvilIcons   name='close' size={42} color={StylesVariables.blackColor} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.centerContent}></View>
            <View style={styles.asideContent}></View>
        </View>
    </View>
);

export default NavHeadModal;