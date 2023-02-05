import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAtom } from 'jotai/index'
import { textAtom } from '../../../App'


export const Home = ({ navigation }) => {
  const [text] = useAtom(textAtom)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{text} world</Text>
      <Button title='Home' onPress={() => navigation.navigate('Home')} />
      <Button title='Onboard' onPress={() => navigation.navigate('Onboard')} />
      <Button title='AllHabits' onPress={() => navigation.navigate('AllHabits')} />
      <Button title='SingleHabit' onPress={() => navigation.navigate('SingleHabit', {
        habitId: 86
      })} />
      <Button title='Settings' onPress={() => navigation.navigate('Settings')} />
      <Button title='Rooms' onPress={() => navigation.navigate('AllRooms', {
        userId: 19
      })} />
      <Button title='Create Room' onPress={() => navigation.navigate('CreateRoom')} />
      <Button title='Room' onPress={() => navigation.navigate('SingleRoom', {
        roomId: 10
      })} />
      <Button title='All Challenges' onPress={() => navigation.navigate('AllChallenges')} />
      <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
    </View>
  )
}