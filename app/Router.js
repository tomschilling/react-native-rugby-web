import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { SimpleLineIcons } from '@expo/vector-icons';

import HomeScreen from './components/Home';

import SettingsScreen from './screens/SettingsScreen';
import LoadingScreen from './components/LoadingScreen'


const Tabs = createBottomTabNavigator(
  {
    Matches: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: `Matches`,
        }),
    },
    Settings:{
        screen: SettingsScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Settings`,
        }),
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

const AppStack = createStackNavigator(
  {
    Home: {
      screen: Tabs,
    }  
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


const RoutesStack = createSwitchNavigator(
    {
        Loading: LoadingScreen,
        App: AppStack
    },
    {initialRouteName: 'Loading'}
);

const Router = createAppContainer(RoutesStack);

export default Router;
