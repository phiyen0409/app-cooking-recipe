import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ListItem from "./src/components/ListItem";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RecipeScreen from "./src/screens/RecipeScreen";
import IngredientItem from "./src/components/IngredientListItem";
import AppNavigator from "./AppNavigator";
import { createAppContainer } from "react-navigation";
import IntroItem from "./src/components/IntroItem";
import axios from "axios";
import AddIntro from "./src/components/AddIntro";
import AddIngredient from "./src/components/AddIngredient";
import AddRecipeScreen from "./src/tabs/AddRecipeTab";
import PersonalTab from "./src/tabs/PersonalTab";

//const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    axios.defaults.baseURL = "https://cookingapp1.herokuapp.com";
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }
 isSignedIn = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('@auth')
        .then(res => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };
  componentDidMount() {
    this.isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }
  render() {
    const { checkedSignIn, signedIn } = this.state;
    if (!checkedSignIn) {
      return null;
    }
    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    const Layout = AppNavigator(signedIn);
    return <Layout />
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
