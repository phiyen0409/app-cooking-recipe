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
import IngredientItem from "./IngredientItem";
// import flatlistIngredient from '../Data/flatlistIngredient';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default class IngredientListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientlist: this.props.ingredients
    };
  }

  render() {
    const { ingredientlist } = this.state;

    return (
      <View style={styles.container}>
        {/* <ScrollView> */}
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Thành phần nguyên liệu</Text>
        </View>
        <View style={styles.content}>
          <FlatList
            style={styles.dataWrapper}
            data={ingredientlist}
            renderItem={({ item, index }) => (
              <IngredientItem ingredient={item} index={index} />
            )}
            keyExtractor={item => `${item._id}`}
          />
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
    padding: 15,
    borderRadius: 4
    // margin: 5,
    // paddingLeft: 40,
    // paddingRight: 40,
    // paddingBottom: 70,
  },

  viewTitle: {
    flex: 1,
    flexDirection: "column",
    maxHeight: 50,
    width: "100%",
    marginTop: 0,
    alignSelf: "center"
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
    flex: 4,
    flexDirection: "column",
    // alignItems: 'stretch',
    marginBottom: 10
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
