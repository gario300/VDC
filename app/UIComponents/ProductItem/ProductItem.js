import React from 'react'
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native'
import  { styles } from './ProductItem.styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProductItem = ({callBack, carroussel, item }) => {
    
    const taileArray = () => {
        if (item.taille.length < 1) {
            return ''
        } else if(item.taille.length == 1) {
            return item.taille[0]
        } else if(item.taille.length > 1){
            return `${item.taille[0]} et ${item.taille.length -1}`
        }
    }

    return(
        <TouchableOpacity
            onPress={callBack}
            style={styles.boxContent}
        >
            <View style={carroussel ? styles.carroussel : styles.box}>
                <View style={styles.boxTop}>
                    <ImageBackground
                        source={{uri: item.articleImage}}
                        style={{paddig: 15, width: '100%', height: '100%'}} 
                    >
                        <View style={{width: '100%', alignItems: 'flex-end'}}>
                            <MaterialCommunityIcons name="layers-outline" size={20} color="white" />
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.bosxBody}>
                    <Text style={styles.priceTitle}>
                        {item.price} €
                    </Text>
                    <Text style={styles.priceSubtitle}>
                        {item.title}
                    </Text>
                    <Text style={styles.priceSize}>
                        {item.taille}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductItem
