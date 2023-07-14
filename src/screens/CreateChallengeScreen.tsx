import { View, Text, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ROUTES } from '~constants'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '~hooks'


export const CreateChallengeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { theme } = useTheme()

  return (
    <SafeAreaView>
      <Text>CreateChallenge</Text>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </SafeAreaView>
  )
}
