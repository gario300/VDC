import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

const ButtonGlobal  = ({ style, actions, title, textStyle, icon, iconLeft  }) => {
    return(
        <View style={{width: '100%'}}>
        <TouchableOpacity 
            onPress={actions}
            style={ localStyle.container }>
            <View style={[ localStyle.internalButton, style ]}>
                <View
                    style={{flex: .1}}
                >
                {
                    typeof(iconLeft) !== 'undefined' &&
                    iconLeft()
                }
                </View>
                <View
                    style={{flex: .8, alignItems: 'center'}}
                >
                    <Text style={[ localStyle.stylesText,textStyle ]}>
                        {title}
                    </Text>
                </View>
                <View
                    style={{flex: .1}}
                >
                {
                    typeof(icon) !== 'undefined' &&
                    icon()
                }
                </View>
            </View>
        </TouchableOpacity>    
        </View>
    )
}

const localStyle = StyleSheet.create({
    container: {
        width: '100%'
    },
    internalButton :{
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
   },
   stylesText: {
        fontSize: 18,
        fontWeight: 'bold'
   }
})

export default ButtonGlobal
