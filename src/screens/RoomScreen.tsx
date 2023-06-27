import { View, Text, Button } from 'react-native'
import React from 'react'


export const Room = ({ route, navigation }) => {
  const { roomId } = route
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Room {roomId}</Text>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  )
}