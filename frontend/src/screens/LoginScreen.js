import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import LogoImage from "../../assets/Image/logo2.png";
import googleImage from "../../assets/Image/google.png"
import fbImage from "../../assets/Image/facebook.png"

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={LogoImage} />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign in with Google  <Image style={styles.socialLogo} source={googleImage}/></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign in with Facebook  <Image style={styles.socialLogo} source={fbImage}/></Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#830707",
    width: '100%',
    justifyContent: 'center',
    alignItems:"center"
  },
  logoContainer:{
    flex:2,
    justifyContent: "center",
    alignItems:"center"
  },
  logo: {
    height: 400,
    width: 400
  },
  buttonContainer: {
    flex:1,
    justifyContent: "flex-start",
  },
  button:{
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical:12,
    marginBottom: 10,
    height: 50
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: 'center',
    color: "#830707"
  },
  socialLogo: {
      height: 20,
      width:20
  }
});
export default LoginScreen;
