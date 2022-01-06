import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MemoPresenter from '../Memo/memo.presenter';
import styles from '../Styles/my_circle.style';
import SubscriptionMemoTile from '../UIComponents/Tiles/subscription.memo.tile.component';
import ListContainer from '../UIComponents/List/list.container.component';
import HeaderSubscriber from './header_subscriber.memo.component';
import BookDetailModal from '../UIComponents/Modals/book.detail.modal';

const SubscriberMemoScreen = ({ navigation, route }) => {
    const {params} = route;
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [showModalBookDetail, setShowModalBookDetail] = useState(false);

    useEffect(() => {
        OnRefreshData();
        navigation.setOptions({title: `${params.user.name} ${params.user.lastName} - Mémos`});
        return () => {}
    }, [])

    const getMemosFromBook = () => {
        const memoPresenter = new MemoPresenter();
        setRefreshing(true);
        memoPresenter.getBookMemos(params.book.id)
            .then(res => {
                if(res.status === 1) {
                    setData(res.result.memos)
                    setRefreshing(false);
                } else { setRefreshing(false); }
            })
            .catch(err => {
                setRefreshing(false);
                console.log(err)
            })
    }

    const OnRefreshData = () => {
        getMemosFromBook();
    }

    return (
        <View style={styles.container}>
            <HeaderSubscriber 
                book={params.book.book}
                onPress={() => setShowModalBookDetail(true)} />
            <View style={styles.listContainer}>
                <ListContainer
                    data={data}
                    onRefresh={() => OnRefreshData()}
                    refreshing={refreshing}
                    renderItem={({item}) => 
                        <SubscriptionMemoTile memo={item} />
                    } />
            </View>
            <BookDetailModal
                book={params.book.book}
                OnCloseModal={() => setShowModalBookDetail(false)}
                visible={showModalBookDetail} />
        </View>
    )
}

export default SubscriberMemoScreen
