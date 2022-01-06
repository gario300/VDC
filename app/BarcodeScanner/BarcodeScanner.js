import { BarCodeScanner } from 'expo-barcode-scanner';

class MBarcodeScanner {

    constructor() {}

    getPermissionAsync = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        
        if (status !== 'granted') {
            return {
                error: true, 
                success: false,
                message: "Désolé, nous avons besoin des autorisations de pellicule pour que cela fonctionne!"
            }
        }

        return {
            success: true, 
            message: "",
            error: false
        };
    };

    OnStartToScan = async () => {
        //this.showAlertMessage(false);
        const permissions = await this.getPermissionAsync();

        return permissions
    }
    
}

export default MBarcodeScanner;