import { Button, Text, View } from 'react-native'
import React from 'react'

export const OnboardContainer = ({ navigation }) => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Onboard Screen</Text>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  )
}