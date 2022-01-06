import React, { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Localization from '../../Localization/localization';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { Octicons } from '@expo/vector-icons';
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    inputCont: {
        alignItems: "center",
        backgroundColor: StylesVariables.searchInputColor,
        borderRadius: 12.5,
        flexDirection: "row",
        height: 45 * StylesVariables.responsiveHeightMulti,
        width: 350 * StylesVariables.responsiveMulti,
    },
    iconCont: {
        marginHorizontal: StylesVariables.spacing,
    },
    search: {
        height: 45 * StylesVariables.responsiveHeightMulti,
    },
    searchCont: {
        flex: 1,
        paddingHorizontal: StylesVariables.spacing,
    }
})

const InputSearch = ({onSearch, setSearchTerm, style}) => {
    return (
        <Fragment>
            <View style={[styles.inputCont, style]}>
                <View style={styles.iconCont}>
                    <Octicons
                        color={StylesVariables.textColorLight}
                        name="search"
                        size={25 * StylesVariables.responsiveMulti} />
                </View>
                <View style={styles.searchCont}>
                <SearchInput
                    style={styles.search}
                    placeholder={Localization.word('search_placeholder')}
                    onChangeText={(term) => setSearchTerm(term)}
                    onSubmitEditing={onSearch} />
                </View>
            </View>
        </Fragment>
    )
}

export default InputSearch