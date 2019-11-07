import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert} from "react-native";
// import flatlistIngredient from '../Data/flatlistIngredient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

// export default class IngredientItem extends component {
export default function IngredientItem(props) {
    
  // const {onPress} = props;
  const {ingredient} = props;
  // reder(){
  return (
    <View style={styles.container}>
       <View
            style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            width:'100%',
            borderBottomColor: "#830707",
            borderBottomWidth: 1,
            // backgroundColor: this.props.index %2 == 0? 'white':'#ECECEC'
            }}
        >
            {/* <View style = {{flex: 4, height: '100%'}}>
                <Text style = {{textAlign: "left", height : '100%', margin: 5, marginBottom: 2}}>{this.props.item.name}</Text>
            </View>
            <View style = {{flex: 1, height: '100%'}}>
                <Text style = {{textAlign: "right", height : '100%', margin: 5, marginBottom: 2}}>{this.props.item.weight}</Text>
            </View> */}
            <View style = {{flex: 4, height: '100%'}}>
                <Text style = {{textAlign: "left", height : '100%', margin: 5, marginBottom: 2}}>{ingredient.name}</Text>
            </View>
            <View style = {{flex: 1, height: '100%'}}>
                <Text style = {{textAlign: "right", height : '100%', margin: 5, marginBottom: 2}}>{ingredient.data}</Text>
            </View>

        </View>
    </View>)}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      padding: 5,
      backgroundColor: "#fff",
      shadowColor: "#830707",
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 0 },
      marginBottom: 10,
      borderRadius: 25
    }
})