import React, {Fragment} from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import StylesVariables from '../Styles/app.style';
import Localization from '../Localization/localization';
import { typesSeance } from '../Constants/constants.index'
const styles = StyleSheet.create({
    container: {
        
        paddingHorizontal: StylesVariables.spacing * 2,
        minHeight: 110 * StylesVariables.responsiveMulti,
        justifyContent: 'space-evenly',
        backgroundColor: "#f7f7f7",
    },
    containerSeen: {
        backgroundColor: StylesVariables.whiteColor
    },
    header: {
        ...StylesVariables.appSubTitle,
        marginTop: 4,
        color: StylesVariables.textSecundaryColor,
    },
    headerC: {
        ...StylesVariables.appTextMedium,
        color: StylesVariables.mainColor
    },
    content: {
        ...StylesVariables.appText,
        color: StylesVariables.notifTextColor,
        marginVertical: 8 * StylesVariables.responsiveHeightMulti,
    },
    date: {
        ...StylesVariables.appText,
        fontFamily: StylesVariables.titleFont,
        color: StylesVariables.grayColor
    },

    itemWarning: {        
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        // alignItems: 'center',
        display: 'none',
        // backgroundColor: 'rgba(33, 33, 33, .5)',
    },
    itemWarningActive: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    itemWarningContainer: {
        flex: 1,
        position: 'relative',
        minHeight: 52 * StylesVariables.responsiveMulti,
        // backgroundColor: 'rgba(200, 220, 140, .5)',
        paddingHorizontal: 20 * StylesVariables.responsiveMulti,
        overflow: 'visible'
    },
    warningBadge: {
        flex: 1,
        position: 'absolute',
        right: 12 * StylesVariables.responsiveMulti,
        top: 8 * StylesVariables.responsiveMulti,
        // right: 15 * StylesVariables.multi,
        width: 22 * StylesVariables.responsiveMulti,
        maxWidth: 22 * StylesVariables.responsiveMulti,
        height: 22 * StylesVariables.responsiveMulti
    },
    warningBadgeImage: {
        flex: 1,
        width: 22 * StylesVariables.responsiveMulti,
        height: 22 * StylesVariables.responsiveMulti
    },
    warningTextContainer: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: 10,
        justifyContent: 'center'
    },
    warningText: {
        fontSize: StylesVariables.textFontSize,
        fontWeight: 'bold',
        color: StylesVariables.whiteColor,
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    innerSpace: {
        height: 4 * StylesVariables.responsiveMulti
    },
    separator: {
        alignSelf: 'flex-end',
        backgroundColor: StylesVariables.notifSeparatorColor,
        height: 1,
        width: "90%",
    },
    mediumWeigt: {
        fontFamily: StylesVariables.mediumFont
    },
    lightWeight: {
        fontFamily: StylesVariables.textFont
    },
    lightWeightLight: {
        fontFamily: StylesVariables.textFont
    }
})

const NewsTile = ({ index, id, OnPress, item, lang, navigation, }) => {

    if(item.type == 4){
        return (
        <TouchableHighlight
            underlayColor={StylesVariables.whiteColor}

            onPress={() => {
                OnPress(id)
            }}>
            <Fragment>
                <View style={[styles.container, item.seen && styles.containerSeen]}> 
                    <Text style={[styles.header, item.seen && styles.mediumWeigt]}>
                        {item.title}
                    </Text>
                    <Text style={styles.date}>
                        {item.dateFormatted}
                    </Text>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={2}
                        style={styles.content}>
                        {item.short}
                    </Text>
                    {/*<View style={[styles.itemWarning, !item.seen && styles.itemWarningActive]}>
                        <View style={styles.itemWarningContainer}>
                            <View style={styles.warningBadge}>
                                <Image
                                    style={styles.warningBadgeImage}
                                    resizeMode='contain'
                                    source={require('../../assets/flashes/flashes.png')}
                                />
                                <View style={styles.warningTextContainer}>
                                    <Text style={styles.warningText}>{'!'}</Text>
                                </View>
                            </View>
                        </View>
        </View>*/}
                </View>
                <View style={styles.separator} />
            </Fragment>
        </TouchableHighlight>
        )
    }


    return (
        <TouchableHighlight
            underlayColor={StylesVariables.whiteColor}
            onPress={() => {
                OnPress(id)
            }}>
            <Fragment>
                <View style={[styles.container, item.seen && styles.containerSeen]}>
            
                    <Text style={[styles.header, item.seen && styles.mediumWeigt]}>
                        {item.title}
                    </Text>
                    <Text style={[styles.headerC, item.seen && styles.lightWeight, {fontSize: 12.5}]}>
                        {item.typeSeance}
                    </Text>
                    <Text style={[styles.date, item.seen && styles.lightWeightLight]}>
                        {"Aujourd'hui" + '   ' }{item.startTime+' - '}{item.endTime}
                    </Text>
                    
                </View>
                <View style={styles.separator} />
            </Fragment>
        </TouchableHighlight>
    )
}

export default NewsTile
