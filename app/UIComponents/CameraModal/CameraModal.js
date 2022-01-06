import React, { useState, useRef, useEffect } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, Text, StyleSheet } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import StylesVariables from './../../Styles/app.style';
import styles from './../../Styles/modal_filter.style';
import { SafeAreaView } from 'react-native-safe-area-context'
import FilterItem from '../FilterItem/FilterItem.component'
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import MVideoPlayer from '../../VideoPlayer/MVideoPlayer'
import FileModel from '../../ImagePicker/File.model'

const FilterModal = ({ 
    activeModal,  
    onCloseModal,  
    filters,
    video,
    setVideo,
    typeVideo,
    sendVideo
    }) => {
    
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [recording, setRecording] = useState(false);
    const [cameraRef, setCameraRef] = useState(null);
    
            
    if (video.length !== 0) {
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={activeModal}
                onRequestClose={() => { 
                    onCloseModal();
                }}
            >
                <MVideoPlayer
                    videoUrl={ video[0].file }
                    withClose={true}
                    mode={"contain"}
                    onClose={() => { setVideo(typeVideo, []) }}
                    closeAll={sendVideo}
                />
            </Modal>
        )
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={activeModal}
            onRequestClose={() => { 
                onCloseModal();
            }}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.head}>
                        <View style={styles.asideContainer} />
                        <View style={styles.contentC}>
                        </View>
                        <View style={styles.asideContainer}>
                            <TouchableOpacity 
                                style={styles.closeButton}
                                onPress={onCloseModal}
                            >
                                <AntDesign name='close' size={42} color={StylesVariables.mainColor} />
                            </TouchableOpacity>
                        </View>
                    </View> 
                    <Camera
                        ref={ref => {
                            setCameraRef(ref) ;
                        }}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            padding: 10,
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <View
                            style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}
                        >
                            <View
                                style={{flex: .2}}
                            >
                                <TouchableOpacity
                                    onPress={onCloseModal}
                                >
                                    <AntDesign name="caretleft" size={40} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{flex: .6, alignItems: 'center'}}
                            >
                                <TouchableOpacity
                                    onPress={async ()=> {
                                        if(!recording){
                                            const permi = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
                                            console.log(permi)
                                            if(permi.status == 'granted'){
                                                setRecording(true)
                                                let vid = await cameraRef.recordAsync (); 
                                                console.log(vid)
                                                setVideo(typeVideo, [ FileModel.newWithValues(vid.uri) ])
                                            }
                                        }else {
                                            setRecording (false) 
                                            cameraRef.stopRecording () 
                                        }
                                    }}
                                >
                                    <View
                                        style={{
                                        width: 50, 
                                        height: 50, 
                                        borderRadius: 50, 
                                        backgroundColor: !recording ? 'white' : 'red' }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{flex: .2, alignItems: 'center'}}
                            >
                                <TouchableOpacity
                                    onPress={()=> {
                                        setType(
                                            type === Camera.Constants.Type.back
                                              ? Camera.Constants.Type.front
                                              : Camera.Constants.Type.back
                                          );
                                    }}
                                >
                                    <Ionicons 
                                        name="camera-reverse-outline" 
                                        size={24} 
                                        color="white" 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Camera>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default FilterModal;

const currentStyles = StyleSheet.create({
    column: {
        flex: 1,
        padding: 3
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    textButton: {
        ...StylesVariables.appText,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
})
