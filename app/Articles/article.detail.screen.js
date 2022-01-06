import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as AppActions from '../Flux/AppActions';
import ArticlePresenter from './article.presenter';
import DateTime from "../DateTime/date_time";
import Localization from "../Localization/localization";

import Tag from "../UIComponents/Tag/tag.component";
import styles from "./article.style";
import cardStyles from "./Cards/card.style";
import CardFooter from "./Cards/card.footer.component";
import ImageLoader from "../UIComponents/Image/image_loader.component";
import HTML from 'react-native-render-html';
import downloadState from './../Download/download_state';
import TagRow from "./Cards/tag.row_inline.component";
import { parse } from "expo-linking";

const dateTime = new DateTime();

const ArticleDetailScreen = ({ route, navigation }) => {
  const [article, setArticle] = useState(route.params.article);
  const [audioLang, setAudioLang] = useState(Localization.getUserLanguage())
  const createdAt = dateTime.dateFormatted(
    dateTime.newDate(article.created)
  );

  const isDownload = route.params.article.hasOwnProperty('isDownload')

  useEffect(() => {
    if(!route.params.article.hasOwnProperty('isDownload')) {
      AppActions.openedArticle({id: route.params.article.id, type: 'article' })
      getArticleFromId(route.params.article.id);
    } else {
      verifyArticleLanguages(article)
    }
  }, [])

  const verifyArticleLanguages = (parseItem) => {
    const newList = [];
    let isActiveLangThere = false;
    Object.keys(parseItem.content).forEach(key => {
      if (parseItem.content[key].title !== "") {
        newList.push(key);
        if (key === audioLang) {
          isActiveLangThere = true;
        }
      }
    })
    if (!isActiveLangThere && newList.length > 0) {
      setAudioLang(newList[0])
    }
    Localization.setAvailableLangsContent(newList);
  }

  const getArticleFromId = (id) => {
    AppActions.displayLoader(true);
    const presenter = new ArticlePresenter();
    presenter.getPublicationDetail(id)
      .then(res => {
        AppActions.displayLoader(false);
        if (res.status === 1) {
          const parseItem = presenter.parseArticle(res.result);
          verifyArticleLanguages(parseItem)
          setArticle(parseItem)
        }
      })
      .catch(err => {
        AppActions.displayLoader(false);
        console.log(err)
      });
  }
  
  const imgUrl = article.images["0"];
  const urlPrefix = isDownload ? downloadState.downloadUrl() : "";

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <View style={styles.tagRowContainer}>
          <TagRow categories={article.categories} type={article.type} />
        </View>
        <View style={styles.closeIcon}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.6}>
            <AntDesign
              name="close"
              size={styles.closeIcon.height}
              color={styles.closeIcon.tintColor}/>
          </TouchableOpacity>
        </View>
      </View>
        <ScrollView>
          <View style={styles.titleHeaderRow}>
            <Text style={styles.titleText}>{article.content[audioLang].title}</Text>
          </View>
          <View style={cardStyles.authorCont}>
            <Text style={cardStyles.authorText}>
              {Localization.word("author")} : {article.author.name}{" "}
              {article.author.lastName}
            </Text>
            <Text style={cardStyles.authorText}>{createdAt}</Text>
          </View>
          <View style={cardStyles.imageCont}>
            <ImageLoader
              resizeMode="cover"
              source={{ uri: urlPrefix + imgUrl }}
              style={cardStyles.imageCont}
              loadSize="large"
            />
          </View>
          <View style={styles.descContainer}>
          <HTML
            html={article.content[audioLang].body}
            tagsStyles={{p: cardStyles.descText}} />
          </View>
        </ScrollView>
      <View style={cardStyles.separator} />
      <CardFooter article={article} />
    </View>
  );
};

export default ArticleDetailScreen;
