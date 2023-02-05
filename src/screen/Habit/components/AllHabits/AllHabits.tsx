import { View, Text, Button } from 'react-native'
import React from 'react'


export const AllHabits = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>AllHabits</Text>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  )
}