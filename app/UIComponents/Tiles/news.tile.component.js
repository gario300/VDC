import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import StylesVariables from '../../Styles/app.style';

const styles = StyleSheet.create({
    container: {
        padding: 20 * StylesVariables.responsiveMulti,
    },
    header: {
        ...StylesVariables.appSubTitle,
    },
    content: {
        ...StylesVariables.appText,
        marginVertical: 8 * StylesVariables.responsiveHeightMulti,
    },
    date: {
        ...StylesVariables.appText,
    }
})

const NewsTile = ({ item, onPress }) => {
    return (
        <TouchableHighlight
            underlayColor={StylesVariables.whiteColor}
            onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    {item.headLine}
                </Text>
                <Text
                    ellipsizeMode="tail"
                    numberOfLines={2}
                    style={styles.content}>
                    {item.content}
                </Text>
                <Text style={styles.date}>
                    {item.date}
                </Text>
            </View>
        </TouchableHighlight>
    )
}

export default NewsTile