class Message {

    constructor() {
        this.message = "";
        this.listenerStack = [];
        this.listenerOtherStack = [];
        this.withCancel = false;
    }

    setMessage = (val) => {
        this.message = val;
    }

    getMessage = () => {
        return this.message;
    }

    addListener = (func) => {
        this.listenerStack.push(func);
    }

    addListenerOther = (func) => {
        this.listenerOtherStack.push(func);
        this.withCancel = true;
    }

    removeLastListener = () => {
        this.listenerStack.pop();
    }

    removeLastListenerBoth = () => {
        this.listenerStack.pop();
        this.listenerOtherStack.pop();
        this.withCancel = false;
    }

    callListeners = () => {
        this.listenerStack.forEach( func => {
            func();
        });
    }

    callListenersOther = () => {
        this.listenerOtherStack.forEach( func => {
            func();
        });
    }

}

export default new Message();