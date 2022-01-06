import React, { useReducer, useEffect, useRef } from 'react';
import { ImageBackground, 
    Text, View, Platform, 
    ScrollView, 
    KeyboardAvoidingView, 
    TextInput, 
    TouchableOpacity, 
    ActivityIndicator 
} from 'react-native';

import stylesInner from '../Styles/inner.style';
import StylesVariables from './../Styles/app.style';
import NormalButton from './../UIComponents/Button/normal_button.component';
import styles from './account.style';

import MKeyboard from './../Keyboard/keyboard';
import Localization from './../Localization/localization';

import UserPresenter from './../User/user.presenter';

import AppStore from './../Flux/AppStore';
import * as AppActions from "./../Flux/AppActions";
import * as Arrays from '../Constants/constants.index';
import myAppState from '../AppState/app_state';
import Constants from 'expo-constants';

import RoundedButton from '../UIComponents/Button/normal_button.component';
import FormInputText from '../UIComponents/Input/input_text_large.component';
import FormInputSelect from '../UIComponents/Input/select_large.input.component';
import InputTextArea from '../UIComponents/Input/multiple_input_text.component'
import ID from '../ImagePicker/FileID'

import SelectImageModal from '../UIComponents/Modals/SelectImage/select_image.modal';
import Messages from './../Message/message';
import MImagePicker from '../ImagePicker/MImagePicker';
import FileModel from '../ImagePicker/File.model';

let mImagePicker = null;

const initialValue = {
    isLoading: false,
    user: '',
    alias: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
    keyboardHeight: 0,
    activeModal: false,
    country: '',
    city: '',
    niveau: '',
    etablissement: '',
    description: '',
    age: '',
    photo: {
        fileID: "",
        fileSaved: "",
        file: "",
        title: "",
        updated: false,
        active: false
    }
}

const reducer = (prevState, action) => {
    switch (action.type) {
        case 'ON_CHANGE':
            return {...prevState, [action.key]: action.value}
        case 'INITIALIZE':
            return {...prevState, ...action.value}
    }
}

const MeAccountScreen = ({navigation}) => {
    const [state, dispatch] = useReducer(reducer, initialValue);
    const [showModalImg, setShowModalImg] = React.useState(false)
    
    let scrollRef = useRef(null)

    React.useEffect(() => {
        if (mImagePicker === null) {
            mImagePicker = new MImagePicker();
        }

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
            dispatch({
                type: 'ON_CHANGE',
                value: imgUpdated,
                key: "photo"
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
            dispatch({
                type: 'ON_CHANGE',
                value: imgUpdated,
                key: "photo"
            })
        }
    }

    useEffect(() => {
        navigation.setOptions({OnRightPress: OnHandleSubmit})
        AppActions.getUserMe();
        AppStore.on("onSetUser", OnUserGot);
        return () => {
            AppStore.removeListener("onSetUser", OnUserGot)
        }
    }, [])

    useEffect(() => {
        navigation.setOptions({OnRightPress: OnHandleSubmit});
        return () => {}
    }, [state])

    const OnUserGot = () => {
        const photo = myAppState.userMe.profile.photo.length > 0 ? myAppState.userMe.profile.photo[0] : ""
        dispatch({
            type: 'INITIALIZE',
            value: {
                "name": myAppState.userMe.name,
                "lastName": myAppState.userMe.lastName,
                "email": myAppState.userMe.email,
                "age" : myAppState.userMe.profile.age.toString(),
                "city": myAppState.userMe.profile.city,
                "niveau" : myAppState.userMe.profile.niveau,
                "country": myAppState.userMe.profile.country,
                "etablissement" : myAppState.userMe.profile.etablissement,
                "description"  : myAppState.userMe.profile.description,
                "photo": FileModel.newWithValues(
                    photo
                )
            }
        })
    }

    const OnHandleSubmit = () => {
        const errMsg = Localization.word("error") + ': ' + Localization.sentence("error_on_update");
        const userPresenter = new UserPresenter();
        const isValid = userPresenter.validateUserMeForm(state)
        if (isValid.error) {
            showToast(isValid.msg, 2)
        } else {
            AppActions.displayLoader(true)
            userPresenter.updateUserMe(state)
                .then(res => {
                    AppActions.displayLoader(false)
                    if (res.status !== 1) {
                        showToast(errMsg, 2)
                    } else {
                        showToast(Localization.sentence("success_on_update"), 1);
                        navigation.goBack();
                    }
                })
                .catch(err => {
                    AppActions.displayLoader(false);
                    showToast(errMsg, 2)
                });
        }
    }

    const OnInputChange = (value, key) => {
        dispatch({
            type: 'ON_CHANGE',
            value: value,
            key: key
        })
    }

    const showToast = (msg, type) => {
        AppStore.emit("displayToast", {
          message: msg,
          type: type,
        });
    }

    const GetImage = () => {
        setShowModalImg(true)
    }

    const GoToPasswordScreen = () => {
        navigation.navigate('AccountPassword');
    }
    
    return (
        <View style={[styles.containerMe, { paddingBottom: Constants.platform.ios ? state.keyboardHeight : 0 }]}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={[styles.contentContainer]}
                keyboardDismissMode={"on-drag"}
                showsVerticalScrollIndicator={false}
                keyboardDismissMode={"interactive"}
                ref={ref => scrollRef = ref}>
                <View style={{ height: StylesVariables.spacing }} />
                <View style = {{width: '100%', alignItems:'center'}}>
                        <View
                            style={styles.avatarContainer}
                        >
                            <ImageBackground
                                style={{width: '100%', height: '100%'}}
                                source={{uri: state.photo?.file}}
                            />
                        </View>
                        {
                        <TouchableOpacity 
                            style={styles.titlePhotoC}
                            onPress={GetImage}
                        >
                            <Text style={styles.titlePhoto}>  
                                Modifier la photo
                            </Text>
                        </TouchableOpacity>
                        }
                        {
                            /*
                        state.photo?.updated  &&
                        <TouchableOpacity onPress={CancelImage}>
                        <Text style={styles.titlePhoto}>  
                                Canceller
                            </Text>
                        </TouchableOpacity>
                        */
                        }
                </View>
                <View style={{ height: StylesVariables.spacing }} />
                <View style={styles.inputContent}>
                    <View style={styles.label}>
                        <Text style={styles.labelTxt}>{"Prénom"}</Text>
                    </View>
                <FormInputText
                    callback={(value) => OnInputChange(value, 'name')}
                    disabled={false}
                    title={Localization.word('prenom')}
                    value={state.name}
                    key="name" />
                </View>
                <View style={{ height: StylesVariables.spacing }} />
                <View style={styles.inputContent}>
                    <View style={styles.label}>
                        <Text style={styles.labelTxt}>{"Nom"}</Text>
                    </View>
                <FormInputText
                    callback={(value) => OnInputChange(value, 'lastName')}
                    disabled={false}
                    title={Localization.word('nom')}
                    value={state.lastName}
                    key="lastName" />
                </View>
                <View style={{ height: StylesVariables.spacing }} />
                <View style={styles.inputContent}>
                    <View style={styles.label}>
                        <Text style={styles.labelTxt}>{"Email"}</Text>
                    </View>
                    <FormInputText
                        callback={(value) => OnInputChange(value, 'email')}
                        disabled={true}
                        title={Localization.word('email')}
                        value={state.email}
                        key="email" 
                    />
                </View>
                <View style={{height: StylesVariables.spacing}} />
                <View style={styles.inputContent}>
                    <View style={styles.label}>
                        <Text style={styles.labelTxt}>{"Age"}</Text>
                    </View>
                    <FormInputText
                        callback={(value) => { OnInputChange(value, 'age') }}
                        disabled={false}
                        keyboardType={"numeric"}
                        title={Localization.word('age')}
                        value={state.age}
                        key="age" />
                </View>                    
                <View style={{ height: StylesVariables.spacing }} />
                <View style={styles.inputContent}>
                    <View style={styles.label}>
                        <Text style={styles.labelTxt}>{"Ville"}</Text>
                    </View>
                    <FormInputText
                        callback={(value) => OnInputChange(value, 'city')}
                        disabled={false}
                        title={Localization.word('ville')}
                        value={state.city}
                        key="city" 
                    />
                </View> 
                <View style={{height: StylesVariables.spacing}} /> 
                <View style={styles.inputContent}>
                    <View style={styles.label}>
                        <Text style={styles.labelTxt}>{""}</Text>
                    </View>
                <TouchableOpacity 
                    onPress={GoToPasswordScreen}
                >
                <FormInputText
                    callback={(value) => OnInputChange(value, 'password')}
                    disabled={false}
                    OnFocus={GoToPasswordScreen}
                    secure={true}
                    title={Localization.word('mot_de_passe')}
                    value={"*****"}
                    key="password" />
                </TouchableOpacity>
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

export default MeAccountScreen;
