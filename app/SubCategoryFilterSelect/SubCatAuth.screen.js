import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { styles } from './SubCatFilter.styles'
import NormalButton from '../UIComponents/Button/normal_button.component'
import StylesVariables from '../Styles/app.style'
import CatPresenter from './Categorys.presenter'
const SubCat = ({navigation, route}) => {
    const [row, setRow] = useState([])
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAuth()
        });
        return unsubscribe;
    }, [navigation]);
    
    const getAuth = () => {
        const list = route.params?.list
        const cPresenter = new CatPresenter()
        cPresenter.getAuth()
            .then(response => {
                const newArray = cPresenter.parseCategorys(response)
                const newList = newArray.map((item) => {
                const find = list.find(element => element.id == item.id)
                    return {
                        title: item.title,
                        id: item.id,
                        selected: find == undefined ? false : true
                    }
                })
                setRow(newList)
            })
    }    

    const SelectItem = (index) => {
        let newArray = []
        if (route.params.fromFilter == false) {
            newArray = row.map((item) => {
                return {
                    title: item.title,
                    id: item.id,
                    selected: false 
                }
            }) 
            newArray[index].selected = true   
        } else {
            newArray = [ ... row ]
            if(newArray[index].selected){
                newArray[index].selected = false
            } else { 
                newArray[index].selected = true
            }
        }
        setRow(newArray)
    }


    const addCat = () => {
        route.params.Cstate.addAuthenticite(row)
        navigation.goBack()
    }

    return(
        <View style={styles.container}>
            <ScrollView >
                <Text style={styles.catTextTop}>
                    {"La vente d'articles contrefaits est strictement interdite sur VideDressingCommun. Nous obligeons chaque utilisateurs à ajouter toutes informations et photos nécéssaires afin de prouver que l'article est authentique."}
                </Text>
                <Text style={[styles.catTextTop, { marginVertical: 5, fontSize: 15 } ]}>
                    {"Ton annonce restera masquée ou supprimée si elle ne contient pas un e preuve d'authenticité sérieuse. Pour plus d'informations et de conseils, tu peux aller voir notre FAQ."}
                </Text>
                <Text style={[styles.catTextTop, { marginBottom: 5, fontSize: 15, color: 'red' } ]}>
                    {"Nous t'invitons à transmettre plusieurs preuves d'authenticité."}
                </Text>
                <View style={styles.iconsContainer}>
                    {
                        row.map( ( item, index ) => {
                            return(
                                <TouchableOpacity
                                    onPress={() => {
                                        SelectItem(index)
                                    }}
                                    key={index}
                                >
                                    <View
                                        style={[styles.iconContainer, {
                                            backgroundColor: item.selected == true ? StylesVariables.grayColor : 'white' 
                                        }]}
                                    >
                                        <Image
                                            source={require('../../assets/icons/tshirt1.png')}
                                            style={{height: 30, width: 30}}
                                        />
                                        <Text
                                            style={styles.textIcon}
                                        >
                                            {item.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View
                    style={{width: '100%', alignItems: 'center', height: 70, padding: 8}}
                >
                    <NormalButton 
                        themeName={"secundary"}
                        title={ 'Je transmets mes preuves' }
                        callback={addCat}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default SubCat
