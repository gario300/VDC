import React from 'react'
import { View, ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import StylesVariables from '../../Styles/app.style'
const PurchaseComponent = ({status}) => {

    switch(status){
       case 0:
            return(
                <View 
                    style={[styles.statusContainer, {backgroundColor : 'white' }]}
                >  
                    <Text style={styles.textStatus}>
                        Termineé
                    </Text> 
                </View>
                
            )
        case 6: 
            return(
                <View 
                    style={[styles.statusContainer, {backgroundColor : '#77D353' }]}
                >   
                    <Text style={styles.textStatus}>
                        Vendue
                    </Text>
                </View> 
            )
        case 7: 
            return(
                <View 
                    style={[styles.statusContainer, {backgroundColor : '#969FAA' }]}
                >   
                    <Text style={[styles.textStatus, {color: 'white'}]}>
                        Anulée
                    </Text>
                </View>
            )
        case 5:  
            return(
                <View 
                    style={[styles.statusContainer, {backgroundColor : '#343F4B' }]}
                >   
                    <Text style={[styles.textStatus, {color: 'white'}]}>
                        Litige ouvert
                    </Text>
                </View>
            )
        case 1:
            return(
                <View 
                    style={[styles.statusContainer, {backgroundColor : '#00A6FF' }]}
                >     
                    <Text style={styles.textStatus}>
                        Acheté
                    </Text> 
                </View>
            )

    }

    return null
}

export default PurchaseComponent

const styles = StyleSheet.create({
    statusContainer: {
        width: '100%',
        position: 'absolute',
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height:45
    },
    textStatus: {
        ...StylesVariables.appText,
        color: StylesVariables.grayDarkColor
    }
})
