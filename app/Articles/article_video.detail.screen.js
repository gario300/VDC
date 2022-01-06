import React, { useState, useReducer, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as AppActions from '../Flux/AppActions';
import ArticlePresenter from './article.presenter';

import Localization from "../Localization/localization";
import DateTime from "../DateTime/date_time";
import styles from "./article.style";
import cardStyles from "./Cards/card.style";
import MediaControls from "./Cards/controls.component";
import Tag from "../UIComponents/Tag/tag.component";
import CardFooter from "./Cards/card.footer.component";
import HTML from 'react-native-render-html';
import MVideoPlayer from "../VideoPlayer/MVideoPlayer";
import StylesVariables from "../Styles/app.style";
import downloadState from './../Download/download_state';
import TagRow from "./Cards/tag.row.component";

let defaultVolumeM = 0;
let isMutedM = 0;

const reducer = (prevState, action) => {
  switch (action.type) {
    case "SHOW_CONTROLS":
      return { ...prevState, showControls: !prevState.showControls };
    case 'PLAY':
      return { ...prevState, isPlaying: true, hasFinished: false }
    case 'PAUSE':
      return { ...prevState, isPlaying: false }
    case 'BUFFERING_END':
      return { ...prevState, isBuffering: false}
    case 'CHANGE_LANG':
      return { ...prevState, selectedLang: action.value}
    case 'FINISH':
      return { ...prevState, isPlaying: false, hasFinished: true}
    case 'CHANGE_VOLUME':
      return { ...prevState, volume: action.value}
    case 'SET_MUTE':
      isMutedM = action.value;
      return { ...prevState, isMuted: action.value}
  }
};

const initialValues = {
  showControls: true,
  isBuffering: true,
  isPlaying: false,
  hasFinished: false,
  isMuted: isMutedM,
  selectedLang: Localization.getUserLanguage(),
  volume: defaultVolumeM, //volume is reversed in slider 0 is 1, and 1 is 0
}

let lastState = {
  isPlaying: false
}

const dateTime = new DateTime();

const ArticleVideoDetailScreen = ({ route, navigation }) => {
  const [article, setArticle] = useState(route.params.article);
  const [originalArticle, setOriginalArticle] = useState(route.params.article);
  const [state, dispatch] = useReducer(reducer, initialValues);
  const createdAt = dateTime.dateFormatted(
    dateTime.newDate(article.created)
);

const verifyArticleLanguages = (parseItem) => {
  const newList = [];
  let isActiveLangThere = false;
  Object.keys(parseItem.content).forEach(key => {
    if (parseItem.content[key].title !== "") {
      newList.push(key);
      if (key === state.selectedLang) {
        isActiveLangThere = true;
      }
    }
  })
  if (!isActiveLangThere && newList.length > 0) {
    dispatch({type: 'CHANGE_LANG', value: newList[0]})
  } else if (isActiveLangThere) {
    dispatch({type: 'CHANGE_LANG', value: Localization.getUserLanguage()})
  }
  Localization.setAvailableLangsContent(newList);
}

const isDownload = route.params.article.hasOwnProperty('isDownload')
const urlPrefix = isDownload ? downloadState.downloadUrl() : "";

  useEffect(() => {
    if(!isDownload) {
      //is opened from article list
      getArticleFromId(route.params.article.id);
      AppActions.openedArticle({id: route.params.article.id, type: 'video' })
    } else if (route.params.article.hasOwnProperty('isDownload')) {
      // is opened from download
      //console.log("Is Download")
      verifyArticleLanguages(article)
    }
  }, [])

  const getArticleFromId = (id) => {
    AppActions.displayLoader(true);
    const presenter = new ArticlePresenter();
    presenter.getPublicationDetail(id)
      .then(res => {
        AppActions.displayLoader(false);
        if (res.status === 1) {
          setOriginalArticle(res.result)
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

  const showHideControls = () => {
    dispatch({ type: "SHOW_CONTROLS" });
  };

  const handlePlayPause = () => {
    dispatch({type: state.isPlaying ? 'PAUSE' : 'PLAY' })
  }

  const onChangeVolume = (volume) => {
    console.log('volume change', volume)
    dispatch({type: 'CHANGE_VOLUME', value: volume})
  }

  const changeLang = (value) => {
    const presenter = new ArticlePresenter();
    setArticle(presenter.parseArticle(originalArticle, value));
    dispatch({type: 'CHANGE_LANG', value: value })
  }

  const onStatusUpdate = (status) => {
    if(!status.isBuffering) {
      dispatch({type: 'BUFFERING_END'})
    }
    if (status.didJustFinish) {
      dispatch({type: 'FINISH'})
      lastState = {isPlaying: false}
    } else 
    if (!status.isPlaying && lastState.isPlaying) {
      dispatch({type: 'PAUSE'})
      lastState = {isPlaying: false}
    } else if (status.isPlaying) {
      lastState = {isPlaying: true}
    }
  }

  const videoUrl = article.content[state.selectedLang].file["0"];

  return (
    <View style={styles.container}>
        <MVideoPlayer
          finished={state.hasFinished}
          isBuffering={state.isBuffering}
          startPlaying={state.isPlaying}
          videoStyle={!state.showControls ? styles.videoImage : styles.videoImageBack}
          onStatusUpdate={onStatusUpdate}
          videoUrl={urlPrefix + videoUrl}
          mode={state.showControls ? "cover" : "contain"}
          withClose={state.showControls ? false : true}
          onClose={showHideControls}
          isMuted={state.isMuted}
          volume={1 - state.volume} />
        {!state.showControls && (
          <View 
            style={styles.videoLogoMinContainer}>
            <Image
              source={require("../../assets/icons/BeAfya_small_icon.png")}
              resizeMode="contain"
              style={styles.videoLogoMin}
            />
          </View>
        )}
        {state.showControls && (
          <View style={{ flex: 1 }}>
            <View style={styles.videoHeaderRow}>
              <View style={styles.videoLogosRow}>
                <Image
                  source={require("../../assets/icons/BeAfya_small_icon.png")}
                  resizeMode="contain"
                  style={styles.videoLogo} />
                <View style={styles.closeIcon}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.6}>
                    <AntDesign
                      name="close"
                      size={styles.videoCloseIcon.height}
                      color={styles.videoCloseIcon.tintColor} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={styles.videoTitleText}>
                {article.content[state.selectedLang].title}
              </Text>
              <View style={styles.authorCont}>
                <Text style={styles.videoAuthorText}>
                  {Localization.word("author")} : {article.author.name}{" "}
                  {article.author.lastName}
                </Text>
                <Text style={styles.videoAuthorText}>{createdAt}</Text>
              </View>
            </View>

            <Pressable onPress={() => showHideControls()} style={{ flex: 1 }} />
            <MediaControls
              changeLang={changeLang}
              selectedLang={state.selectedLang}
              handlePlayPause={handlePlayPause}
              isBuffering={state.isBuffering}
              isPlaying={state.isPlaying}
              volume={state.volume}
              isMuted={state.isMuted}
              OnMute={() => {
                dispatch({ type: "SET_MUTE", value: !state.isMuted });
              }}
              onChangeVolume={onChangeVolume} />
            <View style={styles.videoFooterContainer}>
            <TagRow categories={article.categories} type={article.type} />
              <View style={styles.descContainer}>
              <HTML
                html={article.content[state.selectedLang].description}
                tagsStyles={{p: cardStyles.descText}} />
              </View>
              <CardFooter article={article} />
            </View>
          </View>
        )}
    </View>
  );
};

export default ArticleVideoDetailScreen;
