import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './index.styles'
import StylesVariables from '../Styles/app.style'

const NotificationsMessages  = ({type, setType}) => { 
    const menu = [
        {
            route: 'ChatHome',
            name: 'Messages'
        },
        {
            route: 'Notifications',
            name: 'Notifications'
        } 
    ]

    return(
        <View style={styles.row}>
            {
                menu.map( (item, index) => {
                    return (
                        <TouchableOpacity
                            key={0}
                            onPress={()=>{
                                setType(item.name)
                            }}
                            style={styles.column}
                        >
                            <View
                                style={[styles.textMenuContainer, { 
                                    borderBottomColor : type == item.name ? StylesVariables.grayDarkColor : StylesVariables.grayColor ,
                                    borderBottomWidth : type == item.name ? 1.5 : 0
                                }]}
                            >
                                <Text style={styles.textMenu}>
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default NotificationsMessages
