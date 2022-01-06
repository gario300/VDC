import React from 'react'
import { Image } from 'react-native'
import { FontAwesome, AntDesign, EvilIcons, Feather } from '@expo/vector-icons'
import StylesVariables from '../Styles/app.style'
const menu = (data) => { 
  const itemMenu =  [
        {
            name: [
                { title: data.name, style : {
                        ...StylesVariables.appText,
                        fontSize: 15
                    } 
                },
                {
                    title: 'Vair mon profil', style: {
                        ...StylesVariables.appText
                    }
                }
            ],
            route:'profile',
            icon: function Icon() {
                return(
                    <FontAwesome name="user-circle-o" size={24 * StylesVariables.responsiveMulti} color="black" />
                )
            }
        },
        {
            name : [
                { title: 'Ton guide VideDressingCommun', style: {
                        ...StylesVariables.appText
                    }
                }                
            ],
            route:'',
            icon: function Icon(){
                return(
                    <AntDesign name="questioncircleo" size={24* StylesVariables.responsiveMulti } color="black" />
                )
            }
        },
        {
            name : [
                { title: 'Mon dressing', style: {
                        ...StylesVariables.appText
                    }
                }                
            ],
            route:'mon',
            icon: function Icon(){
                return(
                    <Image
                        source={require('../../assets/icons/clothespin.png')}
                        style={{width: 24 * StylesVariables.responsiveMulti , height: 24 * StylesVariables.responsiveMulti }}
                    />                    
                )
            }
        },
        {
            name : [
                { title: 'Mes ventes et achats', style: {
                        ...StylesVariables.appText
                    }
                }                
            ],
            route:'commands',
            icon: function Icon(){
                return(
                    <Image
                        source={require('../../assets/icons/acquitant.png')}
                        style={{width: 24* StylesVariables.responsiveMulti , height: 24 * StylesVariables.responsiveMulti }}
                    />                    
                )
            }
        },
        {
            name : [
                { title: 'Paramètres', style: {
                        ...StylesVariables.appText
                    }
                }                
            ],
            route:'',
            icon: function Icon(){
                return(
                    <EvilIcons name="gear" size={24* StylesVariables.responsiveMulti } color="black" />                    
                )
            }
        },
        {
            name : [
                { title: 'notifications', style: {
                        ...StylesVariables.appText
                    }
                }                
            ],
            route:'',
            icon: function Icon(){
                return(
                    <AntDesign name="mail" size={24 * StylesVariables.responsiveMulti} color="black" />
                                    
                )
            }
        },
        {
            name : [
                { title: 'Nous contacter', style: {
                        ...StylesVariables.appText
                    }
                }                
            ],
            route:'contact',
            icon: function Icon(){
                return(
                    <Feather name="mail" size={24 * StylesVariables.responsiveMulti} color="black" />
                                    
                )
            }
        },
        {
            name : [
                { title: 'Conditions générales', style: {
                        ...StylesVariables.appText
                    }
                }                
            ],
            route:'gcv',
            icon: null
        },
        {
            name : [
                { title: 'Politique de confidentialité', style: {
                        ...StylesVariables.appText
                    }
                }                
            ],
            route:'politique',
            icon: null
        },
        {
            name : [
                { title: 'Mentions légales', style: {
                        ...StylesVariables.appText
                    }
                }                
            ],
            route:'',
            icon: null
        }
    ]

    return itemMenu
}
export default menu
