import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from './SearchScreen.styles'
import Item from '../UIComponents/DownloadDocumentItem/DownloadItem.screen'
import ListContainerOneColumn from '../UIComponents/List/ListContainerOneColumn'
import ListContainerTwoColumn from '../UIComponents/List/list.container.component'
import { MaterialCommunityIcons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import StylesVariables from '../Styles/app.style'
import TextInput from '../UIComponents/FormIconsInputs/InputText.component'
//import myAppState from '../AppState/app_state';
//import AppStore from '../Flux/AppStore';
import GlobalFlexibleButton from '../UIComponents/GlobalFlexibleButton/GlobalButton';
import ModalFilter from '../UIComponents/Modals/filter.modal'
import { filters } from './FiltersModels'
import ProductItem from '../UIComponents/ProductItem/ProductItem'
import { useIsFocused } from '@react-navigation/native';
import CatPresenter from './../SubCategoryFilterSelect/Categorys.presenter'
import ProductsPresenter from '../Products/Product.presenter'
import CatState from '../SubCategoryFilterSelect/CategoryState'



let catClass = null
const SearchScreen = ({navigation, route}) =>{
    const [refreshing, setRefreshing] = useState(false)
    const [searcher, setSearcher] = useState([]);
    const [filterModal, setFilterModal] = useState(false);
    const isFocused = useIsFocused();
    const [subCat, setSubCat] = useState([]);
    const [allCats, setAllCats] = useState({
        pour:[],
        subcategorie: [],
        marque: [],
        authenticite: [],
        etat: [],
        coileur: [],
        prix: [],
        taille: []
    });
    const [filterData, setFilterData] = useState('');
    
    
    
    useEffect(() => {    
        if (catClass === null) {
            catClass = new CatState();
        }

        return () => {
            catClass = null;
        }
    }, [])     

    useEffect(() => {
        getSubCategorys()
    }, [isFocused]);

    const filterElements = (text) => {
        if (searcher.length >= 1) {
            if (text == '') {
                return searcher
            }
            const newArr = searcher.filter((element) => {
                const elementName = element.title.toLowerCase()
                return elementName.includes(text.toLowerCase())
            })
            return newArr
        } 
        console.log(text, 'here')
        if (text == '') {
            return subCat
        }
        const newArr = subCat.filter((element) => {
            const elementName = element.name[0].title.toLowerCase()
            return elementName.includes(text.toLowerCase())
        })
        return newArr
    } 

    const getSubCategorys = () => {
        const cPresenter = new CatPresenter()
        cPresenter.getSubCategorysById(route.params?.id)
            .then(response => {
                const newArr = cPresenter.parseSubCategorysFilter(response, {  ...StylesVariables.appText, 
                    color: StylesVariables.grayDarkColor, 
                    fontSize: 16})
                setSubCat(newArr)
            })
    }


    useLayoutEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => { 
            getCategoriesFromState()
        });
        return unsubscribe
    }, [navigation])
     
    const routeList = {
        category : allCats.subcategorie,
        marque: allCats.marque,
        authenticite: allCats.authenticite,
        etat : allCats.etat,
        coileur: allCats.coileur,
        taille : allCats.taille,
        pour: allCats.pour,
        prix : allCats.prix
    }

    const getCategoriesFromState = () => { 
        if (catClass === null) {
            catClass = new CatState();
        }  

        const cats = catClass.getCategories() 
        const mrques = catClass.getMarques()
        const tiles = catClass.getTailles()
        const coil = catClass.getCoileurs()
        const auth = catClass.getAuthenticite()
        const et = catClass.getEtat()
        const pr = catClass.getPour()
        let catList = {
            subcategorie: [],
            marque: [],
            authenticite: [],
            etat: [],
            coileur: [],
            taille: [],
            pour: [],
            prix: []
        }
        
        cats.map((item) => {
            const find = allCats.subcategorie.includes(item)
            if(!find){
                catList.subcategorie.push(item)
            }
        })  
        
        mrques.map((item) => {
            const find = allCats.marque.includes(item)
            if(!find){
                catList.marque.push(item)
            }
        })
        
        tiles.map((item)=> {
            const find = allCats.taille.includes(item)
            if(!find){
                catList.tailles.push(item)
            }
        })
    
        coil.map((item)=> {
            const find = allCats.coileur.includes(item)
            if(!find){
                catList.coileur.push(item)
            }
        })
    
        auth.map((item)=> {
            const find = allCats.authenticite.includes(item)
            if(!find){
                catList.authenticite.push(item)
            }
        })
    
        et.map((item)=> {
            const find = allCats.etat.includes(item)
            if(!find){
                catList.etat.push(item)
            }
        })
       

        pr.map((item)=> {
            const find = allCats.pour.includes(item)
            if(!find){
                catList.pour.push(item)
            }
        })
        setAllCats(catList)
    }

    const onSelectSubCat = (id) => {
        const productPresenter = new ProductsPresenter();
        productPresenter.filterElements({subcategorie : [ {id: id} ], pour: []})
            .then(response => {
                const newArr = productPresenter.parseForScreen(response)
                console.log(newArr)
                setSearcher(newArr)
            })
    }

    const onFilter = () => {
        const productPresenter = new ProductsPresenter();
        productPresenter.filterElements(allCats)
            .then(response => {
                const newArr = productPresenter.parseForScreen(response)
                setSearcher(newArr)
            })
        setFilterModal(false)
    }

    const searchHeader = () => {
        if(searcher.length >= 1){
            return(
                <View
                    style={[styles.row, {backgroundColor: 'white'}]}
                >
                    <View style={{flex: .25, padding: 3}}> 
                        <GlobalFlexibleButton
                            style={{...styles.buttonMenuHeader, borderWidth:0}}
                            title={`${searcher.length} résultats`}
                            textStyle={styles.buttonTextMenuHeader}
                        />
                    </View>
                    <View style={{flex: .25, padding: 3}}>  
                        <GlobalFlexibleButton
                            style={styles.buttonMenuHeader}
                            title={" Filter"}
                            actions={()=>{
                                setFilterModal(true)
                            }}
                            textStyle={styles.buttonTextMenuHeader}
                            iconLeft={()=> {
                                return(
                                    <Image
                                        source={require('../../assets/icons/filters.png')}
                                        style={{width: 15, height: 15}}
                                    />       
                                )
                            }}
                        />
                    </View>
                    <View style={{flex: .25, padding:3}}> 
                        <GlobalFlexibleButton
                            style={styles.buttonMenuHeader}
                            title={" Trier"}
                            textStyle={styles.buttonTextMenuHeader}
                            iconLeft={()=> {
                                return(
                                    <Feather name="filter" size={15} color="black" />       
                                )
                            }}
                        />
                    </View>
                    <View style={{flex: .15}}> 
                    </View>
                </View>
            )
        }
        return null
    }
    const renderEmpty = () => (
         <View style={styles.emptyListCont}>
            <MaterialCommunityIcons
                name="cloud-off-outline"
                size={styles.emptyIcon.height}
                color={styles.emptyIcon.tintColor} />
            <Text style={styles.emptyText}>empty_search</Text>
        </View>
    )


    return(
        <View style={[styles.container, { backgroundColor: searcher.length > 0 ? 'transparent' : 'white'}]}>
            <View
                style={styles.witheContainer}
            >
                <View style={[styles.row, searcher.length > 0 ? {marginBottom : 0} : {}]}>
                    <View
                        style={{flex: .1}}
                    >
                        <TouchableOpacity
                            onPress={()=>{navigation.goBack()}}
                        >
                            <MaterialIcons name="arrow-back-ios" size={24} color="black"/>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{flex: .9}}
                    >
                        <TextInput
                            Icon={()=>{
                                return <AntDesign name="search1" size={24} color={StylesVariables.grayDarkColor} />
                            }}
                            callBack={(value)=>{ 
                                setFilterData(value)
                            }}
                            placeholder={'Rechercher un article, une marque'}
                        />
                    </View>
                </View>
                { searchHeader() }
            </View> 
            {
                searcher.length <= 0 &&
                <ListContainerOneColumn
                    contentStyle={{}}
                    data={()=> {
                        return filterElements(filterData)
                    }}
                    onRefresh={()=>{}}
                    refreshing={refreshing}
                    renderEmptyList={renderEmpty}
                    renderItem={({item}) =>
                        <View
                            style={{width: '100%', paddingHorizontal: 15}}
                        >
                            <Item
                                Icon={null} 
                                action={()=>{ onSelectSubCat(item.id) }}
                                textArray={item.name} 
                                document={item.id}       
                            /> 
                        </View>
                    }
                />
            }
            {
                searcher.length >= 1 && 
                <ListContainerTwoColumn
                    data={()=> {
                        return filterElements(filterData)
                    }}
                    onRefresh={()=>{}}
                    refreshing={refreshing}
                    renderEmptyList={renderEmpty}
                    renderItem={({item}) =>
                        <ProductItem
                            item={item}
                            callBack={()=>{
                                navigation.navigate('DetailsVendre', {
                                    id: item.id
                                })
                            }}
                        /> 
                    }
                />
            }
            {
                filterModal &&
                    <ModalFilter
                        catClass={catClass}
                        allCats={routeList}
                        navigation={navigation}
                        route={route}
                        filters={filters}
                        onFilter={onFilter}
                        activeModal={filterModal}
                        onCloseModal={() =>{
                            setFilterModal(false)
                        }}
                    />
            }
        </View>
    )
};

export default SearchScreen
