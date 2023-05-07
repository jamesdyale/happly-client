import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { WeekCalendar } from '../../../../../components'
import React from 'react'
import { APP_BLACK } from '../../../../../styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { getLast7Days } from '../../../../../shared/utils'
import { StreakWeek } from './StreakWeek'

export const WeekView = ({ navigation, habit }) => {

  const week = getLast7Days().reverse()

  return (
    <View style={styles.container}>
      <View style={styles.habitTitleContainer}>
        <View>
          <Text style={styles.title}>{habit.title}</Text>
          {/* TODO: Add label for frrequency later in the future */}
          {/*<View style={styles.labelContainer}>*/}
          {/*  <Text style={styles.label}>Everyday</Text>*/}
          {/*</View>*/}
        </View>
        <Icon name='calendar-outline' size={25} color={APP_BLACK}
              onPress={() => navigation.navigate('Habit', { screen: 'SingleHabit', habitId: habit.habitId })} />
      </View>
      <View style={styles.footer}>
        {week.map((day, index) => {
          return (
            <StreakWeek
              day={day}
              handleDayClick={() => console.log('clicked')}
              isHighlighed={habit.last7days[index]}
            />
          )
        })}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 35
  },
  habitTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },

  title: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: APP_BLACK
  },
  labelContainer: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#FDE3FF',
    borderRadius: 4,
    marginTop: 5
  },
  label: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 15,
    color: APP_BLACK
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})