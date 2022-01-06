import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from './SearchScreen.styles'
import Item from '../UIComponents/DownloadDocumentItem/DownloadItem.screen'
import ListContainer from '../UIComponents/List/ListContainerOneColumn'
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import StylesVariables from '../Styles/app.style'
import TextInput from '../UIComponents/FormIconsInputs/InputText.component'
import CatPresenter from '../SubCategoryFilterSelect/Categorys.presenter'
import { useIsFocused } from '@react-navigation/native';

const catTexrStyle = { 
    ...StylesVariables.appText, 
    color: StylesVariables.grayDarkColor, 
    fontSize: 16 
}


const SearchScreen = ({navigation}) =>{
    const [refreshing, setRefreshing] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [items, setItems] = useState([]) 
    const isFocused = useIsFocused();
    const [filter, setFilter] = useState("")

    useEffect(() => {
        getItems()
    }, [isFocused])
    
    const menuItem = [
        'Femmes',
        'Hommes',
        'Enfants'
    ]
    const filterElements = (text) => {
        if (text == '') {
            return items
        }
        const newArr = items.filter((element) => {
            const elementName = element.name[0].title.toLowerCase()
            return elementName.includes(text.toLowerCase())
        })
        return newArr
    } 
    const getItems = async() => {
        const cPresenter = new CatPresenter()
        cPresenter.getMainCategories()
            .then(response => {
                const newArr = cPresenter.parseCategorysFilters(response, catTexrStyle) 
                setItems(newArr)
            })

    }
    const navigateSubCategory = (id) => {
        navigation.navigate('ArticleSearchSub', {
            id: id
        })
    }


    const renderEmpty = () => {
        return(
            <View style={styles.emptyListCont}>
                <MaterialCommunityIcons
                    name="cloud-off-outline"
                    size={styles.emptyIcon.height}
                    color={styles.emptyIcon.tintColor} />
                <Text style={styles.emptyText} >empty_search</Text>
            </View>
        )
    }
    

    return(
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{ padding: 8 }}>
                <View
                    style={{height: 30}}
                />
                <TextInput
                    callBack={(value)=> {
                        setFilter(value)
                    }}
                    Icon={()=>{
                        return <AntDesign name="search1" size={24} color={StylesVariables.grayDarkColor} />
                    }}
                    placeholder={'Rechercher un article, une marque'}
                />
            </View> 
            <View style={styles.row}>
                {
                    menuItem.map( (item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={()=>{
                                    setCurrentIndex(index)
                                }}
                                style={styles.column}
                            >
                                <View
                                    style={[styles.textMenuContainer, { 
                                        borderBottomColor : currentIndex == index ? StylesVariables.grayDarkColor : StylesVariables.grayColor ,
                                        borderBottomWidth : currentIndex == index ? 1.5 : 0
                                    }]}
                                >
                                    <Text style={styles.textMenu}>
                                        {item}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <ListContainer
                data={()=> {
                    return filterElements(filter)
                }}
                onRefresh={()=>{}}
                refreshing={refreshing}
                renderEmptyList={renderEmpty}
                renderItem={({item}) =>    
                    <View
                        style={{width: '100%', paddingHorizontal: 15}}
                    >
                        <Item 
                            Icon={()=> {
                                return (
                                    <Image
                                        source={{uri: item.image}}
                                        style={{width: 40, height: 40}}
                                    />
                                )
                            }}
                            textArray={item.name}
                            rightIcon={()=>{
                                return <MaterialIcons name="arrow-forward-ios" size={24} color={StylesVariables.grayColor} />
                            }}
                            document={item.id} 
                            action={()=> {
                                navigateSubCategory(item.id)     
                            }}
                        />
                    </View> 
            }/>
        </View>
    )
};

export default SearchScreen
