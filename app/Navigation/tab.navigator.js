import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, Octicons,Entypo, Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import Localization from './../Localization/localization';
import StylesVariables from './../Styles/app.style';
import EmptyScreen from './../Empty/empty.screen';
import ScreenOptions from './tab_screen.options';
import AccountScreen from './../Account/account.screen';
import MeAccountScreen from '../Account/account_me.screen';
import ProfileDetails from './../Profile/Details/Details.screen';
import AccountPasswordScreen from '../Account/account_password';
import FormGeneratorTestScreen from '../Forms/form_test.screen';
import HomeScreen from '../Home/home.screen';
import FilterSearchScreen from '../SearchScreen/Search.screen';
import SubFilterSearchScreen from '../SearchScreen/SubSearch.screen'
import AdviceScreen from '../Advice/advice.screen';
import AdviceDescriptionScreen from '../Advice/advice_description.screen'
import MyFileScreen from '../Account/MyFile/account_my_file.screen';
import MyFileEditScreen from '../Account/MyFile/account_my_file.editscreen';
import ChatRoomScreen from '../Chat/chat_room.screen';
import DetailScreen from '../Products/Details.screen'
import ComandesAchats from '../MesAndAchats/MainPage.screen'
import authState from './../Auth/auth.state';
import VendreScreen from '../Vendre/Vendre.screen'
import PurchaseItem from '../Products/Purchase/Purchase.Screen'
import PaymentScreen from '../Payment/Payment.screen'
import Adresse from '../Adress/Adress.screen'
import SubCatColor from '../SubCategoryFilterSelect/SubColorFilter.screen'
import EtatScreen from '../SubCategoryFilterSelect/SubVendreFilter.screen'
import SubCatAuthScreen from '../SubCategoryFilterSelect/SubCatAuth.screen'
import PayMethodScreen from '../PayMethod/Paymethod.screen'
import LitigeScreen from '../Litige/Litige.screen'
import SubCatFilter from '../SubCategoryFilterSelect/SubCatFilter'
import ChatScreen from '../Chat/ChatStackContainer.screen'
import MonProduits from '../Products/MonProduits.screen'
import CardScreen from '../PayMethod/payment_card.screen'

const HomeStack = createStackNavigator();
function HomeStackScreen({route}) {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      mode="card"
      headerMode="screen"
      screenOptions={ScreenOptions}
    >
      <Tab.Screen 
        name="Home" 
        options={{ 
          gestureEnabled: false,
          headerShown: false,
          title: "",
          rightIcon: 'search',
          withMenu: true,
          withRightIcon: false,
          withTitle: false
        }}
        initialParams={{
          "OnShowArticle": route.params.OnShowArticle,
          "OnShowArticleVideo": route.params.OnShowArticleVideo,
          "OnShowArticleAudio": route.params.OnShowArticleAudio,
        }}
        component={HomeScreen} />
        <Tab.Screen 
        name="Details" 
        options={{ 
          title: "Details",
          rightIcon: 'details',
          withReturn: true,
          withRightIcon: true,
          withTitle: true,
          gestureEnabled: false,
          headerShown: true,
          OnRightPress: () => {},
        }} 
        component={DetailScreen} />
        <Tab.Screen 
        name="MyFile" 
        options={{ 
          title: "Ma fiche",
          rightIcon: 'edit',
          withRightIcon: true,
          withTitle: true,
          gestureEnabled: false,
          headerShown: true,
          OnRightPress: () => {},
        }} 
        component={MyFileScreen} />
    <Tab.Screen 
        name="MyFileEdit" 
        options={{ 
          rightIcon: 'save',
          title: "Ma fiche",
          withRightIcon: true,
          withTitle: true,
          gestureEnabled: false,
          headerShown: true,
          OnRightPress: () => {},
        }} 
        component={MyFileEditScreen} /> 
      <Tab.Screen 
        name="PurchaseItem" 
        options={{ 
            title: "Purchase Item",
            withTitle: true,
            withReturn: true, 
            gestureEnabled: false, 
            headerTransparent: false,
            headerShown: true, 
            withRightIcon: true
        }}       
        component={PurchaseItem}  
      />
      <Tab.Screen 
        name="PaymentScreen" 
        options={{ 
            title: "Payment",
            withTitle: true,
            withReturn: true, 
            gestureEnabled: false, 
            headerTransparent: false,
            headerShown: true,
            withRightIcon: true
        }}       
        component={PaymentScreen}  
      />
      <Tab.Screen 
        name="PaymentCard" 
        options={{ 
            title: "Carte de crédit",
            withTitle: true,
            withReturn: true, 
            gestureEnabled: false, 
            headerTransparent: false,
            headerShown: true,
            withRightIcon: true
        }}       
        component={CardScreen}  
      />
      <Tab.Screen 
        name="PayMethodScreen" 
        options={{ 
            title: "Modes de paiement",
            withTitle: true,
            withReturn: true, 
            gestureEnabled: false, 
            headerTransparent: false,
            headerShown: true,
            withRightIcon: true
        }}       
        component={PayMethodScreen}  
      />
      <Tab.Screen 
        name="LitigeScreen" 
        options={{ 
            title: "Déclarer un litige",
            withTitle: true,
            withReturn: true, 
            gestureEnabled: false, 
            headerTransparent: false,
            headerShown: true,
            withRightIcon: true
        }}       
        component={LitigeScreen}  
      />
      <Tab.Screen 
        name="AdressScreen" 
        options={{ 
            title: "Adresse",
            withTitle: true,
            withReturn: true, 
            gestureEnabled: false, 
            headerTransparent: false,
            headerShown: true,
            withRightIcon: true
        }}       
        component={Adresse}  
      />
    </HomeStack.Navigator>
  );
}

const AccountStack = createStackNavigator();
function AccountStackScreen({route}){
    return(
    <AccountStack.Navigator
      initialRouteName="MyProfile"
      mode="card"
      headerMode="screen"
      screenOptions={ScreenOptions}
    >
      <Tab.Screen 
        name="ProfileDetails" 
        options={{ 
          gestureEnabled: false,
          headerShown: false,
          title: "",
          rightIcon: 'search',
          withMenu: false,
          withRightIcon: false,
          withTitle: false
        }}
        component={ProfileDetails}
      />
      <Tab.Screen 
        name="MyProfile" 
        options={{ 
          withReturn: true, 
          withTitle: true,
          title: "Paramètres", 
          withCart: false, 
          gestureEnabled: false, 
          headerShown: false, 
          withAsideIcon: true,
          headerTransparent: true,
          OnCenterPress: () => {},
          OnInfoPress: route.params.showInfo,
        }} 
        component={AccountScreen} /> 
      <Tab.Screen 
        name="AccountDetails" 
        options={{ 
          gestureEnabled: false, 
          headerShown: true, 
          rightIcon: "account", 
          withTitle: true,
          title: "Modifier mon profil",
          withReturn: true, 
          withRightIcon: true,
          OnRightPress: () => {},
        }} 
        component={MeAccountScreen} />
      <Tab.Screen 
        name="MonProduits" 
        options={{ 
          gestureEnabled: false, 
          headerShown: true, 
          rightIcon: "",
          title: "Mon Dressing", 
          withTitle: true,
          withReturn: true, 
          withRightIcon: false,
          OnRightPress: () => {},
        }} 
        component={MonProduits} />
      <Tab.Screen 
        name="CommandesAchats" 
        options={{ 
          gestureEnabled: false, 
          headerShown: true, 
          rightIcon: "",
          title: "", 
          withTitle: false,
          withReturn: true, 
          withRightIcon: false,
          OnRightPress: () => {},
        }} 
        component={ComandesAchats} />
      <Tab.Screen 
        name="AccountPassword" 
        options={{ 
          withReturn: true, 
          title: "", 
          withCart: true, 
          gestureEnabled: false, 
          headerShown: true, 
          withAsideIcon: false,
          OnCenterPress: () => {},
        }} 
        component={AccountPasswordScreen} /> 
        <Tab.Screen 
            name="DetailsVendre" 
            options={{ 
                title: "",
                withTitle: true,
                firstLoad: false,
                withReturn: true, 
                gestureEnabled: false, 
                headerTransparent: false,
                headerShown: true
            }} 
            component={DetailScreen}  
         />

    </AccountStack.Navigator>
    )
}

const SearchStack = createStackNavigator();
function SearchStackScreen({route}) {
  return (
    <SearchStack.Navigator
      initialRouteName="ArticleSearch"
      mode="card"
      headerMode="screen"
      screenOptions={ScreenOptions}
    >
        <Tab.Screen 
            name="ArticleSearch" 
            options={{ 
            withReturn: false,
            title: "Explorer",
            withTitle: false,
            gestureEnabled: false,
            headerShown: true,
            rightIcon: 'search',
            withRightIcon: true,
            headerTransparent: true
            }}
        component={FilterSearchScreen} />
        <Tab.Screen 
            name="ArticleSearchSub" 
            options={{ 
              withReturn: false,
              title: "Explorer",
              withTitle: false,
              gestureEnabled: false,
              headerShown: false,
              rightIcon: 'search',
              withRightIcon: true,
              headerTransparent: true
            }}
        component={SubFilterSearchScreen} />  
        <Tab.Screen 
            name="ColorScreen" 
            options={{ 
                title: "Couleur",
                withTitle: true,
                withReturn: true, 
                gestureEnabled: false, 
                headerTransparent: false,
                withRightIcon: true,
                headerShown: true
            }} 
            
            component={SubCatColor}  
          />
          <Tab.Screen 
            name="CatScreen" 
            options={{ 
                title: "Couleur",
                withTitle: true,
                withReturn: true, 
                gestureEnabled: false, 
                headerTransparent: false,
                withRightIcon: true,
                headerShown: false
            }}  
            component={SubCatFilter}  
          />
          <Tab.Screen 
            name="EtatScreen" 
            options={{ 
                title: "Etat",
                withTitle: true,
                withReturn: true, 
                gestureEnabled: false, 
                headerTransparent: false,
                headerShown: true,
                withRightIcon: true
            }}       
            component={EtatScreen}  
          />
          <Tab.Screen 
            name="SubCatAuthScreen" 
            options={{ 
                title: "Preuves d'authenticités",
                withTitle: true,
                withReturn: true, 
                gestureEnabled: false, 
                headerTransparent: false,
                headerShown: true,
                withRightIcon: true
            }}       
            component={SubCatAuthScreen}  
          />    
          <Tab.Screen 
            name="DetailsVendre" 
            options={{ 
                title: "",
                withTitle: true,
                firstLoad: false,
                withReturn: true, 
                gestureEnabled: false, 
                headerTransparent: false,
                headerShown: true
            }} 
            component={DetailScreen}  
         />
    </SearchStack.Navigator>
    )
}

const VendreStack = createStackNavigator();
function VendreStackScreen({route}) {
  return (
    <VendreStack.Navigator
      initialRouteName="NewVendre"
      mode="card"
      headerMode="screen"
      screenOptions={ScreenOptions}
    >
      <Tab.Screen 
        name="NewVendre" 
        options={{ 
            title: "",
            withTitle: true,
            firstLoad: false,
            withReturn: true, 
            gestureEnabled: false, 
            headerTransparent: false,
            headerShown: true
        }} 
        component={VendreScreen}  
      /> 
      <Tab.Screen 
        name="DetailVendre" 
        options={{ 
            title: "",
            withTitle: true,
            firstLoad: false,
            withReturn: true, 
            gestureEnabled: false, 
            headerTransparent: false,
            headerShown: true
        }} 
        component={VendreScreen}  
      />
      <Tab.Screen 
        name="ColorScreen" 
        options={{ 
            title: "Couleur",
            withTitle: true,
            withReturn: true, 
            gestureEnabled: false, 
            headerTransparent: false,
            withRightIcon: true,
            headerShown: true
        }} 
        
        component={SubCatColor}  
      />
      <Tab.Screen 
        name="CatScreen" 
        options={{ 
            title: "Couleur",
            withTitle: true,
            withReturn: true, 
            gestureEnabled: false, 
            headerTransparent: false,
            withRightIcon: true,
            headerShown: false
        }}  
        component={SubCatFilter}  
      />
      <Tab.Screen 
        name="EtatScreen" 
        options={{ 
            title: "Etat",
            withTitle: true,
            withReturn: true, 
            gestureEnabled: false, 
            headerTransparent: false,
            headerShown: true,
            withRightIcon: true
        }}       
        component={EtatScreen}  
      />
      <Tab.Screen 
        name="SubCatAuthScreen" 
        options={{ 
            title: "Preuves d'authenticités",
            withTitle: true,
            withReturn: true, 
            gestureEnabled: false, 
            headerTransparent: false,
            headerShown: true,
            withRightIcon: true
        }}       
        component={SubCatAuthScreen}  
      />
    </VendreStack.Navigator>
    )
}

const NotificationStack = createStackNavigator();
function NotificationStackScreen({route}) {
  return (
    <NotificationStack.Navigator
      initialRouteName="ChatHome"
      mode="card"
      headerMode="screen"
      screenOptions={ScreenOptions}
    >
    <Tab.Screen 
        name="Notifications" 
        options={{ 
          title: "Actualites",
          withTitle: true,
          gestureEnabled: false,
          withRightIcon: true,
          rightIcon:"",
          headerShown: false
        }} 
        component={AdviceScreen} />
    <Tab.Screen 
        name="AdviceDescription" 
        options={{ 
          withReturn: true, 
          title: "", 
          withCart: true, 
          gestureEnabled: false, 
          headerShown: true, 
          withAsideIcon: true,
          OnCenterPress: () => {},
          OnInfoPress: () => {},
        }} 
        component={AdviceDescriptionScreen} />
        <Tab.Screen 
        name="ChatHome" 
        options={({ route }) => ({ 
          withReturn: false, 
          lazy: false,
          title: "Message",
          withTitle: true,
          gestureEnabled: false, 
          headerTransparent: true,
          headerShown: false
        })} 
        component={ChatScreen} 
        />
        <Tab.Screen 
        name="ChatRoom" 
        options={({ route }) => ({ 
          title: "Message",
          withReturn: true, 
          withRightIcon: false,
          withTitle: true,
          gestureEnabled: false,
          headerTransparent: true,
          headerShown: true
        })} 
        component={ChatRoomScreen} 
        />
    </NotificationStack.Navigator>
    )
}

const EmptyStack = createStackNavigator();
function EmptyStackScreen({route}) {
  return (
    <EmptyStack.Navigator
      initialRouteName="Home"
      mode="card"
      headerMode="screen"
      screenOptions={ScreenOptions}
    >
      <Tab.Screen 
        name="Home" 
        options={{ 
          gestureEnabled: false,
          headerShown: true,
          title: "Bonjour",
          rightIcon: 'search',
          withMenu: true,
          withRightIcon: true,
          withTitle: true
        }} 
        component={EmptyScreen} />
    </EmptyStack.Navigator>
  );
}

const FormStack = createStackNavigator();
function FormStackScreen({route}) {
  return (
    <FormStack.Navigator
      initialRouteName="Form"
      mode="card"
      headerMode="screen"
      screenOptions={ScreenOptions}
    >
      <Tab.Screen 
        name="Form" 
        options={{ 
          gestureEnabled: false,
          headerShown: true,
          title: Localization.word("mes_donnes"),
          rightIcon: 'edit',
          withReturn: true,
          withRightIcon: true,
          withTitle: true,
        }} 
        component={FormGeneratorTestScreen} />
    </FormStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default (props) => {

  const setScreenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let newColor = color;
      if (authState.isAuthAnonym) {
        newColor = "#A1EADA";
      }
      switch (route.name) {
        case 'Accueil':
          return  <Entypo name="home" size={24} color={color} /> 
        case 'Chercher':
          return <Octicons name='search' size={size} color={color} />
        case 'Vendre':
          return <AntDesign name="pluscircleo" size={size} color={color} />
        case 'Message':
          //return <Ionicons name='ios-notifications-outline' size={size} color={color} />
          return <AntDesign name="mail" size={24} color={color} /> 
        case 'Profil':
          return <FontAwesome name="user-circle-o" size={24} color={color} />
      }
    },
    style: {
      backgroundColor: 'pink'
    }
  })

    const tabBarListeners = ({ navigation}) => ({
        tabPress: () => navigation.navigate('Vendre', {
            screen: 'NewVendre', params: {
                id: undefined
            }
        }),
    });

    const tabBarOptions = {
        activeTintColor: StylesVariables.blackColor,
        inactiveTintColor: StylesVariables.grayColor,
        activeBackgroundColor: StylesVariables.whiteColor,
        inactiveBackgroundColor: StylesVariables.whiteColor,
        labelStyle: {
            fontFamily: StylesVariables.textFont,
            fontSize: StylesVariables.textFontSize - 4.2
        }
    }

    return (
        <Tab.Navigator
            screenOptions={setScreenOptions}
            tabBarOptions={tabBarOptions}
        >
            <Tab.Screen 
              name="Accueil" 
              options={{ withReturn: false, headerLeft: null, gestureEnabled: false }} 
              initialParams={{
                "OnShowMenu": props.OnShowMenu,
                "OnShowSearch": props.OnShowSearch,
                "OnShowArticle": props.OnShowArticle,
                "OnShowArticleVideo": props.OnShowArticleVideo,
                "OnShowArticleAudio": props.OnShowArticleAudio,
              }}
              component={HomeStackScreen}
              />
            <Tab.Screen 
              name="Chercher" 
              options={{ withReturn: false, headerLeft: null, gestureEnabled: false }} 
              component={SearchStackScreen}
            />
            <Tab.Screen 
              name="Vendre"
                options={{ 
                withReturn: false, 
                headerLeft: null, 
                gestureEnabled: false,
                unmountOnBlur: true
              }}
              listeners={tabBarListeners}
              initialRouteName='NewVendre'
              initialParams={{
                "OnShowArticle": props.OnShowArticle,
                "OnShowArticleVideo": props.OnShowArticleVideo,
                "OnShowArticleAudio": props.OnShowArticleAudio,
              }}
              component={VendreStackScreen} 
            />
            <Tab.Screen 
              name="Message" 
              options={{ withReturn: false, headerLeft: null, gestureEnabled: false }} 
              component={NotificationStackScreen} 
            />
            <Tab.Screen 
              name="Profil" 
              options={{ withReturn: false, headerLeft: null, gestureEnabled: false }} 
              initialParams={{
                "showInfo": props.showInfo 
              }}
              component={AccountStackScreen}
            />
    {
        /*
                Filters
        */ 
    } 
            
        </Tab.Navigator>
    )
}
