import FormValidations from '../FormValidations/form_validations';
import WebApiServicesDictionary from '../WebApiServices/web_api_services_dict';
import WebApiConnectionPresenter from '../WebApiConnection/web_api_connection.presenter';
import ApiServicesHelper from '../Utils/ApiServicesHelper/api_services_helper';

export default class BookPresenter {
    constructor() {}

    validateFormBook(data) {
        const isImageValid = this.validateRequiredField(data.item_imgaes, 'images');
        if (isImageValid.error) {
            return isImageValid;
        }
        const isTitleValid = this.validateRequiredField(data.title, 'title');
        if (isTitleValid.error) {
            return isTitleValid;
        }
        const isAuthorValid = this.validateRequiredField(data.author, 'author');
        if (isAuthorValid.error) {
            return isAuthorValid;
        }
        const isPagesValid = this.validateRequiredField(data.pages, 'pages');
        if (isPagesValid.error) {
            return isPagesValid;
        }
        const isDateValid = this.validateRequiredField(data.date, 'date');
        if (isDateValid.error) {
            return isDateValid;
        }
        const isResumeValid = this.validateRequiredField(data.resume, 'resume');
        if (isResumeValid.error) {
            return isResumeValid;
        }
        return isResumeValid;
    }

    validateRequiredField(value, fieldName) {
        const maxValid = FormValidations.validateRequiredField(value);
        if (!maxValid.valid) return FormValidations.backResponse(true, fieldName + ' ' + maxValid.msg);

        return FormValidations.backResponse(false, '');
    }

    getLibrary() {
        const apiConnection = new WebApiConnectionPresenter();

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.book.getLibrary,
            ApiServicesHelper.tokenFromSession,
            false,
            null,
        );
    }

    getLibraryComplete() {
        const apiConnection = new WebApiConnectionPresenter();

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.book.getLibraryComplete,
            ApiServicesHelper.tokenFromSession,
            false,
            null,
        );
    }

    getLibraryFromUser(id) {
        const apiConnection = new WebApiConnectionPresenter();

        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.book.getPublicLibrary,
            ApiServicesHelper.tokenFromSession,
            null,
            id,
        )
    }

    addBook(book) {
        const apiConnection = new WebApiConnectionPresenter();

        let formData = new FormData();
        formData.append("author", book.author);
        formData.append("title", book.title);
        formData.append("isbn", book.isbn);
        formData.append("pages", book.pages);
        formData.append("resume", book.resume);
        formData.append("date", book.date);
        if (typeof book.urlImage !== "undefined") {
            formData.append("urlImage", book.urlImage);
        }

        if (typeof book.images !== "undefined") {
            formData = ApiServicesHelper.setImages(book.images, formData);
        }
        
        return apiConnection.callApiService(
            WebApiServicesDictionary.dictionary.book.addBook,
            ApiServicesHelper.tokenFromSession,
            formData,
            null,
        );
    }

    getBookFromISBN(isbn) {
        return new Promise( async (resolve, reject) => {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
            const result = await response.json();
            if (result.totalItems > 0) {
                const item = result.items[0];
                const volumeInfo = item.volumeInfo;
                const book = {
                    title: volumeInfo.title,
                    author: volumeInfo.authors.length > 0 ? volumeInfo.authors[0] : "",
                    date: new Date(volumeInfo.publishedDate),
                    isbn: isbn,
                    numPages: volumeInfo.pageCount,
                    resume: volumeInfo.description,
                    image: volumeInfo.imageLinks["thumbnail"]
                }
                resolve({success: true, book})
            } else {
                reject({error: true})
            }
        });
    }
}