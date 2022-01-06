import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './SubCatFilter.styles'
import DocumentItem from '../UIComponents/DownloadDocumentItem/DownloadItem.screen'
import { etate } from '../Vendre/VendreFiltesModel'
import StylesVariables from '../Styles/app.style'
import CatPresenter from './Categorys.presenter'
import NormalButton from '../UIComponents/Button/normal_button.component'

const SubVendreFilter = ({navigation, route}) => {
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
           getEtat() 
        });
        return unsubscribe;    
    },[navigation]);
    
    const getEtat = () => {
        const cPresenter = new CatPresenter()
        const list = route.params?.list
        cPresenter.getEtat()
            .then(response => {
                const parseAll = response.map((item) => {
                    const find = list.find(element => element.id == item.id)
                    return {
                        id: item.id,
                        title: [ 
                            { 
                                title: item.value, 
                                style: { 
                                    ...StylesVariables.appSubTitle,
                                    color: StylesVariables.blackColors,
                                    fontSize: 15,
                                }
                            },
                        ],
                        selected: find == undefined ? false : true
                    }
                })
                setRows(parseAll)
            })
    }

    const setItemSelect = (index) => {
        let newArray = []
        if (route.params.fromFilter == false) {
            newArray = rows.map((item) => {
                return {
                    title: item.title,
                    id: item.id,
                    selected: false 
                }
            }) 
            newArray[index].selected = true   
        } else {
            newArray = [ ...rows ]
            if(newArray[index].selected){
                newArray[index].selected = false
            }else {
                newArray[index].selected = true
            }
        }
        setRows(newArray)
    }

    const addCat = () => {
        route.params.Cstate.addEtat(rows)
        navigation.goBack()
    }

    const circleCheckBox = (e, index) =>{
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  }}> 
            <TouchableOpacity
                onPress={()=>{
                    setItemSelect(index)
                }}
            >
                <View
                    style={{
                        borderWidth: .4,
                        borderColor: StylesVariables.grayDarkColor,
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                        backgroundColor:  e ? '#343F4B' : 'white',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}    
                >
                    <View
                        style={{
                            width: 9,
                            height: 9,
                            borderRadius: 9,
                            backgroundColor: 'white' 
                        }}
                    />
                </View>
            </TouchableOpacity>
        </View>
        )
    }   
    return(
        <View
            style={{flex: 1, backgroundColor: 'white'}}
        >
           <ScrollView
                style={{padding: 8, flex: .9}}
            >
                {
                    rows.map( ( item, index ) => {
                        return(
                            <DocumentItem
                                Icon={null}
                                key={index} 
                                textArray={item.title}
                                rightIcon={()=> {
                                return circleCheckBox(item.selected, index)
                                }}
                                action={()=>{
                                    setItemSelect(index)
                                }}
                            />
                        )
                    })
                }
            </ScrollView>
            <View
                style={{width: '100%', alignItems: 'center', flex: .1, padding: 8}}
            >
                <NormalButton 
                    themeName={"secundary"}
                    title={ 'Enregister' }
                    callback={addCat}
                />
            </View>
        </View>
    )
}

export default SubVendreFilter
