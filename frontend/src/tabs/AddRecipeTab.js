import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Modal,
  AsyncStorage
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import AddIntro from "../components/AddIntro";
import AddIngredient from "../components/AddIngredient";
import PlusImage from "../../assets/Image/plus.png";
import AddStep from "../components/AddStep";
import { Entypo } from "@expo/vector-icons";
import UploadImageModal from "../components/UploadImageModal";

import LibraryImage from "../../assets/Image/library.png";
import CameraImage from "../../assets/Image/camera.png";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

export default class AddRecipeScreen extends React.Component {
  _getUserLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('@auth');
      if (value !== null) {
        // We have data!!
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
    return null;
  };
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      modalVisible: false,
      name: "",
      description: "",
      image: null,
      processes: [
        {
          id: new Date().getMilliseconds(),
          step: 1,
          description: "",
          image: ""
        }
      ],
      ingredients: [
        {
          id: new Date().getMilliseconds(),
          name: "",
          weight: ""
        }
      ]
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  addIngredient = () => {
    let { ingredients } = this.state;
    ingredients.push({
      id: new Date().getMilliseconds(),
      name: "",
      weight: ""
    });
    this.setState({ ingredients: ingredients });
  };
  addStep = () => {
    let { processes } = this.state;
    processes.push({
      id: new Date().getMilliseconds(),
      step: 2,
      name: "",
      weight: ""
    });
    this.setState({ processes: processes });
  };
  removeItemIngredient = id => {
    let { ingredients } = this.state;
    ingredients.splice(id, 1);
    this.setState({ ingredients: ingredients });
  };
  removeItemProcess = id => {
    let { processes } = this.state;
    processes.splice(id, 1);
    this.setState({ processes: processes });
  };

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
          result.uri.split(result.uri.lastIndexOf(".")).pop() +
          ";base64," +
          result.base64;
      this.setState({ image: data, modalVisible: false });
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
          result.uri.split(result.uri.lastIndexOf(".")).pop() +
          ";base64," +
          result.base64;
        this.setState({ image: data, modalVisible: false });
      }
    }
  };
  render() {
    let { ingredients } = this.state;
    let { processes } = this.state;
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.postContainer}>
            <View style={styles.viewName}>
              <TextInput
                multiline={false}
                style={styles.title}
                placeholder="Tên món ăn"
                value={this.state.name}
                onChangeText={text => {
                  this.setState({ name: text });
                }}
              ></TextInput>
            </View>
            <View style={styles.viewImage}>
              <Image
                style={{ height: 150, width: 200, resizeMode: "center" }}
                source={
                  image
                    ? { uri: image }
                    : require("../../assets/Image/placeholder.png")
                }
              />
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(true);
                }}
                style={styles.updateImage}
              >
                <Entypo name="camera" size={30} color={"#000"} />
              </TouchableOpacity>
            </View>
            <View style={styles.viewDescription}>
              <TextInput
                multiline
                numberOfLines={4}
                value={this.state.description}
                onChangeText={text => {
                  this.setState({ description: text });
                }}
                //style={styles.description}
                placeholder="Mô tả"
              />
            </View>
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
                      <Image
                        style={styles.iconButtonModal}
                        source={CameraImage}
                      />
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
                      <Image
                        style={styles.iconButtonModal}
                        source={LibraryImage}
                      />
                    </View>
                    <View style={styles.viewTextButtonModal}>
                      <Text style={styles.textButtonModal}>
                        Chọn ảnh từ bộ nhớ
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.viewTitle}>
              <Text style={styles.textTitle}>Thành phần nguyên liệu</Text>
            </View>
            <View style={styles.viewListContent}>
              {ingredients.map((item, key) => {
                return (
                  <AddIngredient
                    key={key}
                    id={key}
                    name={item.name}
                    weight={item.weight}
                    removeItem={this.removeItemIngredient}
                  />
                );
              })}
            </View>
            <View>
              <TouchableOpacity
                style={styles.btnAddIngredient}
                onPress={this.addIngredient}
              >
                <Image style={styles.logoAddIngredient} source={PlusImage} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.viewTitle}>
              <Text style={styles.textTitle}>Quy trình thực hiện</Text>
            </View>
            <View style={styles.viewListContent}>
              {processes.map((item, key) => {
                return (
                  <AddStep
                    key={key}
                    id={key}
                    step={item.step}
                    title={item.title}
                    image={item.image}
                    description={item.description}
                    removeItem={this.removeItemProcess}
                  />
                );
              })}
            </View>
            <TouchableOpacity
              style={styles.btnAddIngredient}
              onPress={this.addStep}
            >
              <Image style={styles.logoAddIngredient} source={PlusImage} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingBottom: 10
    //backgroundColor: "#ffcdd2",
  },
  postContainer: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  viewName: {
    margin: 5,
    flex: 1,
    flexDirection: "column",
    maxHeight: 50,
    width: "100%",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#ffebee",
    borderRadius: 10,
    padding: 3
  },
  viewImage: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#ffebee",
    borderRadius: 10,
    shadowColor: "#cdb7b5",
    padding: 3
  },
  updateImage: {
    position: "absolute",
    left: "50%",
    bottom: 0,
    marginLeft: -10,
    marginBottom: 3
  },
  viewDescription: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 5,
    borderWidth: 2,
    borderColor: "#ffebee",
    borderRadius: 10,
    shadowColor: "#cdb7b5",
    padding: 3
  },
  listContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    paddingHorizontal: 20
  },
  viewTitle: {
    flex: 1,
    flexDirection: "column",
    maxHeight: 50,
    width: "100%",
    marginTop: 0,
    alignSelf: "center"
  },
  textTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 5,
    fontWeight: "700",
    marginLeft: 15,
    marginRight: 15,
    alignContent: "center",
    color: "#7f0000"
  },
  viewListContent: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignContent: "stretch",
    paddingBottom: 10
  },
  btnAddIngredient: {
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center"
  },
  logoAddIngredient: {
    width: 30,
    height: 25
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
    justifyContent:'center',
    alignItems:'center'
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
    flexDirection:"row",
    marginLeft: 10,
  },
  textButtonModal: {
    alignSelf:"flex-start",
    height: "100%",
    textAlign: "left",
    fontSize:15
  }
});
