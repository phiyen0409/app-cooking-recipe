import React from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {
    SwitchNavigator
  } from "react-navigation";

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';

const AppNavigator = (signedIn = false) => {
    return SwitchNavigator(
      {
        Login:{
            screen: LoginScreen
        },
        Home:{
            screen: HomeScreen
        },
      },
      {
        initialRouteName: signedIn ? "Home" : "Login"
      }
    );
  };

// const AppNavigator = createStackNavigator({
//     Login:{
//         screen: LoginScreen
//     },
//     Home:{
//         screen: HomeScreen
//     },
// })

export default AppNavigator;