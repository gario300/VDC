import FormValidations from '../FormValidations/form_validations';
import WebApiServicesDictionary from '../WebApiServices/web_api_services_dict';
import WebApiConnectionPresenter from '../WebApiConnection/web_api_connection.presenter';
import ApiServicesHelper from '../Utils/ApiServicesHelper/api_services_helper';

export default class MemoPresenter {
    constructor() { }

    validateFormMemo(data) {
        const isBookIdValid = this.validateRequiredField(data.libid, 'libItemId');
        if (isBookIdValid.error) {
            return isBookIdValid;
        }
        const isChapterValid = this.validateRequiredField(data.chapter, 'chapter');
        if (isChapterValid.error) {
            return isChapterValid;
        }
        const isPageValid = this.validateRequiredField(data.page, 'page');
        if (isPageValid.error) {
            return isPageValid;
        }
        const isTypeValid = this.validateTypeNotEmpty(data);
        return isTypeValid;
    }

    validateTypeNotEmpty(data) {
        switch (data.type) {
            case 1:
            case 'audio':
                const isAudioValid = this.validateRequiredField(data.audio, 'audio');
                return isAudioValid;
            case 2:
            case 'note':
                const isNoteValid = this.validateRequiredField(data.note, 'note');
                return isNoteValid;
            case 3:
            case 'photo':
                const isImageValid = this.validateRequiredField(data.item_images, 'item_images');
                return isImageValid;
        }
    }

    validateRequiredField(value, fieldName) {
        const maxValid = FormValidations.validateRequiredField(value);
        if (!maxValid.valid) return FormValidations.backResponse(true, fieldName + ' ' + maxValid.msg);

        return FormValidations.backResponse(false, '');
    }

    getBookMemos(id) {
        const apiConnection = new WebApiConnectionPresenter();

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.memos.getBookMemos,
            ApiServicesHelper.tokenFromSession,
            false,
            id,
        );
    }

    getMemosFrom(id) {
        const apiConnection = new WebApiConnectionPresenter();

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.memos.getMemosFromUser,
            ApiServicesHelper.tokenFromSession,
            false,
            id,
        );
    }

    addNewMemo(data) {
        const apiConnection = new WebApiConnectionPresenter();
        let formData = new FormData();
        switch (data.type) {
            case 'note':
                formData.append('note', data.note);
                break;
            case 'photo':
                formData = ApiServicesHelper.setImages(data.item_images, formData);
                break;
            case 'audio':
                formData = ApiServicesHelper.setAudio(data.audio, formData);
                break;
        }
        formData.append('libItemId', data.libid);
        formData.append('type', data.type);
        formData.append('page', data.page);
        formData.append('chapter', data.chapter);

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.memos.addMemo,
            ApiServicesHelper.tokenFromSession,
            formData,
            null,
        );
    }

    updateMemo(data) {
        const apiConnection = new WebApiConnectionPresenter();
        let formData = new FormData();

        formData.append('memoId', data.id);
        formData.append('page', data.page);
        formData.append('chapter', data.chapter);
        switch (data.type) {
            case 1:
            case 'audio':
                formData.append('type', 'audio');
                formData = ApiServicesHelper.setAudio(data.audio, formData);
                break;
            case 2:
            case 'note':
                formData.append('type', 'note');
                formData.append('note', data.note);
                break;
            case 3:
            case 'photo':
                formData.append('type', 'photo');
                formData = ApiServicesHelper.setImages(data.item_images, formData);
                break;
        }

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.memos.updateMemo,
            ApiServicesHelper.tokenFromSession,
            formData,
            null,
        );
    }

    deleteMemo(id) {
        const apiConnection = new WebApiConnectionPresenter();
        const formData = new FormData();
        formData.append('memosIds', JSON.stringify([id]));
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.memos.removeMemo,
            ApiServicesHelper.tokenFromSession,
            formData,
            null,
        );
    }
}