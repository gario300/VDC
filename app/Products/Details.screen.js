import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './Details.styles'
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons, AntDesign, EvilIcons } from '@expo/vector-icons';
//import ProductItem from '../UIComponents/ProductItem/ProductItem'
import ProductsPresenter from './Product.presenter'
//import AppStore from '../Flux/AppStore'
//import * as AppActions  from '../Flux/AppActions'
import { useIsFocused } from '@react-navigation/native';
import MenuBottom from '../UIComponents/MenuBottom/MenuBottom.component'
import MyappState from '../AppState/app_state'
//import * as AppActions from "./../Flux/AppActions";
const Details = ({navigation, route}) => {
    const isFocused = useIsFocused()
    const [detailed, setDetailed] = useState({
        images: [],
        resume: {
            title: '',
            price: 0,
            description: ''
        },
        categorie: [],
        sizes: [],
        etat: [],
        color: [],
        date: '',
        author: '',
        related: [],
        ownerId: 0,
        id:''
    });
    
    useEffect(() => {
        if(isFocused){
            getDetails()
        }
    },[isFocused]);
    
    const getDetails = () => {
        const presenter = new ProductsPresenter()
        presenter.getDetails(route.params?.id)
            .then(response => {
                const newObj = presenter.parseForDetails(response)
                setDetailed(newObj)
            }) 
    } 

    useEffect(() => {
        navigation.setOptions({
            OnRightPress : () => setShowModal(true)
        })
    }, navigation);
    

    const [showModal, setShowModal] = useState(false);
    

    const parseSizeResume = () => {
        if (detailed.sizes.length == 1) {
            return detailed.sizes[0]
        } else {
            return `${detailed.sizes[0]} et ${detailed.sizes.length -1} encore de`
        }
    }
    const renderItem = ({item}) => {
        
        return(
            <ImageBackground
                style={{width: '100%', height: '100%'}}
                source={{uri: item.url}}
            />
        )
    }

    const getDetailTable = (elementArray) => {
        let title = ''

        elementArray.map(item => {
            title = title+item+', '
        })

        return title.substring(0, title.length -2)

    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <AppIntroSlider
                        renderItem={renderItem}
                        data={detailed.images}
                        nextLabel={null}
                        doneLabel={null}
                    />
                </View>
                <View style={styles.body}>
                    <View style={styles.row}>
                        <Text style={[styles.textNormal, {fontSize: 18}]}>
                            {detailed.resume.description}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text style={[styles.textNormal, {fontSize : 18}]}>
                                {detailed.resume.title}
                            </Text>
                            <Text style={[styles.textNormal, {fontSize : 18, color: '#5A6978'}]}>
                                {parseSizeResume()}
                            </Text>
                            <Text style={[styles.textNormal, {fontSize : 22, fontWeight: 'bold'}]}>
                                {detailed.resume.price}€
                            </Text>
                        </View>
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

                    {
                        MyappState.userMe.profile.uid === detailed.ownerId && 
                        <View style={[styles.row, { padding: 8 } ]}>
                            <TouchableOpacity 
                                style={styles.column}
                                onPress={()=> {
                                    navigation.navigate('Vendre', {
                                        screen: 'DetailVendre', params: {
                                            id: detailed.id,
                                        }
                                    })
                                }}
                            >
                                <View style={[styles.buttonTransparent, {borderWidth: .5, borderColor:'#343F4B' }]}>
                                    <Text style={[styles.textNormal, {fontSize: 15}]}>
                                        Modifier{' '}
                                    </Text>
                                    <EvilIcons name="pencil" size={24} color="#343F4B" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.column}
                                onPress={()=>{
                                    navigation.navigate('PaymentScreen')
                                }}
                            >
                                <View style={[styles.buttonTransparent, {backgroundColor: '#E7EAED'}]}>
                                    <Text style={[styles.textNormal, {fontSize: 15}]}>
                                        Suprimer{' '}
                                    </Text>
                                    <EvilIcons name="trash" size={24} color="#343F4B" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        MyappState.userMe.profile.uid !== detailed.ownerId &&
                        <View style={[styles.row, { padding: 8 } ]}>
                            <TouchableOpacity style={styles.column}>
                                <View style={[styles.buttonTransparent, {borderWidth: .5, borderColor:'#343F4B' }]}>
                                    <Text style={[styles.textNormal, {fontSize: 15}]}>
                                        Envoyer un message{' '}
                                    </Text>
                                    <Ionicons name="chatbubble-outline" size={18} color="#343F4B" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.column}
                                onPress={()=>{
                                    navigation.navigate('PaymentScreen', {
                                        id: detailed.id,
                                    })
                                }}
                            >
                                <View style={[styles.buttonTransparent]}>
                                    <Text style={[styles.textNormal, {fontSize: 15}]}>
                                        Acheter {' '}
                                    </Text>
                                    <AntDesign name="shoppingcart" size={18} color="#343F4B" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    <View 

                        style={[styles.row, { alignItems: 'center', justifyContent: 'center'}]}>
                        <Ionicons name="shield-checkmark-sharp" size={40} color="#E1332B" /> 
                        <View style={{width: '70%', marginLeft: 10}} >
                            <Text style={[styles.textNormal, {fontSize: 15}]}>
                                Protection acheteurs
                            </Text>
                            <Text style={[styles.textNormal, {fontSize: 15, color: 'black', textDecorationLine: 'underline'}]}>
                               En savoir plus sur notre politique de remboursement 
                            </Text>
                        </View>
                    </View>
                    <View style={styles.descriptionRow}>
                        <View style={[styles.column, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.textNormal, {fontSize: 18}]}>
                                Catégorie
                            </Text>
                        </View>
                        <View style={[styles.column, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.textNormal, {fontSize: 18, color: 'black' }]}>
                                {getDetailTable(detailed.categorie)}
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
                                {getDetailTable(detailed.sizes)}
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
                                {getDetailTable(detailed.etat)}
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
                                {getDetailTable(detailed.color)}
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
                               {detailed.date}
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
                                {detailed.author}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.textNormal, {fontSize : 20, fontWeight: 'bold', color: 'black'}]}>
                            Dressing du membre
                        </Text>
                    </View>
                    <View style={styles.row}>
                        {
                            /*
                        <ScrollView
                            horizontal={true}
                        >
                            <ProductItem
                                callBack={()=> {
                                    navigation.navigate('Details')
                                }}
                                carroussel={true}
                            />
                            <ProductItem
                                callBack={()=> {
                                    navigation.navigate('Details')
                                }}
                                carroussel={true}
                            />
                            <ProductItem
                                carroussel={true}
                                callBack={()=> {
                                    navigation.navigate('Details')
                                }}
                            />
                        </ScrollView>

                            */
                        }
                    </View>
                </View>
            </ScrollView>
            {
                showModal &&
                    <>
                        <View
                            style={styles.blackScreen}
                        />
                        <MenuBottom
                            partager={{id: detailed.id, title: detailed.resume.title }}
                            onSelectModeur={()=>{}}
                            OnCloseModal={()=> {
                                setShowModal(false)
                            }}
                        />
                    </>
            }
        </View>
    )
}


export default Details
