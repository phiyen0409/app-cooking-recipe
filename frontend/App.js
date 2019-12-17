import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import ListItem from "./src/components/ListItem";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RecipeScreen from "./src/screens/RecipeScreen";
import IngredientItem from "./src/components/IngredientListItem";
import AppNavigator from "./src/navigations/AppNavigator";
import { createAppContainer } from "react-navigation";
import IntroItem from "./src/components/IntroItem";
import axios from "axios";
import AddIntro from "./src/components/AddIntro";
import AddIngredient from "./src/components/AddIngredient";
import AddRecipeScreen from "./src/tabs/AddRecipeTab";
import PersonalTab from "./src/tabs/PersonalTab";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import { NavigationActions } from "react-navigation";

import NavigationService from "./src/navigations/NavigationService";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    axios.defaults.baseURL =
      "http://cookingapp.eastasia.cloudapp.azure.com:3000";
    this.state = {
      signedIn: false,
      checkedSignIn: false,
      user : {}
    };
  }
  isSignedIn = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem("@auth")
        .then(res => {
          if (res !== null) {
            let user = JSON.parse(res);
            this.setState({ user: user });
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };
  componentDidMount = async () => {
    this.isSignedIn().then(res =>
      this.setState({ signedIn: res, checkedSignIn: true })
    );

    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  };
  _handleNotification = notification => {
    console.log("noti");
    console.log(notification);
    if(notification.remote)
    {
      if (notification.origin == "selected") {
        setTimeout(() => {
          NavigationService.navigate(
            "Notification",
            {},
            NavigationActions.navigate({
              routeName: "Recipe",
              params: { postId: notification.data.postId , userId:this.state.user.idUser}
            })
          );
        }, 0);
      }
    }
  };
  render() {
    const { checkedSignIn, signedIn } = this.state;
    if (!checkedSignIn) {
      return null;
    }
    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    const Layout = AppNavigator(signedIn);
    const AppContainer = createAppContainer(Layout);
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );

    // return (
    //   // <View style={styles.container}>
    //   //   {/* <LoginScreen/> */}
    //   //   <HomeScreen/>
    //   //   {/* <RecipeScreen/> */}
    //   //   {/* <IngredientItem/> */}
    //   //   {/* <IntroItem/> */}
    //   //   {/* <AddIntro/> */}
    //   //   {/* <AddIngredient/> */}
    //   //   {/* <AddRecipeScreen/> */}
    //   // </View>
    //    <AppContainer/>

    // )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7f0000",
    alignItems: "stretch",
    justifyContent: "center",
    // alignItems: 'center',
    // paddingLeft: 3,
    // paddingRight: 3,
    paddingTop: 20
    // paddingBottom: 15,
  }
});
