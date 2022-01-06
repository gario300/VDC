import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import {styles} from './Vendre.styles'
import GlobalFlexibleButton from '../UIComponents/GlobalFlexibleButton/GlobalButton'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import StylesVariables from '../Styles/app.style.js'
import InputText from '../UIComponents/Input/input_text.component'
import Textarea from '../UIComponents/Input/Textarea.component'
import FilterItem from '../UIComponents/FilterItem/FilterItem.component'
import { filters } from './VendreFiltesModel'
import InputTypeNumber from '../UIComponents/Input/InputTypeNumber.component'
import NormalButton from '../UIComponents/Button/normal_button.component'
import ImageCarrousel from '../UIComponents/ImageCarrousel/ImageCarrousel.component'
import SelectImageModal from '../UIComponents/Modals/SelectImage/select_image.modal'
import MImagePicker from '../ImagePicker/MImagePicker';
import FileModel from '../ImagePicker/File.model'
import Messages from '../Message/message'
import * as AppActions from '../Flux/AppActions';
import CatState from '../SubCategoryFilterSelect/CategoryState'
import { useIsFocused } from '@react-navigation/native';
import VendrePresenter from './Vendre.presenter'
import AppStore from '../Flux/AppStore'
import ProductsPresenter from '../Products/Product.presenter'
import PropTypes from 'prop-types'

let mImagePicker = null;
let Cstate = null

const Vendre = ({navigation, route}) => {
    const [menuCat, setMenuCat] = useState(filters);
    const [imageArray, setImageArray] = useState([]);
    const [imageModal, setImageModal] = useState(false);
    const [firstLoad, setFirstLoad] = useState(false);
    const [disabled, setDisabled] = useState(false);
    
    const [allCats, setAllCats] = useState({
        categories: [],
        marques: [],
        authenticite: [],
        etat: [],
        coileur: [],
        tailes: []
    });
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        pour: ''
    });

    

    const isFocused = useIsFocused() 
    const routeList = {
        category : allCats.categories,
        marque: allCats.marques,
        authenticite: allCats.authenticite,
        etat : allCats.etat,
        coileur: allCats.coileur,
        taille : allCats.tailes
    }
        
    const changePour = (type) => {
        let newString = type
        if (form.pour == type) {
            newString = ''
        } 
        setForm({
            ...form,
            pour: newString
        })
    }

    useEffect(() => {
       
        if (Cstate === null) {
            Cstate = new CatState();
        }

        return () => {
            Cstate = null;
        }
    }, [])
    
    useEffect(() => {
        if(typeof(route.params?.id) == 'undefined'){
            navigation.setOptions({
                title: 'Vendre un article'
            })    
        }
    }, [navigation]);
            

    useEffect(() => {
        getDetails()
    }, []);
    

    useLayoutEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => { 
            getCategoriesFromState()
        });
        return unsubscribe
    }, [navigation])
     
    


    const getDetails = () => {
        if (typeof(route.params?.id) !== 'undefined') {
            if (Cstate === null) {
                Cstate = new CatState();
            }  
            const pPresenter = new ProductsPresenter()
            pPresenter.getDetails(route.params?.id)
                .then(response => {
                    const newObj = pPresenter.parseForUpdate(response) 
                        setImageArray(newObj.images)
                        setForm({
                            title: newObj.resume.title,
                            description: newObj.resume.description,
                            price: newObj.resume.price.toString(),
                            pour: newObj.resume.pour
                        })
                    
                    const objCats = {
                        categories: newObj.categories,
                        marques: newObj.marques,
                        authenticite: newObj.authenticite,
                        etat: newObj.etat,
                        coileur: newObj.color,
                        tailes: newObj.sizes
                    }

                    Cstate.initWithValues(objCats)
                    getCategoriesFromState()
                })
        }
    }

    const getCategoriesFromState = () => {
        if (Cstate === null) {
            Cstate = new CatState();
        }  
        const cats = Cstate.getCategories() 
        const mrques = Cstate.getMarques()
        const tiles = Cstate.getTailles()
        const coil = Cstate.getCoileurs()
        const auth = Cstate.getAuthenticite()
        const et = Cstate.getEtat()

        let catList = {
            categories: [],
            marques: [],
            authenticite: [],
            etat: [],
            coileur: [],
            tailes: []
        }
        
        cats.map((item) => {
            const find = allCats.categories.includes(item)
            if(!find){
                catList.categories.push(item)
            }
        })  
        
        mrques.map((item) => {
            const find = allCats.marques.includes(item)
            if(!find){
                catList.marques.push(item)
            }
        })
        
        tiles.map((item)=> {
            const find = allCats.tailes.includes(item)
            if(!find){
                catList.tailes.push(item)
            }
        })
    
        coil.map((item)=> {
            const find = allCats.coileur.includes(item)
            if(!find){
                catList.coileur.push(item)
            }
        })
    
        auth.map((item)=> {
            const find = allCats.authenticite.includes(item)
            if(!find){
                catList.authenticite.push(item)
            }
        })
    
        et.map((item)=> {
            const find = allCats.etat.includes(item)
            if(!find){
                catList.etat.push(item)
            }
        })
        setAllCats(catList)

        if (!firstLoad) {
            setFirstLoad(true)
        }

    }


    const changeForm = (key, value)  => {
        setForm({
            ...form,
            [key] : value
        })
    } 

    const openCat = ( rout, idCat ) => {
        navigation.navigate( rout, {
            list: routeList[idCat],
            Cstate: Cstate,
            type: idCat,
            fromFilter: false
        })
    }

    const deleteImage = (i) => {
        const newArr = imageArray.filter((image, index) => {
            return index !== i
        })
        setImageArray(newArr)
    }

    const OnSelectImage = async () => {
        Messages.removeLastListenerBoth();
        if (mImagePicker === null) mImagePicker = new MImagePicker();
        const res = await mImagePicker.OnPhotoLibrary()
        if (res.error) {
            setImageModal(false);
            Messages.setMessage(res.message);
            AppActions.displayMessageMin(true);
        } else if (res.success) {
            setImageModal(false);

            const imgUpdated = FileModel.newWithValues(
                res.value.value
            );
            const newArr = [... imageArray]
            newArr.push(imgUpdated)
            setImageArray(newArr)
        }
    }

    const OnSelectPhoto = async () => {
        Messages.removeLastListenerBoth();
        if (mImagePicker === null) mImagePicker = new MImagePicker();
        const res = await mImagePicker.OnPhotoTake()
        //Messages.setMessage("Désolé, nous avons besoin des autorisations de pellicule pour que cela fonctionne!");
        if (res.error) {
            setImageModal(false);

            Messages.setMessage(res.message);
            AppActions.displayMessageMin(true);
        } else if (res.success) {
            setImageModal(false);

            const imgUpdated = FileModel.newWithValues(
                res.value.value
            );
            const newArr = [...imageArray]
            newArr.push(imgUpdated)
            setImageArray(newArr) 
        }
    }
    
    const getObjArr = (objId) => {
        if(objId == 'etat'){
            if(allCats.etat.length == 1){
                return allCats.etat[0].title[0].title
            } else if(allCats.etat.length > 1){
                return `${allCats.etat[0].title[0].title} et ${allCats.etat.length - 1} encore de`
            } 
            return ''
        } 
        const list = routeList[objId]
        if(list.length == 1){
           return list[0].title 
        } else if(list.length > 1){
            return `${list[0].title} et ${list.length-1} encore de`
        }
        return ''
    }

    const addNew = () => {
        const vPresenter = new VendrePresenter()
        vPresenter.newVendre(form, allCats, imageArray)
        .then(() => {
            AppStore.emit("displayToast", {
                message: 'Success',
                type: 1
            });
        }).catch(err => {
            AppStore.emit("displayToast", {
                message: err,
                type: 2
            });
        })
    }

    const updateVendre = () => {
        const vPresenter = new VendrePresenter()
        vPresenter.updateVendre(form, allCats, imageArray, route.params?.id)
        .then(() => {
            AppStore.emit("displayToast", {
                message: 'Success',
                type: 1
            });
        }).catch(err => {
            AppStore.emit("displayToast", {
                message: err,
                type: 2
            }); 
        })
    }

    const sendForm = () => {
        setDisabled(true)
        AppActions.displayLoader(true)
        if (typeof(route.params?.id) == 'undefined') {
            addNew() 
        } else {
            updateVendre()
        }
        setDisabled(false)
        AppActions.displayLoader(false)
    }

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={[styles.row, {marginTop: imageArray.length > 0 ? 8 : 0}]}>
                    <ImageCarrousel
                        imageArray={imageArray}
                        onDelete={deleteImage}
                    /> 
                </View>
                <View
                    style={[styles.row, {
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        height: 100, 
                        backgroundColor: 'white',
                        marginTop: 8
                    }]}
                >
                    <GlobalFlexibleButton
                        title={'  Ajouter une Photo'}
                        textStyle={{...StylesVariables.appText}} 
                        style={{padding: 8, backgroundColor: '#E7EAED', borderRadius: 8}}
                        iconLeft={()=>{
                            return(
                                <AntDesign name="pluscircleo" size={24 * StylesVariables.responsiveMulti } color={StylesVariables.grayDarkColor} />
                            )
                        }} 
                        actions={()=>{ setImageModal(true) }}
                    /> 
                </View>
                <View style={styles.whiteContainer}>
                    <View style={styles.row}>
                        <Text style={styles.titleText}>
                            Titre *
                        </Text>
                            <InputText
                                placeholder={"Ex : Robe Dior"}
                                value={form.title}
                                callback={(value)=>{
                                    changeForm('title', value)
                                }}
                            />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.titleText}>
                            Description *
                        </Text>
                            <Textarea
                                value={form.description}
                                placeholder={"Ex : Très bon état, porté une fois "}
                                callback={(value)=>{
                                    changeForm('description', value)
                                }}
                            />
                    </View>                
                </View>
                 <View style={styles.whiteContainer}>
                     <View style={styles.row}>
                        {
                            menuCat.map( ( item, index ) => {
                                return(
                                    <FilterItem
                                        key={index}
                                        textArray={[{title: getObjArr(item.id), style: {} }]}
                                        TitleLeft={item.type}
                                        action={()=> {
                                            openCat(item.route, item.id)
                                        }}
                                        document={index}
                                        rightIcon={()=>{
                                           return(          
                                                <MaterialIcons 
                                                    name="arrow-forward-ios" 
                                                    size={18 * StylesVariables.textMulti} 
                                                    color={StylesVariables.grayColor}
                                                />                                                
                                            ) 
                                        }}
                                        titlecolor={StylesVariables.grayDarkColor}
                                    />
                                )
                            })
                        }
                    </View>     
                 </View>
                <View style={styles.whiteContainer}>
                    <View style={styles.row}>
                        <Text style={styles.titleText}>
                            Prix (sans les frais de port) *
                        </Text>
                        <InputTypeNumber
                            placeholder={'0,00 €'}
                            valueText={form.price}
                            callback={(value)=> {
                                changeForm('price', value)
                            }} 
                        />
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.titleText}>
                                Pour
                            </Text>
                        </View>
                        <View style={[styles.row, {flexDirection: 'row'}]}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.titleText}>
                                    Femme{'   '}
                                </Text>
                                <TouchableOpacity
                                    onPress={()=> {
                                        changePour('Femme')
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 15, 
                                            height: 15, 
                                            borderWidth: .5, 
                                            borderColor: 'gray', 
                                            borderRadius: 15,
                                            backgroundColor: form.pour == 'Femme' ? 'gray' : 'white'
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.titleText}>
                                    Homme{'   '}
                                </Text>
                                <TouchableOpacity
                                    onPress={()=> {
                                        changePour('Homme')
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 15, 
                                            height: 15, 
                                            borderWidth: .5, 
                                            borderColor: 'gray', 
                                            borderRadius: 15,
                                            backgroundColor: form.pour == 'Homme' ? 'gray' : 'white'
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{width: '100%'}}>
                        <View style={styles.warning}>
                            <View style={styles.row}>
                                <Text
                                    style={styles.textWarning}
                                >
                                    7% du prix de vente sera reversé à 
                                    VidedressingCommun, en vendant cette pièce vous recevrez :
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={styles.row}
                    >
                        <FilterItem
                            textArray={[]}
                            TitleLeft={'Format du colis *'}
                            action={()=>{}}
                            rightIcon={()=>{
                               return(          
                                    <MaterialIcons 
                                        name="arrow-forward-ios" 
                                        size={18 * StylesVariables.textMulti} 
                                        color={StylesVariables.grayColor}
                                    />                                                
                                ) 
                            }}
                            titlecolor={StylesVariables.grayDarkColor}
                        />
                    </View>
                    <View
                        style={[styles.row, { height: 80, alignItems: 'center', justifyContent: 'center' }]}
                    >
                        <NormalButton
                            isDisabled={disabled}
                            title={ 'Enregister' }
                            callback={sendForm}
                        />
                    </View>
                </View>
            </ScrollView>
            <SelectImageModal
                visible={imageModal}
                OnCloseModal={() => setImageModal(false)}
                onSelectImage={OnSelectImage}
                onSelectPhoto={OnSelectPhoto}
            />
        </View>
    )
}

Vendre.propTypes = {
    route: PropTypes.object,
    navigation: PropTypes.object
}

export default Vendre
