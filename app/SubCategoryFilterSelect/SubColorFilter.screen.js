import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { styles } from './SubCatFilter.styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListContainer from '../UIComponents/List/ListContainerOneColumn.js'
import NormalButton from '../UIComponents/Button/normal_button.component'
import DocumentItem from '../UIComponents/DownloadDocumentItem/DownloadItem.screen'
import CatPresenter from './Categorys.presenter'

const SubCatFilter = ({navigation, route}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [coileurs, setCoileurs] = useState();
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getCoileurs()
        });

        return unsubscribe;   
    }, [navigation]);
    
    const getCoileurs = () => {
        const list = route.params?.list
        const coileurP = new CatPresenter()
        coileurP.getCoileurs()
            .then(response => {
                const newArray = coileurP.parseCategorys(response)
                const newList = newArray.map((item) => {
                const find = list.find(element => element.id == item.id)
                    return {
                        title: item.title,
                        id: item.id,
                        selected: find == undefined ? false : true
                    }
                })
                setCoileurs(newList)
            })
    } 

    const changeRow = (index) => {
        let newArray = []
        if (route.params?.fromFilter == false) {
            newArray = coileurs.map((item) => {
                return {
                    title: item.title,
                    id: item.id,
                    selected: false 
                }
            }) 
            newArray[index].selected = true
        } else {
            newArray = [...coileurs]
            if( newArray[index].selected ){
                newArray[index].selected = false
            } else {
                newArray[index].selected = true
            }
        }
        setCoileurs(newArray)
    } 

    const renderEmpty = (value) => (
         <View style={styles.emptyListCont}>
            <MaterialCommunityIcons
                name="cloud-off-outline"
                size={styles.emptyIcon.height}
                color={styles.emptyIcon.tintColor} />
            <Text style={styles.emptyText}>empty_search</Text>
        </View>
    )

    const colorLeft = (bground) => {
        return(
            <View
                style={{
                    width: 25,
                    height: 25,
                    backgroundColor: bground,
                    borderRadius: 25
                }}
            />
        )
    }

    const addCat = () => {
        route.params.Cstate.addCoileurs(coileurs)
        navigation.goBack()
    }

    return (
        <View
            style={[styles.container, {padding: 8, backgroundColor: 'white'}]}
        >
            <View style={{flex: .9,}}> 
                <ListContainer
                    data={coileurs}
                    onRefresh={()=>{}}
                    refreshing={refreshing}
                    renderEmptyList={renderEmpty}
                    renderItem={({item, index}) =>
                        <DocumentItem
                            Icon={()=> {
                                return colorLeft(item.title)
                            }}
                            action={()=>{
                                changeRow(index)
                            }}
                            textArray={[]}
                            rightIcon={()=> {
                                if(item.selected){
                                    return (
                                        <MaterialCommunityIcons name="checkbox-marked-outline" size={30} color="#969FAA" />
                                    )
                                } else {
                                    return(
                                        <MaterialCommunityIcons name="checkbox-blank-outline" size={30} color="#969FAA" />
                                    )
                                } 
                           }} 
                        />
                    }
                />
            </View>
            <View
                style={{width: '100%', alignItems: 'center', flex: .1}}
            >
                <NormalButton 
                    themeName={'secundary'}
                    title={ 'Enregister' }
                    callback={addCat}
                />
            </View>
        </View>
    )
}

export default SubCatFilter
