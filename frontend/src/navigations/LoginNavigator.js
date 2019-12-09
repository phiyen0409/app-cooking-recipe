import React from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import LoginWithAppAccount from "../screens/LoginWithAppAccount";

const LoginNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Signup: {
      screen: SignupScreen
    }
  },
  {
    navigationOptions: {
      header: null,
    },
  }
);

export default LoginNavigator;
