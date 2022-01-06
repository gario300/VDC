import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import ItemWithBottomIcons from '../UIComponents/DownloadDocumentItem/DownloadItemWithIcons.component'
import { styles } from './Paymethod.styles'
import StylesVariables from '../Styles/app.style'
import ItemNormal from '../UIComponents/DownloadDocumentItem/DownloadItem.screen'
import NormalButton from '../UIComponents/Button/normal_button.component'

const PayMethod = ({navigation}) => {
    const [itemSelect, setItemSelect] = useState(-1);
    
    const IconsArray = [
        function Icon(){
            return ( 
                <Image 
                    style={{width: 30, height: 30 }}
                    source={require('../../assets/icons/visa.png')}
                />
            )
        },
        function Icon(){
            return ( 
                <Image 
                    style={{width: 30, height: 30 }}
                    source={require('../../assets/icons/mastercard.png')}
                />
            )
        }
    ]

    const circleCheckBox = (e) =>{
        return(
        <View style={{ flexDirection: 'row' , alignItems: 'center' }}> 
            <TouchableOpacity
                onPress={()=>{
                    setItemSelect(e)
                }}
            >
                <View
                    style={{
                        borderWidth: .4,
                        borderColor: StylesVariables.grayDarkColor,
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                        backgroundColor: itemSelect == e ? '#343F4B' : 'white',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}    
                >
                    <View
                        style={{
                            width: 9,
                            height: 9,
                            borderRadius: 9,
                            backgroundColor: 'white' 
                        }}
                    />  
                </View>
            </TouchableOpacity>
        </View>
        )
    }

    return(
        <View style={{flex: 1}}>
            <ScrollView
                style={styles.container}
            >
                <ItemWithBottomIcons
                    Icon={()=>{
                        return(
                            <AntDesign name="creditcard" size={30} color="black" />
                        )
                    }}
                    textArray={[{title: 'Carte Bancaire', style: styles.textItem}]}
                    iconsBottom={IconsArray}
                    action={()=>{navigation.navigate('PaymentCard')}}
                    rightIcon={()=>{
                        return circleCheckBox(1)
                    }}
                />
                <ItemNormal
                    Icon={()=>{
                        return(
                            <Image
                                style={{ width: 30, height : 30 }}
                                source={require('../../assets/icons/paypal.png')}
                            />
                        )
                    }}
                    textArray={[{title: 'PayPal', style: styles.textItem}]}
                    rightIcon={()=>{
                        return circleCheckBox(2)
                    }}
                    action={()=>{setItemSelect(2)}}
                />
            </ScrollView>
            <View style={{flex: .2, alignItems: 'center'}}>
                <NormalButton
                    title={"Enregistrer"}
                    callback={()=>{}}
                    themeName={"secundary"}
                />
            </View>
        </View>
    )
}

export default PayMethod
