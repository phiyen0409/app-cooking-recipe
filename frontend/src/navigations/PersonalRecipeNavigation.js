import React from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import PersonalTab from "../tabs/PersonalTab";
import RecipeScreen from "../screens/RecipeScreen";

const PersonalRecipeNavigation = createStackNavigator(
  {
    Personal: {
      screen: PersonalTab,
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
);

export default PersonalRecipeNavigation;
