import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { APP_BLACK } from '@styles/colors'
import { WeekView } from './components/WeekView'
import { habitsAtom, userAtom } from '@state/state'
import { useAtom, useAtomValue } from 'jotai'
import { Habit } from '@data/types'
import { ActionGetHabitsByUserId } from '@actions/actionGetHabitsByUserId'


export const AllHabitsScreen = () => {
  const [allHabits, setHabits] = useAtom(habitsAtom)
  const user = useAtomValue(userAtom)


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
    const docs = await ActionGetHabitsByUserId(user.id)
    const habits: Habit[] = []
    docs.forEach((doc) => {
        const data = doc.data() as unknown as Habit
        habits.push(data)
      }
    )
    console.log(habits)
    setHabits(habits)
  }


  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Habits</Text>
        <View>
          {allHabits.map((habit) => (
            <WeekView key={habit.id} habit={habit} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F4F3F3',
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
    color: APP_BLACK,
    display: 'flex',
    marginBottom: 20
  }
})
