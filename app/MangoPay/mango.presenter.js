import Mangopay from "mangopay-client-react";
import mangoState from './../MangoPay/mango_pay.state';
import mangoConfig from './../MangoPay/mango_pay.config';

class MangoPresenter 
{
    constructor() {
        this.mangoPayClient = null;
        Mangopay.mangoPayClient = null;
        this.mangoPayClient = Mangopay.getInstance(
            mangoConfig.clientId, 
            mangoConfig.clientPassword, 
            mangoState.getUserId, 
            mangoConfig.baseUrl
        );
    }

    async preRegisterCard(cardRegData) {
        try {
            return await this.mangoPayClient.getCardRegisterationData(cardRegData);
        } catch(error) {
            return false;
        }
    }

    async registerCard(preRegData, cardData) {
        try {
            return await this.mangoPayClient.registerCard(preRegData, cardData);
        } catch(error) {
            console.log("Register Card Error: ", error);
            return false;
        }
    }

    async getUserCards() {

        try {
        let result = await this.mangoPayClient.getCards();
        console.log('getCards', result);
        } catch (err) {
        console.log(err)
        }
    }

};

export default MangoPresenter;
