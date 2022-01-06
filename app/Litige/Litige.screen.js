import React, { useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { styles } from './Litige.styles'
import Item from '../UIComponents/DownloadDocumentItem/DownloadItem.screen'
import CheckBox from '@react-native-community/checkbox';
import { selects } from './LitigeModels'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import GlobalFlexibleButton from '../UIComponents/GlobalFlexibleButton/GlobalButton'
import StylesVariables from '../Styles/app.style'
import Textarea from '../UIComponents/Input/Textarea.component'
import NormalButton from '../UIComponents/Button/normal_button.component'
import CameraModal from '../UIComponents/CameraModal/CameraModal'
import ImageCarrousel from '../UIComponents/ImageCarrousel/ImageCarrousel.component'
import SelectImageModal from '../UIComponents/Modals/SelectImage/select_image.modal'
import MImagePicker from '../ImagePicker/MImagePicker';
import FileModel from '../ImagePicker/File.model'
import Messages from '../Message/message'
import * as AppActions from '../Flux/AppActions';
import OrderPressenter from '../Payment/Order.presenter'
import AppStore from '../Flux/AppStore'

let mImagePicker = null;

const Litige = ({navigation, route}) => {
    const [itemsCheck, setItemsCheck] = useState(selects);
    const [cameraView, setCameraView] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const [imageArray, setImageArray] = useState([]);
    const [comments, setComments] = useState('');
    const [disableButton, setDisableButton] = useState(false);
     
    

    const changeValue = (index) => {
        const newArr = [ ...itemsCheck ]
        if (newArr[index].selected) {
            newArr[index].selected = false
        } else {
            newArr[index].selected = true
        }
        setItemsCheck(newArr)
    }

    const sendLitige = () => {
        setDisableButton(true)
        AppActions.displayLoader(true)
        const oPresenter = new OrderPressenter()
        oPresenter.newLitige(comments, itemsCheck, imageArray, route.params?.orderId)
            .then(response => {
                setDisableButton(false)
                AppActions.displayLoader(false)
                AppStore.emit("displayToast", {
                    message: response,
                    type: 1
                });
                navigation.goBack()
            }).catch( error => {
                setDisableButton(true)
                AppActions.displayLoader(false)
                AppStore.emit("displayToast", {
                    message: error,
                    type: 2
                });
            })
    }

    const iconCheck = (selected, index) => {
        return(
            <CheckBox
                disabled={false}
                value={selected}
                tintColors={{ true : '#969FAA' }}
                onValueChange={()=>{
                   changeValue(index) 
                }}
            />
        )
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
    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.topText}>
                    Tu uhaites déclarer un litige ? Merci de répondre à ces questions. 
                </Text>
                <TouchableOpacity>
                    <Text style={styles.textLink}>
                        Voir les conditions de remboursement
                    </Text>
                </TouchableOpacity>
                <Text
                    style={styles.title}
                >
                    Raisons du litige, la commande :
                </Text>
                {   
                    itemsCheck.map ((item, index) => {
                        return(
                            <Item
                                key={index}
                                Icon={() => {
                                    return iconCheck(item.selected, index)
                                }}
                                textArray={[{ title: item.title, style: styles.textItemStyle }]}
                                action={()=>{
                                    changeValue(index)
                                }}
                            />
                        )
                    })
                }
                <Text
                    style={styles.title}
                >
                   Photos du litige 
                </Text>
                <View
                    style={[styles.row, {alignItems: 'center'}]}
                >
                    <ImageCarrousel
                        imageArray={imageArray}
                        onDelete={deleteImage}
                    />
                    <GlobalFlexibleButton
                        actions={()=>{
                            setImageModal(true)
                        }}
                        title={'  Ajouter une Photo'}
                        textStyle={{...StylesVariables.appText}} 
                        iconLeft={()=>{
                            return(
                                <AntDesign name="pluscircleo" size={24 * StylesVariables.responsiveMulti } color={StylesVariables.grayDarkColor} />
                            )
                        }} 
                    /> 
                </View>
                <Text
                    style={styles.title}
                >
                   Commentaires
                </Text>
                <Textarea
                    placeholder={"Ajouter un commentaire"}
                    callback={(value)=>{
                        setComments(value)
                    }}
                />
                <Text
                    style={styles.title}
                >
                   Protection acheteur 
                </Text>
                <View
                    style={[styles.row, {alignItems: 'center'}]}
                >
                    <TouchableOpacity
                        onPress={()=>{
                            setCameraView(true)
                        }}
                    >
                        <View
                            style={styles.containerVideo}
                        >
                            <Text style={styles.dangerText}>
                                Voir la video
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View> 
                <View
                    style={[styles.row, {alignItems: 'center', height: 80, paddingHorizontal: 10}]}
                >
                    <NormalButton
                        isDisabled={disableButton}
                        title={'Envoyer ma demande de remboursement'}
                        callback={()=>{sendLitige()}}
                        themeName={'secundary'}
                    />
                </View>
            </ScrollView>
            <SelectImageModal
                visible={imageModal}
                OnCloseModal={() => setImageModal(false)}
                onSelectImage={OnSelectImage}
                onSelectPhoto={OnSelectPhoto}
            />
            {
                cameraView &&
                <CameraModal
                    activeModal={cameraView}
                    onCloseModal={()=>{
                        setCameraView(false)
                    }}
                    videoProps={""}
                />
            }
        </View>
    )
}

export default Litige
