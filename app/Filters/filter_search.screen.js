import React, { useState , useEffect} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { createFilter } from 'react-native-search-filter';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import innerStyles from '../Styles/inner.style';
import filterState from './filter.state';
import Localization from '../Localization/localization';
import { useIsFocused } from '@react-navigation/native';
import styles from './filter.styles';
import ListContainer from '../UIComponents/List/list.container.component';
import CardArticleSearch from '../Articles/Cards/search_card.component';
import FilterModal from '../UIComponents/Modals/filter.modal'
import myAppState from '../AppState/app_state';
import AppStore from '../Flux/AppStore'


let filterModel = {
    category: [],
    date: '',
    type: '',
    location: '',
    lat: 0,
    long:0,
    distance: 0
}

const FilterSearchScreen = ({route, navigation}) => {

    const initialTerm = filterState.getSearchTerm();
    const isFocussed = useIsFocused();
    const [filterForm, setFilterForm] = useState(filterModel)
    const [data, /*setData*/] = useState([]);
    const [filteredData, setFilteredData] = useState(data);
    const [searchTerm, setSearchTerm] = useState(initialTerm);
    const [refreshing, setRefreshing] = useState(false);
    const [ viewModal, setViewModal ] = useState(false)
    const [ categorys, setCategorys ] = React.useState([])
    const [vissibleValue, setVissibleValue] = React.useState( '')

    React.useLayoutEffect(() => {
        navigation.setOptions({
            OnRightPress: () => showModal()
        })
        
        return () => {}
    }, [])

    useEffect( () => {
        OnReFreshData();
        getCategory()
    }, [])

    useEffect(() => {
        if(isFocussed) {
            if( myAppState.getLinkSearch() ) {
                setViewModal(true)
            }
            myAppState.setLinkSearch(false)
        }
    }, [isFocussed])

    const changeFilterForm = (value, id) => {
        setFilterForm({
            ...filterForm,
            [id] : value
        })
    }

    const changeLatLong = (lat, lng, location) => {
        setFilterForm({
            ...filterForm,
            lat: lat,
            long: lng,
            location: location
        })
    }

    const showModal = () => {
        if(viewModal){
            setViewModal(false)
        }else {
            setViewModal( true )
        }
    }

   
    const clearFilter = () => {
        setFilterForm(filterModel)
        const cl = categorys.map((c) => {
            return  {
                title: c.title,
                icon: !c.icon ?  'http://primedepartamentos.com/images/icons/design-icon-white.png' : c.icon, 
                id:c.id,
                color: c.color,
                selected: false
            }
        })
        setVissibleValue('')
        setCategorys(cl)
    }

    const OnReFreshData = () => {  
        getArticles();
    }

    const changeRoute = (id) => {
        navigation.navigate('DetailProposer', {
            id: id
        })
    }

    const renderEmpty = () => (
        <View style={styles.emptyListCont}>
            <MaterialCommunityIcons
                name="cloud-off-outline"
                size={styles.emptyIcon.height}
                color={styles.emptyIcon.tintColor} />
            <Text style={styles.emptyText}>{Localization.word("empty_search")}</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <View style={innerStyles.topInner} />
            { viewModal &&   
            <FilterModal
                onCloseModal={showModal} 
                formu={filterForm}
                callBack={changeFilterForm}
                filter={getArticles}
                clearFilter={clearFilter}
                vissibleValue={vissibleValue}
                setVissibleValue={setVissibleValue}
                categorys={categorys}
                setCategorys={setCategorys}
                changeLatLng={changeLatLong}
            />
            }
        </View>
    )
}

export default FilterSearchScreen
