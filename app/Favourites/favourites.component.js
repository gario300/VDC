import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import ImageLoader from './../UIComponents/Image/image_loader.component';
import StylesVariables from './../Styles/app.style';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
    },
    emptyBox: {
        padding: StylesVariables.spacing * 1.5 * StylesVariables.responsiveMulti,
        marginHorizontal: StylesVariables.spacing * 2 * StylesVariables.responsiveMulti,
        borderRadius: 21,
        width: 276 * StylesVariables.responsiveMulti,
        height: 129 * StylesVariables.responsiveHeightMulti,
    },
    cardImgContent: {
        overflow: 'hidden',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        borderRadius: 21,
        justifyContent: 'center',
        width: 276 * StylesVariables.responsiveMulti,
        height: 129 * StylesVariables.responsiveHeightMulti,
    },
    cardImg: {
        width: '100%',
        height: '100%',
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardInfoContainer: {
        justifyContent: 'center',
        borderRadius: 30,
        flex: 1,
        backgroundColor: StylesVariables.whiteColor,
        height: 70 * StylesVariables.responsiveHeightMulti,
    },
    cardTitle: {
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.subTitleFontSize - 1,
        lineHeight: StylesVariables.subTitleFontSize + 6,
        textAlign: 'center'
    },
    cardSubTitle: {
        ...StylesVariables.appSubTitle,
        textAlign: 'center',
        fontSize: StylesVariables.subTitleFontSize,
        lineHeight: StylesVariables.subTitleFontSize + 6,
        color: StylesVariables.redColor
    },
    warningBadge: {
        flex: 1,
        position: 'absolute',
        right: 8 * StylesVariables.responsiveMulti,
        top: 8 * StylesVariables.responsiveMulti,
        // right: 15 * StylesVariables.multi,
        width: 22 * StylesVariables.responsiveMulti,
        maxWidth: 22 * StylesVariables.responsiveMulti,
        height: 22 * StylesVariables.responsiveMulti
    },
    iconContainer: {
        flex: 1,
        position: 'absolute',
        right: 5 * StylesVariables.responsiveMulti,
        top: 5 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.secondaryColor,
        flexDirection: 'row',
        borderRadius: 30,
        width: 34 * StylesVariables.responsiveMulti,
        height: 34 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: 24 * StylesVariables.responsiveMulti,
        alignSelf: 'center',
        paddingLeft: 2,
        paddingTop: 3,
        color: StylesVariables.whiteColor
    }
});

const FavouritesItem = ({ index, id, OnPress, item }) => {

    return (
        <View style={[styles.container]}>
            
            <TouchableOpacity 
                style={styles.emptyBox}
                activeOpacity={0.8}
                onPress={() => {
                    OnPress(id);
                }}
            >
                <View style={styles.cardImgContent}>
                    <Image
                        style={styles.cardImg}
                        resizeMode={'cover'}
                        source={{uri: item.image}}
                    />
                </View>
                <View style={styles.cardContent}>
                    <View style={styles.cardInfoContainer}>
                        <Text 
                            numberOfLines={2}
                            style={[styles.cardTitle]}>
                            {item.title.toUpperCase()}
                        </Text>
                        <Text 
                            numberOfLines={2}
                            style={[styles.cardSubTitle]}>
                            {item.categories}
                        </Text>
                    </View>
                </View>
                <View style={styles.iconContainer}>
                    <Ionicons name="md-heart" style={styles.icon} />
                </View>
            </TouchableOpacity> 
        </View>
    )

}

export default FavouritesItem;