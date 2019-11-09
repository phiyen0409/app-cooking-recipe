import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import theme from "../../constant/theme";
import { Block, Icon, Button } from "galio-framework";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import AddIntro from "../components/AddIntro";
import AddIngredient from "../components/AddIngredient";
import PlusImage from "../../assets/Image/plus.png";
import AddStep from "../components/AddStep";
import { Entypo } from "@expo/vector-icons";
import UploadImageModal from "../components/UploadImageModal";

export default class AddRecipeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleImageModal: true,
      name: "",
      description: "",
      image: "",
      processes: [
        {
          id: new Date().getMilliseconds(),
          step: 1,
          description: "",
          image: ""
        }
      ],
      ingredients: [
        {
          id: new Date().getMilliseconds(),
          name: "",
          weight: ""
        }
      ]
    };
  }
  openUploadImageModal = () => {
    this.setState({ visibleImageModal: true });
    console.log('====================================');
    console.log("Click");
    console.log('====================================');
  };
  addIngredient = () => {
    let { ingredients } = this.state;
    ingredients.push({
      id: new Date().getMilliseconds(),
      name: "",
      weight: ""
    });
    this.setState({ ingredients: ingredients });
  };
  addStep = () => {
    let { processes } = this.state;
    processes.push({
      id: new Date().getMilliseconds(),
      step: 2,
      name: "",
      weight: ""
    });
    this.setState({ processes: processes });
  };
  removeItemIngredient = id => {
    let { ingredients } = this.state;
    ingredients.splice(id, 1);
    this.setState({ ingredients: ingredients });
  };
  removeItemProcess = id => {
    let { processes } = this.state;
    processes.splice(id, 1);
    this.setState({ processes: processes });
  };
  render() {
    const { ingredients } = this.state;
    const { processes } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.postContainer}>
            <View style={styles.viewName}>
              <TextInput
                multiline={false}
                style={styles.title}
                placeholder="Tên món ăn"
                value={this.state.name}
                onChangeText={text => {
                  this.setState({ name: text });
                }}
              ></TextInput>
            </View>
            <View style={styles.viewImage}>
              <Image
                style={{ height: 150, width: 200, resizeMode: "center" }}
                source={require("../../assets/Image/placeholder.png")}
              />
              <TouchableOpacity onPress={this.openUploadImageModal} style={styles.updateImage}>
                <Entypo name="camera" size={30} color={"#000"} />
              </TouchableOpacity>
            </View>
            <View style={styles.viewDescription}>
              <TextInput
                multiline
                numberOfLines={4}
                value={this.state.description}
                onChangeText={text => {
                  this.setState({ description: text });
                }}
                //style={styles.description}
                placeholder="Mô tả"
              />
            </View>
            <UploadImageModal
              modalVisible={this.state.visibleImageModal}
              // callback={""}
            />
          </View>
          <View style={styles.listContainer}>
            <View style={styles.viewTitle}>
              <Text style={styles.textTitle}>Thành phần nguyên liệu</Text>
            </View>
            <View style={styles.viewListContent}>
              {ingredients.map((item, key) => {
                return (
                  <AddIngredient
                    key={key}
                    id={key}
                    name={item.name}
                    weight={item.weight}
                    removeItem={this.removeItemIngredient}
                  />
                );
              })}
            </View>
            <View>
              <TouchableOpacity
                style={styles.btnAddIngredient}
                onPress={this.addIngredient}
              >
                <Image style={styles.logoAddIngredient} source={PlusImage} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.viewTitle}>
              <Text style={styles.textTitle}>Quy trình thực hiện</Text>
            </View>
            <View style={styles.viewListContent}>
              {processes.map((item, key) => {
                return (
                  <AddStep
                    key={key}
                    id={key}
                    step={item.step}
                    title={item.title}
                    image={item.image}
                    description={item.description}
                    removeItem={this.removeItemProcess}
                  />
                );
              })}
            </View>
            <TouchableOpacity
              style={styles.btnAddIngredient}
              onPress={this.addStep}
            >
              <Image style={styles.logoAddIngredient} source={PlusImage} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingBottom: 10
    //backgroundColor: "#ffcdd2",
  },
  postContainer: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  viewName: {
    margin: 5,
    flex: 1,
    flexDirection: "column",
    maxHeight: 50,
    width: "100%",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#ffebee",
    borderRadius: 10,
    padding: 3
  },
  viewImage: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#ffebee",
    borderRadius: 10,
    shadowColor: "#cdb7b5",
    padding: 3
  },
  updateImage: {
    position: "absolute",
    left: "50%",
    bottom: 0,
    marginLeft: -10,
    marginBottom: 3
  },
  viewDescription: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 5,
    borderWidth: 2,
    borderColor: "#ffebee",
    borderRadius: 10,
    shadowColor: "#cdb7b5",
    padding: 3
  },
  listContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    paddingHorizontal: 20
  },
  viewTitle: {
    flex: 1,
    flexDirection: "column",
    maxHeight: 50,
    width: "100%",
    marginTop: 0,
    alignSelf: "center"
  },
  textTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 5,
    fontWeight: "700",
    marginLeft: 15,
    marginRight: 15,
    alignContent: "center",
    color: "#7f0000"
  },
  viewListContent: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignContent: "stretch",
    paddingBottom: 10
  },
  btnAddIngredient: {
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center"
  },
  logoAddIngredient: {
    width: 30,
    height: 25
  }
});
