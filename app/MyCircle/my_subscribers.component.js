import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import * as AppActions from '../Flux/AppActions';
import StylesVariables from '../Styles/app.style';
import styles from '../Styles/my_circle.style';
import ListContainer from '../UIComponents/List/list.container.component';
import RequestSubscriberTile from '../UIComponents/Tiles/request.subscriber.tile.component';
import SubscriberTile from '../UIComponents/Tiles/subscriber.tile.component';

const MySubscribers = ({ subs, requests, onAccept, onReject, onUnsubscribe, onSubscribe }) => {
    const [selectedList, setSelectedList] = useState('subs');
    const [renderList, setRenderList] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let tempList = null;

        if (selectedList === 'subs') {
            tempList = <ListContainer
                            data={subs}
                            onRefresh={onRefresh}
                            refreshing={loading}
                            renderItem={({ item }) => (
                                <SubscriberTile
                                        subscriber={item}
                                        onUnsubscribe={onUnsubscribe}
                                        onSubscribe={onSubscribe} />
                            )} />
        } else if (selectedList === 'request') {
            tempList = <ListContainer
                            data={requests}
                            onRefresh={onRefresh}
                            refreshing={loading}
                            renderItem={({ item }) => (
                                <RequestSubscriberTile
                                    subscriber={item}
                                    onAccept={onAccept}
                                    onReject={onReject} />
                            )} />
        }
        setRenderList(tempList);
    }, [selectedList, subs, requests])

    const onRefresh = () => {
        setLoading(true);
        AppActions.fetchMeSubs();
        setLoading(false);
    }

    return (
        <View style={styles.listContainer}>
            <View style={styles.titleRow}>
                <TouchableWithoutFeedback
                    underlayColor={StylesVariables.whiteColor}
                    onPress={() => setSelectedList('subs')}>
                    <Text
                        style={[
                            styles.subscTitle,
                            selectedList === 'subs' ? { color: StylesVariables.blueColor } : null
                        ]}>Mes abonnés</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    underlayColor={StylesVariables.whiteColor}
                    onPress={() => setSelectedList('request')}>
                    <Text
                        style={[
                            styles.subscTitle,
                            selectedList === 'request' ? { color: StylesVariables.blueColor } : null
                        ]}>Mes demandes</Text>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.containerBordered}>
                {renderList}
            </View>
        </View>
    )
}

export default MySubscribers
