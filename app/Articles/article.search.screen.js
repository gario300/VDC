import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import filterState from '../Filters/filter.state';
import SeancePresenter from '../Seance/Seance.presenter';
import ArticleIndex from './Cards/index';
import ListContainer from '../UIComponents/List/list.container.component';
import Localization from '../Localization/localization';
import styles from './article.style';
import ProposerBox from '../Seance/Proposer/ProposerBox.component'

const ArticleSearchScreen = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if(isFocused) {
            OnRefreshData();
        }
        return () => {}
    }, [isFocused])

    const getArticles = async (filter) => {
        setRefreshing(true);
        const SeancePressenter = new SeancePresenter()
        SeancePressenter.searchSeances()
        .then(res => {
            setRefreshing(false);
            //const tempData = parseArticles([...res]);
            setData([...res])
        })
        .catch(err => {
            setRefreshing(false);
            console.log(err)
        });
    }

    const OnRefreshData = () => {
        const filterFromMenu = filterState.getFilterFromMenu();
        if(filterFromMenu.isActive) {
            getArticles(`?categories=["${filterFromMenu.term}"]`);
        } else {
            getArticles(filterState.searchFilter);
        }
    }

    const renderEmpty = () => (
        <View style={styles.emptyListCont}>
            <MaterialCommunityIcons
                name="cloud-off-outline"
                size={styles.emptyIcon.height}
                color={styles.emptyIcon.tintColor} />
            <Text style={styles.emptyText}>{Localization.word("empty_search")}</Text>
        </View>
    )
    
    return (
        <View style={[styles.container, {backgroundColor: 'red'}]}>
            <ListContainer
                data={data}
                onRefresh={OnRefreshData}
                refreshing={refreshing}
                renderEmptyList={renderEmpty}
                renderItem={({item}) => (
                    <ProposerBox
                        id={item.id}
                        date={item.date} 
                        time={item.time}
                        materie={item.materie}
                        icon={item.icon}
                        objectif={item.objectif}
                        lieu={item.lieu}
                        color={item.color}
                    />
                )}
            />
        </View>
    )
}

export default ArticleSearchScreen
