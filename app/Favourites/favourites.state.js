class FavouritesState {

    constructor() {
        this.data = [];
    }

    init = () => {
        this.data = [];
    }

    setData = result => {
        return [];
    }

    get getData() {
        return this.data;
    }

};

const favouritesState = new FavouritesState();
export default favouritesState;