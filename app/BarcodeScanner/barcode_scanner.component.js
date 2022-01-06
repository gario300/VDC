import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarCodePresenter from './bardcode.presenter';

import Messages from './../Message/message';
import * as AppActions from "./../Flux/AppActions";
import StylesVariables from '../Styles/app.style';

const bcPresenter = new BarCodePresenter();

export default function MBarCodeScannerComponent({onFinish}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {

    (async () => {
        AppActions.displayLoaderMin(true);
        const { status } = await BarCodeScanner.requestPermissionsAsync();

        if (status !== 'granted') {
            Messages.setMessage( "Désolé, nous avons besoin des autorisations de pellicule pour que cela fonctionne!" );
            AppActions.displayMessageMin(true)
            setHasPermission(false);
        } else {
            setHasPermission(status === 'granted');
        }
        AppActions.displayLoaderMin(false);
    })();

    return () => {
        setScanned(false);
        setLoading(false);
    }
    
  }, []);

    const handleBarCodeScanned = (scannedResult) => {
        const { type, data } = scannedResult;
        const result = bcPresenter.validateBarCodeDataISBN(data);
        if (!result || typeof result.isbn === "undefined") {
            setScanned(true);
            Messages.setMessage( "Nous n'avons pas pu trouver un livre!" );
            AppActions.displayMessageMin(true)
            onFinish(false);
        } else {
            setScanned(true);
            setLoading(false);
            onFinish(result.isbn)
        }
    };

  if (hasPermission === null) {
    return null;
  }
  if (hasPermission === false) {
    onFinish();
    return null
  }

  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'red'
      }}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />
        {!isLoading && 
        <TouchableOpacity 
            onPress={() => {
                onFinish();
            }}
        style={{
            width: 140,
            backgroundColor: 'black',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 20,
            justifyContent: 'center',
            bottom: 5,
            height: 46 * StylesVariables.responsiveHeightMulti
        }}>
            <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18
            }}>{"Annuler"}</Text>
        </TouchableOpacity>}
        {isLoading && 
        <View style={{
            borderRadius: 30,
            alignSelf: 'center',
            justifyContent: 'center',
            width: "98%",
            height: "80%",
            backgroundColor: 'rgba(33, 33, 33, .9)'
        }}>
            <ActivityIndicator size="large" color="white" />
        </View>}
    </View>
  );
}
