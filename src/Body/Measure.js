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

export default class Measure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTimeStr: new moment().format('YYYY-MM-DDTHH:mm:ssZ'),
      location: null,
      chest: null,
      abdomen: null,
      waist: null,
      hip: null,
      armLeft: null,
      armRight: null,
      forearmLeft: null,
      forearmRight: null,
      legLeft: null,
      legRight: null,
      calfLeft: null,
      calfRight: null,

      locationError: null,
      saveError: null
    };
  }

  _saveData = async () => {
    try {
        let {dateTimeStr, location, chest, abdomen, waist, hip, armLeft, armRight, forearmLeft, forearmRight, legLeft, legRight, calfLeft, calfRight} = this.state;

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
            data.fat = fat
        }

        if(chest) {
            data.chest = chest
        }

        if(abdomen) {
            data.abdomen = abdomen
        }

        if(waist) {
            data.waist = waist
        }

        if(hip) {
            data.hip = hip
        }

        if(armLeft) {
            data.armLeft = armLeft
        }

        if(armRight) {
            data.armRight = armRight
        }

        if(forearmLeft) {
            data.forearmLeft = forearmLeft
        }

        if(forearmRight) {
            data.forearmRight = forearmRight
        }

        if(legLeft) {
            data.legLeft = legLeft
        }

        if(legRight) {
            data.legRight = legRight
        }

        if(calfLeft) {
            data.calfLeft = calfLeft
        }

        if(calfRight) {
            data.calfRight = calfRight
        }

        await AsyncStorage.setItem(this.state.dateTimeStr, JSON.stringify(data));
        this.setState({chest: null, abdomen: null, waist: null, hip: null, armLeft: null, armRight: null, forearmLeft: null, forearmRight: null, legLeft: null, legRight: null, calfLeft: null, calfRight: null})
  
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

  render() {
    return (
      <View style={ _styles.container }>
        <TextInput
          placeholder='Data'
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
        <View style={ {flexDirection: 'row'} } key={ 'chesttView' }>
            <Text>Tórax: </Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='(cm)'
              onChangeText={(text) => this.setState({chest: text})}
              value={this.state.chest}
            />
        </View>
        <View style={ {flexDirection: 'row'} } key={ 'abdomenView' }>
            <Text>Abdomen: </Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='(cm)'
              onChangeText={(text) => this.setState({abdomen: text})}
              value={this.state.abdomen}
            />
        </View>
        <View style={ {flexDirection: 'row'} } key={ 'waistView' }>
            <Text>Cintura: </Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='(cm)'
              onChangeText={(text) => this.setState({waist: text})}
              value={this.state.waist}
            />
        </View>
        <View style={ {flexDirection: 'row'} } key={ 'hipView' }>
            <Text>Quadril: </Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='(cm)'
              onChangeText={(text) => this.setState({hip: text})}
              value={this.state.hip}
            />
        </View>
        <View style={ {flexDirection: 'row'} } key={ 'armView' }>
            <Text>Braço: </Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='Esquerdo'
              onChangeText={(text) => this.setState({armLeft: text})}
              value={this.state.armLeft}
            />
            <Text>&nbsp;</Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='Direito'
              onChangeText={(text) => this.setState({armRight: text})}
              value={this.state.armRight}
            />
        </View>
        <View style={ {flexDirection: 'row'} } key={ 'forearmView' }>
            <Text>Antebraço: </Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='Esquerdo'
              onChangeText={(text) => this.setState({forearmLeft: text})}
              value={this.state.forearmLeft}
            />
            <Text>&nbsp;</Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='Direito'
              onChangeText={(text) => this.setState({forearmRight: text})}
              value={this.state.forearmRight}
            />
        </View>
        <View style={ {flexDirection: 'row'} } key={ 'legView' }>
            <Text>Perna: </Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='Esquerdo'
              onChangeText={(text) => this.setState({legLeft: text})}
              value={this.state.legLeft}
            />
            <Text>&nbsp;</Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='Direito'
              onChangeText={(text) => this.setState({legRight: text})}
              value={this.state.legRight}
            />
        </View>
        <View style={ {flexDirection: 'row'} } key={ 'calfView' }>
            <Text>Panturrilha: </Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='Esquerdo'
              onChangeText={(text) => this.setState({calfLeft: text})}
              value={this.state.calfLeft}
            />
            <Text>&nbsp;</Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
              textAlign='center'
              keyboardType='numeric'
              placeholder='Direito'
              onChangeText={(text) => this.setState({calfRight: text})}
              value={this.state.calfRight}
            />
        </View>

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
