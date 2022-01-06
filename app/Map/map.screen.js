import React from 'react';
import { Text, View, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';

import MapView from 'react-native-maps';
import { Marker, AnimatedRegion } from 'react-native-maps';

import AppStore from '../Flux/AppStore';
import filtersState from './../ProductFilters/filters_state';
import locationState from './../Location/location_state';
import FilterModal from '../UIComponents/Modals/filter.modal';
import ProductsFilter from '../ProductFilters/products_filters.component';
import SelectLocationModal from './../Location/select_location.modal';
import producersState from './../Producers/producers.state';
import navigationState from '../Navigation/navigation.state';
import ProducersPresenter from './../Producers/producers.presenter';
import favState from './../Favourites/favourites.state';
import { Feather } from '@expo/vector-icons'; 

import FiltersPresenter from './../ProductFilters/filters.presenter';

import styles from './../Styles/map.style';
import AppIcons from './../AppIcons/app_icons';

import * as AppActions from "../Flux/AppActions";
import StylesVariables from '../Styles/app.style';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;

const LATITUDE = 46.89101;
const LONGITUDE = 2.65;
const LATITUDE_DELTA = 3.5922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default MapScreen = (props) => {
    
    const ref = React.useRef(null);
    const [modalFilterActive, setModalFilterActive] = React.useState(false);
    const [updated, setUpdated] = React.useState({
        flag: false
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [actualLocation, setActualLocation] = React.useState({
        key: "user-key",
        latitude: LATITUDE,
        longitude: LONGITUDE
    });
    const [markIsPressed, setMarkPressed] = React.useState(false);
    const [modalLocationActive, setModalLocationActive] = React.useState(false);
    const [selectedInfo, setSelectedInfo] = React.useState({
        "id": "",
        "title": "",
        "subtitle": "",
        "time": "",
        "location": "",
        "color": "#fff"
    });
    const [coordinates, setCoordinates] = React.useState([])
    const [region, setRegion] = React.useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });
    
    React.useEffect( () => {

        const OnSelectLocation = () => {
            filtersState.setActiveFilter("location");
            setModalLocationActive(true)
        }
    
        const OnOpenFilters = () => {
            setModalFilterActive(true)
            filtersState.setActiveFilter("categories");
        }

        const location = filtersState.filterLocation === "" ? " ! " : filtersState.filterLocation;
        props.navigation.setOptions({
            OnRightPress: OnOpenFilters,
            OnCenterPress: OnSelectLocation,
            location: `${location} ( ${locationState.getDistance}km )`
        })

        return () => {}

    }, []);

    /*const getAddressLocation = async () => {
        const filtersPresenter = new FiltersPresenter();
        if (filtersState.filterLocation === "") return
        
        const result = await filtersPresenter.geoCodeAddress( filtersState.filterLocation )

        if ( result.info.statuscode === 0 ) {
            //console.log("Lat: ", result.results)
            if ( result.results.length >= 0 ) {
                const resLocation = result.results[0]["locations"][0];
                const lat = resLocation.latLng["lat"];
                const lng = resLocation.latLng["lng"];
                //const lat = 48.86;
                //const lng = 2.341111;
                setActualLocation({
                    key: actualLocation.key,
                    latitude: lat,
                    longitude: lng
                })

                
                setRegion({
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                })
            }
        }
    }
    */

    const getAddressLocation = async () => {
        const filtersPresenter = new FiltersPresenter();
        //console.log("Get Address:: ", filtersState.filterLocation);
        if (filtersState.filterLocation === "") return
        setIsLoading(true);
        const result = await filtersPresenter.geoCodeAddress( filtersState.filterLocation )
        setIsLoading(false);
        //console.log("Res: ", result);
        if ( result.status === 1 ) {
            //console.log("Lat: ", result.results)
            const resLocation = result.result;
            const lat = resLocation["lat"];
            const lng = resLocation["long"];
            //const lat = 48.86;
            //const lng = 2.341111;
            setActualLocation({
                key: actualLocation.key,
                latitude: lat,
                longitude: lng
            })

            
            setRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            })
        }
    }

    const OnApplyFilters = () => {
        const location = filtersState.filterLocation === "" ? " !! " : filtersState.filterLocation;
        props.navigation.setOptions({
            location: `${location} ( ${locationState.getDistance}km )`
        })
        getAddressLocation();
        setUpdated({flag: !updated.flag});
        //OnGetProducers();
        OnCloseMark();
        setModalFilterActive(false)
        getProducers();
    }
    
    React.useEffect( () => {

        const OnFilterUpdated = () => {
            setUpdated({flag: !updated.flag});
            const location = filtersState.filterLocation === "" ? " ! " : filtersState.filterLocation;
            props.navigation.setOptions({
                location: `${location} ( ${locationState.getDistance}km )`
            })
            getAddressLocation();
        }

        AppStore.on("filterUpdated", OnFilterUpdated);

        return () => {
            AppStore.removeListener("filterUpdated", OnFilterUpdated);
        }
    }, []);

    const getProducers = () => {
        const filters = filtersState.getFiltersDataForSearch(locationState.getDistance);
        
        const presenter = new ProducersPresenter();
        presenter.searchByFilters(filters)
        .then(result => {
            if (result.status === 1) {
                const data = presenter.parseItems(result.result, favState.getData);

                AppActions.setProducers({
                    list: data
                })

            } else {

                AppActions.setProducers({
                    list: []
                })

            }
        })
        .catch(error => {
            AppActions.setProducers({
                list: []
            })
        })
    }
    
    const OnGetProducers = () => {
        let newList = producersState.getItems.filter( item => {
            if (typeof item.pickUpAddress.lat !== "undefined") {
                return true;
            }
            return false;
        })

        //console.log("Producers: ", producersState.getItems)
        setCoordinates(newList);
    }

    React.useEffect( () => {

        //OnGetProducers();

        AppStore.on("onProducersGot", OnGetProducers);
        getProducers();
        getAddressLocation();
        return () => {
            AppStore.removeListener("onProducersGot", OnGetProducers);
        }
    }, []);

    const OnRegionChange = () => {

    }

    const animate = () => {
        const newCoordinate = {
          latitude: LATITUDE + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
          longitude: LONGITUDE + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2),
        };
    
        /*
        if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
          }
        } else {
        }
        */
        coordinate.timing(newCoordinate).start();
    }

    const OnMarkPress = (item) => {
        setSelectedInfo({
            id: item.id,
            title: item.title,
            subtitle: item.categories,
            location: item.direction,
            time: item.pickHourTime,
            color: "#"+item.color
        })
        setRegion({
            latitude: item.pickUpAddress.lat,
            longitude: item.pickUpAddress.long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        })
        setMarkPressed(true)
    }

    const OnGoToProducer = () => {
        navigationState.setNextNavigation({
            "route": AppActions.APP_ACTIONS.NAVIGATE_TO_PRODUCER_DETAIL,
            "id": selectedInfo.id
        });
        AppStore.emit(AppActions.APP_ACTIONS.NAVIGATE_TO_PRODUCER_DETAIL);
        props.navigation.navigate("Liste")
    }

    const OnCloseMark = () => {
        setSelectedInfo({
            "id": "",
            "title": "",
            "subtitle": "",
            "time": "",
            "location": "",
            "color": "#fff"
        })
        setMarkPressed(false)
    }

    return (
        <View style={styles.container}>

            <MapView 
                style={styles.map}
                region={region}
                onRegionChange={OnRegionChange}
            >
                <Marker
                    key={actualLocation.key}
                    activeOpacity={0.5}
                    onPress={() => {
                        setRegion({
                            latitude: actualLocation.latitude,
                            longitude: actualLocation.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        })
                    }}
                    coordinate={{
                        latitude: actualLocation.latitude,
                        longitude: actualLocation.longitude
                    }}
                />
                {coordinates.map(item => {
                    return (
                        <Marker
                            key={"map_" + item.id}
                            onPress={() => {
                                OnMarkPress(item)
                            }}
                            activeOpacity={0.5}
                            coordinate={{
                                latitude: item.pickUpAddress.lat,
                                longitude: item.pickUpAddress.long
                            }}
                        >
                            <View style={[styles.markContainer, {backgroundColor: "#"+item.color}, markIsPressed && styles.markActive]} />
                        </Marker>)
                    })
                }
            </MapView>

            {selectedInfo.title !== "" && (
            <View style={styles.mapViewInformation}>
                <View style={styles.mapViewContent}>
                    <TouchableOpacity 
                        style={styles.buttonProducer}
                        activeOpacity={0.5}
                        onPress={OnGoToProducer}
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
                        <View style={styles.rightView}>
                            <Feather name="arrow-right-circle" size={24} color={StylesVariables.textSecundaryColor} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buttonClose}
                        activeOpacity={0.5}
                        onPress={OnCloseMark}
                    >
                        <AppIcons.CloseIcon />
                    </TouchableOpacity>
                </View>
            </View>
            )}

            {isLoading && (
                <View style={{
                    flex: 1,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 50 * StylesVariables.responsiveHeightMulti,
                    backgroundColor: '#CCCCCC77',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size={"large"} color={StylesVariables.blackColor}/>
                </View>
            )}

            <FilterModal 
                activeModal={modalFilterActive}
                title={"Que recherchez-vous ?"}
                onUpdate={updated.flag}
                onCloseModal={() => {
                    setUpdated({flag: !updated.flag});
                    setModalFilterActive(false)
                }}
                filterContent={(
                    <ProductsFilter
                        onUpdate={updated.flag}
                    />
                )}
                onApplyFilters={OnApplyFilters}
            />

            <SelectLocationModal 
                activeModal={modalLocationActive}
                title={"Où cherchez-vous ?"}
                onUpdate={updated.flag}
                onCloseModal={() => {
                    setModalLocationActive(false)
                    setUpdated({flag: !updated.flag});
                    const location = filtersState.filterLocation === "" ? " !! " : filtersState.filterLocation;
                    props.navigation.setOptions({
                        location: `${location} ( ${locationState.getDistance}km )`
                    })
                }}
                onApplyFilters={OnApplyFilters}
            />
        </View>
    )

}