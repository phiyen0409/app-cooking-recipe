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
import IntroItem from "../components/IntroItem";
import AvatarImage from "../../assets/Image/avatar.png";
import theme from "../../constant/theme";
import { Block, Icon } from "galio-framework";
import uploadImage from "../../assets/Image/blog.png";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default function HomeScreen() {
    return (
        <View style = {styles.container}>
          <ScrollView>
            <View style = {{margin: 2, padding: 5}}>
                <IntroItem/>
            </View>
            <View style = {{margin: 5}}>
                <IntroItem/>
            </View>
            {/*<View style = {{margin: 5}}>
                <IntroItem/>
            </View> */}
        </ScrollView></View>
    );}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        // paddingTop: 40,
        // paddingBottom: 70,
        flex: 1,
        alignItems: "center",
        width: wp('100%'),
    },
    // contentView:{
        
    // }
});