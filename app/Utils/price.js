export function formatPrice(val) {
    const num = Number(val);
    if (isNaN(num) || num === 0) {
        return "Nous contacter";
    }

    const priceString = val.toString();
    const priceList = priceString.split(".")
    let count = 0;
    let list = [];
    /*
    for(let i = priceList.length - 1; i >= 0; --i ) {
        const num = priceList[i];
        count += 1;
        list.unshift(num);
        if (count >= 3) {
            list.unshift(" ");
            count = 0;
        }
    }
    */

    return priceList.join(',') + " €";
}