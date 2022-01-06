import React from 'react';
import { Text, View, ScrollView, Linking, Dimensions } from 'react-native';

import Localization from '../Localization/localization';
import ImageLoader from './../UIComponents/Image/image_loader.component';
import * as AppActions from "../Flux/AppActions";

import styles from './advice.style';

import FlashPresenter from './../Flash/flash.presenter';

import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import localization from './../Localization/localization';

export default class AdviceDescriptionScreen extends React.Component {

    constructor(props) {

        super(props);
        
        //const params = props.navigation.state.params;
        const item = props.route.params.item;

        this.presenter = new FlashPresenter();
        this.state = {
            onUpdate: false,
            item: {},
            itemId: item["id"],
            isReady: false,
            selectedLang: Localization.getUserLanguage(),
        };

        this.getFlashDetail(item.id);
    }

    getFlashDetail = (id) => {
        AppActions.displayLoader(true);
        this.presenter.getNotificationDetailed(id)
        .then(result => {
            AppActions.displayLoader(false);
            if (result.status === 1) {
                const item = this.presenter.parseResult(result.result);
                this.setState({
                    item: item,
                    isReady: true
                });
            } else {
                console.log("There was a problem retrieving the flash notification detailed");
            }
        })
        .catch(error => {
            AppActions.displayLoader(false);
            console.log("On Get Error: ", error);
        });
    }

    OnWebLinkPress = (val, href) => {
        if (href && typeof href !== "undefined") {
            Linking.openURL(href);
        }
    }

    getHtmlText = (item, lang) => {
        if (item.content[lang].body !== "" && item.content[lang].body !== "<p><br></p>") {
            return item.content[lang].body;
        }
        if (item.body !== "" && item.body !== "<p><br></p>") {
            return item.body;
        }
        if (item.content["en"].body !== "" && item.content["en"].body !== "<p><br></p>") {
            return item.body;
        }

        return "";
    }

    render() {
        const item = this.state.item;
        const lang = localization.getUserLanguage()
        return (
            <View style={styles.container}>
                <ScrollView 
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                >
                    {this.state.isReady &&
                    <View style={styles.scrollContent}>
                        <View style={styles.separator}></View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.itemTitleText}>{item.content[lang].title !== "" ? item.content[lang].title : item.title}</Text>
                        </View>
                        
                        <View style={styles.dateContainer}>
                            <Text style={styles.itemDateText}>{item.dateFormatted}</Text>
                        </View>

                        <View style={styles.itemContentImg}>
                            <ImageLoader
                                style={styles.itemImg}
                                resizeMode={'contain'} 
                                source={{uri: item.image}}
                                loadSize={"large"}
                            />
                        </View>

                        <View style={styles.descriptionContainer}>

                            <HTML
                                html={this.getHtmlText(item, lang)} 
                                onLinkPress={this.OnWebLinkPress}
                                imagesMaxWidth={Dimensions.get('window').width} 
                                ignoredTags={[ ...IGNORED_TAGS, 'br']}
                                tagsStyles={ {
                                    p: styles.itemDescriptionText
                                } }
                            />
                            
                        </View>

                        <View style={styles.separator}></View>
                    
                    </View>
                    }
                    
                </ScrollView>

            </View>
        )
    }
}