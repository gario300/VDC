import React from 'react'
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity } from 'react-native'

import InputText from '../UIComponents/Input/input_text.component';
import InputTextArea from '../UIComponents/Input/multiple_input_text.component'
import * as FormHelpers from './ProfilePersonalization.model'
import InputSelect from '../UIComponents/Input/select.input.component'
import SelectImageModal from '../UIComponents/Modals/SelectImage/select_image.modal';

import AppStore from '../Flux/AppStore';
import * as AppActions from '../Flux/AppActions';

import FormPresenter from './ProfilePersonalization.presenter.js'
import LocalStorage from '../Utils/LocalStorage/my_local_storage'
import NormalButton from '../UIComponents/Button/normal_button.component';

import Messages from './../Message/message';
import MImagePicker from '../ImagePicker/MImagePicker';
import FileModel from '../ImagePicker/File.model';

import { styles } from './ProfilePersonalization.styles'

let mImagePicker = null;

const ProfilePersonalization = () =>{

    const [form, setForm] = React.useState(FormHelpers.form)
    const [formFirst, setformFirst] = React.useState(false)
    const [showModalImg, setShowModalImg] = React.useState(false)

    const allInputs = FormHelpers.formInputs
    const allInputs2 = FormHelpers.secondInputs

    const sendForm = async() => {
        AppActions.displayLoader(true);
        new FormPresenter().sendNewInfo(form)
        .then( res => {
            AppActions.displayLoader(false);
            if(res.status === 1) {
                AppStore.emit("finishIntro");
            } else {
                showToast('Error', 2);
            }
        })
        .catch( err => {
            AppActions.displayLoader(false);
            showToast('Error', 2)
            console.log(err);
        });
    }

    const showToast = (msg, type) => {
        AppStore.emit("displayToast", {
          message: msg,
          type: type,
        });
    }

    React.useEffect(() => {
        if (mImagePicker === null) {
            mImagePicker = new MImagePicker();
        }

        setformFirst(false)

        return () => {
            mImagePicker = null;
        }
    }, [])

    const OnSelectImage = async () => {
        Messages.removeLastListenerBoth();
        if (mImagePicker === null) mImagePicker = new MImagePicker();
        const res = await mImagePicker.OnPhotoLibrary()
        if (res.error) {
            setShowModalImg(false);

            Messages.setMessage(res.message);
            AppActions.displayMessageMin(true);
        } else if (res.success) {
            setShowModalImg(false);

            const imgUpdated = FileModel.newWithValues(
                res.value.value
            );
            setForm({
                ...form,
                photo :  imgUpdated
            })
        }
    }

    const OnSelectPhoto = async () => {
        Messages.removeLastListenerBoth();
        if (mImagePicker === null) mImagePicker = new MImagePicker();
        const res = await mImagePicker.OnPhotoTake()
        //Messages.setMessage("Désolé, nous avons besoin des autorisations de pellicule pour que cela fonctionne!");
        if (res.error) {
            setShowModalImg(false);

            Messages.setMessage(res.message);
            AppActions.displayMessageMin(true);
        } else if (res.success) {
            setShowModalImg(false);

            const imgUpdated = FileModel.newWithValues(
                res.value.value
            );
            setForm({
                ...form,
                photo :  imgUpdated
            })
        }
    }
    
    React.useEffect(()=>{
       initialData() 
    }, [])

    const initialData = async () =>{
        const data = await new LocalStorage().getToken()
        setForm({
            ...form,
            name: data.token.name !== "null" ? data.token.name : "",
            lastName: data.token.lastName !== "null" ? data.token.lastName : "",
            email: data.token.email,
        })
    }

    const getImage = async() =>{
        
        setShowModalImg(true)
        /*
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
        if(status == 'granted'){
            const pickImage = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
            setForm({
                ...form,
                photo :  {
                    fileID: ID(),
                    fileSaved: "",
                    file: pickImage.uri,
                    title: "",
                    updated: true,
                    active: true
                }
            })
        }
        */
    }

    const changeForm =  () => {
        if(form.name !== '' && form.lastName !== '' && form.city !== '' && form.age !== ''){
            setformFirst(true)
        }
    }

    const finishForm = () => {
        if (form.etablissement !== '') {
            sendForm();
        }
    }

    const getForm = (inputs) => {
        return inputs.map( ( item )=>{
            switch( item.type ) {
                case 'text':
                    return(
                        <View 
                            key={item.id} 
                            style={styles.inputContent}
                        >
                            <InputText
                                value={form[item.id]}
                                placeholder={item.title}
                                editable={!item.disabled}
                                callback={(value)=>{
                                    setForm({
                                        ...form,
                                        [item.id] : value
                                    })
                                }}
                            />
                        </View>    
                    )
                case 'select':
                    return (
                        <View 
                            key={item.id} 
                            style={styles.inputContent}
                        >
                            <InputSelect
                                style={{color: 'white'}}
                                items={[
                                    {
                                        "label": "Licence",
                                        "id": "Licence",
                                        "value": "Licence"
                                    },
                                    {
                                        "label": "BTS/DUT",
                                        "id": "BTS/DUT",
                                        "value": "BTS/DUT"
                                    },
                                    {
                                        "label": "Master",
                                        "id": "Master",
                                        "value": "Master"
                                    },
                                    {
                                        "label": "Formation Professionnelle",
                                        "id": "Formation Professionnelle",
                                        "value": "Formation Professionnelle"
                                    },
                                    {
                                        "label": "Lycée",
                                        "id": "Lycée",
                                        "value": "Lycée"
                                    }
                                ]}
                                selectedValue={form[item.id]}
                                placeholder={item.title}
                                disabled={item.disabled}
                                OnChange={(value)=>{
                                    setForm({
                                        ...form,
                                        [item.id] : value
                                    })
                                }}
                                disabled={false}

                            />
                        </View>
                    )
                case 'textarea' :
                    return (
                        <View 
                            key={item.id}
                            style={styles.inputContentMultiple}
                        >
                            <InputTextArea
                                value={form[item.id]}
                                placeholder={item.title}   
                                disabled={item.disabled}
                                callback={(value)=>{
                                    setForm({
                                        ...form,
                                        [item.id] : value
                                    })
                                }}
                            />
                        </View>
                    )
            }
        })
    }

    return (
        <View style={{flex: 1}}>
                <ScrollView 
                    style={{width: '100%', flex:1, padding: 8}}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={{alignItems: 'center', width: '100%'}}>
                        <Image
                            source={ require('../../assets/logo/logo.png') }
                            style={{width: 80, height: 80}}
                        />
                        <Text style={styles.textHeader}>
                            Personnalisation de mon profil   
                        </Text>
                        {       
                            formFirst == false &&
                            <View style={ styles.imageContainer }>
                                {
                                    form.photo.file == '' ? (
                                        <TouchableOpacity 
                                            style={{alignItems: 'center'}}
                                            onPress={getImage}
                                        >
                                            <Text style={styles.textColors}>
                                                Photo de
                                            </Text>
                                            <Text style={styles.textColors}>
                                                Profil*
                                            </Text>
                                            <View>
                                                <Image
                                                    source={require('../../assets/Recurrent/Raster.png')}
                                                    style={{width: 30, height: 30, marginTop: 10}}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    ):(
                                        <TouchableOpacity 
                                            style={{alignItems: 'center'}}
                                            onPress={getImage}
                                        >
                                            <Image
                                                style={styles.imgProfile}
                                                resizeMode={"contain"}
                                                source={{uri: form.photo.file}}
                                            />
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        }
                        {
                            formFirst == false && <>
                            {getForm(allInputs)}
                            <View style={styles.annotationsContent}>
                                <Text style={styles.annotations}>
                                    *Obligatoire
                                </Text>
                                <Text style={styles.annotations}>
                                ** Non visible dans l'application, ces informations nous permettent de contrôler votre profil
                                </Text>
                            </View>
                            <View style={[styles.submitButton]}>
                            <NormalButton
                                title="Suivant"
                                callback={changeForm}
                            />
                            </View>
                         </>
                        }
                        {
                            formFirst == true && <>
                            {getForm(allInputs2)}
                            <View style={styles.annotationsContent}>
                                <Text style={styles.annotations}>
                                    *Obligatoire
                                </Text>
                                <Text style={styles.annotations}>
                                ** Non visible dans l'application, ces informations nous permettent de contrôler votre profil
                                </Text>
                            </View>
                            <View style={[styles.submitButton]}>
                            <NormalButton
                                title="Terminé"
                                callback={finishForm}
                            />
                            </View>
                            </>
                        }
                    </View>
                </ScrollView>
            <SelectImageModal
                visible={showModalImg}
                OnCloseModal={() => setShowModalImg(false)}
                onSelectImage={OnSelectImage}
                onSelectPhoto={OnSelectPhoto}
            />
        </View>
    )
}

export default ProfilePersonalization
