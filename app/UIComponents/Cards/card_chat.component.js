import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import StylesVariables from './../../Styles/app.style';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import ImageLoader from '../Image/image_loader.component';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 4
    },
    btnSection: {
        flex: 1,
        justifyContent: 'center',
    },
    itemContent: {
        flex: 1,
        justifyContent: 'center'
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        height: 82 * StylesVariables.responsiveMulti
    },
    itemBorder: {
        borderColor: StylesVariables.borderColor,
        borderBottomWidth: .5,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    itemContainerContent: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: .7,
        overflow: "hidden",
        borderColor: StylesVariables.fillColor,
        height: 50 * StylesVariables.responsiveMulti,
        width: 50 * StylesVariables.responsiveMulti
    },
    iconImg: {
        width: 28 * StylesVariables.responsiveMulti,
        height: 28 * StylesVariables.responsiveMulti,
    },
    iconPhoto: {
        width: 28 * 2 * StylesVariables.responsiveMulti,
        height: 28 * 2 * StylesVariables.responsiveMulti,
        backgroundColor: '#fafafa'
    },
    itemContainerContentRight: {
        flex: 1,
        position: 'absolute',
        right: 10 * StylesVariables.responsiveMulti,
        top: 0,
        bottom: 0,
        justifyContent: 'center'
    },
    itemTitleContainer: {
        flex: 5,
        justifyContent: 'flex-start',
        marginRight: 5 * StylesVariables.responsiveMulti,
        marginTop: 5 * StylesVariables.responsiveMulti
    },
    itemTitle: {
        fontFamily: StylesVariables.titleFont,
        fontSize: StylesVariables.textFontSize + 2,
        color: StylesVariables.fillColor,
        marginRight: 60 * StylesVariables.responsiveMulti,
        lineHeight: StylesVariables.textLineHeight,
        fontWeight: '600',
    },
    itemNumberContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemNumberContent: {        
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        borderRadius: 50,
        width: 60 * StylesVariables.responsiveMulti,
        maxHeight: 60 * StylesVariables.responsiveMulti,
    },
    activeColor: {
        backgroundColor: StylesVariables.mainColorLight
    },
    notActiveColor: {
        backgroundColor: StylesVariables.mainColorDark
    },
    itemNumberTitleContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    itemNumberTitle: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.titleFontSize + 3,
        color: StylesVariables.whiteColor,
        textAlign: 'center',
        lineHeight: StylesVariables.titleLineHeight,
    },
    itemTitleSection: {
        justifyContent: 'center',
        height: 32
    },
    itemTitleDescriptionSection: {

    },
    itemMe: {
        fontSize: StylesVariables.textFontSize + 3,
        fontWeight: '600',
    },
    itemDescription: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 2,
        lineHeight: StylesVariables.textFontSize + 4,
        color: StylesVariables.mainColor,
        marginRight: 21 * StylesVariables.responsiveMulti,
        fontWeight: '300'
    },
    nextToPlay: {
        position: 'absolute',
        top: 0,
        left: 8,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        opacity: 1
    },
    playIcon: {
        width: 28, 
        height: 42
    },
    rightIconContent: {
        flex: 1,
        top: 8 * StylesVariables.responsiveMulti
    },
    dateText: {
        fontFamily: StylesVariables.textFont,   
        fontSize: StylesVariables.textFontSize - 3,
        lineHeight: StylesVariables.textLineHeight - 3,
        color: StylesVariables.mainColor,
    },
    pointContainer: {
        height: 10 * StylesVariables.responsiveMulti,
        alignSelf: 'flex-end',
        borderRadius: 50,
        marginTop: 2 * StylesVariables.responsiveMulti,
        width: 10 * StylesVariables.responsiveMulti,
        backgroundColor: StylesVariables.redColor
    },
    textActive: {
        fontFamily: StylesVariables.subTitleFont,
        fontSize: 14,
    },
    notSeenImg: {
        borderWidth: 1.5
    }
});

export default CardChat = ({ 
    id, 
    index, 
    OnPress, 
    item
}) => {
    return (
            <View style={[styles.container, index >= 0 && styles.itemBorder]}>
                <TouchableOpacity 
                    style={[styles.btnSection]}
                    activeOpacity={.5}
                    onPress={() => {
                        OnPress(id, index)
                    }}
                >
                    <View style={styles.itemContent}>
                        <View style={styles.itemContainer}>
                            <View style={styles.itemContainerContent}>
                                <View style={[styles.imgContainer, item.notSeen && styles.notSeenImg]}>
                                    {item.photo === null &&  (
                                        <ImageLoader
                                            style={styles.iconImg}
                                            resizeMode={'contain'} 
                                            source={require('../../../assets/icons/persons.png')}
                                            loadSize={"small"}
                                        />
                                    )}
                                    {item.photo !== null &&  (
                                        <ImageLoader
                                            style={styles.iconPhoto}
                                            resizeMode={'contain'} 
                                            source={{uri: item.photo}}
                                            loadSize={"small"}
                                        />
                                    )}
                                </View>
                            </View>
                            <View style={styles.itemTitleContainer}>
                                <View style={styles.itemTitleSection}>
                                    <Text 
                                        numberOfLines={2}
                                        style={[styles.itemTitle, item.notSeen && styles.textActive]}>
                                        {item.title}
                                    </Text>
                                </View>
                                {<View style={styles.itemTitleDescriptionSection}>
                                    <Text 
                                        numberOfLines={2}
                                        style={[styles.itemDescription, item.notSeen && styles.textActive]}>
                                        <Text style={[styles.itemMe, item.notSeen && styles.textActive]}>
                                            {item.me !== "" ? item.me + ": " : ""}
                                        </Text>
                                        {item.message}
                                    </Text>
                                </View>}
                            </View>
                            <View style={styles.itemContainerContentRight}>
                                <View style={styles.rightIconContent}>
                                    
                                    <Text style={[styles.dateText, item.notSeen && styles.textActive]}>{item.dateFormatted}</Text>
                                    {item.notSeen && <View style={styles.pointContainer}></View>}
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity> 
            </View>
    )
}
