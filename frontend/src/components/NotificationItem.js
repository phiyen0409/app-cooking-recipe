import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import avatar from "../../assets/Image/avatar.png";
// import flatlistIngredient from '../Data/flatlistIngredient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

// export default class IngredientItem extends component {
export default class NotificationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let {notification} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.switchRecipeScreen} style={styles.viewContent}>
          <View
            style={{
              flex: 4,
              flexDirection: "row",
              height: "100%",
              marginTop: 15,
              width: "100%",
              justifyContent: "flex-start"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                margin: 3,
                marginTop: 0,
                justifyContent: "center"
              }}
            >
              <Image
                style={styles.avatar}
                source={{ uri: notification.user.avatar }}
              />
            </View>

            <View
              style={{
                flex: 7,
                flexDirection: "column",
                margin: 3,
                marginLeft: 0,
                marginTop: 0
              }}
            >
              <Text
                style={{ marginLeft: 5, fontWeight: "bold", color: "#8e1e20" }}
              >
                {notification.user.name}
              </Text>
              <Text style={{ marginLeft: 5, color: "#555555" }}>
                {notification.body}
              </Text>
            </View>
          </View>
          <View style={{ margin: 5, paddingRight: 5, height: "100%", flex: 1 }}>
            <Text style={styles.date}>{notification.time}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: '100%',
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    //   padding: 5,
    //   backgroundColor: "#fff",
    shadowColor: "#830707",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }
    //   marginBottom: 10,
    // borderRadius: 25,
    //   margin: 10,
  },

  viewContent: {
    // flex: 2,
    // width: '100%',
    flexDirection: "column",
    alignItems: "baseline",
    padding: 5,
    borderWidth: 1,
    borderColor: "#ffebee",
    backgroundColor: "#ffebee",
    borderRadius: 4,
    // borderBottomRightRadius:4,
    // borderBottomLeftRadius:4,
    // borderTopWidth: 0,
    // marginTop: 0,
    margin: 5
  },

  avatar: {
    // flex: 1,
    // flexDirection: "row",
    width: 30,
    height: 30,
    borderRadius: 62,
    borderWidth: 1,
    borderColor: "#8e1e20"
  },

  date: {
    fontSize: 10,
    color: "#585858"
  }
});
