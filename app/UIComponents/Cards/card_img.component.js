import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

import Localization from '../../Localization/localization';
import ImageLoader from './../Image/image_loader.component';

import StylesVariables from './../../Styles/app.style';

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons, Feather } from '@expo/vector-icons'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: StylesVariables.spacing
    },
    cardButton: {
        flex: 1,
        overflow: 'hidden',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: StylesVariables.mainColor
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },

    cardImgContainer: {
        flex: 1,
        overflow: 'hidden',
        height: (140) * StylesVariables.responsiveMulti
    },
    cardImg: {
        flex: 1,
        width: '100%',
    },
    
    cardInfoContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: StylesVariables.spacing * StylesVariables.responsiveMulti,
        marginVertical: 12 * StylesVariables.responsiveMulti
    },
    cardTextContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: StylesVariables.spacing / 2
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    cardTitle: {
        ...StylesVariables.appSubTitle
    },
    cardCategories: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.secondaryColor
    },
    cardSubTitle: {
        ...StylesVariables.appTextMedium
    },
    cardDescription: {
        ...StylesVariables.appTextMedium
    },
    imgIcon: {
        width: 15 * StylesVariables.responsiveMulti,
        height: 15 * StylesVariables.responsiveMulti,
        marginRight: StylesVariables.spacing * 1
    },
    iconContainer: {
        flex: 1,
        position: 'absolute',
        right: StylesVariables.spacing / 2 * StylesVariables.responsiveMulti,
        top: StylesVariables.spacing / 2 * StylesVariables.responsiveMulti,
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
    },
    iconOrganicContainer: {
        flex: 1,
        position: 'absolute',
        left: StylesVariables.spacing / 2 * StylesVariables.responsiveMulti,
        top: StylesVariables.spacing / 2 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.secondaryColor,
        flexDirection: 'row',
        borderRadius: 30,
        width: 40 * StylesVariables.responsiveMulti,
        height: 40 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgIconOrganic: {
        alignSelf: 'center',
        width: 25 * StylesVariables.responsiveMulti,
        height: 25 * StylesVariables.responsiveMulti
    }
});

const imageLocation = require('./../../../assets/products/location.png');
const imageTime = require('./../../../assets/products/time.png');
const imageAgriculture = require('./../../../assets/products/agriculture-biologique.png');

const CardImg = ({ id, OnPress, img, title, categories, subtitle, description, isFavorite, isOrganic }) => {

    return (
        <View style={styles.container}>
            
            <TouchableOpacity 
                style={styles.cardButton}
                activeOpacity={0.8}
                onPress={() => {
                    OnPress(id);
                }}
            >
                <View style={styles.cardContent}>

                    <View style={styles.cardImgContainer}>
                        <ImageLoader
                            style={styles.cardImg}
                            source={{uri: img, cache: 'reload',}}
                            loadSize={"small"}
                        />
                    </View>


                    <View style={styles.cardInfoContainer}
                    >
                        <View style={styles.cardTextContainer}>
                            <Text 
                                numberOfLines={4}
                                style={[styles.cardTitle]}>
                                {title.toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.cardTextContainer}>
                            <Text 
                                numberOfLines={4}
                                style={[styles.cardCategories]}>
                                {categories}
                            </Text>
                        </View>
                        <View style={[styles.cardTextContainer, styles.cardRow]}>
                            <Image 
                                source={imageLocation} 
                                resizeMode={'contain'}
                                style={styles.imgIcon}
                            />
                            <Text 
                                numberOfLines={4}
                                style={[styles.cardSubTitle]}>
                                {subtitle}
                            </Text>
                        </View>
                        <View style={[styles.cardTextContainer, styles.cardRow]}>
                            <Image 
                                source={imageTime} 
                                resizeMode={'contain'}
                                style={styles.imgIcon}
                            />
                            <Text 
                                numberOfLines={4}
                                style={[styles.cardDescription]}>
                                {description}
                            </Text>
                        </View>

                    </View>

                    {isOrganic && (
                        <View style={styles.iconOrganicContainer}>
                            <Image 
                                source={imageAgriculture} 
                                resizeMode={'contain'}
                                style={styles.imgIconOrganic}
                            />
                        </View>
                    )}
                    {isFavorite && <View style={styles.iconContainer}>
                        <Ionicons name="md-heart" style={styles.icon} />
                    </View>}
                    {!isFavorite && <View style={styles.iconContainer}>
                        <Feather name="heart" style={styles.icon} />
                    </View>}
                            
                </View>
            </TouchableOpacity> 
        </View>
    )

}

export default CardImg;