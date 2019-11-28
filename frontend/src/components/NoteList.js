import React, { Component } from "react";
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
import Note from "./Note";

export default class NoteList extends Component {
//   constructor(props) {
//     super(props);
    
//   }

  render() {
    // const { ingredientlist } = this.state;

    return (
      <View style={styles.container}>
        {/* <ScrollView> */}
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Tên món</Text>
        </View>
        <View style={styles.content}>
          {/* <FlatList
            
          /> */}
          <Note/>
          <Note/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    // height: theme.SIZES.BASE *15,
    padding: 15,
    borderRadius: 25,
    borderColor:'#ffcdd2',
    borderWidth:1,
    marginBottom:15
    // height: '100%',
    // margin: 5,
    // paddingLeft: 40,
    // paddingRight: 40,
    // paddingBottom: 70,
  },

  // viewTitle: {
  //   flex: 1,
  //   flexDirection: "row",
  //   // maxHeight: 50,
  //   width: "90%",
  //   borderWidth: 1,
  //   borderColor: 'green',
  //   // height: '30%',
  //   marginTop: 0,
  //   // alignSelf: "center"
  //   // backgroundColor: '#cdb7b5',
  // },

  // title: {
  //   textAlign: "center",
  //   textTransform: "uppercase",
  //   marginBottom: 5,
  //   fontWeight: "700",
  //   marginLeft: 15,
  //   marginRight: 15,
  //   alignContent: "center",
  //   color: "#7f0000",
  //   marginBottom: 30,
  //   height: '100%'
  // },

  viewTitle: {
    flex: 1,
    flexDirection: "column",
    maxHeight: 50,
    width: "100%",
    marginTop: 0,
    alignSelf: "center",
    //backgroundColor: "#FFBF00"
    // backgroundColor: '#cdb7b5',
  },

  title: {
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 5,
    fontWeight: "700",
    marginLeft: 15,
    marginRight: 15,
    alignContent: "center",
    color: "#7f0000",
    marginBottom: 30
  },

  content: {
    alignContent: "center",
    width: wp("90%"),
    //backgroundColor:"#F7D358",
    // flex: 4,
    // height: 4,
    flexDirection: "column",
    // alignItems: 'stretch',
    marginBottom: 10,
    // paddingLeft: 5,
    // paddingRight: 5,
  },

  // wrapper: {
  //     flexDirection: 'column',
  //     marginTop: -1,
  //     marginLeft: 5,
  //     marginRight: 5,
  //     paddingBottom: 5,
  // },

  // head: {
  //     height: theme.SIZES.BASE * 5,
  //     alignContent: 'center',
  //     backgroundColor: '#830707',
  //     borderBottomWidth: 1,
  //     borderBottomColor: '#e57373',
  // },

  dataWrapper: { marginTop: -1 }
  // row: {
  //     backgroundColor: 'white',
  //     borderBottomWidth: 1,
  //     borderBottomColor: '#e57373',
  //     borderLeftWidth: 1,
  //     borderLeftColor: '#e57373',
  //     marginTop: -1,
  // },
});
