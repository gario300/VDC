import React from 'react'
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native'
import  { styles } from './ProductItem.styles'
import { Ionicons } from '@expo/vector-icons';

const ProductItem = ({callBack, item}) => {
    
    const statusCurrent = () => {
        switch (item.status) {
            case 0:
                return (
                    <View 
                        style={[styles.statusContainer, {backgroundColor : 'white' }]}
                    >  
                        <View
                            style={{flex: .67, alignItems: 'flex-end'}}
                        >
                            <Text style={styles.textStatus}>
                                Termineé
                            </Text>
                        </View>
                        <View
                            style={{flex: .33, alignItems: 'flex-end'}}
                        >
                            <View
                                style={{
                                    width: 20, 
                                    height: 25, 
                                    borderRadius: 20, 
                                    marginLeft: 20, 
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Ionicons
                                    name="shield-checkmark" 
                                    size={17} 
                                    color="#E1332B" 
                                />
                            </View>
                        </View>
                    </View>
                )
            break;
            case 6:
                return(
                    <View 
                        style={[styles.statusContainer, {backgroundColor : '#77D353' }]}
                    >   
                        <View
                            style={{flex: .65, alignItems: 'flex-end'}}
                        >
                            <Text style={styles.textStatus}>
                                Vendue
                            </Text>
                        </View>
                        <View
                            style={{flex: .35, alignItems: 'flex-end'}}
                        >
                            <View
                                style={{
                                    width: 20, 
                                    height: 25, 
                                    borderRadius: 20, 
                                    marginLeft: 20, 
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Ionicons
                                    name="shield-checkmark" 
                                    size={17} 
                                    color="#E1332B" 
                                />
                            </View>
                        </View> 
                    </View>
                )
            break;
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
            break;
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
            break;
            case 1:
                return(
                    <View 
                        style={[styles.statusContainer, {backgroundColor : '#00A6FF' }]}
                    >    
                        <View
                            style={{flex: .60, alignItems: 'flex-end'}}
                        >
                            <Text style={styles.textStatus}>
                                Acheté
                            </Text>
                        </View>
                        <View
                            style={{flex: .40, alignItems: 'flex-end'}}
                        >
                            <View
                                style={{
                                    width: 20, 
                                    height: 25, 
                                    borderRadius: 20, 
                                    marginLeft: 20, 
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Ionicons
                                    name="shield-checkmark" 
                                    size={17} 
                                    color="#E1332B" 
                                />
                            </View>
                        </View>
                    </View>
                )
            break;
        }
    }

    return(
        <TouchableOpacity
            style={{flex: .5}}
            onPress={callBack}
        >
            <View style={styles.box}>
                <View style={styles.boxTop}>
                    <ImageBackground
                        source={{uri: item.articleImage}}
                        style={{paddig: 15, width: '100%', height: '100%'}} 
                    >
                        { statusCurrent() }
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
