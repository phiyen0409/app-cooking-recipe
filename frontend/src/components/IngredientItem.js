import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import  {Table, TableWrapper, Row, Cell, Rows} from 'react-native-table-component';
import theme from "../../constant/theme";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default class IngredientItem extends Component{
    constructor (props){
        super(props);
        this.state = {
            tableHead: ['Tên nguyên liệu', 'Đơn vị', 'Số lượng'],
            tableData: [
                ['Thịt\n lợn 123\n vchg\n xgjhbkj\n jgh nb \njg vjhbkj \n4567890', 'g', 500],
                ['Đường', 'g', 70],
                ['Muối', 'g', 10],
                ['Nước', 'ml', 100],
                ['Ớt', 'trái', 2],
                ['Thịt lợn', 'g', 500],
                ['Đường', 'g', 70],
                ['Muối', 'g', 10],
                ['Nước', 'ml', 100],
                ['Ớt', 'trái', 2],
                ['Thịt lợn', 'g', 500],
                ['Đường', 'g', 70],
                ['Muối', 'g', 10],
                ['Nước', 'ml', 100],
                ['Ớt', 'trái', 2],
                ['Thịt lợn', 'g', 500],
                ['Đường', 'g', 70],
                ['Muối', 'g', 10],
                ['Nước', 'ml', 100],
                ['Ớt', 'trái', 2]
            ]
        }
    };

    render() {
        const state = this.state;
    
        return(
            <View style={styles.container}>
                {/* <ScrollView> */}
                <View style = {{alignContent: 'center', flex: 1}}>
                    <Text style = {{textAlign: 'center',
                    textTransform: "uppercase",
                    marginBottom: 5,
                    fontWeight: "700",
                    marginLeft: 15,
                    marginRight: 15,
                    alignContent: "center",
                    color: "#7f0000",
                    marginBottom: 30,}}>
                        Thành phần nguyên liệu
                    </Text>
                </View>
                <View style = {styles.content}>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#e57373'}} style = {{marginLeft: 5, marginRight: 5,}}>
                        <Row data = {state.tableHead} flexArr = {[3, 1, 1]} style = {styles.head} textStyle = {{fontWeight: '400', margin: 5, color: 'white', fontSize: 16, textAlign: 'center'}} />
                    </Table>  

                    <ScrollView style={styles.dataWrapper} >
                    <TableWrapper style = {styles.wrapper} borderStyle={{borderWidth: 1, borderColor: '#e57373'}}> 
                    {
                            <Rows data = {state.tableData} style = {styles.row} flexArr = {[3, 1, 1]}
                                textStyle= {{margin: 5, color: '#607B8B', fontSize: 14, textAlign: 'center', fontWeight:'200'}}
                            />
                    }
                    </TableWrapper>
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

    wrapper: { 
        flexDirection: 'column',
        marginTop: -1,
        marginLeft: 5,
        marginRight: 5,
        paddingBottom: 5,
    },

    head: {
        height: theme.SIZES.BASE * 5,
        alignContent: 'center',
        backgroundColor: '#830707',
        borderBottomWidth: 1,
        borderBottomColor: '#e57373',
    },

    dataWrapper: { marginTop: -1 },
    row: { 
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e57373',
        borderLeftWidth: 1,
        borderLeftColor: '#e57373',
        marginTop: -1,
    },

});