import React from 'react';
import { Text, View, Platform, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';

import { Input } from 'react-native-elements';

import stylesInner from '../Styles/inner.style';
import styles from './account.style';

import MKeyboard from './../Keyboard/keyboard';
import Localization from './../Localization/localization';

import UserPresenter from './../User/user.presenter';
import Messages from './../Message/message';

import MyLocalStorage from './../Utils/LocalStorage/my_local_storage';

import AppStore from './../Flux/AppStore';
import * as AppActions from "./../Flux/AppActions";
import myAppState from '../AppState/app_state';

//import WhiteButtonBorder from './../UIComponents/Button/white_button_border.component';
import RoundedButton from '../UIComponents/Button/normal_button.component';


export default class AccountPasswordScreen extends React.Component {

    constructor(props) {

        super(props);

        this.scrollRef =  null;
        this.presenter = new UserPresenter();

        const user = myAppState.userMe;

        this.state = {
            isLogin: true,
            user: user,
            password: "",
            newPassword: "",
            confirmPassword: "",
            keyboardHeight: 0,
            activeModal: false,
        };
    }

    componentDidMount () {
        MKeyboard.addKeyboardListener(this);
    }

    componentWillUnmount() {
        MKeyboard.removeKeyboardListener(this);
    }

    keyboardWillShow = (event) => {
        /*
        this.setState({
            keyboardHeight: event.endCoordinates.height
        }, () => {
            setTimeout( () => {
                //this.scrollRef.scrollTo({x: 0, y: 50, animated: true })
            }, 100)
        })
        */
    }
    
    keyboardWillHide = (event) => {
        this.setState({
            keyboardHeight: 0
        }, () => {
            this.scrollRef.scrollTo({x: 0, y: 0, animated: true });
        })
    }

    OnChangeName = (val) => {
        this.changeUserValue(val, "name");
    }

    OnChangeLastname = (val) => {
        this.changeUserValue(val, "lastname");
    }

    OnChangePhone = (val) => {
        this.changeUserValue(val, "phone");
    }

    changeUserValue = (val, key) => {
        const user = this.state.user;
        user[key] = val;
        this.setState({
            user: user
        })
    }

    OnHandleSubmit = () => {

        if (this.state.password !== ''
        && this.state.newPassword !== ''
        && this.state.confirmPassword !== ''
        ) {
            this.doUpdate();
        }

    }

    doUpdate = () => {
        if (this.state.confirmPassword !== this.state.newPassword) {
            Messages.setMessage('Oups: \n' + Localization.sentence("password_confirmation_error"));
            AppActions.displayMessage(true);
            return;
        }

        const data = {
            password: this.state.password,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword
        };

        const formValid = this.presenter.validateForm(data);
        if (formValid.error) {
            const msg = 'Oups: \n'  + formValid.msg
            Messages.setMessage(msg);
            AppActions.displayMessage(true)
            return;
        }
        
        let formData = new FormData();
        formData.append("password", this.state.confirmPassword);
        formData.append("old", this.state.password);

        AppActions.displayLoader(true)
        this.presenter.updateUserPassword(formData)
        .then(this.OnUpdatePasswordSuccess)
        .catch(this.OnUpdatePasswordError);
    }
    
    OnUpdatePasswordSuccess = (result) => {
        AppActions.displayLoader(false)
        if (result.status !== 1) {
            this.OnUpdatePasswordError(result);
        } else {
            AppStore.emit("displayToast", {
                message: Localization.sentence("success_on_update"), 
                type: 1
            });
            AppActions.getUserMe();
            this.isUserLoggedIn();
            this.props.navigation.goBack();
        }
    }

    isUserLoggedIn = () => {
        const myLocalStorage = new MyLocalStorage();
        myLocalStorage.getCredentials()
        .then( result => {
            if (result.status === 1) {
                const credentials = result["Credentials"];
                myLocalStorage.saveLoginCredentials({
                    email: credentials["email"], 
                    passwd: this.state.confirmPassword, 
                    remembered: credentials["remembered"]
                })
                .then(result => {
                    console.log('Success Local Storage Credentials');
                })
                .catch(error => {
                    console.log('Error: ', error);
                });
            }
        }).catch(_error => {
        });
    }

    OnUpdatePasswordError = (error) => {
        AppActions.displayLoader(false)
        if (typeof error.status !== "undefined") {
            if (error.status === 3) {
                Messages.setMessage(Localization.word("error") + ':\n' + Localization.sentence("actual_password_not_correct"));
                AppActions.displayMessage(true);
            }
        } else {
            AppStore.emit("displayToast", {
                message: Localization.word("error") + ': ' + Localization.sentence("error_on_update"), 
                type: 2
            });
        }
    }

    OnChangePasswordNew = (val) => {
        this.setState({newPassword: val})
    }

    OnChangePassword = (val) => {
        this.setState({password: val})
    }

    OnChangePasswordConfirm = (val) => {
        this.setState({confirmPassword: val})
    }
    
    render() {
        return (
        <View style={[styles.containerMe]}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.scrollContent}
            >
                <ScrollView 
                    style={styles.scrollContainer}
                    contentContainerStyle={[styles.contentContainer, {paddingBottom: this.state.keyboardHeight}]}
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode={"interactive"}
                    ref={ref => this.scrollRef = ref}
                >
                    <View style={styles.scrollContent}>

                    <View style={styles.spacing} />
                    <View style={styles.spacing} />
                    <View style={styles.spacing} />
                    <View style={styles.spacing} />

                        <View style={[styles.contenInput]}>

                            <View style={[styles.textInputContainer]}>
                                <Input
                                    label="Mot de passe actuel*"
                                    labelStyle={styles.inputLabel}
                                    inputStyle={styles.inputStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    value={this.state.password}
                                    onChangeText={this.OnChangePassword}
                                    returnKeyType={"done"}
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    onSubmitEditing={() => {
                                        if (this.state.password !== "") {
                                            this.newPassRef.focus();
                                        }
                                    }}
                                />
                            </View>
                        </View>

                        <View style={styles.spacing} />

                        <View style={[styles.contenInput]}>

                            <View style={[styles.textInputContainer]}>
                                <Input
                                    ref={ref => this.newPassRef = ref}
                                    label="Nouveau mot de passe*"
                                    labelStyle={styles.inputLabel}
                                    inputStyle={styles.inputStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    value={this.state.newPassword}
                                    onChangeText={this.OnChangePasswordNew}
                                    returnKeyType={"done"}
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    onSubmitEditing={() => {
                                        if (this.state.newPassword !== "") {
                                            this.newPassConfRef.focus();
                                        }
                                    }}
                                />
                            </View>
                        </View>

                        <View style={styles.spacing} />

                        <View style={[styles.contenInput]}>
                        <View style={[styles.textInputContainer]}>
                                <Input
                                    ref={ref => this.newPassConfRef = ref}
                                    label="Confirmer le mot de passe*"
                                    labelStyle={styles.inputLabel}
                                    inputStyle={styles.inputStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    value={this.state.confirmPassword}
                                    onChangeText={this.OnChangePasswordConfirm}
                                    returnKeyType={"done"}
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    onSubmitEditing={() => {
                                        if (this.state.confirmPassword !== "") {
                                            this.OnHandleSubmit();
                                        }
                                    }}
                                />
                            </View>
                            
                        </View>

                        <View style={styles.spacing} />
                        <View style={styles.spacing} />

                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonInput}>
                                <RoundedButton
                                    title={ "CONFIRMER LE MOT DE PASSE" }
                                    callback={ this.OnHandleSubmit }
                                />
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
        )
    }
}