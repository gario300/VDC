class DownloadState {

    module = null;
    setDownloadModule = (mod) => {
        this.module = mod;
    }

    downloadObj = {}

    removeObj = {}
    
    constructor() {
        this.init();
    }
    
    init() {
        this.downloadObj = {}
        this.removeObj = {}
    }

    setDownload(obj) {
        this.downloadObj = Object.assign({}, obj);
    }

    setRemove(obj) {
        this.removeObj = Object.assign({}, obj);
    }

    get actualDownload() {
        return this.downloadObj;
    }

    get removeDownload() {
        return this.removeObj;
    }

    getItems = async () => {
        const res = await this.module.getItems()
        return res;
    }

    isInList = async (id) => {
        const res = await this.module.getItems()
        let found = false;
        for(let i = 0; i < res.length; ++i) {
            if (res[i].id === id) {
                found = true;
                break;
            }
        }
        return found;
    }

    downloadUrl = () => {
        return this.module.getDownloadUrl()
    }

    isFileLoading = (fileName) => {
        if (typeof this.module.downloadList[fileName] !== "undefined"
        && this.module.downloadList[fileName] === 2) {
            return true;
        }

        return false
    }

}

const dState = new DownloadState();
export default dState;