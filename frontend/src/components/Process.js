import React, {Component} from 'react';
import {
//     Image,
    Text,
    View,
    StyleSheet,
    ScrollView,
//     TouchableOpacity,
} from 'react-native';
import  {Table, TableWrapper, Row, Cell, Rows} from 'react-native-table-component';
import theme from "../../constant/theme";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Process(){
    return(
        <View style = {styles.container}>
            <View>
                <Text style = {styles.title}>
                    Quy trình thực hiện
                </Text>

            </View>
            <View>

            </View>
        </View>
          
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#fff',
        height: theme.SIZES.BASE *15,
        margin: 5,
        padding: 15,
    },
    title: {
        textAlign: 'center',
        textTransform: "uppercase",
        marginBottom: 5,
        fontWeight: "700",
        marginLeft: 15,
        marginRight: 15,
        alignContent: "center",
        color: "#7f0000",
    },

});