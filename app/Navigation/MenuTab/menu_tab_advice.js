import React from 'react';

import AppStore from './../../Flux/AppStore';
import myAppState from './../../AppState/app_state';

import { Ionicons } from '@expo/vector-icons';

import StylesVariables from './../../Styles/app.style';
import { 
  View,
  Text,
  Image
} from 'react-native';

export default class MenuTabIcon extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            badgeCount: 0
        };
    }
    
    componentDidMount = () => {
        AppStore.on("notificationsUpdated", this.OnNotificationsUpdated);
    }

    componentWillUnmount = () => {
        AppStore.removeListener("notificationsUpdated", this.OnNotificationsUpdated);
    }

    OnNotificationsUpdated = async () => {
        this.setState({
            "badgeCount": myAppState.getNotifications()
        });
    }
    
    render() {
      const { color, icon, size } = this.props;
      return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <Ionicons name='ios-notifications-outline' size={size} color={color} />
            {this.state.badgeCount > 0 && (
            <View
                style={{
                    position: 'absolute',
                    left: 15 * StylesVariables.responsiveMulti,
                    top: 2,
                    backgroundColor: 'crimson',
                    borderRadius: 50,
                    width: 12 * StylesVariables.responsiveMulti,
                    height: 12 * StylesVariables.responsiveMulti,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>
                    {'!'}
                </Text>
            </View>
            )}
        </View>
      );
    }
  }