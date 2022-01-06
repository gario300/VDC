import React, { useReducer, useEffect } from 'react';
import { View, Text, TouchableHighlight, ScrollView } from 'react-native';
import { AntDesign, Octicons } from '@expo/vector-icons';
import * as AppActions from '../Flux/AppActions';
import * as Arrays from '../Constants/constants.index';
import filterState from './filter.state';
import Localization from '../Localization/localization';
import styles from './filter.styles';
import TagPressable from '../UIComponents/Tag/tag.pressable.component';
import NormalButton from '../UIComponents/Button/normal_button.component';
import InputDateModal from '../UIComponents/Input/input_date_range.modal.component';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const reducer = (prevState, action) => {
    let tempArray;
    switch (action.type) {
        case 'ADD_CATEGORY':
            tempArray = prevState.category
            tempArray.push(action.value);
            return { ...prevState, category: tempArray };
        case 'ADD_TYPE':
            tempArray = prevState.type;
            tempArray.push(action.value);
            return { ...prevState, type: tempArray };
        case 'REMOVE_CATEGORY':
            tempArray = prevState.category;
            const resCategory = tempArray.filter(item => item !== action.value)
            return { ...prevState, category: resCategory };
        case 'REMOVE_TYPE':
            tempArray = prevState.type;
            const resType = tempArray.filter(item => item !== action.value)
            return { ...prevState, type: resType };
        case 'UPDATE_DATE':
            const dateRes = filterState.setFilterDate(action.value.startD, action.value.endD)
            return { 
                ...prevState, 
                startDate: dateRes.startDate,
                endDate: dateRes.endDate,
                date: dateRes.dateValue,
                selectedDate: true
            };
        case 'RESET_FILTERS_DATE':
            return {
                ...prevState, 
                startDate: filterState.dateObj,
                endDate: filterState.dateObj,
                date: '',
                selectedDate: false
            };
        case 'RESET_FILTERS':
            return {
                category: [],
                type: [],
                date: '',
                startDate: filterState.dateObj,
                endDate: filterState.dateObj,
            };
    }
}

const FilterScreen = ({ navigation, route }) => {
    const [filter, dispatch] = useReducer(reducer, filterState.getFilter());
    const categories = Arrays.getCategories();
    const types = ['audio', 'video', 'article'];
    let renderCategories = [];

    useEffect(() => {
        filterState.resetFilterFromMenu();
    }, [])

    const onSelectTag = (value, tag) => {
        if (tag === 'category') {
            dispatch({
                type: filter.category.includes(value) ? 'REMOVE_CATEGORY' : 'ADD_CATEGORY',
                value: value,
            })
        } else {
            dispatch({
                type: filter.type.includes(value) ? 'REMOVE_TYPE' : 'ADD_TYPE',
                value: value,
            })
        }
    }

    const isTagSelected = (value) => {
        return (filter.category.includes(value) || filter.type.includes(value)) ? true : false;
    }

    for (let i = 0; i < categories.length; i += 2) {
        const element = (
            <View key={`cat_${i}`} style={styles.categoryRow}>
                <TagPressable
                    onPress={() => onSelectTag(categories[i].value, 'category')}
                    style={isTagSelected(categories[i].value) ? styles.seletedCategoryTag : styles.filterCategoryTag}
                    title={categories[i].value}
                    category={true} />
                <TagPressable
                    onPress={() => onSelectTag(categories[i + 1].value, 'category')}
                    style={isTagSelected(categories[i + 1].value) ? styles.seletedCategoryTag : styles.filterCategoryTag}
                    title={categories[i + 1].value}
                    category={true} />
            </View>
        )
        renderCategories.push(element);
    }

    const isFilterEmpty = () => {
        return (
            filter.category.length === 0
            && filter.type.length === 0
            && !filter.selectedDate)
            ? true : false
    }

    const applyFilter = () => {
        AppActions.setFilter(filter);
        if (route !== undefined && route.name === 'SearchModal') {
            navigation.navigate('AppMenu', { screen: "Recherche" });
        }
    }

    const onResetFilter = () => {
        dispatch({ type: 'RESET_FILTERS' });
    }

    const onRequestClose = () => {
        AppActions.setFilter(filter);
        navigation.goBack();
    }

    const OnCancel = () => {
        dispatch({ type: 'RESET_FILTERS_DATE' });
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.filterHeader}>
                <View style={styles.filterCloseIconRow}>
                    <TouchableHighlight
                        underlayColor={styles.filterHeader.backgroundColor}
                        onPress={onRequestClose}>
                        <AntDesign
                            name="close"
                            size={styles.closeIcon.height}
                            color={styles.closeIcon.tintColor} />
                    </TouchableHighlight>
                </View>
                <View style={styles.filterTitleCont}>
                    <Text style={styles.filterTitleText}>{Localization.word('search')}</Text>
                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('FilterBytermModal')}
                        style={styles.searchCont}>
                        <View style={styles.filterSearchInputCont}>
                            <View style={styles.filterSearchIcon}>
                                <Octicons
                                    color={styles.filterSearchIcon.color}
                                    name="search"
                                    size={styles.filterSearchIcon.height} />
                            </View>
                            <View style={styles.filterSearchCont}>
                                <Text style={styles.filterSearchPlaceHolder}>
                                    {Localization.word('search_placeholder')}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            {/*<View style={styles.filterMarginH}>
                <Text style={styles.filterSubtitleText}>{Localization.word('filter')}</Text>
                <Text style={styles.filterTagText}>{Localization.word('categories')}</Text>
    </View>*/}
            
            {/*<View style={styles.filterMarginH}>
                <Text style={styles.filterTagText}>{Localization.word('type')}</Text>
            </View>
            <View style={styles.filterTypeRow}>
                {types.map((type, index) => (
                    <TagPressable
                        key={`${index}`}
                        onPress={() => onSelectTag(type, 'type')}
                        style={isTagSelected(type) ? styles.selectedTypeTag : styles.filterTypeTag}
                        title={type}
                        type={true} />
                ))}
                </View>
            <View style={styles.filterMarginH}>
                <Text style={styles.filterTagText}>{Localization.word('date')}</Text>
            </View>
            <InputDateModal
                OnDateChange={(startD, endD) => {
                    dispatch({type: "UPDATE_DATE", value: {
                        startD,
                        endD
                    }})
                }}
                style={styles.dateCont}
                placeholder={filter.date}
                onCancel={OnCancel}
                startDate={filter.startDate.text} 
                endDate={filter.endDate.text}
            />
            <View style={styles.filterBottomBtns}>
                <View style={styles.btnCont}>
                    <NormalButton
                        callback={applyFilter}
                        isDisabled={isFilterEmpty()}
                        title={Localization.word('apply_filter')} />
                </View>
                <View style={styles.btnCont}>
                    <NormalButton
                        callback={onResetFilter}
                        themeName="disabled"
                        title={Localization.word('reset_filter')} />
                </View>
            </View>
            */}
        </ScrollView>
    )
}

export default FilterScreen
