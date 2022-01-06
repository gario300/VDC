import React, { forwardRef, useImperativeHandle } from 'react'
//import DateTimePicker from '@react-native-community/datetimepicker';
import { View, TouchableOpacity, StyleSheet,Platform, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import StylesVariables from '../../Styles/app.style';
import moment from 'moment'
const InputDate = ({ type, onOpen, vissibleValue,value }) => {

    const viewDate = () => {
        onOpen();
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={viewDate}
                style={styles.container}>
                <View style={styles.button}>
                    {
                        type == 'date' ? 
                        (
                            <View style={{flex: .1, minWidth: 24, marginLeft: StylesVariables.spacing}}>
                                <MaterialCommunityIcons name="calendar" size={24} color='#2EC0BA' />
                            </View>
                        ) :  (
                            <View style={{flex: .1, minWidth: 24, marginLeft: StylesVariables.spacing}}>
                                <MaterialIcons name="access-time" size={24} color="#2EC0BA" />
                            </View>
                        )
                    }
                    <Text style={{flex: 1, color: StylesVariables.grayDarkColor, marginLeft: StylesVariables.spacing/2}}>
                        { value == '' ? 'Date' : moment(JSON.stringify(value).substring(1, 11),'YYYY-MM-DD').format('DD/MM/YYYY')}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )

}

export default InputDate

const styles= StyleSheet.create({
    container: {
        width: '100%'
    },
    button: {
        width: '100%',
        borderWidth: .5,
        height: 50 * StylesVariables.responsiveMulti,
        borderColor: StylesVariables.borderColor,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
})
