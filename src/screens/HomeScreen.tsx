import { SafeAreaView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { HabitList, UserProfile, WeekCalendar } from '~components'
import { EditHabitModal } from '~modals'
import {
  dailyHabitsAtom, editHabitAtom,
  progressAtom, selectedDayOfTheWeekAtom, selectedTimeOfDayAtom,
  userAtom
} from '~state'
import { Habit, Stats, User } from '~types'
import { ActionGetUserHabitsByUserId, ActionGetCompletedStatForDay } from '~actions'
import { onSnapshot } from 'firebase/firestore'
import moment from 'moment/moment'
import { useTheme } from '~hooks'
import { getData } from '~utils'
import { ASYNC_STORAGE_KEYS } from '~constants'

export const HomeScreen = () => {
  const [user, setUser] = useAtom(userAtom)
  const setDailyHabit = useSetAtom(dailyHabitsAtom)
  const setProgress = useSetAtom(progressAtom)
  const selectedDay = useAtomValue(selectedDayOfTheWeekAtom)
  const [timeOfDay, setTimeOfDay] = useAtom(selectedTimeOfDayAtom)
  const editHabit = useAtomValue(editHabitAtom)
  const [loadingHabits, setLoadingHabits] = useState(false)
  const [loadingStats, setLoadingStats] = useState(false)
  const dailyHabit = useAtomValue(dailyHabitsAtom)

  const { theme } = useTheme()

  useEffect(() => {
    // TODO: Add loading state
    let isMounted = true

    const asyncFunction = async () => {
      try {
        setLoadingHabits(true)
        setLoadingStats(true)

        await getHabitsForTheDay()
        await getCompletedHabitForDay()
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

  }, [selectedDay, timeOfDay, editHabit, dailyHabit, user])

  
  const getHabitsForTheDay = async () => {
    // const userId = await getData(ASYNC_STORAGE_KEYS.USER_ID) as User['id']

    if (!user) {
      console.log('no user')
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
    const userId = await getData(ASYNC_STORAGE_KEYS.USER_ID) as User['id']

    if (!userId) {
      console.log('no user')
      return
    }

    const completedHabitQuery = ActionGetCompletedStatForDay(userId, selectedDay)

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

  if (loadingHabits && loadingStats) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.MAIN_BG_COLOR }}>
        <View>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.MAIN_BG_COLOR }}>
      <UserProfile />
      <WeekCalendar />
      <HabitList />
      <EditHabitModal />
    </SafeAreaView>
  )
}


