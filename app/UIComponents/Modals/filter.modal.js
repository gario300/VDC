import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, Text, StyleSheet } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import StylesVariables from './../../Styles/app.style';
import styles from './../../Styles/modal_filter.style';
import { SafeAreaView } from 'react-native-safe-area-context'
import FilterItem from '../FilterItem/FilterItem.component'


const FilterModal = ({ 
    activeModal,  
    onCloseModal,  
    filters,
    navigation,
    allCats,
    catClass,
    onFilter
    }) => {
    const [isFiltering, setIsFiltering] = useState(false);
    

    useLayoutEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => { 
            if (activeModal == true) {
                setIsFiltering(false)
            }
        });
        return unsubscribe
    }, [navigation])
     

        const openCat = ( rout, idCat, referenceId ) => { 
        console.log(idCat, referenceId)
        setIsFiltering(true)
        navigation.navigate( rout, {
            list: allCats[idCat],
            Cstate: catClass,
            type: referenceId
        })
    }
    
    const getObjArr = (objId) => {
        let catText = ''
        const list = allCats[objId]
        if(objId == 'etat'){
            if(list.length == 1){
                catText = list[0].title[0].title
            } else if(list.length > 1){
                catText = `${list[0].title[0].title} et ${list.length - 1} encore de`
            } 
            return catText
        } 
    
        if(list.length == 1){
           catText = list[0].title 
        } else if(list.length > 1){
            catText = `${list[0].title} et ${list.length-1} encore de`
        }
        
        return catText
    }

 

    if (isFiltering) {
        return null
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={activeModal}
            onRequestClose={() => { 
                onCloseModal();
            }}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.head}>
                        <View style={styles.asideContainer} />
                        <View style={styles.contentC}>
                            <Text style={styles.contentCText}>{"Filtres"}</Text>
                        </View>
                        <View style={styles.asideContainer}>
                            <TouchableOpacity 
                                style={styles.closeButton}
                                onPress={onCloseModal}
                            >
                                <AntDesign name='close' size={42} color={StylesVariables.mainColor} />
                            </TouchableOpacity>
                        </View>
                    </View> 
                    <ScrollView 
                        keyboardDismissMode={"interactive"}
                        keyboardShouldPersistTaps={'handled'}
                        contentContainerStyle={{paddingBottom: 40}}
                    >
                        {
                            filters.map( ( item, index ) => {
                                return(
                                    <View 
                                    key={index}
                                    style={styles.row}>
                                        <FilterItem
                                            textArray={[{title: getObjArr(item.id), style: {} }]}
                                            TitleLeft={item.type}
                                            action={()=>{
                                                openCat(item.route, item.id, item.catId)
                                            }}
                                            rightIcon={()=>{
                                               return(          
                                                    <MaterialIcons 
                                                        name="arrow-forward-ios" 
                                                        size={18 * StylesVariables.textMulti} 
                                                        color={StylesVariables.grayColor} 
                                                    />
                                                
                                                ) 
                                            }}
                                        />
                                    </View>        
                                )
                            })
                        }
                        <View
                            style={[{flexDirection: 'row'}]}
                        >
                            <View
                                style={currentStyles.column}
                            >
                                <TouchableOpacity
                                    style={{flex: 1}}
                                >
                                    <View
                                        style={[currentStyles.buttons, {backgroundColor: StylesVariables.grayColor}]}
                                    >
                                        <Text
                                            style={currentStyles.textButton}
                                        >
                                            Tour Efasser
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={currentStyles.column}
                            >
                                <TouchableOpacity
                                    style={{flex: 1}}
                                    onPress={onFilter}
                                >
                                    <View
                                        style={[currentStyles.buttons, {backgroundColor: StylesVariables.mainColor}]}
                                    >
                                        <Text
                                            style={currentStyles.textButton}
                                        >
                                            Afficher les résultats
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView> 
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default FilterModal;

const currentStyles = StyleSheet.create({
    column: {
        flex: 1,
        padding: 3
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    textButton: {
        ...StylesVariables.appText,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
})
