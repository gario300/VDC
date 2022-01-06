import React, { useState, useEffect, useRef } from 'react'
import { View, ImageBackground, Dimensions, ScrollView } from 'react-native'
import { styles } from './Banner.styles'
import AppIntroSlider from 'react-native-app-intro-slider';
import { Animated } from "react-native";
const width = Dimensions.get('window').width

const Banner = () => {
    useEffect(() => {
        const interval = setInterval(() => {
          changeSlides()
        }, time());
        return () => clearInterval(interval);
    }, [slides]);
   
    const moveRight = useRef(new Animated.Value(0)).current;
            
    const [currentSlider, setCurrentSlider] = useState(1);
    const [rigthDirection, setRigthDirection] = useState(0);
    
    const time = () => {
        const x = parseInt(JSON.stringify(moveRight), 10)
        if(slides.length * width > x + width){
            return 10000
        } else {
            return 20000
        }
    }

    const slides = [
        {
            image : 'https://images.bewakoof.com/utter/banner-long-skirt-designs-women-1556010664.jpg'
        },
        {
            image : 'https://weallsew.com/wp-content/uploads/sites/4/2015/12/Banner-Day-Skirt-1100-x-600.jpg'
        },
        {
            image: 'https://i.ytimg.com/vi/YKizXpftsRg/maxresdefault.jpg'
        },
        {
            image: 'https://i.ytimg.com/vi/fIfUR2Wq5P0/maxresdefault.jpg'
        }
    ] 

    
    const changeSlides = () => {
        const x = parseInt(JSON.stringify(moveRight), 10)
        if(slides.length * width > x + width ){
            Animated.timing(moveRight, {
                toValue: x + width,
                duration: 5000
            }).start()
        } else {
            Animated.timing(moveRight, {
                toValue: 0,
                duration: 10000 
            }).start()
        }
    }
    
    const RenderItem = ({ item }) => {
        return(
            <Animated.Image
                source = {{uri : item.image}}
                style={[{width: width , height : '100%', right: moveRight}]}
            />
        )
    }

    return(
         <View style={styles.container}>
             {
                slides.map( ( item ) => {
                    return (
                        <RenderItem
                           item={item} 
                        />
                    )
                })
             } 
        </View>
    )
}

export default Banner
