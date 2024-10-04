import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import CustomCountryPicker from '../../components/CountryPicker';

const Login = () => {
    const [text,setText]=useState('')
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/Animation.json')} 
        autoPlay 
        loop
        style={styles.lottie}
      />
      <Text style={styles.title}>Donation</Text>
      <Text style={styles.subtitle}>Welcome back, you've been missed</Text>

      <View style={styles.inputContainer}>
        <CustomCountryPicker />
        <TextInput 
          placeholder='Mobile Number'
          style={styles.phoneInput}
          value={text}
          onChangeText={setText}
        />
      </View>
      <TouchableOpacity style={styles.button}>
<Text style={{fontSize:18,fontWeight:'600',color:'#fff'}}>Verify</Text>
      </TouchableOpacity>
      <Text style={{fontSize:14,fontWeight:'400',color:'black', marginTop: 20,}}>Have a reffrel code ? </Text>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', // Centers everything vertically
    alignItems: 'center',     // Centers everything horizontally
    backgroundColor: '#fff',
  },
  lottie: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 30,
    color: 'black',
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  phoneInput: {
    height: 55,
    width: '60%',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    marginLeft: 10,
    borderColor:'#0913ab'
     
  },
  button:{
    height:50,
    width:'88%',
    backgroundColor:'#0913ab',
    borderRadius:15,
    marginTop:30,
    alignItems:'center',
    justifyContent:'center'
  }
});
