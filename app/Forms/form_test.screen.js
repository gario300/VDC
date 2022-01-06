import React, { useState } from 'react';
import { View } from 'react-native';
import * as Model from './form_test.model';
import FormGenerator from './form_generator';
import StylesVariables from '../Styles/app.style';

const getArrayTest = () => {
    let testArray = []
        for (let i = 0; i < 3; i++) {
            testArray.push({
                key: `${i + 1}`,
                value: `${i + 1}`,
                label: `${i + 1}`,
            })
        }
    return testArray
}

const FormGeneratorTestScreen = () => {
    const [values, setValues] = useState({...Model.model});
    const separator = (key) => <View key={key} style={{height: StylesVariables.spacing}} />
    let inputModel = Model.inputModel(getArrayTest(), getArrayTest());


    const OnInputChanged = (value, key) => {
        setValues({
            ...values,
            [key]: value
        })
    }

    const formGenerator = new FormGenerator();
    const formInput = formGenerator.generate(inputModel, values, OnInputChanged)      
    const formWithSpacing = []
    formInput.forEach((element, index) => {
        formWithSpacing.push(element)
        formWithSpacing.push(separator(`${element.key}_${index}`));
    })

    return (
        <View style={{flex: 1,}}>
            {formWithSpacing}
        </View>
    )
}

export default FormGeneratorTestScreen
