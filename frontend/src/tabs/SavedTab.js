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
import NotificationItem from "../components/NotificationItem";

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
    <View style={styles.container}>
        <ScrollView>
          {/* <View style = {styles.postContainer}> */}
            <NotificationItem/>
            <NotificationItem/>
            <NotificationItem/>
            <NotificationItem/>
          {/* </View> */}
        </ScrollView>
      
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 35,
    paddingBottom: 20,

    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#ffcdd2",
    paddingLeft: 10,
    paddingRight: 10

    // backgroundColor: '#fff',
  },
  postContainer: {
    padding: 5
  }
});