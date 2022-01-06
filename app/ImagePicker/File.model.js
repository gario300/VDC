import FileID from './FileID';

const FileModel = {
    fileID: "",
    fileSaved: "",
    file: "",
    title: "",
    updated: false,
    active: false
}

export default {
    new: () => {
        const obj = Object.assign({}, FileModel);
        obj.fileID = FileID();
        return obj;
    },
    newWithValues: (file) => {
        const obj = Object.assign({}, FileModel);
        obj.fileID = FileID();
        obj.file = file;
        obj.active = true;
        obj.updated = true;
        return obj;
    },
    initWithValues: (file) => {
        const obj = Object.assign({}, FileModel);
        obj.fileID = FileID();
        obj.file = file;
        obj.active = true;
        return obj;
    },
    updateValues: (last, file, updated, active) => {
        const obj = Object.assign({}, last);
        obj.file = file;
        obj.updated = updated;
        obj.active = active;
        return obj;
    },
}