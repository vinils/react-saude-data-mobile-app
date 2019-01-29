import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import WeightLocation from './WeightLocation';

class MainScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <WeightLocation/>
        {/* <Text>Main</Text>
        <Button onPress={() => this.props.navigation.navigate("Detail")} title="Detail Page" /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center'
  }
});

export default MainScreen;