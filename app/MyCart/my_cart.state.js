import MyLocalStorage from './../Utils/LocalStorage/my_local_storage';
import faker from 'faker'

class MyCartState {

    constructor() {
        this.init();

        MyLocalStorage.GetItem(this.storageKey)
        .then(data => {
            this.cartItems = data.data;
            console.log("On Get Cart", this.cartItems);
        })
        .catch(error => {
            console.log("On Get Cart Error", error);
        })
    }

    init = () => {
        this.cartItems = [];
        this.preCartItems = [];
        this.storageKey = "my_cart";
    }

    reset = () => {
        MyLocalStorage.SaveItem([], this.storageKey)
        .then(val => {
            if (val.status === 1) {
                console.log("Save My Cart Success")
            } else {
                console.log("Save My Cart Not Success")
            }
        })
        .catch(error => {
            console.log("Save Cart Error", error);
        })
    }

    newItemCart = (item, count) => {
        return {
            "id": item.id,
            "producerId": item.producerId,
            "title": item.title,
            "description": item.descriptionShort,
            "count": count,
            "price": item.price,
            "sku": faker.random.uuid()
        }
    }

    addPreCartItem = item => {
        this.preCartItems.push(item);
    }

    updateItemInPreCart = (itemId, count, sum) => {
        const totalCount = count + sum;
        if (totalCount <= 0) {
            this.removePreCartItem(itemId);
            return;
        }

        const found = this.preCartItems.find(item => item.id === itemId);
        if (found) {
            const newList = [];
            this.preCartItems.forEach(item => {
                if (item.id === itemId) {
                    item.count = totalCount;
                }
                newList.push(item);
            });
        } else {
            const newItem = {
                "id": itemId,
                "count": totalCount
            };
            this.preCartItems.push(newItem);
        }
    }

    removePreCartItem = id => {
        this.preCartItems = this.preCartItems.filter(item => id !== item.id);
    }

    getPreCartItems = () => {
        return this.preCartItems;
    }

    addItem = item => {
        if (typeof item.id !== "undefined") {
            const newList = [];
            let found = false;
            this.cartItems.forEach(elm => {
                if (elm.id === item.id) {
                    elm.count += item.count;
                    found = true;
                }
                newList.push(elm);
            })
            this.cartItems = newList;
            if (!found) {
                this.cartItems.push(item);
            }
        }
        MyLocalStorage.SaveItem(this.cartItems, this.storageKey)
        .then(val => {
            if (val.status === 1) {
                console.log("Save My Cart Success")
            } else {
                console.log("Save My Cart Not Success")
            }
        })
        .catch(error => {
            console.log("Save Cart Error", error);
        })
    }

    removeItem(sku) {
        this.cartItems = this.cartItems.filter(item => sku !== item.sku);
        MyLocalStorage.SaveItem(this.cartItems, this.storageKey)
        .then(val => {
            if (val.status === 1) {
                console.log("Save My Cart Success")
            } else {
                console.log("Save My Cart Not Success")
            }
        })
        .catch(error => {
            console.log("Save Cart Error", error);
        });
    }

    clearItems() {
        this.cartItems = [];
    }

    updateItem(product) {
        const found = this.cartItems.find(item => item.sku === product.sku);
        if (found) {
            const newList = [];
            this.cartItems.forEach(item => {
                if (item.sku === product.sku) {
                    item.count = product.count;
                }
                newList.push(item);
            });
            this.cartItems = newList;
            MyLocalStorage.SaveItem(this.cartItems, this.storageKey)
            .then(val => {
                if (val.status === 1) {
                    console.log("Save My Cart Success")
                } else {
                    console.log("Save My Cart Not Success")
                }
            })
            .catch(error => {
                console.log("Save Cart Error", error);
            })
        }
    }

    getItems = () => {
        return this.cartItems.concat([]);
    }

    getItemWithId = (id) => {

    }

    getTotal = () => {
        const items = this.getItems();
        let total = 0;
        items.forEach(product => {
            total += product.count * product.price;
        });
        return total;
    }

    getCartDataWithProducers = (producers) => {
        if (typeof producers === "undefined") {
            return [];
        }
        const items = this.getItems();
        const newList = [];
        const newListItems = [];
        producers.forEach( (producer, index) => {
            const filtered = items.filter(item => item.producerId === producer.id);
            if (filtered.length <= 0) return;
            newListItems.push(items);
            const products = filtered.map((product, index) => {
                return {
                    ...product,
                    "key": product.id + "_" + index,
                    "total": product.count * product.price,
                }
            });

            newList.push(
                {
                    "key": producer.id + "_" + index,
                    "id": producer.id,
                    "title": producer.title,
                    "pickHourTime": producer.pickHourTime,
                    "directionComplete": producer.directionComplete,
                    "items": products
                }
            )
        });

        //this.cartItems = newListItems;
        //this.addItem({});
        return newList;
    }

    getCartDataWithProducersToPost = (producers) => {
        if (typeof producers === "undefined") {
            return [];
        }
        const items = this.getItems();
        const newList = [];
        producers.forEach( (producer, index) => {
            const filtered = items.filter(item => item.producerId === producer.id);
            if (filtered.length <= 0) return;
            const products = filtered.map((product, index) => {
                return {
                    "id": product.id,
                    "count": product.count,
                    "price": product.price,
                    "producerId": product.producerId,
                    "total": product.count * product.price,
                }
            });

            newList.push(
                {
                    "id": producer.id,
                    "items": products
                }
            )
        });

        return newList;
    }

};

const myCartState = new MyCartState();
export default myCartState;