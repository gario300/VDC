import WebApiConnectionPresenter from './../WebApiConnection/web_api_connection.presenter';
import WebApiServicesDictionary from './../WebApiServices/web_api_services_dict';
import ApiServicesHelper from './../Utils/ApiServicesHelper/api_services_helper';

export default class ProfilePresenter {
	constructor(){}


    profileInformation( )  {
        return new Promise ( async( resolve, reject ) => { 
            const dictionary = WebApiServicesDictionary.dictionary.users.getUserMe
            const token = await ApiServicesHelper.tokenFromSession
            new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null
            ).then(response => {
                resolve(response.result)
            }).catch(e =>{
                reject('Non connection')
            })
            
        })
    }

    profileDetails(id) {
        return new Promise ( async( resolve, reject ) => {
            const dictionary = WebApiServicesDictionary.dictionary.users.usersDetail
            const token = await ApiServicesHelper.tokenFromSession
            console.log(dictionary) 
            const request = await new WebApiConnectionPresenter().callApiService(
                dictionary,
                token,
                null,
                id
            )

            if(request.status == 1){
                const user = request.result

                resolve({
                    name: user.name+' ',
                    lastName: user.lastName.substring(0, 1),
                    niveau: user.profile?.niveau,
                    description: user.profile?.description,
                    image: user.profile?.photo.length !== 0 ? user.profile?.photo[0] : '',
                    age: user.profile?.age,
                    city: user.profile?.city
                })
            }else{
                return('Err network Connection')
            }
        } )
    }
}
