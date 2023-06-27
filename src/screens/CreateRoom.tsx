import { View, Text, Button } from 'react-native'
import React from 'react'


export const CreateRoom = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Create Room</Text>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  )
}