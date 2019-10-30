import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    ScrollView,
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
            {/* <ScrollView> */}
            {/* <View style = {{flex: 4, flexDirection: "row", paddingBottom: 0, borderBottomColor:'#830707', borderBottomWidth:1}}> */}
            <View style = {styles.viewTitle}>
                <Text style = {styles.title}>Sườn xào chua ngọt</Text>
            </View>
            <View style = {styles.imageView}>
                <Image style={styles.image} source = {Im} />
                <Image style={styles.image} source = {Im} />
                <Image style={styles.image} source = {Im} />
            </View>

            <View style = {styles.viewContent}>
                <ScrollView>
                <Text style = {styles.description}>ffbhgvvcvjn bbvnvbfdyjnehf gfnwkvbnvm ffgfggh bfh fgb dvfhgdcvbnmfcfvgxbh x  d vjebfuwnckajhshbk cmbjhebfiefnjsc   nbvgbnm  cjbhjxvhjhxb  nmxn n n jbkankjdnngungungugnguguhkjnnkncfnsscms cm scs mns   zjdvihgnlvnjkgieuhfjkjnvjkhthgsmlmkdjsusilfjskfoielskdskeqwqwertueipwolskfjdghiehtdkkvmb,xmlehtkjd jkkhrhtkkckkk  jgb  grryuereng rhithrnvk jnjjv udhfinbklginvljgbb kidfhevmx jdighhkdnvsnvkhguis uigh  jturnvdnngdnduhiergsvv knhm bkntj ting itth uh vmnih ddjty rouh hnsm grhtj ht rtg grg dgr fhrhc gereg dt4gegj</Text>
                <Text style = {styles.description}>ffbhgvvcvjn bbvnvbfdyjnehf gfnwkvbnvm ffgfggh bfh fgb dvfhgdcvbnmfcfvgxbh x  d vjebfuwnckajhshbk cmbjhebfiefnjsc   nbvgbnm  cjbhjxvhjhxb  nmxn n n jbkankjdnngungungugnguguhkjnnkncfnsscms cm scs mns   zjdvihgnlvnjkgieuhfjkjnvjkhthgsmlmkdjsusilfjskfoielskdskeqwqwertueipwolskfjdghiehtdkkvmb,xmlehtkjd jkkhrhtkkckkk  jgb  grryuereng rhithrnvk jnjjv udhfinbklginvljgbb kidfhevmx jdighhkdnvsnvkhguis uigh  jturnvdnngdnduhiergsvv knhm bkntj ting itth uh vmnih ddjty rouh hnsm grhtj ht rtg grg dgr fhrhc gereg dt4gegj</Text>

                </ScrollView>
            </View> 
            {/* </ScrollView> */}
        </View>      

    );
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
        alignContent: "center",
        padding: 5,
        margin: 5,
    },

    imageView:{
        flexDirection: "row",
        justifyContent: "center",
        width: 64,
        height: 64,
        padding: 5,
        alignItems: "center",
        alignSelf: "center",
        margin: 5,
    },

    image:{
        flexDirection: "row",
        width: 64,
        height: 64,
        padding: 5,
        margin: 5,
        alignItems: "center",
        alignSelf: "center",
    },

    viewContent:{
        flexDirection: "row",
        alignItems: "stretch",
        marginBottom: 10,
    },

    title:{
        textTransform: "uppercase",
        marginBottom: 5,
        fontWeight: "700",
        marginLeft: 15,
        marginRight: 15,
        alignContent: "center",
        color: "#7f0000",
    },

    description:{
        marginBottom: 8,
        paddingBottom: 8,
        fontWeight: "300",
        marginLeft: 5,
        marginRight: 5,
    },
});