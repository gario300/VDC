import FormType from './form.type';

export const model = {
    textTest: "test",
    disabledText: "test",
    numericTest: "123",
    disabledNumeric: "123",
    dateTest: new Date(Date.now()),
    disabledDate: new Date(Date.now()),
    selectTest: '',
    disabledSelect: '',
}

export const inputModel = function(select1 = [], select2 = []) {
    return [
        { 
            id: "textTest",
            type: FormType.Text,
            title: "Text",
            placeholder: "",
            required: true,
            disabled: false,
            onChange: "OnChangeText"
        },
        { 
            id: "disabledText",
            type: FormType.Text,
            title: "Text",
            placeholder: "",
            required: false,
            disabled: true,
            onChange: "OnChangeText"
        },
        { 
            id: "numericTest",
            type: FormType.Number,
            title: "Numeric",
            placeholder: "",
            required: true,
            disabled: false,
            onChange: "OnChangeText",
        },
        { 
            id: "disabledNumeric",
            type: FormType.Number,
            title: "Numeric",
            placeholder: "",
            required: false,
            disabled: true,
            onChange: "OnChangeText",
        },
        { 
            id: "dateTest",
            type: FormType.Date,
            title: "Date",
            placeholder: "",
            required: true,
            disabled: false,
            onChange: "OnChangeDate",
        },
        { 
            id: "disabledDate",
            type: FormType.Date,
            title: "Date",
            placeholder: "",
            required: false,
            disabled: true,
            onChange: "OnChangeDate",
        },
        { 
            id: "selectTest",
            type: FormType.Select,
            title: "Select",
            required: true,
            placeholder: "Select item",
            disabled: false,
            list: select1.map( element => {
                return {
                    "id": element.key,
                    "label": element.value,
                    "value": element.key
            }}),
            onChange: "OnChangeSelect",
        },
        { 
            id: "disabledSelect",
            type: FormType.Select,
            title: "Select",
            required: false,
            placeholder: "Select item",
            disabled: true,
            list: select2.map( element => {
                return {
                    "id": element.key,
                    "label": element.value,
                    "value": element.key
            }}),
            onChange: "OnChangeSelect",
        },
    ]
}