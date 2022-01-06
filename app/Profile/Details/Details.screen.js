import React from 'react'
import { View, ScrollView, Text, ImageBackground } from 'react-native'
import { styles } from './Details.styles'
import TopBar from './TopBar.component'
import AppStore from '../../Flux/AppStore';
import * as AppActions from "../../Flux/AppActions";
//import Localization from '../../Localization/localization';
import myAppState from '../../AppState/app_state';
import ImageLoader from '../../UIComponents/Image/image_loader.component';
//import Pressenter from '../profile.presenter.js'

const Details = ({ navigation }) => {

    const [myData, setMyData] = React.useState({
        name: myAppState.userMe.name,
        lastName: myAppState.userMe.lastName,
        niveau: myAppState.profile.niveau,
        description: myAppState.profile.description,
        image: myAppState.profile.photo.length > 0 ? myAppState.profile.photo[0] : "",
        city: myAppState.profile.city,
        age: myAppState.profile.age
    })
    
    React.useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            AppActions.getUserMe();
            AppStore.on("onSetUser", OnUserGot);
            return () => {
                AppStore.removeListener("onSetUser", OnUserGot)
            }
        }
    );

    // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation])

    const OnUserGot = () => {
        setMyData({
            name: myAppState.userMe.name,
            lastName: myAppState.userMe.lastName,
            niveau: myAppState.profile.niveau,
            description: myAppState.profile.description,
            image: myAppState.profile.photo.length > 0 ? myAppState.profile.photo[0] : "",
            city: myAppState.profile.city,
            age: myAppState.profile.age
        })
    }

    return(
        <View style={ styles.container }>
            <View style={styles.topContent}>
                    <TopBar
                        onClose={() => {
                            navigation.goBack();
                        }}
                        onEdit={() => {
                            navigation.navigate("AccountDetails");
                        }}
                        onSettings={() => {
                            navigation.navigate("MyProfile");
                        }}
                    />
                    <View style={styles.avatarContainer}>
                        <ImageLoader
                            style={{width: '100%', height: '100%'}}
                            source={{uri: myData.image}}
                            loadSize={"small"}
                        />
                    </View>
                    <Text style={styles.name}>
                        {myData.name} {myData.lastName}
                    </Text>
                    <Text style={styles.subName}>
                        {myData.age} Ans
                    </Text>
                    <Text style={styles.subName}>
                        {myData.city}
                    </Text>
                    <Text style={styles.name}>
                        {myData.niveau}
                    </Text>
            </View>
            <View style={styles.bodyContent}>
                <Text style={styles.pTitle}>
                    A propos
                </Text>
                <Text style={styles.p}>
                    {myData.description}
                </Text>
            </View>
        </View>
    )
}

export default Details
