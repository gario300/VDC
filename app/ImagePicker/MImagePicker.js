import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class MImagePicker {

    constructor() {}

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            return {
                error: true, 
                success: false,
                message: "Désolé, nous avons besoin des autorisations de pellicule pour que cela fonctionne!"
            }
          }
        }

        return {
            success: true, 
            message: "",
            error: false
        };
    };

    getPermissionAsyncPhoto = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA);
          if (status !== 'granted') {
            //this.showAlert(true);
            return {
                error: true, 
                success: false,
                message: "Désolé, nous avons besoin des autorisations de pellicule pour que cela fonctionne!"}
          }
        }

        return {
            success: true, 
            message: "",
            error: false
        };
    };

    OnPhotoLibrary = async () => {
        //this.showAlertMessage(false);
        const permissions = await this.getPermissionAsync();
        if (permissions.success) {
            return await this._pickImage(0);
        }

        return permissions
    }

    _pickImage = async (index) => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: .5
          });
            if (!result.cancelled) {

                return {
                    "success": true,
                    "error": false,
                    "value": {
                        "active": true,
                        "value": result.uri,
                        "updated": true
                    }
                }
            }

            return {
                "success": false,
                "error": false,
            }
        } catch (E) {
            console.log(E);
            return {
                "error": true,
                "success": false,
                "message": "Il y avait une erreur"
            }
        }
    };

    OnPhotoTake = async () => {
        //this.showAlertMessage(false);
        const permissions = await this.getPermissionAsyncPhoto();
        if (permissions.success) {
            return await this._pickPhoto(this.indexPhoto);
        }

        return permissions
    }

    _pickPhoto = async (index) => {
        try {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: .5
          });
          if (!result.cancelled) {

            return {
                "success": true,
                "error": false,
                "value": {
                    "active": true,
                    "value": result.uri,
                    "updated": true
                }
            }
          }

          return {
              "success": false,
              "error": false,
          }
    
        } catch (E) {
            console.log(E);
            return {
                "error": true,
                "success": false,
                "message": "Il y avait une erreur"
            }
        }
    };
    
}

export default MImagePicker;