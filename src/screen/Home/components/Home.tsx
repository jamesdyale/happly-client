import { SafeAreaView } from 'react-native'
import React from 'react'
import { MAIN_BG_COLOR } from '../../../styles'
import { UserProfile, WeekCalendar, HabitList } from '../../../components'
import { EditHabitModal } from '../../Modals'
import { useAtomValue } from 'jotai'
import { selectedHabitAtom, showDeleteModalAtom } from '../../../state/state'

export const Home = ({ navigation }) => {
  const habitSelected = useAtomValue(selectedHabitAtom)
  const isDeleteHabitModalOpen = useAtomValue(showDeleteModalAtom)

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: MAIN_BG_COLOR
    }}>
      <UserProfile navigation={navigation} />
      <WeekCalendar />
      <HabitList />
      {habitSelected ? <EditHabitModal /> : null}
      {/*{isDeleteHabitModalOpen ? <DeleteHabitModal /> : null}*/}
    </SafeAreaView>
  )
}