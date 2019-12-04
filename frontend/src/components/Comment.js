import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {Block,Icon} from 'galio-framework';
import Im from "../../assets/Image/suonxaochuangot.jpg";
import Avatar from "../../assets/Image/avatar.png";
import { red } from 'ansi-colors';
import LikeImage from "../../assets/Image/Interact/like.png";
import CommentImage from "../../assets/Image/Interact/comment.png";
import SaveImage from "../../assets/Image/Interact/save.png";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


export default class Comment extends React.Component{
    constructor(props) {
        super(props);
      }
render(){
    const comment = this.props.comment;
    return(
    <View style={styles.viewContent}>
            <View style = {{flex: 4, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: "#830707", height: '100%', marginTop: 15}}>
                <Image style = {styles.avatar} source = {{uri: comment.user.avatar}}/>
            <Text style = {{marginLeft: 5, fontWeight: "400", color: "#8e1e20"}}>{comment.user.name}</Text>

            </View>
            <View style = {styles.date, {margin:5, paddingRight: 5, height : '100%',flex:1}}>

                <Text style={styles.dateComent}>{comment.date}</Text>

            </View>
            <View style = {styles.description, {margin:5, paddingRight: 5, height : '100%',flex:2}}>

                <Text>{comment.content}</Text>

            </View>
        </View>
    );
            }
}

const styles = StyleSheet.create({
    // container:{
    //     flex: 1,
    //     flexDirection: "column",
    //     alignItems: "center",
    //     height: 172,
    //     padding: 0,
    //     backgroundColor: '#fff',
    //     marginBottom: 10,
    // },

    viewContent:{
        flex: 2,
        flexDirection: "column",
        alignItems: "baseline",
        padding: 5,
        backgroundColor: "#FFF",
        borderRadius: 4,
        // borderBottomRightRadius:4,
        // borderBottomLeftRadius:4,
        // borderTopWidth: 0,
        marginTop: 0,
        margin: 10
    },

    avatar: {
        // flex: 1,
        // flexDirection: "row",
        width: 25,
        height: 25,
        borderRadius: 62,
        borderWidth: 0

    },

    viewTitle:{
        flex: 1,
        flexDirection: 'column',
        maxHeight: 50,
        width: ('100%'),
        marginTop: 0,
        alignSelf: 'center',
        backgroundColor: '#cdb7b5',
    },

    image:{
        flex: 1,
        flexDirection: "row",
        width: 25,
        height: 25,
        borderRadius: 62,
        borderWidth: 0
    },

    title:{
        flex: 1,
        textTransform: "uppercase",
        marginBottom: 5,
        fontWeight: "700",
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: "center",
        color: "#7f0000",
    },

    description:{
        // flex: 2,
        // marginBottom: 8,
        // paddingBottom: 0,
        // fontWeight: "300",
        // marginLeft: 15,
    },
    dateComent:{
        fontSize:10,
        color:"#585858"
    }
});
