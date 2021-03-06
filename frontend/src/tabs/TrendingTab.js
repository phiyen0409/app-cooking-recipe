import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  FlatList,
  ActivityIndicator
} from "react-native";
import { SearchBar } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";
import ListItem from "../components/ListItem";
import AvatarImage from "../../assets/Image/avatar.png";
import theme from "../../constant/theme";
import uploadImage from "../../assets/Image/blog.png";
import PTRView from 'react-native-pull-to-refresh';
import NavigationService from '../navigations/NavigationService'; 

export default class TrendingTab extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      // loading: false,
      error: null,
      user: {},
      posts: [],
      refreshing:false,
      loading:true,
      valueSearch:""
    };
    this.arrayholder = [];
  }
  _getUserLogin = async () => {
    try {
      const value = await AsyncStorage.getItem("@auth");
      if (value !== null) {
        // We have data!!
        let user = JSON.parse(value);
        this.setState({ user: user });
        console.log(user);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  componentDidMount() {
    (async () => {
      await this._getUserLogin();
      await this.getDataAsync();
    })();
  }
  getDataAsync = async () => {
    axios({
      method: "get",
      url: "/post/trending/"+this.state.user.idUser,
      data: {
      }
    })
      .then(result => {
        this.setState({
          posts: result.data  ? result.data : [],
          refreshing:false,
          loading:false
        });
        this.arrayholder = result.data;
        //console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  };
  handleRefresh=()=>{
    this.setState({
      refreshing:true
    },
    ()=>{
      this.getDataAsync();
    }
    )
  };
  searchFilterFunction = text => {
    this.setState({
      valueSearch: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.author.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      posts: newData,
    });
  }
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Tìm công thức, tác giả..."
        lightTheme
        
        // round
        searchIcon = {style={color: 'white'}}
        clearIcon = {style={color: 'white'}}
        inputContainerStyle = {{backgroundColor: '#af4448'}}
        inputStyle={{backgroundColor: '#af4448', fontSize: 16, color: 'white'}}
        containerStyle = {{backgroundColor: '#ef9a9a', marginBottom: 20, borderWidth: 0, borderRadius:10}}
        placeholderTextColor = '#FAFAFA'
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.valueSearch}
      />
    );
  };
  render() {
    const { navigation } = this.props;
    
    return (
      <View style={styles.container}>
        {
          this.state.loading?
          <ActivityIndicator size="large" color="white" />
          :
          <FlatList
            onScroll={this.handleScroll} scrollEventThrottle={16}
            data={this.state.posts}
            renderItem={({ item }) => (
              <ListItem
                userId={this.state.user.idUser}
                post={item}
                canEdit={false}
                switchRecipeScreen={() => navigation.navigate("Recipe",{post: item,userId:this.state.user.idUser})}
                switchEditScreen={() => navigation.navigate("EditRecipe",{post: item, edit: true})}
                switchProfileScreen={() => this.switchProfileScreen(item)}

                isLiked={item.isLiked}
                isSaved={item.isSaved}
                handleRefresh={this.handleRefresh}
              />
            )}
            keyExtractor={item => item._id}
            onRefresh={()=>this.handleRefresh()}
            refreshing={this.state.refreshing}
            // ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent = {this.renderHeader}
          />
            }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 20,
    paddingBottom: 20,

    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#ffcdd2",
    paddingLeft: 5,
    paddingRight: 5

    // backgroundColor: '#fff',
  },
  postContainer: {
    paddingTop: 5,
    paddingRight: 5
  }
});