import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import HomeScreenTabNavigator from '../../HomeScreenTabNavigator';

const TabContainer = createAppContainer(HomeScreenTabNavigator);

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
  }
  render() {
    return <TabContainer/>;
  }
}

export default HomeScreen;
