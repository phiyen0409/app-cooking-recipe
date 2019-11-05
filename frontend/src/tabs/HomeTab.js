import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ListItem from "../components/ListItem";
import AvatarImage from "../../assets/Image/avatar.png";
import theme from "../../constant/theme";
import uploadImage from "../../assets/Image/blog.png";

export default class HomeTab extends React.Component {
    static navigationOptions = {
        header: null
      };
  render() {  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.imgContainer}>
          <Image style={styles.avtImage} source={AvatarImage} resizeMode='cover'></Image>
          </View>
          <View style={styles.updatebtnContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>
                Đăng công thức{"  "}
                <Image style={styles.uploadImg} source={uploadImage} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{paddingBottom: 30}}>
        <ScrollView contentContainerStyle={styles.postContainer}>
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </ScrollView>
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 40,
    paddingBottom: 40,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: '#ffebee',
    paddingLeft: 10,
    paddingRight: 10,
    
    // backgroundColor: '#fff',
  },
  postContainer: {
    paddingTop: 5,
  },
  headerContainer: {
    // paddingTop: 5,
    marginTop: 40,
    // marginBottom: 5,
  },
  imgContainer:{
    flex: 2,
    alignSelf:'stretch',
    borderRadius: 50,
    paddingBottom: 5
  },
  avtImage: {
    height: hp('15%'),
    width: hp('15%'),
    borderRadius: 50,
  },
  button: {
    justifyContent: 'center',
    width: wp('55%'),
    backgroundColor: "#830707",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    marginBottom: 10,
    height: hp('7%')
  },
  updatebtnContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent:'center'
  },
  buttonText: {
    fontSize: theme.SIZES.BASE,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFF"
  },
  uploadImg: {
    height: hp('5%'),
    width: wp('8%')
  }
});
