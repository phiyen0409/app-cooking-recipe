import React from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import RecipeScreen from "../screens/RecipeScreen";
import AddRecipeTab from "../tabs/AddRecipeTab";
import SavedScreen from "../screens/SavedScreen";

const SavedRecipeNavigation = createStackNavigator(
  {
    Saved: {
      screen: SavedScreen,
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
  },
  
  {
    navigationOptions: {
      header: null,
    },
  }
);

export default SavedRecipeNavigation;
