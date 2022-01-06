import React from 'react';
import { View, StyleSheet, TouchableHighlight, Image, Text, TouchableOpacity } from 'react-native';
import ImageLoader from './../Image/image_loader.component';
import StylesVariables from './../../Styles/app.style';
import * as Price from './../../Utils/price';
import { Foundation } from '@expo/vector-icons'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StylesVariables.whiteColor
    },
    topBorder: {
        borderTopWidth: .5,
        borderTopColor: StylesVariables.textColorLight,
    },
    bottomBorder: {
        borderBottomColor: StylesVariables.textColorLight,
        borderBottomWidth: .5
    },
    cardButton: {
        flex: 1
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
        paddingTop: StylesVariables.spacing * 1,
        paddingBottom: StylesVariables.spacing * 1
    },

    cardImgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: StylesVariables.spacing * 1
    },
    cardImgContent: {
        borderRadius: 4,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        width: 102 * StylesVariables.responsiveMulti,
        height: 102 * StylesVariables.responsiveMulti,
    },
    cardImg: {
        width: 102 * StylesVariables.responsiveMulti,
        height: 102 * StylesVariables.responsiveMulti,
    },
    
    cardInfoContainer: {
        flex: 1,
        marginHorizontal: StylesVariables.spacing * 1
    },
    cardTextContainer: {
        justifyContent: 'center',
    },
    cardTitle: {
        ...StylesVariables.appTextMedium,
        fontSize: StylesVariables.textFontSize + 1
    },
    cardSubTitle: {
        ...StylesVariables.appTextMedium,
        fontFamily: StylesVariables.subTitleFont,
        color: StylesVariables.textColorLight
    },
    priceText: {
        ...StylesVariables.appSubTitle
    },
    bottomButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomTextContainer: {
        flex: .6,
    },
    buttonsAddRemoveContainer: {
        flex: .9,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    addRemoveButton: {
        borderRadius: 50,
        borderWidth: 1,
        borderWidth: 1,
        borderColor: StylesVariables.secondaryColor,
        width: 40 * StylesVariables.responsiveMulti,
        height: 40 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconAddRemove: {
        color: StylesVariables.textColor,
        fontSize: StylesVariables.textFontSize
    },
    addRemoveCount: {
        width: 42 * StylesVariables.responsiveMulti,
        justifyContent: 'center'
    },
    addRemoveCountText: {
        ...StylesVariables.appSubTitle,
        textAlign: 'center',
    },
    spacing: {
        height: StylesVariables.spacing * StylesVariables.responsiveMulti
    },
    iconOrganicContainer: {
        flex: 1,
        position: 'absolute',
        left: StylesVariables.spacing / 2 * StylesVariables.responsiveMulti,
        top: StylesVariables.spacing / 2 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.secondaryColor,
        flexDirection: 'row',
        borderRadius: 30,
        width: 25 * StylesVariables.responsiveMulti,
        height: 25 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgIconOrganic: {
        alignSelf: 'center',
        width: 15 * StylesVariables.responsiveMulti,
        height: 15 * StylesVariables.responsiveMulti
    },
});

const imageAgriculture = require('./../../../assets/products/agriculture-biologique.png');

const CardList = ({ id, OnPress, item, count, OnAddItemCount, OnSubstractItemCount }) => {

    return (
        <View style={[styles.container]}>
            
            <TouchableOpacity 
                style={[styles.cardButton, styles.bottomBorder]}
                activeOpacity={0.8}
                onPress={ () => {
                    OnPress(id);
                }}
            >
                <View style={styles.cardContent}>

                    <View style={styles.cardImgContainer}>
                        <View style={styles.cardImgContent}>
                            <ImageLoader
                                style={styles.cardImg}
                                resizeMode={'cover'}
                                source={{uri: item.image}}
                                loadSize={"small"}
                            />
                        </View>
                    </View>

                    <View style={styles.cardInfoContainer}>
                        <View style={styles.cardTextContainer}>
                            <Text
                                numberOfLines={1}
                                style={[styles.cardTitle]}>
                                {item.title}
                            </Text>
                        </View>
                        <View style={styles.spacing} />
                        <View style={styles.cardTextContainer}>
                            <Text 
                                numberOfLines={2}
                                style={styles.cardSubTitle}>
                                {item.ingredients}
                            </Text>
                        </View>
                        <View style={styles.spacing} />
                        <View style={styles.bottomButtonsContainer}>
                            <View style={[styles.cardTextContainer, styles.bottomTextContainer]}>
                                <Text 
                                    style={styles.priceText}
                                >
                                    {Price.formatPrice(item.price)}
                                </Text>
                            </View>
                            <View style={styles.buttonsAddRemoveContainer}>
                                <TouchableHighlight 
                                    style={styles.addRemoveButton}
                                    underlayColor={StylesVariables.secondaryColor}
                                    onPress={() => {
                                        OnSubstractItemCount(id, count);
                                    }}
                                >
                                    <Foundation name="minus" size={styles.iconAddRemove.fontSize} color={styles.iconAddRemove.color} />
                                </TouchableHighlight>
                                <View style={styles.addRemoveCount}>
                                    <Text style={styles.addRemoveCountText}>
                                        {count}
                                    </Text>
                                </View>
                                <TouchableHighlight 
                                    style={styles.addRemoveButton}
                                    underlayColor={StylesVariables.secondaryColor}
                                    onPress={() => {
                                        OnAddItemCount(id, count);
                                    }}
                                >
                                    <Foundation name="plus" size={styles.iconAddRemove.fontSize} color={styles.iconAddRemove.color} />
                                </TouchableHighlight>
                            </View>
                        </View>

                    </View>
                    {item.additionalInfo["bio"] === "1" && (
                        <View style={styles.iconOrganicContainer}>
                            <Image 
                                source={imageAgriculture} 
                                resizeMode={'contain'}
                                style={styles.imgIconOrganic}
                            />
                        </View>
                    )}
                </View>
            </TouchableOpacity> 
        </View>
    )

}

export default CardList;