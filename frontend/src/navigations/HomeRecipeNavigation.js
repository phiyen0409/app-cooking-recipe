import React from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import HomeTab from "../tabs/HomeTab";
import RecipeScreen from "../screens/RecipeScreen";

const HomeRecipeNavigation = createStackNavigator(
  {
    Home: {
      screen: HomeTab,
      navigationOptions:{
        header: null,
      }

    },
    Recipe: {
      screen: RecipeScreen
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

export default HomeRecipeNavigation;
