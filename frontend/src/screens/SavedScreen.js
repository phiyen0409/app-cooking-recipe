import React, {Component} from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, ActivityIndicator } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  Rows
} from "react-native-table-component";
import theme from "../../constant/theme";
// import flatlistIngredient from '../Data/flatlistIngredient';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import ListItem from "../components/ListItem";
import axios from "axios";

export default class SavedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam("userId"),
      posts: [],
      refreshing:false,
      loading:true,
    };
  }
  componentDidMount() {
    (async () => {
      await this.getDataAsync();
    })();
  }
  getDataAsync = async () => {
    axios({
      method: "get",
      url: "/user/savedpost/"+this.state.user,
      data: {
      }
    })
      .then(result => {
        console.log("Result: "+result.data);
        this.setState({
          posts: result.data  ? result.data : [],
          refreshing:false,
          loading:false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  handleRefresh=()=>{
    this.setState({
      refreshing:true
    },
    ()=>{
      this.getDataAsync();
    }
    )
  };

  render() {
    return (
        <View style = {styles.container}>
          {
          this.state.loading?
          <ActivityIndicator size="large" color="white" />
          :
          <FlatList
            onScroll={this.handleScroll} scrollEventThrottle={16}
            data={this.state.posts}
            renderItem={({ item }) => (
              <ListItem
                userId={this.state.user}
                post={item}
                handleRefresh={this.handleRefresh}
              />
            )}
            keyExtractor={item => item._id}
            onRefresh={()=>this.handleRefresh()}
            refreshing={this.state.refreshing}
          />
            }
        </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#ffcdd2",
      // alignItems: "center",
      // backgroundColor: "#fff",
      // height: theme.SIZES.BASE *15,
      padding: 5,
      paddingTop: 15,
      height: '100%',
      // paddingBottom: 20,

      // alignItems: "stretch",
      // justifyContent: "center",
      // backgroundColor: "#000",
      //margin: 5,
      // paddingLeft: 40,
      // paddingRight: 40,
      // paddingBottom: 70,
    },
    postContainer: {
      marginTop: 5,
      paddingRight: 5,
      height: '100%',
    }
})