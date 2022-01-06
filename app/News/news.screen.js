import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import faker from 'faker';
import styles from '../Styles/news.style';
import NewsTile from '../UIComponents/Tiles/news.tile.component';

const getFakeData = () => {
    const res = [];
    for (let i = 0; i < 10; i++) {
        let tempData = {
            headLine: faker.lorem.sentence(10),
            content: faker.lorem.paragraph(20),
            date: faker.date.future().toDateString(),
        };
        res.push(tempData);
    }
    return res;
}

const NewsScreen = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const tempData = getFakeData();
        setData(tempData);
        return () => { }
    }, [])

    const KeyExtractor = (item, index) => `${index}`;
    const renderItem = ({ item }) => <NewsTile item={item} onPress={() => { }} />

    return (
        <View style={styles.container}>
            <View style={styles.headerCont}>
                <Text style={styles.headerTitle}>Actualités</Text>
            </View>
            <View style={styles.listCont}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={KeyExtractor} />
            </View>
        </View>
    )
}

export default NewsScreen
