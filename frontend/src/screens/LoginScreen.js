import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  AsyncStorage
} from "react-native";
import LogoImage from "../../assets/Image/logo2.png";
import googleImage from "../../assets/Image/google.png";
import fbImage from "../../assets/Image/facebook.png";
import * as Google from "expo-google-app-auth";
import axios from "axios";

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      idUser: "",
      signedIn: false,
      name: "",
      photoUrl: "",
      accessToken: ""
    };
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "571499657697-49c2itiusn5n0k4g41svfckd80d3p78s.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        alert(result.user.email);
        axios({
          method: "post",
          url: "/user/login",
          data: {
            user: result.user,
            accessToken: result.accessToken
          }
        })
          .then(res => {
            let user = res.data;
            this.setState({
              idUser: user._id,
              signedIn: true,
              name: user.name,
              email: user.email,
              avatar: user.avatar
              //accessToken: user.accessToken,
            });

            AsyncStorage.setItem("@auth", JSON.stringify(this.state)).then(
              result => {
                const { navigation } = this.props;
                navigation.navigate("Home");
              }
            );
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log(e);
    }
  };
  _getUserLogin = async () => {
    try {
      const value = await AsyncStorage.getItem("@auth");
      if (value !== null) {
        // We have data!!
        const { navigation } = this.props;
        navigation.navigate("Home");
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  componentDidMount() {
    //this._getUserLogin();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={LogoImage} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.signInWithGoogleAsync}
          >
            <Text style={styles.buttonText}>
              Đăng nhập bằng Google{" "}
              <Image style={styles.socialLogo} source={googleImage} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Đăng nhập bằng Facebook{" "}
              <Image style={styles.socialLogo} source={fbImage} />
            </Text>
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  logoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    height: 400,
    width: 400
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-start"
  },
  button: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    marginBottom: 10,
    height: 50
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#830707"
  },
  socialLogo: {
    height: 20,
    width: 20
  }
});

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button
        title="Sign in with Google"
        onPress={() => props.signInWithGoogle()}
      />
    </View>
  );
};

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  );
};
export default LoginScreen;
