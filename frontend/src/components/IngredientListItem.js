import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    FlatList
} from 'react-native';
import  {Table, TableWrapper, Row, Cell, Rows} from 'react-native-table-component';
import theme from "../../constant/theme";
import IngredientItem from "./IngredientItem";
// import flatlistIngredient from '../Data/flatlistIngredient';


import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default class IngredientListItem extends Component{
    constructor (props){
        super(props);
        this.state = {
            ingredientlist: [
                {id: 1, name: "Thit lon", data: "500 g"},
                {id: 2, name: "Duong", data: "100 g"},
                {id: 3, name: "Thit lon", data: "500 g"},
                {id: 4, name: "Duong", data: "100 g"},
                {id: 5, name: "Thit lon", data: "500 g"},
                {id: 6, name: "Duong", data: "100 g"},
                {id: 7, name: "Thit lon", data: "500 g"},
                {id: 8, name: "Duong", data: "100 g"},
                {id: 9, name: "Thit lon", data: "500 g"},
                {id: 10, name: "Duong", data: "100 g"}
            ]
        }
    };

    render() {
        const {ingredientlist} = this.state;
    
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
                    
                        {/* {ingredientlist.map(ingredient => (
                            <IngredientItem key = {ingredient.id} ingredient ={ingredient}/>
                        ))} */}
                        
                        <FlatList data = {ingredientlist}
                        renderItem = {({item, index}) => <IngredientItem ingredient = {item} index = {index}/>}
                        keyExtractor = {(item) => `${item.id}`}/>

                        {/* <FlatList data = {flatlistIngredient}
                            renderItem = {({item, index}) => <IngredientItem ingredient = {item} index = {index}/>}
                            keyExtractor = {(item) => `${item.id}`}/> */}

                    </ScrollView> 
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

    dataWrapper: { marginTop: -1 },
    // row: { 
    //     backgroundColor: 'white',
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#e57373',
    //     borderLeftWidth: 1,
    //     borderLeftColor: '#e57373',
    //     marginTop: -1,
    // },

});