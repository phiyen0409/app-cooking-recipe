import React from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import PersonalTab from "../tabs/PersonalTab";
import RecipeScreen from "../screens/RecipeScreen";
import AddRecipeTab from "../tabs/AddRecipeTab";
import NoteScreen from "../screens/NotesScreen";
import SavedScreen from "../screens/SavedScreen";

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
    },
    EditRecipe: {
      screen: AddRecipeTab
    },
    Notes:{
      screen: NoteScreen
    },
    Saved:{
      screen:SavedScreen
    }
  },
  
  {
    navigationOptions: {
      header: null,
    },
  }
);

export default PersonalRecipeNavigation;
