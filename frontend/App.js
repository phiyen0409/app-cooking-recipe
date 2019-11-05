import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from './src/components/ListItem';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RecipeScreen from './src/screens/RecipeScreen';
import  IngredientItem from './src/components/IngredientItem';
import AppNavigator from './AppNavigator';
import {createAppContainer} from 'react-navigation';
import  IntroItem from './src/components/IntroItem';

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {
  render()
    {
  
  // return <AppContainer/>;
  return (
    <View style={styles.container}>
      {/* <LoginScreen/> */}
      <HomeScreen/>
      {/* <RecipeScreen/> */}
      {/* <IngredientItem/> */}
      {/* <IntroItem/> */}
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffebee',
    alignItems: 'stretch',
    justifyContent: 'center',
    // alignItems: 'center',
    // paddingLeft: 3,
    // paddingRight: 3,
    paddingTop: 20,
    // paddingBottom: 15,
  },
});
