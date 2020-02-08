import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Picker,
  Button,
  Alert,
} from 'react-native';
import {Path, Svg} from 'react-native-svg';

export default class ResultsModal extends React.Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.modalBackground}>
          <View style={styles.modalRoundedContainer}>
            <View style={styles.modalRoundedContainer}>
              <View style={styles.modalHeaderContainer}>
                <View style={{flex: 1}} />
                <View style={styles.centeredFlex1}>
                  <Text style={styles.repoTextStyle}>{'Repository'}</Text>
                </View>

                <View style={styles.closeButtonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.closeModal();
                    }}>
                    <Svg height="35" width="35">
                      <Path
                        fill="white"
                        transform="scale(1.5)"
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                      />
                      <Path d="M0 0h24v24H0z" fill="none" />
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.mainBodyContainer}>
                <ScrollView style={styles.mainScrollStyle}>
                  <Text>
                    <Text style={{fontWeight: 'bold', fontSize: 25}}>
                      {'Name: '}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        color: '#808080',
                      }}>
                      {this.props.activeRepo.name}
                    </Text>
                  </Text>

                  <Text style={{marginTop: '3%'}}>
                    <Text style={styles.basicPropertyText}>
                      {'Full Name: '}
                    </Text>
                    <Text style={styles.basicPropertyExpositionText}>
                      {this.props.activeRepo.fullName}
                    </Text>
                  </Text>

                  <Text style={{marginTop: '3%'}}>
                    <Text style={styles.basicPropertyText}>{'Owner: '}</Text>
                    <Text style={styles.basicPropertyExpositionText}>
                      {this.props.activeRepo.owner}
                    </Text>
                  </Text>

                  <Text style={{marginTop: '3%'}}>
                    <Text style={styles.basicPropertyText}>
                      {'Description: '}
                    </Text>
                    <Text style={styles.basicPropertyExpositionText}>
                      {this.props.activeRepo.description}
                    </Text>
                  </Text>

                  <Text style={{marginTop: '3%'}}>
                    <Text style={styles.basicPropertyText}>{'URL: '}</Text>
                    <Text style={styles.basicPropertyExpositionText}>
                      {this.props.activeRepo.url}
                    </Text>
                  </Text>

                  <Text style={{marginTop: '3%'}}>
                    <Text style={styles.basicPropertyText}>
                      {'Star Count: '}
                    </Text>
                    <Text style={styles.basicPropertyExpositionText}>
                      {this.props.activeRepo.starCount}
                    </Text>
                  </Text>
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4);',
    paddingTop: '5%',
    paddingRight: '5%',
    paddingLeft: '5%',
  },
  modalRoundedContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  modalHeaderContainer: {
    flex: 1,
    backgroundColor: '#017acd',
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  centeredFlex1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repoTextStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  mainBodyContainer: {
    flex: 7,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  mainScrollStyle: {
    flex: 1,
    paddingLeft: '3%',
    paddingTop: '3%',
  },
  basicPropertyText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: '3%',
  },
  basicPropertyExpositionText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: '3%',
    color: '#808080',
  },
  closeButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: '5%',
  },
});
