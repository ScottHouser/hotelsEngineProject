import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Path, Svg} from 'react-native-svg';

export default class ResultsFooter extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 0,
          marginTop: Dimensions.get('window').height * -0.12,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}>
          <TouchableOpacity
            style={{
              height: Dimensions.get('window').height * 0.1,
              width: Dimensions.get('window').height * 0.1,
              backgroundColor: '#017acd',
              borderRadius: 90,
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: '2%',
              elevation: 3,
            }}
            onPress={() => {
              this.props.pageBackward();
            }}>
            <Svg height="24" width="24">
              <Path
                transform="rotate(180 12 12)"
                fill="white"
                d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"
              />
              <Path d="M0 0h24v24H0z" fill="none" />
            </Svg>
          </TouchableOpacity>
          <View style={{height: 10, width: 10}} />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}>
          {this.props.pageCounter()}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}>
          <TouchableOpacity
            style={{
              height: Dimensions.get('window').height * 0.1,
              width: Dimensions.get('window').height * 0.1,
              backgroundColor: '#017acd',
              borderRadius: 90,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 3,
            }}
            onPress={() => {
              this.props.pageForward();
            }}>
            <Svg height="24" width="24">
              <Path
                fill="white"
                d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"
              />
              <Path d="M0 0h24v24H0z" fill="none" />
            </Svg>
          </TouchableOpacity>

          <View style={{height: 10, width: 10}} />
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
