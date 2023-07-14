import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { habitsAtom } from '~state'
import { useAtom } from 'jotai'
import { ActionGetHabitsByUserId } from '~actions'
import { onSnapshot } from 'firebase/firestore'
import { Habit, HabitHistory, Stats, User } from '~types'
import { CalendarWeekView } from '~components'
import { useTheme } from '~hooks'
import { getData } from '~utils'
import { ASYNC_STORAGE_KEYS } from '~constants'
import { NoHabitIcon2 } from '~assets'


export const HabitsScreen = () => {
  const [allHabits, setHabits] = useAtom(habitsAtom)
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
      // backgroundColor: theme.MAIN_BG_COLOR
    }]}>
      <ScrollView style={styles.container}>
        <Text style={[styles.headerText, {
          color: theme.MAIN_TEXT_COLOR
        }]}>Habits</Text>
        {allHabits &&
          Object.keys(allHabits).length > 0 &&
          Object.keys(allHabits).map((habitId) => (
            <CalendarWeekView key={habitId} habit={allHabits[habitId].habit} />
          ))}
        {allHabits &&
          Object.keys(allHabits).length === 0 &&
          <View style={styles.noHabitsContainer}>
            <NoHabitIcon2 />
            <Text style={[styles.noHabitTextMain, { color: theme.MAIN_TEXT_COLOR }]}>There are no active habits </Text>
            <Text style={[styles.noHabitTextSub, { color: theme.MAIN_TEXT_COLOR }]}>Let’s start in developing that
              habit </Text>
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    padding: 20,
    marginBottom: 20
  },
  headerText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 36,
    display: 'flex',
    marginBottom: 20
  },
  noHabitsContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  noHabitTextMain: {
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 36
  },
  noHabitTextSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 18
  }
})
