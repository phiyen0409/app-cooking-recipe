import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform
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
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import axios from "axios";

export default class AddStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      step: props.step,
      title: props.title,
      images: props.images,
      content: props.content,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      modalVisible: false
    };
  }
  removeItem = () => {
    this.props.removeItem(this.state.id);
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    Permissions.askAsync(Permissions.CAMERA)
      .then(data => {
        let result = data.status;
        this.setState({ hasCameraPermission: result === "granted" });
        if (result !== "granted") {
          alert("Sorry, No access to camera!");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  updateItem = () => {
    this.props.updateItem(this.state.id, {
      step: this.state.step,
      title: this.state.title,
      images: this.state.images,
      content: this.state.content
    });
  };
  choosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
      let data =
        "data:image/" +
        result.uri.substring(
          result.uri.lastIndexOf(".") + 1,
          result.uri.length
        ) +
        ";base64," +
        result.base64;

      this.uploadImage(data);
      //console.log(result);
      
      this.setState({ modalVisible: false });
    }
  };
  takePhoto = async () => {
    if (
      this.state.hasCameraPermission === null ||
      this.state.hasCameraPermission === false
    ) {
      alert("Sorry, No access to camera!");
    } else {
      let result = await ImagePicker.launchCameraAsync({
        exif: true,
        allowsEditing: true,
        quality: 0.7,
        base64: true,
        aspect: [4, 3]
      });

      if (!result.cancelled) {
        let data =
          "data:image/" +
          result.uri.substring(
            result.uri.lastIndexOf(".") + 1,
            result.uri.length
          ) +
          ";base64," +
          result.base64;

        this.uploadImage(data);
        this.setState({ modalVisible: false });
      }
    }
  };
  uploadImage = (image) => {

    // let listImage = this.state.images;
    // listImage.push(image);
    // this.setState({ images: listImage });
    // this.props.updateItem(this.state.id, {
    //   step: this.state.step,
    //   title: this.state.title,
    //   images: listImage,
    //   content: this.state.content
    // });

      axios({
        method: "post",
        url: "/file/upload/imagebase64",
        data: {
          image: image
        }
      })
      .then(response => {
        console.log(response.data.image);
        
        let listImage = this.state.images;
        listImage.push(response.data.image);
        this.setState({ images: listImage });
        this.props.updateItem(this.state.id, {
          step: this.state.step,
          title: this.state.title,
          images: listImage,
          content: this.state.content
        });
      });
  };
  render() {
    //this.updateItem();
    let { images } = this.state;
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
              this.props.updateItem(this.state.id, {
                step: this.state.step,
                title: text,
                images: this.state.images,
                content: this.state.content
              });
            }}
            placeholder="tiêu đề"
          />
        </View>
        <View style={styles.viewContent}>
          <TextInput
            style={styles.textInputContent}
            value={this.state.content}
            onChangeText={text => {
              this.setState({ content: text });
              this.props.updateItem(this.state.id, {
                step: this.state.step,
                title: this.state.title,
                images: this.state.images,
                content: text
              });
            }}
            placeholder="Nội dung"
            multiline
            numberOfLines={4}
          />
        </View>
        <ScrollView style={styles.scrollViewImage} horizontal={true}>
        <View style={styles.viewImage}>
          {images.map((item, key) => {
            return (
              <Image
                source={
                  item
                    ? { uri: item }
                    : require("../../assets/Image/placeholder.png")
                }
                style={styles.image}
                key={key}
              />
            );
          })}

          <TouchableOpacity
            style={styles.updateImage}
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <Entypo name="camera" size={30} color={"#000"} />
          </TouchableOpacity>
        </View>
        </ScrollView>
        

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(false);
            }}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(15,0,0,0.52)"
            }}
          ></TouchableOpacity>
          <View style={styles.containerModal}>
            <View style={styles.bodyModal}>
              <TouchableOpacity
                style={styles.viewButtonModal}
                onPress={this.takePhoto}
              >
                <View style={styles.viewIconButtonModal}>
                  <Image style={styles.iconButtonModal} source={CameraImage} />
                </View>
                <View style={styles.viewTextButtonModal}>
                  <Text style={styles.textButtonModal}>Máy ảnh</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewButtonModal}
                onPress={this.choosePhoto}
              >
                <View style={styles.viewIconButtonModal}>
                  <Image style={styles.iconButtonModal} source={LibraryImage} />
                </View>
                <View style={styles.viewTextButtonModal}>
                  <Text style={styles.textButtonModal}>Chọn ảnh từ bộ nhớ</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  viewContent: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#ffebee",
    padding: 3
  },
  scrollViewImage: {
    padding: 5,
  },
  viewImage: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  image: {
    marginRight: 10,
    width: 70,
    height: 70,
    borderRadius: 10
  },
  updateImage: {
    marginRight: 10,
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#3399cc',
    alignItems: "center",
    justifyContent: "center",
    //alignContent: "center"
  },
  textInputTitle: {
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: "400",
    color: "#8e1e20",
    textAlignVertical: "top"
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
  },
  textInputContent: {
    textAlignVertical: "top"
  },
  containerModal: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    bottom: 0,
    backgroundColor: "#FFF"
  },
  bodyModal: {
    flex: 1,
    width: "100%",
    alignContent: "stretch",
    justifyContent: "center"
  },
  viewButtonModal: {
    width: "100%",
    height: 45,
    flex: 1,
    flexDirection: "row",
    //paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  viewIconButtonModal: {
    flex: 1,
    //height: 20,
    paddingLeft: 5,
    justifyContent: "center",
    alignContent: "center"
  },
  iconButtonModal: {
    width: 35,
    height: 35
  },
  viewTextButtonModal: {
    flex: 10,
    flexDirection: "row",
    marginLeft: 10
  },
  textButtonModal: {
    alignSelf: "flex-start",
    height: "100%",
    textAlign: "left",
    fontSize: 15
  }
});
