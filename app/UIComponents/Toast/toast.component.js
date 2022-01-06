import React from 'react';
//import { Snackbar } from 'react-native-material-ui';

import StylesVariables from './../../Styles/app.style';
import AppStore from '../../Flux/AppStore';
import { View } from 'react-native';

import SnackBar from '../SnackBar/index'

let lastTimeOut = null;
const Toast = () => {

    const [updated, setUpdated] = React.useState({
        flag: false,
        message: "",
        color: "#333A",
        type: 0,
        bottom: false
    });
    
    React.useEffect( () => {

        const OnDisplayToast = async ({message, type}) => {
            const typesColor = [StylesVariables.textColor, StylesVariables.greenColor, StylesVariables.redColor, StylesVariables.yellowColor]
            setUpdated({
                flag: true,
                message: message,
                color: typesColor[type],
                type: type,
                bottom: !updated.bottom
            });

            if (lastTimeOut !== null) {
                clearTimeout(lastTimeOut)
            }
            lastTimeOut = setTimeout( () => {
                setUpdated({
                    flag: false,
                    message: "",
                    color: updated.color,
                    bottom: false
                });
            }, 2000);
        }
        
        AppStore.on("displayToast", OnDisplayToast);

        return () => {
            AppStore.removeListener("displayToast", OnDisplayToast);
        }
    }, []);
    
    const OnToggleClose = () => {
        setUpdated({
            flag: false,
            message: "",
            color: updated.color,
            bottom: false
        });
    }

    return (
            <SnackBar 
            visible={updated.flag} 
            textMessage={updated.message} 
            backgroundColor={updated.color}
            actionHandler={OnToggleClose} 
            actionText="OK"
            messageColor={StylesVariables.whiteColor}
            accentColor={StylesVariables.whiteColor}
            position={"bottom"}
            containerStyle={{height: 52 * StylesVariables.responsiveHeightMulti}}
        />
    )
}

export default Toast;