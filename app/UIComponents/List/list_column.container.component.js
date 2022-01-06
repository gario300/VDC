import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    columnWraper: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    separator: {
        height: StylesVariables.spacing * 2
    }
})

const ListColumnContainer = ({data, extraData, onRefresh, refreshing, renderItem}) => {
    const KeyExtractor = (item, index) => `${index}`;
    const separator = (item, index) => <View key={`${index}`} style={styles.separator} />
    return (
        <FlatList
            columnWrapperStyle={styles.columnWraper}
            data={data}
            extraData={extraData}
            ItemSeparatorComponent={separator}
            keyExtractor={KeyExtractor}
            onRefresh={onRefresh}
            refreshing={refreshing}
            renderItem={renderItem}
            numColumns={2} />
    )
}

export default ListColumnContainer