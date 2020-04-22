import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SimpleLineIcons } from '@expo/vector-icons';

import GamesScreen from './screens/GamesScreen';
import SettingsScreen from './screens/SettingsScreen';
import SplashScreen from './screens/SplashScreen';


function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

const GamesStack = createStackNavigator();

function GamesStackScreen() {
  return (
    <GamesStack.Navigator>
      <GamesStack.Screen name="Games" component={GamesScreen} />
      <GamesStack.Screen name="Details" component={DetailsScreen} />
    </GamesStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MainTabContainer() {
  return (
    <Tab.Navigator
         screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {            
            let iconName;
            const routeName = route.name

            if (routeName === 'Games') iconName = 'trophy';
            else if (routeName === 'Settings') iconName = 'settings';
    
            return (
              <SimpleLineIcons name={iconName} size={size} color={color} />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray'
        }}>
        <Tab.Screen name="Games" component={GamesStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
  )
}

const AppStack = createStackNavigator();


export default function Router() {
  return (
    <NavigationContainer>
       <AppStack.Navigator
          initialRouteName="SplashScreen"
          headerMode="none">
          <AppStack.Screen name="SplashScreen" component={SplashScreen}/>
          <AppStack.Screen name="MainTabContainer" component={MainTabContainer} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
