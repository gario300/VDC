import React, { useEffect, useLayoutEffect, useState, useReducer } from 'react';
import { View, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from '../account.style';
import * as Model from './model';
import * as AppActions from '../../Flux/AppActions';
import AppStore from '../../Flux/AppStore';
import myAppState from '../../AppState/app_state';
import FormGenerator from '../../Forms/form_generator';
import authState from './../../Auth/auth.state';
import StylesVariables from '../../Styles/app.style';

const reducer = (prevState, action) => {
    switch (action.type) {
        case 'ON_CHANGE':
            return {...prevState, [action.key]: action.value}
        case 'INITIALIZE':
            return {
                ...action.value
            }
    }
}

const generateFormWithSpacing = (values, callback) => {
    const formGenerator = new FormGenerator();
    const inputModel = Model.inputModel(true);
    const separator = (key) => <View key={key} style={{ height: StylesVariables.spacing }} />

    const formInput = formGenerator.generate(inputModel, values, callback)
    const formWithSpacing = []
    formInput.forEach((element, index) => {
        formWithSpacing.push(element)
        formWithSpacing.push(separator(`${element.key}_${index}`));
    })
    return formWithSpacing;
}

const MyFileScreen = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const [state, dispatch] = useReducer(reducer, {...Model.model})

    useLayoutEffect(() => {
        if (authState.isAuthAnonym) {
            AppActions.doLogout();
            return;
        }
    }, [])

    useEffect(() => {
        AppStore.on('onSetUser', setUser);
        return () => {}
    }, [])

    useEffect(() => {
        if(isFocused) {
            AppActions.getUserMe();
        }
    }, [isFocused])

    useLayoutEffect(() => {
        navigation.setOptions({ OnRightPress: () => onEditPressed() })
        return () => { };
    }, [state])

    const setUser = () => {
        dispatch({
            type: 'INITIALIZE',
            value: myAppState.profile
        })
    }

    const OnInputChanged = (value, key) => {
        dispatch({
            type: 'ON_CHANGE',
            key: key,
            value: value,
        })
    }

    const onEditPressed = () => {
        navigation.navigate('MyFileEdit', { file: state })
    }

    const renderForm = generateFormWithSpacing(state, OnInputChanged)

    return (
        <ScrollView style={styles.containerWPadding}>
            {renderForm}
            <View style={styles.separator} />
        </ScrollView>
    )
}

export default MyFileScreen
