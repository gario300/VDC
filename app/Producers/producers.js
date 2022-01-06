class Producer {

    constructor() { 
        this.categories = [
            {key: "fruitsleg", value: "Fruits & Légumes", },
            {key: "bouchhcharc", value: "Boucherie & Charcuterie"},
            {key: "poissonnerie", value: "Poissonnerie"},
            {key: "traiteur", value: "Traiteur"},
            {key: "epiceriesale", value: "Epicerie salé"},
            {key: "epiceriesucree", value: "Epicerie sucréé"},
            {key: "boissons", value: "Boissons"}
        ];
        this.categoriesColors = [
            {key: "fruitsleg", value: "24E536"},
            {key: "bouchhcharc", value: "E54624"},
            {key: "poissonnerie", value: "2461E5"},
            {key: "traiteur", value: "29100A"},
            {key: "epiceriesale", value: "E524C8"},
            {key: "epiceriesucree", value: "55144B"},
            {key: "boissons", value: "A7BCBB"}
        ];
        this.allergens = [
            {key: "gluten", value: "Gluten"},
            {key: "crustaces", value: "Crustacés"},
            {key: "oeufs", value: "Oeufs"},
            {key: "poissons", value: "Poissons"},
            {key: "arachides", value: "Arachides"},
            {key: "soja", value: "Soja"},
            {key: "lait", value: "Lait"},
            {key: "fruitscoques", value: "Fruits à coques"},
            {key: "celeri", value: "céleri"},
            {key: "moutarde", value: "Moutarde"},
            {key: "sesame", value: "Sésame"},
            {key: "sulfites", value: "Sulfites"},
            {key: "lupin", value: "Lupin"},
            {key: "mollusques", value: "Mollusques"}
        ];
        this.available = [
            {key: "2", value: "Sous 2h"},
            {key: "24", value: "Sous 24h"},
            {key: "48", value: "Sous 48h"},
        ];
        this.productType = [
            {key: "bio", value: "Bio"}
        ];
    }

    get pCategories() {
        return this.categories;
    }

    get pCategoriesColor() {
        return this.categoriesColors;
    }

    get pAvailable() {
        return this.available;
    }

    get pProductType() {
        return this.productType;
    }

    getCategories(item) {
        try {
            let items = typeof item.categories.length !== "undefined" ? item.categories : "";
            return items.map(key => {
                for(let i = 0; i < this.categories.length; ++i) {
                    if (this.categories[i].key === key) {
                        return this.categories[i].value;
                        break;
                    }
                }
            })
            .join(", ");
        } catch(err) {
            return "";
        }
    }

    getAllergens(item, key) {
        try {
            let items = typeof item[key].length !== "undefined" ? item[key] : "";
            return items.map(id => {
                for(let i = 0; i < this.allergens.length; ++i) {
                    if (this.allergens[i].key === id) {
                        return this.allergens[i].value;
                        break;
                    }
                }
            })
            .join(", ");
        } catch(err) {
            return "";
        }
    }

    getPickHours(hours) {
        return `Retrait en magasin gratuit sous ${hours}`;

        if (hours < 24) {
        }
        if (hours < 48) {
            return "Retrait en magasin gratuit sous 24h";
        }
        if (hours >= 48) {
            return "Retrait en magasin gratuit sous 48h";
        }
    }

    getPickUpTime(hours) {
        return `Retrait sous ${hours}`;

        if (hours < 24) {
            return "Retrait sous 2h";
        }
        if (hours < 48) {
            return "Retrait sous 24h";
        }
        if (hours >= 48) {
            return "Retrait sous 48h";
        }
    }
}

const prod = new Producer();
export default prod;