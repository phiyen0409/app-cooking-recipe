import React from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import IngredientListItem from "../components/IngredientListItem";
import theme from "../../constant/theme";
import { Block, Icon } from "galio-framework";
import Im from "../../assets/Image/suonxaochuangot.jpg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Process from "../components/Process";
import Comment from "../components/Comment";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default class RecipeScreen extends React.Component {
//   static navigationOptions = {
//     header: null
//   };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style = {styles.postContainer}>
          <View style = {styles.viewTitle}>
            <Text style = {styles.title}>Sườn xào chua ngọt</Text>
            <View>
                {/* <image>

                </image> */}
                <Text style = {styles.title, styles.author}>Liiii</Text>
            </View>
          </View>

          <View style = {styles.imageView}>
            <Image style={styles.image} source = {Im} />
          </View>
          <View style = {styles.viewContent}>
            <ScrollView>
              <Text style = {styles.description}>ffbhgvvcvjn bbvnvbfdyjnehf gfnwkvbnvm ffgfggh bfh fgb dvfhgdcvbnmfcfvgxbh x  d vjebfuwnckajhshbk cmbjhebfiefnjsc   nbvgbnm  cjbhjxvhjhxb  nmxn n n jbkankjdnngungungugnguguhkjnnkncfnsscms cm scs mns   zjdvihgnlvnjkgieuhfjkjnvjkhthgsmlmkdjsusilfjskfoielskdskeqwqwertueipwolskfjdghiehtdkkvmb,xmlehtkjd jkkhrhtkkckkk  jgb  grryuereng rhithrnvk jnjjv udhfinbklginvljgbb kidfhevmx jdighhkdnvsnvkhguis uigh  jturnvdnngdnduhiergsvv knhm bkntj ting itth uh vmnih ddjty rouh hnsm grhtj ht rtg grg dgr fhrhc gereg dt4gegj</Text>
              <Text style = {styles.description}>ffbhgvvcvjn bbvnvbfdyjnehf gfnwkvbnvm ffgfggh bfh fgb dvfhgdcvbnmfcfvgxbh x  d vjebfuwnckajhshbk cmbjhebfiefnjsc   nbvgbnm  cjbhjxvhjhxb  nmxn n n jbkankjdnngungungugnguguhkjnnkncfnsscms cm scs mns   zjdvihgnlvnjkgieuhfjkjnvjkhthgsmlmkdjsusilfjskfoielskdskeqwqwertueipwolskfjdghiehtdkkvmb,xmlehtkjd jkkhrhtkkckkk  jgb  grryuereng rhithrnvk jnjjv udhfinbklginvljgbb kidfhevmx jdighhkdnvsnvkhguis uigh  jturnvdnngdnduhiergsvv knhm bkntj ting itth uh vmnih ddjty rouh hnsm grhtj ht rtg grg dgr fhrhc gereg dt4gegj</Text>

            </ScrollView>
          </View>
        </View>

        <View style={styles.postContainer}>
          <ScrollView >
            <IngredientListItem />
          </ScrollView>
        </View>
        <View style={styles.postContainer}>
          <Process />
        </View>
        <View style={styles.postContainer}>
          <View style = {styles.viewTitle}>
            <Text style = {styles.title}>Bình luận</Text>
          </View>
          <ScrollView>
            <Comment/>
            <Comment/>
          </ScrollView>
          <View style = {styles.viewComment}>
              <TextInput style={styles.textInputCmt} placeholder = "Viết bình luận" />
              <TouchableOpacity style={{width:'100%', height:'60%'}}>
                <View style={styles.buttonCmt}>
                  <Text style={styles.textButtonCmt}>Gửi</Text>
                </View>
              </TouchableOpacity>
          </View>
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
    // width: wp('100%'),
    justifyContent: "center"
    // paddingTop: 20,
    // paddingBottom: 70,
  },

  postContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    margin: 1,
  },
  viewTitle:{
    padding: 5,
    margin: 5,
    flex: 1,
    flexDirection: 'column',
    // maxHeight: 50,
    height: '100%',
    width: ('100%'),
    marginTop: 0,
    alignSelf: 'center',
    // backgroundColor: '#cdb7b5',
  },

  title:{
    textTransform: "uppercase",
    marginBottom: 5,
    fontWeight: "700",
    marginLeft: 15,
    marginRight: 15,
    textAlign: "center",
    color: "#7f0000",
    marginBottom: 5,
  },

  author:{
    textTransform: 'capitalize',
    fontWeight: "400",
    color: "#d8888b",
    textAlign: "center",
    fontSize: 12,
  },

  imageView:{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    height: hp('30%'),
    padding: 5,
    alignItems: "center",
    alignSelf: "center",
    margin: 0,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: '#ffebee',
    borderRadius: 10,
    shadowColor: '#cdb7b5',
  },

  image:{
    flex: 3,
    flexDirection: "column",
    // width: 100,
    // height: hp('75%'),
    width: wp('60%'),
    // alignContent: 'center',
    padding: 5,
    margin: 5,
    alignItems: "center",
    alignSelf: "center",
  },

  viewContent:{
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: '#ffebee',
    borderRadius: 10,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    shadowColor: '#cdb7b5',
  },

  description:{
    marginBottom: 8,
    marginTop: 8,
    paddingBottom: 8,
    fontWeight: "300",
    marginTop: -1
  },

  viewComment: {
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom:10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    shadowColor: "#cdb7b5",
    height: 100
  },
  textInputCmt:{
    flex:6,
    height:'80%',
    width:'100%',
    marginRight: 10,
    padding:10,
    borderWidth: 2,
    borderColor: "#ffebee",
    borderRadius: 10,
    multiline : true

  },
  buttonCmt:{
    flex:1,
    width: 60,
    backgroundColor: "#830707",
    borderRadius: 15,
    marginHorizontal: 20,
    // paddingVertical:12,
    marginBottom: 10,
    height: '80%',
    justifyContent: 'center',
    alignItems:'center'
  },
  textButtonCmt: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: 'center',
    color: "#fff"
  },
});
