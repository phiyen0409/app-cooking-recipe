import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from "react-native";

export default class SavedTab extends React.Component {
  _getUserLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('@auth');
      if (value !== null) {
        // We have data!!
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
    return null;
  };
    static navigationOptions = {
        header: null
      };
  render() {  
  return (
    <View>
     <Text>SavedTab</Text>
    </View>
  );
}
}