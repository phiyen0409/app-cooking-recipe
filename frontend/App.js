import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import ListItem from './src/components/ListItem';
import HomeScreen from './src/screens/HomeScreen'

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffebee',
    // alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: 8,
    paddingRight: 8,
  },
});
