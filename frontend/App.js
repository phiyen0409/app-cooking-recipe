import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import ListItem from './src/components/ListItem';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RecipeScreen from './src/screens/RecipeScreen';


export default function App() {
  return (
    <View style={styles.container}>
      {/* <LoginScreen/> */}
      {/* <HomeScreen/> */}
      <RecipeScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffebee',
    // alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    // paddingTop: 20,
  },
});
