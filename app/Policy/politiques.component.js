import React from 'react';
import { View, Linking, ActivityIndicator } from 'react-native';
import styles from './../Styles/policy.style';
import { WebView } from 'react-native-webview';
import StylesVariables from '../Styles/app.style';

const PolitiquesPolicy = () => {
    const uri = 'https://url.fr/politique-de-confidentialite/';
    const webview = React.useRef(null);
    return (
        <View style={[styles.container]}>
            <WebView
                ref={webview}
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={{flex: 20, backgroundColor: StylesVariables.backgroundColor, justifyContent: 'center'}}>    
                        <ActivityIndicator size="small" color={StylesVariables.mainColor} />
                    </View>
                ) }
                source={{
                    uri: uri
                }}  
                onNavigationStateChange={(event) => {
                    if (event.url !== uri) {
                        webview.current.stopLoading();
                        //Linking.openURL(event.url);
                    }
                }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default PolitiquesPolicy;