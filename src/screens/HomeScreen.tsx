import { SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
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

// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' }
//   }
//   console.log(message)
//
//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(message)
//   })
// }


export const HomeScreen = () => {
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
    const dailyHabitsQuery = ActionGetUserHabitsByUserId(user.id)
    const unsubscribe = onSnapshot(dailyHabitsQuery, (querySnapshot) => {
        const habits: Habit[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data() as unknown as Habit
          if (moment(data.createdAt, 'MMMM Do YYYY').isSameOrBefore(moment(selectedDay, 'MMMM Do YYYY'), 'day')) {
            habits.push(data)
          }
        })


        if (timeOfDay !== 'All') {
          setDailyHabit(habits.filter((habit) => habit.timeOfDay === timeOfDay))
        } else {
          setDailyHabit(habits)
        }
      }
    )

    return () => unsubscribe()
  }

  const getCompletedHabitForDay = async () => {
    const completedHabitQuery = ActionGetCompletedStatForDay(user.id)

    const unsubscribe = onSnapshot(completedHabitQuery, (querySnapshot) => {
        const progress: Stats[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data() as unknown as Stats
          if (moment(data.completedAt).format('MMMM Do YYYY') === selectedDay) {
            progress.push(data)
          }
        })
        setProgress(progress)
      }
    )

    return () => unsubscribe()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: MAIN_BG_COLOR }}>
      <UserProfile />
      {/*<Button*/}
      {/*  title='Press to Send Notification'*/}
      {/*  onPress={async () => {*/}
      {/*    await sendPushNotification(pushToken)*/}
      {/*  }}*/}
      {/*/>*/}
      <WeekCalendar />
      <HabitList />
      <EditHabitModal />
    </SafeAreaView>
  )
}

