import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import theme from "../../constant/theme";
import Im from "../../assets/Image/suonxaochuangot.jpg"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

  export default function Step(props){
    const {step} = props;
    return(
        <View style={styles.container}>
            <View style = {{flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: "#830707", height: '100%', marginTop: 15}}>
                <Text style = {styles.title}>
                    Buoc
                </Text>
                <Text style = {{textAlign: "left", fontWeight: "400", color: "#8e1e20"}}>{step.id}:</Text>
                <Text style = {{paddingLeft: 5, paddingRight: 5, fontWeight: "400", color: "#8e1e20"}}>{step.title}</Text>

            </View>
            <View style = {{flex: 1,flexDirection: 'column', borderWidth: 1, borderColor: "#ffebee", borderBottomRightRadius:4, borderBottomLeftRadius:4, borderTopWidth: 0, margin:5, paddingRight: 5, height : '100%'}}>
                <View style = {styles.imageContainer}>
                    <Image style={styles.image} source={Im}/>
                </View>
                
                <View style = {{height: '100%', margin: 5,padding: 5,}}>
                    <Text>{step.data}</Text>
                </View>
            </View>
        </View>
          
    );
}

  const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        // alignItems: "center",
        backgroundColor: '#fff',
        height: '100%',
    },
    title: {
        textAlign: 'left',
        textTransform: 'capitalize',
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        alignContent: "center",
        fontWeight: "400",
        color: "#8e1e20"
        
    },
    imageContainer: {
        flex: 1,
        flexDirection: "row",
        // height: "100%",
        // paddingLeft: 64,
        alignItems: "center",
        justifyContent: "center",
      },
      image: {
        width: '40%',
        height: 75,
        margin:5,
      },

});