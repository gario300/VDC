import { Platform, Keyboard } from 'react-native';

class MKeyBoard {

    constructor() {
        this.isiOS = Platform.OS === 'ios' ? true : false;
    }

    addKeyboardListener(ctx) {
        if (this.isiOS) {
            ctx.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', ctx.keyboardWillShow);
            ctx.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', ctx.keyboardWillHide);
        } else {
            ctx.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', ctx.keyboardWillShow);
            ctx.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', ctx.keyboardWillHide);
        }
    }    

    removeKeyboardListener(ctx) {
        ctx.keyboardWillShowSub.remove();
        ctx.keyboardWillHideSub.remove();
    }

    eventDuration(event) {
        return this.isiOS ? event.duration : 100;
    }
    
}

export default new MKeyBoard();