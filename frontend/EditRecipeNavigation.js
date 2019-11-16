import React from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import PersonalTab from "./src/tabs/PersonalTab";
import AddRecipeTab from "./src/screens/AddRecipeTab";

const EditRecipeNavigation = createStackNavigator(
  {
    Home: {
      screen: PersonalTab,
      navigationOptions:{
        header: null,
      }

    },
    EditRecipe: {
      screen: AddRecipeTab
    }
  },
  {
    navigationOptions: {
      header: null,
    },
  }
);

export default EditRecipeNavigation;
