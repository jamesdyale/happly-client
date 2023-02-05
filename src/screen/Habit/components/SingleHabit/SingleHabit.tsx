import { View, Text, Button } from 'react-native'
import React from 'react'


export const SingleHabit = ({ route, navigation }) => {
  const { habitId } = route.params
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SingleHabit {habitId} here</Text>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  )
}