import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from  'react-native'

const DownloadItem = ({Icon, textArray, rightIcon, document, action, stylesHelpers }) => {
    const otherIcon = () => {
        if(typeof(rightIcon) == 'undefined'){
            return null
        }
        return rightIcon()
    }

    return (
        <TouchableOpacity
            onPress={()=>{
                action(document)
            }}
            style={{width: '100%'}}
        >
            <View style={styles.container}>
                {
                    Icon !== null &&
                    <View
                        style={styles.left}
                    >
                        {Icon()} 
                    </View>
                }
                <View
                    style={[styles.right, { flex: Icon == null ? .73 : .6 }, 
                    typeof(stylesHelpers) !== 'undefined' ? stylesHelpers : {} ]}
                >
                    {
                        textArray.map( ( item, index ) => {
                            return(
                                <Text key={index}  style={[item.style, {marginVertical: 4}]}>
                                    {item.title}
                                </Text>
                            )
                        })
                    }
                </View>
                <View
                    style={styles.end}
                >
                    {otherIcon()} 
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DownloadItem

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: .5,
        borderColor: '#8190A5',
        paddingVertical: 5,
        marginVertical: 3,
    },
    left: {
        flex: .13,
        padding: 8,
        alignItems: 'center'
    },
    right: {
        flex: .6,
        padding: 8
    },
    end: {
        flex: .27,
        alignItems: 'flex-end'
    }

})
