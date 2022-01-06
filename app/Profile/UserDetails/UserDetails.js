import React from 'react'
import { View, ScrollView, Text, ImageBackground } from 'react-native'
import { styles } from '../Details/Details.styles'
import ImageLoader from '../../UIComponents/Image/image_loader.component';
import Pressenter from '../profile.presenter.js'
import TopBar from './TopBar.component'

const Details = ({route, navigation}) => {
    const [myData, setMyData] = React.useState({
        name: '',
        lastName: '',
        niveau: '',
        description: '',
        image: '',
        city: '',
        age: ''
    })
    React.useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
        });
        return unsubscribe;
    }, [navigation])

    const getData = async() => {
        const user = new Pressenter()
        user.profileDetails(route.params.id)
            .then( response => {
                setMyData(response)
            })
    }
  
    return(
        <View style={ styles.container }>
            <View style={styles.topContent}>
                    <TopBar
                        onClose={()=>{
                            navigation.goBack()
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
