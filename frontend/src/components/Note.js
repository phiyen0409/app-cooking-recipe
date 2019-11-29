import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert, CheckBox} from "react-native";
// import flatlistIngredient from '../Data/flatlistIngredient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

// export default class IngredientItem extends component {
export default class Note extends React.Component {
  constructor(){
    super();
    this.state = {
      check: false,
      ingre:this.props.ingre
    }
  }

  checkBox(){
    this.setState({
      check:!this.state.check
    })
  }
  
  render(){
    const {ingre}=this.state;
  return (
    <View style={styles.container}>
       <View
            style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            width:'100%',
            // height: '100%',
            borderBottomColor: "#830707",
            borderBottomWidth: 1,
            // backgroundColor: this.props.index %2 == 0? 'white':'#ECECEC'
            }}
        >
            <View style = {{flex: 4, height: '100%', padding: 2}}>
                <Text style = {{textAlign: "left", height : '100%'}}>{ingre.ingreName}</Text>
            </View>
            <View style = {{flex: 2, height: '100%', padding: 2}}>
          <Text style = {{textAlign: "right", height : '100%'}}>{ingre.ingreWeight}</Text>
            </View>
            <View style = {{flex: 1, padding: 2, alignItems: 'center'}}>
                <CheckBox value = {this.state.check} onChange = {() => this.checkBox()} style = {{flex: 1, height: '100%'}}></CheckBox>
            </View>

        </View>
    </View>)}}

const styles = StyleSheet.create({
    container: {
      // height: '100%',
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
      // borderRadius: 25,
      margin: 10,
    }
})