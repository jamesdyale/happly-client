import {
  View, StyleSheet, Text, ScrollView
} from 'react-native'
import React from 'react'
import { useAtomValue } from 'jotai'
import {
  APP_GRAY,
  HABIT_OPTION,
  MAIN_ACCENT_COLOR,
  MAIN_BG_COLOR
} from '../../styles'
import { NoHabitIcon } from '@assets/svgs'
import { SingleHabit } from './SingleHabit'
import { dailyHabitsAtom, progressAtom } from '@state/state'
import { CustomProgressBar } from '../CustomProgressBar/CustomProgressBar'
import { percentage } from '@shared/utils'

export const HabitList = () => {
  const dailyHabit = useAtomValue(dailyHabitsAtom)
  const progress = useAtomValue(progressAtom)

  return (
    <View style={styles.container}>
      {dailyHabit.length === 0 && (
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

      {dailyHabit.length > 0 && (
        <>
          <View style={{
            borderBottomWidth: 1,
            marginBottom: 15,
            borderBottomColor: APP_GRAY,
            paddingBottom: 15
          }}
          >
            <CustomProgressBar progress={percentage(progress, dailyHabit)} />
          </View>
          <ScrollView style={{ marginBottom: 40 }}>
            {dailyHabit.map((habit) => (
              <SingleHabit key={habit.id} habit={habit} progress={progress} />
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

