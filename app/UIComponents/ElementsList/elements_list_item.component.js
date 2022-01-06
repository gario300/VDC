import React from 'react';
import { View, StyleSheet, TouchableHighlight, Image, Text } from 'react-native';
import StylesVariables from './../../Styles/app.style';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    btnSection: {
        flex: 1,
        justifyContent: 'center'
    },
    itemContent: {
        flex: 1,
        justifyContent: 'center',
        borderColor: StylesVariables.borderColorLight,
        borderWidth: 1,
        minHeight: 70 * StylesVariables.responsiveMulti,
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 12 * StylesVariables.responsiveMulti,
        marginVertical: 8 * StylesVariables.responsiveMulti
    },
    itemTitleContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
    },
    itemTitle: {
        fontFamily: StylesVariables.titleFont,
        fontSize: StylesVariables.titleFontSize - 4,
        lineHeight: StylesVariables.titleLineHeight - 5,
        color: StylesVariables.mainColor,
        marginRight: 10 * StylesVariables.responsiveMulti,
    },
    itemBody: {
        fontFamily: StylesVariables.lightFont,
        fontSize: StylesVariables.textFontSize - 2,
        lineHeight: StylesVariables.textLineHeight - 5,
        color: StylesVariables.mainColor,
    },
    itemDate: {
        fontFamily: StylesVariables.textFont,
        fontSize: StylesVariables.textFontSize - 2,
        lineHeight: StylesVariables.textLineHeight - 4,
        color: StylesVariables.mainColor,
    },
    textUnseen: {
        fontFamily: StylesVariables.titleFont,
    },
    btnUnseen: {
    },
    itemWarning: {        
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        // alignItems: 'center',
        display: 'none',
        // backgroundColor: 'rgba(33, 33, 33, .5)',
    },
    itemWarningActive: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    itemWarningContainer: {
        flex: 1,
        position: 'relative',
        minHeight: 52 * StylesVariables.responsiveMulti,
        // backgroundColor: 'rgba(200, 220, 140, .5)',
        paddingHorizontal: 20 * StylesVariables.responsiveMulti,
        overflow: 'visible'
    },
    warningBadge: {
        flex: 1,
        position: 'absolute',
        right: 8 * StylesVariables.responsiveMulti,
        top: 8 * StylesVariables.responsiveMulti,
        // right: 15 * StylesVariables.multi,
        width: 22 * StylesVariables.responsiveMulti,
        maxWidth: 22 * StylesVariables.responsiveMulti,
        height: 22 * StylesVariables.responsiveMulti
    },
    warningBadgeImage: {
        flex: 1,
        width: 22 * StylesVariables.responsiveMulti,
        height: 22 * StylesVariables.responsiveMulti
    },
    warningTextContainer: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: 10,
        justifyContent: 'center'
    },
    warningText: {
        fontFamily: StylesVariables.titleFont,
        fontSize: StylesVariables.textFontSize,
        color: StylesVariables.whiteColor,
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    innerSpace: {
        height: 4 * StylesVariables.responsiveMulti
    }
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
                <TouchableHighlight 
                    style={[styles.btnSection]}
                    onPress={this._onPressItem}
                    underlayColor={"#F7F7F7"}
                >
                    <View style={[styles.itemContent, typeof this.props.seen !== "undefined" && !this.props.seen && styles.btnUnseen]}>
                        <View style={styles.itemContainer}
                        >
                            <View style={styles.itemTitleContainer}>
                                <Text 
                                    numberOfLines={4}
                                    style={[styles.itemTitle, !this.props.seen && styles.textUnseen]}>
                                    {this.props.title}
                                </Text>
                            </View>
                            <View style={styles.itemTitleContainer}>
                                <Text 
                                    numberOfLines={4}
                                    style={[styles.itemDate, !this.props.seen && styles.textUnseen]}>
                                    {this.props.date}
                                </Text>
                            </View>
                            <View style={styles.innerSpace}></View> 
                            <View style={styles.itemTitleContainer}>
                                <Text 
                                    numberOfLines={4}
                                    style={[styles.itemBody, !this.props.seen && styles.textUnseen]}>
                                    {this.props.body}
                                </Text>
                            </View>

                        </View>

                        <View style={[styles.itemWarning, !this.props.seen && styles.itemWarningActive]}>
                            <View style={styles.itemWarningContainer}>
                                <View style={styles.warningBadge}>
                                    <Image
                                        style={styles.warningBadgeImage}
                                        resizeMode='contain'
                                        source={require('../../../assets/flashes/flashes.png')}
                                    />
                                    <View style={styles.warningTextContainer}>
                                        <Text style={styles.warningText}>{'!'}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight> 
            </View>
        )
    }
}