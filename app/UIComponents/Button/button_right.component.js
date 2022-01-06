import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import StylesVariables from './../../Styles/app.style';
import { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        maxWidth: 295 * StylesVariables.responsiveMulti,
        maxHeight: 50 * StylesVariables.responsiveMulti,
        borderRadius: 30,
        flexDirection: 'row'
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    titleContainer: {
        flex: 6,
        justifyContent: 'center',
    },
    title: {
        ...StylesVariables.appTextMedium,
        fontFamily: StylesVariables.subTitleFont,
        fontSize: StylesVariables.inputFontSize,
        textAlign: 'center'
    },
    iconContainer: {
        flex: .8,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    icon: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 42
    }
});



const themes = {
    "primary": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.whiteColor,
        }
    }),
    "secundary": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.secondaryColor,
            borderRadius: 8
        },
        underlayColor: {
            color: StylesVariables.mainColor
        },
        title: {
            ...styles.title,
            color: StylesVariables.whiteColor,
        },
        icon: {
            ...styles.icon,
            color: StylesVariables.whiteColor,
            fontWeight: 'bold'
        }
    }),
    "white": StyleSheet.create({
        buttonContainer: {
            ...styles.buttonContainer,
            backgroundColor: StylesVariables.whiteColor,
        },
        underlayColor: {
            color: StylesVariables.mainColor
        },
        title: {
            ...styles.title,
            color: StylesVariables.secondaryColor,
        },
        icon: {
            ...styles.icon,
            color: StylesVariables.secondaryColor,
            fontWeight: 'bold'
        }
    })
}

const ButtonRight = ({ title, callback, themeName }) => {
    const theme = themes[themeName];
    return (
        <TouchableHighlight 
            style={theme.buttonContainer} 
            underlayColor={theme.underlayColor.color}
            onPress={callback}
        >
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={theme.title}>
                        {title}
                    </Text>
                </View>
                <View style={styles.iconContainer}>
                    <Feather name="chevron-right" size={28} color={theme.icon.color} />
                </View>
            </View>
        </TouchableHighlight>
    );
};
  
export default ButtonRight;