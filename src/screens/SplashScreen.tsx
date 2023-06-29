import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const SplashScreen = () => {
  // const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  //
  // useEffect(() => {
  //   setTimeout(() => {
  //     // Navigate to the main screen after 3 seconds
  //     navigate('Main')
  //   }, 3000)
  // }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('../../assets/happly_splash.png')} />
    </View>
  )
}
export default SplashScreen
