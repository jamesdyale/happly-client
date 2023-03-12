import { SafeAreaView } from 'react-native'
import React from 'react'
import { MAIN_BG_COLOR } from '../../../styles'
import { UserProfile, WeekCalendar } from '../../../components'
import { HabitList } from '../../../components/HabitList/HabitList'

const habits = [
  {
    id: 1,
    name: 'Meditate',
    progress: 0,
    completed: false
  },
  {
    id: 2,
    name: 'Meditate',
    progress: 100,
    completed: true
  }
]

export const Home = ({ navigation }) => {


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: MAIN_BG_COLOR
    }}>
      <UserProfile />
      <WeekCalendar />
      <HabitList />
    </SafeAreaView>
  )
}