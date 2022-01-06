import React from 'react';
import { View, TouchableOpacity, Text, Image, TouchableHighlight } from 'react-native';
import { Ionicons, Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import StylesVariables from '../../Styles/app.style';
import styles from '../../Styles/navigation.style';


const NavInner = ({
    headerTransparent,
    OnBackPress,
    OnRightPress,
    OnShowMenu,
    iconTitle = null,
    rightIcon,
    title,
    withRightIcon,
    withBorder,
    withMenu,
    withReturn,
    withTitle,
}) => {
    let iconInTitle = null;
    let icon = null;
    let iconText = '';

    if(iconTitle !== null) {
        iconInTitle = getTitleIcon(iconTitle);
    }

    const getIcon = () => {
        switch (rightIcon) {
            case 'details' : 
                return (
                    <TouchableOpacity
                        onPress={OnRightPress}
                    >
                        <Entypo name="dots-three-horizontal" size={20 * StylesVariables.textMulti} color={StylesVariables.grayDarkColor} />
                    </TouchableOpacity>
                )
            case 'account' :
                return(
                <TouchableOpacity
                    onPress={OnRightPress}
                >
                    <Entypo name="save" size={20 * StylesVariables.textMulti} color={StylesVariables.grayDarkColor} />
                </TouchableOpacity>
                )
            break;
        }
        return null
    }
 

    return (
        <View style={[styles.modalHeaderInner, headerTransparent ? styles.modalFloat : null]}>
            <View style={[styles.modalHeaderContainer, withBorder ? styles.border : null]}>
                <View style={[styles.asideContent, iconText !== "" && {flex: .2 }]}>
                    { withReturn && (
                        <TouchableOpacity style={styles.closeButtonContent} onPress={OnBackPress} activeOpacity={0.6}>
                            <MaterialIcons 
                                name="arrow-back-ios"  
                                size={20 * StylesVariables.textMulti} 
                                color={StylesVariables.grayDarkColor} 
                            />
                        </TouchableOpacity>
                    )}
                    { withMenu && (
                        <TouchableOpacity style={styles.closeButtonContent} onPress={() => OnShowMenu()} activeOpacity={0.6}>
                            <Ionicons 
                                name='ios-menu' 
                                size={20 * StylesVariables.textMulti} 
                                color={StylesVariables.grayDarkColor} 
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.centerContent}>
                    {withTitle && (
                        <View style={[styles.titleContainer, iconTitle !== null && styles.titleContainerWithIcon ]}>
                            {iconInTitle}
                            <Text style={[styles.titleTextSecondary, rightIcon === "new-seance" && {textAlign: 'left'}]}>{title}</Text>
                        </View>
                    )}
                </View>
                <View style={[styles.asideContent, {flex: .2, alignItems: 'flex-end', paddingRight: 8}]}>  
                    { withRightIcon &&
                        getIcon()
                    }
                </View>
            </View>
        </View>
    );
}

export default NavInner;
