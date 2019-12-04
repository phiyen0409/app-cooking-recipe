import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Alert,
  ActivityIndicator
} from "react-native";
import IngredientListItem from "../components/IngredientListItem";
import theme from "../../constant/theme";
import { Block, Icon } from "galio-framework";
import Im from "../../assets/Image/suonxaochuangot.jpg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Process from "../components/Process";
import Comment from "../components/Comment";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default class RecipeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentContent: "",
      post: this.props.navigation.getParam("post")
        ? this.props.navigation.getParam("post")
        : {},
      loading: false,
      position: 1,
      interval: null,
      userId:this.props.navigation.getParam("userId")
    };
  }
  getPost = async (postId) => {
    axios({
      method: "get",
      url: "/post/" + postId,
      data: {}
    })
      .then(result => {
        this.setState({
          post: result.data ? result.data : {},
          commentContent: "",
          loading: false
        });
      })
      .catch(error => {
        Alert.alert(error);
      });
  };
  addComment = async () => {
    if (this.state.commentContent !== "") {
      this.setState({
        loading: true
      });
      const userId = this.props.navigation.getParam("userId");
      axios({
        method: "post",
        url: "/post/addcomment/" + this.state.post._id,
        data: {
          content: this.state.commentContent,
          user: userId
        }
      })
        .then(result => {
          Alert.alert(result.data.message);
          this.getPost(this.state.post._id);
        })
        .catch(error => {
          Alert.alert(error);
        });
    } else {
      Alert.alert("Bạn chưa nhập nội dung");
    }
  };
  componentDidMount = () => {
    let postId = this.props.navigation.getParam("postId");
    console.log("postId " + postId);
    
    if(postId != undefined)
    {
      this.setState({
        loading: true
      });
      this.getPost(postId);
    }
  };
  render() {
    // const post = this.props.navigation.getParam("post");
    // console.log("====================================");
    // console.log(post);
    // console.log("====================================");
    let post = this.state.post;
    const navigation=this.props.navigation;
    console.log("detail post");
    console.log(post);
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraHeight={200}
        extraScrollHeight={200}
      >
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.postContainer}>
              <View style={styles.postAbout}>
                <View style={styles.viewTitle}>
                  <Text style={styles.title}>{post.title}</Text>
                  <TouchableOpacity
                    onPress={()=>navigation.navigate("Profile",{author: post.author_id, authorProfile: true,userId:this.state.userId})}
                  >
                  <View>
                    <Text style={(styles.title, styles.author)}>
                      {post.author}
                    </Text>
                  </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.imageView}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: post.image }}
                  />
                </View>
                <View style={styles.viewContent}>
                  <Text style={styles.description}>{post.description}</Text>
                </View>
              </View>
            </View>
            <View style={styles.postContainer}>
              {this.state.loading ? <IngredientListItem ingredients={post.ingredients} /> : <IngredientListItem ingredients={post.ingredients} />}
            </View>
            <View style={styles.postContainer}>
              {this.state.loading ? <Process stepList={post.detail} /> : <Process stepList={post.detail} />}
            </View>
            <View style={styles.postContainer}>
              <View style={styles.viewTitle}>
                <Text style={styles.title}>Bình luận</Text>
              </View>
              <FlatList
                data={post.comments}
                renderItem={({ item }) => <Comment comment={item} />}
                keyExtractor={item => item._id}
              />
              <View style={styles.viewComment}>
                <TextInput
                  style={styles.textInputCmt}
                  multiline
                  placeholder="Viết bình luận"
                  value={this.state.commentContent}
                  onChangeText={text => {
                    this.setState({ commentContent: text });
                  }}
                />
                <TouchableOpacity
                  style={{ width: "100%", height: "60%" }}
                  onPress={this.addComment}
                >
                  <View style={styles.buttonCmt}>
                    <Text style={styles.textButtonCmt}>Gửi</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        {this.state.loading ? (
          <ActivityIndicator
            style={{ position: "absolute", top: "50%", left: "50%", zIndex: 5 }}
            size="large"
            color="#830707"
          />
        ) : null}
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
    backgroundColor: "#ffebee"
  },
  postContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    marginVertical: 5,
    marginHorizontal: 1
  },
  postAbout: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 4
  },
  viewTitle: {
    padding: 5,
    margin: 5,
    flex: 1,
    flexDirection: "column",
    // maxHeight: 50,
    height: "100%",
    width: "100%",
    marginTop: 0,
    alignSelf: "center"
    // backgroundColor: '#cdb7b5',
  },

  title: {
    textTransform: "uppercase",
    marginBottom: 5,
    fontWeight: "700",
    marginLeft: 15,
    marginRight: 15,
    textAlign: "center",
    color: "#7f0000",
    marginBottom: 5
  },

  author: {
    textTransform: "capitalize",
    fontWeight: "400",
    color: "#d8888b",
    textAlign: "center",
    fontSize: 12
  },
  imageView: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    height: hp("30%"),
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#cdb7b5",
    marginVertical: 10,
    padding: 15
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  },
  viewContent: {
    flexDirection: "row",
    alignItems: "stretch",
    marginVertical: 5,
    marginHorizontal: 15,
    padding: 5,
    shadowColor: "#cdb7b5"
  },

  description: {
    fontWeight: "500"
  },

  viewComment: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    shadowColor: "#cdb7b5",
    height: 100
  },
  textInputCmt: {
    flex: 6,
    height: "80%",
    width: "100%",
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFF"
  },
  buttonCmt: {
    flex: 1,
    width: 60,
    backgroundColor: "#830707",
    borderRadius: 15,
    marginHorizontal: 20,
    // paddingVertical:12,
    marginBottom: 10,
    height: "80%",
    justifyContent: "center",
    alignItems: "center"
  },
  textButtonCmt: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff"
  }
});
