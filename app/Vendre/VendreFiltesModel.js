import React from 'react'
import StylesVariables from '../Styles/app.style'
import { Image } from 'react-native'
import { Entypo } from '@expo/vector-icons';
export const filters = [ 
    {
        type:'Category *',
        subCategories: [ 'lorem' ],
        elements: [],
        route: 'CatScreen',
        id: 'category'
    },
    {
        type:'Marque *',
        subCategories: [],
        elements: [],
        route: 'CatScreen',
        id: 'marque'
    },
    {
        type:'Authenticité *',
        subCategories: [],
        elements: [],
        route:'SubCatAuthScreen',
        id: 'authenticite'
    },
    {
        type:'Etat *',
        subCategories: [],
        elements: [],
        route: 'EtatScreen',
        id: 'etat'
    },
    {
        type:'Coileur *',
        subCategories: [],
        elements: [],
        route: 'ColorScreen',
        id: 'coileur'
    }, 
    {
        type:'Taille *',
        subCategories: [],
        elements: [],
        route: 'CatScreen',
        id: 'taille'
    },
]


export const colors = [ 
    {
        color: '#E1332B',
        selected: false,
        name: [ { title: 'Red', style: { ...StylesVariables.appText } }]
    },
    {
        color: '#C74DB5',
        selected: false,
        name: [ { title: 'pink', style: { ...StylesVariables.appText } }]
    },
    {
        color: '#408FE8',
        selected: false,
        name: [ { title: 'Blue', style: { ...StylesVariables.appText } }]
    }
]


export const etate = [
    {
        titles : [
            { 
                title: 'Neuf avec étiquette', 
                style: { 
                    ...StylesVariables.appSubTitle,
                    color: StylesVariables.blackColors,
                    fontSize: 15,
                }
            },
            { 
                title: "Article neuf, jamais porté ou dans son emballage d'origine", 
                style: { 
                    ...StylesVariables.appText,
                    color: StylesVariables.blackColors,
                    fontSize: 12
                }
            }

        ],
        selected: false
    },
    {
        titles : [
            { 
                title: 'Neuf sans étiquette', 
                style: { 
                    ...StylesVariables.appSubTitle,
                    color: StylesVariables.blackColors,
                    fontSize: 15
                }
            },
            { 
                title: "Article neuf, jamais porté, sans étiquette ni emballage d'origine", 
                style: { 
                    ...StylesVariables.appText,
                    color: StylesVariables.blackColors,
                    fontSize: 12
                }
            }
        ],
        selected: false
    },
    {
        titles : [
            { 
                title: 'Très bon état', 
                style: { 
                    ...StylesVariables.appSubTitle,
                    color: StylesVariables.blackColors,
                    fontSize: 15
                }
            },
            { 
                title: "Un article très peu porté/utilisé qui peut avoir de légères imperféctions, mais qui reste en très bon état. Présente bien les défauts de ton article et montre les sur tes photos.", 
                style: { 
                    ...StylesVariables.appText,
                    color: StylesVariables.blackColors,
                    fontSize: 12
                }
            }
        ],
        selected: false
    },
    {
        titles : [
            { 
                title: 'Bon état', 
                style: { 
                    ...StylesVariables.appSubTitle,
                    color: StylesVariables.blackColors,
                    fontSize: 15
                }
            },
            { 
                title:"Un article porté/utilisé quelques fois, qui montre donc des traces d'usure. Présente bien les défauts de ton article et montre les sur tes photos." ,
                style: { 
                    ...StylesVariables.appText,
                    color: StylesVariables.blackColors,
                    fontSize: 12
                }
            }
        ],
        selected: false
    },
    {
        titles : [
            { 
                title: 'Satisfaisant', 
                style: { 
                    ...StylesVariables.appSubTitle,
                    color: StylesVariables.blackColors,
                    fontSize: 15
                }
            },
            { 
                title:"Un article porté/utilisé plusieurs fois, qui montre donc des traces d'usure. Présente bien les défauts de ton article et montre les sur tes photos.",
                style: { 
                    ...StylesVariables.appText,
                    color: StylesVariables.blackColors,
                    fontSize: 12
                }
            }
        ],
        selected: false
    }
]

export const authentique = [
    {
        title:'Vue de face avec logo',
        icon: function Icon(){
            return (
                <Image
                    style={{ width: 30, height: 30 }}
                    source={require('../../assets/icons/tshirt1.png')}
                />
            )
        },
        selected: false
    },
    {
        title:'Vue de dos avec logo',
        icon: function Icon(){
            return (
                <Image
                    style={{ width: 30, height: 30 }}
                    source={require('../../assets/icons/tshirt1.png')}
                />
            )
        },
        selected: false
    },
    {
        title:'Intérieur avec logos',
        icon: function Icon(){
            return (
                <Image
                    style={{ width: 30, height: 30 }}
                    source={require('../../assets/icons/tshirt2.png')}
                />
            )
        },
        selected: false
    },
    {
        title:'Sac de protection',
        icon: function Icon(){
            return (
                <Image
                    style={{ width: 30, height: 30 }}
                    source={require('../../assets/icons/tshirt4.png')}
                />
            )
        },
        selected: false
    },
    {
        title:'Emballage',
        icon: function Icon(){
            return (
                <Image
                    style={{ width: 30, height: 30 }}
                    source={require('../../assets/icons/tshirt5.png')}
                />
            )
        },
        selected: false
    },
    {
        title:'Etiquette',
        icon: function Icon(){
            return (
                <Image
                    style={{ width: 30, height: 30 }}
                    source={require('../../assets/icons/tshirt6.png')}
                />
            )
        },
        selected: false
    },
    {
        title: "Reçu ou preuve d'achat",
        icon: function Icon(){
            return (
                <Image
                    style={{ width: 30, height: 30 }}
                    source={require('../../assets/icons/tshirt7.png')}
                />
            )
        },
        selected: false
    },
    {
        title: "Etiquette d'entretien",
        icon: function Icon(){
            return (
                <Image
                    style={{ width: 30, height: 30 }}
                    source={require('../../assets/icons/tshirt8.png')}
                />
            )
        },
        selected: false
    },
    {
        title: "Autres",
        icon: function Icon(){
            return (
               <Entypo name="dots-three-horizontal" size={30} color={StylesVariables.grayDarkColor} />
            )
        },
        selected: false
    }

]
