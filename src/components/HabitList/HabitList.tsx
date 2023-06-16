import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAtom, useAtomValue } from 'jotai'
import {
  APP_BLACK,
  APP_BLUE,
  APP_GRAY,
  APP_WHITE,
  GRAY_TEXT,
  HABIT_OPTION,
  MAIN_ACCENT_COLOR,
  MAIN_BG_COLOR
} from '@styles/colors'
import { NoHabitIcon } from '@assets/svgs'
import { dailyHabitsAtom, progressAtom, selectedTimeOfDayAtom } from '@state/state'
import { CustomProgressBar } from '../CustomProgressBar/CustomProgressBar'
import { percentage } from '@shared/utils'
import { TimeOfDay } from '@shared/types'
import { SingleHabit } from '../SingleHabit/SingleHabit'

export const HabitList = () => {
  const dailyHabit = useAtomValue(dailyHabitsAtom)
  const progress = useAtomValue(progressAtom)
  const [timeOfDay, setTimeOfDay] = useAtom(selectedTimeOfDayAtom)

  const handleChangeTimeOfDay = (selectedTimeOfDay: TimeOfDay) => {
    if (timeOfDay === selectedTimeOfDay) {
      setTimeOfDay(TimeOfDay.All)
    } else {
      setTimeOfDay(selectedTimeOfDay)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.periodContainer}>
        <TouchableOpacity
          style={{
            ...styles.periodOption,
            backgroundColor: timeOfDay === TimeOfDay.Morning ? APP_BLUE : APP_GRAY
          }}
          onPress={() => handleChangeTimeOfDay(TimeOfDay.Morning)}
        >
          <Image style={{
            width: 15,
            height: 15,
            marginRight: 8
          }} source={require('../../assets/svgs/sunrise1.png')} />
          <Text style={{
            ...styles.periodOptionTitle,
            color: timeOfDay === TimeOfDay.Morning ? APP_WHITE : APP_BLACK
          }}>Morning</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.periodOption,
            backgroundColor: timeOfDay === TimeOfDay.Afternoon ? APP_BLUE : APP_GRAY
          }}
          onPress={() => handleChangeTimeOfDay(TimeOfDay.Afternoon)}
        >
          <Image style={{
            width: 15,
            height: 15,
            marginRight: 8
          }} source={require('../../assets/svgs/sun1.png')} />
          <Text style={{
            ...styles.periodOptionTitle,
            color: timeOfDay === TimeOfDay.Afternoon ? APP_WHITE : APP_BLACK
          }}>Afternoon</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.periodOption,
            backgroundColor: timeOfDay === TimeOfDay.Evening ? APP_BLUE : APP_GRAY
          }}
          onPress={() => handleChangeTimeOfDay(TimeOfDay.Evening)}
        >
          <Image style={{
            width: 15,
            height: 15,
            marginRight: 8
          }} source={require('../../assets/svgs/crescent-moon1.png')} />
          <Text style={{
            ...styles.periodOptionTitle,
            color: timeOfDay === TimeOfDay.Evening ? APP_WHITE : APP_BLACK
          }}>Evening</Text>
        </TouchableOpacity>
      </View>


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
  },
  periodContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20
  },
  periodOption: {
    backgroundColor: APP_GRAY,
    borderRadius: 10,
    width: 120,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  periodOptionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 22,
    color: GRAY_TEXT
  }
})

