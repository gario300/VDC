import React,{ useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './Mainpage.styles'
import StylesVariables from '../Styles/app.style'
import ProductItemStatus from '..//UIComponents/ProductItem/ProductItemStatus.component'
import ListContainer from '../UIComponents/List/list_column.container.component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Localization from '../Localization/localization'
import ProductPresenter from '../Products/Product.presenter'
import { useIsFocused } from '@react-navigation/native';
import OrderPresenter from '../Payment/Order.presenter'
import * as AppActions from '../Flux/AppActions';

const MainPage = ({navigation}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [items, setItems] = useState([]);
    const isFocussed = useIsFocused();
       
    useEffect(() => {
        getList(currentIndex)
    },[isFocussed]);
    

    const getList = (param) => {
        setRefreshing(true)
        AppActions.displayLoader(true);
        let newArr = []
        if (param == 0) {
            const oPresenter = new OrderPresenter()
            oPresenter.getList()
                .then(response => {
                    console.log(response)
                    newArr = oPresenter.parseOrderList(response)
                    setItems(newArr)
                })
        } else {
            const pPresenter = new ProductPresenter()
            pPresenter.getMyProducts()
                .then(response => {
                    newArr = pPresenter.parseForMyItems(response)
                    setItems(newArr)
                })
        }
        setCurrentIndex(param)
        AppActions.displayLoader(false)
        setRefreshing(false)
    }


    const menu = [
        'Mes commandes',
        'Mes achats',
    ]
    
    const statusItem = [
        'termine',
        'vendue',
        'anule',
        'litige',
        'achete',
        'litige'
    ]

    const renderEmpty = () => {
        return(
            <View style={styles.emptyListCont}>
                <MaterialCommunityIcons
                    name="cloud-off-outline"
                    size={styles.emptyIcon.height}
                    color={styles.emptyIcon.tintColor} />
                <Text style={styles.emptyText}>{Localization.word("empty_search")}</Text>
            </View>
        )
    }
    return(
        <View style={ styles.container }>
            <View style={styles.row}>
                {
                    menu.map( (item, index) => {
                        return (
                            <TouchableOpacity
                                key={0}
                                onPress={()=>{
                                    getList(index)
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
                data={items}
                onRefresh={()=>{}}
                refreshing={refreshing}
                renderEmptyList={renderEmpty}
                renderItem={({item}) =>   
                    <ProductItemStatus
                        item={item}
                        callBack={() => {
                                if (currentIndex == 0) {
                                    navigation.navigate('PurchaseItem', {
                                        id: item.id
                                    })
                                } else {
                                    navigation.navigate('DetailsVendre',{
                                        id: item.id
                                    })
                                }
                            }
                        }
                    />       
                }
            />
        </View>
    )
}  

export default MainPage
