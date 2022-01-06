import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as AppActions from '../Flux/AppActions';
import styles from '../Styles/my_circle.style';
import ListContainer from '../UIComponents/List/list.container.component';
import SubscriptionTile from '../UIComponents/Tiles/subscription.tile.component';

const MySubscriptions = ({ subscriptions }) => {
    const [loading, setLoading] = useState(false);

    const onRefresh = () => {
        setLoading(true);
        AppActions.fetchSentSubs();
        setLoading(false);
    }

    return (
        <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Mes abonnements</Text>
            <View style={styles.containerBordered}>
                <ListContainer
                    data={subscriptions}
                    extraData={subscriptions}
                    onRefresh={onRefresh}
                    refreshing={loading}
                    renderItem={({ item }) =>
                        <SubscriptionTile
                            subscription={item}
                            onPress={() => { }} />
                    } />
            </View>
        </View>
    )
}

export default MySubscriptions