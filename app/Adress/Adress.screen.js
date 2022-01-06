import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { styles } from './Adress.styles'
import InputText from '../UIComponents/Input/input_text.component'
import Textarea from '../UIComponents/Input/Textarea.component'
import NormalButton from '../UIComponents/Button/normal_button.component'
import AddressPresenter from './address.presenter'
import MyAppState from '../AppState/app_state'
import * as AppActions from '../Flux/AppActions';
import AppStore from '../Flux/AppStore'
import { useIsFocused } from '@react-navigation/native';

const AdressScreen = ({navigation, route}) => {
    const isFocused = useIsFocused()
    const [form, setForm] = useState({
        pays: '',
        adresse: '',
        cp: '',
        ville: '',
        description: '',
    });
    const [disabled, setDisabled] = useState(false);
       
   


    const sendForm = () => {
        setDisabled(true)
        AppActions.displayLoader(true)    
        const userId = MyAppState.userMe.profile.id
        const cPressenter = new AddressPresenter()
        cPressenter.newAddress(form, userId)
            .then(() => {
                setDisabled(false)
                navigation.goBack()
            }).catch(error => {
                setDisabled(false)
                AppActions.displayLoader(false)
                AppStore.emit("displayToast", {
                    message: error,
                    type: 2
                });
            })
    }

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.row}>
                    <Text style={styles.titleText}>
                        Nom el prenom
                    </Text>
                        <InputText
                            placeholder={"Ex : Maelle Vesval"}
                            callback={(value)=>{
                                onChangeForm('nom', value)
                            }}
                        />
                </View>
                <View style={styles.row}>
                    <Text style={styles.titleText}>
                        Pays
                    </Text>
                        <InputText
                            placeholder={"France"}
                            callback={(value)=>{
                                onChangeForm('pays', value)
                            }}
                        />
                </View>
                <View style={styles.row}>
                    <Text style={styles.titleText}>
                        Ville
                    </Text>
                        <InputText
                            placeholder={"France"}
                            callback={(value)=>{
                                onChangeForm('ville', value)
                            }}
                        />
                </View>
                <View style={styles.row}>
                    <Text style={styles.titleText}>
                        {"Complément d'adresse (facultatif)"}
                    </Text>
                        <InputText
                            placeholder={"(bâtiment, étage, etc...)"}
                            callback={(value)=>{
                                onChangeForm('adresse', value)
                            }}
                        />
                </View>
                <View style={styles.row}>
                    <Text style={styles.titleText}>
                        {"Code Postal"}
                    </Text>
                        <InputText
                            placeholder={"Ex : 35000"}
                            callback={(value)=>{
                                onChangeForm('cp', value)
                            }}
                        />
                </View>
                <View style={styles.row}>
                    <Text style={styles.titleText}>
                        Description *
                    </Text>
                        <Textarea
                            placeholder={"Ex : Très bon état, porté une fois "}
                            callback={(value)=>{
                                onChangeForm('description', value)
                            }}
                        />
                </View>
                <View
                    style={[styles.row, { height : 80, padding: 8, alignItems: 'center'} ]}
                >
                    <NormalButton 
                        disabled={disabled}
                        title={ 'Enregister' }
                        callback={()=>{sendForm()}}
                        themeName={"secundary"}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default AdressScreen
