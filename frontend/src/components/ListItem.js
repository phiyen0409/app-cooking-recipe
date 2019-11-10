import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert,Animated,} from "react-native";
import { Block, Icon } from "galio-framework";
import Im from "../../assets/Image/suonxaochuangot.jpg";
import { red } from "ansi-colors";
import LikeImage from "../../assets/Image/Interact/like.png";
import CommentImage from "../../assets/Image/Interact/comment.png";
import SaveImage from "../../assets/Image/Interact/save.png";
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";

export default class ListItem extends React.Component {
  springValueLike = new Animated.Value(1);
  springValueSave=new Animated.Value(1);

  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      saved: false,
    };
  }
  springLike() {
    axios({
      method: "put",
      url: "post/updatelike/"+this.props.post._id,
      data: {
        userId: this.props.userId,
      }
    })
    .then(result => {
    })
    .catch(error => {
      Alert.alert(error);
      this.setState(state => {
        return {
          liked: !this.state.liked,
        };
      });
    });
    this.setState(state => {
      return {
        liked: !this.state.liked,
      };
    });
    if (!this.state.liked) {
      this.springValueLike.setValue(0);
      Animated.spring(this.springValueLike, {
        toValue: 1,
        friction: 0.5,
      }).start();
    } else {
      this.springValueLike.setValue(0.5);
      Animated.spring(this.springValueLike, {
        toValue: 1,
        friction: 2,
      }).start();
    }
  }
  springSave() {
    axios({
      method: "put",
      url: "user/savepost/"+this.props.userId,
      data: {
        postId: this.props.post._id,
      }
    })
    .then(result => {
    })
    .catch(error => {
      Alert.alert(error);
      this.setState(state => {
        return {
          liked: !this.state.liked,
        };
      });
    });
    this.setState(state => {
      return {
        liked: !this.state.liked,
      };
    });
    this.setState(state => {
      return {
        saved: !this.state.saved,
      };
    });
    if (!this.state.saved) {
      this.springValueSave.setValue(0);
      Animated.spring(this.springValueSave, {
        toValue: 1,
        friction: 0.5,
      }).start();
    } else {
      this.springValueSave.setValue(0.5);
      Animated.spring(this.springValueSave, {
        toValue: 1,
        friction: 2,
      }).start();
    }
    
  }
  render(){
  const {onPress} = this.props;
  const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);
  const AnimatedFontaws = Animated.createAnimatedComponent(FontAwesome);
  const post = this.props.post;
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 4,
            width:'100%',
            borderBottomColor: "#830707",
            borderBottomWidth: 1
          }}
        >
          <TouchableOpacity style={{width: '100%', height:'100%'}} onPress={onPress}>
            <View style={{flexDirection:'row'}}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={post.image ? {uri: post.image} : Im} />
              </View>
  
              <View style={styles.viewContent}>
                <View style={styles.viewTitle}>
                  <Text style={styles.title}>{post.title}</Text>
                </View>
                <View style={styles.author}>
                <FontAwesome name="user" size={12} color='#6E6E6E' />
                  <Text style={styles.authorText}>
                    {post.author}
                  </Text>
                </View>
                <Text style={styles.description}>
                  {post.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
  
        <View style={{ flex: 1, flexDirection: "row"}}>
          <TouchableOpacity style={styles.button} onPress={this.springLike.bind(this)}>
            <Block style={styles.buttonBlock}>
            <AnimatedIcon
                        name="heart"
                        size={30}
                        style={{transform: [{scale: this.springValueLike}]}}
                        color={this.state.liked ? '#830707' : '#A4A4A4'}
                      />
              <Text style = {{fontSize: 6}}>{post.totalLike>0 ? post.totalLike: ''}</Text>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Block style={styles.buttonBlock}>
              <MaterialIcons name='comment' size={30} color='#A4A4A4'/>
              <Text style = {{fontSize: 6}}>{post.totalComment>0 ? post.totalComment: ''}</Text>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.springSave.bind(this)}> 
            <Block style={styles.buttonBlock}>
              <AnimatedFontaws name="bookmark"
                        size={30}
                        style={{transform: [{scale: this.springValueSave}]}}
                        color={this.state.saved ? '#830707' : '#A4A4A4'} />
              <Text style = {{fontSize: 6}}>{post.totalSaved>0 ? post.totalSaved: ''}</Text>
            </Block>
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
    alignItems: "center",
    // height: hp('20%'),

    padding: 15,
    // borderTopLeftRadius: 40,
    // borderBottomRightRadius: 40,
    backgroundColor: "#fff",
    shadowColor: "#830707",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    marginBottom: 10,
    borderRadius: 25
  },

  viewContent: {
    flex: 2,
    flexDirection: "column",
    alignItems: "baseline",
    justifyContent: "space-around",
    padding: 5,
    height: '100%',
  },

  viewTitle: {
    flex: 2,
    // maxHeight: 30,
    paddingTop: 0,
  },

  imageContainer: {
    flex: 1,
    height: "100%",
    // paddingLeft: 64,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: '100%',
    height: 64,
    borderRadius:12

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
  author:{
    flex: 1,
    flexDirection: 'row',
    marginLeft: 15,
  },
  authorText:{
    color: '#6E6E6E',
    fontSize: 12,
    marginLeft: 2
  },
  description: {
    flex: 4,
    marginBottom: 8,
    marginTop: 5,
    paddingBottom: 2,
    fontWeight: "300",
    marginLeft: 10,
    // marginRight: 15,
  },

  button: {
    flex: 1,
    // backgroundColor: "#b71c1c",
    margin: 5,
    // paddingTop: 10
    //borderRadius: 4,
    // borderLeftWidth: 0.5,
    // borderLeftColor: 'red'
  },
  buttonBlock: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center", 
  },
  logoButton: {
    width: 25,
    height: 25, 
  }
});
