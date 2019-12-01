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
  AsyncStorage,
  Alert,
  ActivityIndicator,
  Platform
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default class AddRecipeScreen extends React.Component {
  _getUserLogin = async () => {
    try {
      const value = await AsyncStorage.getItem("@auth");
      if (value !== null) {
        // We have data!!
        let user = JSON.parse(value);
        this.setState({ user: user });
        console.log(user);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  constructor(props) {
    super(props);
    let isEdit = false;
    if (this.props.navigation.getParam("edit") === true) {
      isEdit = true;
    }
    console.log(isEdit);
    const post = this.props.navigation.getParam("post");
    console.log(post);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      modalVisible: false,
      isEdit: isEdit,
      postId: isEdit ? post._id : "",
      title: isEdit ? post.title : "",
      description: isEdit ? post.description : "",
      image: isEdit ? post.image : "",
      processes: isEdit
        ? post.detail
        : [
            {
              step: 1,
              content: "",
              images: [],
              title: ""
            }
          ],
      ingredients: isEdit
        ? post.ingredients
        : [
            {
              name: "",
              weight: ""
            }
          ],
      loading: false
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  addIngredient = () => {
    let { ingredients } = this.state;
    ingredients.push({
      name: "",
      weight: ""
    });
    this.setState({ ingredients: ingredients });
  };
  addStep = () => {
    let { processes } = this.state;
    processes.push({
      step: processes.length + 1,
      content: "",
      images: [],
      title: ""
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
    let item = processes[id];
    for (let index = 0; index + id + 1 < processes.length; index++) {
      processes[index + id + 1].step = item.step + index;
    }
    processes.splice(id, 1);
    this.setState({ processes: processes });
  };
  updateItemIngredient = (id, item) => {
    let { ingredients } = this.state;
    ingredients[id] = item;
    this.setState({ ingredients: ingredients });
  };
  updateItemProcess = (id, item) => {
    let { processes } = this.state;
    processes[id] = item;
    this.setState({ processes: processes });
  };
  componentDidMount() {
    (async () => {
      await this._getUserLogin();
    })();
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
  checkValidate = post => {
    if (post.title === "") {
      Alert.alert("Tiêu đề công thức không được để trống");
      return false;
    }
    if (post.image === null) {
      Alert.alert("Ảnh công thức không được để trống");
      return false;
    }
    if (post.description === "") {
      Alert.alert("Mô tả công thức không được để trống");
      return false;
    }
    for (let i = 0; i < post.ingredients.length; i++) {
      if (post.ingredients[i].name === "") {
        Alert.alert("Tên nguyên liệu không được để trống");
        return false;
      }
    }
    for (let i = 0; i < post.detail.length; i++) {
      if (post.detail[i].title === "") {
        Alert.alert("Tiêu đề bước không được để trống");
        return false;
      }
      if (post.detail[i].content === "") {
        Alert.alert("Nội dung bước không được để trống");
        return false;
      }
    }
    return true;
  };
  uploadImage = image => {

    axios({
      method: 'post',
      url: '/file/upload/imagebase64',
      data: {
        image: image,
      }
    })
      .then(response => {
        console.log(response.data.image);
        this.setState({ image: response.data.image });
      }).catch(error =>{
        console.log(error);
      });
  };
  addPost = () => {
    //check validate value
    let post = {
      title: this.state.title,
      description: this.state.description,
      image: this.state.image,
      ingredients: this.state.ingredients,
      detail: this.state.processes
    };
    if (this.checkValidate(post) === true) {
      if (this.state.isEdit) {
        this.state.loading = true;
        axios({
          method: "put",
          url: "/post/update/" + this.state.postId,
          data: {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image,
            ingredients: this.state.ingredients,
            detail: this.state.processes
          }
        })
          .then(result => {
            Alert.alert(result.data.message);
            this.state.loading = false;
          })
          .catch(error => {
            Alert.alert(error);
          });
      } else {
        this.state.loading = true;
        axios({
          method: "post",
          url: "/post/create",
          data: {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image,
            author: this.state.user.idUser,
            ingredients: this.state.ingredients,
            detail: this.state.processes
          }
        })
          .then(result => {
            Alert.alert(result.data.message);
            this.setState({
              loading: false,
              title: "",
              description: "",
              image: "",
              processes: [
                // {
                //   step: 1,
                //   content: "",
                //   images: [],
                //   title: ""
                // }
              ],
              ingredients: [
                // {
                //   name: "",
                //   weight: ""
                // }
              ]
            });
          })
          .catch(error => {
            Alert.alert(error);
          });
      }
    }
  };
  render() {
    let { ingredients } = this.state;
    let { processes } = this.state;
    let { image } = this.state;
    const { isEdit } = this.state;
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraHeight={200}
        extraScrollHeight={200}
      >
        {this.state.loading ? (
          <View style={styles.viewLoading}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : null}
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.postContainer}>
              <View style={styles.viewName}>
                <TextInput
                  multiline={false}
                  style={styles.title}
                  placeholder="Tên món ăn"
                  value={this.state.title}
                  onChangeText={text => {
                    this.setState({ title: text });
                  }}
                ></TextInput>
              </View>
              <View style={styles.viewImage}>
                <Image
                  style={{ height: 150, width: 200, resizeMode: "center" }}
                  source={
                    image.length
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
                      updateItem={this.updateItemIngredient}
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
                      images={item.images}
                      content={item.content}
                      removeItem={this.removeItemProcess}
                      updateItem={this.updateItemProcess}
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
            <TouchableOpacity
              style={{ width: "50%", height: "50%" }}
              onPress={this.addPost}
            >
              <View style={styles.buttonUploadPost}>
                <Text style={styles.textButtonUploadPost}>
                  {isEdit ? "Cập nhật" : "Đăng bài"}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 20
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
    backgroundColor: "#FFF",
    zIndex: 5
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
  },
  buttonUploadPost: {
    //flex:1,
    width: 150,
    backgroundColor: "#830707",
    borderRadius: 15,
    marginHorizontal: "60%",
    // paddingVertical:12,
    marginBottom: 20,
    marginTop: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  textButtonUploadPost: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff"
  },
  viewLoading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "rgba(15,0,0,0.52)",
    zIndex: 4
  }
});
