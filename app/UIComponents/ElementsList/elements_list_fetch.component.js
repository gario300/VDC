import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native';
import Localization from '../../Localization/localization';
import StylesVariables from './../../Styles/app.style';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: 'center',
        marginVertical: StylesVariables.spacing * 5,
    },
    emptyRowContainer: {
        justifyContent: 'center',
        width: '100%',   
        height: 90 * StylesVariables.responsiveMulti
    },
    emptyRowContent: {
        marginHorizontal: 20 * StylesVariables.responsiveMulti,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    emptyText: {
        flex: 5,
        alignSelf: 'center',
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize + 1,
        color: StylesVariables.cardTextColor,
        fontWeight: '800',
    }
});

export default class ElementsList extends React.PureComponent {

    KeyExtractor = (item) => item.id;

    OnRefreshData = () => {
        this.props.FetchData();
    };

    RenderEmptyList = () => {
        return (
            <View style={styles.container}>
                <Ionicons
                    name="ios-notifications-off"
                    size={32 * StylesVariables.responsiveMulti}
                    color={StylesVariables.cardTextColor} />
                <Text style={styles.emptyText}>{Localization.word("empty_notif")}</Text>
            </View>
        )
    }

    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={this.props.renderItem}
                extraData={this.props.state}
                keyExtractor={this.KeyExtractor}
                refreshing={this.props.loading}
                horizontal={this.props.horizontal}
                onRefresh={this.OnRefreshData}
                horizontal={this.props.horizontal}
                ListEmptyComponent={this.RenderEmptyList}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        );
    }
}
