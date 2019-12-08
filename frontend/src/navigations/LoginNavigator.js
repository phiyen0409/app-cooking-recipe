import React from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createSwitchNavigator
  } from "react-navigation";

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

const LoginNavigator = () => {
    return createSwitchNavigator(
      {
        Login:{
            screen: LoginScreen
        },
        Signup:{
            screen: SignupScreen
        },
      },
      {
        initialRouteName: "Login"
      }
    );
  };


export default LoginNavigator;