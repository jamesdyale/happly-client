import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAtom } from 'jotai/index'
import { textAtom } from '../../../App'


export const Home = ({ navigation }) => {
  const [text, setText] = useAtom(textAtom)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{text} world</Text>
      <Button title='Go to the details page' onPress={() => navigation.navigate('Onboard')} />
    </View>
  )
}