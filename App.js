import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/AppNavigator'

class App extends React.Component {
  render() {
    return (
      // <View style={styles.container}>
      //   <AppNavigator/>
      //   {/* <Text>Open up App.js to start working on your app2!</Text> */}
      // </View>
        <AppNavigator/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;