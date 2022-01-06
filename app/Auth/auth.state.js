
class AuthState {

    constructor() {
        this.data = {
            "token": "",
            "isAnonym": true,
            "isQuestComplete": false,
            "name": "",
            "lastName": "",
            "email": "",
        };
    }

    resetTokenState = () => {
        this.data = {
            "token": "",
            "isAnonym": true,
            "isQuestComplete": false,
            "name": "",
            "lastName": "",
            "email": "",
        };
    }

    newAuthState = (token, isAnonym) => {
        var jwtDecode = require('jwt-decode');                                
        const decoded = jwtDecode(token);
        const isQuestComplete = decoded.user.alreadySet;
        const name = decoded.user.name;
        const lastName = decoded.user.lastName;
        const email = decoded.user.email;
        this.data = {
            "token": token, 
            "isAnonym": isAnonym,
            "isQuestComplete": isQuestComplete,
            "name": name,
            "lastName": lastName,
            "email": email,
        }
    }

    setQuestCompleted = (val) => {
        this.data.isQuestComplete = val;
    }

    get isAuthAnonym() {
        return this.data.isAnonym;
    }

    get token() {
        return this.data.token;
    }

    get isQuestComplete() {
        return this.data.isQuestComplete;
    }

    get userInfoFromToken() {
        return {
            "name": this.data.name,
            "lastName": this.data.lastName,
            "email": this.data.email,
        }
    }

    get alreadySet() {
        const jwtDecode = require('jwt-decode');
        const decoded = jwtDecode(this.data.token);
        return decoded.user.alreadySet;
    }
};

const authState = new AuthState();
export default authState;