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
        alignItems: 'flex-start',
        margin: 12
    },
    historyText: {
        marginHorizontal: 32,
        marginBottom: 12,
        fontSize: CommonStyles.generalFontSize,
        color: 'black'
    },
});

export default class Composition extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTimeStr: new moment().format('YYYY-MM-DDTHH:mm:ssZ'),
      location: null,
      total: null,
      lean: null,
      fat: null,
      water: null,
      locationError: null,
      saveError: null
    };
  }

  _saveData = async () => {
    try {
        let {dateTimeStr, location, fat, lean, water} = this.state;

        if(!dateTimeStr) {
            throw new Error('no datetime')
        }

        let data = await AsyncStorage.getItem(dateTimeStr)

        if(!data) {
            data = {}
        } else {
            data = JSON.parse(data);
        }

        if(location) {
            data.location = location
        }

        if(fat) {
            data.fat = fat
        }

        if(lean) {
            data.lean = lean
        }

        if(water) {
            data.water = water
        }

        await AsyncStorage.setItem(this.state.dateTimeStr, JSON.stringify(data));
        this.setState({total: null, fat: null, lean: null, water: null})
    } catch (err) {
      this.setState({saveError: err.message})
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
                timeStamp: timestamp,
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

  _totalHandleChange = (totalText) => {
    let value = parseFloat(totalText)
    let fat = this.state.fat ? parseFloat(this.state.fat) : null
    let lean = this.state.lean ? parseFloat(this.state.lean) : null

    if(value && fat) {
        lean =  value - fat;
        this.setState({total: totalText, lean: lean.toString()}) 
    } else if (value && lean) {
        fat =  value - lean;
        this.setState({total: totalText, fat: fat.toString()}) 
    } else { 
        this.setState({total: totalText}) 
    }
  }

  _fatHandleChange = (fatText) => {
    let value = parseFloat(fatText)
    let total = this.state.total ? parseFloat(this.state.total)  : null
    let lean = this.state.lean ? parseFloat(this.state.lean) : null

    if(value && total) {
        lean =  total - value;
        this.setState({fat: fatText, lean: lean.toString()}) 
    } else if (value && lean) {
        total =  value + lean;
        this.setState({fat: fatText, total: total.toString()}) 
    } else { 
        this.setState({fat: fatText}) 
    }
  }

  _leanHandleChange = (leanText) => {
    let value = parseFloat(leanText)
    let total = this.state.total ? parseFloat(this.state.total) : null
    let fat = this.state.fat ? parseFloat(this.state.fat) : null

    if(value && total) {
        fat =  total - value;
        this.setState({lean: leanText, fat: fat.toString()}) 
    } else if (value && fat) {
        total =  value + fat;
        this.setState({lean: leanText, total: total.toString()}) 
    } else { 
        this.setState({lean: leanText}) 
    }
  }

  render() {
    return (
      <View style={ _styles.container }>
        <TextInput
          placeholder={'Data'}
          style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({dateTimeStr: text})}
          value={this.state.dateTimeStr}
        />
        <View style={ {flexDirection: 'row'} } key={ 'locationView' }>
            <TextInput
              style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
              editable = {false}
              onChangeText={(text) => this.setState({location: text})}
              value={this.state.location}
            />
            <Text>&nbsp;</Text>
            <Button
              onPress={this._getLocationAsync}
              title="Load"
              color="#841584"
              accessibilityLabel="Load"
            />        
            <Text>&nbsp;</Text>
            <Button
              onPress={() => this.setState({location: null})}
              title="Clean"
              color="#841584"
              accessibilityLabel="Clean"
            />        
        </View>
        <View style={ {flexDirection: 'row'} } key={ 'weightView' }>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='Total (kg)'
              onChangeText={this._totalHandleChange}
              value={this.state.total}
            />
            <Text>&nbsp;</Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='Gordo (kg)'
              onChangeText={this._fatHandleChange}
              value={this.state.fat}
            />
            <Text>&nbsp;</Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='Magro (kg)'
              onChangeText={this._leanHandleChange}
              value={this.state.lean}
            />
        </View>
        <TextInput
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
          textAlign='center'
          keyboardType='numeric'
          placeholder='Agua (L)'
          onChangeText={(text) => this.setState({water: text})}
          value={this.state.water}
        />
        <Button
          onPress={this._saveData}
          title="Salvar"
          color="#841584"
          accessibilityLabel="Salvar"
        />        
      
        { this.state.locationError ? this._getDescription(this.state.locationError) : null }

        { this.state.saveError ? this._getDescription(this.state.saveError) : null }
        
      </View>
    );
  }
}
