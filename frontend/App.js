import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from './src/components/ListItem';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RecipeScreen from './src/screens/RecipeScreen';
import  IngredientItem from './src/components/IngredientListItem';
import AppNavigator from './AppNavigator';
import {createAppContainer} from 'react-navigation';
import  IntroItem from './src/components/IntroItem';
import axios from "axios";

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {
  constructor(props){
    super(props);
    axios.defaults.baseURL = "http://192.168.137.1:80";
  }
  render()
    {
  return (
    <View style={styles.container}>
      {/* <LoginScreen/> */}
      {/* <HomeScreen/> */}
      <RecipeScreen/>
      {/* <IngredientItem/> */}
      {/* <IntroItem/> */}
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7f0000',
    alignItems: 'stretch',
    justifyContent: 'center',
    // alignItems: 'center',
    // paddingLeft: 3,
    // paddingRight: 3,
    paddingTop: 20,
    // paddingBottom: 15,
  },
});
