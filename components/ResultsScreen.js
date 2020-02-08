import React from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ResultsItem from './ResultsItem';
import {Path, Svg} from 'react-native-svg';
import ResultsFooter from './ResultsFooter';
import ResultsModal from './ResultsModal';

export class ResultsScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      initialURL: this.props.navigation.getParam('initialURL'),
      textTopic: '',
      textLanguage: '',
      isLoading: false,
      responseItems: [],
      modalVisible: false,
      filter: '',
      page: 1,
      resultsTotal: 0,
      activeRepo: {
        name: '',
        fullName: '',
        owner: '',
        description: '',
        url: '',
        starCount: '',
      },
    };
  }

  componentDidMount = () => {
    this.callGitHub();
  };

  goBack = () => {
    this.props.navigation.navigate('Home');
  };

  pageCounter = () => {
    if (this.state.resultsTotal === 0) {
      return;
    }

    let totalResults = this.state.resultsTotal;
    let numberOfPages;
    if (totalResults % 30 === 0) {
      numberOfPages = Math.floor(totalResults / 30);
    } else {
      numberOfPages = Math.floor(totalResults / 30) + 1;
    }

    return (
      <View
        style={{
          padding: '5%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          marginBottom: 10,
          backgroundColor: '#017acd',
          elevation: 3,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '5%',
          }}>
          {this.state.page + '/' + numberOfPages}
        </Text>
      </View>
    );
  };

  pageForward = () => {
    if (
      this.state.isLoading ||
      this.state.page >= Math.floor(this.state.resultsTotal / 30)
    ) {
      return;
    }

    let page = this.state.page;
    page++;
    this.setState({page: page});
    this.callGitHub(page);
  };

  pageBackward = () => {
    if (this.state.isLoading || this.state.page === 1) {
      return;
    }

    let page = this.state.page;
    page--;
    this.setState({page: page});
    this.callGitHub(page);
  };

  callGitHub = (page = 1) => {
    console.log('start');

    let url = this.state.initialURL + page;

    this.setState({isLoading: true});

    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        let responseObject = response.json();
        console.log('response');

        if (response.status === 200 || response.status === 201) {
          return responseObject;
        } else {
          Alert.alert('Error', 'Error code ' + response.status);
          this.setState({isLoading: false});
          return 'error';
        }
      })
      .then(responseJson => {
        if (responseJson === 'error') {
          this.setState({isLoading: false});
          return;
        }

        console.log('got response');
        if (responseJson.incomplete_results) {
          Alert.alert(
            'Incomplete!',
            'Results may be incomplete. Narrow your search parameters.',
          );
        }

        if (responseJson.total_count === 0) {
          Alert.alert('No Results found', 'Broaden your search parameters');
        }

        this.setState({
          responseItems: responseJson.items,
          isLoading: false,
          resultsTotal: responseJson.total_count,
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({isLoading: false});
        return error;
      });
  };

  mapResponseIntoTextList = () => {
    if (!this.state.isLoading) {
      return this.state.responseItems.map((data, index) => {
        return (
          <ResultsItem
            name={data.name}
            fullName={data.fullName}
            owner={data.owner.login}
            description={data.description}
            url={data.url}
            startCount={data.stargazers_count}
            index={index}
            key={index}
            language={data.language}
            stargazers_count={data.stargazers_count}
            setModalData={repo => {
              this.setState({modalVisible: true, activeRepo: repo});
            }}
          />
        );
      });
    } else {
      return (
        <View style={{marginTop: 100}}>
          <ActivityIndicator color={'#017acd'} size={50} />
        </View>
      );
    }
    // {this.mapResponseIntoTextList()}
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#017acd',
            shadowOffset: {width: 0, height: 3},
            shadowColor: 'black',
            shadowOpacity: 0.5,
            elevation: 3,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingLeft: '5%',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.goBack();
              }}>
              <Svg height="35" width="35">
                <Path d="M0 0h24v24H0z" fill="none" />
                <Path
                  transform="scale(1.5)"
                  fill="white"
                  d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: '3%',
            }}>
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
              {'Results'}
            </Text>
          </View>
          <View style={{flex: 1}} />
        </View>
        <View style={{flex: 8}}>
          <ScrollView style={{flex: 1}}>
            {this.mapResponseIntoTextList()}
          </ScrollView>
        </View>
        <ResultsFooter
          pageBackward={this.pageBackward}
          pageForward={this.pageForward}
          pageCounter={this.pageCounter}
        />
        <ResultsModal
          modalVisible={this.state.modalVisible}
          activeRepo={this.state.activeRepo}
          closeModal={() => {
            this.setState({modalVisible: false});
          }}
        />
      </View>
    );
  }
}
