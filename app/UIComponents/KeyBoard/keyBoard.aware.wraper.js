import React, {useEffect, useState, createRef} from 'react';
import { ScrollView } from 'react-native';
import { Keyboard, Animated, Easing } from 'react-native';

const KeyBoardAware = ({ children, scrollStyle, onFocusIndex }) => {
    const scrollRef = React.useRef(null);
    const [bottomPadding, setBottomPadding] = useState(0);
    const [keyboardHeight, setKeyboardHeight] = useState(new Animated.Value(5))

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', onKeyboardShow);
        Keyboard.addListener('keyboardDidHide', onKeyboardHide);
        return () => {
            Keyboard.removeListener("keyboardDidHide", onKeyboardShow);
            Keyboard.removeListener("keyboardDidShow", onKeyboardHide);
        }
    }, [])

    const onKeyboardHide = (e) => {
        Animated.parallel([
            Animated.timing(keyboardHeight, {
              duration: e.duration,
              toValue: 5,
              useNativeDriver: true
            })
          ]).start();
          setBottomPadding(0)
    }

    const onKeyboardShow = (e) => {
        Animated.parallel([
            Animated.timing(keyboardHeight, {
              duration: e.duration,
              easing: Easing.back(),
              toValue: e.endCoordinates.height,
              useNativeDriver: true
            })
          ]).start( () => {
        });
        setBottomPadding(e.endCoordinates.height + 10)
    }

    React.useEffect( () => {
        setTimeout(() => {
            scrollRef.current.scrollTo({x: 0, y: (onFocusIndex * 60)})
        }, 50)
    }, [onFocusIndex, bottomPadding])

    return (
        <Animated.View style={{flex: 1}}>
                <ScrollView
                    style={scrollStyle}
                    keyboardDismissMode={"interactive"}
                    contentContainerStyle={{paddingBottom: bottomPadding}}
                    ref={scrollRef} 
                >
                    {children}
                </ScrollView>
        </Animated.View>
    )
}

export default KeyBoardAware
