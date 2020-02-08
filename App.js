import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Svg, G, Path} from 'react-native-svg';
import {ResultsScreen} from './components/ResultsScreen';

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      textTopic: '',
      textLanguage: '',
      isLoading: false,
      responseItems: [],
      modalVisible: false,
      filter: '',
    };
  }

  setFilter = filter => {
    if (filter === this.state.filter) {
      this.setState({filter: ''});
    } else {
      this.setState({filter: filter});
    }
  };

  createInitialURL = () => {
    console.log('start');
    let topic = this.state.textTopic;
    let language = this.state.textLanguage;
    let sort = this.state.filter;

    let url =
      'https://api.github.com/search/repositories?q=' +
      topic +
      '+language:' +
      language +
      '&sort=' +
      sort +
      '&order=desc&page=';

    this.props.navigation.navigate('Results', {initialURL: url, test: 'test'});
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#017acd',
            shadowOffset: {width: 0, height: 3},
            shadowColor: 'black',
            shadowOpacity: 0.5,
            elevation: 3,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            {'Github API Search App'}
          </Text>
        </View>
        <View style={{flex: 8, backgroundColor: 'transparent'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingTop: '3%',
              paddingLeft: '1%',
              paddingRight: '1%',
            }}>
            <View style={{flex: 4, justifyContent: 'center'}}>
              <TextInput
                style={styles.textInputStyle}
                placeholder={'Search Topic'}
                onChangeText={text => {
                  this.setState({textTopic: text});
                  //this.apiCall(text)
                }}
                //onChangeText={(text) => this.setState({stateUSA: text})}
                value={this.state.textTopic}
              />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TouchableOpacity
                style={styles.textInputButtonStyle}
                onPress={() => {
                  this.createInitialURL();
                }}>
                <Svg height="50" width="50">
                  <Path
                    fill="white"
                    transform="scale(2)"
                    d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                  />
                  <Path d="M0 0h24v24H0z" fill="none" />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingTop: '3%',
              paddingLeft: '1%',
              paddingRight: '1%',
            }}>
            <View style={{flex: 4, justifyContent: 'center'}}>
              <TextInput
                style={styles.textInputStyle2}
                placeholder={'Search Language'}
                onChangeText={text => {
                  this.setState({textLanguage: text});
                  // this.apiCall(text)
                }}
                //onChangeText={(text) => this.setState({stateUSA: text})}
                value={this.state.textLanguage}
              />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}} />
          </View>

          <View style={{flex: 2, backgroundColor: 'green'}}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    //flexDirection:'row'k
                  }}>
                  <View style={{flex: 1, backgroundColor: 'white'}}>
                    <View style={{flex: 0.5, flexDirection: 'row'}}>
                      <View style={{flex: 1, padding: '2%'}}>
                        <TouchableOpacity
                          style={
                            this.state.filter === 'stars'
                              ? styles.buttonSelected
                              : styles.buttonUnselected
                          }
                          onPress={() => {
                            this.setFilter('stars');
                          }}>
                          <Text
                            style={
                              this.state.filter === 'stars'
                                ? styles.buttonTextSelected
                                : styles.buttonTextUnselected
                            }>
                            Stars
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{flex: 1, padding: '2%'}}>
                        <TouchableOpacity
                          style={
                            this.state.filter === 'score'
                              ? styles.buttonSelected
                              : styles.buttonUnselected
                          }
                          onPress={() => {
                            this.setFilter('score');
                          }}>
                          <Text
                            style={
                              this.state.filter === 'score'
                                ? styles.buttonTextSelected
                                : styles.buttonTextUnselected
                            }>
                            Relavency
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}
          />
        </View>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Results: ResultsScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

//export default createAppContainer(AppNavigator);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  buttonUnselected: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#017acd',
    elevation: 3,
    shadowOffset: {width: 0, height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
  buttonSelected: {
    flex: 1,
    backgroundColor: '#017acd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#017acd',
    elevation: 3,
    shadowOffset: {width: 0, height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
  buttonTextSelected: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonTextUnselected: {
    fontSize: 20,
    color: '#017acd',
    fontWeight: 'bold',
  },
  textInputButtonStyle: {
    flex: 1,
    backgroundColor: '#017acd',
    height: Dimensions.get('window').height * 0.08,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    shadowOffset: {width: 0, height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    shadowOffset: {width: 0, height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 3,
    backgroundColor: 'white',
    fontSize: 20,
    paddingLeft: '2%',
  },
  textInputStyle2: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 3,
    backgroundColor: 'white',
    fontSize: 20,
    paddingLeft: '2%',
  },
});
