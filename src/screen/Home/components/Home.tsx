import { SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { MAIN_BG_COLOR } from '@styles/colors'
import { HabitList, UserProfile, WeekCalendar } from '../../../components'
import { DeleteHabitModal, EditHabitModal } from '../../Modals'
import {
  dailyHabitsAtom,
  progressAtom,
  selectDayOfTheWeekAtom,
  selectedHabitAtom,
  showDeleteModalAtom,
  userAtom
} from '@state/state'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'
import { Habit } from '../../../types/Habit'
import { Stats } from '../../../types/Stats'

export const Home = () => {
  const habitSelected = useAtomValue(selectedHabitAtom)
  const isDeleteHabitModalOpen = useAtomValue(showDeleteModalAtom)
  const user = useAtomValue(userAtom)
  const setDailyHabit = useSetAtom(dailyHabitsAtom)
  const setProgress = useSetAtom(progressAtom)
  const selectedDay = useAtomValue(selectDayOfTheWeekAtom)

  useEffect(() => {
    // TODO: Add loading state
    let isMounted = true

    if (isMounted) {
      getHabitsForTheDay()
      getCompletedHabitForDay()
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

  const getCompletedHabitForDay = async () => {
    const docs = await getDocs(
      query(
        collection(FIREBASE_DB, 'stats'),
        where('completedAt', '==', selectedDay.toDateString())
      )
    )

    const progress: Stats[] = []
    docs.forEach((doc) => {
        const data = doc.data() as unknown as Stats
        progress.push(data)
      }
    )
    console.log(progress)
    setProgress(progress)
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: MAIN_BG_COLOR }}>
      <UserProfile />
      <WeekCalendar />
      <HabitList />
      {habitSelected && !isDeleteHabitModalOpen ? <EditHabitModal /> : null}
      {isDeleteHabitModalOpen ? <DeleteHabitModal /> : null}
    </SafeAreaView>
  )
}

