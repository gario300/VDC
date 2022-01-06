import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';

import fr from './../Translation/fr';
import en from './../Translation/en';
//import es from './../Translation/es';

import MyLocalStorage from './../Utils/LocalStorage/my_local_storage';
import myAppState from '../AppState/app_state';

class Localization {
    
    dictionary = {};
    months = {
        "fr": ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        "en": ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December'],
        "es": ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        "de": ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        "por": ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    };

    days = {
        "fr": ["Dimanche", "Lundi", "Mardi", "Le mercredi", "Jeudi", "Vendredi", "Samedi"],
        "en": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "es": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        "de": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        "por": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    };

    constructor() { 
        this.availableLangs = ["fr", "en"];
        this.availableLangsContent = [{
            key: 'fr',
            value: 'fr',
            label: 'française',
        },
        {
            key: 'en',
            value: 'en',
            label: 'english',
        },
        {
            key: 'es',
            value: 'es',
            label: 'español',
        }];
        this.activeAvailableLangsContent = [];
        this.titles = ["Française", "English", "Español"];
        this.langs = {"fr": fr, "en": en};
        this.activeLang = this.availableLangs[0];
        this.dictionary = this.langs[this.activeLang];
        this.isReady = true;
        
        //this.getActiveLangOnInit();
        //this.getInitialLangContent();

    }

    getActiveLangOnInit = () => {
        this.getActiveLang()
        .then(_ => {
            this.getActiveLocalization()
            .then(result => {
                if (result.status === 1) {
                    this.setActiveLocalization(result.result);
                }
                this.isReady = true;
            })
            .catch(error => {
                this.saveActiveLang(0, this.availableLangs[0]);
                console.log("On Get Localization Error: ", error)
            })
        });
    }

    getActiveLang = () => {
        return new Promise( resolve => {
            MyLocalStorage.GetItem("app-lang")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
            .then(res => {
                if (res.status !== 1) {
                    this.setActiveLang(0);
                    this.saveActiveLang(0, this.activeLang);
                } else {
                    this.setActiveLang(res.data.index);
                }
                
                resolve(true);
            })
            .catch(_ => {
                this.saveActiveLang(0, this.availableLangs[0]);
                resolve(true);
            });

        });
    }

    getInitialLangContent = async () => {
        try {
            const apiConnection = new WebApiConnectionPresenter();
            const result = await apiConnection.callApiService(
                WebApiServicesDictionary.dictionary.localization.getContentLangs,
                null,
                null,
                false
            );
            if (result.status === 1) {
                this.availableLangsContent = result.result.map(item => {
                    return {
                        key: item.key,
                        value: item.key,
                        label: item.title,
                    }
                });
            }

        } catch(e) {
            console.log("ERROR: ", e)
        }

    }

    setActiveLang(index) {
        this.activeLang = this.availableLangs[index];
        this.dictionary = this.langs[this.activeLang];
    }

    setActiveLocalization(data) {
        this.langs[this.activeLang] = data;
        this.dictionary = this.langs[this.activeLang];
    }

    getActiveLocalization = () => {
        const apiConnection = new WebApiConnectionPresenter();
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.localization.getLocalization,
            null,
            null,
            this.activeLang
        );
    }

    saveActiveLang(index, lang) {
        const obj = {"index": index, "lang": lang};
        MyLocalStorage.SaveItem(obj, "app-lang")
        .then(_ => {
            this.setActiveLang(index);
        })
        .catch(_ => {
            console.log("Active Not Saved");
        });
    }

    changeLang(lang) {
        return new Promise(resolve => {
            this.availableLangs.forEach((val, index) => {
                if (lang === val) {
                    this.activeLang = lang;
                    this.getActiveLocalization()
                    .then(result => {
                        if (result.status === 1) {
                            this.setActiveLocalization(result.result);
                            this.saveActiveLang(index, lang);
                            resolve(true);
                        }
                        this.isReady = true;
                    })
                    .catch(_ => {
                        this.saveActiveLang(0, this.availableLangs[0]);
                        resolve(true);
                    });
                }
            });
        });
    }

    getSelectedLanguage = () => {
        return this.activeLang;
    }

    getUserLanguage = () => {
        const userLang = myAppState.userMe.profile.selectedLanguage;
        if(typeof userLang !== 'undefined') return userLang;
        else return this.activeLang
    }

    word = (key) => {
        if (typeof this.dictionary[key] !== "undefined") {
            return this.dictionary[key];
        } else {
            return "- - - - -";
        }
    }

    sentence = (key) => {
        if (typeof this.dictionary[key] !== "undefined") {
            return this.dictionary[key];
        } else {
            return "No phrase!";
        }
    }

    description = (key, args) => {
        if (typeof this.dictionary[key] !== "undefined") {
            let msg = this.dictionary[key];
            if (args.length > 0) {
                args.forEach((element, index) => {
                    const param = "param" + (index + 1);
                    const reg = new RegExp('{{'+param+'}}')
                    msg = msg.replace(reg, element)
                });
            }

            return msg;
        } else {
            return "No warning found!";
        }
    }

    getLangTitle = (index) => {
        return this.titles[index];
    }

    getLangIndex = () => {
        for(let i = 0; i < this.availableLangs.length; ++i) {
            if (this.activeLang === this.availableLangs[i]) {
                return i;
            }
        }
        return 0;
    }

    getLangList = () => {
        return this.availableLangs.map((lang, index) => {
            return {
                "title": this.titles[index],
                "index": index,
                "key": lang  
            };
        });
    }

    getContentLangList = () => {
        return this.availableLangsContent
        .map((lang, index) => {
            return {
                "title": lang.label,
                "index": index,
                "key": lang.key
            };
        });
    }

    getDefaultTitle = () => {
        const defaults = {
            "fr": "défaut",
            "en": "default",
            "es": "defecto"
        }
        return defaults[this.activeLang];
    }

    getActiveTitle = () => {
        let title = "";
        this.availableLangs.forEach((val, index) => {
            if (this.activeLang === val) {
                title = this.titles[index];
            }
        });
        return title;
    }

    getMonth = (index) => {
        return this.months[this.activeLang][index];
    }

    getDay = (index) => {
        return this.days[this.activeLang][index];
    }

    get getContentLanguages() {
        return this.activeAvailableLangsContent;
    }

    setAvailableLangsContent(keys) {
        this.activeAvailableLangsContent = [];
        keys.forEach(key => {
            this.availableLangsContent.forEach(lang => {
                if (lang.key === key) {
                    this.activeAvailableLangsContent.push(lang);
                }
            })
        })
    }
}

export default new Localization();