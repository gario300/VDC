import React, { useEffect } from 'react';
import { Text, View, Modal, SafeAreaView, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Arrays from '../../Constants/constants.index';
import Localization from '../../Localization/localization';
import styles from '../menu.style';
import MenuModalCard from './card.menu.modal';
import ListColumnContainer from '../../UIComponents/List/list_column.container.component';
import filterState from '../../Filters/filter.state';
import myAppState from '../../AppState/app_state';

const getBgColor = (value) => {
    switch (value) {
        case 'cardio':
            return 0;
        case 'diabete':
            return 1;
        case 'aff_resp':
            return 2;
        case 'cancer':
            return 3;
        case 'drepan':
            return 1;
        case 'hypert':
            return 0;
        case 'child_maladies':
            return 3;
        case 'autre':
            return 2;
    }
}

const MenuModal = ({ visible, OnCloseModal, navigation }) => {
    const user = { name: myAppState.userMe.name, lastName: myAppState.userMe.lastName }
    const categories = Arrays.getCategories();

    useEffect(() => {
        filterState.resetFilterFromMenu();
    }, [])

    const navigateTo = (screen, item) => {
        OnCloseModal();
        if(screen === 'MyProfile') {
            navigation.navigate(screen);
        } else {
            filterState.setFilterFromMenu({term: item, isActive: true});
            navigation.navigate('AppMenu', { screen: "Recherche" });
        }
    }

    return (
        <Modal
            transparent={false}
            animationType="fade"
            onRequestClose={OnCloseModal}
            visible={visible}>
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalHeaderCont}>
                    <View style={styles.modalCloseIconRow}>
                        <TouchableHighlight
                            underlayColor={styles.modalHeaderCont.backgroundColor}
                            onPress={OnCloseModal}>
                            <AntDesign
                                name="close"
                                size={styles.closeIcon.height}
                                color={styles.closeIcon.tintColor} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.modalTitleCont}>
                        <Text style={styles.modalTitleText}>{Localization.word('menu')}</Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigateTo('MyProfile', null)}>
                        <View style={styles.modalProfileRow}>
                            <View>
                                <Image
                                    source={require('../../../assets/icons/profile.png')}
                                    style={styles.profileIcon}
                                    resizeMode="contain" />
                            </View>
                            <View>
                                <Text style={styles.modalProfileName}>{user.name} {user.lastName}</Text>
                                <Text style={styles.modalProfileText}>{Localization.word('view_profile')}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalListCont}>
                    <ListColumnContainer
                        data={categories}
                        renderItem={({ item }) =>
                            <MenuModalCard
                                bgColor={getBgColor(item.value)}
                                onPress={() => {navigateTo('Search', item.value)}}
                                title={item.value} />
                        } />
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default MenuModal