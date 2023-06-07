import {
  View, StyleSheet, Text, ScrollView
} from 'react-native'
import React, { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import {
  APP_GRAY,
  HABIT_OPTION,
  MAIN_ACCENT_COLOR,
  MAIN_BG_COLOR
} from '../../styles'
import { NoHabitIcon } from '../../assets/svgs'
import { SingleHabit } from './SingleHabit'
import { dailyHabitAtom, selectDayOfTheWeekAtom } from '@state/state'
import { CustomProgressBar } from '../CustomProgressBar/CustomProgressBar'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'
import { Stats } from '../../types/Stats'

export const HabitList = () => {
  const habits = useAtomValue(dailyHabitAtom)
  const selectedDay = useAtomValue(selectDayOfTheWeekAtom)

  const progress: Stats[] = []

  useEffect(() => {
      getCompletedHabitForDay()
    }, [habits, selectedDay]
  )

  const getCompletedHabitForDay = async () => {
    console.log(selectedDay.toDateString())
    const docs = await getDocs(
      query(
        collection(FIREBASE_DB, 'stats'),
        where('completedAt', '==', selectedDay.toDateString())
      )
    )

    docs.forEach((doc) => {
        const data = doc.data() as Stats
        progress.push(data)
      }
    )
  }

  return (
    <View style={styles.container}>
      {habits.length === 0 && (
        <View style={styles.noHabitIconContainer}>
          <View
            style={{
              marginTop: 80,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <NoHabitIcon />
            <View style={{ marginTop: 20 }}>
              <Text style={styles.noHabitMessage}>
                “The most important
                step of all is the first step”
                {' '}
              </Text>
              <Text style={styles.noHabitMessageMessenger}>
                – Blake
                Mycoskie
              </Text>
            </View>
          </View>
        </View>
      )}

      {habits.length > 0 && (
        <>
          <View style={{
            borderBottomWidth: 1,
            marginBottom: 15,
            borderBottomColor: APP_GRAY,
            paddingBottom: 15
          }}
          >
            <CustomProgressBar
              progress={progress}
              habits={habits}
            />
          </View>
          <ScrollView style={{ marginBottom: 40 }}>
            {habits.map((habit) => (
              <SingleHabit key={habit.id} habit={habit} />
            ))}
          </ScrollView>
        </>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: 20,
    backgroundColor: MAIN_BG_COLOR
  },
  noHabitIconContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  },
  noHabitMessage: {
    fontFamily: 'Inter_600SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    color: HABIT_OPTION,
    opacity: 0.5
  },
  noHabitMessageMessenger: {
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right',
    color: MAIN_ACCENT_COLOR,
    opacity: 0.5,
    marginTop: 10
  }
})

