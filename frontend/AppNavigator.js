import React from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';

const AppNavigator = createStackNavigator({
    Login:{
        screen: LoginScreen
    },
    Home:{
        screen: HomeScreen
    },
})

export default AppNavigator;