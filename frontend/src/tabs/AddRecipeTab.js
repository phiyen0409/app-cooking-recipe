import React from "react";
import {
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import IntroItem from "../components/IntroItem";
import IngredientItem from '../components/IngredientItem';
import theme from "../../constant/theme";
import { Block, Icon, Button } from "galio-framework";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Process from "../components/Process";
import Comment from "../components/Comment";
import AddIntro from "../components/AddIntro";
import AddIngredient from "../components/AddIngredient";
import AddProcess from "../components/AddProcess";

export default class AddRecipeScreen extends React.Component {
    
    render() {
        return (
          <View style={styles.container}>
            {/* <View> */}
            <ScrollView>
              <View style={styles.postContainer}>
                <AddIntro/>
              </View>
              <View style={styles.postContainer}>
                {/* <ScrollView > */}
                <AddIngredient/>
                {/* </ScrollView> */}
              </View>
              <View style={styles.postContainer}>
                <AddProcess/>
              </View>
            </ScrollView>
            {/* </View> */}
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        alignItems: "stretch",
        // width: wp('100%'),
        justifyContent: "center",
        // paddingLeft: 20,
        // paddingBottom: 70,
    },

    postContainer: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
    },
});

