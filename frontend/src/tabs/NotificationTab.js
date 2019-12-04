import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  FlatList
} from "react-native";
import NotificationItem from "../components/NotificationItem";

import axios from "axios";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export default class NotificationTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      notifications: []
    };
  }
  _getUserLogin = async () => {
    try {
      const value = await AsyncStorage.getItem("@auth");
      if (value !== null) {
        // We have data!!
        let user = JSON.parse(value);
        this.setState({ user: user });
        console.log(user);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  static navigationOptions = {
    header: null
  };
  componentDidMount = async () => {
    await this._getUserLogin();
    await this.registerForPushNotificationsAsync();
    this.getListNotification();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  };
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return axios({
      method: "put",
      url: "/user/push-token/" + this.state.user.idUser,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        token: token
      }
    });
  };
  _handleNotification = notification => {
    if(notification.remote)
    {
      if (notification.origin == "received") {
        setTimeout(() => {
          this.getListNotification();
        }, 0);
      }
    }
  };
  getListNotification = () =>{
    axios.get("/user/notifications/" + this.state.user.idUser)
    .then(reponse => {
      this.setState({notifications : reponse.data.notifications});
      console.log(reponse.data.notifications);
    }).catch(error =>{
      console.log(error);
    });
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          data={this.state.notifications}
          renderItem={({ item }) => (
            <NotificationItem
              notification={item}
              switchRecipeScreen={() => navigation.navigate("Recipe",{postId: item.data.postId, userId:this.state.user.idUser})}
            />
          )}
          keyExtractor={item => this.state.notifications.indexOf(item).toString()}
        />
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
