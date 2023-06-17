import { SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { MAIN_BG_COLOR } from '@styles/colors'
import { HabitList, UserProfile, WeekCalendar } from '../../../components'
import { EditHabitModal } from '../../Modals'
import {
  dailyHabitsAtom, editHabitAtom,
  progressAtom, selectedDayOfTheWeekAtom, selectedTimeOfDayAtom,
  userAtom
} from '@state/state'
import { Habit, Stats } from '@data/types'
import { ActionGetUserHabitsByUserId } from '@actions/actionGetUserHabitsByUserId'
import { ActionGetCompletedStatForDay } from '@actions/actionGetCompletedStatForDay'
import { onSnapshot } from 'firebase/firestore'
import { GetCurrentTimeOfDay } from '@utils/timeUtils'

export const Home = () => {
  const user = useAtomValue(userAtom)
  const setDailyHabit = useSetAtom(dailyHabitsAtom)
  const setProgress = useSetAtom(progressAtom)
  const selectedDay = useAtomValue(selectedDayOfTheWeekAtom)
  const [timeOfDay, setTimeOfDay] = useAtom(selectedTimeOfDayAtom)
  const editHabit = useAtomValue(editHabitAtom)

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

  }, [selectedDay, timeOfDay, editHabit])


  const getHabitsForTheDay = async () => {
    const dailyHabitsQuery = ActionGetUserHabitsByUserId(user.id, selectedDay, timeOfDay)
    const unsubscribe = onSnapshot(dailyHabitsQuery, (querySnapshot) => {
        const habits: Habit[] = []
        querySnapshot.forEach((doc) => {
            const data = doc.data() as unknown as Habit
            habits.push(data)
          }
        )
        setDailyHabit(habits)
      }
    )

    return () => unsubscribe()
  }


  const getCompletedHabitForDay = async () => {
    const completedHabitQuery = ActionGetCompletedStatForDay(selectedDay)

    const unsubscribe = onSnapshot(completedHabitQuery, (querySnapshot) => {
        const progress: Stats[] = []
        querySnapshot.forEach((doc) => {
            const data = doc.data() as unknown as Stats
            progress.push(data)
          }
        )
        setProgress(progress)
      }
    )

    return () => unsubscribe()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: MAIN_BG_COLOR }}>
      <UserProfile />
      <WeekCalendar />
      <HabitList />
      <EditHabitModal />
    </SafeAreaView>
  )
}

