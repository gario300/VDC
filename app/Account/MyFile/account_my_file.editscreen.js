import React, { useLayoutEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import * as Model from './model';
import * as AppActions from '../../Flux/AppActions';
import AppStore from '../../Flux/AppStore';
import styles from '../account.style';
import UserPresenter from '../../User/user.presenter';
import FormGenerator from '../../Forms/form_generator';
import StylesVariables from '../../Styles/app.style';
import Localization from '../../Localization/localization';

const MyFileEditScreen = ({ route, navigation }) => {
    const { params } = route
    const [values, setValues] = useState(params.file);
    const formGenerator = new FormGenerator();
    const inputModel = Model.inputModel(false);
    const separator = (key) => <View key={key} style={{ height: StylesVariables.spacing }} />


    useLayoutEffect(() => {
        navigation.setOptions({ OnRightPress: () => OnUpdateMyFile(values) })
        return () => { }
    }, [values])

    const OnInputChanged = (value, key) => {
        setValues({
            ...values,
            [key]: value
        })
    }

    const OnUpdateMyFile = (data) => {
        AppActions.displayLoader(true);
        const presenter = new UserPresenter();
        presenter.updateMyFile(data)
            .then(res => {
                AppActions.displayLoader(false);
                if(res.status === 1) {
                    showToast(Localization.word("success_on_update"), 1)
                    navigation.goBack();
                } else {
                    showToast(Localization.word("error_on_update"), 2)
                }
            })
            .catch(err => {
                AppActions.displayLoader(false);
                showToast(Localization.word("error_on_update"), 2)
            })
    }

    const showToast = (msg, type) => {
        AppStore.emit("displayToast", {
          message: msg,
          type: type,
        });
    }

    const OnInputFocus = () => {
        
    }

    const formInput = formGenerator.generate(inputModel, values, OnInputChanged, OnInputFocus)
    const formWithSpacing = []
    formInput.forEach((element, index) => {
        formWithSpacing.push(element)
        formWithSpacing.push(separator(`${element.key}_${index}`));
    })

    return (
        <ScrollView style={styles.containerWPadding}>
            {formWithSpacing}
            <View style={styles.separator} />
        </ScrollView>
    )
}

export default MyFileEditScreen
