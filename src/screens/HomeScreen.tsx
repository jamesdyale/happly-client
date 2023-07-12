import { SafeAreaView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { MAIN_BG_COLOR } from '~styles'
import { HabitList, UserProfile, WeekCalendar } from '~components'
import { EditHabitModal } from '~modals'
import {
  dailyHabitsAtom, editHabitAtom,
  progressAtom, selectedDayOfTheWeekAtom, selectedTimeOfDayAtom,
  userAtom
} from '~state'
import { Habit, Stats } from '~types'
import { ActionGetUserHabitsByUserId, ActionGetCompletedStatForDay } from '~actions'
import { onSnapshot } from 'firebase/firestore'
import moment from 'moment/moment'

export const HomeScreen = () => {
  const user = useAtomValue(userAtom)
  const setDailyHabit = useSetAtom(dailyHabitsAtom)
  const setProgress = useSetAtom(progressAtom)
  const selectedDay = useAtomValue(selectedDayOfTheWeekAtom)
  const [timeOfDay, setTimeOfDay] = useAtom(selectedTimeOfDayAtom)
  const editHabit = useAtomValue(editHabitAtom)
  const [loadingHabits, setLoadingHabits] = useState(false)
  const [loadingStats, setLoadingStats] = useState(false)


  useEffect(() => {
    // TODO: Add loading state
    let isMounted = true

    const asyncFunction = async () => {
      try {
        setLoadingHabits(true)
        setLoadingStats(true)

        const response1 = await getHabitsForTheDay()
        const response2 = await getCompletedHabitForDay()

        await Promise.all([response1, response2])

      } catch (e) {
        console.log(e)
      }
    }


    if (isMounted) {
      asyncFunction()
    }

    return () => {
      isMounted = false
    }

  }, [selectedDay, timeOfDay, editHabit, user])

  const getHabitsForTheDay = async () => {
    if (!user) {
      return
    }

    const dailyHabitsQuery = ActionGetUserHabitsByUserId(user.id, timeOfDay)

    const unsubscribe = onSnapshot(dailyHabitsQuery, (querySnapshot) => {
        const habits: Habit[] = []
        querySnapshot.forEach((doc) => {
            const data = doc.data() as unknown as Habit
            if (moment(data.createdAt, 'MMMM Do YYYY').isSameOrBefore(moment(selectedDay, 'MMMM Do YYYY'), 'day')) {
              if (data.frequencyOption === 'Daily') {
                habits.push(data)
              } else if (data.frequencyOption === 'Weekly') {
                if (data.selectedDays.includes(moment(selectedDay, 'MMMM Do YYYY').format('dddd'))) {
                  habits.push(data)
                }
              }
            }
          }
        )

        setDailyHabit(habits)
        setLoadingHabits(false)
      }
    )

    return () => unsubscribe()
  }

  const getCompletedHabitForDay = async () => {
    if (!user) {
      return
    }

    const completedHabitQuery = ActionGetCompletedStatForDay(user.id, selectedDay)

    const unsubscribe = onSnapshot(completedHabitQuery, (querySnapshot) => {
        const progress: Stats[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data() as unknown as Stats
          progress.push(data)
        })

        setProgress(progress)
        setLoadingStats(false)
      }
    )

    return () => unsubscribe()
  }

  if (loadingHabits || loadingStats) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: MAIN_BG_COLOR }}>
        <View>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    )
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

