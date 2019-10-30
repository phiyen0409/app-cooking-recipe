import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {Block,Icon} from 'galio-framework';
import Im from "../../assets/Image/suonxaochuangot.jpg"
import { red } from 'ansi-colors';
import LikeImage from "../../assets/Image/Interact/like.png";
import CommentImage from "../../assets/Image/Interact/comment.png";
import SaveImage from "../../assets/Image/Interact/save.png";

export default function ListItem(props){
return(
    <View style={styles.container}>
        <View style = {{flex: 4, flexDirection: "row", paddingBottom: 0, borderBottomColor:'#830707', borderBottomWidth:1}}>
            
            <Image style={styles.image} source = {Im} />

            <View style = {styles.viewContent}>
                <View style = {styles.viewTitle}>
                    <Text style = {styles.title}>Sườn xào chua ngọt</Text>
                </View>
                <Text style = {styles.description}>ffbhgfdyjnehf gfnwkvbnvm ffgfggh bfh fgb dvfhgj</Text>
            </View> 

        </View>
        <View style = {{flex: 1, flexDirection: "row"}}>
            <TouchableOpacity style = {styles.button}>
                <Block style={styles.buttonBlock}>
                <Image style={styles.logoButton} source={LikeImage} />
                </Block>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button}>
                <Block style={styles.buttonBlock}>
                    <Image style={styles.logoButton} source={CommentImage} />
                </Block>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button}>
                <Block style={styles.buttonBlock}>
                    <Image style={styles.logoButton} source={SaveImage} />
                </Block>
            </TouchableOpacity>
        </View>
  
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        height: 180,
        padding: 15,
        // borderTopLeftRadius: 40,
        // borderBottomRightRadius: 40,
        backgroundColor: '#fff',
        shadowColor: '#830707',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 0},
        marginBottom: 10,
        borderRadius: 25
    },

    viewContent:{
        flex: 2,
        flexDirection: "column",
        alignItems: "baseline",
        padding: 5,
    },

    viewTitle:{
        // flex: 1,
        maxHeight: 50,
        paddingTop: 0,
    },

    image:{
        flex: 1,
        flexDirection: "row",
        width: 64,
        height: 64,
        // paddingLeft: 64,
        alignItems: "center",
        alignSelf: "center",
    },

    title:{
        flex: 1,
        textTransform: "uppercase",
        marginBottom: 5,
        fontWeight: "700",
        marginLeft: 15,
        marginRight: 15,
        alignContent: "center",
        color: "#7f0000",
    },

    description:{
        flex: 2,
        marginBottom: 8,
        paddingBottom: 0,
        fontWeight: "300",
        marginLeft: 15,
        marginRight: 15,
    },

    button:{
        flex: 1,
        // backgroundColor: "#b71c1c",
        margin: 5,
        paddingTop: 10
        //borderRadius: 4,
        // borderLeftWidth: 0.5,
        // borderLeftColor: 'red'
        
    },
    buttonBlock:{
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    logoButton: {
        width: 25,
        height:25
    },
});
