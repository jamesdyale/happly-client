import { SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
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
import { Habit, Stats } from '@data/types'
import { ActionGetUserHabitsByUserId } from '@actions/actionGetUserHabitsByUserId'
import { ActionGetCompletedStatForDay } from '@actions/actionGetCompletedStatForDay'

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
      console.log('selectedDay', selectedDay)
      getHabitsForTheDay()
      getCompletedHabitForDay()
    }

    return () => {
      isMounted = false
    }

  }, [selectedDay])

  const getHabitsForTheDay = async () => {
    const docs = await ActionGetUserHabitsByUserId(user.id)

    if (!docs) return

    const habits: Habit[] = []
    docs.forEach((doc) => {
        const data = doc.data() as unknown as Habit
        habits.push(data)
      }
    )
    setDailyHabit(habits)
  }

  const getCompletedHabitForDay = async () => {
    const docs = await ActionGetCompletedStatForDay(selectedDay)
    console.log(docs.empty)
    if (!docs) return

    const progress: Stats[] = []
    docs.forEach((doc) => {
        const data = doc.data() as unknown as Stats
        progress.push(data)
      }
    )
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

