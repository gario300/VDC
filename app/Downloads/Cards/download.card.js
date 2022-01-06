import React, { Fragment } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import StylesVariables from '../../Styles/app.style';
import Tag from '../../UIComponents/Tag/tag.component';
import DateTime from '../../DateTime/date_time';
import ImageLoader from '../../UIComponents/Image/image_loader.component';
import localization from '../../Localization/localization';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import appStore from '../../Flux/AppStore';
//const { getAudioDurationInSeconds } = require('get-audio-duration');
import { Audio } from 'expo-av'
import { formatMillis } from '../../Utils/formater';
import Message from './../../Message/message';
import { ActivityIndicator } from 'react-native';
import downloadState from './../../Download/download_state';

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 150 * StylesVariables.responsiveHeightMulti,
        paddingVertical: StylesVariables.spacing,
        width: StylesVariables.windowWidth,
    },
    imageCont: {
        paddingHorizontal: StylesVariables.spacing,
    },
    imageStyle: {
        height: 130 * StylesVariables.responsiveHeightMulti,
        width: 130 * StylesVariables.responsiveMulti
    },
    descCont: {
        flex: 1,
        paddingHorizontal: StylesVariables.spacing,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: StylesVariables.spacing,
    },
    titleText: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.cardTitleTextColor,
    },
    dateText: {
        ...StylesVariables.appText,
        color: StylesVariables.cardTextColor,
        fontSize: StylesVariables.smallFontSize,
    },
    separator: {
        backgroundColor: StylesVariables.backgroundInputLogin,
        height: 3,
    },
    durationCont: {
        alignItems: "center",
        backgroundColor: StylesVariables.cardTitleTextColor,
        bottom: StylesVariables.spacing,
        justifyContent: "center",
        height: 30 * StylesVariables.responsiveHeightMulti,
        position: "absolute",
        right: StylesVariables.spacing * 2,
        width: 50 * StylesVariables.responsiveMulti,
        zIndex: 10,
    },
    durationText: {
        ...StylesVariables.appText,
        color: StylesVariables.whiteColor,
    },
    tag: {
        marginRight: StylesVariables.spacing,
    },
    tagRow: {
        flex: 1,
        flexDirection: "row",
        overflow: "hidden",
        marginRight: StylesVariables.spacing
    },
    activityLoader: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#33333322',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const dateTime = new DateTime();

const DownloadCard = ({ item , appActions, appStore, goToDetail, urlImg}) => {
    const createdAt = dateTime.dateFormatted(dateTime.newDate(item.created));

    const url = urlImg + item.images["0"];
    const activeLang = localization.getSelectedLanguage();

    const [millis, setMillis] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [localFile, _setIsLoading] = React.useState(item);
    const getSoundAsync = async (fileUrl) => {
        const sound = new Audio.Sound();

        try {

            const source = {
                uri: urlImg + fileUrl
            }
            const status = {
				shouldPlay: false,
				volume: 0
			}
            //console.log("fileUrl", source)
            const track = await sound.loadAsync(source, status, false);
            //console.log("Millis:: ", track.durationMillis); // Prints the duration in milliseconds
            setMillis(track.durationMillis)
        } catch (err) {
            console.log(err);
        };
    }
    
    React.useEffect(() => {
        //console.log("URl", item.content)
        /*
        var reader = new FileReader();
        reader.onloadend = (e) => {
            console.log("File Done: ");
        };
        */

        if (typeof item.content[activeLang] !== "undefined" 
        && item.content[activeLang]["file"].length > 0
        && item.content[activeLang]["file"][0] !== ""
        ) {
            //reader.readAsDataURL(item.content[activeLang]["file"][0]);
            getSoundAsync(item.content[activeLang]["file"][0])
            const isLoadingM = downloadState.isFileLoading(item.content[activeLang]["file"][0])
            setIsLoading(isLoadingM)
        }
        else if (typeof item.content["fr"] !== "undefined" 
            && item.content["fr"]["file"].length > 0
            && item.content["fr"]["file"][0] !== ""
        ) {
            getSoundAsync(item.content["fr"]["file"][0])
            const isLoadingM = downloadState.isFileLoading(item.content["fr"]["file"][0])
            setIsLoading(isLoadingM)
        }

        
        //console.log("imageURI: ", reader);
        //const imageURI = Asset.fromModule(url).uri
    })


    const askToRemove = (obj) => {
        Message.setMessage(localization.word("delete_question"))
        Message.addListener(() => {
            onRemove(obj);
        })
        Message.addListenerOther(onCancel)
        appActions.displayMessage(true);
    }

    const onRemove = (obj) => {
        Message.removeLastListenerBoth();
        appActions.displayMessage(false);
        appActions.removeDownload(obj)
        setTimeout(() => {
            appStore.emit("onDownloadUpdated")
            appStore.emit("displayToast", {
                message: localization.word("success_on_update"),
                type: 1,
            });
        }, 100)
    }

    const onCancel = () => {
        Message.removeLastListenerBoth();
        appActions.displayMessage(false);
    }

    const userLang = localization.getSelectedLanguage()
    return (
        <TouchableWithoutFeedback onPress={goToDetail}>
            <Fragment>
            <View style={styles.container}>
                <View style={styles.imageCont}>
                    <ImageLoader
                        resizeMode="cover"
                        source={{uri: url}}
                        style={styles.imageStyle}
                        loadSize="large" />
                    {item.type !== 'article' && (
                        <View style={styles.durationCont}>
                            <Text style={styles.durationText}>{formatMillis(millis)}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.descCont}>
                    <View style={styles.headerRow}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.tagRow}> 
                        {item.categories.map((cat, index) => (
                            <View style={styles.tag} key={`${index}`} >
                                <Tag title={cat} category={true} />
                            </View>
                        ))}
                        </ScrollView>
                        <View>
                        <TouchableOpacity
                            onPress={() => {
                                askToRemove(item)
                            }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 50,
                                height: 40
                            }}
                        >
                        <Feather name="download" size={25} color={StylesVariables.secondaryColor} />
                        </TouchableOpacity>
                        {isLoading && 
                        <View style={styles.activityLoader}>
                            <ActivityIndicator size="small" color={StylesVariables.blackColor} />
                        </View>}
                    </View>
                    </View>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={3}
                        style={styles.titleText}>
                        {item.content[userLang].title !== "" ? item.content[userLang].title : item.title}
                    </Text>
                    <Text style={styles.dateText}>
                        {createdAt}
                    </Text>
                </View>
            </View>
            <View style={styles.separator} />
        </Fragment>
        </TouchableWithoutFeedback>
    )
}

export default DownloadCard