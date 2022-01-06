import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { Ionicons, Fontisto, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import { Slider } from 'react-native-elements';
import styles from './audio.styles';

import StylesVariables from './../Styles/app.style';
import LanguageToolTip from './language.tooltip';
import VolumeTooltip from './volume.tooltip';

let defaultVolume = 0;
let isMuted = 0;

export default class MAudioPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            playbackInstance: null,
            sound: null,
            volume: defaultVolume,
            isMuted: isMuted,
            isBuffering: true,
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
            deltaSum: 0
        };
    }

    setAudioConfiguration = () => {
        Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false
        })
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
            this.setAudioConfiguration();
            this.loadAudio();
        } catch (e) {
            console.log(e)
        }
    }

    async componentWillUnmount() {
        this.tickInterval
        clearInterval(this.tickInterval);
        const { playbackInstance } = this.state
        playbackInstance.unloadAsync()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.audioUrl !== this.props.audioUrl) {
            this.loadAudio();
        }

        if (!prevProps.newTime && this.props.newTime) {
            const millis = this.getMillisFromTime(this.props.time);
            /*
            if (this.state.playbackInstance) {
                this.setAudioTimePosition(millis)
                //const { playbackInstance } = this.state
                //playbackInstance.setPositionAsync(millis)
            } else {
            }
            */
            console.log("Millis: ", millis)
            this.lastMillis = millis;
        }
    }

    async loadAudio() {
        const { isPlaying, volume } = this.state

        if (typeof this.props.audioUrl === "undefined" || this.props.audioUrl === "") {
            this.props.showAlert()
            return
        }
        try {
            const playbackInstance = new Audio.Sound()
            const source = {
                uri: this.props.audioUrl
            }

            const status = {
                shouldPlay: isPlaying,
                volume: 1 - volume
            }

            playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)

            const sound = await playbackInstance.loadAsync(source, status, false)
            playbackInstance.setIsMutedAsync(this.state.isMuted)
            this.tickInterval = setInterval(this.tick, 1000 / 10);
            this.setState({
                "playbackInstance": playbackInstance,
                "sound": sound,
                "duration": sound.durationMillis,
                "maxProgressValue": sound.durationMillis,
                "maxProgressValueText": this.getMinSeconds(sound.durationMillis),
                "progressInterval": sound.progressUpdateIntervalMillis,
                "rate": sound.rate,
            })
        } catch (e) {
            console.log(e)
        }
    }

    getMinSeconds = (millis) => {
        const seconds = (millis / 1000);
        const min = seconds / 60;
        let secs = Math.floor(seconds % 60);
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

    onPlaybackStatusUpdate = status => {
        const millis = isNaN(status.positionMillis) ? 0 : status.positionMillis;
        const delta = millis - this.state.lastUpdate
        let deltaSum = this.state.deltaSum + (delta / 1000);
        if (!isNaN(delta) && deltaSum > 5.0) {
            deltaSum = 0;
        }
        if (status.didJustFinish) {
            deltaSum = 0;
            if (this.state.playbackInstance != null) {
                this.state.playbackInstance.stopAsync();
                this.setState({
                    "isBuffering": status.isBuffering,
                    "isPlaying": false,
                    "lastUpdate": 0,
                    "deltaSum": 0
                })
            }
        }
        this.setState({
            "isBuffering": status.isBuffering,
            "lastUpdate": millis,
            "deltaSum": deltaSum
        })

        if (!this.isMoving) {
            this.setAudioTimePosition(status.positionMillis)
        }
    }

    setAudioTimePosition = (millis) => {
        const progressiveValue = isNaN(millis) ? 0 : millis
        this.setState({
            "progressValue": progressiveValue,
            "progressValueText": this.getMinSeconds(progressiveValue)
        })
    }

    handlePlayPause = async () => {
        const { isPlaying, playbackInstance } = this.state
        isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

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

                const { playbackInstance } = this.state
                const soundStatus = await playbackInstance.getStatusAsync()
                if (soundStatus.isBuffering) return;

                playbackInstance.setPositionAsync(this.mMillis)
                    .then(_result => { })
                    .catch(error => {
                        console.log("Set Position Async Error: ", error);
                    })
                this.isMoving = false;
                this.lastTime = 0;
            }
        }

        if (this.lastMillis > 0) {
            const { playbackInstance } = this.state
            const soundStatus = await playbackInstance.getStatusAsync()
            if (soundStatus && soundStatus.isBuffering) return;

            playbackInstance.setPositionAsync(this.lastMillis)
                .then(_result => { })
                .catch(error => {
                    console.log("Set Position Async Error: ", error);
                })
            this.setAudioTimePosition(this.lastMillis);
            this.lastMillis = 0;
        }
    }

    changeVolume = (volume) => {
        this.setState({
            volume: volume
        }, () => {
            const { playbackInstance } = this.state
            if (playbackInstance === null) return
            playbackInstance.setVolumeAsync(1 - volume)
            defaultVolume = volume;
        })
    }

    OnChangeLang = (val) => {
        //if (this.props.playbackInstance == null) return
        this.props.changeLang(val)
        if (this.state.playbackInstance != null) {
            this.state.playbackInstance.stopAsync();
        }
        this.setState({
            "playbackInstance": null,
            "isBuffering": false,
            "isPlaying": false,
            "lastUpdate": 0,
            "deltaSum": 0
        })
    }

    OnMute = () => {
        this.setState({
            isMuted: this.state.isMuted === 1 ? 0 : 1
        }, () => {
            const { playbackInstance } = this.state
            if (playbackInstance === null) return
            playbackInstance.setIsMutedAsync(this.state.isMuted)
            isMuted = this.state.isMuted;
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.duration}>{this.state.progressValueText}</Text>
                <View style={styles.sliderComponent}>
                    <Slider
                        thumbStyle={styles.thumbStyle}
                        minimumTrackTintColor={styles.activeTrack.backgroundColor}
                        maximumTrackTintColor={styles.track.backgroundColor}
                        trackStyle={styles.track}
                        disabled={this.state.isBuffering}
                        onValueChange={this.OnValueChange}
                        thumbTintColor={StylesVariables.secondaryColor}
                        value={this.state.progressValue}
                        maximumValue={this.state.maxProgressValue}
                    />
                </View>
                <View style={styles.btnsRow}>
                    {this.state.isBuffering ? (
                        <View style={styles.tooltipContainer}>
                        <Feather
                            name='loader'
                            size={styles.icon.height}
                            color={styles.icon.tintColor} />
                        </View>
                    ) : (
                            <TouchableOpacity
                                style={styles.tooltipContainer}
                                onPress={() => this.handlePlayPause()}
                            >
                                <Ionicons
                                    name={this.state.isPlaying ? "ios-pause" : "ios-play"}
                                    size={styles.icon.height}
                                    color={styles.icon.tintColor}
                                />
                            </TouchableOpacity>
                        )
                    }
                    {/* <TouchableOpacity
                        onPress={() => { }}>
                        <Image
                            resizeMode="contain"
                            source={require('../../assets/icons/media/undo.png')}
                            style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}>
                        <Image
                            resizeMode="contain"
                            source={require('../../assets/icons/media/reload.png')}
                            style={styles.icon} />
                    </TouchableOpacity> */}
                    <LanguageToolTip
                        onChangeLang={this.OnChangeLang} 
                        selectedLang={this.props.selectedLang}
                    >
                        <View style={styles.tooltipContainer}>
                        <Fontisto
                            name="world-o"
                            size={styles.icon.height}
                            color={styles.icon.tintColor}
                        />
                        </View>
                    </LanguageToolTip>
                    <VolumeTooltip
                        onChangeVolume={this.changeVolume}
                        volume={this.state.volume}>
                        <View style={styles.tooltipContainer}>
                        <MaterialCommunityIcons
                            name="volume-high"
                            size={styles.icon.height}
                            color={styles.icon.tintColor}
                        />
                        </View>
                    </VolumeTooltip>
                    {this.state.isMuted ? 
                    (<TouchableOpacity
                        onPress={this.OnMute}
                        style={styles.tooltipContainer}
                    >
                        <View>
                            <MaterialCommunityIcons
                                name="volume-mute"
                                size={styles.icon.height}
                                color={styles.icon.tintColor}
                            />
                        </View>
                    </TouchableOpacity>) 
                    :
                    (<TouchableOpacity
                        onPress={this.OnMute}
                        style={styles.tooltipContainer}
                    >
                        <View>
                            <MaterialCommunityIcons
                                name="volume-variant-off"
                                size={styles.icon.height}
                                color={styles.icon.tintColor}
                            />
                        </View>
                    </TouchableOpacity>)
                    }
                </View>
            </View>
        )
    }
}