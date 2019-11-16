import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import HomeScreenTabNavigator from "../navigations/HomeScreenTabNavigator";

const TabContainer = createAppContainer(HomeScreenTabNavigator);

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
  }

  render() {
    const changeScreen = this.props.navigation;
    const Layout = HomeScreenTabNavigator(changeScreen);
    const TabContainer = createAppContainer(Layout);
    return <TabContainer changeScreen={changeScreen} />;
  }
}

export default HomeScreen;
