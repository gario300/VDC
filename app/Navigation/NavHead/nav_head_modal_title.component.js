import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'
import StylesVariables from '../../Styles/app.style';
import styles from '../../Styles/navigation.style';

const NavHeadModalTitle = props => (
    <View style={styles.modalContainerTitle}>
        <View style={styles.modalHeaderHard}>
            <View style={styles.modalHeaderContainer}>
                <View style={styles.asideContent}>
                    <TouchableOpacity style={styles.closeButtonContent} onPress={props.OnBackPress} activeOpacity={0.6}>
                        <EvilIcons   name='close' size={42} color={StylesVariables.blackColor} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.centerContent}>
                <View style={styles.titleContentModal}>
                    <Text style={styles.titleTextModal}>{props.title}</Text>
                </View>
            </View>
            <View style={styles.asideContent}></View>
        </View>
    </View>
);

export default NavHeadModalTitle;