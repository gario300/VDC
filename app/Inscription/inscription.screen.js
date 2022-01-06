import React from 'react';
import { 
    Text, 
    View, 
    Keyboard,
    Animated, 
    Easing,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';
import { CheckBox } from 'react-native-elements'

import styles from './../Styles/inscription.style';
import loginStyles from './../Styles/login.style';
import StylesVariables from './../Styles/app.style';

import MKeyboard from './../Keyboard/keyboard';
import Messages from './../Message/message';
import Localization from './../Localization/localization';

import InscriptionPresenter from './../Inscription/inscription.presenter';

import WarningModal from './../UIComponents/Modals/warning.modal';
import WarningRuleModal from './../UIComponents/Modals/warning_rule.modal';
import NormalButton from './../UIComponents/Button/button_login.component';
import InputText from '../UIComponents/Input/input_text_login.component';
import { ScrollView } from 'react-native-gesture-handler';

import PolicyLinks from './../Policy/policy_links';

import * as AppActions from "./../Flux/AppActions";

export default class InscriptionScreen extends React.Component {

    constructor(props) {

        super(props);

        const isSocial = props.route.params.isSocial;
        const data = {
            name: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            type: 1
        }
        if (isSocial) {
            const user = props.route.params.user;
            data["name"] = user.name;
            data["lastName"] = user.lastName;
            data["email"] = user.email;
            data["password"] = user.password;
            data["type"] = user.type;
        }

        this.keyboardHeight = new Animated.Value(5);
        this.presenter = new InscriptionPresenter();
        this.scrollRef =  null;
        this.inputFocused = 0;
        this.textsRefs = {};
        this.yOffset = 0;
        this.state = {
            loading: false,
            showAlert: false,
            isSocial: isSocial,
            name: data["name"],
            lastName: data["lastName"],
            email: data["email"],
            password: data["password"],
            type: data["type"],
            phoneNumber: '',
            cgu: false,
            politique: false,
            updated: false,
            warning: {
                "title": "",
                "message": ""
            },
            activeModalRule: false,
            activeModal: false,
            paddingBottom: 0,
            rule: (<View />)
        };
    }

    componentDidMount () {
        MKeyboard.addKeyboardListener(this);
    }
    
    componentWillUnmount() {
        MKeyboard.removeKeyboardListener(this);
    }
    
    keyboardWillShow = (event) => {
        Animated.parallel([
          Animated.timing(this.keyboardHeight, {
            duration: MKeyboard.eventDuration(event),
            easing: Easing.back(),
            toValue: event.endCoordinates.height,
            useNativeDriver: true
          })
        ]).start( () => {
            this.setState({
                "paddingBottom": event.endCoordinates.height + 10
            }, () => {
                //this.textsRefs[ref._inputRef._nativeTag]
                setTimeout( () => {
                    this.scrollRef.scrollTo({x: 0, y: (50 * StylesVariables.responsiveHeightMulti) + (this.inputFocused * 68 * StylesVariables.responsiveMulti)})
                }, 10)
            })
        });
    }
    
    keyboardWillHide = (event) => {
        Animated.parallel([
          Animated.timing(this.keyboardHeight, {
            duration: MKeyboard.eventDuration(event),
            toValue: 5,
            useNativeDriver: true
          })
        ]).start();
        this.setState({
            "paddingBottom": 0
        })
    };

    OnNameChanged = (val) => {
        this.setState({name: val});
    }

    OnLastNameChanged = (val) => {
        this.setState({lastName: val});
    }

    OnPhoneChanged = (val) => {
        this.setState({phoneNumber: val});
    }

    OnEmailChanged = (val) => {
        this.setState({email: val});
    }

    OnPasswordChanged = (val) => {
        this.setState({password: val});
    }

    OnCGUChecked = (val) => {
        this.setState({cgu: !this.state.cgu});
    }

    OnPolitiqueChecked = (val) => {
        this.setState({politique: !this.state.politique});
    }

    OnEndSubmitting = () => {
        if (this.state.email !== ''
        && this.state.lastName !== ''
        && this.state.phoneNumber !== ''
        && this.state.password !== ''
        && this.state.name !== ''
        && this.state.cgu
        ) {
            this.doInscription();
        }
    }

    doInscription = () => {
        Keyboard.dismiss();
        const data = {
            "email": this.state.email,
            "lastName": this.state.lastName,
            "phoneNumber": this.state.phoneNumber,
            "password": this.state.password,
            "name": this.state.name,
            "type": this.state.type,
            "isSocial": this.state.isSocial,
            "withNotifications": this.state.politique ? 1 : 0,
        };

        const formValid = this.presenter.validateForm(data);
        if (formValid.error) {
            const msg = 'Oups: \n'  + formValid.msg
            Messages.setMessage(msg);
            AppActions.displayMessage(true);
            return;
        }
        
        if (!this.state.cgu) {
            Messages.setMessage('Oups: \n' + Localization.sentence("please_fill"));
            AppActions.displayMessage(true);
            return;
        }

        AppActions.displayLoader(true);
        let method = "sendInscriptionToServer";
        if (this.state.isSocial) {
            method = "sendInscriptionSocialToServer";
        }
        this.presenter[method](data)
        .then(this.OnInscriptionSuccess)
        .catch(this.OnInscriptionError);
    }

    OnInscriptionSuccess = (result) => {
        AppActions.displayLoader(false);
        if (result.status === 1) {
            if (this.state.isSocial) {
                this.closeLoginAndBack();
            } else {
                this.setConfirmWarning();
            }
        } else {
            this.OnInscriptionError(result);
        }
    }

    OnInscriptionError = (error) => {
        if (typeof error.status !== "undefined") {
            if (error.status === 2) {
                AppActions.displayLoader(false);
                Messages.setMessage(Localization.word("error") + ':\n' + Localization.sentence("email_exists"));
                AppActions.displayMessage(true);
                return;
            }
        }

        AppActions.displayLoader(false);
        Messages.setMessage(Localization.word("error") + ': ' + Localization.sentence("inscription_not_valid"));
        AppActions.displayMessage(true)
    }

    OnInscription = () => {
        this.doInscription();
    }

    OnBackPress = () => {
        this.props.navigation.goBack();
    }

    setConfirmWarning = () => {
        
        const warning = {
            "title": "Merci pour votre inscription! Vérifie tes emails pour confirmer ton inscription",
            "message": "Merci de vérifier votre adresse e-mail pour accéder à l’application."
        }
        this.setState({
            activeModal: true,
            warning: warning
        })
       AppActions.displayLoader(false);
    }

    closeLoginAndBack = () => {
        this.props.navigation.navigate('Login', {
            doLogin: {
                email: this.state.email,
                password: this.state.password,
                rememberMe: true
            }
        });
    }

    OnCloseModal = () => {
        this.setState({
            "activeModal": false
        }, () => {
            this.props.navigation.popToTop();
        });
    }

    OnCGUOpen = () => {
        Linking.openURL(PolicyLinks.cgu)
        /*
        this.setState({
            "activeModalRule": true,
            "rule": (<CGVPolicy />)
        });
        */
    }

    OnPolitiqueOpen = () => {
        Linking.openURL(PolicyLinks.policy)
        /*
        this.setState({
            "activeModalRule": true,
            "rule": (<PolitiquesPolicy />)
        });
        */
    }

    OnCloseModalRule = () => {
        this.setState({
            "activeModalRule": false
        });
    }

    OnTextFocusOne = (e) => {
        //this.textsRefs[e]
        //console.log(e._nativeTag)
        this.inputFocused = 0;
    }

    OnTextFocusTwo = (e) => {
        this.inputFocused = 1;
    }

    OnTextFocusThree = (e) => {
        this.inputFocused = 2;
    }

    OnTextFocusFour = (e) => {
        this.inputFocused = 3;
    }

    OnRefFunction = (ref) => {
        if (ref !== null && typeof ref._inputRef !== "undefined") {
            this.textsRefs[ref._inputRef._nativeTag] = ref
        }
    }

    render() {
        return (
        <Animated.View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.header} /> 
                <ScrollView
                    style={[styles.scrollView]}
                    keyboardDismissMode={"interactive"}
                    keyboardShouldPersistTaps={"handled"}
                    contentContainerStyle={{paddingBottom: this.state.paddingBottom}}
                    ref={ref => this.scrollRef = ref}
                >
                    <View style={styles.scrollViewContent}>

                    <View style={loginStyles.headRow}>
                        <View style={loginStyles.leftContent}>
                            <View style={loginStyles.iconImgContainer}>
                                <Image
                                    style={styles.iconImg}
                                    resizeMode={'contain'} 
                                    source={require('../../assets/logo/logo.png')}
                                />
                            </View>
                        </View>
                        <View style={loginStyles.rightContent}></View>
                    </View> 

                        <View style={loginStyles.loginHeader}>
                            <View style={loginStyles.loginHeaderContent}>
                                <View
                                    style={loginStyles.loginHeaderButton}
                                >
                                    <Text style={loginStyles.loginHeaderText}>{Localization.word("inscription")}</Text>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={this.OnBackPress}
                                    style={loginStyles.loginHeaderButton}
                                >
                                    <Text style={loginStyles.loginHeaderTextRight}>{Localization.word("leave_inscription")}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.bodyContainer}>
                            <View style={loginStyles.inputButton}>
                                <InputText 
                                    value={this.state.name}
                                    secure={false}
                                    maxLength={40}
                                    placeholder={Localization.word('prenom')}
                                    editable={true}
                                    keyboardType='default'
                                    callback={this.OnNameChanged}
                                    submiting={this.OnEndSubmitting}
                                    OnFocus={this.OnTextFocusTwo}
                                    Ref={this.OnRefFunction}
                                />
                            </View>
                            <View style={loginStyles.inputButton}>
                                <InputText 
                                    value={this.state.lastName}
                                    secure={false}
                                    maxLength={40}
                                    placeholder={Localization.word('nom')}
                                    editable={true}
                                    keyboardType='default'
                                    callback={this.OnLastNameChanged}
                                    submiting={this.OnEndSubmitting}
                                    OnFocus={this.OnTextFocusOne}
                                    Ref={this.OnRefFunction}
                                />
                            </View>
                            <View style={loginStyles.inputButton}>
                                <InputText 
                                    value={this.state.email}
                                    secure={false}
                                    maxLength={40}
                                    placeholder={Localization.word('identifiant')}
                                    editable={!this.state.isSocial}
                                    keyboardType='email-address'
                                    callback={this.OnEmailChanged}
                                    submiting={this.OnEndSubmitting}
                                    OnFocus={this.OnTextFocusThree}
                                    Ref={this.OnRefFunction}
                                />
                            </View>
                            <View style={loginStyles.inputButton}>
                                <InputText 
                                    value={this.state.password}
                                    secure={true}
                                    maxLength={18}
                                    placeholder={Localization.word('mot_de_passe')}
                                    editable={!this.state.isSocial}
                                    keyboardType='default'
                                    callback={this.OnPasswordChanged}
                                    submiting={this.OnEndSubmitting}
                                    OnFocus={this.OnTextFocusFour}
                                    Ref={this.OnRefFunction}
                                />
                            </View>
                            <View style={styles.empty} />
                            <View style={[styles.inputButtonCheck]}>
                                <CheckBox
                                    iconRight={false}
                                    containerStyle={loginStyles.checkStyle}
                                    textStyle={loginStyles.textCheckStyle}
                                    uncheckedColor={StylesVariables.lightGrayColor}
                                    checkedColor={StylesVariables.grayDarkColor}
                                    checked={this.state.politique}
                                    onIconPress={this.OnPolitiqueChecked}
                                    onPress={this.OnPolitiqueChecked}
                                />
                                <View style={styles.textLinkContainer}>
                                    <Text style={styles.textLinkText} numberOfLines={5}>{Localization.word("accept_notifications")}</Text>
                                </View>
                            </View>
                            
                            <View style={styles.inputButtonCheck}>
                                <CheckBox
                                    left
                                    iconRight={false}
                                    containerStyle={loginStyles.checkStyle}
                                    textStyle={loginStyles.textCheckStyle}
                                    uncheckedColor={StylesVariables.lightGrayColor}
                                    checkedColor={StylesVariables.grayDarkColor}
                                    checked={this.state.cgu}
                                    onIconPress={this.OnCGUChecked}
                                    onPress={this.OnCGUChecked}
                                />
                                <View style={styles.textLinkContainer}>
                                    <Text style={styles.textLinkText} onPress={this.OnCGUOpen}>{Localization.word("politique")}</Text>
                                </View>
                            </View>
                            <View style={styles.empty} />
                            <View style={[styles.submitButton]}>
                                <NormalButton
                                    themeName={'secundary'}
                                    title={ Localization.word('inscrire') }
                                    callback={this.OnInscription}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <WarningModal
                    activeModal={this.state.activeModal}
                    OnCloseModal={this.OnCloseModal}
                    title={this.state.warning.title}
                    message={this.state.warning.message}
                />
                <WarningRuleModal 
                    activeModal={this.state.activeModalRule}
                    OnCloseModal={this.OnCloseModalRule}
                    Rule={this.state.rule}
                />
            </View>
        </Animated.View>
        )
    }
}
