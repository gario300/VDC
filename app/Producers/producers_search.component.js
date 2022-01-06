import React from 'react';
import { View } from 'react-native';

import AppStore from '../Flux/AppStore';
import * as AppActions from "../Flux/AppActions";

import SelectLocationModal from './../Location/select_location.modal';
import FilterModal from '../UIComponents/Modals/filter.modal';
import ProductsFilter from '../ProductFilters/products_filters.component';
import filtersState from './../ProductFilters/filters_state';
import locationState from './../Location/location_state';
import ProducersPresenter from './producers.presenter';
import UserPresenter from './../User/user.presenter';
import producersState from './producers.state';
import favState from './../Favourites/favourites.state';

import authState from './../Auth/auth.state';

const ProducersSearch = (props) => {

    const [updated, setUpdated] = React.useState({
        flag: false
    });
    const [modalFilterActive, setModalFilterActive] = React.useState(false);
    const [modalLocationActive, setModalLocationActive] = React.useState(false);

    const OnCloseModalFilters = () => {
        setUpdated({flag: !updated.flag});
        setModalFilterActive(false)
    }

    const OnApplyFilters = () => {
        const location = filtersState.filterLocation === "" ? " !! " : filtersState.filterLocation;
        props.navigation.setOptions({
            location: `${location} ( ${locationState.getDistance}km )`
        })
        setUpdated({flag: !updated.flag});
        setModalFilterActive(false)
        getProducers();
    }

    const OnCloseModalLocationFilters = () => {
        setModalLocationActive(false);
        setUpdated({flag: !updated.flag});
    }

    React.useEffect( () => {

        const OnOpenCategoriesFilter = () => {
            setModalFilterActive(true)
            filtersState.setActiveFilter("categories");
        }

        const OnOpenSelectLocation = () => {
            setModalLocationActive(true)
            filtersState.setActiveFilter("location");
        }
        
        props.navigation.setOptions({
            OnRightPress: OnOpenCategoriesFilter,
            OnCenterPress: OnOpenSelectLocation
        })

        return () => {}
    }, []);

    React.useEffect( () => {

        const OnFilterUpdated = async () => {
            setUpdated({
                flag: !updated.flag
            });
        }
        
        AppStore.on("filterUpdated", OnFilterUpdated);

        return () => {
            AppStore.removeListener("filterUpdated", OnFilterUpdated);
        }
    }, []);

    React.useEffect( () => {
        
        const OnProducersLikedGot = async () => {
            if (!props.fetchElements) return;
            
            const presenter = new ProducersPresenter();
            const data = presenter.parseItemsFav(producersState.getItems, favState.getData);

            AppActions.setProducers({
                list: data
            })
        }
        
        AppStore.on("onProducersLikedGot", OnProducersLikedGot);
        
        return () => {
            AppStore.removeListener("onProducersLikedGot", OnProducersLikedGot);
        }

    }, []);

    React.useEffect( () => {
        
        const OnFetchProducers = async () => {
            if (!props.fetchElements) return;
            getProducers();
        }

        if (props.fetchElements) {
            getProducers();
        }

        AppStore.on("onProducersFetch", OnFetchProducers);
        
        return () => {
            AppStore.removeListener("onProducersFetch", OnFetchProducers);
        }

    }, []);

    const getProducers = async () => {

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
    
    return (
        <View>

            <FilterModal 
                activeModal={modalFilterActive}
                title={"Que recherchez-vous ?"}
                onUpdate={updated.flag}
                onCloseModal={OnCloseModalFilters}
                onApplyFilters={OnApplyFilters}
                filterContent={(
                    <ProductsFilter
                        onUpdate={updated.flag}
                    />
                )}
            />

            <SelectLocationModal 
                activeModal={modalLocationActive}
                title={"Où cherchez-vous ?"}
                onUpdate={updated.flag}
                onCloseModal={OnCloseModalLocationFilters}
                onApplyFilters={OnApplyFilters}
            />

        </View>
    )
}

export default ProducersSearch