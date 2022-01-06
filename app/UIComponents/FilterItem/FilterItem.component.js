import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from  'react-native'
import StylesVariables from '../../Styles/app.style'

const DownloadItem = ({TitleLeft, textArray, rightIcon, document, action, stylesHelpers, titlecolor }) => {
    const row = []
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
                >
                    {
                        textArray.map( ( item ) => {
                            return(
                                <Text style={[item.style, { 
                                    marginVertical: 4,
                                    color: typeof(titlecolor) !== 'undefined' ? titlecolor : StylesVariables.grayColor
                                }]}>
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
        paddingVertical: 5,
        marginVertical: 3
    },
    left: {
        flex: .45,
        padding: 8,
    },
    titleLeft: {
        ...StylesVariables.appText,
        fontSize: 16,
        color: StylesVariables.grayColor
    },
    right: {
        flex: .55,
        padding: 8,
        alignItems: 'flex-end',
        flexWrap: 'wrap'
    },
    end: {
        flex: .1,
        alignItems: 'flex-end'
    }

})
