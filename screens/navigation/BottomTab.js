import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Text, View, StyleSheet } from 'react-native';
import InshortTabs from '../../components/InshortTabs';
import Card from '../../components/Card';
import ProfileScreen from '../ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home" 
      screenOptions={({ route }) => ({
       
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'disc-outline' : 'logo-discord';
          } else if (route.name === 'UserScreen') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        
        tabBarStyle: {
          paddingBottom: 10, // Adjust padding here
          height: 70, // Adjust tab bar height if needed
        },
        tabBarLabelStyle: {
          fontSize: 14, // Adjust label font size
        },
        tabBarItemStyle: {
        //   paddingVertical: 5, // Adjust padding around each tab item
        },
      })}
    >
      <Tab.Screen name="Discover" component={InshortTabs} />
      <Tab.Screen name="Home" component={Card} />
      <Tab.Screen name="UserScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabNavigator;
