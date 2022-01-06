import React from 'react';
import { Text, View, Linking, ScrollView, TouchableOpacity, Image } from 'react-native';
import AppStore from './../Flux/AppStore';
import * as AppActions from "./../Flux/AppActions";
import Menu from './AccountMenu'
import innerStyles from '../Styles/inner.style';
import styles from './account.style';
import myAppState from '../AppState/app_state';
import authState from './../Auth/auth.state';
import ItemDocument from '../UIComponents/DownloadDocumentItem/DownloadItem.screen'
import Localization from './../Localization/localization';
import UserPresenter from './../User/user.presenter';
import WarningRuleModal from './../UIComponents/Modals/warning_rule.modal';
import PolicyLinks from './../Policy/policy_links';
import ProfileRow from './Components/profile.row.component';
import NormalButton from '../UIComponents/Button/normal_button.component';
import { MaterialIcons } from '@expo/vector-icons';

export default class AccountScreen extends React.Component {

    constructor(props) {

        super(props);

        this.presenter = new UserPresenter();

        this.state = {
            isLogin: true,
            //user: myAppState.userMe,
            user: {
                "name": "",
                "lastName": "",
                "email": "",
                "phone": ""
            },
            updated: false,
            isNotifications: true,
            activeModal: false,
        };
    }
    
    componentDidMount() {
        const { navigation } = this.props;
        /*
        this.focusListener = navigation.addListener("focus", () => {
            //AppActions.getUserMe();
        });
        */
        if (authState.isAuthAnonym) {
            AppActions.doLogout();
            return;
        }
        AppActions.getUserMe()

        Localization.getActiveLang()
        .then(_res => {console.log("Get Lang")})
        .catch(_err => {})

        AppStore.on("onSetUser", this.OnUserGot);

    }

    OnUserGot = () => {
        const user = myAppState.userMe;
        this.setState({
            user: user,
            isNotifications: user.notification,
        })
    }

    componentWillUnmount() {
        AppStore.removeListener("onGetUser", this.OnUserGot);
    }

    OnLogout = () => {
        AppActions.doLogout();
    }

    lastVal = false;
    OnToggleSwitch = (val) => {
        this.lastVal = val;

        this.presenter = new UserPresenter();
        this.setState({
            "isNotifications": val
        });

        //AppActions.displayLoader(true);
        this.presenter.updateUserNotifications(val)
            .then(this.OnUpdateUserNotifications)
            .catch(this.OnUpdateUserNotificationsError);
    }

    OnUpdateUserNotifications = (result) => {
        if (result.status === 1) {
            const user = myAppState.userMe;
            user.notification = this.lastVal;
            AppActions.setUserMe(user);
            AppStore.emit("displayToast", { message: Localization.sentence("success_on_update"), type: 1 });
        } else {
            this.OnUpdateUserSettingsError({});
        }
    }

    OnUpdateUserNotificationsError = (error) => {
        AppStore.emit("displayToast", {
            message: Localization.word("error") + ': ' + Localization.sentence("error_on_update"),
            type: 2
        });
        this.setState({
            "isNotifications": !this.lastVal
        });
        console.log("Error On updating the user settings")
    }
    itemAction = (type) => {
        switch(type){
            case 'gcv' :
                this.OnTouchPressCGV()
            break;
            case 'contact' : 
                this.OnTouchPressContact()
            break;
            case 'politique' :
                this.OnTouchPressPolitique
            break;
            case 'profile':
                this.props.navigation.navigate('AccountDetails')
            break;
            case 'commands':
                this.props.navigation.navigate('CommandesAchats')
            break;
            case 'mon':
                this.props.navigation.navigate('MonProduits')
        }
    }
    getMenu = () => {
        const mymenu =  Menu ({
            name: this.state.user.name+' '+this.state.user.lastName
        })
        return mymenu.map( ( item, index ) => {
            if(item.name[0].title == 'notifications'){
                return(
                    <View style={{paddingHorizontal: 20}}>
                         <ProfileRow
                            title={Localization.word('notifications')}
                            color="white"
                            iconName="notification"
                            check={true}
                            isActive={this.state.isNotifications}
                            onToggle={this.OnToggleSwitch}
                            onPress={() => { }} 
                        />
                    </View> 
                )
            }
            return(

                <ItemDocument
                    Icon={item.icon}
                    rightIcon={()=>{
                        return(
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                        )
                    }}
                    textArray={item.name}
                    document={item.route}
                    action={this.itemAction}
                />
            )
        })
    }

    setWarning = (rule, title) => {
        this.setState({
            "activeModal": true,
            "rule": rule,
            "title": title
        })
    }

    OnTouchPressAbonne = (event) => {
        this.setSubscriptionWarning();
    }

    GoToAccountDetails = (event) => {
        const { navigate } = this.props.navigation;
        navigate('AccoutMePreview');
    }

    GoToMyFile = (event) => {
        const { navigate } = this.props.navigation;
        navigate('MyFile');
    }

    OnTouchPressContact = (event) => {
        //this.setWarning(<CGVPolicy />, "CGU");
        Linking.openURL(PolicyLinks.contact)
    }

    OnTouchPressCGV = (event) => {
        //this.setWarning(<CGVPolicy />, "CGU");
        Linking.openURL(PolicyLinks.cgu)
    }

    OnTouchPressPolitique = (event) => {
        //this.setWarning(<PolitiquesPolicy />, "Politique de confidentialité");
        Linking.openURL(PolicyLinks.policy)
    }

    OnCloseModal = () => {
        this.setState({
            "activeModal": false
        });
    }

    OnContacterPressed = () => {
        /*
        const { navigate } = this.props.navigation;
        navigate('AccountContact');
        */
    }

    OnMyOrdersPressed = () => {
        const { navigate } = this.props.navigation;
        navigate('Orders');
    }

    OnMyInvoicesPressed = () => {
        const { navigate } = this.props.navigation;
        navigate('Invoices');
    }
    


    render() {
        return (
                <View style={styles.container}> 
                    <ScrollView style={{ flex: 1 }}>
                        {this.getMenu()}
                    {
                        /*
                        <View style={styles.separator} />
                        <ProfileRow
                            title={Localization.word('contact_us')}
                            color="secondary"
                            iconName="contact"
                            onPress={this.OnTouchPressContact} />
                        <View style={styles.separator} />
                        <ProfileRow
                            title="Politique de confidentialité"
                            color="third"
                            iconName="none"
                            onPress={this.OnTouchPressPolitique} />
                        <ProfileRow
                            title="Conditions générales d'utilisation"
                            color="third"
                            iconName="none"
                            onPress={this.OnTouchPressCGV} />
                        */
                        }
                        <View style={styles.btnLogout}>
                            <NormalButton
                                callback={this.OnLogout}
                                themeName="secundary"
                                title={Localization.word('log_out')} />
                        </View>
                    </ScrollView>
                <WarningRuleModal
                    activeModal={this.state.activeModal}
                    OnCloseModal={this.OnCloseModal}
                    Rule={this.state.rule}
                /> 
            </View>
        )
    }
}
