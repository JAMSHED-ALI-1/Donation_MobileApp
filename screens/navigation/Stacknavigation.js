import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import DonationDetailsScreen from '../../components/DonationDetailsScreen';
const Stack = createNativeStackNavigator();


function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }

const Stacknavigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false }}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DonationDetailsScreen" component={DonationDetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Stacknavigation

const styles = StyleSheet.create({})