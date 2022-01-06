import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

import ImageLoader from './../UIComponents/Image/image_loader.component';

import StylesVariables from './../Styles/app.style';

import { Ionicons, Feather } from '@expo/vector-icons'; 

import authState from './../Auth/auth.state';

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
        width: 20 * StylesVariables.responsiveMulti,
        height: 20 * StylesVariables.responsiveMulti,
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
    },
    btnDisabled: {
        display: 'none'
    }
});

const imageLocation = require('./../../assets/products/location.png');
const imageTime = require('./../../assets/products/time.png');
const imageAgriculture = require('./../../assets/products/agriculture-biologique.png');

const ProducerCardImg = ({ id, OnPress, img, title, categories, subtitle, isFavorite, pickHour, isOrganic, setLike, cColor }) => {

    return (
        <View style={styles.container}>
            
            <TouchableOpacity 
                style={[styles.cardButton]}
                activeOpacity={0.6}
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
                                style={[styles.cardCategories, {color: "#"+cColor}]}>
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
                                {pickHour}
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
                    {isFavorite && (
                    <TouchableOpacity 
                        style={[styles.iconContainer, authState.isAuthAnonym && styles.btnDisabled]}
                        onPress={() => {
                            setLike(id, false)
                        }}
                        disabled={authState.isAuthAnonym}
                    >
                        <Ionicons name="md-heart" style={styles.icon} />
                    </TouchableOpacity>
                    )}
                    {!isFavorite && (
                    <TouchableOpacity 
                        style={[styles.iconContainer, authState.isAuthAnonym && styles.btnDisabled]}
                        onPress={() => {
                            setLike(id, true)
                        }}
                        disabled={authState.isAuthAnonym}
                    >
                        <Feather name="heart" style={styles.icon} />
                    </TouchableOpacity>
                    )}
                            
                </View>
            </TouchableOpacity> 
        </View>
    )

}

export default ProducerCardImg;