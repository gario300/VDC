import authState from './../../Auth/auth.state';

class ApiServicesHelper {

    getTokenFromSession() {
        return new Promise((resolve, reject) => {
            resolve({token: authState.token});
        });
    }

    get tokenFromSession() {
        return authState.token;
    }

    setImages(images, formData, key) {
        const filesToUpload = [];
        images.forEach( element => {
            const file = Object.assign({}, element);
            if (!file.active) return;
            //file.fileID = fileId;
            const fileId = file.fileID;
            file.file = element.file;
            filesToUpload.push(file);
            if (!file.updated) return;

            let localUri = file.file;
            let filename = localUri.split('/').pop();

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            formData.append("files_" + fileId, { uri: file.file, name: filename, type });
        });

        formData.append(key, JSON.stringify(filesToUpload));

        return formData;
    }

    setAudio(element, formData) {
        const filesToUpload = [];
        const file = Object.assign({}, element);
        if (!file.active) return;
        //file.fileID = fileId;
        const fileId = file.fileID;
        file.file = element.file;
        filesToUpload.push(file);
        if (!file.updated) return;

        let localUri = file.file;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `audio/${match[1]}` : `audio`;
        console.log("Type: ", type)
        formData.append("files_" + fileId, { uri: file.file, name: filename, type });

        formData.append("item_files", JSON.stringify(filesToUpload));

        return formData;
    }
}

export default new ApiServicesHelper();