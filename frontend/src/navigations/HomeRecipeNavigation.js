import React from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import HomeTab from "../tabs/HomeTab";
import RecipeScreen from "../screens/RecipeScreen";
import AddRecipeTab from "../tabs/AddRecipeTab";
import ProfileScreen from "../tabs/PersonalTab";

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
    },
    EditRecipe: {
      screen: AddRecipeTab
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

export default HomeRecipeNavigation;
