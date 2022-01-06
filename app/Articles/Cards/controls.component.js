import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons, Fontisto, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import StylesVariables from "../../Styles/app.style";
import LanguageToolTip from "../../AudioPlayer/language.tooltip";
import VolumeTooltip from '../../AudioPlayer/volume.tooltip';

const styles = StyleSheet.create({
  container: {
    backgroundColor: StylesVariables.secondaryColor,
    width: StylesVariables.windowWidth,
  },
  pointer: {
    backgroundColor: StylesVariables.mainColor,
    borderColor: StylesVariables.borderPointerColor,
    borderRadius: 7.5,
    borderWidth: 0.5,
    height: 15 * StylesVariables.responsiveMulti,
    width: 15 * StylesVariables.responsiveMulti,
  },
  backBar: {
    backgroundColor: StylesVariables.mediaBarColor,
    borderRadius: 2.5,
    height: 3 * StylesVariables.responsiveMulti,
  },
  activeBar: {
    alignItems: "flex-end",
    backgroundColor: StylesVariables.mediaActiveBarColor,
    borderRadius: 2.5,
    justifyContent: "center",
    height: 3 * StylesVariables.responsiveMulti,
    position: "absolute",
  },
  duration: {
    ...StylesVariables.appText,
    margin: StylesVariables.spacing,
  },
  btnsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: StylesVariables.spacing / 2,
  },
  icon: {
    height: 20 * StylesVariables.responsiveHeightMulti,
    tintColor: StylesVariables.mainColor,
    width: 20 * StylesVariables.responsiveHeightMulti,
  },
  tooltipContainer: {
    width: 48 * StylesVariables.responsiveMulti,
    height: 36 * StylesVariables.responsiveMulti,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const MediaControls = ({ 
  handlePlayPause, 
  changeLang, 
  isPlaying, 
  isBuffering, 
  selectedLang, 
  volume, 
  onChangeVolume, 
  isMuted,
  OnMute
}) => {

  return (
    <View style={styles.container}>
      <View style={styles.btnsRow}>
        {isBuffering ? (
          <View style={styles.tooltipContainer}>
            <Feather
              name='loader'
              size={styles.icon.height}
              color={styles.icon.tintColor} />
          </View>
        ) : (
            <TouchableOpacity
              style={styles.tooltipContainer}
              onPress={() => handlePlayPause()}
            >
              <Ionicons
                name={isPlaying ? "ios-pause" : "ios-play"}
                size={styles.icon.height}
                color={styles.icon.tintColor}
              />
            </TouchableOpacity>
          )
        }
        {/*<TouchableOpacity
          onPress={() => { }}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/icons/media/undo.png')}
            style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { }}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/icons/media/reload.png')}
            style={styles.icon} />
        </TouchableOpacity>*/}
        <LanguageToolTip onChangeLang={changeLang} selectedLang={selectedLang}>
          <View style={styles.tooltipContainer}>
          <Fontisto
            name="world-o"
            size={styles.icon.height}
            color={styles.icon.tintColor}
          />
          </View>
        </LanguageToolTip>
        <VolumeTooltip onChangeVolume={onChangeVolume} volume={volume} >
          <View style={styles.tooltipContainer}>
            <MaterialCommunityIcons
              name="volume-high"
              size={styles.icon.height}
              color={styles.icon.tintColor}
            />
          </View>
        </VolumeTooltip>
        {isMuted ? 
          (<TouchableOpacity
              onPress={OnMute}
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
              onPress={OnMute}
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
  );
};

export default MediaControls;
