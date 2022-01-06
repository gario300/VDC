/* 
 * @author: Tomasz Sochacki
 * ISBN-13 and ISBN-10 validator.
 */

import regexp from './isbn_regexp' ;
import checksum from './isbn_checksum';

class ISBN {
    
    validate = ( isbn ) => {
        
        //Method always retruns boolean value!
        
        //Remove optional prefix:
        isbn = isbn.replace( regexp.PREFIX, '' );
        
        if( !regexp.ISBN.test( isbn ) ) {
            return false;
        }
        
        return checksum.check( isbn ); //true or false
    }

    getISBNFrom = ( value ) => {
        return checksum.getISBN( value );
    }
    
}

export default ISBN;