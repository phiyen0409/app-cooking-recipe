import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,

} from 'react-native';
import Im from "../../assets/Image/suonxaochuangot.jpg"

export default function ListItem(props){
return(
    <View style={styles.container}>
        {/* <scroll View         */}
        <View style = {{flex: 4, flexDirection: "row", paddingBottom: 0}}>
            
            <Image style={styles.image} source = {Im} />

            <View style = {styles.viewContent}>
                <View style = {styles.viewTitle}>
                    <Text style = {styles.title}>Sườn xào chua ngọt</Text>
                </View>
                <Text style = {styles.discription}>ffbhgfdyjnehf gfnwkvbnvm ffgfggh bfh fgb dvfhgj</Text>
            </View> 

        </View>

        <View style = {{flex: 1, flexDirection: "row"}}>
            <TouchableOpacity style = {styles.button}><Text style = {styles.buttonName}>LIKE</Text></TouchableOpacity>
            <TouchableOpacity style = {styles.button}><Text style = {styles.buttonName}>LIKE</Text></TouchableOpacity>
            <TouchableOpacity style = {styles.button}><Text style = {styles.buttonName}>LIKE</Text></TouchableOpacity>
        </View>
  
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        height: 200,
        padding: 15,
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 0},
        marginBottom: 10,
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

    discription:{
        flex: 2,
        marginBottom: 8,
        paddingBottom: 0,
        fontWeight: "300",
        marginLeft: 15,
        marginRight: 15,
    },

    button:{
        flex: 1,
        backgroundColor: "#b71c1c",
        margin: 5,
        marginBottom: 0,
        padding: 5,
    },
    buttonName:{
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        fontWeight: "100",
        fontSize: 10,
        
    },
    
});
