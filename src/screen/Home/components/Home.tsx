import { SafeAreaView } from 'react-native'
import React from 'react'
import { MAIN_BG_COLOR } from '../../../styles'
import { UserProfile, WeekCalendar } from '../../../components'
import { HabitList } from '../../../components/HabitList/HabitList'
import { EditHabitModal } from '../../Modals'

export const Home = ({ navigation }) => {


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: MAIN_BG_COLOR
    }}>
      <UserProfile />
      <WeekCalendar />
      <HabitList />
      <EditHabitModal />
    </SafeAreaView>
  )
}