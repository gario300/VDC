import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import StylesVariables from '../../Styles/app.style';
import Tag from '../../UIComponents/Tag/tag.component';

const styles = StyleSheet.create({
    tagsRow: {
        flexDirection: "row"
    },
    tag: {
        marginRight: StylesVariables.spacing,
    },
})

const TagRow = ({ categories, type }) => {
    return (
        <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tagsRow}>
                {categories.map((cat, index) => (
                    <View style={styles.tag} key={`${index}`} >
                        <Tag title={cat} category={true} />
                    </View>
                ))}
                <View style={styles.tag}>
                    <Tag title={type} type={true} />
                </View>
            </ScrollView>
        </View>
    )
}

export default TagRow