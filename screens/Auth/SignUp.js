import { StyleSheet, Text, TouchableOpacity, View,ActivityIndicator  } from 'react-native';
import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import CustomTextInput from '../../components/CustomTextInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BASE_URL } from '../utils/Utils';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password cannot be more than 20 characters long')
    .required('Password is required')
});



const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigation=useNavigation()
  const handleSignUp = async (values) => {
    setLoading(true); // Start loading
    try {
      const res = await axios.post(`${BASE_URL}users/`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      console.log('Signup Successful:', res);
  
      showMessage({
        message: 'Signup Successful!',
        description: 'Welcome to the platform!',
        type: 'success',
        icon: 'success',
      });
    } catch (error) {
      if (error.response) {
        console.log('Error response:', error.response.data);
        showMessage({
          message: 'Signup Failed',
          description: error.response.data.msg || 'An error occurred',
          type: 'danger',
          icon: 'danger',
        });
      } else {
        console.log('Signup Error:', error.message);
        showMessage({
          message: 'Network Error',
          description: 'Please check your connection and try again',
          type: 'danger',
          icon: 'danger',
        });
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/Animation.json')} 
        autoPlay 
        loop
        style={styles.lottie}
      />
      <Text style={styles.title}>Imdad</Text>
      <Text style={styles.subtitle}>Welcome back, you've been missed</Text>
      
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={SignupSchema}
        // onSubmit={handleSignUp()}  
        onSubmit={values => {
          handleSignUp(values); // Handle form submission here
        }}// Pass handleSignUp to Formik
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{ width: '90%' }}>
            <CustomTextInput
              placeholder="Please Enter Name"
              icon={require('../../assets/user.png')}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              touched={touched.name}
              errors={errors.name} // Display validation error if any
            />
            <CustomTextInput
              placeholder="Please Enter Email"
              icon={require('../../assets/email.png')}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              touched={touched.email}
              errors={errors.email} // Display validation error if any
            />
            <CustomTextInput
              placeholder="Please Enter Password"
              icon={require('../../assets/padlock.png')}
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              touched={touched.password}
              secure={true}
              errors={errors.password} // Display validation error if any
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign up</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <Text style={styles.referralText}>If already registred?</Text>
      <Text style={{...styles.referralText,fontWeight:'600'}} onPress={()=>navigation.navigate('Login')}>Login</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#0913ab',
    borderRadius: 15,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  referralText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    marginTop: 20,
  },
});


export default SignUp
