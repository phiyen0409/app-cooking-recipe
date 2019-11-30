import React, { Component } from "react";
import {
  //     Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView
  //     TouchableOpacity,
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  Rows
} from "react-native-table-component";
import theme from "../../constant/theme";
import Im from "../../assets/Image/suonxaochuangot.jpg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Step from "./Step";

export default class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepList: this.props.stepList
    };
  }
  render() {
    const { stepList } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Quy trình thực hiện</Text>
        </View>
        <View style={styles.content}>
          <FlatList
            style={styles.dataWrapper}
            data={stepList}
            renderItem={({ item }) => <Step step={item} />}
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
    // margin: 5,
    padding: 15,
    borderRadius: 4,
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
    marginBottom: 10,
    fontWeight: "700",
    marginLeft: 15,
    marginRight: 15,
    alignContent: "center",
    color: "#7f0000"
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
  dataWrapper: { marginTop: -1 }
});
