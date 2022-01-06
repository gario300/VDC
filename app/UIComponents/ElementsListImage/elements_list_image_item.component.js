import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Text } from 'react-native';
import StylesVariables from './../../Styles/app.style';

const btnHeight = 120 * StylesVariables.responsiveMulti;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: btnHeight,
    },
    btnSection: {
        flex: 1,
        justifyContent: 'center'
    },
    itemContent: {
        flex: 1,
        justifyContent: 'center'
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemTitleContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    itemTitle: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.titleFontSize + 1,
        color: StylesVariables.mainColor,
        lineHeight: StylesVariables.titleLineHeight + 2,
        textAlign: 'center',
        maxWidth: StylesVariables.maxWidthText,
        letterSpacing: 1
    },
    imageContent: {
        flex: 1
    },
    imageBackground: {
        width: StylesVariables.windowWidth,
        height: btnHeight
    },
});

export default class ElementItemComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    _onPressItem = ( ) => {
        this.props.onPress(this.props.id);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.btnSection}
                    onPress={this._onPressItem}
                >
                    <View style={styles.itemContent}>
                        <ImageBackground 
                            style={styles.imageBackground}
                            source={{uri: this.props.asset}}
                        >
                            <View style={styles.itemContainer}>
                                <View style={styles.itemTitleContainer}>
                                    <Text 
                                        numberOfLines={2}
                                        style={styles.itemTitle}>
                                        {this.props.title}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableOpacity> 
            </View>
        )
    }
}