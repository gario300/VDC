import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { initStripe } from '@stripe/stripe-react-native';
const publicKey = 'pk_live_51JBK0ODI7S7mtP7kyT03yNErWwVRwe3HpRCvbiE5DdZuJaoVfYAtNYIY9W3bTCpUhD5kMfEesWXRQ6eStEJ5Dq8K007flhuN4I'
import { CardField, useStripe } from '@stripe/stripe-react-native'
import NormalButton from '../UIComponents/Button/normal_button.component'


const PaymentCard = () => {
    const [card, setCard] = useState({});
    
    useEffect(() => {
    initStripe({
      publishableKey: publicKey,
      merchantIdentifier: 'merchant.identifier',
    });
    }, []);

    const registerCard = () => {
        console.log(card)
    }

    return(
        <View
            style={{flex: 1}}
        >
            <CardField
                postalCodeEnabled={true}
                placeholder={{
                number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
                }}
                style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    setCard(cardDetails)
                }}
                onFocus={(focusedField) => {
                console.log('focusField', focusedField);
                }}
            />
            <View style={{
                width: '100%', 
                height: 50,
                alignItems: 'center'
                }}
            >
                <NormalButton
                    title={"Enregister Card"}
                    callback={registerCard}
                />
            </View>
        </View>
    )
}

export default PaymentCard

    
