import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
} from '~styles'
import { NoHabitIcon } from '~assets'
import { dailyHabitsAtom, progressAtom, selectedTimeOfDayAtom } from '~state'
import { CustomProgressBar } from './CustomProgressBar'
import { SingleHabit } from './SingleHabit'
import Icon from 'react-native-vector-icons/Ionicons'
import { TimeOfDay } from '~types'
import { GetCurrentTimeOfDay } from '~utils/timeUtils'
import { percentage } from '~utils'
import { useTheme } from '~hooks'

export const HabitList = () => {
  const { theme } = useTheme()
  const dailyHabit = useAtomValue(dailyHabitsAtom)
  const progress = useAtomValue(progressAtom)
  const [timeOfDay, setTimeOfDay] = useAtom(selectedTimeOfDayAtom)
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState<TimeOfDay>(TimeOfDay.All)

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      setCurrentTimeOfDay(GetCurrentTimeOfDay())
    }
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: theme.MAIN_BG_COLOR }]}>
      <View style={[styles.periodContainer]}>
        <TouchableOpacity
          style={[
            styles.periodOption,
            { backgroundColor: timeOfDay === TimeOfDay.All ? APP_BLUE : APP_GRAY }
          ]}
          onPress={() => setTimeOfDay(TimeOfDay.All)}
        >
          <Icon name='file-tray-full-sharp' size={18} color={timeOfDay === TimeOfDay.All ? APP_WHITE : APP_BLACK}
                style={{ marginRight: 8 }} />
          <Text style={[styles.periodOptionTitle,
            { color: timeOfDay === TimeOfDay.All ? APP_WHITE : APP_BLACK }
          ]}>All Habits</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.periodOption,
            {
              backgroundColor: timeOfDay === currentTimeOfDay ? APP_BLUE : APP_GRAY
            }]}
          onPress={() => setTimeOfDay(currentTimeOfDay)}
        >
          <Icon
            name={
              currentTimeOfDay === TimeOfDay.Morning ? 'ios-partly-sunny-sharp'
                : currentTimeOfDay === TimeOfDay.Afternoon ? 'ios-sunny-sharp'
                  : 'ios-moon-sharp'}
            size={15}
            color={timeOfDay === currentTimeOfDay ? APP_WHITE : APP_BLACK}
            style={{ marginRight: 8 }}
          />
          <Text style={[styles.periodOptionTitle,
            { color: timeOfDay === currentTimeOfDay ? APP_WHITE : APP_BLACK }
          ]}
          >{currentTimeOfDay}</Text>
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
              <Text style={[styles.noHabitMessage, {
                color: HABIT_OPTION
              }]}>
                “The most important
                step of all is the first step”
                {' '}
              </Text>
              <Text style={[styles.noHabitMessageMessenger, {
                color: MAIN_ACCENT_COLOR
              }]}>
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
    padding: 20
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
    opacity: 0.5
  },
  noHabitMessageMessenger: {
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right',
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
    borderRadius: 10,
    width: '48%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  periodOptionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 22
  }
})

