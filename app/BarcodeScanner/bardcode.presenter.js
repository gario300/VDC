import ISBN from './isbn/isbn';

export default class BarCodePresenter {

    constructor() {}

    validateBarCodeDataISBN(barcode) {
        const isbn = new ISBN();
        const result = isbn.validate(barcode);
        if (result) {
            return {"isbn": barcode}
        }

        const newIsbn = isbn.getISBNFrom(barcode);
        if (!newIsbn) {
            return false;
        }

        return newIsbn;
    }
}