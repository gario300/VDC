/* 
 * @author: Tomasz Sochacki
 * Checksum for validate ISBN-10 and ISBN-13.
 */

const checksum = ( str ) => {
    //isbn have to be number or string (composed only of digits or char "X"):
    var sum,
        weight,
        digit,
        check,
        i;

    str = str.replace(/[^0-9X]/gi, '');

    if (str.length != 10 && str.length != 13) {
        return false;
    }

    if (str.length == 13) {
        sum = 0;
        for (i = 0; i < 12; i++) {
            digit = parseInt(str[i]);
            if (i % 2 == 1) {
                sum += 3*digit;
            } else {
                sum += digit;
            }
        }
        check = (10 - (sum % 10)) % 10;
        return (check == str[str.length-1]);
    }

    if (str.length == 10) {
        weight = 10;
        sum = 0;
        for (i = 0; i < 9; i++) {
            digit = parseInt(str[i]);
            sum += weight*digit;
            weight--;
        }
        check = (11 - (sum % 11)) % 11
        if (check == 10) {
            check = 'X';
        }
        return (check == str[str.length-1].toUpperCase());
    }
};

const getISBN = ( str ) => {

    let sum,
        weight,
        digit,
        check,
        i;

    //str = str.replace(/[^0-9X]/gi, '');
    let val = str.split("");
    //val = val.splice(0, 2, '');
    val = val.filter((el, index) => {
        if (index > 2 && index < val.length -1) {
            return true
        }
    })

    if (val.length != 9 && val.length != 12) {
        return false;
    }

    let newStr = "";
    if (val.length == 12) {
        sum = 0;
        for (let i = 0; i < val.length; ++i) {
            newStr += val[i];
            digit = Number(val[i]);
            if (i % 2 == 1) {
                sum += 3*digit;
            } else {
                sum += digit;
            }
        }
        check = (10 - (sum % 10)) % 10;
        return newStr + check

    } else if (val.length == 9) {
        weight = 10;
        sum = 0;
        for (let i = 0; i < 9; i++) {
            newStr += val[i];
            digit = Number(val[i]);
            sum += weight*digit;
            weight--;
        }
        check = (11 - (sum % 11)) % 11
        if (check == 10) {
            check = 'X';
        }
        return newStr + check
    }

    return false
}

export default {
    "check": checksum,
    "getISBN": getISBN
};