import React from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import RecipeScreen from "../screens/RecipeScreen";
import ProfileScreen from "../tabs/PersonalTab";

const RecipeNavigation = createStackNavigator(
  {
    Recipe: {
      screen: RecipeScreen,
    },
    Profile:{
      screen: ProfileScreen
    }
  },
  {
    navigationOptions: {
      header: null,
    },
  }
  // {
  //   header: null,
  //   headerMode: 'none'
  // }
);

export default RecipeNavigation;
