import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import IntroItem from "../components/IntroItem";
import IngredientListItem from "../components/IngredientListItem";
import theme from "../../constant/theme";
import { Block, Icon } from "galio-framework";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Process from "../components/Process";

export default class RecipeScreen extends React.Component {
//   static navigationOptions = {
//     header: null
//   };
  render() {
    return (
      <View style={styles.container}>
        {/* <View> */}
        <ScrollView>
          <View style={styles.postContainer}>
            <IntroItem />
          </View>
          <View style={styles.postContainer}>
            {/* <ScrollView > */}
            <IngredientListItem />
            {/* </ScrollView> */}
          </View>
          <View style={styles.postContainer}>
            <Process />
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
    justifyContent: "center"
    // paddingTop: 20,
    // paddingBottom: 70,
  },

  postContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    margin: 1,
  }
});
