import React from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import AppStore from '../Flux/AppStore';

import StylesVariables from './../Styles/app.style';
import styles from './../Styles/map.style';
import AppIcons from './../AppIcons/app_icons';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;

const LATITUDE = 46.89101;
const LONGITUDE = 2.65;
const LATITUDE_DELTA = 0.1922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = (props) => {
    
    const [coordinate, setCoordinate] = React.useState({
        latitude: props.lat,
        longitude: props.long
    })
    const [region, setRegion] = React.useState({
        latitude: props.lat,
        longitude: props.long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });

    React.useEffect(() => {
        setCoordinate({
            latitude: props.lat,
            longitude: props.long
        })

        setRegion({
            latitude: props.lat,
            longitude: props.long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        })
    }, [props.lat, props.long])

    const OnRegionChange = () => {}

    return (
        <View style={styles.container}>

            <MapView 
                style={styles.map}
                region={region}
                onRegionChange={OnRegionChange}
            >
                <Marker
                    activeOpacity={0.5}
                    coordinate={coordinate}
                />
            </MapView>

            {/*(
            <View style={styles.mapViewInformation}>
                <View style={styles.mapViewContent}>
                    <View 
                        style={styles.displayProducer}
                    >
                        <Text style={[styles.subtitleText, {color: selectedInfo.color}]}>{selectedInfo.subtitle}</Text>
                        <Text style={styles.titleText}>{selectedInfo.title}</Text>
                        <View style={styles.inlineIconText}>
                            <AppIcons.ImageLocation />
                            <Text style={styles.inlineText}>{selectedInfo.location}</Text>
                        </View>
                        <View style={styles.inlineIconText}>
                            <AppIcons.ImageTime />
                            <Text style={styles.inlineText}>{selectedInfo.time}</Text>
                        </View>
                    </View>
                </View>
            </View>
            )*/}
        </View>
    )

}

export default MapScreen;