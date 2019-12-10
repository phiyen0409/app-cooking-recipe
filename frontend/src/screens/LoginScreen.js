import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  AsyncStorage,
  TextInput,
  Alert
} from "react-native";
import LogoImage from "../../assets/Image/logo2.png";
import googleImage from "../../assets/Image/google.png";
import fbImage from "../../assets/Image/facebook.png";
import * as Google from "expo-google-app-auth";
import axios from "axios";
import { Form, TextValidator } from "react-native-validator-form";

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
      accessToken: "",
      email: "",
      password: ""
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
  signUp = () => {
    this.props.navigation.navigate("Signup");
  };
  handlePassword = event => {
    let { password } = this.state;
    password = event.nativeEvent.text;
    this.setState({ password });
  };
  handleMailChange = email => {
    this.setState({ email });
  };
  submit = () => {
    axios({
      method: "post",
      url: "/user/login/app",
      data: {
        email: this.state.email,
        password: this.state.password
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
        })

        AsyncStorage.setItem("@auth", JSON.stringify(this.state)).then(
          result => {
            const { navigation } = this.props;
            navigation.navigate("Home");
          }
        );
      })
      .catch((error) => {
        Alert.alert(error.response.data.message);
      });
  };

  handleSubmit = () => {
    this.refs.form.submit();
  };
  render() {
    const { email } = this.state;
    const { password } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={LogoImage} />
        </View>
        <Form style={styles.inputContainer} ref="form" onSubmit={this.submit}>
          <View style={styles.input}>
            <TextValidator
              style={styles.inputText}
              name="email"
              label="email"
              validators={["required", "isEmail"]}
              errorMessages={["Email is required", "Email invalid"]}
              placeholder="Your email"
              type="text"
              keyboardType="email-address"
              value={email}
              onChangeText={this.handleMailChange}
            />
          </View>
          <View style={styles.input}>
            <TextValidator
              style={styles.inputText}
              name="password"
              label="text"
              secureTextEntry
              placeholder="Password"
              validators={["required"]}
              errorMessages={["Password is required"]}
              type="text"
              value={password}
              onChange={this.handlePassword}
            />
          </View>
        </Form>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.handleSubmit}
            style={styles.buttonLogin}
          >
            <Text style={styles.buttonTextLogin}>Đăng nhập </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.signInWithGoogleAsync}
          >
            <Text style={styles.buttonText}>
              Đăng nhập bằng Google{" "}
              <Image style={styles.socialLogo} source={googleImage} />
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Đăng nhập bằng Facebook{" "}
              <Image style={styles.socialLogo} source={fbImage} />
            </Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.signupTextContent}>
          <Text style={styles.signupText}>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={this.signUp}>
            <Text style={styles.signupButton}>Đăng ký</Text>
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
  buttonLogin: {
    width: 300,
    backgroundColor: "#ffa4a2",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    height: 50
  },
  buttonTextLogin: {
    fontSize: 18,
    color: "#7f0000",
    fontWeight: "700",
    textAlign: "center"
  },
  socialLogo: {
    height: 20,
    width: 20
  },
  signupTextContent: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginVertical: 16
  },
  signupText: {
    color: "#CCCCCC",
    fontSize: 16,
    fontWeight: "500"
  },
  signupButton: {
    color: "orange",
    fontSize: 16,
    fontWeight: "500"
  },
  inputContainer: {
    flex: 2,
    flexDirection: "column",
    // justifyContent: "flex-start",
    alignItems: "center"
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
    color: "gray"
    // backgroundColor: 'gray'
  }
});
export default LoginScreen;
