import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import BookPresenter from '../Book/book.presenter';
import styles from '../Styles/my_circle.style';
import ButtonSmallText from '../UIComponents/Button/button.small_text.component';
import ListContainer from '../UIComponents/List/list.container.component';
import PublicationsTile from '../UIComponents/Tiles/publications.tile.component';

const PublicationListScreen = ({navigation, route}) => {
    const user = route.params;
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        navigation.setOptions({title: `${user.name} ${user.lastName}`});
        OnRefreshData();
        return () => { }
    }, [])

    const getPublicLibraryFromUser = () => {
        const bookPresenter = new BookPresenter();
        setRefreshing(true);
        bookPresenter.getLibraryFromUser(user.publicId)
            .then(res => {
                if(res.status === 1) {
                    setData(res.result);
                    setRefreshing(false);
                } else {
                    setRefreshing(false);
                }
            })
            .catch(err => {
                setRefreshing(false);
            })
    }

    const OnRefreshData = () => {
        getPublicLibraryFromUser();
    }

    return (
        <View style={styles.container}>
            <View style={styles.publiHeaderContainer}>
                <View style={styles.publiTitleCont}>
                    <Text style={styles.publiTitle}>{user.name}</Text>
                    <Text style={styles.publiTitle}>{user.lastName}</Text>
                </View>
                <View style={styles.btnRow}>
                    <View style={styles.btnCont}>
                        <ButtonSmallText
                            callback={() => { }}
                            title="Se désabonner" />
                    </View>
                    <View style={styles.btnCont}>
                        <ButtonSmallText
                            callback={() => { }}
                            title="Ne plus partager"
                            themeName="blue" />
                    </View>
                </View>
            </View>
            <View style={styles.listContainer}>
                <ListContainer
                    data={data}
                    onRefresh={() => OnRefreshData()}
                    refreshing={refreshing}
                    renderItem={({ item }) => 
                        <PublicationsTile 
                            book={item}
                            onPress={() => navigation.navigate(
                                "SubscriberMemos", 
                                {user: user, book: item})}
                            />
                    } />
            </View>
        </View>
    )
}

export default PublicationListScreen
