import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { Slider } from 'react-native-elements';
import { Audio } from 'expo-av'
import { Entypo } from '@expo/vector-icons';

import MRecordAudio from './MRecordAudio';
import Messages from './../Message/message';
import AppStore from './../Flux/AppStore';
import * as AppActions from "./../Flux/AppActions";
import FileModel from './../ImagePicker/File.model';
import Localization from './../Localization/localization';

import StylesVariables from './../Styles/app.style';

export default class RecordAudioComponent extends React.Component {
    
    recording = new Audio.Recording();
    sound = null;
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            playbackInstance: null,
            volume: 1.0,
            isBuffering: false,
            duration: 0,
            progressInterval: 0,
            rate: 0,
            progressValue: 0,
            progressValueText: "0:0",
            progress: '',
            maxProgressValue: 10,
            maxProgressValueText: "0:0",
            minProgressValue: 0,
            isFirstPlay: true,
            lastUpdate: 0,

            file: FileModel.new(),
            isRecording: false,
            recorded: false,
            result: null,
            recordedAudio: null,
            sound: null,

            recordingPermissions: false,
            deltaSum: 0
        };

        this.recordAudio = new MRecordAudio();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.newTime && this.props.newTime) {
            const millis = this.getMillisFromTime(this.props.time);

            console.log("Millis: ", millis)
            this.lastMillis = millis;
        }
    }
    
    setAudioConfiguration = () => {
        
    }

    getMillisFromTime = (time) => {
        let millis = 0;
        millis += time["minute"] * 60;
        millis += time["second"];
        millis *= 1000;
        return millis;
    }

	async componentDidMount() {
		try {
            //this.loadAudio();
            this.recordAudio.startAudio();
            this.askForPermissions();
		} catch (e) {
			console.log(e)
		}
    }

    askForPermissions = () => {
        this.recordAudio.getPermissionAsync()
        .then(async (res) =>  {
            if (res.error) {
                //CloseSelectImgModal();
                Messages.setMessage(res.message);
                AppActions.displayMessageMin(true);
                this.props.onBack();
            } else if(res.success) {

                const status = await this.recording.getStatusAsync()
                //console.log({ stat: status })
                if (this.recording !== null) {
                    //this.recording.setOnRecordingStatusUpdate(null);
                    //await this.recording.stopAndUnloadAsync(null);
                    //this.recording = null;
                    //let audio = new Audio.Recording();
                }

                let audio = this.recording;
                
                await audio.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);
                this.recording = audio;
                await audio.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                this.recording = audio;
            }
        })
        .catch(err => {
            console.log("Error: ", err)
            /*
            AppStore.emit("displayToast", {
                message: Localization.sentence("error") + " !",
                type: 2
            });
            */
            //this.props.onBack();
        })
    }

    _updateScreenForRecordingStatus = (status) => {
        console.log("Status: ", status)
        if (status.canRecord) {
          this.setState({
            isRecording: status.isRecording,
            duration: status.durationMillis,
            durationRecording: this.getMinSeconds(status.durationMillis)
          });
        } else if (status.isDoneRecording) {
          this.setState({
            isRecording: false,
            duration: status.durationMillis,
            durationRecording: this.getMinSeconds(status.durationMillis)
          });
        }
    };
    
    async componentWillUnmount() {
        this.tickInterval
        clearInterval(this.tickInterval);
        const playbackInstance = this.sound
        if (playbackInstance !== null) {
            playbackInstance.unloadAsync()
        }
        const result = await this.recording.stopAndUnloadAsync();
        console.log("REs: ", result)
    }

    startRecording = async () => {

        try {
            this.setState({
                isBuffering: true
            })
            let sound = this.recording;
            await sound.startAsync();
            this.setState({ 
                isRecording: true,
                isBuffering: false
            })
        // You are now recording!
        } catch (error) {
            console.log("Error: ", error)
            this.setState({
                isRecording: false,
                isBuffering: false
            })
            
            AppStore.emit("displayToast", {
                message: Localization.sentence("error") + " !",
                type: 2
            });
        // An error occurred!
        }
    }

    stopRecording = async () => {

        try {
            this.setState({
                isBuffering: true
            })
            const result = await this.recording.stopAndUnloadAsync();
            const recordedAudio = this.recording.getURI();
            const { sound, status } = await this.recording.createNewLoadedSoundAsync(
                {
                    isLooping: false,
                    isMuted: false,
                    volume: this.state.volume
                  },
                  this._updateScreenForSoundStatus            
            );
            this.sound = sound;
            //console.log("AAudio: ", this.sound)
            this.setState({
                isRecording: false,
                recorded: true,
                result: result,
                isBuffering: false,
                recordedAudio: recordedAudio,
                "duration": result.durationMillis,
                "maxProgressValue": result.durationMillis,
                "maxProgressValueText": this.getMinSeconds(result.durationMillis),
                "progressInterval": 0
            })

            this.setAudioData(recordedAudio);

            this.tickInterval = setInterval(this.tick, 1000/10);
        // You are now recording!
        } catch (error) {
            console.log("ERRO STOP: ", error)
            AppStore.emit("displayToast", {
                message: Localization.sentence("error") + " !",
                type: 2
            });
            this.setState({
                isRecording: false,
                recorded: false,
                isBuffering: false
            })
        // An error occurred!
        }
    }

    setAudioData = (file) => {
        const fileModel = FileModel.newWithValues(file);
        this.setState({
            'file': fileModel
        });
        this.props.onFinish(fileModel)
    }

    _updateScreenForSoundStatus = (status) => {
        if (status.isLoaded) {
            const millis = isNaN(status.positionMillis) ? 0 : status.positionMillis;
            const delta = millis - this.state.lastUpdate
            let deltaSum = this.state.deltaSum + (delta/1000);
            
            this.setState({
                "isBuffering": status.isBuffering,
                "lastUpdate": millis,
                "deltaSum": deltaSum
            })

            if (status.didJustFinish) {
                deltaSum = 0;
                if (this.sound != null) {
                    this.sound.stopAsync();
                    this.setState({
                        "isBuffering": false,
                        "isPlaying": false,
                        "lastUpdate": 0,
                        "deltaSum": 0
                    })
                }
                //this.props.onComplete(this.state.sound);
            }

            //this.setAudioTimePosition(status.positionMillis)
            if (!this.isMoving) {
                this.setAudioTimePosition(status.positionMillis)
            }
        }
    };

    setAudioTimePosition = (millis) => {
        const progressiveValue = isNaN(millis) ? 0 : millis
		this.setState({
            "progressValue": progressiveValue,
            "progressValueText": this.getMinSeconds(progressiveValue)
		})
    }

    getMinSeconds = (millis) => {
        const seconds = (millis / 1000);
        const min = seconds / 60;
        let secs =  Math.floor(seconds % 60);
        secs = secs < 10 ? "0" + secs : secs;
        return Math.floor(min) + ":" + secs;
    }

    getHourMinSeconds = (millis) => {
        const seconds = (millis / 1000);
        const min = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return {
            "hour": 0,
            "minute": min,
            "second": secs
        }
    }

    handlePlayPause = async () => {
		const { isPlaying } = this.state
		isPlaying ? await this.sound.pauseAsync() : await this.sound.playAsync()
        
		this.setState({
            isPlaying: !isPlaying,
            isFirstPlay: false
        })
    }

    isMoving = false;
    mTimeOut = null;
    mMillis = 0;
    lastMillis = 0;

    OnValueChange = async millis => {
        if (!this.isMoving) {
            this.isMoving = true;
            this.lastTime = Date.now();
        }
        this.mMillis = millis;
    }

    lastTime = 0;
    deltaTime = 0;

    tick = async (e) => {
        if (this.isMoving) {
            const deltaTime = Date.now() - this.lastTime;
            if (deltaTime > 400) {
                this.setAudioTimePosition(this.mMillis);

                const playbackInstance = this.sound
                const soundStatus = await playbackInstance.getStatusAsync()
                if (soundStatus.isBuffering) return;
            
                playbackInstance.setPositionAsync(this.mMillis)
                .then(_result => {})
                .catch(error => {
                    console.log("Set Position Async Error: ", error);
                })
                this.isMoving = false;
                this.lastTime = 0;
            }
        }

        if (this.lastMillis > 0) {
            const playbackInstance = this.sound
            const soundStatus = await playbackInstance.getStatusAsync()
            if (soundStatus && soundStatus.isBuffering) return;
        
            playbackInstance.setPositionAsync(this.lastMillis)
            .then(_result => {})
            .catch(error => {
                console.log("Set Position Async Error: ", error);
            })
            this.setAudioTimePosition(this.lastMillis);
            this.lastMillis = 0;
        }
    }

	render() {
		return (
			<View style={styles.container}>
                <View style={styles.innerEmpty}></View>
                <View style={styles.innerEmpty}></View>
				<View style={styles.controls}>
                    <View style={styles.controlContent}>
                        {this.state.isBuffering && 
                        (<View style={styles.control}>
                                <Feather name='loader' size={42} color={StylesVariables.blueColor} />
                        </View>
                        )}
                        {!this.state.isRecording && 
                        !this.state.recorded && 
                        !this.state.isBuffering && 
                        (<TouchableOpacity 
                            style={styles.control}
                            activeOpacity={0.5}
                            onPress={this.startRecording}
                        >
                            <View style={styles.recordContainer}>
                                <Entypo name="controller-record" size={24} color={StylesVariables.blueColor} />
                            </View>
                        </TouchableOpacity>
                        )}
                        {this.state.isRecording && 
                        !this.state.recorded && 
                        !this.state.isBuffering && 
                        (<TouchableOpacity 
                            style={styles.control}
                            activeOpacity={0.5}
                            onPress={this.stopRecording}
                        >
                            <View style={[styles.recordContainer, styles.recordStarted]}>
                                <Entypo name="controller-record" size={24} color={StylesVariables.redColor} />
                            </View>
                        </TouchableOpacity>
                        )}
                        {!this.state.isRecording && 
                        this.state.recorded && 
                        !this.state.isBuffering && 
                        (<TouchableOpacity 
                            style={styles.control} 
                            onPress={this.handlePlayPause}
                            activeOpacity={0.5}
                        >
                            {this.state.isPlaying ? (
                                <MaterialIcons name='pause' size={32} color={StylesVariables.blueColor} />
                                ) : (
                                <MaterialIcons name='play-circle-outline' size={48} color={StylesVariables.blueColor} />
                            )}
                        </TouchableOpacity>)}
                    </View>
                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderComponent}>
                            <Slider
                                thumbStyle={{ height: 21, width: 21}}
                                disabled={this.state.isBuffering}
                                onValueChange={this.OnValueChange}
                                thumbTintColor={StylesVariables.secondaryColor}
                                value={this.state.progressValue}
                                maximumValue={this.state.maxProgressValue}
                            />
                        </View>
                        {!this.state.isRecording && <View style={styles.audioTexts}>
                            <Text style={styles.progressText}>{this.state.progressValueText}</Text>
                            <Text style={[styles.progressText, styles.middleText]}>{"/"}</Text>
                            <Text style={styles.progressText}>{this.state.maxProgressValueText}</Text>
                        </View>}
                        {this.state.isRecording && <View style={styles.audioTexts}>
                            <Text style={styles.progressText}>{this.state.durationRecording}</Text>
                        </View>}
                    </View>
				</View>
                <View style={styles.innerEmpty}></View>
                <View style={styles.innerEmpty}></View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
        height: 160 * StylesVariables.responsiveHeightMulti,
        marginHorizontal: StylesVariables.spacing * 2,
        justifyContent: 'center',
    },
    innerEmpty: {
        flex: 1,
        height: StylesVariables.spacing * StylesVariables.responsiveMulti
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    controlContent: {
        flex: 1,
        justifyContent: 'center',
        height: 70 * StylesVariables.responsiveMulti,
    },
	control: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    recordContainer: {
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderRadius: 40,
        borderColor: StylesVariables.blueColor,
        borderWidth: 3.5,
        alignItems: 'center'
    },
    recordStarted: {
        borderColor: StylesVariables.redColor
    },
    sliderContainer: {
        flex: 3,
        justifyContent: 'space-around',
    },
    sliderComponent: {
        flex: 1,
        justifyContent: 'center',
        height: 70 * StylesVariables.responsiveMulti
    },
    sliderTop: {
        flex: 1
    },
    audioTexts: {
        flex: 1,
        position: 'absolute',
        bottom: StylesVariables.spacing * 0,
        left: StylesVariables.spacing * StylesVariables.responsiveMulti,
        marginHorizontal: StylesVariables.spacing * StylesVariables.responsiveMulti,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    progressText: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 1,
        textAlign: 'justify',
        color: StylesVariables.textColor
    },
    middleText: {
        marginHorizontal: 4
    }
})
