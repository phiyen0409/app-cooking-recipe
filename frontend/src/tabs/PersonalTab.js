import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  Modal,
  Alert,
  TouchableHighlight,
  TouchableWithoutFeedback,
  AsyncStorage
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";
import { Block, Text } from "galio-framework";
import { FontAwesome, AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import backgroundImg from "../../assets/Image/background.jpg";
import avatarImg from "../../assets/Image/avatar.png";
import recipeButton from "../../assets/Image/blog.png";
import savedButton from "../../assets/Image/Personal/bookmark.png";
import noteButton from "../../assets/Image/Personal/note.png";
import editProButton from "../../assets/Image/Personal/editpro.png";
import ListItem from "../components/ListItem";
import { TextInput } from "react-native-gesture-handler";
import CameraImage from "../../assets/Image/camera.png";
import LibraryImage from "../../assets/Image/library.png";
//import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");
export default class PersonalTab extends React.Component {
  _getUserLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('@auth');
      if (value !== null) {
        // We have data!!
        let user = JSON.parse(value);
        this.setState({user: user});
        console.log(user);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      description: props.description,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      modalVisible: false,
      updateProfileVisible: false
    };
  }
  getDataAsync = async () => {
    axios.get("/user/" + this.state.user.userId)
      .then(result => {
        this.setState({
          user : result.data,
        })
      })
      .catch(error => {
        console.log(error);
      });
  };
  updateInfoUserAsync = async () =>{
    axios({
      method: 'put',
      url: "/user/update/" + this.state.user.userId,
      data: {
        name: this.state.user.name,
        birthday: this.state.user.birthday,
        phone: this.state.user.phone
      }
    })
      .then(result => {
        Alert.alert(result.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }

  setUpdateProfileVisible(visible) {
    this.setState({ updateProfileVisible: visible });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount() {
    this._getUserLogin();
    this.getPermissionAsync();
    //this.getDataAsync();
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
      aspect: [1, 1],
      base64: true
    });
    let data = "data:image/" + result.type + ";base64," + result.base64;

    if (!result.cancelled) {
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
        aspect: [1, 1]
      });
      let data = "data:image/" + result.type + ";base64," + result.base64;

      if (!result.cancelled) {
        this.setState({ image: data, modalVisible: false });
      }
    }
  };
  static navigationOptions = {
    header: null
  };
  render() {
    let image = this.state.user.avatar ? this.state.user.avatar : null;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImg}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: "15%" }}
          >
            <View style={styles.cardView}>
              <Block middle style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Image
                    source={
                      image
                        ? { uri: image }
                        : require("../../assets/Image/placeholder.png")
                    }
                    resizeMode="cover"
                    style={{ height: "100%", width: 124, borderRadius: 62 }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.updateImage}
                  onPress={() => {
                    this.setModalVisible(true);
                  }}
                >
                  <Entypo name="camera" size={30} color={"#000"} />
                </TouchableOpacity>
              </Block>
              <Block style={styles.info}>
                <Block middle style={styles.nameInfo}>
                  <Text bold size={24} color="#830707">
                    {this.state.user.name}
                  </Text>
                </Block>
                <Block style={{ marginBottom: 15 }}>
                  <Block style={styles.infoDetail}>
                    {/* <Text style={styles.textInfoDetail}>
                  Yêu màu hồng, thích màu tím, ghét sự giả dối
                </Text> */}
                    <Block row>
                      <Ionicons name="md-mail" style={styles.iconProfile} />
                      <Text style={styles.textInfoDetail}>
                      {this.state.user.email}
                      </Text>
                    </Block>
                    <Block row>
                      <FontAwesome
                        name="birthday-cake"
                        style={styles.iconProfile}
                      />
                      <Text style={styles.textInfoDetail}>{this.state.user.birthday}</Text>
                    </Block>
                    <Block row>
                      <Entypo name="phone" style={styles.iconProfile} />
                      <Text style={styles.textInfoDetail}>{this.state.user.phone}</Text>
                    </Block>
                  </Block>
                </Block>
                <Block row space="between">
                  <Block middle>
                    <Text
                      bold
                      size={12}
                      color="#830707"
                      style={{ marginBottom: 4 }}
                    >
                      2K
                    </Text>
                    <Text size={12}>Công thức</Text>
                  </Block>
                  <Block middle>
                    <Text
                      bold
                      color="#830707"
                      size={12}
                      style={{ marginBottom: 4 }}
                    >
                      1000
                    </Text>
                    <Text size={12}>Lượt thích</Text>
                  </Block>
                  <Block middle>
                    <Text
                      bold
                      color="#830707"
                      size={12}
                      style={{ marginBottom: 4 }}
                    >
                      89
                    </Text>
                    <Text size={12}>Bình luận</Text>
                  </Block>
                </Block>
                <Block middle style={{ marginTop: 12, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
              </Block>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  onPress={() => {
                    this.setUpdateProfileVisible(true);
                  }}
                >
                  <View style={styles.buttonBlock}>
                    <Image source={editProButton} style={styles.imgButton} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.buttonBlock}>
                    <Image source={noteButton} style={styles.imgButton} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.buttonBlock}>
                    <Image source={savedButton} style={styles.imgButton} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.recipesContainer}>
                <Text style={styles.recipesTitle}>Công thức</Text>
                <Block middle style={{ marginTop: 12, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
                <View style={styles.listRecipes}>
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.updateProfileVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            this.setUpdateProfileVisible(!this.state.updateProfileVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(15, 0, 0, 0.52)",
              zIndex: 0
            }}
          ></View>
          <View style={styles.updateProfilePopup}>
            <View
              style={{
                justifyContent: "center",
                marginVertical: 20,
                alignItems: "center"
              }}
            >
              <Text style={styles.recipesTitle}>Thông tin cá nhân</Text>
            </View>
            <View style={styles.updateProfileComponent}>
              <Text style={styles.textUpdateProfile}>Tên:</Text>
              <TextInput style={styles.textInputUpdateProfile}></TextInput>
            </View>
            <View style={styles.updateProfileComponent}>
              <Text style={styles.textUpdateProfile}>Ngày sinh:</Text>
              <TextInput style={styles.textInputUpdateProfile}></TextInput>
            </View>
            <View style={styles.updateProfileComponent}>
              <Text style={styles.textUpdateProfile}>Số điện thoại:</Text>
              <TextInput style={styles.textInputUpdateProfile}></TextInput>
            </View>
            <View style={styles.buttonUpdateProContainer}>
              <TouchableOpacity style={styles.buttonUpdatePro}>
                <Text style={styles.buttonUpdateProText}>Lưu lại</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonUpdatePro}
                onPress={() => {
                  Alert.alert(
                    "Thông báo",
                    "Bạn có muốn hủy bỏ?",
                    [
                      {
                        text: "OK",
                        onPress: () => {
                          this.setUpdateProfileVisible(
                            !this.state.updateProfileVisible
                          );
                        }
                      },
                      {
                        text: "Hủy",
                        //onPress: () => console.log('Cancel Pressed'),
                        style: "cancel"
                      }
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Text style={styles.buttonUpdateProText}>Hủy bỏ</Text>
              </TouchableOpacity>
            </View>
            {/* <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setUpdateProfileVisible(!this.state.updateProfileVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View> */}
          </View>
        </Modal>

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
    //paddingTop: 20,
    paddingBottom: 20,
    // alignItems: "stretch",
    // justifyContent: "center",
    backgroundColor: "#ffebee"
    //paddingLeft: 10,
    // paddingRight: 10
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2,
    opacity: 0.8
  },
  cardView: {
    padding: 16,
    marginHorizontal: 16,
    marginTop: 65,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
    //height: height / 1.8
  },
  info: {
    paddingHorizontal: 40,
    marginTop: 20
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    alignSelf: "stretch",
    borderRadius: 50,
    height: 124,
    width: "100%",
    alignItems: "center"
  },
  updateImage: {
    position: "absolute",
    left: "50%",
    bottom: 0,
    marginLeft: -10,
    marginBottom: 3
  },
  nameInfo: {
    height: 50,
    padding: 0
  },
  infoDetail: {
    alignItems: "center",
    justifyContent: "center"
  },
  textInfoDetail: {
    fontSize: 10,
    color: "#585858"
  },
  iconProfile: {
    color: "#585858",
    // height: 10,
    // width: 10,
    fontSize: 10,
    marginRight: 5
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  buttonView: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between"
  },
  buttonContainer: {
    height: "100%",
    width: "100%"
  },
  // buttonBlock:{
  //   flex:1,
  //   alignContent:'center',
  //   alignItems:'center',
  //   flexDirection: 'row',
  //   borderBottomColor: "#E9ECEF",
  //   borderBottomWidth:1
  // },
  buttonBlock: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10
  },
  imgButton: {
    height: 25,
    width: 25
  },
  buttonGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  recipesContainer: {
    marginTop: 20
  },
  recipesTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
    color: "#830707"
  },
  updateProfilePopup: {
    backgroundColor: "white",
    position: "absolute",
    top: "50%",
    marginTop: -300 / 2,
    left: 10,
    right: 10,
    height: 300,
    borderRadius: 10,
    zIndex: 1,
    paddingRight: 20
  },
  updateProfileComponent: {
    width: "100%",
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20
  },
  textUpdateProfile: {
    flex: 3,
    color: "#830707",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 13
  },
  textInputUpdateProfile: {
    flex: 5,
    borderRadius: 10,
    backgroundColor: "#E6E6E6",
    marginHorizontal: 10,
    color: "#830707",
    paddingLeft: 10
  },
  buttonUpdateProContainer: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonUpdatePro: {
    width: 70,
    backgroundColor: "#830707",
    borderRadius: 15,
    marginHorizontal: 20,
    // paddingVertical:12,
    marginBottom: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonUpdateProText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#fff"
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
