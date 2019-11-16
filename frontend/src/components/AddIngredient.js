import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
// import  {Table, TableWrapper, Row, Cell, Rows} from 'react-native-table-component';
import { Block, Icon } from "galio-framework";
import theme from "../../constant/theme";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

export default class AddIngredient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      name: props.name,
      weight: props.weight
    };
  }
  removeItem = () => {
    this.props.removeItem(this.state.id);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewInput}>
          <View style={styles.viewLeft}>
            <TextInput
              style={[styles.input, { textAlign: "left" }]}
              placeholder="Tên"
              value={this.state.name}
              onChangeText={text => {
                this.setState({ name: text });
                this.props.updateItem(this.state.id, {
                  name: text,
                  weight: this.state.weight
                });
              }}
            />
          </View>
          <View style={styles.viewRight}>
            <TextInput
              style={[styles.input, { textAlign: "right" }]}
              placeholder="Khối lượng"
              value={this.state.weight}
              onChangeText={text => {
                this.setState({ weight: text });
                this.props.updateItem(this.state.id, {
                  name: this.state.name,
                  weight: text
                });
              }}
            />
          </View>
        </View>
        <View style={styles.btnDel}>
          <TouchableOpacity onPress={this.removeItem}>
            <AntDesign name="closecircle" size={16} color={"#000"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    //justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 3
  },
  viewInput: {
    flex: 12,
    height: "100%",
    flexDirection: "row",
    backgroundColor: "#ffcdd2",
    borderRadius: 5,
    padding: 3
  },
  btnDel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  viewLeft: {
    flex: 3,
    height: "100%",
    padding: 3
  },
  viewRight: {
    flex: 1,
    height: "100%",
    padding: 3
  },
  input: {
    height: "100%",
    width: "100%",
    borderRadius: 7,
    backgroundColor: "#FFF",
    padding: 3
  }
});
