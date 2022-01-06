import React, {useState} from 'react';
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import StylesVariables from './../../Styles/app.style';

const styles = StyleSheet.create({
    imgContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    loaderContainer: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center'
    }
});

const ImageLoader = ({ style, resizeMode, loadSize, source }) => {

    const [isLoading, setLoading] = useState( false )
    
    return (
        <View style={styles.imgContainer}>
            {
            typeof source.uri !== "undefined" && source.uri == "" 
            ? <View />
            : <Image
                style={style}
                resizeMode={resizeMode} 
                source={source}
                onLoadStart={() => {
                    setLoading(true);
                }}
                onLoadEnd={() => {
                    setLoading(false);
                }}
            /> 
            }
            {isLoading && (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size={loadSize} color={StylesVariables.textColorLight} />
            </View>
            )}
        </View>
    );
};

export default ImageLoader;