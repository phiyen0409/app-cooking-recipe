import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import Slideshow from 'react-native-image-slider-show';
import theme from "../../constant/theme";
import Im from "../../assets/Image/suonxaochuangot.jpg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default class Step extends Component {
  constructor(props){
    super(props);
    this.state = {
      position: 1,
      interval: null,
      dataSource: [
        {
          title: 'Title 1',
          caption: 'Caption 1',
          url: 'https://i.pinimg.com/originals/e6/7a/3d/e67a3dfc08353a0ef5f93cc356d0dacb.jpg',
        }, {
          title: 'Title 2',
          caption: 'Caption 2',
          url: 'http://placeimg.com/640/480/animals?t=1574956936985',
        }, {
          title: 'Title 3',
          caption: 'Caption 3',
          url: 'http://placeimg.com/640/480/animals?t=1574957043570',
        }, {
          title: 'Title 4',
          caption: 'Caption 4',
          url: 'http://placeimg.com/640/480/animals?t=1574958904402',
        },
      ],
    };
  };

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 2000)
    });
  }
  
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }  

  render() {
  const { step } = this.props;
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "#830707",
          height: "100%",
          marginTop: 15
        }}
      >
        <Text style={styles.title}>Bước</Text>
        <Text
          style={{ textAlign: "left", fontWeight: "400", color: "#8e1e20" }}
        >
          {'' + step.step}:
        </Text>
        <Text
          style={{
            paddingLeft: 5,
            paddingRight: 5,
            fontWeight: "400",
            color: "#8e1e20"
          }}
        >
          {step.title}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          borderWidth: 1,
          borderColor: "#ffebee",
          borderBottomRightRadius: 4,
          borderBottomLeftRadius: 4,
          borderTopWidth: 0,
          margin: 5,
          // paddingRight: 5,
          height: "100%"
        }}
      >
        <View style={styles.imageContainer}>
          {/* <Image style={styles.image} source={{ uri: step.image }} /> */}
          <Slideshow 
            dataSource={this.state.dataSource}
            position = {this.state.position}
            onPositiionChanged={position => this.setState({position})}
          />
        </View>

        <View style={{ height: "100%", margin: 5, padding: 5 }}>
          <Text>{step.content}</Text>
        </View>
      </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    backgroundColor: "#fff",
    height: "100%"
  },
  title: {
    textAlign: "left",
    textTransform: "capitalize",
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
    width: "40%",
    height: 75,
    // margin: 5,
    borderRadius: 10
  }
});
