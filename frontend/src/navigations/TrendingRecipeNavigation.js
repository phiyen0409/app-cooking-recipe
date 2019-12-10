import React from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import TrendingTab from "../tabs/TrendingTab";
import RecipeScreen from "../screens/RecipeScreen";
import ProfileScreen from "../tabs/PersonalTab";

const TrendingRecipeNavigation = createStackNavigator(
  {
    Trending: {
      screen: TrendingTab,
      navigationOptions:{
        header: null,
      }
    },
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

export default TrendingRecipeNavigation;
