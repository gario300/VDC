class MangoPayState {

    constructor() {
        this.init();
    }
    
    init = () => {
        this.data = {
            "userId": "",
        };
        this.items = [];
    }

    updateBillingState = (billingId) => {
        this.data = {
            "userId": billingId
        }
    }

    get getUserId() {
        return this.data.userId;
    }

};

const mangoPayState = new MangoPayState();
export default mangoPayState;