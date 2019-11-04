import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import theme from "../../constant/theme";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

  export default function Step(){
    return(
        <View>
            <View>
                <Text style = {styles.title}>
                    
                </Text>

            </View>
            <View>

            </View>
        </View>
          
    );
}

  const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#fff',
        height: theme.SIZES.BASE *15,
    },
    title: {
        textAlign: 'center',
        textTransform: "uppercase",
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
        alignContent: "center",
        
    },

});