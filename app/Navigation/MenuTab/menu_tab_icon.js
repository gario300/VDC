import React, { useEffect, useState } from 'react';
import { View,Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import AppStore from '../../Flux/AppStore';
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    items: {
        position: 'absolute',
        left: 15 * StylesVariables.responsiveMulti,
        top: 2,
        backgroundColor: StylesVariables.redColor,
        borderRadius: 50,
        width: 12 * StylesVariables.responsiveMulti,
        height: 12 * StylesVariables.responsiveMulti,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: { 
        color: StylesVariables.whiteColor,
        fontSize: StylesVariables.textFontSize - 5,
        textAlign: 'center',
    }
})


const MenuTabIcon = (color, icon, size) => {
    const [itemsCount, setItemsCount] = useState(0);

    useEffect(() => {
        //AppStore.on("cartItemAdded", this.OnCartItemAdded);
        //AppStore.on("cartItemRemoved", this.OnCartItemRemoved);
        return () => {
            //AppStore.removeListener("cartItemAdded", this.OnCartItemAdded);
            //AppStore.removeListener("cartItemRemoved", this.OnCartItemRemoved);
        }
    }, [])

    return (
        <View style={styles.container}>
            <AntDesign name={icon} size={size} color={color} />
            {itemsCount > 0 && (
            <View style={styles.items} >
                <Text style={styles.textStyle}>
                    {itemsCount}
                </Text>
            </View>
            )}
        </View>
      );
}

export default MenuTabIcon