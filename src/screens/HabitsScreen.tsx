import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { habitsAtom, userAtom } from '~state'
import { useAtom, useAtomValue } from 'jotai'
import { ActionGetHabitsByUserId } from '~actions'
import { onSnapshot } from 'firebase/firestore'
import { Habit, HabitHistory, Stats, User } from '~types'
import { CalendarWeekView } from '~components'
import { useTheme } from '~hooks'
import { getData } from '~utils'
import { ASYNC_STORAGE_KEYS } from '~constants'


export const HabitsScreen = () => {
  const [allHabits, setHabits] = useAtom(habitsAtom)
  const user = useAtomValue(userAtom)
  const { theme } = useTheme()
  const [stats, setStats] = React.useState<Stats[]>([])


  useEffect(() => {
    // TODO: Add loading state
    let isMounted = true

    if (isMounted) {
      getHabits()
    }

    return () => {
      isMounted = false
    }

  }, [])

  const getHabits = async () => {
    const userId = await getData(ASYNC_STORAGE_KEYS.USER_ID) as User['id']

    if (!userId) {
      console.log('no user')
      return
    }

    const habitsQuery = ActionGetHabitsByUserId(userId)

    const unsubscribe = onSnapshot(habitsQuery, (querySnapshot) => {
        const habitsHistory: HabitHistory = {}
        querySnapshot.forEach(async (doc) => {
            const habit = doc.data() as Habit

            habitsHistory[habit.id] = {
              habit,
              stats
            }
          }
        )
        setHabits(habitsHistory)
      }
    )

    return () => unsubscribe()
  }


  return (
    <SafeAreaView style={[styles.wrapper, {
      backgroundColor: theme.MAIN_BG_COLOR
    }]}>
      <ScrollView style={{ marginBottom: 10 }}>
        <View style={styles.container}>
          <Text style={[styles.headerText, {
            color: theme.MAIN_TEXT_COLOR
          }]}>Habits</Text>
          {allHabits &&
            Object.keys(allHabits).length > 0 &&
            Object.keys(allHabits).map((habitId) => (
              <CalendarWeekView key={habitId} habit={allHabits[habitId].habit} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    padding: 20
  },
  headerText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 36,
    display: 'flex',
    marginBottom: 20
  }
})
