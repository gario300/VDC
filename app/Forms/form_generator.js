import React from 'react';
import { View } from 'react-native';

import FormType from './form.type';
import StylesVariables from '../Styles/app.style';
import FormInputText from './Components/form_text.component';
import FormInputSelect from './Components/form_select.component';
import FormInputDate from './Components/form_date.component';

class FormGenerator {

    constructor() {
        this.inputsCreator = {
            [FormType.Text]: this.createTextInput,
            [FormType.Number]: this.createNumberInput,
            [FormType.Select]: this.createSelectInput,
            [FormType.Hours]: this.createTextInput,
            [FormType.Date]: this.createDateInput,
            [FormType.Check]: this.createCheckInput,
        }
    }

    createTextInput = (element, value, index) => {
        return (
            <FormInputText
                key={element.id}
                value={value}
                keyboardType={element.hasOwnProperty('keyboardType') ? element.keyboardType : 'default'}
                secure={false}
                title={element.title}
                placeholder={element.placeholder}
                required={element.required}
                multiline={element.multiline}
                disabled={element.hasOwnProperty('disabled') ? element.disabled : false}
                callback={(value) => {
                    element.onChanged(value, element.id)
                }}
                OnFocus={() => {
                    element.onFocus(index)
                }}
            />
        )
    }

    createNumberInput = (element, value, index) => {
        return (
            <FormInputText
                key={element.id}
                value={value}
                keyboardType={"numeric"}
                title={element.title}
                placeholder={element.placeholder}
                required={element.required}
                multiline={element.multiline}
                disabled={element.hasOwnProperty('disabled') ? element.disabled : false}
                callback={(value) => {
                    element.onChanged(value, element.id)
                }}
                OnFocus={() => {
                    element.onFocus(index)
                }}
            />
        )
    }

    createSelectInput = (element, value, index) => {
        return (
            <FormInputSelect
                custom={element.hasOwnProperty('custom') ? element.custom : false}
                disabled={element.hasOwnProperty('disabled') ? element.disabled : false}
                items={element.list}
                key={element.id}
                index={index}
                callback={(value) => element.onChanged(value, element.id)}
                multiple={element.hasOwnProperty('multiple') ? element.multiple : false}
                placeholder={element.placeholder}
                required={element.required}
                size={element.hasOwnProperty('size') ? element.size : 'normal'}
                title={element.title}
                selectedValue={value} />
        )
    }

    createDateInput = (element, value) => {
        return (
            <FormInputDate
                disabled={element.hasOwnProperty('disabled') ? element.disabled : false}
                key={element.id}
                callback={(value) => element.onChanged(value, element.id)}
                required={element.required}
                title={element.title}
                value={value} />
        )
    }

    createCheckInput = (element, value) => {
        return (
            <FormInputCheck
                disabled={typeof element.disabled !== "undefined" ? element.disabled : false}
                isLarge={typeof element.isLarge !== "undefined" ? element.isLarge : false}
                key={element.id}
                OnValueChange={() => element.onChanged(!value, element.id)}
                title={element.title}
                value={value} />
        )
    }

    generate = (inputModel, values, OnInputChanged, OnInputFocus) => {
        return inputModel.map((element, index) => {
            const value = values[element.id];
            element.onChanged = OnInputChanged;
            element.onFocus = OnInputFocus;
            return this.inputsCreator[element.type](element, value, index);
        })
    }

    generateWithSpacing = (inputModel, values, OnInputChanged) => {
        const list = [];
        inputModel.forEach((element, index) => {
            const value = values[element.id];
            element.onChanged = OnInputChanged;
            const component = this.inputsCreator[element.type](element, value, index);
            list.push(component)
            list.push(
                <View style={{
                height: StylesVariables.spacing
            }} />)
        })

        return list;
    }

}

export default FormGenerator;