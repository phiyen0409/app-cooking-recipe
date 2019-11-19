import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Modal
} from "react-native";
import { Block, Icon } from "galio-framework";
import Im from "../../assets/Image/suonxaochuangot.jpg";
import { red } from "ansi-colors";
import LikeImage from "../../assets/Image/Interact/like.png";
import CommentImage from "../../assets/Image/Interact/comment.png";
import SaveImage from "../../assets/Image/Interact/save.png";
import { FontAwesome, AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";

export default class ListItem extends React.Component {
  springValueLike = new Animated.Value(1);
  springValueSave = new Animated.Value(1);

  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.isLiked,
      saved: this.props.isSaved,
      totalLike: this.props.post.totalLike,
      totalSaved: this.props.post.totalSaved,
      modalVisible: false,
      id:this.props.post._id,
    };
    console.log("====================================");
    console.log(this.props);
    console.log("====================================");
  }
  springLike() {
    axios({
      method: "put",
      url: "post/updatelike/" + this.props.post._id,
      data: {
        userId: this.props.userId
      }
    })
      .then(result => {})
      .catch(error => {
        Alert.alert(error);
        this.setState({
          liked: !this.state.liked,
          totalLike: !this.state.liked
            ? this.state.totalLike + 1
            : this.state.totalLike - 1
        });
      });
    this.setState({
      liked: !this.state.liked,
      totalLike: !this.state.liked
        ? this.state.totalLike + 1
        : this.state.totalLike - 1
    });
    if (!this.state.liked) {
      this.springValueLike.setValue(0);
      Animated.spring(this.springValueLike, {
        toValue: 1,
        friction: 0.5
      }).start();
    } else {
      this.springValueLike.setValue(0.5);
      Animated.spring(this.springValueLike, {
        toValue: 1,
        friction: 2
      }).start();
    }
  }
  springSave() {
    axios({
      method: "put",
      url: "user/savepost/" + this.props.userId,
      data: {
        postId: this.props.post._id
      }
    })
      .then(result => {})
      .catch(error => {
        Alert.alert(error);
        this.setState({
          saved: !this.state.saved,
          totalSaved: !this.state.saved
            ? this.state.totalSaved + 1
            : this.state.totalSaved - 1
        });
      });
    this.setState({
      saved: !this.state.saved,
      totalSaved: !this.state.saved
        ? this.state.totalSaved + 1
        : this.state.totalSaved - 1
    });
    if (!this.state.saved) {
      this.springValueSave.setValue(0);
      Animated.spring(this.springValueSave, {
        toValue: 1,
        friction: 0.5
      }).start();
    } else {
      this.springValueSave.setValue(0.5);
      Animated.spring(this.springValueSave, {
        toValue: 1,
        friction: 2
      }).start();
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  removeItem = () => {
    this.props.removeItem(this.state.id);
    console.log('RemoveItem: '+this.state.id);
  };
  deletePost = async ()=>{
    this.setState({ modalVisible: false });
    Alert.alert("LAAAAAAAAAAAAAAAAA");
    // console.log(this.props.post._id);
    // this.removeItem();
    // axios({
    //   method: "put",
    //   url: "post/delete/" + this.props.post._id,
    //   data: {
    //   }
    // })
    //   .then(result => {
    //     Alert.alert(result);
    //     // this.props.handleRefresh();
    //   })
    //   .catch(error => {
    //     Alert.alert(error);
    //   });
  }
  render() {
    const { switchEditScreen } = this.props;
    const { switchRecipeScreen } = this.props;
    const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);
    const AnimatedFontaws = Animated.createAnimatedComponent(FontAwesome);
    const post = this.props.post;

    return (
      <View style={styles.container}>
        { this.props.canEdit?
        <TouchableOpacity style={styles.menuView} onPress={() => {
          this.setModalVisible(true);
        }}>
            <Entypo name='menu' size={25} color="#830707" />
        </TouchableOpacity>:null
        }
        <View
          style={{
            flex: 4,
            width: "100%",
            borderBottomColor: "#830707",
            borderBottomWidth: 1
          }}
        >
          <TouchableOpacity
            style={{ width: "100%", height: "100%" }}
            onPress={switchRecipeScreen}
            
          >
            <View style={{ flexDirection: "row" }}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={post.image ? { uri: post.image } : Im}
                />
              </View>

              <View style={styles.viewContent}>
                <View style={styles.viewTitle}>
                  <Text style={styles.title}>{post.title}</Text>
                </View>
                <View style={styles.author}>
                  <FontAwesome name="user" size={12} color="#6E6E6E" />
                  <Text style={styles.authorText}>{post.author}</Text>
                </View>
                <Text style={styles.description}>{post.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.springLike.bind(this)}
          >
            <Block style={styles.buttonBlock}>
              <AnimatedIcon
                name="heart"
                size={30}
                style={{ transform: [{ scale: this.springValueLike }] }}
                color={this.state.liked ? "#830707" : "#A4A4A4"}
              />
              <Text style={{ fontSize: 6 }}>
                {this.state.totalLike > 0 ? this.state.totalLike : ""}
              </Text>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={switchRecipeScreen}>
            <Block style={styles.buttonBlock}>
              <MaterialIcons name="comment" size={30} color="#A4A4A4" />
              <Text style={{ fontSize: 6 }}>
                {post.totalComment > 0 ? post.totalComment : ""}
              </Text>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.springSave.bind(this)}
          >
            <Block style={styles.buttonBlock}>
              <AnimatedFontaws
                name="bookmark"
                size={30}
                style={{ transform: [{ scale: this.springValueSave }] }}
                color={this.state.saved ? "#830707" : "#A4A4A4"}
              />
              <Text style={{ fontSize: 6 }}>
                {this.state.totalSaved > 0 ? this.state.totalSaved : ""}
              </Text>
            </Block>
          </TouchableOpacity>
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
                onPress={() => {
                  this.setModalVisible(false);
                  switchEditScreen();
                }}
              >
                <View style={styles.viewIconButtonModal}>
                  <Entypo name='edit' size={25} />
                </View>
                <View style={styles.viewTextButtonModal}>
                  <Text style={styles.textButtonModal}>Chỉnh sửa bài viết</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewButtonModal}
                onPress={() => {
                  Alert.alert(
                    "Thông báo",
                    "Bạn có muốn xóa bài viết?",
                    [
                      {
                        text: "OK",
                        onPress: () => {
                          this.deletePost();
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
                <View style={styles.viewIconButtonModal}>
                  <AntDesign name='delete' size={25} />
                </View>
                <View style={styles.viewTextButtonModal}>
                  <Text style={styles.textButtonModal}>Xóa bài viết</Text>
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
    alignItems: "center",
    // height: hp('20%'),

    padding: 5,
    // borderTopLeftRadius: 40,
    // borderBottomRightRadius: 40,
    backgroundColor: "#fff",
    shadowColor: "#830707",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    marginBottom: 15,
    borderRadius: 25,
    borderColor:'#ffcdd2',
    borderWidth:1,
  },
  menuView:{
    position:'absolute',
    zIndex:3,
    top:5,
    right:7
  },
  viewContent: {
    flex: 2,
    flexDirection: "column",
    alignItems: "baseline",
    justifyContent: "space-around",
    padding: 5,
    height: "100%"
  },

  viewTitle: {
    flex: 2,
    // maxHeight: 30,
    paddingTop: 0
  },

  imageContainer: {
    flex: 1,
    height: "100%",
    // paddingLeft: 64,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: 64,
    borderRadius: 12
  },
  title: {
    flex: 1,
    textTransform: "uppercase",
    marginBottom: 5,
    fontWeight: "700",
    marginLeft: 10,
    // marginRight: 15,
    alignContent: "center",
    color: "#7f0000"
  },
  author: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 15
  },
  authorText: {
    color: "#6E6E6E",
    fontSize: 12,
    marginLeft: 2
  },
  description: {
    flex: 4,
    marginBottom: 8,
    marginTop: 5,
    paddingBottom: 2,
    fontWeight: "300",
    marginLeft: 10
    // marginRight: 15,
  },

  button: {
    flex: 1,
    // backgroundColor: "#b71c1c",
    margin: 5
    // paddingTop: 10
    //borderRadius: 4,
    // borderLeftWidth: 0.5,
    // borderLeftColor: 'red'
  },
  buttonBlock: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center"
  },
  logoButton: {
    width: 25,
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
