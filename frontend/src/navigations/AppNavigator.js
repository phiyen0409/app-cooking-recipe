import React from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createSwitchNavigator
  } from "react-navigation";

import LoginNavigator from '../navigations/LoginNavigator';
import LoginScreen from '../screens/LoginScreen';
import HomeScreenTabNavigator from "./HomeScreenTabNavigator";

const AppNavigator = (signedIn = false) => {
    return createSwitchNavigator(
      {
        Login:{
            screen: LoginNavigator
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


export default AppNavigator;