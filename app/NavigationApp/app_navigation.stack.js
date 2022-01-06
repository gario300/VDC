import React, {useState, Fragment} from 'react';
import { 
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { 
  createStackNavigator, 
  TransitionSpecs,
  HeaderStyleInterpolators
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {AuthContext} from './../Auth/auth.context';
import AppStore from './../Flux/AppStore';
import authState from './../Auth/auth.state';
import myAppState from '../AppState/app_state';

import NavInner from '../Navigation/NavHead/nav_inner.component';
import NavWelcome from '../Navigation/NavHead/nav_welcome.component';

import * as SplashScreen from 'expo-splash-screen';
import * as Linking from 'expo-linking';
import LandingScreen from './../Landing/landing.screen'
import LoginScreen from './../Login/login.screen';
import InscriptionScreen from './../Inscription/inscription.screen';
import PasswordRecoveryScreen from './../PasswordRecovery/password_recovery.screen';
import MenuScreen from './../NavigationMenu/menu_navigation.stack';
import LoginPresenter from './../Login/login.presenter';
import MDownloadModule from '../Download/MDownloadModule';
import LocalStorageClass from '../Utils/LocalStorage/my_local_storage'
import ProfileDetails from '../Profile/UserDetails/UserDetails'
import SearchScreen from '../SearchScreen/Search.screen'
const Stack = createStackNavigator();

/*
const MyTransition = {
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.7],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};
*/

const options = { 
  header: ({ scene, previous, navigation}) => {
    const { options } = scene.descriptor;
    const withReturn = typeof options.withReturn !== "undefined" ? options.withReturn : true;
    const isFloat = typeof options.isFloat !== "undefined" ? options.isFloat : true;
    const navType = typeof options.navType !== "undefined" ? options.navType : 0;
    const params = typeof options.params !== "undefined" ? options.params : null;
  
    if (navType === 0) {
      return (
        <NavWelcome
        withReturn={withReturn}
        isFloat={isFloat}
        OnBackPress={() => {
            navigation.goBack();
          }}
        />
      );
    } 
    else if (navType === 1) {
      return (
        <NavWelcome
          withReturn={withReturn}
          isFloat={isFloat}
          OnBackPress={() => {
            navigation.goBack();
          }}
          enabled={false}
        />
      );
    } else {
      return (
        <NavInner
          withReturn={withReturn}
          withCart={false}
          withTitle={options.title !== ""}
          withFilters={false}
          title={options.title}
          headerTransparent={options.headerTransparent}
          OnBackPress={() => {
            navigation.goBack();
          }}
          OnRightPress={null}
          OnCenterPress={null}
          location={false}
          />
          )
        }
      },
    gesturesEnabled: false,
    swipeEnabled: false,
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        "userToken": action.token,
        "isQuestComplete": authState.isQuestComplete,
        "isLoading": false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        "isSignout": false,
        "isLoading": false,
        "userToken": action.token,
        "isQuestComplete": authState.isQuestComplete
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        "isSignout": true,
        "isLoading": false,
        "isQuestComplete": false,
        "userToken": null,
      };
  }
}

const initialState = {
  "isLoading": true,
  "isSignout": false,
  "userToken": null,
  "isQuestComplete": false,
}

export default NavigationApp = props => {

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [verifyFirstLogin, setVerifyFirstLogin] = useState(false)
  const [firstQuestion, setFirstQuestion] = useState('')
  const vLocalStorage = async() => { 
   const question = await new LocalStorageClass().verifyFirstQuestion()
   setFirstQuestion(question)
   const verify = await new LocalStorageClass().verifyFirstLogin()
   setVerifyFirstLogin(verify)
  }
    
  React.useEffect (()=>{
      vLocalStorage()
  },[])

  React.useEffect(() => {
    const asyncLogin = async (value) => {
      let questCompleted = authState.isQuestComplete
      if (value.isAnonym) {
        authState.setQuestCompleted(true);
        questCompleted = true;
      }
      dispatch({ 
        type: 'SIGN_IN', 
        token: authState.token, 
        options: {
          isQuestComplete: questCompleted
        }
      })
    }

    AppStore.on("doLogin", asyncLogin);
    return () => {
      AppStore.removeListener("doLogin", asyncLogin);
    }
  }, []);

  React.useEffect(() => {
    const onFinishIntro = async () => {
      authState.setQuestCompleted(true);
      dispatch({ 
        type: 'SIGN_IN', 
        token: authState.token, 
        options: {
          isQuestComplete: authState.isQuestComplete
        }
      })
    }

    AppStore.on("finishIntro", onFinishIntro);
    return () => {
      AppStore.removeListener("finishIntro", onFinishIntro);
    }
  }, []);

  React.useEffect(() => {
    const asyncLogout = async () => {

      if (authState.isAuthAnonym) {
        const presenter = new LoginPresenter();
        presenter.logOutAnonym()
        .then( result => {
            if (result.status === 1) {
                console.log("Logout Success!");
            }
        })
        .catch(err => {
          console.log("Logout error: ", err)
        });
      } else {
        const presenter = new LoginPresenter();
        presenter.logOut()
        .then( result => {
            if (result.status === 1) {
                console.log("Logout Success!");
            }
        })
        .catch(err => {
          console.log("Logout error: ", err)
        });
      }
      MDownloadModule.RemoveAllInformation();

      dispatch({ type: 'SIGN_OUT' })
    }
    
    AppStore.on("doLogout", asyncLogout);
    return () => {
      AppStore.removeListener("doLogout", asyncLogout);
    }
  }, []);

  React.useEffect(() => {
    //SplashScreen.preventAutoHideAsync()
    const verifyUserTokenAsync = async () => {
      //setIsLoading(true)
      const lPresenter = new LoginPresenter();
      await lPresenter.isUserLoggedIn()
      .then(result => {
        if (result.status === 1) {
          lPresenter.registerDeviceToken(result.token);
          authState.setQuestCompleted(result.alreadySet);
          dispatch({ 
            type: 'SIGN_IN', 
            token: result.token, 
            options: {
              isQuestComplete: authState.isQuestComplete
            }
          })
        } else {
          //dispatch({ type: 'SIGN_OUT' })
          lPresenter.verifyTokenWithoutConnectionMethod()
          .then(res => {
            if (res.status === 1) {
              lPresenter.registerDeviceToken(res.token);
              authState.setQuestCompleted(res.alreadySet);
              dispatch({ 
                type: 'SIGN_IN', 
                token: res.token, 
                options: {
                  isQuestComplete: authState.isQuestComplete
                }
              })
            } else {
              dispatch({ type: 'SIGN_OUT' })
              lPresenter.logOutOnTokenError()
              lPresenter.removeDeviceTokenAskFirst()
              lPresenter.resetBadges();
            }
          })
          .catch( er => {
            dispatch({ type: 'SIGN_OUT' })
            lPresenter.logOutOnTokenError();
            lPresenter.removeDeviceTokenAskFirst()
            lPresenter.resetBadges();
          })
        }
      })
      .catch(_error => {
        console.log("Out")
        dispatch({ type: 'SIGN_OUT' })
        lPresenter.logOutOnTokenError();
        lPresenter.removeDeviceTokenAskFirst()
        lPresenter.resetBadges();
      })
      
      await SplashScreen.hideAsync()
      //console.log("Dispatch")
    }

    verifyUserTokenAsync();

    return () => {}
  }, []);

  React.useEffect(() => {
    Linking.parseInitialURLAsync()
        .then(urlObj => {
            if(urlObj.queryParams.hasOwnProperty('publication')) {
              openAppWithURL(urlObj)
            }
        })
        .catch(error => console.error(error));
  }, [])

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: '-' });
      }
    }),
    []
  );

  const openAppWithURL = (urlObj) => {
    if (urlObj.queryParams.hasOwnProperty('publication')) {
      myAppState.setLinkingUrl({
        active: true,
        path: urlObj.path,
        publication: urlObj.queryParams.publication,
        type: urlObj.queryParams.type
    })
    }
  }
  

  const responseQuestion = async(value) => {
    if (typeof value === "string") {
      //console.log("Val", value)
      const setQuestion = await new LocalStorageClass().saveFirstQuestion(value)
    }
    setFirstQuestion(value)
  }
{
/*
  if (1 < 10) {
    return(
        <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        >
            <TouchableOpacity
                onPress={()=>{
                    AppStore.emit('displayVerticalToast', {
                        type: 3,
                        message: 'lorem',
                        textC: 1
                    })
                }}
            >
                <View
                    style={{width: 50, height: 50, borderRadius: 50, backgroundColor: 'blue'}}
                />
            </TouchableOpacity>
        </View>
    )    
  }
*/
}
  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return (
    <View style={styles.container}>
      <Image style={styles.splashImg}
        resizeMode={'contain'} 
        source={require('./../../assets/splash.png')}
      />
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </View>
    )
  }
 
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Landing"
          mode="card"
          headerMode="screen"
          screenOptions={options}
        >
          {state.userToken === null && <>
            <Stack.Screen name="Landing" options={{ navType: 1, withReturn: false, gestureEnabled: false, headerTransparent: true, isFloat: false }} component={LandingScreen} />
            <Stack.Screen name="Login" options={{ navType: 0, withReturn: true, gestureEnabled: false, headerTransparent: false, isFloat: true }} component={LoginScreen} />
            <Stack.Screen name="Inscription" options={{ navType: 0, withReturn: true, gestureEnabled: false, headerTransparent: false, isFloat: true }} component={InscriptionScreen} />
            <Stack.Screen name="PasswordRecovery" options={{ navType: 0, withReturn: true, gestureEnabled: false, headerTransparent: false, isFloat: true }} component={PasswordRecoveryScreen} />
          </>}
          {state.userToken !== null && <>
            {1 < 10 && <>
              <Stack.Screen 
              name="AppMenu" 
              options={{ withReturn: false, gestureEnabled: false, headerShown: false }} 
              component={MenuScreen}  />
              <Stack.Screen 
              name="ProfileUserDetails" 
              options={{ withReturn: false, gestureEnabled: false, headerShown: false }} 
              component={ProfileDetails}/> 
            </>}
          </>}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImg: {
    flex: 1
  },
  activityContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '10%'
  }
});
