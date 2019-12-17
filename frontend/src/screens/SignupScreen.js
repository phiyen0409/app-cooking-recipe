import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import LogoImage from "../../assets/Image/logo2.png";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Form, TextValidator } from "react-native-validator-form";
import axios from "axios";

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      phone: "",
      birthday: "",
      password: "",
      repeatPassword: ""
    };
  }
  componentWillMount() {
    // custom rule will have name 'isPasswordMatch'
    Form.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    Form.removeValidationRule("isPasswordMatch");
  }
  handleMailChange = email => {
    this.setState({ email });
  };
  handleNameChange = name => {
    this.setState({ name });
  };
  handleBirthdayChange = birthday => {
    this.setState({ birthday });
  };
  handlePhoneChange = phone => {
    this.setState({ phone });
  };
  handlePassword = event => {
    let { password } = this.state;
    password = event.nativeEvent.text;
    this.setState({ password });
  };

  handleRepeatPassword = event => {
    let { repeatPassword } = this.state;
    repeatPassword = event.nativeEvent.text;
    this.setState({ repeatPassword });
  };

  submit = () => {
    axios({
      method: "post",
      url: "/user/create",
      data: {
        email: this.state.email,
        name: this.state.name,
        phone: this.state.phone,
        birthday: this.state.birthday,
        password: this.state.password
      }
    })
      .then(res => {
        Alert.alert("Đăng kí thành công");
        this.setState({
          email: "",
      name: "",
      phone: "",
      birthday: "",
      password: "",
      repeatPassword: ""
        })
        this.signIn();
      })
      .catch(error => {
        Alert.alert(error.response.data.message);
      });
  };

  handleSubmit = () => {
    this.refs.form.submit();
  };
  signIn = () => {
    this.props.navigation.navigate("Login");
  };
  static navigationOptions = {
    header: null
  };
  render() {
    const { email } = this.state;
    const { name } = this.state;
    const { phone } = this.state;
    const { birthday } = this.state;
    const { password } = this.state;
    const { repeatPassword } = this.state;
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraHeight={100}
        extraScrollHeight={100}
        style={{backgroundColor:"#830707"}}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={LogoImage} />
          </View>
          <Form
            style={styles.inputContainer}
            ref="form"
            onSubmit={this.submit}
          >
            <View style={styles.input}>
              <TextValidator
                style={styles.inputText}
                name="email"
                label="email"
                validators={["required", "isEmail"]}
                errorMessages={["Chưa nhập email", "Email không đúng"]}
                placeholder="Email"
                type="text"
                keyboardType="email-address"
                value={email}
                onChangeText={this.handleMailChange}
              />
            </View>

            <View style={styles.input}>
              <TextValidator
                style={styles.inputText}
                name="name"
                label="name"
                validators={["required"]}
                errorMessages={["Tên không được để trống"]}
                placeholder="Tên tài khoản"
                type="text"
                value={name}
                onChangeText={this.handleNameChange}
              />
            </View>

            <View style={styles.input}>
              <TextValidator
                style={styles.inputText}
                name="phone"
                label="phone"
                validators={["isNumber"]}
                errorMessages={["Số điện thoại không đúng"]}
                placeholder="Số điện thoại"
                type="text"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={this.handlePhoneChange}
              />
            </View>

            <View style={styles.input}>
              <TextValidator
                style={styles.inputText}
                name="birthday"
                label="birthday"
                placeholder="Ngày sinh"
                type="text"
                value={birthday}
                onChangeText={this.handleBirthdayChange}
              />
            </View>

            <View style={styles.input}>
              <TextValidator
                style={styles.inputText}
                name="password"
                label="text"
                secureTextEntry
                placeholder="Mật khẩu"
                validators={["required"]}
                errorMessages={["Chưa nhập mật khẩu"]}
                type="text"
                value={password}
                onChange={this.handlePassword}
              />
            </View>

            <View style={styles.input}>
              <TextValidator
                style={styles.inputText}
                name="password"
                label="text"
                secureTextEntry
                placeholder="Nhập lại password"
                validators={["isPasswordMatch", "required"]}
                errorMessages={[
                  "Mật khẩu không khớp",
                  "Chưa nhập mật khẩu"
                ]}
                type="text"
                value={repeatPassword}
                onChange={this.handleRepeatPassword}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#7f0000",
                  fontWeight: "700",
                  textAlign: "center"
                }}
              >
                Đăng ký{" "}
              </Text>
            </TouchableOpacity>
          </Form>
          <View style={styles.signupTextContent}>
            <Text style={styles.signupText}>Bạn đã có tài khoản? </Text>
            <TouchableOpacity onPress={this.signIn}>
              <Text style={styles.signupButton}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
       </KeyboardAwareScrollView>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom:10
  },
  logo: {
    height: 120,
    width: 120
  },
  inputContainer: {
    flex: 4,
    flexDirection: "column",
    // justifyContent: "flex-start",
    alignItems: "center"
  },
  input: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 25,
    marginVertical: 10,
    // paddingBottom: 5,
    // paddingTop:2,
    paddingHorizontal: 20,
    marginBottom: 10,
    //height: 50
  },
  inputText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "left",
    color: "gray",
    height:40,
    flexDirection:"column",
    marginVertical:10
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
  }
});
