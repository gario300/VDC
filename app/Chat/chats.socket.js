import AppStore from './../Flux/AppStore';
import * as AppActions from "./../Flux/AppActions";
import DateTime from './../DateTime/date_time';
//import firestore from '@react-native-firebase/firestore';

import * as firebase from 'firebase'
import 'firebase/firestore';

import chatsState from './chats_state';
import myAppState from '../AppState/app_state';
import uuid from 'uuid-random';

const collectionName = "blob-test-chats"

const msgModel = {
    _id: 1,
    text: 'Welcome to the chat, '+ `${" "}` + ',Please wait while messages are loaded...',
    createdAt: new Date(),
    user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
    },
    image: null,
    location: null,
}

const lastMsg = {
    _id: 1,
    text: 'Welcome to the chat, '+ ` ` + ',Please wait while messages are loaded...',
    createdAt: new Date(),
    user: {
        uid: -1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
    },
    image: null,
}

class ChatsSocket {

    constructor() {
        this.dateTime = new DateTime();
        this.hasStarted = false;
        this.init = false;
        this.threadActive = null;
        this.referenceMessagesUser = null;
        this.referenceMessages = {};
        this.unsubscribeNetInfo = null;
        this.roomListener = null;
        this.roomLastSeenListener = null;
        this.msgsListener = null;
    }

    initConnection = () => {
        if (!firebase.apps.length) {
            const firebaseConfig = {
              apiKey: 'AIzaSyDNijtvSwTVMoT1c1MzMBXETox3NOh1O64',
              authDomain: 'tgw-test.firebaseapp.com',
              databaseURL: "https://tgw-test.firebaseio.com",
              projectId: 'tgw-test',
              storageBucket: "tgw-test.appspot.com",
              //databaseURL: 'https://tgw-test.firebaseio.com',
            }
      
            firebase.initializeApp(firebaseConfig);

            //console.log("Started")
            
            /*
            this.referenceMessages = firebase
            .firestore()
            .collection(collectionName);
            */
        }
    }

    onExit = async () => {
        if (this.unsubscribeMessagesUser) {
            this.unsubscribeMessagesUser();
        }
    }

    setListeners = (roomCallback, msgsCallback) => {
        this.roomListener = roomCallback;
    }

    setListenerMsg = (msgsCallback, roomLastSeenListener) => {
        this.msgsListener = msgsCallback;
        this.roomLastSeenListener = roomLastSeenListener;
    }

    removeListenerMsg = () => {
        this.msgsListener = null;
        this.roomLastSeenListener = null;
    }
    
    /*
    getChatDataAdmin = (threadNum) => {
        return new Promise((resolve, reject) => {
            if (this.hasStarted) resolve(true);

            firebase.firestore()
            .collection(collectionName)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    const chatRef = firebase.firestore().collection(collectionName).doc(doc.id)
                    chatRef
                    .collection('THREADS')
                    .where('name', '==', threadNum)
                    .get()
                    .then((querySnapshotThread) => {
                        querySnapshotThread.forEach(docTh => {
                            //console.log(docTh.id, '=>', docTh.data());
                            const threadRef = chatRef.collection('THREADS').doc(docTh.id);
                            this.subscribeThreadAdmin(threadRef, docTh.id, doc.id, docTh.data(), threadNum === "THREAD_01" ? 0 : 1);
                        });
                    })

                    chatRef
                    .collection('THREADS')
                    .where('name', '==', "THREAD_GROUP")
                    .get()
                    .then((querySnapshotThread) => {
                        querySnapshotThread.forEach(docTh => {
                            //console.log(docTh.id, '=>', docTh.data());
                            const threadRef = chatRef.collection('THREADS').doc(docTh.id);
                            this.subscribeThreadAdmin(threadRef, docTh.id, doc.id, docTh.data(), 2);
                        });
                        
                    })
                });
                resolve(true);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    subscribeThreadAdmin = (threadRef, threadId, docId, docData, index) => {
        const roomNames = chatsState.threads;
        const roomName = roomNames[index] + "-" + threadId;
        chatsState.setLastSeenAtBeginning(docData.lastSeen, roomName, myAppState.userMe.profile.uid);
        chatsState.setLastSeenList(docData.lastSeen, roomName);
        chatsState.setThreadId(threadId, roomName);

        threadRef.collection('MESSAGES')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnap => this.OnAdminMessages(querySnap, threadId, docId, docData, index));
    }

    OnAdminMessages = (querySnapshot, threadId, docId, docData, index) => {
        //console.log("New Admin Message", this.dateTime.getNowStamp())
        const threads = querySnapshot.docs.map(val => {
            return this.parseMessage(val, index, docData);
        });

        const roomNames = chatsState.threads;
        AppActions.setMessageChatAdmin({
            name: roomNames[index] + "-" + threadId,
            doc: docId,
            data: threads
        })
    }
    */
    
    onInit = async () => {

        if (this.hasStarted) return true;

        /*
        const chatId = "CHAT_" + userId;
        const chatRef = this.referenceMessages
        .doc(chatId);
        */

        
        //this.referenceMessagesUser = await this.referenceMessages.collection('rooms')
        //.where("uid", "==", this.state.uid);

        //console.log(`Actual User Id: ${fullName}`, referenceMessagesUser)
        //this.unsubscribeMessagesUser = await this.referenceMessagesUser.onSnapshot(this.onRoomsUpdated);

        console.log("On Init", myAppState.userMe.profile.uid)
        const chatRef = await firebase
        .firestore()
        .collection('dev-rooms')
        //.where('owner', '==', myAppState.userMe.profile.uid)
        //.orderBy('lastMsg.createdAt', 'desc')
        .where('list', 'array-contains', myAppState.userMe.profile.uid )
        .onSnapshot(this.onRoomsUpdated)

        /*
        const rf = firebase
        .firestore()
        .collection('dev-rooms')
        //.where('owner', '==', myAppState.userMe.profile.uid)
        .where('list', 'array-contains', myAppState.userMe.profile.uid )
        */

        return

        console.log("REFF", chatRef.collection('sessions'))
        chatRef
        .collection("sessions")
        .onSnapshot(this.onRoomsUpdated);
        //console.log("Chat Ref: ", chatRef)
        /*
        chatRef
        .collection('THREADS')
        .where('name', '==', threadNum)
        .get()
        */
        /*
        chatRef
        .get()
        .then((doc) => {
            if (doc.exists) {
                console.log("Chats Created")
                this.setGotChats(chatRef);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such chats!");
                this.setNewUserChats(chatId);
            }
            resolve(true);
        })
        .catch((error) => {
            reject(error);
        });
        */
    }

    startNewChat = async (id, uid, seanceId) => {

        console.log("New Chat", id)
        const chatRef = await firebase
        .firestore()
        .collection('dev-rooms')

        const list = [
            id, uid
        ];

        const snapshot = await firebase
        .firestore()
        .collection('dev-rooms')
        .where('list', 'in', [list])
        .get()

        if (!snapshot.empty) {
            return;
        }

        const listT = [
            uid, id
        ];

        const snapshotT = await firebase
        .firestore()
        .collection('dev-rooms')
        .where('list', 'in', [listT])
        .get()

        if (!snapshotT.empty) {
            return;
        }

        const chatId = uuid()
        const newRef = await chatRef
        .add({
            _id: chatId,
            id: chatId,
            participants: `${id}-${uid}`,
            createdAt: this.dateTime.getNow(),
            seance: seanceId,
            owner: id,
            list: list,
            lastMsg: {
                "text": "Bonjour",
                "userId": id,
                "createdAt": this.dateTime.getNow(),
                "id": chatId,
                "seen": false
            },
            lastSeen: {}
        });

        newRef
        .collection('chats')
        .add({
            text: "Bonjour",
            createdAt: this.dateTime.getNow(),
            system: true,
            user: {
                name: "",
                id: id
            },
            id: chatId,
            msgId: chatId,
            sent: true,
            received: false
        })
    }

    verifyLastSeen = (msg, roomId) => {
        //console.log("Ro", roomId)
        chatsState.setLastSeenMsgMe(msg, roomId);
    }

    onRoomsUpdated = (querySnapshot) => {

        let messages = [];
        querySnapshot.docs.forEach(val => {
            //return this.parseMessage(val, indexRoom, {});
            //console.log("Val", val.data())
            const data = val.data()
            if (typeof data.id !== "undefined") {
                data._id = val.id;
                if (typeof data.lastSeen[myAppState.user.profile.uid] !== "undefined") {
                    this.verifyLastSeen(data.lastSeen[myAppState.user.profile.uid], val.id);
                }
                messages.push(data)
            }
        });

        this.roomListener(messages);

        if (this.roomLastSeenListener !== null) {
            //this.roomLastSeenListener(data.lastSeen)
        }
        // go through each document
        //console.log("Query Snapshot", querySnapshot)
        return
        querySnapshot.forEach((doc) => {
            return;
            // get QueryDocumentSnapshot's database
            let data = doc.data();
            let firebaseTime = data.createdAt;
            // convert from Firebase Timestamp object to Date using milliseconds - surprise!
            let timestamp = new Date(firebaseTime.seconds * 1000);
            messages.push({
                _id: data._id,
                text: data.text,
                image: data.image, // added since new to task 5.6
                location: data.location, // added since new to task 5.6
                createdAt: timestamp,
                user: {
                    _id: data.userId,
                    name: data.userName,
                    avatar: data.userAvatar,
                }
            });
        });
        // sort so latest is last
        /*
        messages.sort(function (a,b) {
            return b.createdAt - a.createdAt;
        });
        */
        // set messages state to be this array of messages
        //this.setState({ messages, });
    }

    setNewUserChats = (chatId) => {
        const ref = this.referenceMessages;
        ref.doc(chatId).set({
            "name": chatId
        })
        .then( _resp => {
            const docRef = this.referenceMessages.doc(chatId);
            const roomNames = chatsState.threads;
            const user = myAppState.userMe;
            roomNames.forEach(roomName => {
                docRef.collection('THREADS').add({
                    name: roomName,
                    users: [user.profile.uid],
                    lastSeen: [],
                })
                .then(threadRef => {
                    threadRef.collection('MESSAGES').add({
                        text: `You have joined the room ${roomName}.`,
                        createdAt: this.dateTime.getNow(),
                        system: true,
                        seen: false,
                        user: {
                            name: "System",
                            id: ""
                        }
                    })
                    .then(messageRef => {
                        //console.log("threadRef: ", threadRef.id)
                        this.subscribeThread(threadRef, roomName, [], threadRef.id)
                    });
                });
            });
        })
    }

    subscribeThread = (threadRef, roomName, lastSeen, threadId) => {
        let functionName = (va) => {};
        const roomNames = chatsState.threads;
        chatsState.setLastSeenAtBeginning(lastSeen, roomName, myAppState.userMe.profile.uid);
        chatsState.setLastSeenList(lastSeen, roomName);
        chatsState.setThreadId(threadId, roomName);
        const roomFuncs = [this.OnFirstChat, this.OnSecondChat, this.OnGroupChat];
        roomNames.forEach((name, index) => {
            if (name === roomName) {
                functionName = roomFuncs[index];
            }
        });
        /*
        threadRef
        .onSnapshot((querySn) => {
            console.log("Thread updated: " + roomN)
        });
        */

        threadRef.collection('MESSAGES')
        // add this
        .orderBy('createdAt', 'desc')
        .onSnapshot(functionName);
    }

    OnFirstChat = (querySnapshot) => {
        const indexRoom = 0;
        const threads = querySnapshot.docs.map(val => {
            return this.parseMessage(val, indexRoom, {});
        });

        const roomNames = chatsState.threads;
        AppActions.setMessageChat({
            name: roomNames[indexRoom],
            data: threads
        })
    }

    OnSecondChat = (querySnapshot) => {
        const indexRoom = 1;
        const threads = querySnapshot.docs.map(val => {
            return this.parseMessage(val, indexRoom, {});
        });

        const roomNames = chatsState.threads;
        AppActions.setMessageChat({
            name: roomNames[indexRoom],
            data: threads
        })
    }

    OnGroupChat = (querySnapshot) => {
        const indexRoom = 2;
        const threads = querySnapshot.docs.map(val => {
            return this.parseMessage(val, indexRoom, {});
        });

        const roomNames = chatsState.threads;
        AppActions.setMessageChat({
            name: roomNames[indexRoom],
            data: threads
        })
    }

    setGotChats = (chatRef) => {
        const ref = chatRef.collection('THREADS');
        ref.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
          
            snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.data());
                const threadRef = chatRef.collection('THREADS').doc(doc.id);
                const data = doc.data();
                this.subscribeThread(threadRef, data.name, data.lastSeen, doc.id);
            });
        })
        /*
        ref.getCollections()
        .then(threadRef => {
            collections.forEach(collection => {
                console.log('Found subcollection with id:', collection.id);
            });
            //this.subscribeThread(threadRef)
        })
        */
    }

    parseMessage = (documentSnapshot) => {
        const data = documentSnapshot.data();
        //console.log("Data", data)
        const user = myAppState.userMe;
        const newDate = this.dateTime.newDate(data.createdAt);
        const name = data.system ? "" : data.user.name;
        const isMe = data.user.id === user.profile.uid;
        const meName = isMe ? "Moi" : name;
        const seen = isMe ? true : false;
        return {
            id: data.id,
            msgId: data.msgId,
            name: name,
            usersList: [],
            index: 0,
            title: "",
            me: meName,
            system: data.user.system,
            text: data.text,
            date: newDate,
            _id: documentSnapshot.id,
            createdAt: data.createdAt,
            user: {
                _id: data.user.id,
                name: data.user.name
            },
            sent: true,
            received: data.received,
            dateFormatted: this.dateTime.dateFormattedMin(newDate),
            notSeen: !seen,
            isMe: isMe
        };
    }

    updateLastSeen = async (lastSeen, roomId) => {
        
        const uid = myAppState.user.profile.uid
        const res = await firebase
        .firestore()
        .collection('dev-rooms')
        .doc(roomId)
        .get()

        if (!res && res.empty) return

        const resObj = res.data()

        resObj["lastSeen"][uid] = lastSeen.msgId;

        await firebase
        .firestore()
        .collection('dev-rooms')
        .doc(roomId)
        .update({
            lastSeen: resObj["lastSeen"]
        })

        //console.log("Chat id", lastSeen)
        await firebase
        .firestore()
        .collection('dev-rooms')
        .doc(roomId)
        .collection('chats')
        .doc(lastSeen._id)
        .update({
            received: true
        });

        /*
        const ref = chatRef.collection('THREADS');
        ref.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.data());
                const docData = doc.data();
                if (roomName === docData.name) {
                    const threadRef = chatRef.collection('THREADS').doc(doc.id);
                    const lastSeenThread = docData.lastSeen;
                    const newList = [];
                    lastSeenThread.forEach(item => {
                        if (item.id === lastSeen.id) return;
                        newList.push(item);
                    })
                    newList.push(lastSeen);
                    chatsState.setLastSeenList(newList, roomName);
                    threadRef.update({
                        lastSeen: newList
                    })
                }
            });
        })
        .catch(error => {
            console.log("On Update Error 1");
        })
        */
    }

    updateAsConnected = (isConnected) => {
        threadRef.update({
            lastSeen: newList
        })
    }

    updateLastSeenAdmin = (lastSeen, roomName, docId) => {
        const chatRef = this.referenceMessages
        .doc(docId)

        let roomNameToUpdate = roomName.split("-")[1];
        const threadRef = chatRef.collection('THREADS').doc(roomNameToUpdate);
        threadRef
        .get()
        .then(doc => {
            const docData = doc.data();
            const lastSeenThread = docData.lastSeen;
            const newList = [];
            lastSeenThread.forEach(item => {
                if (item.id === lastSeen.id) return;
                newList.push(item);
            })
            newList.push(lastSeen);
            threadRef.update({
                lastSeen: newList
            })
        })
        .catch(error => {
            console.log("On Update Error Admin", error);
        })
    }

    unsubscribeListen = (threadId) => {
        if (this.threadActive !== null) {
            this.threadActive();
            this.threadActive = null;
        }
    }

    listenThread = async (roomId) => {

        if (this.threadActive !== null) {
            this.threadActive();
            this.threadActive = null;
        }
        // Step 3.1 create a message collection inside threads
        // when sending a message after this step, on firebase console
        // you are going to see a MESSAGES sub collection inside collection THREADS

        //console.log("Room Id", roomId)
        const roomRef = await firebase
        .firestore()
        .collection('dev-rooms')
        .doc(roomId)
        .collection('chats')
        
        roomRef 
        .onSnapshot(this.OnNewMessage)
    }

    OnNewMessage = (querySnapshot) => {
        
        const messages = [];
        //console.log("Val", querySnapshot)
        
        querySnapshot.docs.map(val => {
            const data = val.data()
            if (typeof data.text !== "undefined") {
                const msg = this.parseMessage(val);
                messages.push(msg)
            }
        });
        
        if (this.msgsListener !== null) {
            this.msgsListener(messages)
        }
    }

    updateMsgAsSeen = (msg, ref) => {

    }

    /*
    handleSendAdmin = async (messages, roomName, docId) => {

        const text = messages[0].text;
        const user = myAppState.userMe;

        const chatRef = this.referenceMessages.doc(docId)

        let roomNameToUpdate = roomName.split("-")[1];
        const threadRef = chatRef.collection('THREADS').doc(roomNameToUpdate);
        threadRef
        .collection('MESSAGES')
        .add({
            text: text,
            createdAt: this.dateTime.getNow(),
            system: false,
            user: {
                name: user.name,
                id: user.profile.uid
            }
        });
    }
    */

    handleSend = async (msg, roomId) => {
        // Step 3 get the text of the message
    
        const user = myAppState.userMe;
        // Step 3.1 create a message collection inside threads
        // when sending a message after this step, on firebase console
        // you are going tFo see a MESSAGES sub collection inside collection THREADS
        const nowTime = this.dateTime.getNow()
        const msgId = uuid()

        await firebase
        .firestore()
        .collection('dev-rooms')
        .doc(roomId)
        .collection('chats')
        .add({
            text: msg,
            createdAt: nowTime,
            system: false,
            user: {
                name: user.name,
                id: user.profile.uid
            },
            msgId: msgId,
            uid: user.profile.uid,
            id: msgId,
            sent: true,
            seen: false,
            received: false
        });

        const uid = user.profile.uid
        await firebase
        .firestore()
        .collection('dev-rooms')
        .doc(roomId)
        .update({
            lastMsg: {
                "text": msg,
                "userId": uid,
                "createdAt": nowTime,
                "id": msgId,
                "seen": false
            }
        })
    }
    
};

const chatsSocket = new ChatsSocket();
export default chatsSocket;