import { View, Text, Button } from 'react-native'
import React from 'react'


export const Rooms = ({ navigation, route }) => {
  const { userId } = route.params
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Rooms for {userId}</Text>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  )
}