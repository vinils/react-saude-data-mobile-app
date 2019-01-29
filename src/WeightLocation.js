import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { Location, Permissions } from 'expo';
import moment from 'moment';

const CommonStyles = {
    generalFontSize: 14,
    explainTextColor: '#999'
}

const _styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        alignItems: 'flex-start'
    },
    historyText: {
        marginHorizontal: 32,
        marginBottom: 12,
        fontSize: CommonStyles.generalFontSize,
        color: 'black'
    },
});

export default class WeightLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTimeStr: null,
      location: null,
      weight: null,
      locationError: null,
      saveError: null
    };
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  _saveData = async () => {
    try {
        let dateTimeStr = this.state.dateTimeStr
        let data = await AsyncStorage.getItem(dateTimeStr)
        if(!data) {
            data = {}
        } else {
            data = JSON.parse(data);
        }

        data.weight = this.state.weight
        data.location= this.state.location

        await AsyncStorage.setItem(this.state.dateTimeStr, JSON.stringify(data));
        this.setState({weight: null})
    } catch (err) {
      this.setState({saveError: err})
    }
  }

  _getLocationAsync = async () => {
    try {
        let {status } = await Permissions.askAsync(Permissions.LOCATION)

        if(status === 'granted') {
            let {timestamp, coords} = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
            let location = {
                longitude: coords.longitude,
                altitude: coords.altitude,
                latitude: coords.latitude,
                accuracy: coords.accuracy,
                speed: coords.speed
            }
            this.setState({
                dateTimeStr: new moment(new Date(timestamp)).format('YYYY-MM-DDTHH:mm:ssZ'),
                location: JSON.stringify(location)
            })
        } else {
            this.setState({locationError: 'Permission not granted. res: ' + JSON.stringify(res)})
        }
    } catch (err) {
        this.setState({locationError: JSON.stringify(err)})
    }
  };

  _getDescription(text) {
      return (
        <Text style={ _styles.historyText }>
            { text }
        </Text>
      )
  }

  render() {
    return (
      <View style={ _styles.container }>
        <View style={ {margin: 12, flexDirection: 'row'} } key={ 'locationView' }>
            <TextInput
              style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 1}}
              editable = {false}
              value={this.state.location}
            />
            <Text>&nbsp;</Text>
            <Button
              onPress={this._getLocationAsync}
              title="Reload"
              color="#841584"
              accessibilityLabel="Reload"
            />        
        </View>
      
        { this.state.locationError ? this._getDescription(this.state.locationError) : null }

        <View style={ {margin: 12, flexDirection: 'row'} } key={ 'weightView' }>
            <TextInput
              style={{height: 40, width: 60, borderColor: 'gray', borderWidth: 1}}
              textAlign={'center'}
              keyboardType='numeric'
              maxLength={6}
              onChangeText={(text) => this.setState({weight: text})}
              value={this.state.weight}
            />
            <Text>&nbsp;</Text>
            <Button
              onPress={this._saveData}
              title="Save"
              color="#841584"
              accessibilityLabel="Save"
              disabled={!(this.state.weight && this.state.location)}
            />        
        </View>
      
        { this.state.saveError ? this._getDescription(this.state.saveError) : null }
        
      </View>
    );
  }
}
