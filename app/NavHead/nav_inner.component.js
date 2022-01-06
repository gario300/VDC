import React from 'react';
import { View, TouchableOpacity, Text, Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import StylesVariables from './../Styles/app.style';
import styles from './../Styles/navigation.style';

const NavInner = props => (
    <View style={[styles.modalHeaderInner, props.headerTransparent && styles.modalFloat]}>
        <View style={styles.modalHeaderContainer}>
            <View style={[styles.asideContent]}>
                { props.withReturn && (
                    <TouchableOpacity style={styles.closeButtonContent} onPress={props.OnBackPress} activeOpacity={0.6}>
                        <Ionicons name='ios-arrow-back' size={24} color={StylesVariables.textColor} />
                    </TouchableOpacity>
                )}
                { !props.withReturn && (
                    <View style={[styles.iconImgContainer]}>
                        <Image
                            style={[styles.iconImg]}
                            resizeMode={'contain'} 
                            source={require('../../assets/logo/localshopi_logo.png')}
                        />
                    </View>
                )}
            </View>
            <View style={styles.centerContent}>
                {props.withTitle && (
                    <View style={styles.titleContent}>
                        <Text style={styles.titleTextInner}>{props.title}</Text>
                    </View>
                )}
                {props.location && (
                    <TouchableHighlight 
                        style={styles.locationButton}
                        onPress={props.OnCenterPress}
                        underlayColor={StylesVariables.secondaryColor}
                    >
                        <View style={styles.btnContainer}>
                            <View style={styles.locationIconContainer}>
                                <FontAwesome name="location-arrow" size={styles.locationIcon.fontSize} color={styles.locationIcon.color} />
                            </View>
                            <View style={styles.locationTitleContent}>
                                <Text style={styles.locationTitle}>{props.location}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                )}
            </View>
            <View style={[styles.asideContent, props.withFilters && styles.asideContentRight]}>
                {props.withCart && (
                <TouchableOpacity
                    style={styles.cartButtonContent} 
                    onPress={props.OnRightPress} 
                    activeOpacity={0.6}
                >
                    <AntDesign name="shoppingcart" size={26} color={StylesVariables.textColor} />
                </TouchableOpacity>)}
                {props.withFilters && (
                    <TouchableHighlight 
                        style={styles.filterButton}
                        onPress={props.OnRightPress}
                        underlayColor={StylesVariables.secondaryColor}
                    >           
                        <View style={styles.btnContainer}>             
                            <View style={styles.filterIconContainer}>
                                <Octicons name="settings" size={styles.iconFilter.fontSize} color={styles.iconFilter.color} />
                            </View>
                            <Text style={[styles.titleTextFilter]}>{"Filtrer"}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            </View>
        </View>
    </View>
);

export default NavInner;