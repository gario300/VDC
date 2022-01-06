import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
import StylesVariables from "../../Styles/app.style";
import ListColumnContainer from "../List/list_column.container.component";

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: "center",
        backgroundColor: "transparent",
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: StylesVariables.spacing,
    },
    inputText: {
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.textFontSize + 1,
        color: StylesVariables.inputTextColor,
        flex: 1,
        fontFamily: StylesVariables.textFont,
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingRight: 30,
    }
});

const theme = {
    "primary": StyleSheet.create({
        inputContainer: {
            ...styles.inputContainer,
            borderColor: StylesVariables.borderColor,
            borderWidth: 0.5,
        },
        inputText: {
            ...styles.inputText
        }
    }),
    "disabled": StyleSheet.create({
        inputContainer: {
            ...styles.inputContainer,
            backgroundColor: StylesVariables.backgroundInputColor,
        },
        inputText: {
            ...styles.inputText
        }
    }),
};

const modalStyles = StyleSheet.create({
    container: {
        backgroundColor: StylesVariables.mainColor,
        borderRadius: 25,
        height: 500 * StylesVariables.responsiveHeightMulti,
        width: 320 * StylesVariables.responsiveMulti,
    },
    background: {
        alignItems: "center",
        flex: 1,
        paddingTop: StylesVariables.spacing * 5,
        backgroundColor: StylesVariables.modalBackgroundColor,
    },
    cardContainer: {
        alignItems: "center",
        backgroundColor: StylesVariables.optionCardBg[0],
        height: 80 * StylesVariables.responsiveHeightMulti,
        justifyContent: "center",
        width: 140 * StylesVariables.responsiveMulti,
    },
    cardText: {
        ...StylesVariables.appSubTitle,
        fontSize: StylesVariables.subTitleFontSize - 3,
        textAlign: "center",
        fontFamily: StylesVariables.mediumFont,
    },
    selectedCard: {
        backgroundColor: StylesVariables.optionCardBg[1],
    },
    closeIconRow: {
        flexDirection: "row-reverse",
        marginTop: StylesVariables.spacing * 2,
        marginHorizontal: StylesVariables.spacing * 1.5,
    },
    icon: {
        height: 25 * StylesVariables.responsiveMulti,
        tintColor: StylesVariables.secondaryColor,
        width: 25 * StylesVariables.responsiveMulti,
    },
    title: {
        ...StylesVariables.appSubTitle,
        color: StylesVariables.textSecundaryColor,
        fontSize: StylesVariables.subTitleFontSize - 4,
        marginVertical: StylesVariables.spacing,
        paddingHorizontal: StylesVariables.spacing,
    },
})

const getArrayWithSelectedValues = (selectedValue, items, multiple) => {
    const tempArray = multiple ? [...selectedValue] : [selectedValue];
    let res = [];
    items.forEach(item => {
        let founded = tempArray.findIndex( i => i === item.value);
        res.push({
            ...item,
            ['isSelected']: founded !== -1 ? true : false,
        })
    })
    return res;
}

const InputSelectCustom = ({
    selectedValue,
    items,
    disabled,
    color = "primary",
    placeholder,
    onChange,
    multiple,
}) => {
    const initialValue = getArrayWithSelectedValues(selectedValue, items, multiple);
    const [itemArraySelected, setItemArraySelected] = useState([...initialValue]);
    const [showModal, setShowModal] = useState(false);
    const themeStyle = disabled ? theme['disabled'] : theme[color];

    useEffect(() => {
        const tempValue = getArrayWithSelectedValues(selectedValue, items, multiple);
        setItemArraySelected([...tempValue]);
    }, [selectedValue])
    
    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View style={[modalStyles.cardContainer, item.isSelected && modalStyles.selectedCard]}>
                <Text style={modalStyles.cardText}>{item.label}</Text>
            </View>
        </TouchableWithoutFeedback>
    )

    const renderModalContent = (
        <SafeAreaView style={modalStyles.background}>
            <View style={modalStyles.container}>
                <View style={modalStyles.closeIconRow}>
                    <TouchableOpacity
                        onPress={() => setShowModal(false)}
                        activeOpacity={0.6}>
                        <AntDesign
                            name="close"
                            size={modalStyles.icon.height}
                            color={modalStyles.icon.tintColor} />
                    </TouchableOpacity>
                </View>
                <Text style={modalStyles.title}>{placeholder}</Text>
                <View>
                    <ListColumnContainer
                        data={itemArraySelected}
                        renderItem={renderItem} />
                </View>
            </View>
        </SafeAreaView>
    )

    const handleClick = (item) => {
        let tempArray = [...itemArraySelected];
        const indexFounded = tempArray.findIndex(i => i.value === item.value);

        if(!disabled && !multiple) {
            let res = [];
            tempArray.forEach( (element, index) => {
                res.push({
                    ...element,
                    isSelected: indexFounded === index ? true : false,
                })
            })
            setItemArraySelected(res);
            onChange(item.value);
        } else if(!disabled && multiple) {
            let resMulti = []
            tempArray[`${indexFounded}`] = {
                ...item,
                isSelected: !item.isSelected,
            },
            tempArray.forEach(element => {
                if(element.isSelected) {
                    resMulti.push(element.value)
                }
            })
            setItemArraySelected(tempArray);
            onChange([...resMulti]);
        }
    }

    return (
        <Fragment>
            <TouchableWithoutFeedback 
                onPress={disabled ? null : () => setShowModal(true)}>
                <View style={themeStyle.inputContainer}>
                    {itemArraySelected[0].id !== '' ? 
                        <Text 
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            style={themeStyle.inputText}>
                            {itemArraySelected.map( item => {
                                if(item.isSelected) return item.label + ' '
                            })}
                        </Text>
                        : <Text style={themeStyle.inputText}>{placeholder}</Text>
                    }
                    <Feather
                        name="chevron-down"
                        size={themeStyle.inputText.fontSize}
                        color={themeStyle.inputText.color} />
                </View>
            </TouchableWithoutFeedback>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}>
                {renderModalContent}
            </Modal>
        </Fragment>
    );
};

export default InputSelectCustom;
