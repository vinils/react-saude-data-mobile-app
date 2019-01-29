import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer, createSwitchNavigator, DrawerNavigator } from 'react-navigation';

import SideMenu from './SideMenu'
import StackNav from './StackNav';

const routeConfigMap = {
  Item1: {
      screen: StackNav,
    }
}

const navigationRouteConfigMap = {
  initialRouteName: 'Item1',
  contentComponent: SideMenu,
  drawerWidth: Dimensions.get('window').width - 120,  
}

const AppNavigator = DrawerNavigator(routeConfigMap, navigationRouteConfigMap);
// const AppNavigator = createAppContainer(createDrawerNavigator(routeConfigMap, navigationRouteConfigMap))

export default AppNavigator;
