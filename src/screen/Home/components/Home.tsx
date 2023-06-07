import { SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { MAIN_BG_COLOR } from '@styles/colors'
import { HabitList, UserProfile, WeekCalendar } from '../../../components'
import { EditHabitModal } from '../../Modals'
import { dailyHabitAtom, selectedHabitAtom, showDeleteModalAtom, userAtom } from '@state/state'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'
import { Habit } from '../../../types/Habit'

export const Home = () => {
  const habitSelected = useAtomValue(selectedHabitAtom)
  const isDeleteHabitModalOpen = useAtomValue(showDeleteModalAtom)
  const user = useAtomValue(userAtom)
  const setDailyHabit = useSetAtom(dailyHabitAtom)

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      getHabitsForTheDay()
    }

    return () => {
      isMounted = false
    }

  }, [])

  const getHabitsForTheDay = async () => {
    const docs = await getDocs(
      query(
        collection(FIREBASE_DB, 'habits'),
        where('userId', '==', user.id)
      )
    )

    const habits: Habit[] = []
    docs.forEach((doc) => {
        const data = doc.data() as unknown as Habit
        habits.push(data)
      }
    )
    setDailyHabit(habits)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: MAIN_BG_COLOR }}>
      <UserProfile />
      <WeekCalendar />
      <HabitList />
      {habitSelected ? <EditHabitModal /> : null}
      {/* {isDeleteHabitModalOpen ? <DeleteHabitModal /> : null} */}
    </SafeAreaView>
  )
}

