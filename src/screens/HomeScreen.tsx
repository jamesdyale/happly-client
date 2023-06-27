import { SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { MAIN_BG_COLOR } from '~styles'
import { HabitList, UserProfile, WeekCalendar } from '~components'
import { EditHabitModal } from '~modals'
import {
  dailyHabitsAtom, editHabitAtom,
  progressAtom, pushTokenAtom, selectedDayOfTheWeekAtom, selectedTimeOfDayAtom,
  userAtom
} from '~state'
import { Habit, Stats } from '~types'
import { ActionGetUserHabitsByUserId, ActionGetCompletedStatForDay } from '~actions'
import { onSnapshot } from 'firebase/firestore'

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
  // const pushToken = useAtomValue(pushTokenAtom)

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

