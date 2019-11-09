import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TextInput
} from 'react-native';
import theme from "../../constant/theme";
import LibraryImage from '../../assets/Image/library.png';
import CameraImage from '../../assets/Image/camera.png';
import Im from "../../assets/Image/suonxaochuangot.jpg"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

  export default function Step(props){
    const {step} = props;
    return(
        <View style={styles.container}>
            <View style = {{flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: "#830707", height: '100%', marginTop: 15}}>
                <TextInput style = {styles.title} placeholder = "Step"/>

                {/* <Text style = {{textAlign: "left", fontWeight: "400", color: "#8e1e20"}}>{step.id}:</Text> */}
                <TextInput style = {{paddingLeft: 5, paddingRight: 5, fontWeight: "400", color: "#8e1e20"}} placeholder = "Title"/>

            </View>
            <View style = {{flex: 1,flexDirection: 'column', borderWidth: 1, borderColor: "#ffebee", borderBottomRightRadius:4, borderBottomLeftRadius:4, borderTopWidth: 0, margin:5, paddingRight: 5, height : '100%'}}>
                {/* <View style = {styles.imageContainer}>
                    <Image style={styles.image} source={Im}/>
                </View> */}
                <View style = {{flexDirection: 'column', height: '100%', width: '100%'}}>
                        <Image style={styles.image} source = {Im} />
                        <View style = {{flex: 1, flexDirection: "row", alignSelf: 'stretch'}}>
                            <TouchableOpacity style = {styles.button}>
                                <Block style={styles.buttonBlock}>
                                    <Image style={styles.logoButton} source={LibraryImage}/>
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.button}>
                                <Block style={styles.buttonBlock}>
                                    <Image style={styles.logoButton} source={CameraImage}/>
                                </Block>
                            </TouchableOpacity>
                        </View>
                    </View> 
                <View style = {{margin: 5,padding: 5,}}>
                    {/* <Text>{step.data}</Text> */}
                    {/* <View style = {styles.viewContent}> */}
                    <ScrollView>
                        <TextInput placeholder = "Discription"/>

                    </ScrollView>
                {/* </View>  */}
                </View>
            </View>
        </View>
          
    );
}

  const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        // alignItems: "center",
        backgroundColor: '#fff',
        height: '100%',
    },
    title: {
        textAlign: 'left',
        textTransform: 'capitalize',
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
        width: '40%',
        height: 75,
        margin:5,
      },
      button:{
        // flex: 1,
        flexDirection: 'column',
        // justifyContent: "space-around",
        height: 30,
        width: 40,
        // backgroundColor: "#b71c1c",
        // marginLeft: 5,
        // marginRight: 5,
        marginTop: 2,
        paddingTop: 0,
    },

    buttonBlock:{
        flexDirection: 'column',
        // justifyContent: 'space-around',
        alignContent: 'flex-start',
        // alignItems: 'flex-start',
        marginBottom: 2,
        marginLeft: 0
    },

    logoButton: {
        width: 30,
        height:25,
        marginBottom: 0,
    },

});