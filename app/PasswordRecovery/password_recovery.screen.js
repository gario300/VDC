import React from 'react';
import { Text, View, Image, Animated, Keyboard, TouchableWithoutFeedback } from 'react-native';

import styles from './../Styles/login.style';

import NormalButton from './../UIComponents/Button/button_login.component';
import PasswordRecoveryPresenter from './password_recovery.presenter';
import Localization from './../Localization/localization';
import Messages from './../Message/message';
import InputText from '../UIComponents/Input/input_text_login.component';

const IMAGE_NORMAL = 4;
const BOTTOMFLEX_NORMAL = 4;

import * as AppActions from "./../Flux/AppActions";

export default class PasswordRecoveryScreen extends React.Component {

    constructor(props) {
        super(props);

        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(IMAGE_NORMAL);
        this.bottomFlex = new Animated.Value(BOTTOMFLEX_NORMAL);
        this.presenter = new PasswordRecoveryPresenter();
        this.state = {
            loading: false,
            email: '',
            errorMessageText: ''
        }
    }

    OnBackButton = () => {
        Messages.removeLastListener();
        AppActions.displayMessage(false)
        this.props.navigation.goBack();
    }

    OnEmailChanged = (val) => {
        this.setState({email: val});
    }

    OnErrorCallback = () => {
        const isSuccess = this.state.isSuccess ? true : false;
        if (isSuccess) {
            this.props.navigation.goBack();
        }
    }

    OnPasswordRecovery = () => {

        const formValid = this.presenter.validateEmail(this.state.email);
        if (formValid.error) {
            Messages.setMessage(Localization.word("error") + ": " + Localization.word("email_correct"));
            AppActions.displayMessage(true)
            return;
        }

        AppActions.displayLoader(true);
        this.presenter.sendAuthFormToRecoveryPassword(this.state.email)
        .then(result => {
            AppActions.displayLoader(false);
            if (result.status === 1) {
                Messages.addListener(this.OnBackButton);
                Messages.setMessage(Localization.sentence("new_password"));
                AppActions.displayMessage(true)
            } else if (result.status === 2) {
                Messages.setMessage(Localization.word("error") + ": " + Localization.sentence("emaill_not_exists"));
                AppActions.displayMessage(true)
            } else {
                Messages.setMessage( Localization.word("error") + ": " + Localization.sentence("server_error") );
                AppActions.displayMessage(true)
            }
        })
        .catch(error => {
            Messages.setMessage( Localization.word("error") + ": " + Localization.sentence("server_error") );
            AppActions.displayLoader(false);
            AppActions.displayMessage(true)
        });
    }

    OnEndSubmitting = () => {
        this.OnPasswordRecovery();
    }

    OnBackPress = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
                <View style={styles.header} /> 
                <View style={styles.body}>
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
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={styles.bodyContainer}>
                            <View style={styles.spacing} />
                            <View style={styles.loginHeader}>
                                <View style={styles.loginHeaderContent}>
                                    <View
                                        style={styles.loginHeaderButton}
                                    >
                                        <Text style={styles.loginHeaderText}>{Localization.word("mot_de_passe_oublie") + " ?"}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.inputButton}>
                                <InputText
                                    value={this.state.email}
                                    maxLength={120}
                                    placeholder={Localization.word("email") + "*"}
                                    secure={false}
                                    editable={true}
                                    keyboardType='email-address'
                                    callback={this.OnEmailChanged}
                                    submiting={this.OnEndSubmitting}
                                />
                            </View>
                            <View style={styles.empty}></View>
                            <View style={styles.inputButton}>
                                <NormalButton 
                                    title={Localization.word("reinitialiser")} 
                                    callback={this.OnPasswordRecovery} 
                                />
                            </View>
                            <View style={{flex: 4}}></View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Animated.View>
        )
    }

}
