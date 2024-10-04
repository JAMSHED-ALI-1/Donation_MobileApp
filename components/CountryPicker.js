// import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native'
// import React, { useState } from 'react'
// import CountryPicker from 'react-native-country-picker-modal';
// const CustomCountryPicker = () => {
//     const [countryCode, setCountryCode] = useState('IN');
//     const [country, setCountry] = useState(null);
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const onSelect = (country) => {
//         setCountryCode(country.cca2);
//         setCountry(country);
//       };
//   return (
//     <View style={styles.container}>
//     {/* Country Picker */}
//     <TouchableOpacity style={styles.countryPicker}>
//       <CountryPicker
//         countryCode={countryCode}
//         withFlag
//         withCallingCode
//         withFilter
//         withCallingCodeButton
//         onSelect={onSelect}
//       />
//       {/* Show Dial Code */}
//       {/* <Text style={styles.dialCode}>
//         {country?.callingCode ? `+${country.callingCode}` : '+1'}
//       </Text> */}
//     </TouchableOpacity>

//     {/* Phone Number Input */}
//     {/* <TextInput
//       style={styles.phoneInput}
//       placeholder="Phone Number"
//       keyboardType="phone-pad"
//       value={phoneNumber}
//       onChangeText={setPhoneNumber}
//     /> */}
//   </View>
// );
// };


// export default CustomCountryPicker

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor:'#0913ab',
//         borderRadius: 8,
//         paddingHorizontal: 10,
//         paddingVertical: 12.6,
//         margin: 10,
//       },
//       countryPicker: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginRight: 10,
//       },
//       dialCode: {
//         marginLeft: 10,
//         fontSize: 16,
//       },
//       phoneInput: {
//         flex: 1,
//         fontSize: 16,
//       },
// })
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CountryPicker = () => {
  return (
    <View>
      <Text>CountryPicker</Text>
    </View>
  )
}

export default CountryPicker

const styles = StyleSheet.create({})