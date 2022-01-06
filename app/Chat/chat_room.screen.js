import React from 'react';
import { AppState, View, StyleSheet, Alert, Platform, Image, TouchableOpacity, TouchableHighlightBase } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import myAppState from '../AppState/app_state';
import AppStore from './../Flux/AppStore';
import chatsSocket from './../Chat/chats.socket';
import Messages from './../Message/message';
import * as AppActions from "./../Flux/AppActions";
import chatsState from '../Chat/chats_state';
import DateTime from '../DateTime/date_time';
import UserPresenter from '../User/user.presenter';
import StylesVariables from './../Styles/app.style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: StylesVariables.windowWidth,
    height: StylesVariables.windowHeight,
    zIndex: -1
  },
  chatContent: {
    flex: 1,
    backgroundColor: 'white'
  }
})

export default class ChatRoomScreen extends React.Component {

  constructor(props) {

    super(props);

    this.mTimeOut = null;
    this.uPresenter = new UserPresenter();
    this.dateTime = new DateTime();

    const id = props.route.params.id;
    const title = props.route.params.name;
    const users = props.route.params.list;

    console.log("iD", props.route.params)
    const user = myAppState.userMe;
    this.state = {
        fetching: true,
        roomId: id,
        roomName: title,
        lastSeen: [],
        lastSeenInfo: {
          last: "",
          user: "",
          date: this.dateTime.getNow()
        },
        docId: "-",
        userId: user.profile.uid,
        messages: [],
        actives: [],
        usersList: users,
        appState: AppState.currentState,
        lastSentMsg: {}
    }
  }

  setActiveThread = () => {
    chatsSocket.setListenerMsg(this.OnNewMessage, this.OnNewLastSeen);
    chatsSocket.listenThread(this.state.roomId);
  }

  OnNewLastSeen = (lastSeen) => {
    console.log(lastSeen)
  }

  OnNewMessage = (messages) => {
    /*
    const roomName = chatsState.threads[this.state.roomIndex];
    chatsState.setLastSeenList(data.lastSeen, roomName);
    */
    //this.OnSuccessUpdateLast();

    let received = false;
    const chats = messages
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(ele => {
      ele.received = received ? received : ele.received
      received = ele.received
      return ele;
    })
    // this.OnLastMessageLogic();
    this.setState({
      messages: chats,
      fetching: false
    }, () => {
      this.OnSuccessUpdateLast();
      this.setLastMessageSeen()
    });
  }

  setUnActiveThread = () => {
    if (this.state.isAdmin) {
      chatsSocket.listenThreadAdmin(this.state.threadId, this.state.docId, this.OnListenThread);
    } else {
      chatsSocket.listenThread(this.state.threadId, this.OnListenThread);
    }
  }

  OnListenThread = (querySnapshot) => {
    const data = querySnapshot.data();
    if (typeof data["lastSeen"] !== "undefined") {
      const roomName = chatsState.threads[this.state.roomIndex];
      chatsState.setLastSeenList(data.lastSeen, roomName);
      this.OnSuccessUpdateLast();
    }
    
    if (typeof data["actives"] !== "undefined") {
      this.setState({
        actives: data["actives"]
      })
    }
  }

  async componentDidMount() {

    AppStore.on("onSetUser", this.OnUserGot);
    AppStore.on("onChatThread", this.OnChatThread);

    AppState.addEventListener('change', this._handleAppStateChange);

    this.props.navigation.setOptions({
      title: this.state.roomName
    })

    /*
    setTimeout(() => {
      this.OnChatThread();
    }, 100);
    */
   this.setActiveThread();
   //this.OnLastMessageLogic();
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      //console.log('App has come to the foreground!')
      this.setActiveThread();
    }
    if (this.state.appState.match(/active/) && nextAppState.match(/background/)) {
      //console.log('App has come From foreground!')
      this.OnReemoveListenThread();
    }
    this.setState({appState: nextAppState});
  }

  componentWillUnmount() {
    AppStore.removeListener("onSetUser", this.OnUserGot);
    AppStore.removeListener("onChatThread", this.OnChatThread);
    AppState.removeEventListener('change', this._handleAppStateChange);
    this.OnReemoveListenThread();
  }

  OnReemoveListenThread = () => {
    chatsSocket.unsubscribeListen(this.state.roomId);
    chatsSocket.removeListenerMsg();
  }

  // helper method that is sends a message
  OnUserGot = () => {
    const user = myAppState.userMe;
    this.setState({
        user: user,
        isAdmin: user.permissions === 5
    })
  }

  OnChatThread = () => {
    
  }

  OnLastMessageLogic = () => {
    this.setLastMessageSeen();
    this.mTimeOut = null;
  }

  setLastMessageSeen = () => {
    let lastMsg = null;
    //console.log("this.state.messages", this.state.messages)
    for(let i = this.state.messages.length - 1; i >= 0; --i) {
      const msgObj = this.state.messages[i];
      
      if (msgObj.isMe) continue;
      
      if (msgObj.notSeen && !msgObj.isMe) {
        lastMsg = msgObj;
      }

      if (msgObj.seen && !msgObj.isMe) break;
    }

    if (lastMsg !== null) {
      chatsSocket.updateLastSeen(lastMsg, this.state.roomId)
      //AppActions.updateMessages({})
    }
  }

  OnSuccessUpdateLast = () => {
    //const lastSeen = chatsState.getLastMessageOther(this.state.roomIndex);
    //this.setLastSeen({});
  }

  setLastSeen = (lastSeen) => {
    if (lastSeen === null) return
    const messages = this.state.messages;
    const lastSeenInfo = this.state.lastSeenInfo;
    if (messages.length > 0) {
      let found = false;
      for(let i = 0; i < messages.length; ++i) {
        messages[i]["received"] = false;
        if (found ) {
          messages[i]["received"] = true;
          continue;
        }
        lastSeen.forEach(element => {
          if (element.id === this.state.userId) return;
          if (element.last === messages[i].id) {
            found = true;
            messages[i]["received"] = true;
            lastSeenInfo.date = element.date;
            lastSeenInfo.user = element.id;
            lastSeenInfo.last = element.last;
          }
        });
        if (found) {
          continue;
        }
      }
    }
    this.setState({
      lastSeen: lastSeen,
      messages: messages,
      lastSeenInfo: lastSeenInfo
    })
  }

  handleSend = (msg) => {
    chatsSocket.handleSend(msg[0].text, this.state.roomId);
    /*
    this.setState({
      send: true,
      lastSentMsg: msg[0].text
    })
    */
   this.sendNotificationAdmin(msg[0].text, this.state.roomId);
  }

  sendNotificationAdmin = (body, roomId) => {

    const title = "Nouveau message: ";
    const list = this.state.usersList
    .filter(a => typeof a !== "undefined")
    .map(a => a.id)

    if (list.length > 0) {
      //console.log("New Send Notification: ", roomId)
      //console.log("New Send Notification: ", list)
      this.uPresenter.sendMessageNotification(title, body, roomId, list)
      .then(res => {
        //console.log("Response from send notification: ", res);
        res.result.forEach(result => {
          console.log("Result User Notification: ", result)
        })

      })
      .catch(error => {
        console.log("error: ", error);
      })
    }
  }

  sendNotification = (msg) => {
    //console.log("msg: ", msg[0].text);
    const messages = this.state.messages;
    const usersList = [];
    if (messages.length > 0) {
      const lastMsg = messages[0];
      lastMsg.usersList.forEach(user => {
        if (user === this.state.userId) return;
        let isActive = false;
        for(let i = 0; i < this.state.actives.length; ++i) {
          if (this.state.actives[i].uid === user) {
            isActive = true;
            break;
          }
        }

        //console.log("<users list actives: ", this.state.actives)

        if (isActive) {
          for(let i = 0; i < this.state.lastSeen.length; ++i) {
            if (this.state.lastSeen[i].id === user) {
              const dateDiff = this.dateTime.getNow() - this.state.lastSeen[i].date;
              //console.log("Othher dste: ", this.dateTime.dateFormattedTimeHours( this.dateTime.newDate(this.state.lastSeen[i].date) ))
              const dateDiffSec = (dateDiff / 1000) / 60;
              //console.log("<dateDiffSec: ", dateDiffSec)
              if (dateDiffSec < (4.0)) {
                return;
              }
            }
          }
        }
        
        usersList.push(user);
      })
    }
    
    const title = "Nouveau message";
    const body = msg[0].text;
    const roomNameToUpdate = this.state.roomName.split("-")[1];
    console.log("New Send Notification From Admin: ", roomNameToUpdate)
    if (usersList.length > 0) {
      this.uPresenter.sendMessageNotification(title, body, roomNameToUpdate, usersList)
      .then(res => {
        console.log("Result Admiin Notification: ", res)
        res.result.forEach(result => {
          console.log("Result User Admiin Notification: ", result)
        })
      })
      .catch(error => {
        console.log("error: ", error);
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 80}} />
        <View style={styles.chatContent} >
          <GiftedChat
            messages={this.state.messages}
            onSend={this.handleSend}
            user={{ _id: this.state.userId }}
          />
        </View>
      </View>
    );
  }
}
