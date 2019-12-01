import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import TrendingTab from "../tabs/TrendingTab";
import HomeTab from "../tabs/HomeTab";
import NotificationTab from "../tabs/NotificationTab";
import PersonalTab from "../tabs/PersonalTab";
import AddRecipeTab from "../tabs/AddRecipeTab"
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { AddButton } from "../components/AddButton";
import HomeRecipeNavigation from "./HomeRecipeNavigation";
import PersonalRecipeNavigation from "./PersonalRecipeNavigation";

const TrendingTabStack = createStackNavigator({ TrendingTab });
const HomeTabStack = createStackNavigator({ HomeRecipeNavigation });
const NotificationTabStack = createStackNavigator({ NotificationTab });
const PersonalTabStack = createStackNavigator({ PersonalRecipeNavigation });
const AddRecipeTabStack=createStackNavigator({AddRecipeTab});

const HomeScreenTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeTabStack,
      navigationOptions: {
        header: null,
        tabBarLabel: "Trang chủ",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={20} color={tintColor} />
        )
      }
    },
    Trending: {
      header: null,
      screen: TrendingTabStack,
      navigationOptions: {
        tabBarLabel: "Thịnh hành",
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="areachart" size={20} color={tintColor} />
        )
      }
    },
    Add: {
      header: null,
      screen: AddRecipeTabStack,
      navigationOptions: () => ({
        tabBarIcon: <AddButton />, // Plus button component
        tabBarLabel: ({ focused, tintColor }) => {
          return null;
        }
      })
    },
    Notification: {
      header: null,
      screen: NotificationTabStack,
      navigationOptions: {
        tabBarLabel: "Thông báo",
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="notifications" size={20} color={tintColor} />
        )
      }
    },
    Personal: {
      header: null,
      screen: PersonalTabStack,
      navigationOptions: {
        tabBarLabel: "Tôi",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={20} color={tintColor} />
        )
      }
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: "yellow",
      activeTabStyle: {
        fontWeight: "bold"
      },
      inactiveTintColor: "white",
      style: {
        backgroundColor: "#830707",
        color: "red"
      },
      showIcon: true
    }
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
