
import React, {forwardRef, useImperativeHandle} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, TouchableOpacity, StyleSheet,Platform, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import StylesVariables from '../../Styles/app.style';


const InputDate = forwardRef(({callBack, id, type, value}, ref)=> {
    
    const withI = type === "left" && isNaN(parseInt( value.replace(/:/, ''), 10)) ? false : true

    return(
        <View style={styles.container}>
            <View style={[styles.buttonContent, type === 'left' && {justifyContent: 'space-evenly'}, withI && {flex: 2}]}>
                {
                    type !== 'left' ? 
                    (
                        null
                    ) :  (
                        <View style={styles.icon}>
                            {<MaterialIcons name="access-time" size={24} color={StylesVariables.borderColor} />}
                        </View>
                    )
                }
                { type == 'left' ?
                    (
                        <Text style={{color: StylesVariables.grayDarkColor}}>
                            {value}
                        </Text>
                    ) :
                    (
                        <Text style={{color: StylesVariables.grayDarkColor}}>
                                {value}
                        </Text>    
                    )
                }
                {
                    type !== 'left' ? 
                    (
                        <View style={styles.icon}>
                        </View>
                    ) :  (
                        null
                    )
                }
            </View>
        </View>
    )


})


export default InputDate

const styles= StyleSheet.create({
    container: {
            flex: 1
    },
    icon: {
        alignItems: 'center',
        width: 24,
        marginHorizontal: 6
    },
    buttonContent: {
        width: '100%',
        height: 48 * StylesVariables.responsiveMulti,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'flex-start'
    }
})
