import React from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import RecipeScreen from "../screens/RecipeScreen";
import NotificationTab from "../tabs/NotificationTab";

const NotificationRecipeNavigation = createStackNavigator(
  {
    Notification: {
      screen: NotificationTab,
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

export default NotificationRecipeNavigation;
