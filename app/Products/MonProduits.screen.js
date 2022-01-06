import React,{ useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../MesAndAchats/Mainpage.styles'
import StylesVariables from '../Styles/app.style'
import ProductItemStatus from '..//UIComponents/ProductItem/ProductItemStatus.component'
import ListContainer from '../UIComponents/List/list_column.container.component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Localization from '../Localization/localization'
import ProductPresenter from '../Products/Product.presenter'
import { useIsFocused } from '@react-navigation/native';
import * as AppActions from '../Flux/AppActions';


const MainPage = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [items, setItems] = useState([]);
    const isFocussed = useIsFocused();

    useEffect(() => {
        getList()
    },[isFocussed]);
    

    const getList = () => {
        setRefreshing(true)
        AppActions.displayLoader(true);
            const pPresenter = new ProductPresenter()
            pPresenter.getMyProducts()
                .then(response => {
                    console.log(response)
                    const newArr = pPresenter.parseForMyItems(response)
                    setItems(newArr)
                })
        
        AppActions.displayLoader(false)
        setRefreshing(false)
    }


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
            <ListContainer
                data={items}
                onRefresh={()=>{}}
                refreshing={refreshing}
                renderEmptyList={renderEmpty}
                renderItem={({item}) =>   
                    <ProductItemStatus
                        item={item}
                        callBack={() => {
                                navigation.navigate('DetailsVendre',{
                                    id: item.id
                                })
                                
                            }
                        }
                    />       
                }
            />
        </View>
    )
}  

export default MainPage
