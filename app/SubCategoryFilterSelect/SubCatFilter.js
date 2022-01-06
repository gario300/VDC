import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './SubCatFilter.styles'
import SubFilter from '../UIComponents/FilterItem/Subfilter.component'
import TextInput from '../UIComponents/FormIconsInputs/InputText.component'
import { MaterialCommunityIcons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import StylesVariables from '../Styles/app.style'
import ListContainer from '../UIComponents/List/ListContainerOneColumn'
import NormalButton from '../UIComponents/Button/normal_button.component'
import CatPressenter from './Categorys.presenter'
import {setFilter} from '../Flux/AppActions'
const SubCatFilter = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [categories, setCategories] = useState([]);
    const [filterElements, setFilterElements] = useState('');
    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getCategories()
        });
        return unsubscribe;
    },[navigation]);
    
    const filterAllElements = (text) => {
        if (text == '') {
            return categories
        }
        const newArr = categories.filter((element) => {
            const elementName = element.title.toLowerCase()
            return elementName.includes(text.toLowerCase())
        })
        return newArr
    } 
   
    const getCategories = (lista) => {
        const presenter = new CatPressenter()
        const list = route.params.list
        let newArr = []
        let selectArray = []
        switch(route.params?.type){
            case 'category':
                presenter.getCategories()
                    .then(response => {
                        newArr = presenter.parseCategorys(response)
                        selectArray = newArr.map((item) => {
                            const find = list.find(element => element.id == item.id)
                            return {
                                title: item.title,
                                id: item.id,
                                selected: find == undefined ? false : true
                            }
                        })
                        setCategories(selectArray)
                }) 
            break;
            case 'marque':
               presenter.getMarques()
                    .then(response => {
                        newArr = presenter.parseCategorys(response)
                        selectArray = newArr.map((item) => {
                            const find = list.find(element => element.id == item.id)
                            return {
                                title: item.title,
                                id: item.id,
                                selected: find == undefined ? false : true
                            }
                        })
                        setCategories(selectArray)
                    })
            break;
            case 'taille':
               presenter.getTailles()
                    .then(response => {
                        newArr = presenter.parseCategorys(response)
                        selectArray = newArr.map((item) => {
                            const find = list.find(element => element.id == item.id)
                            return {
                                title: item.title,
                                id: item.id,
                                selected: find == undefined ? false : true
                            }
                        })
                        setCategories(selectArray)
                    })
            break;
            case 'pour':
                newArr = [
                    {
                        title: 'Homme',
                        id: 'Homme'
                    },
                    {
                        title: 'Femme',
                        id: 'Femme'
                    }
                ]
                selectArray = newArr.map((item) => {
                    const find = list.find(element => element.id == item.id)
                    return {
                        title: item.title,
                        id: item.id,
                        selected: find == undefined ? false : true
                    }
                })
                setCategories(selectArray)
            break;
        }

    }

    const addCats = (index) => {
        let newArr = []
        if(route.params?.fromFilter == false){
            newArr = categories.map((item) => {
                return {
                    title: item.title,
                    id: item.id,
                    selected: false 
                }
            }) 
            newArr[index].selected = true
        } else {
            newArr = [...categories]
            if(!newArr[index].selected){
                newArr[index].selected = true
            }else{
                newArr[index].selected = false
            }
        } 
        setCategories(newArr)
    }
    
    const onAddCats = () => {
        switch(route.params?.type){
            case 'category':
                route.params?.Cstate.addCat(categories)
                navigation.goBack()
            break;
            case 'marque':
                route.params?.Cstate.addMarques(categories)
                navigation.goBack()
            break;
            case 'taille':
                route.params.Cstate.addTailes(categories)
                navigation.goBack()
            break;
            case 'pour':
                route.params.Cstate.addPour(categories)
                navigation.goBack()
            break;
        } 
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
    
    return (
        <View
            style={[styles.container, { backgroundColor: 'white', }]}
        >
            <View style={{flex: .9}}>
                <View style={[styles.row, {flexDirection: 'row', alignItems: 'center'}]}>
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
                            callBack={(value)=> {
                                setFilterElements(value)
                            }}
                            Icon={()=>{
                                return <AntDesign name="search1" size={24} color={StylesVariables.grayDarkColor} />
                            }}
                            placeholder={'Rechercher'}
                        />
                    </View>
                </View>
                <View style={{width: '100%', paddingHorizontal: 15}}>
                    <ListContainer
                        data={()=>{
                            return filterAllElements(filterElements)
                        }}
                        onRefresh={()=>{}}
                        refreshing={refreshing}
                        renderEmptyList={renderEmpty}
                        renderItem={({item, index}) =>
                            <View
                            
                                style={{width: '100%'}}
                                key={index}
                            >
                                <SubFilter
                                    TitleLeft={item.title}
                                    value={item.selected}
                                    document={item.id}
                                    action={()=> {
                                        addCats(index)
                                    }}
                                />
                            </View>
                        }
                    /> 
                </View> 
            </View>
            <View
                style={{width: '100%', alignItems: 'center', flex: .1}}
            >
                <NormalButton 
                    themeName={'secundary'}
                    title={ 'Enregister' }
                    callback={onAddCats}
                />
            </View>
        </View>
    )
}

export default SubCatFilter
