export default class CatState{
    constructor(){
       this.init() 
    }
    
    initWithValues = (values) => {
        for (key in values) {
            switch (key) {
                case 'categories':
                    this.addCat(values[key])    
                break;
                case 'marques':
                    this.addMarques(values[key])
                break;
                case 'authenticite':
                    this.addAuthenticite(values[key])
                break;
                case 'etat':
                    this.addEtat(values[key])
                break;
                case 'coileur':
                    this.addCoileurs(values[key])
                break;
                case 'tailes':
                    this.addTailes(values[key])
                break;
            } 
        }

    }

    addPour = (catArray) => {
        const newArr = []
        catArray.map((item) => {
            if(item.selected){
                newArr.push(item)
            }
        })
        this.pour = newArr
    }

    addCat = (catArray) => {
        const newArr = []
        catArray.map((item, index) => {
            if(item.selected){ 
                newArr.push(item)
            }
        })
        this.categories = newArr
    }
    
    addMarques = (catArray) => {
        const newArr = []
        catArray.map((item, index) => {
            if(item.selected){
                newArr.push(item)
            }
        }) 
        this.marques = newArr
    }

    addTailes = (catArray) => {
        const newArr = []
        catArray.map((item, index) => {
            if(item.selected){
                newArr.push(item)                
            }
        })
        this.tailes = newArr
    }

    addCoileurs = (catArray) => {
        const newArr = []
        catArray.map((item) => {
            if(item.selected){ 
                newArr.push(item)
            } 
        })
        this.coileur = newArr
    }

    addAuthenticite = (catArray) => {
        const newArr = []
        catArray.map((item, index) => {
            if(item.selected){   
                newArr.push(item)
            }
        })
        this.authenticite = newArr
    }

    addEtat = (catArray) => {
        const newArr = []
        catArray.map((item) => {
            if(item.selected){ 
                newArr.push(item) 
            }
        })
        this.etat = newArr
    }

    init() {
        this.categories = [];
        this.marques = [];
        this.tailes = [];
        this.coileur = [];
        this.authenticite = [];
        this.etat = [];
        this.pour = [];
    }

    getCategories = () => {
        return this.categories;
    }

    getMarques = () => {
        return this.marques;
    }

    getTailles = () => {
        return this.tailes
    }

    getCoileurs = () => {
        return this.coileur
    }

    getAuthenticite = () => {
        return this.authenticite
    }

    getEtat = () => {
        return this.etat
    }

    getPour = () => {
        return this.pour
    }
}
