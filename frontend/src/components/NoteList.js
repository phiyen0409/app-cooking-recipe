import React, { Component } from "react";
import { Image,Text, View, StyleSheet, ScrollView, FlatList,TouchableOpacity,Alert,Animated,Modal } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  Rows
} from "react-native-table-component";
import theme from "../../constant/theme";
import { FontAwesome, AntDesign, MaterialIcons, Entypo,SimpleLineIcons } from "@expo/vector-icons";
// import flatlistIngredient from '../Data/flatlistIngredient';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Note from "./Note";
import axios from "axios";
export default class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      id: this.props.note._id,
      userId:this.props.userId,
      loadMore: false
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  deleteNote(){
    this.setState({ modalVisible: false });
    axios({
      method: "delete",
      url: "user/deletenote",
      data: {
        userId:this.state.userId,
        noteId: this.state.id
      }
    })
      .then(result => {
        Alert.alert("Xóa thành công");
        this.props.handleRefresh();
      })
      .catch(error => {
        Alert.alert(error);
      });
  }
  setLoadMore() {
    if (this.state.loadMore==true){
      this.setState({ loadMore: false });
    }
    else{
      this.setState({ loadMore: true });
    }
  }

  render() {
    // const { ingredientlist } = this.state;
    const note = this.props.note;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.menuView} onPress={() => {
          this.setModalVisible(true);
        }}>
            <Entypo name='menu' size={25} color="#830707" />
        </TouchableOpacity>
        <View style={styles.paperclip}>
        <FontAwesome name='paperclip' size={25} color="grey" />
        </View>
        <View style={styles.viewTitle}>
      <Text style={styles.title}>{note.post.title}</Text>
        </View>
        {this.state.loadMore?          
        <View style={styles.content}>
          <FlatList
              style={styles.dataWrapper}
              data={note.listIngre}
              renderItem={({ item }) => <Note ingre={item} noteId={this.state.id} userId={this.state.userId} />}
              keyExtractor={item => `${item._id}`}
            />
          </View>:null}

            <TouchableOpacity onPress={()=>{this.setLoadMore()}}>
                {
                  this.state.loadMore?
                  <View style={styles.loadView}>
                    <AntDesign name='up' size={20} color="#830707" />
                  </View>
                  :<View style={styles.loadView}>
                    <AntDesign name='down' size={20} color="#830707" />
                  </View>
                }
            </TouchableOpacity>


        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(false);
            }}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(15,0,0,0.52)"
            }}
          ></TouchableOpacity>
          <View style={styles.containerModal}>
            <View style={styles.bodyModal}>
              <TouchableOpacity
                style={styles.viewButtonModal}
                onPress={() => {
                  Alert.alert(
                    "Thông báo",
                    "Bạn có muốn xóa ghi chú?",
                    [
                      {
                        text: "OK",
                        onPress: () => {
                          this.deleteNote();
                        }
                      },
                      {
                        text: "Hủy",
                        //onPress: () => console.log('Cancel Pressed'),
                        style: "cancel"
                      }
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <View style={styles.viewIconButtonModal}>
                  <AntDesign name='delete' size={25} color="#830707" />
                </View>
                <View style={styles.viewTextButtonModal}>
                  <Text style={styles.textButtonModal}>Xóa ghi chú</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFACB",
    // height: theme.SIZES.BASE *15,
    padding: 15,
    borderRadius: 25,
    borderColor:'#ffcdd2',
    borderWidth:1,
    marginBottom:15
    // height: '100%',
    // margin: 5,
    // paddingLeft: 40,
    // paddingRight: 40,
    // paddingBottom: 70,
  },

  viewTitle: {
    flex: 1,
    flexDirection: "column",
    maxHeight: 30,
    width: "100%",
    marginTop: 0,
    alignSelf: "center",
    //backgroundColor: "#FFBF00"
    // backgroundColor: '#cdb7b5',
  },

  title: {
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 5,
    fontWeight: "700",
    marginLeft: 15,
    marginRight: 15,
    alignContent: "center",
    color: "#7f0000",
    marginBottom: 30
  },

  content: {
    alignContent: "center",
    width: wp("90%"),
    //backgroundColor:"#F7D358",
    // flex: 4,
    // height: 4,
    flexDirection: "column",
    // alignItems: 'stretch',
    marginBottom: 10,
    // paddingLeft: 5,
    // paddingRight: 5,
  },
  paperclip:{
    position:'absolute',
    zIndex:3,
    top:1,
    left:-1
  },
  menuView:{
    position:'absolute',
    zIndex:3,
    top:5,
    right:7
  },
  loadView:{
    justifyContent:"center",
    alignItems:"center"
  },
  containerModal: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    bottom: 0,
    backgroundColor: "#FFF"
  },
  bodyModal: {
    flex: 1,
    width: "100%",
    alignContent: "stretch",
    justifyContent: "center"
  },
  viewButtonModal: {
    width: "100%",
    height: 45,
    flex: 1,
    flexDirection: "row",
    //paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  viewIconButtonModal: {
    flex: 1,
    //height: 20,
    paddingLeft: 5,
    justifyContent: "center",
    alignContent: "center"
  },
  iconButtonModal: {
    width: 35,
    height: 35
  },
  viewTextButtonModal: {
    flex: 10,
    flexDirection: "row",
    marginLeft: 10
  },
  textButtonModal: {
    alignSelf: "flex-start",
    height: "100%",
    textAlign: "left",
    fontSize: 15,
    color: "#830707"
  },
  // wrapper: {
  //     flexDirection: 'column',
  //     marginTop: -1,
  //     marginLeft: 5,
  //     marginRight: 5,
  //     paddingBottom: 5,
  // },

  // head: {
  //     height: theme.SIZES.BASE * 5,
  //     alignContent: 'center',
  //     backgroundColor: '#830707',
  //     borderBottomWidth: 1,
  //     borderBottomColor: '#e57373',
  // },

  dataWrapper: { marginTop: -1 }
  // row: {
  //     backgroundColor: 'white',
  //     borderBottomWidth: 1,
  //     borderBottomColor: '#e57373',
  //     borderLeftWidth: 1,
  //     borderLeftColor: '#e57373',
  //     marginTop: -1,
  // },
});
