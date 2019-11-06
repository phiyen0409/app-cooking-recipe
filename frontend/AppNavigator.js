import React from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './src/screens/HomeScreen';
import RecipeScreen from './src/screens/RecipeScreen';

const AppNavigator = createStackNavigator({
    RecipeScreen:{
        screen: RecipeScreen
    },
    Home:{
        screen: HomeScreen
    },
})

export default AppNavigator;