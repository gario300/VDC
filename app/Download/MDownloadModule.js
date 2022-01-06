import * as FileSystem from 'expo-file-system';
import downloadState from './download_state';
import MyLocalStorage from './../Utils/LocalStorage/my_local_storage';
import DownloadPresenter from './download.presenter';

class MDownloadModule {
    
    downloadResumable = null;
    downloadProgress = null;
    downloadList = null;
    presenter = null;
    platform = null;
    downloadProgressCallback = null;
    
    constructor() {
        this.downloadResumable = {};
        this.downloadList = {};
        this.downloadProgress = {};
        this.downloadProgressCallback = {};
        this.AppStore = null;
        this.saveKey = "downloaded_items";
        this.presenter = new DownloadPresenter();
        this.platform = null;
    }

    start = (props, AppStore, AppActions, Platform) => {
        downloadState.init();
        downloadState.setDownloadModule(this);

        this.checkAndCreateFolder(FileSystem.documentDirectory + 'downloads/');
        this.verifySaveInformation(null);
        //this._checkFiles();
        AppStore.on("startDownload", this.startDownload);
        AppStore.on("removeDownload", this.removeDownload);

        this.AppStore = AppStore;
        this.platform = Platform;
    }

    exit = () => {
        downloadState.init();
        this.AppStore.removeListener("startDownload", this.startDownload);
        this.AppStore.removeListener("removeDownload", this.removeDownload);
    }
    
    checkAndCreateFolder = async (folder_path) => {
        const folder_info = await FileSystem.getInfoAsync(folder_path);
        if (!Boolean(folder_info.exists)) {
            // Create folder
            console.log(folder_path);
            try {
                await FileSystem.makeDirectoryAsync(
                    folder_path, {
                        intermediates: true
                    }
                );
            } catch (error) {
                // Report folder creation error, include the folder existence before and now
                const new_folder_info = await FileSystem.getInfoAsync(folder_path);
                const debug = `checkAndCreateFolder: ${
                error.message
                } old:${JSON.stringify(folder_info)} new:${JSON.stringify(
                new_folder_info
                )}`;
                console.log(debug);
            }
        }else{
             console.log('exists '+folder_path);
        }
    }

    _checkFiles = async () => {
        /*
        const { carts, downloader } = this.props;
        downloads_tmp = downloader.list;
        console.log('downloads_tmp'); 
        console.log(downloads_tmp); 
        Object.keys(downloads_tmp).map(filename => {
           
             if(downloads_tmp[filename] == 'downloading'){
                 console.log('delete '+filename); 
                 this.props.updateDownloadProgress( filename, 0);  
                 var folder_info = FileSystem.getInfoAsync(FileSystem.documentDirectory + 'downloads/' + filename);
                 if (Boolean(folder_info.exists)) {
                      FileSystem.deleteAsync(FileSystem.documentDirectory + 'downloads/' + filename);
                 }
                 
             }
        })   
        */      
                               
    }
    
    startDownload = async () => {
        const obj = downloadState.actualDownload;
        Object.keys(obj.content).forEach(key => {
            const content = obj.content[key];
            if (content.file.length > 0 
                && content.file[0] !== ""
                && typeof content.file[0] !== "undefined"
                ) {
                const url = content.file[0];
                let type = url.split(".");
                type = type[type.length - 1].toLowerCase();
                const fileName = obj.id + "_" + key +"_";
                if (type !== "") {
                    this.download(content.file[0], fileName, type)
                    obj.content[key]["media_type"] = type;
                    obj.content[key].file[0] = fileName + "." + type;
                }
            }
            if (typeof content.file["0"] !== "undefined"
            && content.file["0"] !== "") {
                const url = content.file[0];
                let type = url.split(".");
                type = type[type.length - 1].toLowerCase();
                const fileName = obj.id + "_" + key +"_";
                if (type !== "") {
                    this.download(content.file[0], fileName, type)
                    obj.content[key]["media_type"] = type;
                    obj.content[key].file = [];
                    obj.content[key].file.push( fileName + "." + type );
                }
            }
        });
        if (obj.images.length > 0 
            && obj.images[0] !== null 
            && obj.images[0] !== "") {
                const url = obj.images[0];
                let type = url.split(".");
                type = type[type.length - 1].toLowerCase();
                const fileName = obj.id + "_image_";
                this.download(obj.images[0], fileName, type)
                obj.images[0] = fileName + "." + type;
        }
        this.verifySaveInformation(obj);
    }

    verifySaveInformation = (item) => {
        MyLocalStorage.GetItem(this.saveKey)
        .then(result => {
            if (result.status === 1) {
                let data = result.data;
                if (data.length === "undefined") {
                    data = [];
                }
                //console.log("item: ", item)
                if (item !== null) {
                    let exists = false;
                    data.forEach(el => {
                        if (el.id === item.id) {
                            exists = true;
                        }
                    })
                    if (!exists) {
                        data.push(item);
                        this.presenter.newDownloadEvent(item.id, item.type, this.platform.OS);
                        this.saveInformation(data)
                    }
                }
                console.log("Local Info Saved, count: ", data)
            } else {
                console.log('No Items Found: ', error);
                this.saveInformation([])
            }
        })
        .catch(error => {
            console.log('Error On Getting the Items: ', error);
            this.saveInformation([])
        });
    }

    saveInformation = (items) => {
        MyLocalStorage.SaveItem(items, this.saveKey)
        .then(result => {
            if (result.status === 1) {
                console.log('Success On Saving the Items: ', items.length);
            }
        })
        .catch(error => {
            console.log('Error on saving the items: ', error);
        });
    }

    RemoveAllInformation = () => {
        console.log("EEEXXIT")
        MyLocalStorage.RemoveItem(this.saveKey)
        .then(result => {
            if (result.status === 1) {
                console.log('Success On Removing all the saved information');
            }
        })
        .catch(error => {
            console.log('Error on removing the items: ', error);
        });
    }

    downloadProgressFunc = (fileName, downloadProgress) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        this.downloadProgress[fileName] = progress;
        console.log(`${fileName} => ${this.downloadProgress[fileName]} `);
    };
    
    download = async (url, fileName, type) => {
        const fileUrl = FileSystem.documentDirectory + 'downloads/' + fileName + "." + type;

        const folder_info = await FileSystem.getInfoAsync(fileUrl);
        if (Boolean(folder_info.exists)) {
            console.log("Folder AAlready exists: ", folder_info)
            return;
        }
        
        this.downloadProgressCallback[fileName] = (downloadProgress) => {
            this.downloadProgressFunc(fileName, downloadProgress)
        }
        this.downloadList[fileName] = 2;
        this.downloadResumable[fileName] = FileSystem.createDownloadResumable(
            url,
            fileUrl,
            {},
            (downloadProgress) => {
                this.downloadProgressFunc(fileName, downloadProgress)
            }
        );
    
        try {
            /*
            const { uri } = await downloadResumable.downloadAsync();
            console.log('Finished downloading to ', uri);
            */

            this.downloadResumable[fileName].downloadAsync()
            .then((uri) => {
                //supprimer de la liste
                console.log('Router download finiche', uri);
               
                //this.downloadProgressCallback[fileName] = null;
                this.AppStore.emit("onDownloadUpdated")
                this.downloadList[fileName] = 1;
                /*
                if(downloader.downloadlist[fileName]){
                    removeFileFromDownloadList( fileName);
                }  
                if(downloader.downloadlist[decodeURIComponent(fileName)]){
                    removeFileFromDownloadList( decodeURIComponent(fileName) );
                }
                */

                //updateDownloadProgress( fileName, 'finish');
                  //this.updateOmpData(songData);
                
                /*
                if(this._isMounted && is_multiple){
                       console.log('Router download finiche callback '+uri);
                       //Télécharger le suivant 
                       this.downloadNext(songData);
                }
                */
            });
        } catch (e) {
            console.error(e);
        }
        
        
        /*
        try {
            await downloadResumable.pauseAsync();
            console.log('Paused download operation, saving for future retrieval');
            AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
        } catch (e) {
            console.error(e);
        }
        
        try {
            const { uri } = await downloadResumable.resumeAsync();
            console.log('Finished downloading to ', uri);
        } catch (e) {
            console.error(e);
        }
        */
    }

    removeDownload = () => {
        const obj = downloadState.removeDownload;
        Object.keys(obj.content).forEach(key => {
            const content = obj.content[key];

            if (typeof content.file !== "undefined" && content.file.length > 0 && content.file[0] !== "") {
                const url = content.file[0];
                let type = url.split(".");
                type = type[type.length - 1].toLowerCase();
                const fileName = obj.id + "_" + key +"_";
                this.removeFile(fileName, type)
            }
        });

        if (obj.images.length > 0 
            && obj.images[0] !== null 
            && obj.images[0] !== "") {
                const url = obj.images[0];
                let type = url.split(".");
                type = type[type.length - 1].toLowerCase();
                const fileName = obj.id + "_image_";
                this.removeFile(fileName, type)
        }
        this.verifyDeleteInformation(obj);
    }

    verifyDeleteInformation = (item) => {
        MyLocalStorage.GetItem(this.saveKey)
        .then(result => {
            if (result.status === 1) {
                let data = result.data;
                if (data.length === "undefined") {
                    return
                }
                if (item !== null) {
                    let exists = false;
                    const newList = [];
                    data.forEach(el => {
                        if (el.id === item.id) {
                            exists = true;
                        } else {
                            newList.push(el)
                        }
                    })
                    if (exists) {
                        this.saveInformation(newList)
                    }
                }
                console.log("Local Info Saved, count: ", data.length)
            } else {
                console.log('No Items Found: ', error);
                this.saveInformation([])
            }
        })
        .catch(error => {
            console.log('Error On Getting the Items: ', error);
            this.saveInformation([])
        });
    }
    
    removeFile = async (fileName, type) => {
        try {
            const fileUrl = FileSystem.documentDirectory + 'downloads/' + fileName + "." + type;
            const folder_info = await FileSystem.getInfoAsync(fileUrl);
            if (Boolean(folder_info.exists)) {
                FileSystem.deleteAsync(fileUrl);
                console.log("Delete Item: ", fileName)
                this.AppStore.emit("onDownloadUpdated")
            }
        } catch (e) {
            console.log("delete Error: ", e)
        }
    }

    getItems = async () => {
        const result = await MyLocalStorage.GetItem(this.saveKey);
        if (result.status === 1) {
            return result.data;
        }
        return [];
    }

    getDownloadUrl = () => {
        return FileSystem.documentDirectory + 'downloads/'
    }
    
}

export default new MDownloadModule();