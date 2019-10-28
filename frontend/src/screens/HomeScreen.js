import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ListItem from '../components/ListItem';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <ListItem/>
            <ListItem/>
            <ListItem/>
            <ListItem/>
            <ListItem/>
            <ListItem/>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 30,
    },

    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
        // backgroundColor: '#fff',
      },
});