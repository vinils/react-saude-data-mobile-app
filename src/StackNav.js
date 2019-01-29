import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { StackNavigator } from  'react-navigation';
import IOSIcon from "react-native-vector-icons/Ionicons";
import MainScreen from "./MainScreen";
import DetailScreen from "./DetailScreen";
import Data from "./Data";
import BodyComposition from "./Body/Composition";
import BodyMeasure from "./Body/Measure";

const StackNav = StackNavigator({
  Main : {
    screen: MainScreen,
    navigationOptions: ({navigation}) => ({
      title: "Peso",
      headerLeft:(<TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                    <IOSIcon name="ios-menu" size={30} />
                  </TouchableOpacity>
      ),
      headerStyle: { paddingRight: 10, paddingLeft: 15 }
    })
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({navigation}) => ({
      title: "Detail",
    })     
  },
  Data: {
    screen: Data,
    navigationOptions: ({navigation}) => ({
      title: "Dados",
    })     
  },
  BodyComposition: {
    screen: BodyComposition,
    navigationOptions: ({navigation}) => ({
      title: "Composição",
    })     
  },
  BodyMeasure: {
    screen: BodyMeasure,
    navigationOptions: ({navigation}) => ({
      title: "Composição",
    })     
  }
});

export default StackNav;
