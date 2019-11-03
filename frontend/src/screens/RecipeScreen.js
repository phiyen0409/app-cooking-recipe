import React from "react";
import {
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import IntroItem from "../components/IntroItem";
import IngredientItem from '../components/IngredientItem';
import theme from "../../constant/theme";
import { Block, Icon } from "galio-framework";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Process from "../components/Process";

export default class RecipeScreen extends React.Component {
    
render(){
    return (
        <View style = {styles.container}>
            {/* <View> */}
                <ScrollView>
                    <View>
                        <IntroItem/>
                    </View>
                    <View>
                        <ScrollView >
                            <IngredientItem/>
                        </ScrollView>
                    </View>
                    <View style = {{margin: 5}}>
                        <Process/>
                    </View>
                </ScrollView>
            {/* </View> */}
        </View>
    );
};
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        alignItems: "stretch",
        // width: wp('100%'),
        justifyContent: "center"
    },
});

