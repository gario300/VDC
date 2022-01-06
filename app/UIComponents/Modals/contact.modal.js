import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { formatPhoneNumber } from '../../Utils/formater';
import * as Contacts from 'expo-contacts';
import * as AppActions from '../../Flux/AppActions';
import ContactTile from '../Tiles/contact.tile.component';
import ModalBase from './modal.layout.component';
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    container: {
        height: StylesVariables.windowHeight - 150,
        marginBottom: 30 * StylesVariables.responsiveHeightMulti,
    }
})


const ContactModal = ({ OnCloseModal, visible, serverContacts, onSendSubscription, subs }) => {
    const [contactData, setContactData] = useState([]);
    const [loading, setLoading] = useState(false);

    const KeyExtractor = (item, index) => `${index}`;
    const renderItem = ({ item }) => <ContactTile 
                                        contact={item} 
                                        onSendSubRequest={() => onSendSubscription(item.user.publicId)} />;

    useEffect(() => {
        (async () => {
            let tempContacts = [];
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync();
                data.forEach(contact => {
                    if (typeof contact.phoneNumbers === "undefined") return
                    const phone = formatPhoneNumber(contact.phoneNumbers[0].number);
                    const user = validateUserPhone(phone);
                    tempContacts.push({
                        name: `${contact.firstName} ${contact.lastName ? contact.lastName : ''}`,
                        phoneNumer: phone,
                        user: user,
                        isSub: validateIfSubbed(user),
                    })
                })
                setContactData(tempContacts);
            }
        })();
    }, [subs])

    const validateUserPhone = (phone) => {
        let res = null;
        serverContacts.forEach(contact => {
            if (phone == contact.phone) {
                res = contact;
            }
        })
        return res;
    }
    const validateIfSubbed = (user) => {
        let res = false;
        if(user !== null) {
            subs.forEach(subbed => {
                if (user.publicId == subbed.id) {
                    res = true;
                }
            })
        }
        return res;
    }

    const onRefresh = () => {
        setLoading(true);
        AppActions.fetchSentSubs();
        setLoading(false);
    }

    return (
        <ModalBase
            OnCloseModal={OnCloseModal}
            title="MES CONTACTS"
            visible={visible}>
            <View style={styles.container}>
                <FlatList
                    data={contactData}
                    refreshing={loading}
                    onRefresh={onRefresh}
                    keyExtractor={KeyExtractor}
                    renderItem={renderItem} />
            </View>
        </ModalBase>
    )
}

export default ContactModal
