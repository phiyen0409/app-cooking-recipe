import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions
} from "react-native";
import { Block, Text} from "galio-framework";
import { FontAwesome, AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import backgroundImg from "../../assets/Image/background.jpg";
import avatarImg from "../../assets/Image/avatar.png";
import recipeButton from '../../assets/Image/blog.png'
import savedButton from '../../assets/Image/Personal/bookmark.png'
import noteButton from '../../assets/Image/Personal/note.png'
import editProButton from '../../assets/Image/Personal/editpro.png'
import ListItem from "../components/ListItem";
const { width, height } = Dimensions.get("screen");
export default class PersonalTab extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImg}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <ScrollView showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '15%' }}>
          <View style={styles.cardView}>
            <Block middle style={styles.avatarContainer}>
              <Image source={avatarImg} style={styles.avatar} />
            </Block>
            <Block style={styles.info}>
              <Block middle style={styles.nameInfo}>
                <Text bold size={24} color="#830707">
                  Yến dễ thương!
                </Text>
              </Block>
              <Block style={{marginBottom: 15}}>
                <Block style={styles.infoDetail}>
                {/* <Text style={styles.textInfoDetail}>
                  Yêu màu hồng, thích màu tím, ghét sự giả dối
                </Text> */}
                <Block row>
                  <Ionicons name='md-mail' style={styles.iconProfile}/>
                  <Text style={styles.textInfoDetail}>
                      nguyenphiyen1998@gmail.com
                  </Text>
                </Block>
                <Block row>
                  <FontAwesome name='birthday-cake' style={styles.iconProfile}/>
                  <Text style={styles.textInfoDetail}>
                      04/09/1998
                  </Text>
                </Block>
                <Block row>
                  <Entypo name='phone' style={styles.iconProfile}/>
                  <Text style={styles.textInfoDetail}>
                      0376789444
                  </Text>
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
                  <TouchableOpacity>
                    <View style={styles.buttonBlock}>
                    <Image source={editProButton} style={styles.imgButton}/>
                  </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={styles.buttonBlock}>
                    <Image source={noteButton} style={styles.imgButton}/>
                  </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={styles.buttonBlock}>
                    <Image source={savedButton} style={styles.imgButton}/>
                  </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.recipesContainer}>
                  <Text style={styles.recipesTitle}>
                    Công thức
                  </Text>
                  <Block middle style={{ marginTop: 12, marginBottom: 16 }}>
                <Block style={styles.divider} />
              </Block>
              <View style={styles.listRecipes}>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>

              </View>
                  </View>       
          </View>
          </ScrollView>
        </ImageBackground>
        
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
    opacity: .8
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
    zIndex: 2,
    //height: height / 1.8
  },
  info: {
    paddingHorizontal: 40,
    marginTop: 20
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    height: 50,
    padding: 0
  },
  infoDetail:{
    alignItems:'center',
    justifyContent:'center'
  },
  textInfoDetail:{
    size: 10,
    color:'#585858'
  },
  iconProfile:{
    color:'#585858',
    // height: 10,
    // width: 10,
    size:10,
    marginRight: 5
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  buttonView:{
    width: '100%',
    height: 200,
    justifyContent:'center',
    alignItems: 'center',
    alignContent:'space-between'
  },
  buttonContainer:{
    height: '100%',
    width:'100%',
  },
  // buttonBlock:{
  //   flex:1,
  //   alignContent:'center',
  //   alignItems:'center',
  //   flexDirection: 'row',
  //   borderBottomColor: "#E9ECEF",
  //   borderBottomWidth:1
  // },
  buttonBlock:{
    flex:1,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal: 10
  },
  imgButton:{
    height:25,
    width: 25,
  },
  buttonGroup:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center'

  },
  recipesContainer:{
    marginTop: 20
  },
  recipesTitle:{
    textTransform:'uppercase',
    fontWeight: 'bold',
    size: 18,
    marginLeft: 15,
    color: '#830707',
    
  },
});
