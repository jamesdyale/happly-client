import { View, Text, Button } from 'react-native'
import React from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


export const ChallengesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>AllChallenges</Text>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  )
}
