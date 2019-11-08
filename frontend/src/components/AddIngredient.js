import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
// import  {Table, TableWrapper, Row, Cell, Rows} from 'react-native-table-component';
import {Block,Icon} from 'galio-framework';
import theme from "../../constant/theme";
import PlusImage from "../../assets/Image/plus.png"

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { TextInput } from 'react-native-gesture-handler';

export default class AddIngredient extends Component{
    // constructor (props){
    //     super(props);
        
    // };

    render() {
        const state = this.state;
    
        return(
            <View style={styles.container}>
                {/* <ScrollView> */}
                <View style = {styles.viewTitle}>
                    <Text style = {styles.title}>
                        Thành phần nguyên liệu
                    </Text>
                </View>
                <View style = {styles.content}>
                    
                    <ScrollView style={styles.dataWrapper} >
                        
                        
                    </ScrollView> 
                    <View
                        style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width:'100%',
                        borderBottomColor: "#830707",
                        borderBottomWidth: 1,
                        // backgroundColor: this.props.index %2 == 0? 'white':'#ECECEC'
                        }}
                    >
                        {/* <View style = {{flex: 4, height: '100%'}}>
                            <Text style = {{textAlign: "left", height : '100%', margin: 5, marginBottom: 2}}>{this.props.item.name}</Text>
                        </View>
                        <View style = {{flex: 1, height: '100%'}}>
                            <Text style = {{textAlign: "right", height : '100%', margin: 5, marginBottom: 2}}>{this.props.item.weight}</Text>
                        </View> */}
                        <View style = {{flex: 3, height: '100%'}}>
                            <TextInput style = {{textAlign: "left", height : '100%', margin: 5, marginBottom: 2}} placeholder = "Name"/>
                        </View>
                        <View style = {{flex: 1, height: '100%'}}>
                            <TextInput style = {{textAlign: "right", height : '100%', margin: 5, marginBottom: 2}} placeholder = "Weight"/>
                        </View>

                    </View>
                    <TouchableOpacity style = {styles.button}>
                        <Block style={styles.buttonBlock}>
                            <Image style={styles.logoButton} source={PlusImage}/>
                        </Block>
                    </TouchableOpacity>
                </View>
                {/* </ScrollView> */}
            </View>

        );

    };
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#fff',
        // height: theme.SIZES.BASE *15,
        padding: 15,
        // margin: 5,
        // paddingLeft: 40,
        // paddingRight: 40,
        // paddingBottom: 70,
    },

    viewTitle:{
        flex: 1,
        flexDirection: 'column',
        maxHeight: 50,
        width: ('100%'),
        marginTop: 0,
        alignSelf: 'center',
        // backgroundColor: '#cdb7b5',
    },

    title:{
        textAlign: 'center',
        textTransform: "uppercase",
        marginBottom: 5,
        fontWeight: "700",
        marginLeft: 15,
        marginRight: 15,
        alignContent: "center",
        color: "#7f0000",
        marginBottom: 30,
    },

    content:{
        alignContent: 'center',
        width: wp('90%'),
        flex: 4,
        flexDirection: 'column',
        // alignItems: 'stretch',
        marginBottom: 10,
        // paddingLeft: 5,
        // paddingRight: 5,
    },

    dataWrapper: { marginTop: -1 },
    
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