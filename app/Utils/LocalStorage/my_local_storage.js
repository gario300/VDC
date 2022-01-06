import { AsyncStorage } from 'react-native';

export default class MyLocalStorage {
    constructor() {}
        
    async verifyFirstQuestion () {
      const verify =  await AsyncStorage.getItem('firstQuestion') 
      if ( verify == null ){
        return false
      }else{
        return verify
      }
    } 

    async saveFirstQuestion (response) { 
      await AsyncStorage.setItem('firstQuestion', response)
    }

    async verifyFirstLogin () {
      const verify =  await AsyncStorage.getItem('firstLogin') 
      if ( verify == null ){
        return false
      }else{
        return true
      }
    }   
    
    async saveFirstLogin () {
        await AsyncStorage.setItem('firstLogin', 'yes')
    }

    saveLoginData(token, data) {

        objToSave = this.getObjToSave(data, token);
        return new Promise((resolve, reject) => {
            try {
                return AsyncStorage.setItem('@VDCSuperStore:token', JSON.stringify(objToSave), () => {
                    resolve({status: 1, error: null})   
                });
            } catch (error) {
                reject({status: -1, error: error})   
            }
        })
    }

    saveLoginDataAnonym(token) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 5);  
        let objToSave = {
            'email': "",
            'name': "",
            'lastName': "",
            'notification': false,
            'token': token,
            'expdate': expireDate
        };

        return new Promise((resolve, reject) => {
            try {
                return AsyncStorage.setItem('@VDCSuperStore:token', JSON.stringify(objToSave), () => {
                    resolve({status: 1, error: null})   
                });
            } catch (error) {
                reject({status: -1, error: error})   
            }
        })
    }

    saveLoginCredentials(data) {

        return new Promise((resolve, reject) => {
            try {
                return AsyncStorage.setItem('@VDCSuperStore:Credentials', JSON.stringify(data), () => {
                    resolve({status: 1, error: null})
                });
            } catch (error) {
                reject({status: -1, error: error})
            }
        })
    }

    updateDataToken(objToSave) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 5);  
        objToSave['expdate'] = expireDate;

        return new Promise((resolve, reject) => {
            try {
                return AsyncStorage.setItem('@VDCSuperStore:token', JSON.stringify(objToSave), () => {
                    resolve({status: 1, error: null})   
                });
            } catch (error) {
                reject({status: -1, error: error})   
            }
        })
    }

    getObjToSave = (data, token) => {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 5);  
        let objToSave = {
            'email': data.email,
            'name': data.name,
            'lastName': data.lastName,
            'notification': data.notification,
            'version': data.version,
            'phone': data.phone,
            'permissions': data.permissions,
            'token': token,
            'expdate': expireDate
        };

        return objToSave;
    }

    getToken() {
        return new Promise((resolve, reject) => {
            try {
                 AsyncStorage.getItem('@VDCSuperStore:token').then(token => {
                    if (token !== null) {
                        resolve({status: 1, token: JSON.parse(token)});
                    } else {
                        reject({status: 2, error: null})   
                    }
                })
                .catch(error => {
                    reject({status: 0, error: error})   
                })
            } catch (error) {
                reject({status: -1, error: error})   
            }
        })
    }

    getCredentials() {
        return new Promise((resolve, reject) => {
            try {
                AsyncStorage.getItem('@VDCSuperStore:Credentials').then(Credentials => {
                    if (Credentials !== null) {
                        resolve({status: 1, Credentials: JSON.parse(Credentials)});
                    } else {
                        reject({status: 2, error: null})
                    }
                })
                .catch(error => {
                    reject({status: 0, error: error})
                })
            } catch (error) {
                reject({status: -1, error: error})
            }
        })
    }

    getItemSaved(item) {
        return new Promise((resolve, reject) => {
            try {
                AsyncStorage.getItem('@VDCSuperStore:' + item).then(data => {
                    if (data !== null) {
                        resolve({status: 1, data: JSON.parse(data)});
                    } else {
                        reject({status: 2, error: null})   
                    }
                })
                .catch(error => {
                    reject({status: 0, error: error})   
                })
            } catch (error) {
                reject({status: -1, error: error});
            }
        });
    }

    removeTokenData() {
        new Promise((resolve, reject) => {
            try {
                AsyncStorage.removeItem('@VDCSuperStore:token').then(token => {
                    resolve({status: 1, error: null});
                })
                .catch(error => {
                    reject({status: 0, error: error})   
                })
              } catch (error) {
                reject({status: -1, error: error})   
              }
        });
    }

    removeTokenDataPromise() {
        return new Promise((resolve, reject) => {
            try {
                AsyncStorage.removeItem('@VDCSuperStore:token').then(token => {
                    resolve({status: 1, error: null});
                })
                .catch(error => {
                    reject({status: 0, error: error})   
                })
              } catch (error) {
                reject({status: -1, error: error})   
              }
        });
    }

    removeCredentialsPromise() {
        return new Promise((resolve, reject) => {
            try {
                AsyncStorage.removeItem('@VDCSuperStore:Credentials')
                .then(token => {
                    resolve({status: 1, error: null});
                })
                .catch(error => {
                    reject({status: 0, error: error})   
                })
              } catch (error) {
                reject({status: -1, error: error})   
              }
        });
    }

    static SaveItem(data, item) {
        return new Promise((resolve, reject) => {
            try {
                return AsyncStorage.setItem('@VDCSuperStore:' + item, JSON.stringify(data), () => {
                    resolve({status: 1, error: null})   
                });
            } catch (error) {
                reject({status: -1, error: error})   
            }
        })
    }

    static GetItem(item) {
        return new Promise((resolve, reject) => {
            try {
                AsyncStorage.getItem('@VDCSuperStore:' + item)
                .then(data => {
                    if (data !== null) {
                        resolve({status: 1, data: JSON.parse(data)});
                    } else {
                        reject({status: 2, error: null})   
                    }
                })
                .catch(error => {
                    reject({status: 0, error: error})   
                })
            } catch (error) {
                reject({status: -1, error: error});
            }
        });
    }

    static RemoveItem(item) {
        return new Promise((resolve, reject) => {
            try {
                AsyncStorage.removeItem('@VDCSuperStore:' + item).then(data => {
                    resolve({status: 1, error: null});
                })
                .catch(error => {
                    reject({status: 0, error: error})   
                })
              } catch (error) {
                reject({status: -1, error: error})   
              }
        });
    }

    static RemoveAllData() {
        return new Promise((resolve, reject) => {
            try {
                AsyncStorage.getAllKeys((errors, keys) => {
                    if (errors !== null && errors.length > 0) {
                        reject({status: 2, result: 'Error'});
                    }

                    AsyncStorage.multiRemove(['token', 'badges', 'flash-news'], (errors) => {
                        if (errors !== null && errors.length > 0) {
                            reject({status: 2, result: 'Error'});
                        }
                        resolve({status: 1, result: 'Ok'});
                    })
                });
            } catch (error) {
                reject({status: 0, result: error});
            }
        });
    }

    static SaveFlashNotes(data, item) {
        return new Promise((resolve, reject) => {
            // resolve({status: 1, error: null});
            try {
                return AsyncStorage.setItem('@VDCSuperStore:' + item, JSON.stringify(data), () => {
                    resolve({status: 1, error: null})   
                });
            } catch (error) {
                reject({status: -1, error: error})   
            }
        })
    }

    static SaveFlashNotesNotSeen(data, item) {
        return new Promise((resolve, reject) => {
            // resolve({status: 1, error: null});
            try {
                return AsyncStorage.setItem('@VDCSuperStore:' + item, JSON.stringify(data), () => {
                    resolve({status: 1, error: null})   
                });
            } catch (error) {
                reject({status: -1, error: error})   
            }
        })
    }

    static GetFlashNotesSaved(item) {
        return new Promise((resolve, reject) => {
            try {
                AsyncStorage.getItem('@VDCSuperStore:' + item).then(data => {
                    if (data !== null) {
                        resolve({status: 1, list: JSON.parse(data)});
                    } else {
                        reject({status: 2, error: null})   
                    }
                })
                .catch(error => {
                    reject({status: 0, error: error})   
                })
            } catch (error) {
                reject({status: -1, error: error});
            }
        })
    }
}
