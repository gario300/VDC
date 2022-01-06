import React from 'react';
import { Text, View, Image } from 'react-native';

import styles from './chat.style';
import Localization from '../Localization/localization';

import ElementsListFetch from './../UIComponents/ElementsList/elements_list_fetch.component';
import CardChat from './../UIComponents/Cards/card_chat.component';

import myAppState from '../AppState/app_state';
import AppStore from './../Flux/AppStore';
import chatsSocket from './../Chat/chats.socket';
import Messages from './../Message/message';
import * as AppActions from "./../Flux/AppActions";
import chatsState from '../Chat/chats_state';

import UsersPresenter from './../User/user.presenter';
import NormalButton from '../UIComponents/Button/normal_button.component';
import TopMenu from '../NotificartionsMessages/index.screen'
export default class ContactScreen extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            fetching: true,
            onUpdate: false,
            activeChats: 0,
            dataGot: 0,
            isAdmin: false,
            data: [],
            users: [],
            admins: []
        }

        console.log("Chat Started")
        
        chatsSocket.setListeners(
            this.OnRoomChatChanged 
        );
        chatsSocket.onInit();
    }

    async componentDidMount() {

        this.getUserList();
        //this.getChatData();
        AppStore.on("onSetUser", this.OnUserGot);
        AppStore.on("onChatThread", this.OnChatThread);
        AppStore.on("onUpdateMessages", this.OnChatUpdated);
        AppStore.on("onNewChatListener", this.OnNewChatListener);

        const { navigation } = this.props;
        this.focusListener = navigation.addListener("focus", payload => {
            this.verifyChatMessagesNotifications();
        });

    }

    handleFlashes = () => {
        if(chatsState.getIsChatFlash()) {
            this.VerifyChatIsLoaded();
        }
    }

    VerifyChatIsLoaded = () => {
        const params = chatsState.getChatFlashInfo(); 
        if (!this.state.fetching && this.state.data.length > 0) {
            for(let i = 0; i < this.state.data.length; ++i) {
                if (this.state.isAdmin) {
                    const roomNameId = this.state.data[i].roomName.split("-")[1];
                    if (roomNameId === params.target) {
                        this.OnCardPress(this.state.data[i].id);
                    }
                } else {
                    const threadIds = chatsState.threadIds;
                    const rooomName = chatsState.threads[this.state.data[i].index];
                    threadIds.forEach(obj => {
                        if (obj.threadId === params.target && rooomName === obj.key) {
                            this.OnCardPress(this.state.data[i].id);
                        }
                    });
                }
            }

            chatsState.resetChatFlash();
        }
    }

    verifyChatMessagesNotifications = () => {
        if (myAppState.getChatNotifications() > 0) {
            const uPresenter = new UsersPresenter();
            uPresenter.updateChatMeessages([])
            .then(this.OnUpdateChatMessagesSuccess)
            .catch(this.OnUpdateChatMessagesError);
        }
    }

    OnUpdateChatMessagesSuccess = (result) => {
        if (result.status ===  1) {
            AppActions.getUserMe();
        } else {
            this.OnUpdateChatMessagesError(result);
        }
    }

    OnUpdateChatMessagesError = (error) => {
        console.log("Update Chat Messages Error: ", error)
    }

    componentWillUnmount() {
        AppStore.removeListener("onSetUser", this.OnUserGot);
        AppStore.removeListener("onChatThread", this.OnChatThread);
        AppStore.removeListener("onUpdateMessages", this.OnChatUpdated);

        this.focusListener();
    }

    OnUserGot = () => {
        const user = myAppState.userMe;
        this.setState({
            user: user,
            isAdmin: user.permissions === 5
        });
    }

    getUserList = () => {
        const uPresenter = new UsersPresenter();
        uPresenter.getUserList()
        .then(response => {
            chatsState.setUserList(response.result);
            const wasNotEmpty = this.state.data.length > 0;
            this.setState({
                users: response.result,
            }, () => {
                if (wasNotEmpty) {
                    this.OnRoomChatChanged(this.state.data);
                }
            });
        })
        .catch(error => {
            console.log("EError: ", error)
        });
    }

    verifyResponse = () => {
        if (this.dataGot === 2) {
            this.setState({
                dataGot: 0,
                fetching: false
            })
        }
    }

    OnRoomChatChanged = (list) => {
        const nList = this.mapUsers(list);
        this.setState({
            data: nList,
            fetching: false
        })
    }

    mapUsers = (list) => {
        const nList = [];
        const ownerId = myAppState.userMe.profile.uid
        list.forEach(element => {
            //console.log("eleme", element)
            let title = "";
            let photo = null;
            let lastMsg = "";

            const isOwner = ownerId === element.owner

            element.nList = element.list.map((id, index) => {
                const userObj = {
                    "id": id,
                    "name": ""
                };
                
                if (isOwner && index === 0) {
                    return;
                }

                if (!isOwner && index > 0) {
                    return;
                }

                const found = this.state.users.find((user) => user.id === userObj.id)
                if (found) {
                    userObj.name = found.name + " " + found.lastName
                    title = found.name + " " + found.lastName
                    photo = found.profile.photo !== null && typeof found.profile.photo["0"] !== "undefined" ? found.profile.photo["0"] : null
                }

                return userObj;
            })

            const isMe = element.lastMsg.userId === myAppState.userMe.profile.uid
            let me = "";
            if (isMe) {
                me = "Me";
            }

            lastMsg = element.lastMsg.text
            
            element.title = title;
            element.photo = photo;
            element.message = lastMsg;
            element.me = me;
            element.notSeen = isMe ? false : chatsState.meLastSeenMsg(element._id) !== element.lastMsg.id;
            nList.push(element)
        });

        //console.log("Nlist", nList)
        return nList.sort((a, b) => b.lastMsg.createdAt - a.lastMsg.createdAt);
    }

    OnChatMsgsUpdated = () => {

    }

    OnChatUpdated = () => {
        this.OnChatThread();
    }

    OnChatThread = () => {
        /*
        const chats = chatsState.chatsMessagesInList;
        let activeChats = 0;
        chats.forEach(item => {
            if (!item.seen) {
                activeChats += 1;
            }
        })
        this.setState({
            data: chats,
            activeChats: activeChats,
            fetching: false
        })
        this.VerifyChatIsLoaded();
        */
    }

    getChatData = () => {
        const uid = myAppState.userMe.profile.uid;
        chatsSocket.getChatData(uid, myAppState.userMe.name + " " + myAppState.userMe.lastName)
        .then(_val => {})
        .catch(this.onGetChatError);
    }

    onGetChatError = (error) => {
        //console.log("Error getting chat:", error);
        Messages.setMessage(Localization.word("chat_error"));
        AppActions.displayMessage(true)
        this.setState({
            fetching: false
        });
    }

    OnCardPress = (id, _index) => {
        const item = this.getItemById(id);
        const { navigate } = this.props.navigation;
        this.verifyChatMessagesNotifications();
        navigate('ChatRoom', {
            name: item.title,
            id: item._id,
            list: item.nList
        });
    }

    getItemById = (id) => {
        for(let i = 0; i < this.state.data.length; ++i) {
            if (this.state.data[i].id === id) return this.state.data[i];
        }
        
        return false;
    }

    renderItem = ({item, index}) => {
        return (<CardChat
            id={item.id}
            index={index}
            OnPress={this.OnCardPress}
            item={item}
        />)
    }
    
    OnFetchData = () => {
        this.setState({
            fetching: false,
        }, () => {
            this.getUserList();
        })
    }

    OnNewChat = (userId) => {
        chatsSocket.startNewChat(
            myAppState.userMe.profile.uid,
            userId,
            "seanceId_01"
        )
    }

    OnNewChatListener = ({id, seanceId}) => {
        chatsSocket.startNewChat(
            myAppState.userMe.profile.uid,
            id,
            seanceId
        )
    }

    render() {
        return (
            <View style={styles.container}> 
                {/*<View style={styles.chats}>
                    <ElementsListFetch 
                        data={this.state.users}
                        renderItem={({item}) => {
                            return (
                                <View style={{flex: 1, height: 80, borderBottomWidth: 1, borderColor: 'black', justifyContent: 'center'}}>
                                    <View style={{
                                        flex: 1, 
                                        height: 80, 
                                        flexDirection: 'row', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        marginHorizontal: 8
                                    }}>
                                        <Text>{`${item.name} ${item.lastName}`}</Text>
                                        <View style={{
                                            height: 50, 
                                            width: 150,
                                            justifyContent: 'center', 
                                            alignItems: 'center',
                                            marginHorizontal: 8
                                        }}>
                                            <NormalButton 
                                                title={ "Start Chat" }
                                                callback={() => {
                                                    this.OnNewChat(item.id);
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                        FetchData={ () => {OnFetchData} }
                        loading={false}
                        state={this.state.onUpdate}
                    />
                </View>*/}
                <View style={styles.chats}>
                    <ElementsListFetch 
                        data={this.state.data}
                        renderItem={this.renderItem}
                        FetchData={this.OnFetchData}
                        loading={this.state.fetching}
                        state={this.state.onUpdate}
                    />
                </View>
            </View>
        )
    }
    
}
