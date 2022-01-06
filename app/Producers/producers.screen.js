import React from 'react';
import { Text, View, ActivityIndicator, AppState, Alert, Platform, Image, TouchableOpacity, Linking } from 'react-native';
import { Notifications } from 'expo';

import ElementsListFetch from './../UIComponents/ElementsList/elements_list_fetch.component';

import AppStore from '../Flux/AppStore';

import ProducerCard from './producer_card.component';
import ProducersSearch from './producers_search.component';
import ProducerPresenter from './producers.presenter';

import WebApiConfig from './../WebApiConnection/web_api_connection.config';

import styles from '../Styles/products.style';
import myAppState from '../AppState/app_state';

import RoundedButton from './../UIComponents/Button/button_rounded.component';
import FilterModal from '../UIComponents/Modals/filter.modal';
import ProductsFilter from '../ProductFilters/products_filters.component';
import filtersState from './../ProductFilters/filters_state';
import locationState from './../Location/location_state';
import producersState from './producers.state';

import SelectLocationModal from './../Location/select_location.modal';
import * as AppActions from '../Flux/AppActions';
import FavouritesPresenter from '../Favourites/favourites.presenter';
import favouritesState from './../Favourites/favourites.state';
import navigationState from '../Navigation/navigation.state';
import Localization from '../Localization/localization';

const image = require('../../assets/logo/localshopi_logo.png');

export default class ProducersScreen extends React.Component {

    constructor(props) {
        super(props);

        /*
        const params = typeof props.route.params.params !== "undefined" 
        ? props.route.params.params 
        : false;
        */

        this.presenter = new ProducerPresenter();
        this.fPresenter = new FavouritesPresenter();
        this.state = {
            fetching: false,
            onUpdate: false,
            data: producersState.getItems,
            isReady: false,
            modalLocationActive: false,
            modalFilterActive: false,
        }
    }

    OnGetProducers = () => {
        this.setState({
            isReady: true,
            fetching: false,
            data: producersState.getItems
        }, () => {
            this.OnFocusFunc();
        });
    }

    OnGetProducersData = () => {
        this.OnFocusFunc();
    }

    componentDidMount = () => {
        const location = filtersState.filterLocation === "" ? " ! " : filtersState.filterLocation;
        this.props.navigation.setOptions({
            location: `${location} ( ${locationState.getDistance}km )`
        })
        AppStore.on("onProducersGot", this.OnGetProducers);
        AppStore.on("onProducersDataGot", this.OnGetProducersData);

        this._unsubscribe = this.props.navigation.addListener('focus', this.OnFocusFunc);
    }

    OnFocusFunc = () => {
        const nextNav = navigationState.getNextNavigation;
        if (nextNav) {
            if (producersState.getData.length > 0 && producersState.isReady) {
                this.OnCardPress(nextNav.id);
                navigationState.removeLastState();
            } else {
                setTimeout(() => {
                    AppActions.fetchProducersAvailable({});
                }, 100);
            }
        }
    }

    componentWillUnmount = () => {
        AppStore.removeListener("onProducersGot", this.OnGetProducers);
        AppStore.removeListener("onProducersDataGot", this.OnGetProducersData);
        this._unsubscribe();
    }

    OnCardPress = (id) => {
        const item = this.getItemById(id);
        if (!item) {
            AppStore.emit("displayToast", {
                message: Localization.sentence("item_not_found"), 
                type: 3
            });
            return;
        }
        const { navigate } = this.props.navigation;
        navigate('ProducerDescription', {
            item: item
        });
    }

    getItemById = (id) => {
        for(let i = 0; i < producersState.getData.length; ++i) {
            if (producersState.getData[i].id === id) return producersState.getData[i];
        }
        
        return false;
    }

    OnSetLike = async (id, isLike) => {
        const item = this.getItemById(id);
        if (item && item !== null) {
            this.fPresenter.updateLikeProducer(id, isLike ? "add" : "remove")
            .then(result => {
                if (result.status === 1) {
                    favouritesState.setData(result.result);
                    const data = this.presenter.parseItemsFav(producersState.getItems, favouritesState.getData);
                    AppActions.setProducersLiked([]);
                    this.setState({
                        data: data,
                        onUpdate: !this.state.onUpdate
                    })
                }
            })
            .catch(err => {
                console.log("On Set Fav error: ", err)
            })
        }
    }

    renderItem = ({item}) => 
        <ProducerCard
            id={item.id}
            OnPress={this.OnCardPress}
            img={item.image}
            title={item.title}
            categories={item.categories}
            subtitle={item.direction}
            isFavorite={item.isFavorite}
            isOrganic={item.isOrganic}
            pickHour={item.pickHour}
            cColor={item.color}
            setLike={this.OnSetLike}
        />

    OnFetchData = () => {
        /*
        this.setState({
            fetching: true
        }, () => {
            console.log("Fetch")
        });
        */
        AppActions.fetchProducers({});
        AppActions.fetchProducersLiked({});
    }

    OnSubscribeProducer = () => {
        console.log("Subscribe Producer");
        const webApiConfig = new WebApiConfig();
        Linking.openURL( webApiConfig.dashboardUrl + "/login" )
    }

    noResultsDisplay = () => {
        return (
            <View style={styles.noResultsContainer}>
                <View style={styles.noResultsHead}>
                    <View style={styles.noResultsTextContainerTop}>
                        <Text style={styles.noResultsTitle}>{"Oops !"}</Text>
                    </View>
                    <View style={styles.spacing} />
                    <View style={styles.noResultsTextContainerBottom}>
                        <Text style={styles.noResultsText}>{`Il n'y a pas encore de commerçants 
    dans votre ville ou aux alentours. 
    N'hésitez  pas à diffuser notre 
    application pour qu'ils s'inscrivent sur 
    LOCALSHOPI`}</Text>
                </View>
                </View>
                <View style={styles.noResultsFooter}>
                    <View style={styles.spacing} />
                    <View style={styles.noResultsTitleContainer}>
                        <Text style={styles.noResultsSubTitle}>{"Vous êtes commerçants ?"}</Text>
                    </View>
                    <View style={styles.noResultsButtonContainer}>
                        <RoundedButton 
                            title={ "Je m'inscrits" }
                            callback={this.OnSubscribeProducer}
                        />
                    </View>
                </View>
            </View>
        )
    }

    render() {

        const isReadyList = this.state.isReady;
        return (
            <View style={styles.container}>
                <View style={styles.backgroundImgContainer}>
                    <Image 
                        source={image} 
                        resizeMode={'contain'}
                        style={styles.backgroundImg}
                    />
                </View>
                {!isReadyList && (
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <ActivityIndicator size={32} color={'#333'} />
                    </View>
                )}

                {isReadyList && (
                <ElementsListFetch 
                    data={this.state.data}
                    renderItem={this.renderItem}
                    FetchData={this.OnFetchData}
                    renderEmptyList={this.noResultsDisplay}
                    loading={this.state.fetching}
                    state={this.state.onUpdate}
                />)}

                <ProducersSearch fetchElements={true} navigation={this.props.navigation} />
            </View>
        )
    }
}