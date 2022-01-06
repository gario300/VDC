import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Keyboard, Animated, Platform, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { CheckBox } from 'react-native-elements'

import * as AppleAuthentication from 'expo-apple-authentication';

import styles from './../Styles/login.style';
import StylesVariables from './../Styles/app.style';

import MKeyboard from './../Keyboard/keyboard';
import Localization from './../Localization/localization';
import Messages from './../Message/message';
import MyLocalStorage from './../Utils/LocalStorage/my_local_storage';

import NotificationsPresenter from './../PushNotifications/notifications_presenter';
import NotificationsServer from './../PushNotifications/notifications_server';

import NormalButton from './../UIComponents/Button/button_login.component';
import ButtonRight from './../UIComponents/Button/button_right.component';
import SecondaryButton from './../UIComponents/Button/secondary_button.component';
import InputText from '../UIComponents/Input/input_text_login.component';

import LoginPresenter from './login.presenter';
import UserPresenter from './../User/user.presenter';
import * as AppActions from "./../Flux/AppActions";

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.scrollRef =  null;
        this.keyboardHeight = new Animated.Value(0);
        
        this.presenter = new LoginPresenter();
        this.mtoken = "";
        this.state = {
            email: '',
            passwd: '',
            rememberMe: false,
            updated: false,
            paddingBottom: 0
        };
    }
    
    OnInscription = () => {
        const { navigate } = this.props.navigation;
        navigate('Inscription', {
            isSocial: false
        });
    }

    componentDidMount () {
        MKeyboard.addKeyboardListener(this);
        AppActions.displayMessage(false)
    }

    componentWillUnmount() {
        MKeyboard.removeKeyboardListener(this);
    }

    resetBadges = () => {
        const notifPresenter = new NotificationsPresenter();
        notifPresenter.resetBadgesCount();
    }

    OnEmailChanged = (val) => {
        this.setState({email: val});
    }

    OnPasswordChanged = (val) => {
        this.setState({passwd: val});
    }

    OnRememberMeChecked = (val) => {
        this.setState({rememberMe: !this.state.rememberMe});
    }

    OnPasswordRecovery = () => {
        const { navigate } = this.props.navigation;
        navigate('PasswordRecovery');
    }

    OnEndSubmitting = () => {
        this.OnConnection();
    }

    OnConnection = () => {
        Keyboard.dismiss();
        if (this.state.email !== '' && this.state.passwd !== '') {
            this.doLogin(this.state.email, this.state.passwd, this.state.rememberMe);
        }
    }

    OnAnonym = () => {
        Keyboard.dismiss();
        //const email = "anonym@email.com";
        //const password = "anonymU1";
        const email = "anonym@email.com";
        const password = "aNon7ym!U1";
        
        AppActions.displayLoader(true);
        this.presenter.sendAuthFormToDoLoginAnonym(email, password, false)
        .then( result => {
            if (result.status === 1) {
                this.mtoken = result.token;
                AppActions.displayLoader(false);
                this.goToMenuApp(true);
            } else {
                AppActions.displayLoader(false);
                this.OnSuccessError(result);
            }
        })
        .catch(this.OnSuccessError);
    }

    doLogin = (email, password, rememberMe) => {
        Keyboard.dismiss();
        const formValid = this.presenter.validateForm(password, email);
        if (formValid.error) {
            const msg = 'Oups: \n'  + formValid.msg

            Messages.setMessage(msg);
            AppActions.displayMessage(true)
            return;
        }
        
        AppActions.displayLoader(true);
        this.presenter.sendAuthFormToDoLogin(email, password, rememberMe, Platform.OS)
        .then( result => {
            if (result.status === 1) {
                //console.log("Register device")
                this.finishLoginAndRegisterDevice(result);
            } else {
                AppActions.displayLoader(false);
                this.OnSuccessError(result);
            }
        })
        .catch(this.OnSuccessError);
    }

    finishLoginAndRegisterDevice = (result) => {
        this.mtoken = result.token;
        this.presenter.registerDeviceToken(result.token);
        AppActions.displayLoader(false);
        this.goToMenuApp(false);
    }

    OnSuccessError = async (error) => {
        console.log("Errorre: ", error)
        this.setState({
            "rememberMe": false
        });
        AppActions.displayLoader(false)
        if (typeof error.status !== "undefined") {
            if (error.status === 3) {
                Messages.setMessage(Localization.word("error") + ':\n' + Localization.word("login_need_to_confirm"));
            } else {
                Messages.setMessage(Localization.word("error") + ':\n' + error.message);
            }
        } else {
            Messages.setMessage(Localization.word("error") + ':\n' + Localization.sentence("login_not_valid"));
        }
        AppActions.displayMessage(true)
        const _val = await this.presenter.removeDeviceTokenAskFirst()
        .then(_ => {})
        .catch(_ => {});
        this.resetBadges();
    }

    OnGetTokenError = (error) => {
        console.log("Get Token Error", error);
    }

    goToMenuApp = (isAnonym = false) => {
        AppActions.doLogin(this.mtoken, isAnonym);
    }

    keyboardWillShow = (event) => {
        /*
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: MKeyboard.eventDuration(event),
                easing: Easing.back(),
                toValue: event.endCoordinates.height,
                useNativeDriver: true
            })
        ]).start( () => {
            
        });
        */
        this.setState({
            "paddingBottom": (event.endCoordinates.height + 10)
        }, () => {

            setTimeout( () => {
                this.scrollRef.scrollTo({x: 0, y: (100 * StylesVariables.responsiveHeightMulti)})
            }, 10)
            
        })
    }
    
    keyboardWillHide = (event) => {
        /*
        Animated.parallel([
          Animated.timing(this.keyboardHeight, {
            duration: MKeyboard.eventDuration(event),
            toValue: 5,
            useNativeDriver: true
          })
        ]).start();
        */
        this.setState({
            "paddingBottom": 0
        })
    };

    logInFacebook = async () => {
        const response = await this.presenter.sendAuthFormToDoFacebookLogin();
        if (response) {
            //console.log("Response: ", response)
            AppActions.displayLoader(true);
            if (typeof response.error !== "undefined") return this.OnInscriptionError( {} );
            const email = response.email;
            const uid = response.id;
            setTimeout(() => {
                AppActions.displayLoader(false);
            }, 3000);
        }
    }

    newUserFacebook = (response) => {
        AppActions.displayLoader(false);
        const data = {
            "email": response.email,
            "lastName": response.last_name,
            "password": this.newSocialPassword(response.id),
            "name": response.first_name,
            "type": 2
        }

        const { navigate } = this.props.navigation;
        navigate('Inscription', {
            isSocial: true,
            user: data
        });
    }

    newSocialPassword = (passwd, name) => {
        return passwd + "_" + "78uF!9";
    }

    logInApple = async () => {
        Keyboard.dismiss();
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });

            const name = credential.fullName.givenName;
            const lastName = credential.fullName.familyName;
            this.doAppleLoginSocial(credential.identityToken, name, lastName);

        } catch (e) {
            if (e.code === 'ERR_CANCELED') {
                // handle that the user canceled the sign-in flow
            } else {
                // handle other errors
            }
        }
    }

    doAppleLoginSocial = (identityToken, name, lastName) => {
        AppActions.displayLoader(true);
        this.presenter.sendAppleAuthFormToDoLogin(identityToken, name, lastName, Platform.OS)
        .then( result => {
            //console.log("RResult: ", result)
            if (result.status === 1) {
                this.finishLoginAndRegisterDevice(result);
            } else {
                AppActions.displayLoader(false);
                this.OnSuccessError(result);
            }
        })
        .catch(this.OnSuccessError);
    }

    newUserApple = (response, email) => {
        AppActions.displayLoader(false);
        const data = {
            "email": email,
            "lastName": "",
            "password": this.newSocialPassword(response.uid),
            "name": "",
            "type": 4
        }

        const { navigate } = this.props.navigation;
        navigate('Inscription', {
            isSocial: true,
            user: data
        });
    }

    OnInscriptionError = (error) => {
        AppActions.displayLoader(false);
        if (typeof error.status !== "undefined") {
            if (error.status === 2) {
                AppActions.displayLoader(false);
                Messages.setMessage(Localization.word("error") + ':\n' + Localization.sentence("email_exists"));
                AppActions.displayMessage(true)
                return;
            }
        }

        this.setState({
            "email": "",
            "passwd": ""
        });

        Messages.setMessage(Localization.word("error") + ':\n' + Localization.sentence("inscription_not_valid"));
        AppActions.displayMessage(true)
    }

    loginRender() {
        return (
        <View style={[styles.container]}>
            <View style={styles.header} />
        
            <ScrollView 
                style={styles.scrollView}
                keyboardDismissMode={"interactive"}
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={{paddingBottom: this.state.paddingBottom}}
                ref={ref => this.scrollRef = ref}
            >
                <View style={styles.loginContainer}>

                    <View style={styles.headRow}>
                        <View style={styles.leftContent}>
                            <View style={styles.iconImgContainer}>
                                <Image
                                    style={styles.iconImg}
                                    resizeMode={'contain'} 
                                    source={require('../../assets/logo/logo.png')}
                                />
                            </View>
                        </View>
                        <View style={styles.rightContent}></View>
                    </View> 
                    <View style={styles.spacing} />
                    <View style={styles.loginHeader}>
                        <View style={styles.loginHeaderContent}>
                            <View
                                style={styles.loginHeaderButton}
                            >
                                <Text style={styles.loginHeaderText}>{Localization.word("connexion")}</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={this.OnInscription}
                                style={styles.loginHeaderButton}
                            >
                                <Text style={styles.loginHeaderTextRight}>{Localization.word("inscription_continue")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>            
                        <View style={styles.inputField}>
                            <InputText 
                                value={this.state.email}
                                secure={false}
                                maxLength={40}
                                placeholder={Localization.word('identifiant')}
                                editable={true}
                                keyboardType='email-address'
                                callback={this.OnEmailChanged}
                                submiting={this.OnEndSubmitting}
                            />
                        </View>
                        <View style={styles.inputField}>
                            <InputText 
                                value={this.state.passwd}
                                maxLength={18}
                                callback={this.OnPasswordChanged}
                                placeholder={Localization.word('mot_de_passe')}
                                secure={true}
                                editable={true}
                                keyboardType='default'
                                submiting={this.OnEndSubmitting}
                            />
                        </View>
                        <View style={styles.inputFieldCheck}>
                            <View style={styles.inputFieldCheckContent}>
                                <CheckBox
                                    iconRight={false}
                                    containerStyle={styles.checkStyle}
                                    textStyle={styles.textCheckStyle}
                                    title={Localization.word("se_souvenir_de_moi")}
                                    uncheckedColor={StylesVariables.lightGrayColor}
                                    checkedColor={StylesVariables.grayDarkColor}
                                    checked={this.state.rememberMe}
                                    left
                                    onIconPress={this.OnRememberMeChecked}
                                    onPress={this.OnRememberMeChecked}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <View style={styles.inputButton}>
                            <NormalButton 
                                title={ Localization.word('seconnecter') }
                                callback={this.OnConnection}
                            />
                        </View>
                    </View>

                    <View style={styles.forgotPasswordContainer}>
                        <TouchableOpacity 
                            style={[styles.linksContainer]} 
                            onPress={this.OnPasswordRecovery}    
                            activeOpacity={0.5}
                        >
                            <View style={styles.linkButton}>
                                <Text style={styles.linkText}>{Localization.word("mot_de_passe_oublie") + " ?"}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
        )
    }

    render() {
        return this.loginRender();
    }
}

export default LoginScreen;
