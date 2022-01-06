import React from 'react'
import { View, ImageBackground, ScrollView, Text, TouchableOpacity } from 'react-native'
import { styles } from './ImageCarrousel.styles'
import { FontAwesome } from '@expo/vector-icons';
const ImageCarrousel = ({imageArray, onDelete}) => {


    return(
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
            >
                {
                    imageArray.map((image, index) => {
                        return(
                            <View
                                key={index}
                                style={styles.imageContainer}
                            >
                                <ImageBackground
                                    style={{width: '100%', height: '100%'}}
                                    source={{uri: image.file}}
                                >
                                    <View style={styles.deleteContainer}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                onDelete(index)
                                            }}
                                        >
                                            <View
                                                style={styles.deleteButtonContainer}
                                            >
                                                <FontAwesome name="close" size={15} color="white" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default ImageCarrousel
