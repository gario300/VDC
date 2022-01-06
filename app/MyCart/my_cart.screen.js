import React from 'react';
import { Text, View, Image, TouchableHighlight, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AppStore from '../Flux/AppStore';
import filtersState from './../ProductFilters/filters_state';
import locationState from './../Location/location_state';

import StylesVariables from './../Styles/app.style';
import styles from './../Styles/my_cart.style';

import producersState from './../Producers/producers.state';
import * as Price from './../Utils/price';
import AddRemoveButton from '../UIComponents/Button/button_add_remove.component';
import AppIcons from '../AppIcons/app_icons';
import myCartState from './my_cart.state';

import * as AppActions from "./../Flux/AppActions";

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const image = require('../../assets/logo/localshopi_logo.png');

export default MyCartScreen = (props) => {
    
    const [onUpdate, setOnUpdate] = React.useState(false);
    const [producers, setProducers] = React.useState([]);

    const verifyCartProducts = () => {
        const producersProductsCart = myCartState.getCartDataWithProducers(producersState.getData);
        setProducers(producersProductsCart);
    }
    
    useFocusEffect(
        React.useCallback(() => {
            verifyCartProducts();
            return () => { }
        }, [])
    );
    
    React.useEffect( () => {

        const OnFilterUpdated = () => {
            setOnUpdate(!onUpdate)
        }

        AppStore.on("filterUpdated", OnFilterUpdated);

        return () => {
            AppStore.removeListener("filterUpdated", OnFilterUpdated);
        }
    }, []);

    const OnUpdateItemCount = (item, count) => {
        if (count < 1) {
            count = 1;
        }

        const newList = [];
        producers.forEach( (producer) => {
            
            if (item.producerId !== producer.id) {
                newList.push(producer);
                return;
            }

            const products = producer.items.map(product => {
                if (product.sku === item.sku) {
                    product.count = count;
                    product.total = product.count * product.price;
                }
                myCartState.updateItem(product);
                return product;
            });

            newList.push(
                {
                    ...producer,
                    "items": products
                }
            )
        });

        setProducers(newList);
    }

    const OnDeleteItem = (item) => {
        const newList = [];
        producers.forEach( (producer) => {
            
            if (item.producerId !== producer.id) {
                newList.push(producer);
                return;
            }

            const products = producer.items.filter(filter => filter.sku !== item.sku);
            if (products.length <= 0) return;
            newList.push(
                {
                    ...producer,
                    "items": products
                }
            )
        });
        AppActions.removeFromCart(item.sku);
        setProducers(newList)
    }

    const getTotal = () => {
        let total = 0;
        producers.forEach( (producer) => {
            producer.items.forEach(product => {
                total += product.total;
            });
        });
        return total;
    }

    const producerElements = [];

    producers.forEach ((producer, index) => {
        const producerItems = [];
        const items = producer.items
        items.forEach((item, index) => {
            if (index > 0) {
                producerItems.push(<View key={"line_0_" + item.key} style={styles.lineSeparator} /> )
            }
            const element = (
                <View 
                    key={"prod_" + item.key}
                    style={styles.cartItemContainer}
                >
                    <View style={styles.cartItemContent}>
                        <View style={styles.inlineContent}>
                            <View style={styles.cartItemInfo}>
                                <Text style={styles.cartText}>{item.title}</Text>
                            </View>
                            <View style={styles.cartItemPrice}>
                                <Text style={styles.cartItemPriceText}>{Price.formatPrice(item.price)}</Text>
                            </View>
                        </View>
                        <View style={styles.inlineContent}>
                            <View style={styles.selectButtons}>
                                <AddRemoveButton 
                                    type="Remove"
                                    id={item.id}
                                    callback={() => {
                                        OnUpdateItemCount(item, item.count - 1);
                                    }}
                                />
                                <View style={styles.addRemoveCount}>
                                    <Text style={styles.addRemoveCountText}>
                                        {item.count}
                                    </Text>
                                </View>
                                <AddRemoveButton 
                                    type="add"
                                    id={item.id}
                                    callback={() => {
                                        OnUpdateItemCount(item, item.count + 1);
                                    }}
                                />
                            </View>
                            <View style={styles.cartTotalPrice}>
                                <Text style={styles.cartTotalPriceText}>{`Total : ${Price.formatPrice(item.total)}`}</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => {
                                    OnDeleteItem(item);
                                }}
                                style={styles.deleteButton}
                            >
                                <AppIcons.DeleteIcon />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
            producerItems.push(element) 

            if (index >= items.length -1) {
                producerItems.push(<View key={"line" + item.key} style={styles.lineSeparator} /> )
                producerItems.push(
                    <View 
                        key={"prod_end" + item.key}
                        style={styles.cartItemContainer}
                    >
                        <View style={styles.cartItemLocContent}>
                            <View style={styles.spacing} />
                            <View style={styles.cartItemTitle}>
                                <Text style={styles.cartItemTitleText}>{"CONDITION DE RETRAIT".toUpperCase()}</Text>
                            </View>
                            <View style={styles.spacing} />
                            <View style={styles.inlineContent}>
                                <View style={styles.leftIcon}>
                                    <AppIcons.ImageLocation />
                                </View>
                                <View style={styles.itemLocationContainer}>
                                    <Text style={styles.itemLocationText}>{`${producer.pickHourTime}
    - ${producer.directionComplete}
    - ${producer.pickHourTime} `}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }
        });
        
        producerElements.push(
            <View 
                key={"producder_ " + producer.id}
                style={styles.contentBody}
            >
                <View style={styles.content}>
                    <View style={[styles.inlineTitle]}>
                        <Text style={styles.cartTitleText}>{"CHEZ : "}</Text>
                        <Text style={[styles.cartTitleText, styles.cartTitleTextBold]}>{producer.title}</Text>
                    </View>
                </View>
                <View style={styles.producerCartContainer}>
                    {producerItems}
                </View>
            </View>
        );
    });

    const OnContinuePayment = () => {
        props.navigation.navigate("PaymentAccountValidation");
    }
    
    return (
        <View style={styles.container}>
            {producers.length > 0 && (
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {producerElements}
            </ScrollView>)}
            {producers.length > 0 && (
            <TouchableHighlight
                style={styles.payButton}
                onPress={OnContinuePayment}
                underlayColor={StylesVariables.textColorLight}
            >
                <View style={styles.payFooterContainer}>
                    <Text style={styles.payButtonText}>{"Je valide mon panier "}</Text>
                    <Text style={styles.payButtonTotal}>{ Price.formatPrice(myCartState.getTotal()) }</Text>
                </View>
            </TouchableHighlight>)}
            {producers.length <= 0 && (
            <View style={styles.emptyResult}>
                <View style={styles.backgroundImgContainer}>
                    <Image 
                        source={image} 
                        resizeMode={'contain'}
                        style={styles.backgroundImg}
                    />
                </View>
                <View style={styles.emptyResultSquare}>
                    <MaterialCommunityIcons name="cart-off" size={styles.emptyIcon.fontSize} color={styles.emptyIcon.color} />
                </View>
            </View>)}
        </View>
    )

}