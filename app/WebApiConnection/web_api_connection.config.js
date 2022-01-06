export default class WebApiConfig {
    constructor() {  
        // Staging
        // Live
        // 
        this.environment = "dev";

        if (this.environment === "dev") {
            this.APIAddress = ';
            this.DashboardAddress = '';
        } else if (this.environment === "staging") {
            this.APIAddress = '';
            this.DashboardAddress = '';
        } else if (this.environment === "live") {
            this.APIAddress = '';
            this.DashboardAddress = '';
        }
    }

    get ApiAddress() {
        return this.APIAddress;
    }

    get AssetsAddress() {
        return this.APIAddress+ "/assets/";
    }

    get AssetsPublishAddress() {
        return this.APIAddress+ "/assets/publish/";
    }

    get AssetsFlashAddress() {
        return this.APIAddress+ "/assets/flash/";
    }

    get dashboardUrl() {
        return this.DashboardAddress;
    }
}
