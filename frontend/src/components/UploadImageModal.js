import React, { Component } from "react";
import { Modal, StyleSheet, Image, TouchableOpacity } from "react-native";

import LibraryImage from "../../assets/Image/library.png";
import CameraImage from "../../assets/Image/camera.png";
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
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.container}>
          <View style={styles.body}>
            <TouchableOpacity>
              <Image style={styles.iconButton} source={CameraImage} />
              <Text style={styles.textButton}>Máy ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.iconButton} source={LibraryImage} />
              <Text style={styles.textButton}>Chọn ảnh từ bộ nhớ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderRadius: 5
  },
  body: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignContent: "stretch",
    justifyContent: "center"
  },
  viewButton: {
    width: "100%",
    height: 50,
    flex: 1,
    flexDirection: "row",
    paddingVertical: 5,
  },
  iconButton: {
    flex: 1,
    width: 30,
    height: 30,
    paddingLeft: 5,
  },
  textButton: {
    flex: 9,
    height: "100%",
    textAlign: 'left',
  }
});
