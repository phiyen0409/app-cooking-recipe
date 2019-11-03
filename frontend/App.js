import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from './src/components/ListItem';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RecipeScreen from './src/screens/RecipeScreen';
// import  IngredientItem from './src/components/IngredientItem';
import AppNavigator from './AppNavigator';
import {createAppContainer} from 'react-navigation';

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
    paddingLeft: 8,
    paddingRight: 8,
    // paddingTop: 20,
  },
});
