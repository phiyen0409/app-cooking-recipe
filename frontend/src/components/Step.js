import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import Slideshow from "react-native-image-slider-show";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: this.props.step,
      position: 0,
      dataSource: this.props.step.images.map((val, index) =>{
        return {
          url: val,
        };
      }),
      listImage : this.props.step.images.map((val, index) =>{
        return {
          url: val,
          isSelected: (index == 0)
        };
      })
    };
    this.arrayholder = [];
  }
  selectedImage = key => {
    let listImage = this.props.step.images.map(function(val, index) {
      return {
        url: val,
        isSelected: (index == key)
      };
    });
    this.setState({ position: key, listImage: listImage });
  };
  render() {
    const { step } = this.state;
    const { listImage } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.step}>
            Bước {step.step}: {step.title}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Slideshow
            style={styles.slideImage}
            dataSource={this.state.dataSource}
            position={this.state.position}
            scrollEnabled={false}
            indicatorSize={0}
            arrowSize ={0}
          />
          <View style={styles.listImage}>
            {listImage.map((item, key) => {
              return (
                <TouchableWithoutFeedback onPress={()=>{this.selectedImage(key);}} key={key}>
                <Image
                    source={
                      item
                        ? { uri: item.url }
                        : require("../../assets/Image/placeholder.png")
                    }
                    style={[
                      styles.image,
                      item.isSelected ? styles.selectedImage : {}
                    ]}
                    
                  />
                </TouchableWithoutFeedback>
                  
              );
            })}
          </View>
        </View>
        <View style={styles.detail}>
          <Text>{step.content}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    width: "100%"
  },
  header: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#830707",
    height: "100%",
    marginVertical: 5
  },
  step: {
    textAlign: "left",
    textTransform: "capitalize",
    fontWeight: "600",
    color: "#8e1e20"
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5
  },
  slideImage: {
    flex: 1,
    flexDirection: "row"
  },
  listImage: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  image: {
    marginRight: 10,
    width: 70,
    height: 70,
    borderRadius: 10
  },
  selectedImage: {
    borderColor: "#F00",
    borderWidth: 2
  },
  detail: {
    flex: 1,
    padding: 5,
    marginVertical: 5
  }
});
