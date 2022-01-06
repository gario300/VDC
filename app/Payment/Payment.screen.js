import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { styles } from './Payment.styles'
import DocumentItem from '../UIComponents/FilterItem/FilterItem.component'
import { Entypo, Ionicons } from '@expo/vector-icons';
import DocumentItemSecond from '../UIComponents/DownloadDocumentItem/DownloadItem.screen'
import StylesVariables from './../Styles/app.style'
import NormalButton from '../UIComponents/Button/normal_button.component'
import AdressePressenter from '../Adress/address.presenter'
import ProductPresenter from '../Products/Product.presenter'
import OrderPresenter from './Order.presenter'
import * as AppActions from '../Flux/AppActions';
import AppStore from '../Flux/AppStore'
import { useIsFocused } from '@react-navigation/native';

const payMethods = [
    [
        { title: 'Disponible au point relais sous 3-5 jours', style: { ...styles.payMethodsHeaderText, fontSize: 16 } },
        { title: 'Mondial relay', style: { ...styles.titlePrice, fontSize: 16 } }
    ],
    [
        { title: 'Livraison à domicile sous 2-3 jours ouvrés', style: styles.payMethodsHeaderText },
        { title: 'Colissimo', style: styles.titlePrice }
    ],
    [
        { title: 'Livraison à domicile sous 2h ', style: styles.payMethodsHeaderText },
        { title: 'Stuart', style: styles.titlePrice }
    ],
    [
        { title: 'Je souhaite être bénéficier de la protection acheteur', style: styles.payMethodsHeaderText },
    ]
]


const PaymentScreen = ({navigation, route}) => {
    const [itemSelect, setItemSelect] = useState(1);
     const [detailed, setDetailed] = useState({
        resume: {
            images: '',
            title: '',
            price: 0,
            description: '',
            id:'',
        },
    });
    const isFocussed = useIsFocused();

    const [disabled, setDisabled] = useState(false);
    const [addressList, setAddressList] = useState([]);
    const [form, setForm] = useState({
        addressId: '',
        acheteurs: {
            status: false,
            price: 2.95
        },
        envoi: 0
    });
    
    useEffect(() => {
       getAllInfo() 
    },[isFocussed]);
   
    const getAllInfo = () => {
        const presenter = new ProductPresenter()
        const aPresenter = new AdressePressenter()
        presenter.getDetails(route.params?.id)
            .then(response => {
                const newObj = presenter.parseForDetails(response)
                setDetailed({
                    images: newObj.images[0].url,
                    price: newObj.resume.price,
                    description: newObj.resume.description,
                    id: newObj.id         
                })
            })
        aPresenter.getAddress()
            .then(response => {
                const newArr = aPresenter.parseAddress(response)
                setAddressList(newArr)
            })

    }

    const setAcheteurs = () => {
        let stat 
        if (form.acheteurs.status) {
            stat = false    
        } else {
            stat = true
        }
        
        setForm({
            ...form,
            acheteurs: {
                ...form.acheteurs,
                status: stat
            }
        })
    
    }

    const totalPrice = () => {
        let price = detailed.price
        if (form.acheteurs.status){
            price = price + form.acheteurs.price
        }
        price = price + form.envoi
        return price
    }

    const circleCheckBox = (e) =>{
        return(
        <View style={{ flexDirection: 'row' , alignItems: 'center' }}>
            <Text style={{...styles.titlePrice, fontSize: 16}}>
                {'2,95 €  '}
            </Text>
            <TouchableOpacity
                onPress={()=>{
                    setItemSelect(e)
                }}
            >
                <View
                    style={{
                        borderWidth: .4,
                        borderColor: StylesVariables.grayDarkColor,
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                        backgroundColor: itemSelect == e ? '#343F4B' : 'white',
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

    const addressItem = (obj) => {
        return(
            <View
                style={styles.addressContainer}
            >
                <View
                    style={styles.addressLeft}
                >
                    <Text
                        style={styles.priceLigth}
                    >
                        { obj.pays }
                    </Text>
                    <Text
                        style={styles.priceLigth}
                    >
                        { obj.ville }
                    </Text>
                    <Text
                        style={styles.priceLigth}
                    >
                        { obj.address }
                    </Text>
                    <Text
                        style={styles.priceLigth}
                    >
                        { obj.code_postal }
                    </Text>
                </View>
                <View
                    style={styles.addressRigth}
                >
                    <TouchableOpacity
                        onPress={()=>{
                            setForm({
                                ...form,
                                addressId: obj.id
                            })
                        }}
                    >
                        <View
                            style={{
                                borderWidth: .4,
                                borderColor: StylesVariables.grayDarkColor,
                                width: 20,
                                height: 20,
                                borderRadius: 20,
                                backgroundColor: obj.id == form.addressId ? '#343F4B' : 'white',
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
            </View>
        )
    }

    const sendForm = () => {
        setDisabled(true)
        AppActions.displayLoader(true)
        const oPresenter = new OrderPresenter()
        oPresenter.newOrder(form, route.params?.id)
            .then(response => {
                navigation.navigate('PurchaseItem', {
                    id: response
                })
            }).catch(error =>{
                AppStore.emit("displayToast", {
                    message: error,
                    type: 2
                });
            })
        AppActions.displayLoader(false)
        setDisabled(false)
    }

    return(
        <View
            style={styles.container}
        >
            <ScrollView style={{padding : 8}}>
                <View
                    style={styles.imageContainer}
                >
                    <Image
                        source={{uri : detailed.images }}
                        style={{width: 130, height: 130}}
                    />
                </View>
                <View
                    style={styles.row}
                >
                    <View
                        style={styles.column}
                    >
                        <Text
                            style={styles.titlePrice}
                        >
                            Commande
                        </Text>
                    </View>
                    <View
                        style={[styles.column, { alignItems: 'flex-end' }]}
                    >
                        <Text
                            style={styles.priceLigth}
                        >
                            { detailed.price } €
                        </Text>
                    </View>
                </View>
                <View
                    style={styles.row}
                >
                    <View
                        style={styles.column}
                    >
                        <Text
                            style={styles.titlePrice}
                        >
                            Envoi
                        </Text>
                    </View>
                    <View
                        style={[styles.column, { alignItems: 'flex-end' }]}
                    >
                        <Text
                            style={styles.priceLigth}
                        >
                            { form.envoi } €
                        </Text>
                    </View>
                </View>
                <View
                    style={styles.row}
                >
                    <View
                        style={styles.column}
                    >
                        <Text
                            style={styles.titlePrice}
                        >
                            Protection acheteurs
                        </Text>
                    </View>
                    <View
                        style={[styles.column, { alignItems: 'flex-end' }]}
                    >
                        <Text
                            style={styles.priceLigth}
                        >
                            { form.acheteurs.status ? form.acheteurs.price : 0 } €
                        </Text>
                    </View>
                </View>
                <View
                    style={styles.row}
                >
                    <View
                        style={styles.column}
                    >
                        <Text
                            style={styles.totalTitle}
                        >
                            Total
                        </Text>
                    </View>
                    <View
                        style={[styles.column, { alignItems: 'flex-end' }]}
                    >
                        <Text
                            style={styles.totalTitle}
                        >
                            {totalPrice()} €
                        </Text>
                    </View>
                </View>
                <View
                    style={{width: '100%'}}
                >
                    <Text
                        style={[styles.titlePrice, { marginVertical: 4 } ]}
                    >
                        Adresse
                    </Text>
                    <DocumentItem
                        document={0}
                        action={()=>{
                            navigation.navigate('AdressScreen')
                        }}
                        TitleLeft={"Ajouter l'adresse de livraison"}
                        textArray={[]}
                        titlecolor={'#000000'}
                        rightIcon={()=>{
                            return <Entypo name="plus" size={24} color="black" />
                        }}
                    />
                    {/* Adress Item */}
                    {
                        addressList.map((obj) => {
                            return addressItem(obj) 
                        })
                    }
                    <Text
                        style={[styles.titlePrice, { marginVertical: 4} ]}
                    >
                        Paiement
                    </Text>
                    <DocumentItem
                        document={0}
                        action={()=>{navigation.navigate('PayMethodScreen')}}
                        TitleLeft={"Sélectionne un mode de paiement"}
                        textArray={[]}
                        titlecolor={'#000000'}
                        rightIcon={()=>{
                            return <Entypo name="plus" size={24} color="black" />
                        }}
                    />
                </View>
                    <Text
                        style={[{ marginVertical: 4, color: '#000000', textDecorationLine: 'underline' } ]}
                    >
                        Option(s) choisie(s)
                    </Text>
                    <Text
                        style={[styles.titlePrice, { marginVertical: 4} ]}
                    >
                        Envoi
                    </Text>
                    <DocumentItemSecond
                        textArray={payMethods[0]}
                        Icon={()=>{
                            return (
                                <Image
                                    source={require('../../assets/icons/methodSend.png')}
                                    style={{ width: 40, height: 40, bottom: 5 }}
                                />
                            )
                        }}
                        rightIcon={()=>{
                            return(
                                circleCheckBox(1)
                            )
                        }}
                    />
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            padding: 8
                        }}
                    >
                        <Text
                            style={[styles.titlePrice, { marginVertical: 4, color : StylesVariables.grayDarkColor } ]}
                        >
                            Choisir un point relais
                        </Text>
                    </View>
                    <DocumentItemSecond
                        textArray={payMethods[1]}
                        Icon={()=>{
                            return (
                                <Image
                                    source={require('../../assets/icons/methodSend2.png')}
                                    style={{ width: 40, height: 40, bottom: 5 }}
                                />
                            )
                        }}
                        rightIcon={()=>{
                            return(
                                circleCheckBox(2)
                            )
                        }}
                    />
                    <DocumentItemSecond
                        textArray={payMethods[2]}
                        Icon={()=>{
                            return (
                                <Image
                                    source={require('../../assets/icons/methodSend3.png.png')}
                                    style={{ width: 40, height: 40, bottom: 5 }}
                                />
                            )
                        }}
                        rightIcon={()=>{
                            return(
                                circleCheckBox(3)
                            )
                        }}
                    />
                    <Text
                        style={[styles.titlePrice, { marginVertical: 4} ]}
                    >
                        Protection acheteur
                    </Text>
                    <DocumentItemSecond
                        action={()=>{}}
                        textArray={payMethods[3]}
                        Icon={()=>{
                            return (
                              <Ionicons name="shield-checkmark" size={40} color="#dd322b" />
                            )
                        }}
                        rightIcon={()=>{
                            return(
                                <View style={{ flexDirection: 'row' , alignItems: 'center' }}>
                                    <Text style={{...styles.titlePrice, fontSize: 16}}>
                                        {'2,95 €  '}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            setAcheteurs()                      
                                        }}
                                    >
                                        <View
                                            style={{
                                                borderWidth: .4,
                                                borderColor: StylesVariables.grayDarkColor,
                                                width: 20,
                                                height: 20,
                                                borderRadius: 20,
                                                backgroundColor: form.acheteurs.status ? '#343F4B' : 'white',
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
                        }}
                    />
                    <View
                        style={{height: 60, padding: 8, alignItems: 'center'}}
                    >
                    <NormalButton    
                        themeName={'secundary'}
                        title={ 'Payee' }
                        isDisabled={disabled}
                        callback={()=>{
                            sendForm()
                        }}
                    />
                    </View>
            </ScrollView>
        </View>
    )
}

export default PaymentScreen
