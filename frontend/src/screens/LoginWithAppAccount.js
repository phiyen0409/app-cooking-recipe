import React from 'react';
import{Text, View, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native';
import LogoImage from "../../assets/Image/logo2.png";
import {Actions} from 'react-native-router-flux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class LoginWithAppAccount extends React.Component{
    constructor(props){
        super(props);
    }

    signup(){
      Actions.signup()
    }

    render(){
        return(
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraHeight={200}
            extraScrollHeight={200}
          >
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={LogoImage} />
              </View>
              <View style={styles.inputContainer}>
                <View style = {styles.input}>
                  <TextInput
                    style={styles.inputText}
                    placeholder = "User name"
                    placeholderTextColor = "#AAAAAA"
                  >
                  </TextInput>
                </View>
                
                <View style = {styles.input}>
                  <TextInput
                    style={styles.inputText}
                    // underlineColorAndroid = 'rgba(0,255,255,1)'
                    placeholder = "Password"
                    placeholderTextColor = "#AAAAAA"
                    secureTextEntry={true}
                  >
                  </TextInput>
                </View>
                <TouchableOpacity style={styles.button}>
                  <Text style={{fontSize: 18, color: '#7f0000', fontWeight: "700", textAlign: 'center'}}>
                    Đăng nhập{" "}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style = {styles.signupTextContent}>
                <Text style = {styles.signupText}>Bạn chưa có tài khoản? {' '}</Text>
                <TouchableOpacity 
                  onPress = {this.signup}>
                  <Text style = {styles.signupButton}>Đăng ký</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create( {
    container:{
      flex: 1,
      backgroundColor: "#830707",
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    logoContainer: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
        // marginVertical: 20
      },
      logo: {
        height: 300,
        width: 300
      },
      inputContainer: {
        flex: 2,
        flexDirection: 'column',
        // justifyContent: "flex-start",
        alignItems: 'center'
      },
      input: {
        width: 300,
        backgroundColor: "#fff",
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 10,
        height: 50
      },
      inputText: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "left",
        color: "gray",
        // backgroundColor: 'gray'
      },
      button: {
        width: 300,
        backgroundColor: "#ffa4a2",
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 10,
        height: 50
      },
      signupTextContent:{
          flexGrow: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginVertical: 16
      },
      signupText:{
          color: '#CCCCCC',
          fontSize: 16,
          fontWeight: '500',

      },
      signupButton:{
          color: 'orange',
          fontSize: 16,
          fontWeight: '500'
      }
    });
