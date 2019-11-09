import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Block } from "galio-framework";
import theme from "../../constant/theme";
import LibraryImage from "../../assets/Image/library.png";
import CameraImage from "../../assets/Image/camera.png";
import Im from "../../assets/Image/suonxaochuangot.jpg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default class AddStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      step: props.step,
      title: props.title,
      image: props.image,
      description: props.description
    };
  }
  removeItem = () => {
    this.props.removeItem(this.state.id);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btnDel}>
          <TouchableOpacity onPress={this.removeItem}>
            <AntDesign name="closecircle" size={16} color={"#000"} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewHeader}>
          <Text style={styles.textStep}>Bước {this.state.step}:</Text>
          <TextInput
            style={styles.textInputTitle}
            value={this.state.title}
            onChangeText={text => {
              this.setState({ title: text });
            }}
            placeholder="tiêu đề"
          />
        </View>
        <View style={styles.viewDescription}>
          <TextInput
            style={styles.textInputDescription}
            value={this.state.description}
            onChangeText={text => {
              this.setState({ description: text });
            }}
            placeholder="Nội dung"
            multiline
            numberOfLines={4}
          />
        </View>
        <View style={styles.viewImage}>
          <Image
            source={require("../../assets/Image/placeholder.png")}
            style={{ height: 150, width: 200, resizeMode: "center" }}
          />
          <TouchableOpacity style={styles.updateImage}>
            <Entypo name="camera" size={30} color={"#000"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#FFF",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    alignContent: "stretch",
    marginVertical: 5
  },
  viewHeader: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#830707",
    height: "100%",
    marginTop: 15,
    marginBottom: 15
  },
  btnDel: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: -7,
    marginRight: -7
  },
  viewDescription: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#ffebee",
    padding: 3
  },
  viewImage: {
    marginTop: 5,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  updateImage: {
    position: "absolute",
    left: "50%",
    bottom: 0,
    marginLeft: -10,
    marginBottom: 3
  },
  textInputTitle: {
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: "400",
    color: "#8e1e20"
  },
  textStep: {
    textAlign: "left",
    textTransform: "capitalize",
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    alignContent: "center",
    fontWeight: "400",
    color: "#8e1e20"
  }
});
