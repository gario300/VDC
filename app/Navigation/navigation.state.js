class NavigationState {

    constructor() {
        this.init();
    }

    init = () => {
        this.nextNavigation = [];
        this.items = [];
    }

    setNextNavigation = (obj) => {
        this.nextNavigation.push(obj);
    }

    get getNextNavigation() {
        const nextLength = this.nextNavigation.length;
        if (nextLength > 0) {
            const obj = this.nextNavigation[nextLength - 1];
            return obj;
        }

        return false;
    }

    removeLastState = () => {
        const nextLength = this.nextNavigation.length;
        this.nextNavigation = this.nextNavigation.filter((val,index) => index !== (nextLength - 1) );
        console.log("Next Nav:_ ", this.nextNavigation);
    }

};

const navigationState = new NavigationState();
export default navigationState;