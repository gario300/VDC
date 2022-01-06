import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from '../Styles/home.style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListContainer from '../UIComponents/List/list.container.component';
import Localization from '../Localization/localization';
import { AntDesign } from '@expo/vector-icons';
import ProductItem from '../UIComponents/ProductItem/ProductItem'
import Banner from '../UIComponents/BannerSlider/Banner.component'
import StylesVariables from '../Styles/app.style.js'
import TextInput from '../UIComponents/FormIconsInputs/InputText.component'
import ProductPresenter from '../Products/Product.presenter'
import PropTypes from 'prop-types';

const HomeScreen = ({ navigation }) => {
    const isFocussed = useIsFocused();
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        OnRefreshData();
        return () => {}
    }, [isFocussed])
 

    const OnRefreshData = () => {
        setRefreshing(true)
        const pPresenter = new ProductPresenter()
        pPresenter.getAllProducts().then(response => {
            const newArr = pPresenter.parseForScreen(response)
            setData(newArr)
        })
        setRefreshing(false)
    }

    const changeRoute = (id) => {
        navigation.navigate('Details', {
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
            <View style={styles.homeHeader}>
                <Banner/>
                <View style={cstyles.bannerSearcher}>
                    <Image
                        source={require('../../assets/logo/logo_opadity.png')}
                        style={{width: 70, height: 70}}
                    />
                    <Text
                        style={cstyles.titleHeader}
                    >
                        Offre les plus belles pièces à ton dressing !
                    </Text>
                    <TextInput
                        Icon={()=>{
                            return <AntDesign name="search1" size={24} color="gray" />
                        }}
                        callBack={() => {}}
                        placeholder={'Rechercher un article, une marque'}
                    />
                </View>
            </View>
            <View style={cstyles.row}> 
                <ListContainer
                data={data}
                onRefresh={OnRefreshData}
                refreshing={refreshing}
                contentStyle={{
                    backgroundColor: StylesVariables.backColor
                }}
                renderEmptyList={renderEmpty}
                itemSeparator={<View style={{ width: 16, backgroundColor: 'pink' }}/>}
                renderItem={({item}) =>   
                    <ProductItem
                        item={item}
                        callBack={() => {
                                changeRoute(item.id)
                            }
                        }
                    />       
                }/> 
            </View>
        </View>
    )

}

const cstyles = StyleSheet.create({
    bannerSearcher : {
        height: '100%',
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        padding: StylesVariables.spacing * 2,
        justifyContent: 'center'
    },
    titleHeader: {
        ...StylesVariables.appSubTitle,
        color: 'white',
        marginVertical: StylesVariables.spacing * 3
    },
    row:{
        alignItems: 'center',
        flex: 1,
    }
})

HomeScreen.propTypes = {
    navigation: PropTypes.func
}

export default HomeScreen;
