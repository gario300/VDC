import React from 'react';
import { View, Linking, ActivityIndicator } from 'react-native';

import styles from './../Styles/policy.style';
import { WebView } from 'react-native-webview';

const CGVPolicy = () => {
    const uri = "https://url.fr";
    this.webview = null;
    return (
        <View style={styles.container}>
            <WebView
                ref={(ref) => { 
                    if (this.webview === null) {
                        this.webview = ref;
                    }
                }}
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={{flex: 20, backgroundColor: 'white', justifyContent: 'center'}}>    
                        <ActivityIndicator size="small" color={styles.loader.backgroundColor} />
                    </View>
                ) }
                source={{
                    uri: uri
                }}
                onNavigationStateChange={(event) => {
                    if (event.url !== uri) {
                        console.log("Stop", this.webview)
                        this.webview.stopLoading();
                        //Linking.openURL(event.url);
                    }
                }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default CGVPolicy;