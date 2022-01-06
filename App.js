import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppContainer from './app/NavigationApp/app_navigation.stack';

import Loader from './app/Loader/loader.component';
import CustomAlert from './app/CustomAlert/custom_alert.component';
import Toast from './app/UIComponents/Toast/toast.component';
import SecondToast from './app/UIComponents/Toast/SecondToast.component'
import AppStore from './app/Flux/AppStore';

import styles from './app/Styles/safe_area.style';

import { Asset } from 'expo-asset';

import chatsSocket from './app/Chat/chats.socket';

SplashScreen.preventAutoHideAsync()

import * as Facebook from 'expo-facebook';
import StylesVariables from './app/Styles/app.style';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        showAlert: AppStore.getIsMessageActive(),
        fontLoaded: false,
    };
    this.startFacebookLogin();
    this.startChatModule();
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
    ]);

    await Promise.all([...imageAssets]);
  }

  startFacebookLogin = () => {
    Facebook.initializeAsync({
        "appId": "558651698397903", 
        "appName": "TGW Test"
    }).then(_res => {
        console.log("Success on initializing Facebook SDK");
    })
    .catch(_err => {
        console.log("Error on initializing Facebook SDK");
    })
  }

  startChatModule = () => {
    chatsSocket.initConnection();
  }

  async componentDidMount() {
    try {

      this.setStoreCallacks();
      await this._loadAssetsAsync();
      await Font.loadAsync({
        'Regular': require('./assets/fonts/GlacialIndifference-Regular.otf'),
        'Medium': require('./assets/fonts/GlacialIndifference-Bold.otf'),
        'Bold': require('./assets/fonts/GlacialIndifference-Bold.otf'),
        'SemiBold': require('./assets/fonts/GlacialIndifference-Bold.otf'),
        'Italic': require('./assets/fonts/GlacialIndifference-Italic.otf'),
        'Light': require('./assets/fonts/GlacialIndifference-Regular.otf'),
        'LightItalic': require('./assets/fonts/GlacialIndifference-Italic.otf')
      });

      this.setState({
        fontLoaded: true
      })
      
    } catch (e) {
      console.warn(e);
    }
  }

  setStoreCallacks() {
    AppStore.on("updateMenuNav", this.OnUpdate);
  }

  componentWillUnmount() {
    AppStore.removeListener("updateMenuNav", this.OnUpdate);
  }
  
  OnUpdate = () => {
    this.setState({
        "update": !this.state.update
    });
  }

  render() {

    if (!this.state.fontLoaded) {
      return null;
    }

    return (
      <SafeAreaView style={styles.droidSafeArea}>
        <StatusBar backgroundColor={StylesVariables.whiteColor} barStyle="dark-content" />
        <View style={styles.container}>
            <SecondToast/>
            <AppContainer />
            <CustomAlert />
            <Toast />
            <Loader />
        </View>
      </SafeAreaView>
    )
    
  }
}
