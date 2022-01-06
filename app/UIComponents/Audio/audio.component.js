import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
    },
    audioCont: {
        flexDirection: "row",
    },
    barCont: {
        flex: 7,
        justifyContent:"center",
        marginHorizontal: 10,
    },
    btnPlayCont: {
        flex: 2,
    },
    btnPlayIcon: {
        height: 65 * StylesVariables.responsiveHeightMulti,
        width: 65 * StylesVariables.responsiveMulti,
    },
    bar: {
        height: 15,
        justifyContent: "center",
    },
    audioBar: {
        backgroundColor: StylesVariables.mainColor,
        height: 2,
    },
    seekBar: {
        backgroundColor: StylesVariables.secondaryColor,
        height: 3,
        position: "absolute",
        zIndex: 1,
    },
    pointerBar: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        position: "absolute",
        zIndex: 2,
    },
    pointer: {
        backgroundColor: StylesVariables.secondaryColor,
        borderRadius: 7,
        height: 15,
        width: 15,
    },
    audioLength: {
        ...StylesVariables.appText,
    },
    lengthRow: {
        alignSelf: "center",
        bottom: 0,
        flexDirection: "row",
        position: "absolute",
    },
    label: {
        ...StylesVariables.appText,
    },
    labelCont: {
        alignSelf: 'center',
        marginVertical: 20,
    }
})

const AudioComponent = ({ song, hasLabel = false }) => {
    const [currentLength, setCurrentLength] = useState(0);

    useEffect(() => {
        setCurrentLength(40);
        return () => {}
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.audioCont}>
                <View style={styles.btnPlayCont}>
                    <View style={styles.btnPlayIcon}>
                        <MaterialIcons
                            name="play-circle-filled"
                            size={65}
                            color={StylesVariables.mainColor} />
                    </View>
                </View>
                <View style={styles.barCont}>
                    <View style={styles.bar}>
                        <View style={styles.audioBar} />
                        <View style={[styles.seekBar, { width: `${currentLength}%` }]} />
                        <View style={[styles.pointerBar, { width: `${currentLength}%` }]} >
                            <View style={styles.pointer} />
                        </View>
                    </View>
                    <View style={styles.lengthRow}>
                        <Text style={styles.audioLength}>00:00</Text>
                        <Text style={styles.audioLength}> / </Text>
                        <Text style={styles.audioLength}>00:00</Text>
                    </View>
                </View>
            </View>
            {hasLabel &&
                <View style={styles.labelCont}>
                    <Text style={styles.label}>Ecouter le son enregistré</Text>
                </View>
            }
        </View>
    )
}

export default AudioComponent