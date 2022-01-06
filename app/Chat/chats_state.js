import DateTime from "../DateTime/date_time";

class ChatsState {

    constructor() {
        this.threads = ["THREAD_01", "THREAD_02", "THREAD_GROUP"];
        this.usersList = [];
        this.dateTime = new DateTime();
        this.lastSeen = [];
        this.meLastSeen = {};
        this.lastSeenList = [];
        this.chats = this.threads.map(val => {
            return {
                name: val,
                data: []
            }
        });
        this.isChatFlash = false;
        this.chatFlashInfo = {};
        this.chatsAdmin = {};
        this.admins = [];
        this.threadIds = [];
    }

    meLastSeenMsg(roomId) {
        return typeof this.meLastSeen[roomId] !== "undefined" ? this.meLastSeen[roomId] : "";
    }

    setLastSeenMsgMe(msg, roomId) {
        this.meLastSeen[roomId] = msg;
    }

    getIsChatFlash = () => {
        return this.isChatFlash;
    }

    getChatFlashInfo = () => {
        return this.chatFlashInfo;
    }

    setChatFlash = (info) => {
        this.isChatFlash = true;
        this.chatFlashInfo = Object.assign({}, info);
        //console.log("CHat Flash Info:: ", this.chatFlashInfo)
    }

    resetChatFlash = () => {
        this.isChatFlash = false;
        this.chatFlashInfo = {};
    }

    setAdmins = list => {
        this.admins = list;
    }

    getThreadId = (roomIndex) => {
        const roomName = this.threads[roomIndex];
        let toReturn = null;
        this.threadIds.forEach(obj => {
            if (obj.key === roomName) {
                toReturn = obj.threadId;
            }
        })
        return toReturn;
    }

    getThreadIdAdmin = (roomName) => {
        let toReturn = null;
        this.threadIds.forEach(obj => {
            if (obj.key === roomName) {
                toReturn = obj.threadId;
            }
        })
        return toReturn;
    }

    setThreadId = (threadId, roomName) => {
        const newList = [];
        this.threadIds.forEach(obj => {
            if (obj.threadId === threadId) return
            newList.push(obj);
        })
        newList.push({
            "key": roomName,
            "threadId": threadId
        });
        this.threadIds = newList;
    }

    setLastSeenList = (obj, roomName) => {
        const newList = [];
        this.lastSeenList.forEach(item => {
            if (item.key === roomName) return;
            newList.push(item);
        })
        newList.push({key: roomName, data: obj});
        this.lastSeenList = newList;
    }

    setLastSeen = (obj, roomName) => {
        const newList = [];
        this.lastSeen.forEach(item => {
            if (item.key === roomName) return;
            newList.push(item);
        })
        newList.push({key: roomName, data: obj});
        this.lastSeen = newList;
    }

    setLastSeenAtBeginning = (list, roomName, uid) => {

        const obj = {
            id: uid,
            last: "",
            date: this.dateTime.getNow()
        }
        
        list.forEach(element => {
            if (element.id === obj.id) {
                obj.last = element.last;
            }
        });

        this.setLastSeen(obj, roomName);
    }

    setUserList = obj => {
        this.usersList = obj;
    }

    chatsMessages = (index) => {
        const newList = [];
        this.chats[index].data.forEach((item, index) => {
            newList.push(item);
        })

        return newList;
    }

    getLastMessageAdmin = (roomName, docId) => {
        const newList = [];
        if (typeof this.chatsAdmin[roomName] !== "undefined") {
            if (this.chatsAdmin[roomName].data.length > 0) {
                newList.push(this.chatsAdmin[roomName].data[0]);
            }
        }

        let lastMessage = null;
        if (newList.length > 0) {
            const item = newList[0];
            const lastSeeenList = this.lastSeen;
            lastSeeenList.forEach(obj => {
                if (obj.key === roomName) {
                    const lastSeeen = obj.data;
                    if (item.id !== lastSeeen.last) {
                        lastSeeen.last = item.id;
                        lastSeeen.date = this.dateTime.getNow();
                        this.setLastSeen(lastSeeen, roomName);
                        lastMessage = Object.assign({}, lastSeeen);
                    }
                }
            })
        }
        return lastMessage;
    }

    getLastMessageOtherAdmin = (roomName) => {
        let lastMessage = null;
        const lastSeeenList = this.lastSeenList;
        //console.log("this.lastSeenList", this.lastSeenList)
        lastSeeenList.forEach(obj => {
            if (obj.key === roomName) {
                lastMessage = obj.data;
            }
        });

        //console.log("Last Message: ", lastMessage)
        return lastMessage;
    }

    getLastMessageOther = (index) => {
        //console.log("Indexx: ", index)
        let lastMessage = null;
        const roomName = this.threads[index];
        const lastSeeenList = this.lastSeenList;
        lastSeeenList.forEach(obj => {
            if (obj.key === roomName) {
                lastMessage = obj.data;
            }
        });
        //console.log("Last message you: ", lastMessage)
        return lastMessage;
    }

    getLastMessage = (index) => {
        const newList = [];
        if (this.chats[index].data.length > 0) {
            newList.push(this.chats[index].data[0]);
        }

        const roomName = this.threads[index];

        let lastMessage = null;
        if (newList.length > 0) {
            const item = newList[0];
            const lastSeeenList = this.lastSeen;
            lastSeeenList.forEach(obj => {
                if (obj.key === roomName) {
                    const lastSeeen = obj.data;
                    if (item.id !== lastSeeen.last) {
                        lastSeeen.last = item.id;
                        lastSeeen.date = this.dateTime.getNow();
                        this.setLastSeen(lastSeeen, roomName);
                        lastMessage = Object.assign({}, lastSeeen);
                    }
                }
            })
        }
        return lastMessage;
    }

    chatsMessagesAdmin = (roomName) => {
        const newList = [];
        let docId = "-";
        if (typeof this.chatsAdmin[roomName] !== "undefined") {
            docId = this.chatsAdmin[roomName].doc;
            this.chatsAdmin[roomName].data.forEach((item, index) => {
                newList.push(item);
            })
        }

        return {
            docId: docId,
            list: newList
        };
    }

    get chatsMessagesInList() {
        const newList = [];
        this.chats.forEach((item, index) => {
            const roomName = this.threads[index];
            const lastSeen = this.lastSeen.filter(val => val.key === roomName);
            if (item.data.length > 0) {
                let seen = false;
                if (lastSeen.length > 0) {
                    if (lastSeen[0].data.last === item.data[0].id) {
                        seen = true;
                    }
                }
                newList.push({
                    roomName: item.data[0].id,
                    seen: seen,
                    ...item.data[0],
                    notSeen: !seen,
                });
            } else {
                newList.push({
                    id: "Thread_" + index
                });
            }

        })
        return newList;
    }

    get chatsMessagesInListAdmin() {
        const newList = [];
        Object.keys(this.chatsAdmin).forEach(key => {
            const item = this.chatsAdmin[key];
            //console.log("IItem: ", item);
            if (item.data.length > 0) {
                const element = item.data[0];
                const lastSeen = this.lastSeen.filter(val => val.key === key);
                element.title = "";
                element.users = [];
                if (element.usersList.length > 0) {
                    element.usersList.forEach(val => {
                        this.usersList.forEach(user => {
                            if (user.id === val) {
                                
                                element.title += user.name + " " + user.lastName;
                                element.users.push(user)
                            }
                        })
                    })
                }
                const after = element.index === 2 ? " / Groupe" : "";
                element.title += after;
                let seen = false;
                if (lastSeen.length > 0) {
                    if (lastSeen[0].data.last === element.id) {
                        seen = true;
                    }
                }
                newList.push({
                    roomName: key,
                    seen: seen,
                    ...element,
                    notSeen: !seen,
                });
            } else {

                newList.push({
                    id: item.name
                });
            }
            
        })

        return newList.sort((a, b) => b.date - a.date);
    }

    setChats = obj => {
        const newList = this.chats.map(item => {
            if (obj.name === item.name) {
                item.data = obj.data;
            }

            return item;
        })

        this.chats = newList;
    }

    setChatsAdmin = obj => {
        if (typeof this.chatsAdmin[obj.name] === "undefined") {
            this.chatsAdmin[obj.name] = {
                name: obj.name,
                doc: obj.doc,
                data: obj.data
            }
        } else {
            this.chatsAdmin[obj.name] = {
                name: obj.name,
                doc: obj.doc,
                data: obj.data
            }
        }
    }

};

const chatsState = new ChatsState();
export default chatsState;