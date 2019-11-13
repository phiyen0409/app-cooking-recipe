import React from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createSwitchNavigator
  } from "react-navigation";

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreenTabNavigator from "./HomeScreenTabNavigator";

const AppNavigator = (signedIn = false) => {
    return createSwitchNavigator(
      {
        Login:{
            screen: LoginScreen
        },
        Home:{
            screen: HomeScreenTabNavigator
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