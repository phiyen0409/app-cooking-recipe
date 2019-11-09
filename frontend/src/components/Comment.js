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


export default function Comment(props){
return(
    // <View style={styles.container}>
    //     <View style = {styles.viewTitle}>
    //         <Text style = {styles.title}>
    //             Bình luận
    //         </Text>
            
    //     </View>
    //     <View style = {styles.content}>
    //         <View style = {{flexDirection: 'row'}}>
    //             <Image style = {{}} source = {Avatar}>

    //             </Image>
    //             <Text>
    //                 Ly
    //             </Text>
    //         </View>
    //         <View> style = {styles.description}
    //             <Text>
    //                  bfbfbvkvskjsb
    //             </Text>
    //         </View>
    //     </View>
    // </View>

    <View style={styles.viewContent}>
            <View style = {{flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: "#830707", height: '100%', marginTop: 15}}>
                <Image style = {styles.avatar} source = {Avatar}/>
                <Text style = {{marginLeft: 5, fontWeight: "400", color: "#8e1e20"}}>Lynk Huyền</Text>
                {/* <Text style = {{paddingLeft: 5, paddingRight: 5, fontWeight: "400", color: "#8e1e20"}}>{step.title}</Text> */}

            </View>
            <View style = {styles.discription, {margin:5, paddingRight: 5, height : '100%'}}>
                {/* <View style = {styles.imageContainer}> */}
                    {/* <Image style={styles.image} source={Im}/> */}
                {/* </View> */}
                <Text>asdfghjkl  hgvvb bjf jr jfn ghj bnh nkjiuibb uh huy gvgcff hgcfgcggbh</Text>
                {/* <View style = {{height: '100%', margin: 5,padding: 5,}}>
                    <Text>{step.data}</Text>
                </View> */}
            </View>
        </View>
    );
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
        borderWidth: 1,
        borderColor: "#ffebee",
        backgroundColor: "#ffebee",
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
        flex: 2,
        marginBottom: 8,
        paddingBottom: 0,
        fontWeight: "300",
        marginLeft: 15,
    },

    // button:{
    //     flex: 1,
    //     // backgroundColor: "#b71c1c",
    //     margin: 5,
    //     paddingTop: 10
    //     //borderRadius: 4,
    //     // borderLeftWidth: 0.5,
    //     // borderLeftColor: 'red'
        
    // },
    // buttonBlock:{
    //     justifyContent: 'center',
    //     alignContent: 'center',
    //     alignItems: 'center'
    // },
    // logoButton: {
    //     width: 25,
    //     height:25
    // },
});
