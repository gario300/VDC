import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import SubscriptionPresenter from './subscription.presenter';
import styles from '../Styles/my_circle.style';
import ButtonPlus from '../UIComponents/Button/button_plus.component';
import ListContainer from '../UIComponents/List/list.container.component';
import CircleMemoTile from '../UIComponents/Tiles/circle.memo.tile.component';
import ContactModal from '../UIComponents/Modals/contact.modal';

const MyCircleList = ({ navigation, onSendSubscription, subs, serverContacts }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [showContactModal, setShowContactModal] = useState(false);

    useEffect(() => {
        OnRefreshData();
        return () => { }
    }, [])

    const getMemosFromSubscriptions = () => {
        const subscriptionPresenter = new SubscriptionPresenter();
        setRefreshing(true);

        subscriptionPresenter.getMemosFromSubscriptions()
            .then(res => {
                if(res.status === 1) {
                    setData(res.result)
                    setRefreshing(false);
                } else {
                    setRefreshing(false);
                }
            })
            .catch(err => {
                console.log(err);
                setRefreshing(false);
            })
    }

    const OnRefreshData = () => {
        getMemosFromSubscriptions();        
    }

    return (
        <View style={styles.listContainer}>
            <ButtonPlus
                onPress={() => setShowContactModal(true)}
                style={styles.listBtn} />
            <Text style={styles.listTitle}>Les derniers mémos de mes amis</Text>
            <ListContainer
                data={data}
                onRefresh={OnRefreshData}
                refreshing={refreshing}
                renderItem={({ item }) =>
                    <CircleMemoTile
                        item={item}
                        onPress={() => navigation.navigate('PublicationList', item.user)} />
                } />
            <ContactModal
                OnCloseModal={() => setShowContactModal(false)}
                onSendSubscription={onSendSubscription}
                subs={subs}
                serverContacts={serverContacts}
                visible={showContactModal} />
        </View>
    )
}

export default MyCircleList
