import React, { Component } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";

import LibraryImage from "../../assets/Image/library.png";
import CameraImage from "../../assets/Image/camera.png";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
export default class UploadImageModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: props.modalVisible
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "transparent"
          }}
        ></TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={styles.body}>
            <TouchableOpacity style={styles.viewButton}>
              <View style={styles.viewIconButton}>
                <Image style={styles.iconButton} source={CameraImage} />
              </View>
              <View style={styles.viewTextButton}>
                <Text style={styles.textButton}>Máy ảnh</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewButton}>
              <View style={styles.viewIconButton}>
                <Image style={styles.iconButton} source={LibraryImage} />
              </View>
              <View style={styles.viewTextButton}>
                <Text style={styles.textButton}>Chọn ảnh từ bộ nhớ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    bottom: 0,
    backgroundColor: "red"
  },
  body: {
    flex: 1,
    width: "100%",
    alignContent: "stretch",
    justifyContent: "center"
  },
  viewButton: {
    width: "100%",
    height: 35,
    flex: 1,
    flexDirection: "row",
    paddingVertical: 5
  },
  viewIconButton: {
    flex: 1,
    height: 20,
    paddingLeft: 5,
    justifyContent: "center",
    alignContent: "center"
  },
  iconButton: {
    width: 30,
    height: 30
  },
  viewTextButton: {
    flex: 10,
    alignContent: "stretch",
    alignItems: "flex-start"
  },
  textButton: {
    height: "100%",
    textAlign: "left"
  }
});
