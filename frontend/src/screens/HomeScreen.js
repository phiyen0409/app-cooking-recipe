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
import ListItem from "../components/ListItem";
import AvatarImage from "../../assets/Image/avatar.png";
import theme from "../../constant/theme";
import { Block, Icon } from "galio-framework";
import uploadImage from "../../assets/Image/blog.png";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row" }}>
          <Image style={styles.avtImage} source={AvatarImage}></Image>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 40,
    paddingBottom: 70,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
    // backgroundColor: '#fff',
  },
  postContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerContainer: {
    paddingTop: 30,
    marginTop: 40,
    marginBottom: 10
  },
  avtImage: {
    flex: 2,
    width: theme.SIZES.BASE,
    height: theme.SIZES.BASE * 5,
    marginVertical: 10,
    paddingVertical: 12,
  },
  button: {
    justifyContent: 'center',
    width: theme.SIZES.BASE*12,
    backgroundColor: "#830707",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    marginBottom: 10,
    height: theme.SIZES.BASE*2.5
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
    height: 20,
    width: 20
  }
});
