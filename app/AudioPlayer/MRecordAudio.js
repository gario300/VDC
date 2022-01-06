import { Audio } from 'expo-av'
import * as Permissions from 'expo-permissions';

class MRecordAudio {

    constructor() {}

    startAudio = () => {
        Audio.setAudioModeAsync({
        })
    }

    getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        if (status !== 'granted') {
            return {
                error: true, 
                success: false,
                message: "Désolé, nous avons besoin des autorisations d'enregistrement audio pour que cela fonctionne!"
            }
        }

        return {
            success: true, 
            message: "",
            error: false
        };
    };

}

export default MRecordAudio;