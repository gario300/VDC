import React, { useEffect, useReducer } from 'react';
import { View, Platform, Dimensions, Image } from 'react-native';
import AppStore from './../Flux/AppStore';
import * as AppActions from "./../Flux/AppActions";
import * as Linking from 'expo-linking';
import AdviceNotification from './../Advice/AdviceNotifications';
//import DownloadModule from './../Download/MDownloadModule';
import MyLocalStorage from '../Utils/LocalStorage/my_local_storage';

import UserPresenter from './../User/user.presenter';
import ArticlePresenter from '../Articles/article.presenter';
import TabNavigator from './../Navigation/tab.navigator';
import myAppState from '../AppState/app_state';
import MenuModal from '../Menus/Modal/menu.modal';
import localization from '../Localization/localization';
import authState from './../Auth/auth.state';

const windowWidth = Dimensions.get('window').width; 
const windowHeight = Dimensions.get('window').height; 

const initialState = {
  "update": false,
  "showInfoModal": false,
  "showMenu": false,
  "showSearch": false,
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'SHOW_INFO':
      return {
        ...prevState,
        "showInfoModal": action.value,
      };
    case 'SHOW_MENU':
      return {
        ...prevState,
        "showMenu": action.value,
      };
    case 'UPDATE':
      return {
        ...prevState,
        "update": action.value
      };
  }
}

const uPresenter = new UserPresenter();
const MenuNavigationScreen = props => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    MyLocalStorage.GetItem("initialModalShow")
        .then( result => {
            if (result.status === 1) {
                OnCloseModal();
            } else {
                OnShowInfo();
                //console.log("Result Not Success")
            }
        }).catch( error => {
            OnShowInfo();
            console.log("Slider not completed before");
        });
    return () => {}
  }, [])

  React.useEffect(() => {

    if (!authState.isAuthAnonym) {
      OnGetUser();
      AppStore.on("onGetUser", OnGetUser);
      AdviceNotification.start(props);
    } else {
      const user = uPresenter.parseUserAnonym( );
      AppActions.setUserMe(user);
    }
    //DownloadModule.start(props, AppStore, AppActions, Platform);

    return () => {
      if (!authState.isAuthAnonym) {
        AppStore.removeListener("onGetUser", OnGetUser);
        AdviceNotification.exit();
      }
      //DownloadModule.exit();
      //Notifications.removeAllNotificationListeners();
    }
  }, []);

  React.useEffect(() => {
    const url = myAppState.getLinkingUrl
    if(url.active) {
      openUrl(url)
    }
    Linking.addEventListener('url', handleOpenURL);
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    }
  }, [])

  useEffect(() => {
    AppStore.on('openedArticle', logOpenArticle)
    return () => {
      AppStore.removeListener('openedArticle', logOpenArticle)
    }
  }, [])

  const logOpenArticle = (event) => {
    const presenter = new ArticlePresenter();
    const article = {
      id: event.id,
      type: event.type,
      os: Platform.OS
    }
    presenter.openedArticleEvent(article)
    .then(res => console.log(res)).catch(err => console.log(err))
  }

  const handleOpenURL = (event) => {
    const urlObj = Linking.parse(event.url);
    const url = {
      path: urlObj.path,
      publication: urlObj.queryParams.publication,
      type: urlObj.queryParams.type,
    }
    openUrl(url)
  }

  const openUrl = (url) => {
    OnCloseMenu();
    const article = myAppState.articleInitial
    Object.assign(article, {id: url.publication, type: url.type});
      switch (url.type) {
        case 'article':
          myAppState.resetLinkingUrl();
          OnShowArticle(article)
          break;
          case 'video':
          myAppState.resetLinkingUrl();
          OnShowArticleVideo(article)
          break;
          case 'audio':
          myAppState.resetLinkingUrl();
          OnShowArticleAudio(article)
          break;
      }
  }

  const OnGetUser = async () => {
    uPresenter.getUserMe()
    .then(OnGetUserSuccess)
    .catch(OnGetUserError);
  }

  const OnGetUserSuccess = (result) => {
    if (result.status === 1) {
        const user = uPresenter.parseUserMe( result.result );
        AppActions.setUserMe(user);
        AppActions.setNotifications(user.pushMessages.length)
        AppActions.setChatNotifications(typeof user.pushChatMessages !== "undefined" ? user.pushChatMessages : [])

        AdviceNotification.OnNotificationsUpdatedLast(user.pushMessages.length, typeof user.pushChatMessages !== "undefined" ? user.pushChatMessages.length : 0);
      } else {
          OnGetUserError();
      }
  }

  const OnGetUserError = (error) => {
      console.log("Get User Error: ", error)
  }

  const OnUpdate = () => {
    this.setState({
        update: !this.state.update
    });
  }

  const OnShowInfo = () => {
    dispatch({ type: 'SHOW_INFO', value: true})
  }

  const OnCloseModal = () => {
    dispatch({ type: 'SHOW_INFO', value: false})
    MyLocalStorage.SaveItem({"modalShownBefore": true}, "initialModalShow")
    .then( result => {
        if (result.status === 1) {
            console.log("Save Slider Success")
        } else {
            console.log("Save Slider Not Success")
        }
    }).catch( error => { 
        console.log("Save Slider Error");
    });
  }

  const OnShowMenu = () => {
    dispatch({ type: 'SHOW_MENU', value: true});
  }

  const OnCloseMenu = () => {
    dispatch({ type: 'SHOW_MENU', value: false});
  }

  const OnShowSearch = () => {
    props.navigation.navigate('SearchModal');
  }

  const OnShowArticle = (params) => {
    props.navigation.navigate('ArticleModal', {article: params});
  }

  const OnShowArticleVideo = (params) => {
    console.log("Video")
    props.navigation.navigate('ArticleVideoModal', {article: params});
  }

  const OnShowArticleAudio = (params) => {
    props.navigation.navigate('ArticleAudioModal', {article: params});
  }

  return (
    <View style={{flex: 1}}>
      <TabNavigator
        navigation={props.navigation}
        showInfo={OnShowInfo}
        OnShowMenu={OnShowMenu}
        OnShowSearch={OnShowSearch}
        OnShowArticle={OnShowArticle}
        OnShowArticleVideo={OnShowArticleVideo}
        OnShowArticleAudio={OnShowArticleAudio} />
      <MenuModal
        navigation={props.navigation}
        OnCloseModal={OnCloseMenu}
        visible={state.showMenu} />
    </View>
  )
}

export default MenuNavigationScreen;
