import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Newscontext } from '../API/Context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { BASE_URL } from './utils/Utils';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const DonationForm = ({ route }) => {
  const { darkTheme } = useContext(Newscontext);
  const { content } = route.params;
  const campaignId = content._id;
  const [amount, setAmount] = useState('');
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const presetAmounts = [10, 20, 30, 40];

  const handlePresetAmount = (value) => {
    setAmount(value.toString());
  };
  // const getUser = async () => {
  //   try {
  //     const userData = (await AsyncStorage.getItem("user"))
  //   } catch (error) {
  //    console.log(error); 
  //   }
  // };
  // useEffect(()=>{
  //   getUser()
  // },[])
  const handledonation = async () => {
    try {
      const res = await axios.post(`${BASE_URL}campaigns/${campaignId}/donate`, {
        userId: "671c9152ee94eeac3e20a9df",
        amount: parseFloat(amount)
      });

      if (res.data.success) {
        setModalVisible(true);  // Show modal on success
      }
    } catch (error) {
      console.error('Donation Error:', error);
    }
  };

  const handleContinue = () => {
    handledonation();
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: darkTheme ? 'black' : 'white' }
    ]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={darkTheme ? 'white' : 'black'} />
      </TouchableOpacity>

      <Text style={[
        styles.title,
        { color: darkTheme ? 'white' : 'black' }
      ]}>Donate amount</Text>

      <Text style={[
        styles.subtitle,
        { color: darkTheme ? '#AAAAAA' : '#666666' }
      ]}>How much would you like to donate?</Text>

      <View style={{ ...styles.inputContainer, backgroundColor: darkTheme ? 'white' : 'black' }}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          style={[
            styles.input,
            { color: darkTheme ? 'black' : 'white' }
          ]}
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="000.00"
          placeholderTextColor={darkTheme ? 'white' : 'black'}
        />
      </View>

      <View style={styles.presetContainer}>
        {presetAmounts.map((preset) => (
          <TouchableOpacity
            key={preset}
            style={[
              styles.presetButton,
              amount === preset.toString() && styles.presetButtonActive
            ]}
            onPress={() => handlePresetAmount(preset)}>
            <Text style={[
              styles.presetButtonText,
              amount === preset.toString() && styles.presetButtonTextActive
            ]}>${preset}.00</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Modal for donation success */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LottieView
              source={require('../assets/success.json')}  // Path to your Lottie animation file
              autoPlay
              loop={false}
              style={{ width: 150, height: 150 }}
            />
            <Text style={styles.successText}>Donation Successful!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                navigation.goBack();
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  currencySymbol: {
    fontSize: 24,
    marginRight: 8,
    color: '#333333',
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: '500',
  },
  presetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  presetButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  presetButtonActive: {
    backgroundColor: '#E0F2F1',
  },
  presetButtonText: {
    fontSize: 16,
    color: '#666666',
  },
  presetButtonTextActive: {
    color: 'red',
  },
  continueButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    marginVertical: 20,
  },
  closeButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DonationForm;
