import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  FlatList,
  ActivityIndicator
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";
import ListItem from "../components/ListItem";
import AvatarImage from "../../assets/Image/avatar.png";
import theme from "../../constant/theme";
import uploadImage from "../../assets/Image/blog.png";
import PTRView from 'react-native-pull-to-refresh';

export default class HomeTab extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      posts: [],
      refreshing:false,
      loading:true,
    };
  }
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
  componentDidMount() {
    (async () => {
      await this._getUserLogin();
      await this.getDataAsync();
    })();
  }
  getDataAsync = async () => {
    axios({
      method: "get",
      url: "/post/postsorted/"+this.state.user.idUser,
      data: {
      }
    })
      .then(result => {
        this.setState({
          posts: result.data  ? result.data : [],
          refreshing:false,
          loading:false
        });
        //console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  };
  handleRefresh=()=>{
    this.setState({
      refreshing:true
    },
    ()=>{
      this.getDataAsync();
    }
    )
  };
  checkEdit=(author)=>{
    if(author===this.state.user.idUser){
      return true;
    }
    return false;
  };
  
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        {
          this.state.loading?
          <ActivityIndicator size="large" color="white" />
          :
          <FlatList
            onScroll={this.handleScroll} scrollEventThrottle={16}
            data={this.state.posts}
            renderItem={({ item }) => (
              <ListItem
                userId={this.state.user.idUser}
                post={item}
                canEdit={this.checkEdit(item.author_id)}
                switchRecipeScreen={() => navigation.navigate("Recipe",{post: item,userId:this.state.user.idUser})}
                switchEditScreen={() => navigation.navigate("EditRecipe",{post: item, edit: true})}
                isLiked={item.isLiked}
                isSaved={item.isSaved}
                handleRefresh={this.handleRefresh}
              />
            )}
            keyExtractor={item => item._id}
            onRefresh={()=>this.handleRefresh()}
            refreshing={this.state.refreshing}
          />
            }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 35,
    paddingBottom: 20,

    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#ffcdd2",
    paddingLeft: 10,
    paddingRight: 10

    // backgroundColor: '#fff',
  },
  postContainer: {
    paddingTop: 5,
    paddingRight: 5
  }
  // headerContainer: {
  //   // paddingTop: 5,
  //   marginTop: 40
  //   // marginBottom: 5,
  // },
  // imgContainer: {
  //   flex: 2,
  //   alignSelf: "stretch",
  //   borderRadius: 50,
  //   paddingBottom: 5
  // },
  // avtImage: {
  //   height: hp("8%"),
  //   width: hp("8%"),
  //   borderRadius: 50
  // },
  // button: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: wp("55%"),
  //   backgroundColor: "#830707",
  //   borderRadius: 25,
  //   marginBottom: 10,
  //   height: hp("5%")
  // },
  // updatebtnContainer: {
  //   flex: 4,
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
  // buttonText: {
  //   fontSize: theme.SIZES.BASE,
  //   fontWeight: "500",
  //   textAlign: "center",
  //   color: "#FFF"
  // },
  // uploadImg: {
  //   height: hp("3%"),
  //   width: wp("5%")
  // }
});
