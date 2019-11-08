import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import {Block,Icon} from 'galio-framework';
import Im from "../../assets/Image/suonxaochuangot.jpg"
import { red } from 'ansi-colors';
import LibraryImage from '../../assets/Image/library.png';
import CameraImage from '../../assets/Image/camera.png';
// import { heightPercentageToDP } from 'react-native-responsive-screen';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

// import ImagePicker from 'react-native-image-picker';

// More info on all the options is below in the API Reference... just some common use cases shown here
// const options = {
//   title: 'Select Avatar',
//   customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };

export default class AddIntro extends React.Component{
    // constructor(props){
    //     super(props);
    // }
    render() {
        return(
            <View style={styles.container}>
                {/* <ScrollView> */}
                {/* <View style = {{flex: 4, flexDirection: "row", paddingBottom: 0, borderBottomColor:'#830707', borderBottomWidth:1}}> */}
                <View style = {styles.viewTitle}>
                    <TextInput style = {styles.title} placeholder="Food name"></TextInput>
                    
                </View>

                <View style = {styles.imageView}>
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
                    {/* <View style = {{flex: 1, flexDirection: "row", borderTopWidth: 1, borderTopColor: '#830707'}}>
                        <TouchableOpacity style = {styles.button}>
                            <Block style={styles.buttonBlock}>
                                <Image style={styles.logoButton} source={LikeImage} />
                                <Text style = {{fontSize: 6}}>345678</Text>
                            </Block>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.button}>
                            <Block style={styles.buttonBlock}>
                                <Image style={styles.logoButton} source={CommentImage} />
                                <Text style = {{fontSize: 6}}>345678</Text>
                            </Block>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.button}>
                            <Block style={styles.buttonBlock}>
                                <Image style={styles.logoButton} source={SaveImage} />
                                <Text style = {{fontSize: 6}}>345678</Text>
                            </Block>
                        </TouchableOpacity>
                    </View> */}
                </View>

                <View style = {styles.viewContent}>
                    <ScrollView>
                        <TextInput style = {styles.description} placeholder = "Discription"/>

                    </ScrollView>
                </View> 
            {/* </ScrollView> */}
            </View>      

        );
    }

    // show(){
    //     ImagePicker.showImagePicker(options, (response) => {
    //         console.log('Response = ', response);
          
    //         if (response.didCancel) {
    //           console.log('User cancelled image picker');
    //         } else if (response.error) {
    //           console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //           console.log('User tapped custom button: ', response.customButton);
    //         } else {
    //           const source = { uri: response.uri };
          
    //           // You can also display the image using data:
    //           // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
    //           this.setState({
    //             avatarSource: source,
    //           });
    //         }
    //       });
    // }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        padding: 15,
        backgroundColor: '#fff',
        shadowColor: '#830707',
    },

    viewTitle:{
        padding: 5,
        margin: 5,
        flex: 1,
        flexDirection: 'column',
        maxHeight: 50,
        width: ('100%'),
        marginTop: 0,
        alignSelf: 'center',
        // backgroundColor: '#cdb7b5',
    },

    imageView:{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        height: hp('30%'),
        width: '100%',
        padding: 5,
        paddingBottom:0,
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
        // flex: 3,
        flexDirection: "column",
        // width: 100,
        height: '68%',
        width: wp('50%'),
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
        marginTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 2,
        // borderTopWidth: 0,
        borderColor: '#ffebee',
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
        borderRadius: 10,
        shadowColor: '#cdb7b5',
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

    description:{
        marginBottom: 8,
        marginTop: 8,
        paddingBottom: 8,
        fontWeight: "300",
        
    },
});