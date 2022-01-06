import React from 'react';
import { Text, View, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';

import * as AppleAuthentication from 'expo-apple-authentication';
import { Octicons } from '@expo/vector-icons'; 

import * as AppActions from "./../Flux/AppActions";
import Messages from './../Message/message';
import Localization from './../Localization/localization';

import LocalizeLayout from './../Localize/localize.component';

import LoginPresenter from './../Login/login.presenter';

import styles from './../Styles/landing.style';
import StylesVariables from '../Styles/app.style';

export default class LandingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.presenter = new LoginPresenter();
        this.state = {
            updated: false
        }
    }

    onUpdate = () => {
        this.setState({
            updated: !this.state.updated
        });
    }

    componentDidMount() {
        AppActions.displayLoader(false);
    }

    componentWillUnmount() {}

    goToMenuApp = () => {
        AppActions.doLogin(this.mtoken, false);
    }

    goToLogin = () => {
        //console.log("Props: ", this.props.navigation.navigate("Login"));
        this.props.navigation.navigate("Login");
    }

    logInFacebook = async () => {
        const response = await this.presenter.getFacebookTokenForLogin();
        if (response) {
            AppActions.displayLoader(true);
            if (typeof response.error !== "undefined") return this.OnInscriptionError( {} );
            this.doFacebookLoginSocial(response.accessToken);
        }
    }

    doFacebookLoginSocial = (accessToken) => {
        const data = {
            accessToken
        };

        this.presenter.sendAuthFormToDoFacebookLogin(data, Platform.OS)
        .then( result => {
            if (result.status === 1) {
                this.finishLoginAndRegisterDevice(result);
            } else {
                AppActions.displayLoader(false);
                this.OnSuccessError(result);
            }
        })
        .catch(this.OnSuccessError);
    }


    logInGoogle = async () => {
        const response = await this.presenter.getGoogleTokenForLogin();
        if (response) {
            AppActions.displayLoader(true);
            if (typeof response.error !== "undefined") return this.OnInscriptionError( {} );
            const auth = {
                accessToken: response.auth.auth.accessToken,
                platform: Platform.OS,
                idToken: response.auth.auth.idToken
            };
            this.doGoogleLoginSocial(auth);
        }
    }

    doGoogleLoginSocial = (auth) => {
        this.presenter.sendAuthFormToDoGoogleLogin(auth, Platform.OS)
        .then( result => {
            if (result.status === 1) {
                this.finishLoginAndRegisterDevice(result);
            } else {
                AppActions.displayLoader(false);
                this.OnSuccessError(result);
            }
        })
        .catch(this.OnSuccessError);
    }

    logInApple = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });

            const name = credential.fullName.givenName;
            const lastName = credential.fullName.familyName;
            this.doAppleLoginSocial(credential.identityToken, name, lastName,);

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
            if (result.status === 1) {
                this.finishLoginAndRegisterDevice(result);
            } else {
                AppActions.displayLoader(false);
                this.OnSuccessError(result);
            }
        })
        .catch(this.OnSuccessError);
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

        Messages.setMessage(Localization.word("error") + ':\n' + Localization.sentence("inscription_not_valid"));
        AppActions.displayMessage(true)
    }

    OnSuccessError = async (error) => {
        //console.log("Error: ", error)
        AppActions.displayLoader(false)
        if (typeof error.status !== "undefined") {
            Messages.setMessage(Localization.word("error") + ':\n' + error.message);
        } else {
            Messages.setMessage(Localization.word("error") + ':\n' + Localization.sentence("login_not_valid"));
        }
        AppActions.displayMessage(true)
        const _val = await this.presenter.removeDeviceTokenAskFirst()
        .then(_ => {})
        .catch(_ => {});
    }

    finishLoginAndRegisterDevice = (result) => {
        this.mtoken = result.token;
        this.presenter.registerDeviceToken(result.token);
        AppActions.displayLoader(false);
        this.goToMenuApp();
    }

    OnAnonym = () => {
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
                AppActions.doLogin(this.mtoken, true);
            } else {
                AppActions.displayLoader(false);
                this.OnSuccessError(result);
            }
        })
        .catch(this.OnSuccessError);
    }
    
    render() {
        return (
            <View style={styles.container}> 
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
                    <View style={styles.rightContent}>
                    </View>
                </View> 
                <View style={styles.content}>

                    <View style={styles.introContainer}>
                        <Text style={styles.introText}>{Localization.sentence("intro_text")}</Text>
                        <Text style={styles.introTextPolicy}>{Localization.sentence("intro_text_policy")}</Text>
                    </View>

                    <ScrollView 
                        style={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={styles.buttonContainer}>
                        {Platform.OS === "ios" && 
                            <View style={styles.buttonApple}>
                                <AppleAuthentication.AppleAuthenticationButton
                                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE}
                                    cornerRadius={0}
                                    style={styles.appleButtonIcon}
                                    onPress={this.logInApple}
                                />
                            </View>}
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.faceButton]}
                                activeOpacity={0.5}
                                onPress={this.logInFacebook}
                            >
                                <View style={styles.socialIcon}>
                                    <Image
                                        style={ styles.socialConnectionIcon }
                                        resizeMode={'contain'} 
                                        source={require('../../assets/icons/facebook_icon.png')}
                                    />
                                </View>
                                <View style={styles.socialTextContent}>
                                    <Text style={styles.socialText()}>
                                        {Localization.word("facebook_login")}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.google]}
                                activeOpacity={0.5}
                                onPress={this.logInGoogle}
                            >
                                <View style={styles.socialIcon}>
                                    <Image
                                        style={ styles.socialConnectionIcon }
                                        resizeMode={'contain'} 
                                        source={require('../../assets/icons/google_icon.png')}
                                    />
                                </View>
                                <View style={styles.socialTextContent}>
                                    <Text style={[styles.socialText()]}>
                                    {Localization.word("google_login")}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.mail]}
                                activeOpacity={0.5}
                                onPress={this.goToLogin}
                            >
                                <View style={styles.socialIcon}>
                                    <Octicons name="mail" size={21} color={StylesVariables.grayColor} />
                                </View>
                                <View style={styles.socialTextContent}>
                                    <Text style={[styles.socialText()]}>
                                    {Localization.word("email_login")}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                        {<View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.anonym]}
                                activeOpacity={0.5}
                                onPress={this.OnAnonym}
                            >
                                <View style={styles.socialTextContent}>
                                    <Text style={styles.anonymText}>
                                    {Localization.word("anonym_login")}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>}

                    </ScrollView>
                </View>
            </View>
        )
    }
}
