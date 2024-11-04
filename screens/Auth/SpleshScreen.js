import { StyleSheet, Text, View ,Image} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'


const SpleshScreen = () => {
    const navigation=useNavigation()
    useEffect(()=>{
    setTimeout(()=>{
        navigation.navigate('Login')
    },2000)
    },[navigation])
  return (
    <View style={{...styles.container}}>
  <Image source={require('../../assets/SpleshScreen.png')}/>
    </View>
  )
}

export default SpleshScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'

    }
})