import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import TrendingTab from './src/tabs/TrendingTab';
import HomeTab from './src/tabs/HomeTab';
import SavedTab from './src/tabs/SavedTab';
import PersonalTab from './src/tabs/PersonalTab';
import {FontAwesome, AntDesign } from '@expo/vector-icons';

const TrendingTabStack = createStackNavigator({TrendingTab});
const HomeTabStack = createStackNavigator({HomeTab});
const SavedTabStack = createStackNavigator({SavedTab});
const PersonalTabStack = createStackNavigator({PersonalTab});

const HomeScreenTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeTabStack,
      navigationOptions: {
        tabBarLabel: 'Trang chủ',
        tabBarIcon: ({tintColor}) => (
          <FontAwesome name="home" size={20} color={tintColor} />
        ),
      },
    },
    Trending: {
      screen: TrendingTabStack,
      navigationOptions: {
        tabBarLabel: 'Thịnh hành',
        tabBarIcon: ({tintColor}) => (
          <AntDesign name="areachart" size={20} color={tintColor} />
        ),
      },
    },
    Saved: {
      screen: SavedTabStack,
      navigationOptions: {
        tabBarLabel: 'Đã lưu',
        tabBarIcon: ({tintColor}) => (
          <FontAwesome name="bookmark" size={20} color={tintColor} />
        ),
      },
    },
    Personal: {
      screen: PersonalTabStack,
      navigationOptions: {
        tabBarLabel: 'Tôi',
        tabBarIcon: ({tintColor}) => (
          <FontAwesome name="user" size={20} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'yellow',
      activeTabStyle: {
        fontWeight: 'bold',
      },
      inactiveTintColor: 'white',
      style: {
        backgroundColor: '#830707',
        color: 'red',
      },
      showIcon: true,
    },
  },
//   {
//     defaultNavigationOptions: ({navigation}) => ({
//       tabBarIcon: ({focused, horizontal, tintColor}) => {
//         const {routeName} = navigation.state;
//         let IconComponent = Ionicons;
//         let iconName;
//         if (routeName === 'HomeTabStack') {
//           iconName = 'ios-home';
//           // Sometimes we want to add badges to some icons.
//           // You can check the implementation below.
//           // IconComponent = HomeIconWithBadge;
//         } else if (routeName === 'TrendingTabStack') {
//           iconName = 'ios-search';
//         } else if (routeName === 'AddTabStack') {
//           iconName = 'ios-add-circle';
//         } else if (routeName === 'SavedTabStack') {
//           // iconName = 'ios-notification';
//         } else if (routeName === 'PersonalTabStack') {
//           iconName = 'ios-person';
//         }

//         // You can return any component that you like here!
//         return <IconComponent name={iconName} size={25} color={tintColor} />;
//       },
//     }),
//   },
);

export default HomeScreenTabNavigator;
