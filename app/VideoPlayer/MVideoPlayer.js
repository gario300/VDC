import React, { createRef, useReducer, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import { AntDesign, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './video.styles';
import NormalButton from '../UIComponents/Button/normal_button.component'
const reducer = (prevState, action) => {
    switch(action.type) {
        case 'PLAY': 
            return { ...prevState, isPlaying: true }
        case 'PAUSE':
            return { ...prevState, isPlaying: false }
        case 'BUFFERING_END':
            return { ...prevState, isBuffering: false}
    }
}

const MVideoPlayer = ({videoUrl, videoStyle, startPlaying, onStatusUpdate, finished, volume, mode, withClose, onClose, isMuted, closeAll}) => {
    const [state, dispatch] = useReducer(reducer, {isPlaying: false, isBuffering: true})
    let videoRef = createRef();

    useEffect(() => {
        dispatch({type: 'BUFFERING_END'})
        return () => {}
    }, [])

    const handlePlayPause = () => {
        dispatch({
            type: state.isPlaying ? 'PAUSE' : 'PLAY',
        })
    }

    useEffect(() => {
        videoRef.stopAsync()
    }, [finished])

    useEffect(() => {
        if (startPlaying) {
            //videoRef.startPlaying()
            //state.isPlaying
            dispatch({
                type: 'PLAY',
            })
        } else {
            dispatch({
                type: 'PAUSE',
            })
        }
    }, [startPlaying])

    const OnLoadStart = () => {

    }

    return (
        <View style={[styles.videoMain]}>
            <ScrollView>
                <View
                    style={styles.header}
                >
                    <View
                        style={{flex: .15}}
                    >
                        {withClose && (
                            <TouchableOpacity 
                                onPress={onClose}
                                activeOpacity={0.5}>
                                <AntDesign name="close" size={32} color={"gray"} />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{flex: .7, alignItems: 'center'}}>
                        <Text
                            style={styles.headerText}
                        >
                            Protection Acheteur
                        </Text>
                    </View>
                    <View style={{flex: .15, alignItems: 'flex-end'}}> 
                    </View>
                </View>
                <View
                    style={styles.body}
                >
                    <Video
                        shouldPlay={state.isPlaying}
                        source={{uri: videoUrl}}
                        rate={1.0}
                        volume={volume}
                        onLoadStart={OnLoadStart}
                        onPlaybackStatusUpdate={onStatusUpdate}
                        resizeMode={mode}
                        withClose={true}
                        isMuted={isMuted}
                        useNativeControls={true}
                        style={styles.videoPlayer}
                        ref={ref => videoRef = ref} 
                    />
                    <View
                        style={{width: '100%', alignItems: 'center', paddingVertical: 12}}
                    >
                        <TouchableOpacity
                            onPress={onClose}
                        >
                            <Text
                                style={{...styles.headerText, textDecorationLine: 'underline'}}
                            >
                                Voir la vidéo
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{width: '100%', alignItems: 'center', padding: 3, height: 50}}
                    >
                        <NormalButton
                            title={'Enregistrer définitivement'}
                            callback={()=>{
                                closeAll()
                            }}
                            themeName={"secundary"}
                        /> 
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default MVideoPlayer
