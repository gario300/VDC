import React from 'react'
import InputSelecti from '../../UIComponents/Input/select.inputIcon.component'
import {View} from 'react-native'
import StylesVariables from '../../Styles/app.style'

const InputSelect = ({Icon, placeholder, callBack, id, value, items}) => {
    return(
        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
            <InputSelecti
                style={{color: 'transparent', backgroundColor: 'transparent'}}
                items={items}
                selectedValue={value}
                placeholder={placeholder}
                OnChange={(value)=>{
                    callBack(value, id)
                }}
                disabled={false}
                icon={Icon}
            />
        </View>
    )

}

export default InputSelect
