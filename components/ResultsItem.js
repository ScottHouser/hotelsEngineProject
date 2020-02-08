import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Path, Svg} from 'react-native-svg';

export default class ResultsItem extends React.Component {
  render() {
    return (
      <View key={this.props.index} style={styles.mainBackground}>
        <View style={styles.leftViewBackground}>
          <TouchableOpacity
            onPress={() => {
              let repo = {
                name: this.props.name,
                fullName: this.props.fullName,
                owner: this.props.owner,
                description: this.props.description,
                url: this.props.url,
                starCount: this.props.stargazers_count,
              };

              this.props.setModalData(repo);
            }}>
            <Text style={styles.underLineText}>{this.props.name}</Text>
          </TouchableOpacity>
          <Text>{this.props.owner}</Text>
          <Text>{this.props.language}</Text>
        </View>
        <View style={styles.rightViewBackground}>
          <Svg height="24" viewBox="0 0 24 24" width="24">
            <Path d="M0 0h24v24H0z" fill="none" />
            <Path
              fill="black"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
            <Path d="M0 0h24v24H0z" fill="none" />
          </Svg>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {this.props.stargazers_count}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainBackground: {
    height: 80,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  leftViewBackground: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft: '2%',
  },
  rightViewBackground: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '2%',
    borderColor: 'white',
  },
  underLineText: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#017acd',
  },
  starNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#017acd',
  },
});
