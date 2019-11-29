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
import NoteList from "../components/NoteList";
import axios from "axios";

export default class NotesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam("userId"),
      notes: [],
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
      url: "/user/getnote/"+this.state.user,
      data: {
      }
    })
      .then(result => {
        console.log(result.data);
        this.setState({
          notes: result.data  ? result.data : [],
          refreshing:false,
          loading:false
        });
        //console.log(result);
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
    // const { ingredientlist } = this.state;

    return (
        <View style = {styles.container}>
          {
          this.state.loading?
          <ActivityIndicator size="large" color="white" />
          :
          <FlatList
            onScroll={this.handleScroll} scrollEventThrottle={16}
            data={this.state.notes}
            renderItem={({ item }) => (
              <NoteList
                userId={this.state.user}
                note={item}
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