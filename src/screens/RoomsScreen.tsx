import { View, Button } from 'react-native'
import React from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


export const RoomsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()


  // const { userId } = route.params
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/*<Text>Rooms for {userId}</Text>*/}
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  )
}
