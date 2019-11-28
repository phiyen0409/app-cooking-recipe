import React, {Component} from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
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

export default class NotesScreen extends Component {
//   constructor(props) {
//     super(props);
    
//   }

  render() {
    // const { ingredientlist } = this.state;

    return (
        <View style = {styles.container}>
          <ScrollView>
            <NoteList/>
            <NoteList/>
            <NoteList/>
            <NoteList/>
          </ScrollView>
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