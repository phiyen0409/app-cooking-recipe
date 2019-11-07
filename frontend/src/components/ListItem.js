import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert} from "react-native";
import { Block, Icon } from "galio-framework";
import Im from "../../assets/Image/suonxaochuangot.jpg";
import { red } from "ansi-colors";
import LikeImage from "../../assets/Image/Interact/like.png";
import CommentImage from "../../assets/Image/Interact/comment.png";
import SaveImage from "../../assets/Image/Interact/save.png";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default function ListItem(props) {
  const {onPress} = props;
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
              <Image style={styles.image} source={Im} />
            </View>

            <View style={styles.viewContent}>
              <View style={styles.viewTitle}>
                <Text style={styles.title}>Sườn xào chua ngọtfghjkleefvfgtggsr</Text>
              </View>
              <View style={styles.author}>
              <FontAwesome name="user" size={12} color='#6E6E6E' />
                <Text style={styles.authorText}>
                  Yến cute
                </Text>
              </View>
              <Text style={styles.description}>
                ffbhgfdy jn ehf gfn wkvbnvm ffgfggh bfh fgb dvfhgj
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, flexDirection: "row"}}>
        <TouchableOpacity style={styles.button}>
          <Block style={styles.buttonBlock}>
            <Image style={styles.logoButton} source={LikeImage} />
            <Text style = {{fontSize: 6}}>345678</Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Block style={styles.buttonBlock}>
            <Image style={styles.logoButton} source={CommentImage} />
            <Text style = {{fontSize: 6}}>345678</Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Block style={styles.buttonBlock}>
            <Image style={styles.logoButton} source={SaveImage} />
            <Text style = {{fontSize: 6}}>345678</Text>
          </Block>
        </TouchableOpacity>
      </View>
    </View>
  );
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
    width: '95%',
    height: 64,
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
