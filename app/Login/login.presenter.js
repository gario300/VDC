import FormValidations from './../FormValidations/form_validations';
import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import ApiServicesHelper from './../Utils/ApiServicesHelper/api_services_helper';
import MyLocalStorage from './../Utils/LocalStorage/my_local_storage';
import NotificationsServer from './../PushNotifications/notifications_server';
import NotificationsPresenter from '../PushNotifications/notifications_presenter';
import DateTime from '../DateTime/date_time';
import NetInfo from '@react-native-community/netinfo';

import authState from './../Auth/auth.state';
import filterState from './../Filters/filter.state';

import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';

import myAppState from '../AppState/app_state';
import localization from '../Localization/localization';

export default class LoginPresenter {

    myLocalStorage = null;
    
    constructor() { 
        this.myLocalStorage = new MyLocalStorage();
    }

    initAsync = async () => {
        this.user = {};
        await GoogleSignIn.initAsync();
        //this._syncUserWithStateAsync();
      };
    
    _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        this.user = user;
        return user;
    };

    isUserLoggedIn = () => {
        return this.myLocalStorage.getCredentials()
        .then( result => {
            if (result.status === 1) {
                if (result["Credentials"]["remembered"]) {
                    return this.verifyToken();
                } else {
                    this.removeDeviceToken();
                    this.userIsNotLoggedIn(null);
                    return {
                        status: 0
                    }
                }
            } else {
                this.userIsNotLoggedIn(null);
                return {
                    status: 0
                }
            }
        }).catch((err) => {
            this.userIsNotLoggedIn(null);
            return {
                status: 2,
                error: null
            }
        });
    }

    userIsNotLoggedIn = (_error) => {
        this.resetBadges();
        this.removeUserData();
    }

    removeUserData = () => {
        this.myLocalStorage.removeCredentialsPromise();
        return this.myLocalStorage.removeTokenDataPromise();
    }

    validateForm(password, email) {
        const isEmailValid = this.validateEmail(email, 'Email');
        if (isEmailValid.error) {
            return isEmailValid;
        }

        const isPasswdValid = this.validatePassword(password, 'Password');
        if (isPasswdValid.error) {
            return isPasswdValid;
        }

        return isPasswdValid;
    }

    validateEmail(value, fieldName) {
        const isEmailFill = FormValidations.validateEmailField(value);
        if (!isEmailFill.valid) return FormValidations.backResponse(true, fieldName + ' ' + isEmailFill.msg);

        return FormValidations.backResponse(false, '');
    }

    validatePassword(value, fieldName) {
        const minValid = FormValidations.validateMinLengthField(value, 6);
        if (!minValid.valid) return FormValidations.backResponse(true, fieldName + ' ' + minValid.msg);

        return FormValidations.backResponse(false, '');
    }
    
    sendAuthFormToDoLogin(email, password, withRememberMe, os) {

        const apiConnection = new WebApiConnectionPresenter();

        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('os', os);

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.auth.login,
            false,
            formData,
            false
        ).then(resultService => {
            if (resultService.status === 1) {
                this.myLocalStorage.saveLoginData(resultService.token, resultService.result)
                .then(result => {
                    console.log('Success Local Storage Token');
                })
                .catch(error => {
                    console.log('Error: ', error);
                });
                
                if (withRememberMe) {
                    this.myLocalStorage.saveLoginCredentials({
                        email: email, 
                        passwd: password, 
                        remembered: withRememberMe, 
                        version: 1
                    })
                    .then(result => {
                        console.log('Success Local Storage Credentials');
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    });
                } else {
                    this.myLocalStorage.saveLoginCredentials({
                        email: "", 
                        passwd: "", 
                        remembered: withRememberMe, 
                        version: 1
                    })
                    .then(result => {
                        console.log('Success Local Storage Credentials');
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    });
                }

                authState.newAuthState(resultService.token, false);
                this.updateUserSettings(resultService.token);
                
                return({status: resultService.status, msg: resultService.message, token: resultService.token });
            } else if (resultService.status === 2) {
                resultService.message = "Identification erronée veuillez vérifier votre adresse mail et votre mot de passe !";
                return Promise.reject(resultService);
            } else if (resultService.status === 3) {
                return Promise.reject(resultService);
            } else {
                return({status: resultService.status, token: resultService.token });
            }
        })
    }

    async verifyToken() {
        const myLocalStorage = new MyLocalStorage();
        const tokenResult = await myLocalStorage.getToken()
        if (typeof tokenResult.token === "undefined") {
            return ({status: 0, msg: "No Token Found", token: null, error: "Error" });
        }
        const token = tokenResult.token.token;
        const resInfo = await NetInfo.fetch()
        if (resInfo.isConnected) {
            return this.verifyTokenLogin(token)
            .then( res => {
                if (res.status === "OK") {
                    authState.newAuthState(token, false);
                    return({status: 1, msg: res.message, token: token, alreadySet: res.alreadySet });
                } else {
                    return({status: 0, msg: res.message, token: null });
                }
            })
            .catch(erro => {
                return({status: 0, msg: res.message, token: null });
            })
        } else {
            return this.verifyTokenWithoutConnection(token);
        }
    }

    verifyTokenLogin(token) {
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.auth.statusToken,
            token,
            null,
            false
        );
    }

    async verifyTokenWithoutConnectionMethod() {
        const resInfo = await NetInfo.fetch()
        if (resInfo.isConnected) {
            return {
                status: 0
            }
        }

        const myLocalStorage = new MyLocalStorage();
        return myLocalStorage.getToken()
        .then(tokenResult => {
            console.log("tokenResult: ", tokenResult)
            if (typeof tokenResult.token === "undefined") {
                return ({status: 0, msg: "No Token Found", token: null, error: "Error" });
            }
            const token = tokenResult.token.token;
            return this.verifyTokenWithoutConnection(token);
        })
        .catch(error => {
            return {
                status: 0
            }
        })
    }

    verifyTokenWithoutConnection(token) {
        const dateTime = new DateTime();
        const jwtDecode = require('jwt-decode');
        const decoded = jwtDecode(token);
        const currentTime = dateTime.getNowUnix();
        if(currentTime < decoded.exp) {
            authState.newAuthState(token, false);
            return Promise.resolve({status: 1, msg: "Token Still Valid", token: token, alreadySet: true})
        } else {
            return Promise.reject({status: 0, msg: "Token Expired"})
        }
    }
    
    sendAuthFormToDoLoginAnonym(email, password, withRememberMe) {

        const apiConnection = new WebApiConnectionPresenter();

        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.auth.loginAnonym,
            false,
            formData,
            false
        )
        .then(resultService => {
            if (resultService.status === 6) {

                this.myLocalStorage.saveLoginDataAnonym(resultService.token)
                .then(result => {
                    console.log('Success Local Storage Token');
                })
                .catch(error => {
                    console.log('Error: ', error);
                });
                
                this.myLocalStorage.saveLoginCredentials({email: "", passwd: "", remembered: false, version: 1})
                .then(result => {
                    console.log('Success Local Storage Credentials');
                })
                .catch(error => {
                    console.log('Error: ', error);
                });

                authState.newAuthState(resultService.token, true);
                
                return({status: 1, msg: resultService.message, token: resultService.token });

            } else if (resultService.status === 2) {
                resultService.message = "Identification erronée veuillez vérifier votre adresse mail et votre mot de passe !";
                return Promise.reject(resultService);
            } else if (resultService.status === 3) {
                resultService.message = "Merci de vérifier votre adresse e-mail pour accéder à l’application !";
                return Promise.reject(resultService);
            } else {
                return({status: resultService.status, token: resultService.token });
            }
        })
    }

    async getFacebookTokenForLogin() {
        try {
            const result = await Facebook.logInWithReadPermissionsAsync({
              permissions: ['public_profile', 'email'],
            });

            if (result.type === 'success') {
                // Get the user's name using Facebook's Graph API
                return {accessToken: result.token};
            } else {
                return false;
            }
          } catch ({ message }) {
                return false;
          }
    }

    async getGoogleTokenForLogin() {
        try {
            const isValid = await GoogleSignIn.askForPlayServicesAsync();
            if (isValid) 
            {
                const { type, user } = await GoogleSignIn.signInAsync();
                if (type === 'success') {
                    const user = await this._syncUserWithStateAsync();
                    return {
                        user: user, 
                        auth: user
                    };
                }
            }
            return false;
        } catch ({ message }) {
            alert('login: Error:' + message);
            return false;
        }
    }

    sendAppleAuthFormToDoLogin(identityToken, name, lastName, os) {

        const apiConnection = new WebApiConnectionPresenter();

        let formData = new FormData();
        formData.append('identityToken', identityToken);
        formData.append('name', name);
        formData.append('lastName', lastName);
        formData.append('os', os);

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.auth.appleLogin,
            false,
            formData,
            false
        ).then(resultService => {
            this.myLocalStorage.saveLoginData(resultService.token, resultService.result)
            .then(result => {
                console.log('Success Local Storage Token');
            })
            .catch(error => {
                console.log('Error: ', error);
            });
            
            this.myLocalStorage.saveLoginCredentials({
                email: "", 
                passwd: "", 
                remembered: true, 
                version: 1 
            })
            .then(result => {
                console.log('Success Local Storage Credentials');
            })
            .catch(error => {
                console.log('Error: ', error);
            });

            authState.newAuthState(resultService.token, false);
            this.updateUserSettings(resultService.token);
            
            return({status: resultService.status, msg: resultService.message, token: resultService.token });
        })
    }

    sendAuthFormToDoGoogleLogin(data, os) {

        const apiConnection = new WebApiConnectionPresenter();

        let formData = new FormData();
        formData.append('accessToken', data.accessToken);
        formData.append('idToken', data.idToken);
        formData.append('platform', data.platform);
        formData.append('os', os);

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.auth.googleLogin,
            false,
            formData,
            false
        ).then(resultService => {
            this.myLocalStorage.saveLoginData(resultService.token, resultService.result)
            .then(result => {
                console.log('Success Local Storage Token');
            })
            .catch(error => {
                console.log('Error: ', error);
            });
            
            this.myLocalStorage.saveLoginCredentials({
                email: "", 
                passwd: "", 
                remembered: true, 
                version: 1 
            })
            .then(result => {
                console.log('Success Local Storage Credentials');
            })
            .catch(error => {
                console.log('Error: ', error);
            });

            authState.newAuthState(resultService.token, false);
            this.updateUserSettings(resultService.token);
            
            return({status: resultService.status, msg: resultService.message, token: resultService.token });
        })
    }

    sendAuthFormToDoFacebookLogin(data, os) {

        const apiConnection = new WebApiConnectionPresenter();

        let formData = new FormData();
        formData.append('accessToken', data.accessToken);
        formData.append('os', os);

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.auth.facebookLogin,
            false,
            formData,
            false
        ).then(resultService => {
            this.myLocalStorage.saveLoginData(resultService.token, resultService.result)
            .then(result => {
                console.log('Success Local Storage Token');
            })
            .catch(error => {
                console.log('Error: ', error);
            });
            
            this.myLocalStorage.saveLoginCredentials({
                email: "", 
                passwd: "", 
                remembered: true, 
                version: 1 
            })
            .then(result => {
                console.log('Success Local Storage Credentials');
            })
            .catch(error => {
                console.log('Error: ', error);
            });

            authState.newAuthState(resultService.token, false);
            this.updateUserSettings(resultService.token);
            
            return({status: resultService.status, msg: resultService.message, token: resultService.token });
        })
    }

    async logOutAnonym () {
        this.myLocalStorage.removeCredentialsPromise();
        authState.newAuthState("", authState.isAuthAnonym);
        favouritesState.init();
        myAppState.init();
        return this.myLocalStorage.removeTokenDataPromise();
    }

    async logOut () {
        console.log("Log out")
        this.logoutService();
        this.removeDeviceToken();
        this.resetBadges();
        this.myLocalStorage.removeCredentialsPromise()
        .then(val => {
            console.log("Remove Credentials Success")
        })
        .catch(err => {
            console.log("Remove Credentials Error")
        })
        authState.resetTokenState();
        //favouritesState.init();
        filterState.init();
        myAppState.init();
        this.myLocalStorage.removeTokenDataPromise()
        .then(val => {
            console.log("Remove Token Data Success")
        })
        .catch(err => {
            console.log("Remove Token Data Error")
        })
    }

    async logOutOnTokenError () {

        authState.resetTokenState();
        //favouritesState.init();
        filterState.init();
        myAppState.init();
        
        this.myLocalStorage.removeCredentialsPromise()
        .then(val => {
            console.log("Remove Credentials Success")
        })
        .catch(err => {
            console.log("Remove Credentials Error")
        })

        this.myLocalStorage.removeTokenDataPromise()
        .then(val => {
            console.log("Remove Token Data Success")
        })
        .catch(err => {
            console.log("Remove Token Data Error")
        })
    }

    logoutService = () => {
        return this.logoutServiceFromServer(ApiServicesHelper.tokenFromSession);
    }

    logoutServiceFromServer = (token) => {
        const apiConnection = new WebApiConnectionPresenter();
        apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.auth.logout,
            token,
            {},
            false
        )
        .then(result => {
            if (result.status === 1) {
                console.log("Logout Success From Server");
            } else {
                console.log("Logout Error");
            }
        })
        .catch(_error => {
            console.log("Logout Error");
        })
    }

    removeDeviceToken = () => {
        let notificationServer = new NotificationsServer();
        notificationServer.removeDeviceToken()
        .then(result => {
            if (result.status == 1) {
                console.log("Device Token removed from server");
            } else {
                console.log("Device Token do not exist");
            }
        }).catch(error => {
            console.log("Error On Removing Device Token from server");
        });
    }

    removeDeviceTokenAskFirst = async () => {
        try {
            const _result = await this.myLocalStorage.getToken();
            console.log("Token Data Saved Found");
            this.removeDeviceToken();
            return true;
        }
        catch (_error) {
            console.log("Token Data Saved NOT Found");
            return false;
        }
    }

    resetBadges = () => {
        const notifPresenter = new NotificationsPresenter();
        notifPresenter.resetBadgesCount();
    }

    uniqueID = () => {
        function chr4(){
          return Math.random().toString(16).slice(-4);
        }
        return chr4() + chr4() + '!' + chr4();
    }

    registerDeviceToken = (token) => {
        let notificationsPresenter = new NotificationsPresenter();
        notificationsPresenter.getDeviceToken()
        .then((data) => {
            this.OnGetTokenSuccess(data, token);
        })
        .catch(this.OnGetTokenError);
    }

    OnGetTokenSuccess = (data, token) => {
        let deviceToken = data.token;
        if (data.status !== 1) {
            console.log('User notifications permission not granted');
        } else {
            const notificationsServer = new NotificationsServer();
            notificationsServer.postDeviceTokenOnServer(token, deviceToken)
        }
    }

    OnGetTokenError = (error) => {
        console.log("Get Token Error", error);
    }

    updateUserSettings = async (token) => {
        
        const langRes = await MyLocalStorage.GetItem("app-lang");
        if (langRes.status === 1) {
                this.updateServerUserSettings(token, langRes.data.lang)
                .then(res => {
                    console.log("User Settings Success")
                })
                .catch(err => {
                    console.log("User Settings Error")
                })
        } else {
                this.setActiveLang(res.data.index);
        }
    }

    updateServerUserSettings = (token, lang) => {
        let formData = new FormData();
        formData.append( 'lang', lang );

        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.users.updateUserSettings,
            token,
            formData,
            false
        );
    }
};
