import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//styling
const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#32cd32',
    borderRadius: 8,
    color: '#32cd32'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#32cd32',
    borderColor: '#32cd32',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  title: {
   fontSize: 20,
   color: '#656565'
  },
  rowContainer: {
   flexDirection: 'row',
   padding: 10
  },
  time: {
   fontSize: 15,
   fontWeight: 'bold',
   color: '#32cd32'
 },
 textContainer: {
   flex: 1
 },
  )};

//time and date function
  function timeSince(date) {

      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + " minutes";
      }
      return seconds == 0 ? "Just now" Math.floor(seconds) + " seconds";
  }


//Bulletin class
export default class Bulletin extends Component {
  constructor(props) {
    super(props);
    this.state = {
            postString: '',
            posts : {},
        }
      }
      createPost() {
        this.state.posts[Date.now()] = {
            message : this.state.postString,
            likes : 0,
            comments : []
        };
        this.setState({
            posts : this.state.posts,
            postString : '',
        )};
    }

  postTextChange(event){
    this.setState({ postString : event.nativeEvent.text})};
  renderPost(key) {
      return ( //indicates # of likes
        <View key={key} style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.time}>{timeSince(key)}</Text>
          <Text style={styles.title}>
            {this.state.posts[key].message}
          </Text>
        </View>
        <View>
          <Text>{this.state.posts[key].likes}</Text>
          <Icon name="thumbs-up"
                size={30}
                color={this.state.posts[key].likes == 0 ? '#dddddd' : '#32cd32'}
                />
        </View>
      </View>
    );
  }
  render() {
    var posts = Object.keys(this.state.posts);
    return(
      <View style={styles.container}>
             <View style={styles.flowRight}>
               <TextInput
               placeholder="Yak"
               style={styles.searchInput}
               value={this.state.searchString}
               onChange={this.updateQuery.bind(this)}
               />
               <TouchableHighlight
               style={styles.button}
               onPress={this.createPost.bind(this)}
               >
                 <Text style={styles.buttonText}>
                   Yak
                 </Text>
               </TouchableHighlight>
             </View>
            {posts.map(this.renderPost.bind(this))}
          </View>
    );
  }
}

AppRegistry.registerComponent('Bulletin', () => Bulletin);
