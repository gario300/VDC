import React from 'react';
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Image, TouchableHighlight } from 'react-native';

import { MaterialIcons, MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';

import { SliderBox } from "react-native-image-slider-box";

import Localization from './../Localization/localization';

import ProducersPresenter from './producers.presenter';
import HoursModal from './producers_hours.modal';

import * as AppActions from "./../Flux/AppActions";
import AppStore from '../Flux/AppStore';
import Messages from './../Message/message';

import styles from './../Styles/product_item.style';
import StylesVariables from './../Styles/app.style';
import myAppState from '../AppState/app_state';

import CardList from './../UIComponents/Cards/card_list.component';
import favouritesState from '../Favourites/favourites.state';
import navigationState from '../Navigation/navigation.state';

import myCartState from './../MyCart/my_cart.state';

const imageLocation = require('./../../assets/products/location.png');
const imageTime = require('./../../assets/products/time.png');
const imageClock = require('./../../assets/products/clock.png');
const imageAgriculture = require('./../../assets/products/agriculture-biologique.png');

import IconButton from './../UIComponents/Button/button_icon.component';
import { AntDesign } from '@expo/vector-icons';

import authState from './../Auth/auth.state';

export default class ProducerDescriptionScreen extends React.Component {

    constructor(props) {

        super(props);
        
        this.presenter = new ProducersPresenter();

        const item = props.route.params.item;

        //myAppState.setPublicationOpened(item);
        this.state = {
            onUpdate: false,
            title: "",
            itemId: "",
            item: item,
            isReady: false,
            images: [],
            products: [],
            isHoursModalActive: false,
            openingHours: this.presenter.parseOpeningHours([])
        };
    }

    componentDidMount = () => {
        //myAppState.resetLinkingUrl();
        this.getProductDetails();
        this.props.navigation.setOptions({
            title: this.state.item.title.toUpperCase(),
            OnRightPress: this.OnGoToMyCart
        })

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.verifyUpdateOnProducts();

            const nextNav = navigationState.getNextNavigation
            if (nextNav) {
                this.props.navigation.goBack();
            }
        });
    }

    OnAddItemCount = (itemId, count) => {
        myCartState.updateItemInPreCart(itemId, count, 1);
        this.verifyUpdateOnProducts();
    }

    OnSubstractItemCount = (itemId, count) => {
        myCartState.updateItemInPreCart(itemId, count, -1);
        this.verifyUpdateOnProducts();
    }

    verifyUpdateOnProducts = () => {
        const items = myCartState.getPreCartItems();
        const newList = [];
        this.state.products.forEach(product => {
            const found = items.find(item => item.id === product.id)
            if (found) {
                product.count = found.count;
            } else {
                product.count = 0;
            }
            newList.push(product)
        });

        this.setState({
            products: newList
        })
    }

    componentWillUnmount = () => {
        this._unsubscribe();
    }

    getProductDetails = () => {
        this.presenter.getItemDescription(this.state.item.id)
        .then(result => {
            //AppActions.displayLoader(false);
            if (result.status === 1) {
                console.log("result.result", result.result)
                const itemDetailed = this.presenter.parseItemDetails(result.result, favouritesState.getData);
                this.setState({
                    isReady: true,
                    item: itemDetailed,
                    products: this.presenter.parseProducts(itemDetailed.products),
                    images: itemDetailed.images,
                    openingHours: this.presenter.parseOpeningHours(itemDetailed.openingHours)
                }, () => {
                    this.props.navigation.setOptions({
                        title: this.state.item.title.toUpperCase()
                    })
                    this.verifyAppLinking();
                });
            }
        })
        .catch(error => {
            console.log("Error: ", error)
            //AppActions.displayLoader(false);
            this.setState({
                isReady: true
            })
        })
    }

    getItemById = (id) => {
        for(let i = 0; i < this.state.products.length; ++i) {
            if (this.state.products[i].id === id) return this.state.products[i];
        }
        
        return false;
    }

    verifyAppLinking = () => {

    }

    OnGoToMyCart = () => {
        this.props.navigation.navigate("Panier", {
            item: this.state.item
        });
    }

    OnSelectedItem = (id) => {
        const item = this.getItemById(id);
        const { navigate } = this.props.navigation;
        navigate('ProductDetail', {
            id: id
        });
    }

    getProductsItemsToRender = (products) => {
        return products.map((item) => {
            return (
                <CardList
                    key={item.id}
                    id={item.id}
                    OnPress={this.OnSelectedItem}
                    OnAddItemCount={this.OnAddItemCount}
                    OnSubstractItemCount={this.OnSubstractItemCount}
                    item={item}
                    count={item.count}
                />
            )
        })
    }

    OnOpenHours = () => {
        this.setState({
            isHoursModalActive: true
        });
    }

    OnOpenMap = () => {
        console.log("Open Map")
        this.props.navigation.navigate("Map", {
            item: this.state.item
        });
    }

    addItemToCart = () => {
        if (authState.isAuthAnonym) {
            AppActions.doLogout();
        } else {
            const newList = [];
            this.state.products.forEach(product => {
                if (product.count > 0) {
                    const item = {
                        "id": product.id,
                        "producerId": product.companyId,
                        "title": product.title,
                        "description": product.descriptionShort,
                        "count": product.count,
                        "price": product.price,
                    }
                    AppActions.addToCart( 
                        myCartState.newItemCart(item, item.count)
                    );
                    product.count = 0;
                    myCartState.updateItemInPreCart(item.id, 0, 0);
                }
                newList.push(product);
            });

            AppStore.emit("displayToast", {
                message: "Produits ajouté",
                type: 1
            });
            this.setState({
                products: newList
            })
        }
    }

    getProductsItems = () => {
        const newList = [];
        this.state.products.forEach(product => {
            if (product.count > 0) {
                newList.push(product);
            }
        });

        return newList;
    }

    render() {
        const item = this.state.item;
        const productsItems = this.getProductsItemsToRender(this.state.products);
        const hasSelectedItems = this.getProductsItems().length > 0;
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    {this.state.isReady &&
                    <View style={styles.scrollContent}>
                        <View style={styles.imageCarouselContainer}>
                            <SliderBox
                                images={this.state.images}
                                imageLoadingColor={StylesVariables.mainColor}
                                sliderBoxHeight={140 * StylesVariables.responsiveHeightMulti}
                                ImageComponentStyle={styles.sliderImageComponent}
                                dotColor={StylesVariables.secondaryColor + "A1"}
                                inactiveDotColor={StylesVariables.textColorLight + "77"}
                            />
                        </View>

                        <View style={styles.content}>
                            <View style={styles.spacing} />
                            <View style={styles.productTextContainer}>
                                <Text style={[styles.infoTitle, {color: "#" + item.color}]}>{item.categories}</Text>
                            </View>
                            <View style={styles.spacing} />
                            <View style={[styles.productTextContainer]}>
                                <Text style={[styles.infoDescription]}>{item.description}</Text>
                            </View>
                            <TouchableOpacity 
                                style={[styles.rowButton ]}
                                activeOpacity={0.8}
                                onPress={this.OnOpenHours}
                            >
                                <View style={styles.imgIconContainer}>
                                    <Image 
                                        source={imageClock} 
                                        resizeMode={'contain'}
                                        style={styles.imageIcon}
                                    />
                                </View>
                                <View style={styles.rowButtonText}>
                                    <Text
                                        style={styles.inlineText}
                                    >
                                        {"Horaires d'ouverture"}
                                    </Text>
                                    <Text 
                                        style={[styles.inlineText, styles.itemTextRight]}
                                    >
                                        {"Voir >"}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.rowButton, styles.columnButton]}
                                activeOpacity={0.8}
                                onPress={this.OnOpenMap}
                            >
                                <View style={[styles.inlineRow]}>
                                    <View style={styles.imgIconContainer}>
                                        <Image 
                                            source={imageLocation} 
                                            resizeMode={'contain'}
                                            style={styles.imageIcon}
                                        />
                                    </View>
                                    <View style={styles.rowButtonText}>
                                        <Text 
                                            style={styles.inlineText}
                                        >
                                            {"Adresse"}
                                        </Text>
                                        <Text 
                                            style={[styles.inlineText, styles.itemTextRight]}
                                        >
                                            {"Y aller >"}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.inlineRow}>
                                    <View style={styles.imgIconContainer}>
                                    </View>
                                    <View style={styles.rowButtonText}>
                                        <Text 
                                            style={styles.itemText}
                                        >
                                            {item.direction}
                                        </Text>
                                        <Text 
                                            style={[styles.itemText, styles.itemTextRight]}
                                        >
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.rowButton}>
                                <View style={styles.imgIconContainer}>
                                    <Image 
                                        source={imageTime} 
                                        resizeMode={'contain'}
                                        style={styles.imageIcon}
                                    />
                                </View>
                                <View style={styles.rowButtonText}>
                                    <Text 
                                        style={styles.itemText}
                                    >
                                        {item.pickHourTime}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {item.isOrganic && (
                        <View style={styles.iconOrganicContainer}>
                            <Image 
                                source={imageAgriculture} 
                                resizeMode={'contain'}
                                style={styles.imgIconOrganic}
                            />
                        </View>
                        )}
                        {item.isFavorite && !authState.isAuthAnonym && (
                        <View 
                            style={styles.iconContainer}
                        >
                            <Ionicons name="md-heart" style={styles.icon} />
                        </View>
                        )}
                        {!item.isFavorite && !authState.isAuthAnonym && (
                        <View 
                            style={styles.iconContainer}
                        >
                            <Feather name="heart" style={styles.icon} />
                        </View>
                        )}
                    </View>
                    }
                    {productsItems}
                    {!this.state.isReady && (
                        <View style={{flex: 1, justifyContent: 'center', minHeight: 400}}>
                            <ActivityIndicator size={'small'} color={'#333'} />
                        </View>
                    )}
                </ScrollView>
                <TouchableHighlight 
                    style={[styles.cartButton, !hasSelectedItems && styles.btnDisabled]}
                    onPress={this.addItemToCart}
                    underlayColor={StylesVariables.secondaryColor}
                    disabled={!hasSelectedItems}
                >
                    <View style={styles.btnContent}>
                        <View style={styles.iconBtnContainer}>
                            <AntDesign name="shoppingcart" size={26} color={StylesVariables.textColor} />
                        </View>
                        <View style={styles.btnTitleContainer}>
                            <Text style={styles.btnTitle}>{"Ajouter au panier"}</Text>
                        </View>
                    </View>
                </TouchableHighlight>

                <HoursModal
                    activeModal={this.state.isHoursModalActive}
                    OnCloseModal={() => {
                        this.setState({
                            isHoursModalActive: false,
                        })
                    }}
                    title={this.state.item.title}
                    item={this.state.item}
                    openingHours={this.state.openingHours}
                />
            </View>
        )
    }
}