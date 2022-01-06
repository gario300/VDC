import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, } from  'react-native'
import StylesVariables from '../../Styles/app.style'
import CheckBox from '@react-native-community/checkbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SubFilter = ({TitleLeft, document, action, stylesHelpers, titlecolor, value }) => {
   
    return (
        <TouchableOpacity
            onPress={()=>{
                action(document)
            }}
            style={{width: '100%'}}
        >
            <View style={styles.container}>
                <View
                    style={styles.left}
                >
                    <Text
                        style={[styles.titleLeft, {
                        color: typeof(titlecolor) !== 'undefined' ? titlecolor : StylesVariables.grayColor
                        }]}
                    >
                        {TitleLeft}
                    </Text> 
                </View>
                <View
                    style={[styles.right, 
                    typeof(stylesHelpers) !== 'undefined' ? stylesHelpers : {} ]}
                />                 
                <View
                    style={styles.end}
                >
                    <TouchableOpacity
                        onPress={()=>{
                            action(document)
                        }}
                    >
                        {
                            !value &&
                            <MaterialCommunityIcons name="checkbox-blank-outline" size={30} color="#969FAA" />
                        }
                        {
                            value &&
                            <MaterialCommunityIcons name="checkbox-marked-outline" size={30} color="#969FAA" />
                        }
                    </TouchableOpacity> 
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SubFilter

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 5,
        marginVertical: 3
    },
    left: {
        flex: .5,
    },
    titleLeft: {
        ...StylesVariables.appText,
        fontSize: 16,
        marginLeft: StylesVariables.spacing,
        color: StylesVariables.grayColor
    },
    right: {
        flex: .3,
    },
    end: {
        flex: .2,
        alignItems: 'flex-end'
    }

})
