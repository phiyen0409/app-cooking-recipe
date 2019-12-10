import React from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createSwitchNavigator
  } from "react-navigation";

import LoginNavigator from '../navigations/LoginNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from "../screens/SignupScreen";
import HomeScreenTabNavigator from "./HomeScreenTabNavigator";

const AppNavigator = (signedIn = false) => {
    return createSwitchNavigator(
      {
        Login:{
            screen: LoginScreen
        },
        Signup:{
            screen: SignupScreen
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