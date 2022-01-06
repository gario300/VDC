import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import { productStyles, styles } from '../Details.styles'
import AppIntroSlider from 'react-native-app-intro-slider';
import PurchaseStatus from './PurchaseStatus.component'
import { Ionicons, Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import GlobalFlexibleButton from '../../UIComponents/GlobalFlexibleButton/GlobalButton'
import StylesVariables from '../../Styles/app.style'
import { Camera } from 'expo-camera';
import CameraModal from '../../UIComponents/CameraModal/CameraModal'
import OrderPresenter from '../../Payment/Order.presenter'
import { useIsFocused } from '@react-navigation/native';
import MyappState from '../../AppState/app_state'
import * as AppActions from '../../Flux/AppActions';
import AppStore from '../../Flux/AppStore'

const PurchaseScreen = ({navigation, route}) => {
    const [cameraView, setCameraView] = useState(false)
    const isFocussed = useIsFocused();
      
    const putVideo = (type, value) => {
        if (type == 'vendeur') {
            setOrderDetail({
                ...orderDetail,
                videoVendeur: value
            })
        } else {
            setOrderDetail({
                ...orderDetail,
                clientVideo: value
            })
        }
    }

    const [orderDetail, setOrderDetail] = useState(
        {
            slides: [],
            description: '',
            title: '',
            prix: '',
            tailleAndEtat: '',
            id: '',
            created: '',
            status: '',
            ownerType: '',
            clientVideo: [],
            videoVendeur: [],
            product:{
                categorie: '',
                taille: '',
                etat: '',
                color: '',
                ownet: ''
            }
        }
   );
    
    useEffect(() => {
       getInfo() 
    },[isFocussed]);
    
    const typesVideo = {
        vendeur: orderDetail.videoVendeur,
        client: orderDetail.clientVideo
    }


    const getInfo = () => {
        AppActions.displayLoader(true)
        const oPresenter = new OrderPresenter()
        oPresenter.detailOrder(route.params?.id)
            .then(response => {
                console.log(response)
                const newObj = oPresenter.parsePurchaseDetail(response, MyappState.userMe.profile.uid)
                setOrderDetail(newObj)
            })
        AppActions.displayLoader(false)
    }

    const endOrder = () => {
        AppActions.displayLoader(true)
        const oPresenter = new OrderPresenter()
        oPresenter.endOrder(route.params?.id, typesVideo[orderDetail.ownerType])
            .then(() => {
                getInfo()
            }).catch(error => {
                AppStore.emit("displayToast", {
                    message: error,
                    type: 2
                })
            })
        AppActions.displayLoader(false)
    }

    const rejectOrder = () => {
        AppActions.displayLoader(true)
        const oPresenter = new OrderPresenter()
        oPresenter.rejectOrder(route.params?.id)
            .then(() => {
                getInfo()
            }).catch(error => {
                AppStore.emit("displayToast", {
                    message: error,
                    type: 2
                })
            })
        AppActions.displayLoader(false)
    }

    const renderItem = ({item}) => {
        
        return(
            <ImageBackground
                style={{width: '100%', height: '100%'}}
                source={{uri: item.url}}
            />
        )
    }
    
    const onOpenCamera = async() => {
        const { status } = await Camera.requestPermissionsAsync();
        setCameraView(status === 'granted');
    }


    const sendVideo = () => {
        setCameraView(false)
        AppActions.displayLoader(true)
        const oPresenter = new OrderPresenter()
        if (orderDetail.ownerType == 'vendeur') {
            oPresenter.sendCustomerVideo(route.params?.id, orderDetail.videoVendeur)
                .then(() => {
                    getInfo()
                }).catch(error => {
                    AppStore.emit("displayToast", {
                        message: error,
                        type: 2
                    });
                })
        } else {
            oPresenter.sendCustomerVideo(route.params?.id, orderDetail.clientVideo)
                .then(() => {
                    getInfo()
                }).catch(error => {
                    AppStore.emit("displayToast", {
                        message: error,
                        type: 2
                    });
                })
        }
        AppActions.displayLoader(false)
    }

    return(
        <View style={productStyles.container}>
            <ScrollView>
                <View style={productStyles.header}>
                    <AppIntroSlider
                        renderItem={renderItem}
                        data={orderDetail.slides}
                        nextLabel={null}
                        doneLabel={null}
                    />
                    <PurchaseStatus
                        status={orderDetail.status}
                    />
                </View>
                <View 
                    style={styles.body}
                >
                    <View style={styles.row}>
                        <Text style={[styles.textNormal, {fontSize: 18}]}>
                            { orderDetail.description }
                        </Text>
                    </View>
                    <View>
                        <Text style={[styles.textNormal, {fontSize : 18}]}>
                            { orderDetail.title }
                        </Text>
                        <Text style={[styles.textNormal, {fontSize : 18, color: '#5A6978'}]}>
                            {orderDetail.tailleAndEtat}
                        </Text>
                        <Text style={[styles.textNormal, {fontSize : 22, fontWeight: 'bold'}]}>
                            { orderDetail.prix } €
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={[styles.textNormal, {fontSize : 18}]}>
                                Frais de port
                            </Text>
                        </View>
                        <View style={styles.column}>
                           <Text style={[styles.textNormal, {fontSize : 18}]}>
                                A partir de 2,88€
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.row, { padding: 8 }]}>
                        <View
                            style={styles.column}
                        > 
                            <TouchableOpacity style={styles.column}>
                                <View style={[styles.buttonTransparent]}>
                                    <Ionicons 
                                    name="shield-checkmark" 
                                    size={22} 
                                    color="#E1332B" 
                                    style={{marginRight: 4}}
                                    />
                                    <Text style={[styles.textNormal, {fontSize: 16, color: '#E1332B'}]}>
                                        Protection acheteur activée !
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={styles.column}
                        >     
                            {
                                orderDetail.status !== 0 && orderDetail.status !== 7 &&
                                <TouchableOpacity 
                                    style={styles.column}
                                    onPress={onOpenCamera}
                                >
                                    <View style={[styles.buttonTransparent, {borderWidth: .5, borderColor:'#E1332B' }]}>
                                        <Text style={[styles.textNormal, {fontSize: 16, textAlign: 'center', color: '#E1332B'}]}>
                                            {"Prendre la vidéo d'ouverture"}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            } 
                        </View>
                    </View>
                    {
                        orderDetail.ownerType == 'client' && orderDetail.status == 1 &&
                        <View style={{width: '100%', alignItems: 'center'}}>
                            {
                                orderDetail.status !== 0 && orderDetail.status !== 5 &&
                                orderDetail.status !== 7 &&
                                <>
                                    <View
                                        style={{width: 250}}
                                    >
                                    <GlobalFlexibleButton
                                        iconLeft={()=> {
                                            return <Ionicons name="chatbubble-outline" size={24} color={StylesVariables.grayDarkColor} />
                                        }}
                                        textStyle={StylesVariables.appText}
                                        title={'Contacter le vendeur'}
                                    />
                                    </View>
                                    <View
                                        style={{width: 250, marginVertical: 8}}
                                    >
                                        <GlobalFlexibleButton
                                            actions={()=> {
                                                endOrder()
                                            }}
                                            iconLeft={()=> {
                                                return  <Feather name="check-circle" size={24} color="#5E9B50" />                               
                                            }}
                                            style={{backgroundColor: '#343F4B'}}
                                            textStyle={{...StylesVariables.appText, color: 'white'}}
                                            title={'Valider la réception'}
                                        />
                                    </View>
                                    <View
                                        style={{width: 250}}
                                    >
                                        <GlobalFlexibleButton
                                            actions={()=>{
                                                navigation.navigate('LitigeScreen', {
                                                    orderId: route.params?.id
                                                })
                                            }}
                                            iconLeft={()=> {
                                                return <AntDesign name="closecircleo" size={24} color="#DD322B" /> 
                                            }}
                                            style={{backgroundColor:  '#343F4B' }}
                                            textStyle={{...StylesVariables.appText, color: 'white'}}
                                            title={'Refuser la réception'}
                                        />
                                    </View>
                                </>
                            }
                        </View>
                    }
                    {
                        orderDetail.ownerType == 'vendeur' &&
                        <View style={{width: '100%', alignItems: 'center'}}>
                            {
                                orderDetail.status !== 0 && orderDetail.status !== 5 &&
                                orderDetail.status !== 7 &&
                                <>
                                    <View
                                        style={{width: 250}}
                                    >
                                    <GlobalFlexibleButton
                                        iconLeft={()=> {
                                            return <Ionicons name="chatbubble-outline" size={24} color={StylesVariables.grayDarkColor} />
                                        }}
                                        textStyle={{...StylesVariables.appText}}
                                        title={"Contacter l'acheteur"}
                                    />
                                    </View>
                                    <View
                                        style={{width: 250, marginVertical: 8}}
                                    >
                                        <GlobalFlexibleButton
                                            actions={()=> {
                                            
                                            }}
                                            iconLeft={()=> {
                                                return   <FontAwesome name="newspaper-o" size={24} color={StylesVariables.grayDarkColor}/>
                                            }}
                                            textStyle={{...StylesVariables.appText}}
                                            title={"Télécharger le bordereau"}
                                        />
                                    </View>
                                    <View
                                        style={{width: 250}}
                                    >
                                        <GlobalFlexibleButton
                                            actions={()=>{
                                                rejectOrder() 
                                            }}
                                            iconLeft={()=> {
                                                return <AntDesign name="closecircleo" size={24} color="white" /> 
                                            }}
                                            style={{backgroundColor:  '#343F4B' }}
                                            textStyle={{...StylesVariables.appText, color: 'white'}}
                                            title={'Annuler la vente'}
                                        />
                                    </View>
                                </>
                            }
                        </View>
                    }                 
                    <View style={styles.descriptionRow}>
                        <View style={[styles.column, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.textNormal, {fontSize: 18}]}>
                                Catégorie
                            </Text>
                        </View>
                        <View style={[styles.column, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.textNormal, {fontSize: 18, color: 'black' }]}>
                                { orderDetail.product.categorie }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.descriptionRow}>
                        <View style={[styles.column, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.textNormal, {fontSize: 18}]}>
                                Taille
                            </Text>
                        </View>
                        <View style={[styles.column, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.textNormal, {fontSize: 18, color: 'black' }]}>
                                { orderDetail.product.taille }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.descriptionRow}>
                        <View style={[styles.column, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.textNormal, {fontSize: 18}]}>
                                Etat
                            </Text>
                        </View>
                        <View style={[styles.column, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.textNormal, {fontSize: 18, color: 'black' }]}>
                                { orderDetail.product.etat }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.descriptionRow}>
                        <View style={[styles.column, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.textNormal, {fontSize: 18}]}>
                                Couleur
                            </Text>
                        </View>
                        <View style={[styles.column, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.textNormal, {fontSize: 18, color: 'black' }]}>
                                { orderDetail.product.color }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.descriptionRow}>
                        <View style={[styles.column, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.textNormal, {fontSize: 18}]}>
                                Ajouté le
                            </Text>
                        </View>
                        <View style={[styles.column, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.textNormal, {fontSize: 18, color: 'black' }]}>
                                { orderDetail.created }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.descriptionRow}>
                        <View style={[styles.column, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.textNormal, {fontSize: 18}]}>
                                Par
                            </Text>
                        </View>
                        <View style={[styles.column, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.textNormal, {fontSize: 18, color: 'black' }]}>
                                { orderDetail.product.owner }
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {
                cameraView &&
                <CameraModal
                    video={typesVideo[orderDetail.ownerType]}
                    setVideo={putVideo}
                    activeModal={cameraView}
                    onCloseModal={()=> { setCameraView(false) }}
                    typeVideo={orderDetail.ownerType}
                    sendVideo={sendVideo}
                />
            }
        </View>
    )
}


export default PurchaseScreen
