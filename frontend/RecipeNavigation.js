import React from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import HomeTab from "./src/tabs/HomeTab";
import RecipeScreen from "./src/screens/RecipeScreen";

const RecipeNavigation = createStackNavigator(
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

export default RecipeNavigation;
