import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

const CommonStyles = {
  generalFontSize: 14,
  explainTextColor: '#999'
}

const _styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
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

class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadDataError: null,
      loadedTime: null,
    };
  }

  _getDescription(text) {
      return (
        <Text style={ _styles.historyText }>
            { text }
        </Text>
      )
  }

  _loadData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys && keys.length > 0) {
        let mappedExams = []

        for(x=0; x<= keys.length-1; x++) {
            let key = keys[x]
            let date = new Date(key)

            if(date) {
                let value = await AsyncStorage.getItem(key)
                let {weight, location, fat, lean, water, chest, abdomen, waist, hip, armLeft, armRight, forearmLeft, forearmRight, legLeft, legRight, calfLeft, calfRight } = JSON.parse(value)
                  
                if(typeof weight !== 'undefined') {
                  mappedExams.push({
                      "@odata.type": '#Data.Models.ExamDecimal',
                      GroupId: 'BFDF8F5E-C514-416D-B6B0-35B196F5CA96',
                      CollectionDate: date,
                      DecimalValue: parseFloat(weight)
                  });
                }

                if(typeof location !== 'undefined') {
                  mappedExams.push({
                      "@odata.type": '#Data.Models.ExamString',
                      GroupId: '4665DB6B-38B5-4F19-9833-A8AD61DB1587',
                      CollectionDate: date,
                      StringValue: location
                  });
                }

                if(typeof fat !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: '79D91946-706E-4856-9817-54AB1B0D92F3',
                    CollectionDate: date,
                    DecimalValue: parseFloat(fat)
                  });
                }

                if(typeof lean !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: '756B8511-0584-4A74-ADAE-DCEF307F6D94',
                    CollectionDate: date,
                    DecimalValue: parseFloat(lean)
                  });
                }

                if(typeof water !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: 'AEA37732-4EFB-42B3-BC7D-813014A6038D',
                    CollectionDate: date,
                    DecimalValue: parseFloat(water)
                  });
                }

                if(typeof chest !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: '42A39668-8556-407F-853B-50D6B570043B',
                    CollectionDate: date,
                    DecimalValue: parseFloat(chest)
                  });
                }

                if(typeof abdomen !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: '53D1F102-83E4-44E7-A958-00E0305D7878',
                    CollectionDate: date,
                    DecimalValue: parseFloat(abdomen)
                  });
                }

                if(typeof waist !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: 'B68C2344-97C7-4623-B988-ACFB1E493EAA',
                    CollectionDate: date,
                    DecimalValue: parseFloat(waist)
                  });
                }

                if(typeof hip !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: 'EFDBC084-E3FF-428A-B892-F186D9EBA293',
                    CollectionDate: date,
                    DecimalValue: parseFloat(hip)
                  });
                }

                if(typeof armLeft !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: 'C08804CA-CA2F-4766-A4A6-BD16B435D6E4',
                    CollectionDate: date,
                    DecimalValue: parseFloat(armLeft)
                  });
                }

                if(typeof armRight !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: '92E6CAB8-570B-49E4-8EED-210EA4AA47CF',
                    CollectionDate: date,
                    DecimalValue: parseFloat(armRight)
                  });
                }

                if(typeof forearmLeft !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: 'B09F8C25-4FBE-4958-AC2A-6E3E975DB4D8',
                    CollectionDate: date,
                    DecimalValue: parseFloat(forearmLeft)
                  });
                }

                if(typeof forearmRight !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: 'D98DB4B6-99A4-4BC2-8FDD-3D0C0F03D783',
                    CollectionDate: date,
                    DecimalValue: parseFloat(forearmRight)
                  });
                }

                if(typeof legLeft !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: '6E0F569E-D32D-49DC-B748-CAE562395EEA',
                    CollectionDate: date,
                    DecimalValue: parseFloat(legLeft)
                  });
                }

                if(typeof legRight !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: '363425A9-BDDC-4144-8106-94B302E660A3',
                    CollectionDate: date,
                    DecimalValue: parseFloat(legRight)
                  });
                }

                if(typeof calfLeft !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: '922F8296-27B9-4B32-948B-DCFC6D9B6549',
                    CollectionDate: date,
                    DecimalValue: parseFloat(calfLeft)
                  });
                }

                if(typeof calfRight !== 'undefined') {
                  mappedExams.push({
                    "@odata.type": '#Data.Models.ExamDecimal',
                    GroupId: '8430AB70-181F-4AC0-A674-D545363AB3D9',
                    CollectionDate: date,
                    DecimalValue: parseFloat(calfRight)
                  });
                }
            }
        }

        let obj = {
            method: 'post',
            withCredentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Cache': 'no-cache'
            },
            body: JSON.stringify({ "Exams": mappedExams})
        }

        if(mappedExams.length > 0) {
            try {
                await fetch('http://192.168.15.250/data/odata/v4/exams/BulkInsert', obj);
                AsyncStorage.clear();
            } catch (err) {
                await fetch('http://mypc01.ddns.net/data/odata/v4/exams/BulkInsert', obj);
                AsyncStorage.clear();
            }
        }
      }

      this.setState({loadedTime: new Date()})

    } catch (err) {
      // throw err;
      this.setState({loadDataError: JSON.stringify(err.message)})
    }
  }

  render () {
    return (
      <View style={_styles.container}>
        <View style={ {margin: 12, flexDirection: 'row'} } key={ 'loadDataView' }>
            <Button
              onPress={() => {AsyncStorage.clear(); this.setState({loadedTime: new Date()})}}
              title="Clear Data"
              color="#841584"
              accessibilityLabel="Clear Data"
            />        
            <Text>&nbsp;</Text>
            <Button
              onPress={this._loadData}
              title="Upload Data"
              color="#841584"
              accessibilityLabel="Upload Data"
            />        
        </View>

        { this.state.loadDataError ? this._getDescription(this.state.loadDataError) : null }

        { this.state.loadedTime ? this._getDescription('done: ' + this.state.loadedTime) : null }

      </View>
    );
  }
}

export default Data;