class ProducersState {

    constructor() {
        this.init();
    }

    init = () => {
        this.items = [];
        this.data = [];
        this.isReady = false;
    }

    setData = (data) => {
        this.isReady = true;
        this.data = data;
    }

    setItems = obj => {     
        this.items = obj.list;
    }

    get getItems() {
        return this.items;
    }

    get getData() {
        return this.data;
    }

};

const prodState = new ProducersState();
export default prodState;