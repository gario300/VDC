import React from 'react'
import { View, StyleSheet,TouchableOpacity } from 'react-native'
import { Feather, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';

const TopBar = ({onClose}) => {

    return(
        <View style={styles.container}>
            <View style={styles.left}>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={onClose}
                >
                    <Feather name="x" size={35} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.right}>
            </View>
        </View>
    )

}

export default TopBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        padding: 8
    },
    left:{
        flex: .5
    },
    right: {
        flex : .5,
        justifyContent: 'flex-end',
        flexDirection : 'row',
        alignItems: 'center'
    },
    btn: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
