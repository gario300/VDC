import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import ApiServicesHelper from './../Utils/ApiServicesHelper/api_services_helper';

export default class ProfilePersonalizationPresenter {

	constructor() {}

    async sendNewInfo(form) {
        let formSend = new FormData()
        for(const key in form) {
            if(key !== 'photo') {     
                formSend.append( key, form[key] )
            }
        }
        formSend = await ApiServicesHelper.setImages( [form.photo], formSend, 'photo' )

        const dictionary = WebApiServicesDictionary.dictionary.users.setUserProfile
        const token = await ApiServicesHelper.tokenFromSession
        return new WebApiConnectionPresenter().callApiService(
            dictionary,
            token,
            formSend,
            null
        )
    }
}
