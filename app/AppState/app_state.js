import DateTime from '../DateTime/date_time';

class MyAppState {

    constructor() {
        this.init();
    }

    init = () => {
        this.loaderState = {
            isActive: false,
            type: 0
        };
        this.isMessageActive = false;
        this.isProfileActive = false;
        this.user = {
            id: "",
            email: "",
            lastName: "",
            name: "",
            phone: "",
            client: {
                address: "",
                gender: -1
            },
            notification: false,
            permissions: 0,
            profile: {
                niveau: "",
                description: "",
                photo: [],
                city: "",
                age: ""
            },
            language: 'fr',
            isProfileActive: false,
            pushMessages: [],
            pushChatMessages: [],
            badges: 0,
            status: 0
        };
        this.adviceNotification = {
            isFlash: false,
            target: ''
        };
        this.locations = [];
        this.notifications = 0;
        this.pushChatMessages = [];
        this.linkingUrl = {
            active: false,
        }
        this.article = {
            author: {
                id: '',
                name: '',
                lastName: '',
            },
            avaliable: 2,
            categories: [],
            content: {
                "fr": {
                    body: '',
                    description: '',
                    file: {},
                    title: '',
                },
                "en": {
                    body: '',
                    description: '',
                    file: {},
                    title: '',
                },
                "es": {
                    body: '',
                    description: '',
                    file: {},
                    title: '',
                },
            },
            created: new Date(Date.now()),
            date: new Date(Date.now()),
            id: '',
            images: {},
            status: 1,
            type: '',
        }
        this.linkSearch = false;
        this.linkProposer = {
            active: false,
            id: ""
        };
    }

    setLinkSearch = (val) => {
        this.linkSearch = val;
    }

    getLinkSearch = () => {
        return this.linkSearch;
    }

    setLinkProposer = (val) => {
        this.linkProposer = {
            active: true,
            id: val
        };
    }

    unLinkProposer = () => {
        this.linkProposer = {
            active: false,
            id: ""
        };
    }

    getLinkProposer = () => {
        return this.linkProposer;
    }

    setUserMe = obj => {
        this.user = Object.assign({}, obj);
    }

    get userMe() {
        return this.user;
    }

    get profile() {
        return {
            "gender": this.user.profile.gender,
            "age": this.user.profile.age,
            "description": this.user.profile.description,
            "niveau": this.user.profile.niveau,
            "photo": this.user.profile.photo,
            "etablissement": this.user.profile.etablissement,
            "city": this.user.profile.etablissement
        }
    }

    setLocationsList = obj => {
        this.locations = obj;
    }

    get locationsList() {
        return this.locations;
    }

    setLoaderActive = (obj) => {
        this.loaderState = {
            isActive: obj.isActive,
            type: obj.type
        };
    }

    setMessageActive = value => {
        this.isMessageActive = value;
    }

    setProfileActive = value => {
        this.isProfileActive = value;
    }

    setNumberOfPublications = value => {
        this.numberOfPublications = value;
    }

    setNotifications = val => {
        this.notifications = val;
    }

    setAdviceNotifications = obj => {
        this.adviceNotification = {
            isFlash: obj.isFlash,
            target: obj.target
        };
    }

    resetAdviceNotifications = () => {
        this.adviceNotification = {
            isFlash: false,
            target: ''
        };
    }

    getAdviceNotifications = () => {
        return this.adviceNotification;
    }

    getNotifications = () => {
        return this.notifications + 0;
    }

    setChatNotifications = list => {
        this.pushChatMessages = list;
    }

    getChatNotifications = () => {
        return this.pushChatMessages.length + 0;
    }

    get getLoaderState() {
        return this.loaderState;
    }

    get getMessageActive() {
        return this.isMessageActive;
    }

    get profileActive() {
        return false;
    }

    get publications() {
        return 0;
    }

    getLocationQuartier = () => {
        const check = {};
        const list = [];
        this.locations.forEach(obj => {
            if (!check[obj.quartiers]) {
                list.push(obj.quartiers)
                check[obj.quartiers] = true
            }
        })

        return list;
    }

    getLocationCommune = () => {
        const check = {};
        const list = [];
        this.locations.forEach(obj => {
            if (!check[obj.communes]) {
                list.push(obj.communes)
                check[obj.communes] = true
            }
        })

        return list;
    }

    getLocationVille = () => {
        const check = {};
        const list = [];
        this.locations.forEach(obj => {
            if (!check[obj.villes]) {
                list.push(obj.villes)
                check[obj.villes] = true
            }
        })

        return list;
    }

    getLocationJoin = () => {
        const list = [];
        this.locations.forEach(obj => {
            const name = obj.villes + " " + obj.communes + " " + obj.quartiers;
            list.push(name)
        })

        return list;
    }

    setLinkingUrl = (obj) => {
        this.linkingUrl = {
            active: obj.active,
            path: obj.path,
            publication: obj.publication,
            type: obj.type
        }
    }

    resetLinkingUrl = () => {
        this.linkingUrl = {
            active: false,
            path: "",
            publication: "",
            type: 0
        }
    }

    get getLinkingUrl() {
        return this.linkingUrl;
    }

    get articleInitial() {
        return this.article
    }
};

const myAppState = new MyAppState();
export default myAppState;
