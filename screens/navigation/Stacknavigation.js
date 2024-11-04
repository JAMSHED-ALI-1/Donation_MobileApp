import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import DonationDetailsScreen from '../../components/DonationDetailsScreen';
import Priviewcompain from '../Priviewcompain';
import DonationForm from '../DonationForm';
import SpleshScreen from '../Auth/SpleshScreen';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
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
    <NavigationContainer >
    <Stack.Navigator screenOptions={{headerShown: false }} initialRouteName={'BottomTab'}>
      <Stack.Screen name="SpleshScreen" component={SpleshScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DonationDetailsScreen" component={DonationDetailsScreen} />
      <Stack.Screen name="Priviewcompain" component={Priviewcompain} />
      <Stack.Screen name="DonationForm" component={DonationForm} />

    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Stacknavigation

const styles = StyleSheet.create({})