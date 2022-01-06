import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Localization from '../Localization/localization';
import { createFilter } from 'react-native-search-filter';
import ArticlePresenter from '../Articles/article.presenter';
import styles from './download.styles';
import TagPressable from '../UIComponents/Tag/tag.pressable.component';
import ListContainer from '../UIComponents/List/list.container.component';
import DownloadCard from './Cards/download.card';
import downloadState from './../Download/download_state';
import AppStore from './../Flux/AppStore';
import authState from './../Auth/auth.state';
import * as AppActions from './../Flux/AppActions';

const DownloadScreen = ({route}) => {
    const types = ['video', 'audio', 'article'];
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState('video')
    //const [downloadState, setDownloadState] = useState(0)

    const isFocussed = useIsFocused();

    const downloadUpdated = () => {
        getItems();
    }

    useLayoutEffect(() => {
        if (authState.isAuthAnonym) {
            AppActions.doLogout();
            return;
        }
    }, [])

    useEffect(() => {
        AppStore.on("onDownloadUpdated", downloadUpdated);
        return () => { 
            AppStore.removeListener("onDownloadUpdated", downloadUpdated);
        }
    }, [])

    const getItems = async () => {
        const data = await downloadState.getItems();
        setData(data);
    }

    useEffect(() => {
        if(isFocussed) {
            getItems();
        }
    }, [isFocussed])

    useEffect(() => {
        
        return () => { }
    }, [selected])

    const getFilteredData = () => {
        const filteredData = data.filter(element => {
            if (element.type === selected) return true;
        })
        return filteredData
    }

    const goToDetail = (item) => {
        const newItem = Object.assign(item, {'isDownload': true})
        switch (item.type) {
            case 1:
            case 'video':
                route.params.OnShowArticleVideo(newItem);
                break;
            case 2:
            case 'audio':
                route.params.OnShowArticleAudio(newItem);
                break;
            case 3:
            case 'article':
                route.params.OnShowArticle(newItem);
                break;
        }
    }

    /*
    const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
    const downloadSnapshot = JSON.parse(downloadSnapshotJson);
    const downloadResumable = new FileSystem.DownloadResumable(
        downloadSnapshot.url,
        downloadSnapshot.fileUri,
        downloadSnapshot.options,
        callback,
        downloadSnapshot.resumeData
    );

    try {
        const { uri } = await downloadResumable.resumeAsync();
        console.log('Finished downloading to ', uri);
    } catch (e) {
        console.error(e);
    }
    */
   
   const renderEmpty = () => (
    <View style={styles.emptyListCont}>
        <MaterialCommunityIcons
            name="cloud-off-outline"
            size={styles.emptyIcon.height}
            color={styles.emptyIcon.tintColor} />
        <Text style={styles.emptyText}>{Localization.word("empty_download")}</Text>
    </View>
    )
    
    const filteredData = getFilteredData()
    return (
        <View style={styles.container}>
            <View style={styles.typesRowCont}>
                {types.map(type => (
                    <TagPressable
                        key={"key_" + type}
                        type={true}
                        title={type}
                        style={selected === type ? styles.selectedTag : null}
                        onPress={() => setSelected(type)} />
                ))}
            </View>
            <ListContainer
                data={filteredData}
                renderEmptyList={renderEmpty}
                renderItem={({ item, index }) =>
                    <DownloadCard 
                        key={index + "_dc"} 
                        item={item}
                        appActions={AppActions}
                        appStore={AppStore}
                        goToDetail={() => goToDetail(item)}
                        urlImg={downloadState.downloadUrl()}
                    />} 
                />
        </View>
    )
}

export default DownloadScreen
