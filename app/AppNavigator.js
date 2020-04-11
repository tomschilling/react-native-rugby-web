import React from 'react';
import { Platform, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import { createBottomTabNavigator } from 'react-navigation-tabs'

import { SimpleLineIcons } from '@expo/vector-icons';

import GameScreen from './screens/GameScreen';
import SettingsScreen from './screens/SettingsScreen';
import ItemScreen from './screens/ItemScreen';

const Tabs = createBottomTabNavigator(
  {
    Matches: {
      screen: GameScreen,
      navigationOptions: {
        title: 'Matches'
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings'
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Matches') iconName = 'trophy';
        else if (routeName === 'Settings') iconName = 'settings';

        return (
          <SimpleLineIcons name={iconName} size={24} color={tintColor} />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: 'deepskyblue',
      inactiveTintColor: '#929292'
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    Item: ItemScreen
  },
  {
    defaultNavigationOptions: {
      headerTintColor: 'deepskyblue',
      headerStyle: {
        ...Platform.select({
          ios: { backgroundColor: 'white' }
        })
      },
      cardStyle: {
        backgroundColor: 'white'
      }
    }
  }
);

export default createAppContainer(AppNavigator);
