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
// import { heightPercentageToDP } from 'react-native-responsive-screen';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


export default function AddIntro(props){
return(
    <View style={styles.container}>
        {/* <ScrollView> */}
        {/* <View style = {{flex: 4, flexDirection: "row", paddingBottom: 0, borderBottomColor:'#830707', borderBottomWidth:1}}> */}
        <View style = {styles.viewTitle}>
            <Text style = {styles.title}>Sườn xào chua ngọt</Text>
            <View>
                <image>

                </image>
                <Text style = {styles.title, styles.author}>Liiii</Text>
            </View>
        </View>

        <View style = {styles.imageView}>
            <Image style={styles.image} source = {Im} />
                    
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
        padding: 5,
        margin: 5,
        flex: 1,
        flexDirection: 'column',
        maxHeight: 50,
        width: ('100%'),
        marginTop: 0,
        alignSelf: 'center',
        backgroundColor: '#cdb7b5',
    },

    imageView:{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        height: hp('25%'),
        padding: 5,
        alignItems: "center",
        alignSelf: "center",
        margin: 5,
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

    button:{
        flex: 1,
        // backgroundColor: "#b71c1c",
        margin: 5,
        paddingTop: 10
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

    description:{
        marginBottom: 8,
        marginTop: 8,
        paddingBottom: 8,
        fontWeight: "300",
        marginLeft: 5,
        marginRight: 5,
    },
});