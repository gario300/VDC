import React from 'react';
import { FlatList } from 'react-native';

const ListContainer = ({data, renderItem, refreshing, 
    onRefresh, extraData, renderEmptyList, contentStyle, numberCols, itemSeparator = null }) => {
    const KeyExtractor = (item, index) => `${index}`;

    const datos = () => {
        return data()
    }
    return (
        <FlatList
            style={{width: '100%'}}
            contentContainerStyle={
                typeof contentStyle == "undefined" ? {width: '100%'} : 
                contentStyle
            }
            numColumns={2}
            extraData={extraData}
            data={typeof(data) === 'function' ? datos() : data}
            onRefresh={onRefresh}
            refreshing={refreshing}
            renderItem={renderItem}
            ItemSeparatorComponent={
                () => itemSeparator
            }
            columnWrapperStyle={{justifyContent:'flex-start'}}
            keyExtractor={KeyExtractor}
            ListEmptyComponent={renderEmptyList} 
        />
    )
}

export default ListContainer
