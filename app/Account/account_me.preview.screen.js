import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, ScrollView,Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from './account.style'
import myAppState from '../AppState/app_state';
import * as AppActions from '../Flux/AppActions';
import * as Arrays from '../Constants/constants.index';
import AppStore from '../Flux/AppStore';
import FormInputText from '../Forms/Components/form_text.component';
import Localization from '../Localization/localization';
import StylesVariables from '../Styles/app.style';
import FormInputSelect from '../Forms/Components/form_select.component';
import InputTextArea from '../UIComponents/Input/multiple_input_text.component'

const initialValues = {
    name: '',
    lastName: '',
    email: '',
    age: '',
    city: '',
    country: '',
    niveau: '',
    age: '',
    etablissement: '',
    language: Localization.getUserLanguage(),
    description: '',
    photo:'' 
}

const AccoutMePreviewScreen = ({navigation}) => {
    const isFocussed = useIsFocused();
    const [data, setData] = useState(initialValues);

    useEffect(() => {
        AppStore.on('onSetUser', setUser);
        return () => {}
    }, [])

    useEffect(() => {
        if(isFocussed) {
            AppActions.getUserMe();
            setTimeout(() => {
                navigation.setOptions({title: Localization.word("mes_donnes")})
            }, 300)
        }
    }, [isFocussed])

    useLayoutEffect(() => {
        navigation.setOptions({OnRightPress: () => navigation.navigate('AccountDetails')})
        return () => {};
    }, [])

    const setUser = () => {
        setData({
            "name": myAppState.userMe.name,
            "lastName": myAppState.userMe.lastName,
            "email": myAppState.userMe.email,
            "age" : myAppState.userMe.age,
            "city": myAppState.userMe.city,
            "niveau" : myAppState.userMe.niveau,
            "country": myAppState.userMe.country,
            "language": myAppState.userMe.profile.selectedLanguage, 
            "ettablissement" : myAppState.userMe.etablissement,
            "description"  : myAppState.userMe.description,
            "photo" : myAppState.userMe.photo[0]
        })
    }

    return (
        <ScrollView>
        <View style={[styles.container, {paddingVertical: StylesVariables.spacing}]}> 
            <View style={{height: StylesVariables.spacing}} />
            <View style = {{width: '100%', alignItems:'center'}}>
                <View
                    style={styles.avatarContainer}
                >                
                </View>
            </View>
            <View style={{height: StylesVariables.spacing}} />
            <FormInputText
                callback={() => {}}
                disabled={true}
                title={Localization.word('prenom')}
                value={data.name}
                key="name" />
            <View style={{height: StylesVariables.spacing}} /> 
            <FormInputText
                callback={() => {}}
                disabled={true}
                title={Localization.word('nom')}
                value={data.lastName}
                key="lastName" />
            <View style={{height: StylesVariables.spacing}} />
            <FormInputText
                callback={() => {}}
                disabled={true}
                title={Localization.word('email')}
                value={data.email}
                key="email" />
            <View style={{height: StylesVariables.spacing}} />
            <FormInputText
                callback={() => {}}
                disabled={true}
                title={Localization.word('age')}
                value={data.age}
                key="age" />
            <View style={{height: StylesVariables.spacing}} />
            <FormInputText
                callback={() => {}}
                disabled={true}
                title={Localization.word('ville')}
                value={data.city}
                key="city" /> 
            <View style={{height: StylesVariables.spacing}} />
            <FormInputText
                callback={() => {}}
                disabled={true}
                secure={true}
                title={Localization.word('mot_de_passe')}
                value={"*****"}
                key="password" /> 
        </View>
        </ScrollView>
    )
}

export default AccoutMePreviewScreen
