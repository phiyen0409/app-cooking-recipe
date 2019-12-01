import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
// import flatlistIngredient from '../Data/flatlistIngredient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default function IngredientItem(props) {
  const { ingredient } = props;
  return (
    <View style={styles.container}>
      <View style={styles.ingredientName}>
        <Text style={styles.ingredientNameText}>{ingredient.name}</Text>
      </View>
      <View style={styles.ingredientWeight}>
        <Text style={styles.ingredientWeightText}>{ingredient.weight}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "rgba(131, 7, 7, 0.2)",
    borderBottomWidth: 1,
    paddingVertical: 3,
    height: 40,
    marginVertical: 3,
    backgroundColor: "#FFF"
  },
  ingredientName: {
    flex: 4,
    height: "100%",
    alignContent: "flex-end"
  },
  ingredientNameText: {
    textAlign: "left",
    height: "100%",
    marginHorizontal: 5,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 10
  },
  ingredientWeight: {
    flex: 2,
    height: "100%"
  },
  ingredientWeightText: {
    textAlign: "right",
    height: "100%",
    marginHorizontal: 5,
    color: "rgba(0, 0, 0, 0.3)"
  }
});
